"use server";

import { db } from "@/lib/db";
import { invoices, invoiceItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Decimal from "decimal.js";
import { invoiceSchema, type InvoiceInput } from "@/lib/validations/invoice";
import { randomBytes } from "crypto";

// Generate random invoice number, e.g. INV-YYYYMMDD-XXXX
function generateInvoiceNumber() {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomStr = randomBytes(2).toString("hex").toUpperCase();
  return `INV-${dateStr}-${randomStr}`;
}

export async function createInvoice(input: InvoiceInput) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const parsed = invoiceSchema.parse(input);

  // 1. Calculate totals using decimal.js
  let subtotal = new Decimal(0);
  const itemsWithAmount = parsed.items.map(item => {
    const unitPrice = new Decimal(item.unitPrice);
    const amount = unitPrice.mul(item.qty);
    subtotal = subtotal.add(amount);
    return {
      ...item,
      unitPrice: unitPrice.toString(),
      amount: amount.toString(),
    };
  });

  const taxRate = new Decimal(parsed.taxRate).div(100);
  const tax = subtotal.mul(taxRate);
  const total = subtotal.add(tax);

  // 2. Perform atomic insert via db.transaction
  await db.transaction(async (tx) => {
    const [newInvoice] = await tx.insert(invoices).values({
      userId,
      projectId: parsed.projectId,
      invoiceNumber: generateInvoiceNumber(),
      issueDate: parsed.issueDate,
      dueDate: parsed.dueDate,
      status: "DRAFT",
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    }).returning({ id: invoices.id });

    const itemsToInsert = itemsWithAmount.map(item => ({
      invoiceId: newInvoice.id,
      description: item.description,
      qty: item.qty,
      unitPrice: item.unitPrice,
      amount: item.amount,
    }));

    await tx.insert(invoiceItems).values(itemsToInsert);
  });

  revalidatePath("/invoices");
}

export async function getInvoices() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  return await db.query.invoices.findMany({
    where: eq(invoices.userId, session.user.id),
    with: {
      project: {
        with: {
          client: true
        }
      }
    },
    orderBy: (invoices, { desc }) => [desc(invoices.createdAt)],
  });
}

export async function getInvoiceById(id: string) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const invoice = await db.query.invoices.findFirst({
    where: eq(invoices.id, id),
    with: {
      items: true,
      project: {
        with: {
          client: true,
        },
      },
    },
  });

  if (!invoice || invoice.userId !== session.user.id) return null;
  return invoice;
}

export async function deleteInvoice(id: string) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await db.delete(invoices).where(eq(invoices.id, id));
  revalidatePath("/invoices");
}

export async function updateInvoiceStatus(id: string, status: "DRAFT" | "SENT" | "PAID" | "CANCELLED") {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await db.update(invoices).set({ status }).where(eq(invoices.id, id));
  revalidatePath("/invoices");
}
