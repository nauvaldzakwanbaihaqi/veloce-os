import { getDashboardMetrics } from "@/lib/actions/dashboard";
import { auth } from "@/auth";
import { FinancialCharts } from "@/components/dashboard/financial-charts";
import { BentoMetricsHeader } from "@/components/dashboard/bento-metrics-header";
import { BentoProfileCard } from "@/components/dashboard/bento-profile-card";
import { BentoActivityTimeline, ActivityItem } from "@/components/dashboard/bento-activity-timeline";
import { DollarSign, AlertTriangle, Briefcase } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function formatCurrency(value: string | number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export default async function DashboardPage() {
  const session = await auth();
  const userName = session?.user?.name || "User";
  const metrics = await getDashboardMetrics();

  // Map recent invoices and projects into the Activity Timeline format
  const activities: ActivityItem[] = [];
  
  metrics.recentInvoices.forEach(inv => {
    activities.push({
      id: `inv-${inv.id}`,
      type: inv.status === "PAID" ? "INVOICE_PAID" : "INVOICE_SENT",
      title: `Invoice ${inv.invoiceNumber} to ${inv.project.client.name}`,
      timestamp: new Date(inv.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
      href: `/invoices/${inv.id}`,
    });
  });

  metrics.recentProjects.forEach(proj => {
    activities.push({
      id: `proj-${proj.id}`,
      type: "PROJECT_STARTED",
      title: `Project ${proj.title} Started`,
      timestamp: new Date(proj.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
      href: `/projects/${proj.id}`,
    });
  });

  // Sort activities by timestamp descending (mock)
  activities.sort(() => -1);


  // Actually let's just pick top 5
  const topActivities = activities.slice(0, 5);

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full">
      {/* Overdue Warning Alert Banner if overdue invoices exist */}
      {metrics.overdueInvoicesCount > 0 && (
        <div className="flex items-center justify-between p-4 mb-6 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-sm">
                Perhatian: Ada {metrics.overdueInvoicesCount} invoice menunggak (Overdue)!
              </p>
              <p className="text-xs opacity-90">
                Total tagihan jatuh tempo sebesar {formatCurrency(metrics.overdueInvoicesTotal)}.
              </p>
            </div>
          </div>
          <Link href="/invoices" className={cn(buttonVariants({ size: "sm", variant: "outline" }), "border-amber-300 dark:border-amber-800")}>
            Kelola
          </Link>
        </div>
      )}

      {/* Bento Header */}
      <BentoMetricsHeader 
        userName={userName}
        activeClients={metrics.totalClientsCount}
        ongoingProjects={metrics.activeProjectsCount}
        totalRevenue={formatCurrency(metrics.totalRevenue)}
        projectStatusBreakdown={metrics.projectStatusBreakdown}
      />

      {/* Main Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Column: Profile & Quick Links (3 cols) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <BentoProfileCard 
            userName={userName} 
            totalEarnings={formatCurrency(metrics.totalRevenue)} 
          />
          
          {/* Simple Quick Actions Card */}
          <div className="bg-white dark:bg-slate-900/50 p-5 rounded-2xl border-0 shadow-lg shadow-blue-900/5">
            <h3 className="text-sm font-semibold mb-4 text-slate-900 dark:text-slate-100">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/invoices?new=true" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <DollarSign className="w-4 h-4" />
                </div>
                Create Invoice
              </Link>
              <Link href="/projects" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                New Project
              </Link>
            </div>
          </div>
        </div>

        {/* Center Column: Charts (6 cols) */}
        <div className="col-span-12 lg:col-span-6">
          <FinancialCharts
            totalRevenue={metrics.totalRevenue}
            unpaidTotal={metrics.unpaidInvoicesTotal}
            overdueTotal={metrics.overdueInvoicesTotal}
            activeProjectsCount={metrics.activeProjectsCount}
            projectStatusBreakdown={metrics.projectStatusBreakdown}
          />
        </div>

        {/* Right Column: Activity Timeline (3 cols) */}
        <div className="col-span-12 lg:col-span-3">
          <BentoActivityTimeline 
            activities={topActivities} 
            pendingCount={metrics.unpaidInvoicesCount} 
          />
        </div>

      </div>
    </div>
  );
}
