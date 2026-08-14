"use server";

import { db } from "@/lib/db";
import { projects, type NewProject } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getProjects() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  return await db.query.projects.findMany({
    where: eq(projects.userId, session.user.id),
    with: {
      client: true,
    },
    orderBy: (projects, { desc }) => [desc(projects.createdAt)],
  });
}

export async function createProject(data: Omit<NewProject, "id" | "createdAt" | "userId">) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await db.insert(projects).values({
    ...data,
    userId: session.user.id,
  });

  revalidatePath("/projects");
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/projects");
}
