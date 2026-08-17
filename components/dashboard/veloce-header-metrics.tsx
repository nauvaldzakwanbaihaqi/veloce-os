"use client";

import { Cpu, Server, HardDrive, Activity, Zap } from "lucide-react";

interface VeloceHeaderMetricsProps {
  userName?: string;
  activeAppsCount?: number;
  tasksCount?: number;
  requestsCount?: number;
  cpuUsage?: number;
  ramUsage?: number;
  diskUsage?: number;
  networkUsage?: number;
}

export function VeloceHeaderMetrics({
  activeAppsCount = 78,
  tasksCount = 56,
  requestsCount = 203,
  cpuUsage = 15,
  ramUsage = 45,
  diskUsage = 60,
  networkUsage = 10,
}: VeloceHeaderMetricsProps) {
  const metrics = [
    { label: "CPU Usage", value: `${cpuUsage}%`, percent: cpuUsage, icon: Cpu, color: "bg-blue-600 dark:bg-blue-500" },
    { label: "RAM Usage", value: `${ramUsage}%`, percent: ramUsage, icon: Server, color: "bg-blue-500 dark:bg-blue-400" },
    { label: "Disk Space", value: `${diskUsage}%`, percent: diskUsage, icon: HardDrive, color: "bg-slate-800 dark:bg-slate-400" },
    { label: "Network", value: `${networkUsage}%`, percent: networkUsage, icon: Activity, color: "bg-blue-400 dark:bg-blue-300" },
  ];

  return (
    <div className="w-full flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 pt-2 pb-4">
      {/* Left: Massive Welcome Text & Sleek Horizontal System Bar */}
      <div className="space-y-5 w-full xl:max-w-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
              <Zap className="h-3.5 w-3.5 fill-blue-500 text-blue-500" /> System Online · All Nodes Healthy
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Welcome to <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">Veloce OS</span>
          </h1>
        </div>

        {/* Sleek Horizontal Metrics Bar */}
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {metrics.map((m) => (
              <div key={m.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-medium text-[11px]">
                  <span className="flex items-center gap-1.5 truncate">
                    <m.icon className="h-3 w-3 text-blue-500 shrink-0" />
                    {m.label}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white font-mono">{m.value}</span>
                </div>
                {/* Micro Progress Bar */}
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${m.color}`}
                    style={{ width: `${m.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Unified System Segment Bar */}
          <div className="pt-1 flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">Resource Split</span>
            <div className="h-2 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-0.5 p-0.5">
              <div style={{ width: "15%" }} className="h-full bg-blue-600 rounded-xs" title="CPU: 15%" />
              <div style={{ width: "45%" }} className="h-full bg-blue-500 rounded-xs" title="RAM: 45%" />
              <div style={{ width: "30%" }} className="h-full bg-slate-800 dark:bg-slate-400 rounded-xs" title="Disk: 60%" />
              <div style={{ width: "10%" }} className="h-full bg-blue-400 rounded-xs" title="Network: 10%" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Right: 3 Large Stat Numbers */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8 w-full xl:w-auto pt-2 xl:pt-0">
        <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800/80 shadow-xs flex flex-col justify-end min-w-[130px] flex-1 sm:flex-initial">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
              {activeAppsCount}
            </span>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Live</span>
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Active Apps</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800/80 shadow-xs flex flex-col justify-end min-w-[130px] flex-1 sm:flex-initial">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
              {tasksCount}
            </span>
            <span className="text-xs font-semibold text-emerald-500">Auto</span>
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Background Tasks</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800/80 shadow-xs flex flex-col justify-end min-w-[140px] flex-1 sm:flex-initial border-l-2 border-l-blue-500">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl lg:text-5xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400 font-mono">
              {requestsCount}
            </span>
            <span className="text-xs font-semibold text-slate-400 font-mono">req/s</span>
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Network Requests</span>
        </div>
      </div>
    </div>
  );
}
