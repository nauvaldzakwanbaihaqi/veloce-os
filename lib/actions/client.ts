"use server";

import { db } from "@/lib/db";
import { clients, type NewClient } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getClients() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  return await db.query.clients.findMany({
    where: eq(clients.userId, session.user.id),
    orderBy: (clients, { desc }) => [desc(clients.createdAt)],
  });
}

export async function createClient(data: Omit<NewClient, "id" | "createdAt" | "userId">) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await db.insert(clients).values({
    ...data,
    userId: session.user.id,
  });

  revalidatePath("/clients");
}

export async function getClientById(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const userId = session.user.id;

  const client = await db.query.clients.findFirst({
    where: (clients, { eq, and }) =>
      and(eq(clients.id, id), eq(clients.userId, userId)),
    with: {
      projects: {
        with: {
          invoices: true,
        },
        orderBy: (projects, { desc }) => [desc(projects.createdAt)],
      },
    },
  });

  if (!client) return null;
  return client;
}

export async function updateClient(
  id: string,
  data: Partial<Omit<NewClient, "id" | "createdAt" | "userId">>
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await db
    .update(clients)
    .set(data)
    .where(and(eq(clients.id, id), eq(clients.userId, session.user.id)));

  revalidatePath("/clients");
  revalidatePath(`/clients/${id}`);
}

export async function deleteClient(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await db.delete(clients).where(eq(clients.id, id));
  revalidatePath("/clients");
}

