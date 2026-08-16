"use server";

import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getUserProfile() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  return user;
}

export async function updateUserSettings(data: {
  name: string;
  businessName: string;
  currency: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await db
    .update(users)
    .set({
      name: data.name,
      businessName: data.businessName,
      currency: data.currency,
    })
    .where(eq(users.id, session.user.id));

  revalidatePath("/settings");
  revalidatePath("/dashboard");
}
