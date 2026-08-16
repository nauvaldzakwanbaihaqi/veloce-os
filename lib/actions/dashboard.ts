"use server";

import { db } from "@/lib/db";
import { invoices, projects, clients } from "@/db/schema";
import { eq, and, inArray, lt, sql } from "drizzle-orm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function getDashboardMetrics() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;
  const todayStr = new Date().toISOString().split("T")[0];

  // 1. Aggregation queries
  // Total Revenue (status = PAID)
  const [revenueResult] = await db
    .select({ total: sql<string>`COALESCE(SUM(${invoices.total}), 0)` })
    .from(invoices)
    .where(and(eq(invoices.userId, userId), eq(invoices.status, "PAID")));

  // Active Projects (status IN ('IN_PROGRESS', 'REVIEW'))
  const [activeProjectsResult] = await db
    .select({ count: sql<number>`COUNT(*)::int` })
    .from(projects)
    .where(
      and(
        eq(projects.userId, userId),
        inArray(projects.status, ["IN_PROGRESS", "REVIEW"])
      )
    );

  // Unpaid Invoices (status = SENT)
  const [unpaidInvoicesResult] = await db
    .select({
      total: sql<string>`COALESCE(SUM(${invoices.total}), 0)`,
      count: sql<number>`COUNT(*)::int`,
    })
    .from(invoices)
    .where(and(eq(invoices.userId, userId), eq(invoices.status, "SENT")));

  // Overdue Invoices (status = SENT AND dueDate < today)
  const [overdueInvoicesResult] = await db
    .select({
      total: sql<string>`COALESCE(SUM(${invoices.total}), 0)`,
      count: sql<number>`COUNT(*)::int`,
    })
    .from(invoices)
    .where(
      and(
        eq(invoices.userId, userId),
        eq(invoices.status, "SENT"),
        lt(invoices.dueDate, todayStr)
      )
    );

  // Total Clients
  const [totalClientsResult] = await db
    .select({ count: sql<number>`COUNT(*)::int` })
    .from(clients)
    .where(eq(clients.userId, userId));

  // 2. Fetch Recent Items for Dashboard Activity
  const recentInvoices = await db.query.invoices.findMany({
    where: eq(invoices.userId, userId),
    with: {
      project: {
        with: {
          client: true,
        },
      },
    },
    orderBy: (invoices, { desc }) => [desc(invoices.createdAt)],
    limit: 5,
  });

  const recentProjects = await db.query.projects.findMany({
    where: eq(projects.userId, userId),
    with: {
      client: true,
    },
    orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    limit: 5,
  });

  return {
    totalRevenue: revenueResult?.total ?? "0",
    activeProjectsCount: activeProjectsResult?.count ?? 0,
    unpaidInvoicesTotal: unpaidInvoicesResult?.total ?? "0",
    unpaidInvoicesCount: unpaidInvoicesResult?.count ?? 0,
    overdueInvoicesTotal: overdueInvoicesResult?.total ?? "0",
    overdueInvoicesCount: overdueInvoicesResult?.count ?? 0,
    totalClientsCount: totalClientsResult?.count ?? 0,
    recentInvoices,
    recentProjects,
  };
}
