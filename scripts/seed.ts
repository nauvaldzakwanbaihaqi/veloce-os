import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";
import bcrypt from "bcryptjs";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("❌ DATABASE_URL is not set in .env or .env.local!");
    process.exit(1);
  }

  console.log("🌱 Starting seed script...");
  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  // 1. Create Demo User
  const passwordHash = await bcrypt.hash("password123", 10);
  const [demoUser] = await db
    .insert(schema.users)
    .values({
      name: "Alex Aethera",
      email: "demo@aethera.com",
      passwordHash,
      businessName: "Aethera Studio",
      currency: "IDR",
    })
    .onConflictDoUpdate({
      target: schema.users.email,
      set: { name: "Alex Aethera" },
    })
    .returning();

  console.log(`👤 User created/verified: ${demoUser.email} (password: password123)`);

  // 2. Create Clients
  const [client1] = await db
    .insert(schema.clients)
    .values({
      userId: demoUser.id,
      name: "Budi Santoso",
      company: "PT Nusantara Tech",
      email: "budi@nusantaratech.id",
      phone: "6281234567890",
      notes: "Klien utama untuk proyek web & cloud backend.",
    })
    .returning();

  const [client2] = await db
    .insert(schema.clients)
    .values({
      userId: demoUser.id,
      name: "Siti Rahma",
      company: "Batik House Bali",
      email: "siti@batikhouse.com",
      phone: "6281987654321",
      notes: "Klien retail fashion & e-commerce.",
    })
    .returning();

  console.log(`🏢 Created 2 clients: ${client1.name}, ${client2.name}`);

  // 3. Create Projects
  const [project1] = await db
    .insert(schema.projects)
    .values({
      userId: demoUser.id,
      clientId: client1.id,
      title: "Redesign Corporate Portal & CMS",
      status: "IN_PROGRESS",
      value: "25000000.00",
      startDate: "2026-07-01",
      dueDate: "2026-09-01",
    })
    .returning();

  const [project2] = await db
    .insert(schema.projects)
    .values({
      userId: demoUser.id,
      clientId: client2.id,
      title: "E-Commerce Mobile App (iOS & Android)",
      status: "COMPLETED",
      value: "45000000.00",
      startDate: "2026-05-10",
      dueDate: "2026-08-01",
    })
    .returning();

  console.log(`🚀 Created 2 projects: ${project1.title}, ${project2.title}`);

  // 4. Create Invoices
  const [invoice1] = await db
    .insert(schema.invoices)
    .values({
      userId: demoUser.id,
      projectId: project1.id,
      invoiceNumber: "INV-20260801-001",
      issueDate: "2026-08-01",
      dueDate: "2026-08-15",
      status: "SENT",
      subtotal: "12500000.00",
      tax: "1375000.00",
      total: "13875000.00",
    })
    .returning();

  await db.insert(schema.invoiceItems).values([
    {
      invoiceId: invoice1.id,
      description: "DP 50% Redesign Portal & CMS",
      qty: 1,
      unitPrice: "12500000.00",
      amount: "12500000.00",
    },
  ]);

  const [invoice2] = await db
    .insert(schema.invoices)
    .values({
      userId: demoUser.id,
      projectId: project2.id,
      invoiceNumber: "INV-20260715-002",
      issueDate: "2026-07-15",
      dueDate: "2026-07-30",
      status: "PAID",
      subtotal: "45000000.00",
      tax: "4950000.00",
      total: "49950000.00",
    })
    .returning();

  await db.insert(schema.invoiceItems).values([
    {
      invoiceId: invoice2.id,
      description: "Pelunasan E-Commerce Mobile App Development",
      qty: 1,
      unitPrice: "45000000.00",
      amount: "45000000.00",
    },
  ]);

  console.log(`📜 Created 2 invoices: ${invoice1.invoiceNumber}, ${invoice2.invoiceNumber}`);
  console.log("✅ Seed completed successfully!");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
