"use client";

import { DollarSign, Briefcase, Users, Zap } from "lucide-react";

interface VeloceHeaderMetricsProps {
  userName?: string;
  activeProjectsCount?: number;
  totalClientsCount?: number;
  completedTasksCount?: number;
  revenueProgress?: number;
  projectProgress?: number;
  teamCapacity?: number;
}

export function VeloceHeaderMetrics({
  activeProjectsCount = 18,
  totalClientsCount = 20,
  completedTasksCount = 113,
  revenueProgress = 75,
  projectProgress = 60,
  teamCapacity = 80,
}: VeloceHeaderMetricsProps) {
  const businessMetrics = [
    {
      label: "Target Pendapatan",
      value: `${revenueProgress}%`,
      percent: revenueProgress,
      icon: DollarSign,
      color: "bg-blue-600 dark:bg-blue-500",
      desc: "Rp 75 jt / Rp 100 jt",
    },
    {
      label: "Proyek Selesai",
      value: `${projectProgress}%`,
      percent: projectProgress,
      icon: Briefcase,
      color: "bg-blue-500 dark:bg-blue-400",
      desc: "12 dari 20 proyek",
    },
    {
      label: "Kapasitas Tim",
      value: `${teamCapacity}%`,
      percent: teamCapacity,
      icon: Users,
      color: "bg-slate-800 dark:bg-slate-300",
      desc: "4 dari 5 anggota aktif",
    },
  ];

  return (
    <div className="w-full flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 pt-2 pb-2">
      {/* Left: Main Greeting & Business Progress Bars */}
      <div className="space-y-4 w-full xl:max-w-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
              <Zap className="h-3.5 w-3.5 fill-blue-500 text-blue-500" /> Sistem Aktif · Operasional Normal
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Selamat datang di <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">Veloce OS</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Pusat kendali operasional, manajemen proyek, dan pemantauan finansial bisnis Anda.
          </p>
        </div>

        {/* Business Progress Metrics Bar */}
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {businessMetrics.map((m) => (
              <div key={m.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-semibold text-[11px]">
                  <span className="flex items-center gap-1.5 truncate">
                    <m.icon className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    {m.label}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">{m.value}</span>
                </div>
                {/* Progress bar */}
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${m.color}`}
                    style={{ width: `${m.percent}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  {m.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Unified Resource Bar */}
          <div className="pt-1 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800/80">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">
              Alokasi Operasional
            </span>
            <div className="h-2 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-0.5 p-0.5">
              <div style={{ width: "45%" }} className="h-full bg-blue-600 rounded-xs" title="Finansial: 45%" />
              <div style={{ width: "35%" }} className="h-full bg-blue-500 rounded-xs" title="Proyek: 35%" />
              <div style={{ width: "20%" }} className="h-full bg-slate-800 dark:bg-slate-400 rounded-xs" title="Klien: 20%" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Right: 3 Large Stat Numbers */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 w-full xl:w-auto pt-2 xl:pt-0">
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-end min-w-32.5 flex-1 sm:flex-initial">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
              {activeProjectsCount}
            </span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Aktif</span>
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Proyek Aktif</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-end min-w-32.5 flex-1 sm:flex-initial">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
              {totalClientsCount}
            </span>
            <span className="text-xs font-bold text-emerald-500">Terdaftar</span>
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Klien Terdaftar</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-end min-w-35 flex-1 sm:flex-initial border-l-2 border-l-blue-600">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl lg:text-5xl font-black tracking-tight text-blue-600 dark:text-blue-400 font-mono">
              {completedTasksCount}
            </span>
            <span className="text-xs font-bold text-slate-400 font-mono">Selesai</span>
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Tugas Selesai</span>
        </div>
      </div>
    </div>
  );
}
