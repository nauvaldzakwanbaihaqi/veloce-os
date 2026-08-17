"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2, RefreshCw, Database, Terminal, Cpu, Zap, Shield } from "lucide-react";

export function VeloceActiveProcesses() {
  const processes = [
    {
      id: "p1",
      name: "Kernel Sync",
      desc: "Synchronizing system interrupts & clock",
      icon: Cpu,
      status: "Running",
      cpu: "1.4%",
      isCompleted: false,
    },
    {
      id: "p2",
      name: "Database Backup",
      desc: "Neon PostgreSQL snapshot dump",
      icon: Database,
      status: "Completed",
      cpu: "0.0%",
      isCompleted: true,
    },
    {
      id: "p3",
      name: "Cache Clear",
      desc: "Turbopack static cache garbage collection",
      icon: RefreshCw,
      status: "Running",
      cpu: "2.1%",
      isCompleted: false,
    },
    {
      id: "p4",
      name: "Telemetry Stream",
      desc: "Encrypted metrics socket channel",
      icon: Zap,
      status: "Active",
      cpu: "0.8%",
      isCompleted: true,
    },
  ];

  return (
    <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-6 flex flex-col justify-between h-full min-h-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Terminal className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Active Processes</h3>
            <p className="text-[11px] text-slate-400">Background Worker Threads</p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[10px] font-mono font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          4 Active
        </span>
      </div>

      {/* Process List */}
      <div className="space-y-3 py-4">
        {processes.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.id}
              className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition-colors flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-slate-900 text-blue-400 border border-slate-700/80 shrink-0">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-100 truncate group-hover:text-blue-300 transition-colors">
                    {p.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">{p.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono text-slate-400">{p.cpu}</span>
                {p.isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5 text-blue-400 animate-spin" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1">
          <Shield className="h-3 w-3 text-blue-400" /> Sandboxed Execution
        </span>
        <span className="text-slate-400">Daemon PID: 4892</span>
      </div>
    </Card>
  );
}
