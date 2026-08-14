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

export async function getProjectById(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const userId = session.user.id;

  const project = await db.query.projects.findFirst({
    where: (projects, { eq, and }) =>
      and(eq(projects.id, id), eq(projects.userId, userId)),
    with: {
      client: true,
      invoices: {
        orderBy: (invoices, { desc }) => [desc(invoices.createdAt)],
      },
    },
  });

  if (!project) return null;
  return project;
}

export async function updateProjectStatus(
  id: string,
  status: "LEAD" | "IN_PROGRESS" | "REVIEW" | "COMPLETED"
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await db.update(projects).set({ status }).where(eq(projects.id, id));
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
  revalidatePath("/dashboard");
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/projects");
}
