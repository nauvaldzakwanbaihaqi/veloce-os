import { getDashboardMetrics } from "@/lib/actions/dashboard";
import { auth } from "@/auth";
import { VeloceTopNav } from "@/components/dashboard/veloce-top-nav";
import { VeloceHeaderMetrics } from "@/components/dashboard/veloce-header-metrics";
import { VeloceProfileCard } from "@/components/dashboard/veloce-profile-card";
import { VeloceSystemAccordion } from "@/components/dashboard/veloce-system-accordion";
import { VelocePerformanceChart } from "@/components/dashboard/veloce-performance-chart";
import { VeloceSessionTracker } from "@/components/dashboard/veloce-session-tracker";
import { VeloceTaskScheduler } from "@/components/dashboard/veloce-task-scheduler";
import { VeloceSystemHealth } from "@/components/dashboard/veloce-system-health";
import { VeloceActiveProcesses } from "@/components/dashboard/veloce-active-processes";
import { AlertTriangle } from "lucide-react";
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
  const userName = session?.user?.name || "Admin Root";
  const userEmail = session?.user?.email || "admin@veloce.os";
  const metrics = await getDashboardMetrics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <div className="max-w-[1680px] mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        
        {/* 1. Top Navigation */}
        <VeloceTopNav userName={userName} userEmail={userEmail} />

        {/* Overdue Warning Alert Banner if any overdue invoices exist */}
        {metrics.overdueInvoicesCount > 0 && (
          <div className="flex items-center justify-between p-4 rounded-2xl border border-amber-200 bg-amber-50/90 dark:bg-amber-950/30 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 backdrop-blur-md shadow-xs">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <p className="font-semibold text-sm">
                  System Alert: {metrics.overdueInvoicesCount} invoice menunggak (Overdue) terdeteksi!
                </p>
                <p className="text-xs opacity-90 font-mono">
                  Total tagihan jatuh tempo: {formatCurrency(metrics.overdueInvoicesTotal)}. Segera kirim reminder.
                </p>
              </div>
            </div>
            <Link
              href="/invoices"
              className={cn(
                buttonVariants({ size: "sm", variant: "outline" }),
                "rounded-full border-amber-300 dark:border-amber-800 bg-white/80 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 hover:bg-amber-100"
              )}
            >
              Kelola Invoices
            </Link>
          </div>
        )}

        {/* 2. Header Section */}
        <VeloceHeaderMetrics
          userName={userName}
          activeAppsCount={metrics.totalClientsCount > 0 ? metrics.totalClientsCount * 6 + 6 : 78}
          tasksCount={metrics.activeProjectsCount > 0 ? metrics.activeProjectsCount * 12 + 8 : 56}
          requestsCount={metrics.unpaidInvoicesCount > 0 ? metrics.unpaidInvoicesCount * 45 + 68 : 203}
          cpuUsage={15}
          ramUsage={45}
          diskUsage={60}
          networkUsage={10}
        />

        {/* 3. Main Bento Grid (4 Columns Precision CSS Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Left Column (col-span-1) */}
          <div className="col-span-1 flex flex-col gap-6">
            {/* Top: User/Admin Profile Card */}
            <VeloceProfileCard
              userName={userName}
              role="System Administrator"
              sessionStatus="Session Active"
            />

            {/* Bottom: System Accordion Menu */}
            <VeloceSystemAccordion />
          </div>

          {/* Middle Column (col-span-2) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
            {/* Top Row: System Performance (Left) + Session Tracker (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VelocePerformanceChart />
              <VeloceSessionTracker />
            </div>

            {/* Bottom Row: Wide Task Scheduler & System Logs Calendar */}
            <VeloceTaskScheduler />
          </div>

          {/* Right Column (col-span-1) */}
          <div className="col-span-1 flex flex-col gap-6">
            {/* Top: System Health Card */}
            <VeloceSystemHealth healthScore={85} statusText="Optimal" />

            {/* Bottom: Active Processes (Dark Card) */}
            <VeloceActiveProcesses />
          </div>

        </div>

      </div>
    </div>
  );
}
