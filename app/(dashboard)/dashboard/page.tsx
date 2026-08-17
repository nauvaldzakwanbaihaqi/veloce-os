import { getDashboardMetrics } from "@/lib/actions/dashboard";
import { auth } from "@/auth";
import { VeloceHeaderMetrics } from "@/components/dashboard/veloce-header-metrics";
import { VeloceProfileCard } from "@/components/dashboard/veloce-profile-card";
import { VeloceSystemAccordion } from "@/components/dashboard/veloce-system-accordion";
import { VelocePerformanceChart } from "@/components/dashboard/veloce-performance-chart";
import { VeloceSessionTracker } from "@/components/dashboard/veloce-session-tracker";
import { VeloceTaskScheduler } from "@/components/dashboard/veloce-task-scheduler";
import { VeloceSystemHealth } from "@/components/dashboard/veloce-system-health";
import { VeloceActiveProcesses } from "@/components/dashboard/veloce-active-processes";
import { AlertTriangle, ArrowRight } from "lucide-react";
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
  const userName = session?.user?.name || "Alex Aethera";
  const metrics = await getDashboardMetrics();

  // If database has overdue invoices, show real amount; otherwise show sample Rp 13.875.000 if 1 exists
  const overdueCount = metrics.overdueInvoicesCount > 0 ? metrics.overdueInvoicesCount : 1;
  const overdueAmount =
    metrics.overdueInvoicesCount > 0
      ? formatCurrency(metrics.overdueInvoicesTotal)
      : "Rp 13.875.000";

  return (
    <div className="w-full space-y-6">
      {/* 1. Warning Alert Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-amber-200 bg-amber-50/90 dark:bg-amber-950/30 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-sm">
              Peringatan: {overdueCount} Tagihan menunggak (Overdue) terdeteksi!
            </p>
            <p className="text-xs opacity-90 font-sans">
              Total tagihan yang harus ditindaklanjuti: <strong>{overdueAmount}</strong>. Kirim pengingat WhatsApp ke klien.
            </p>
          </div>
        </div>
        <Link
          href="/invoices"
          className={cn(
            buttonVariants({ size: "sm", variant: "outline" }),
            "rounded-full border-amber-300 dark:border-amber-800 bg-white/90 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 hover:bg-amber-100 shrink-0 font-semibold"
          )}
        >
          Kelola Tagihan <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 2. Header Section */}
      <VeloceHeaderMetrics
        userName={userName}
        activeProjectsCount={18}
        totalClientsCount={20}
        completedTasksCount={113}
        revenueProgress={75}
        projectProgress={60}
        teamCapacity={80}
      />

      {/* 3. Main Bento Grid (4 Columns, 2 Rows Precision Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-[auto_1fr] gap-6">
        
        {/* Left Column — Row 1: User Profile Card */}
        <div className="col-span-1 lg:row-span-1">
          <VeloceProfileCard
            userName={userName}
            role="Administrator"
            sessionStatus="Sedang Aktif"
          />
        </div>

        {/* Middle Column — Row 1: Performa Bisnis + Pelacak Waktu */}
        <div className="col-span-1 lg:col-span-2 lg:row-span-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <VelocePerformanceChart />
            <VeloceSessionTracker />
          </div>
        </div>

        {/* Right Column — Row 1: Kesehatan Finansial */}
        <div className="col-span-1 lg:row-span-1">
          <VeloceSystemHealth healthScore={85} statusText="Arus Kas Positif" />
        </div>

        {/* Left Column — Row 2: Accordion Menu */}
        <div className="col-span-1 lg:row-span-1">
          <VeloceSystemAccordion />
        </div>

        {/* Middle Column — Row 2: Jadwal & Tenggat Waktu Calendar */}
        <div className="col-span-1 lg:col-span-2 lg:row-span-1">
          <VeloceTaskScheduler />
        </div>

        {/* Right Column — Row 2: Tugas Prioritas Hari Ini */}
        <div className="col-span-1 lg:row-span-1">
          <VeloceActiveProcesses />
        </div>

      </div>
    </div>
  );
}
