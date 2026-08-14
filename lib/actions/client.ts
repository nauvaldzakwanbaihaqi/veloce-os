"use server";

import { db } from "@/lib/db";
import { clients, type NewClient } from "@/db/schema";
import { eq } from "drizzle-orm";
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

export async function deleteClient(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await db.delete(clients).where(eq(clients.id, id));
  revalidatePath("/clients");
}
