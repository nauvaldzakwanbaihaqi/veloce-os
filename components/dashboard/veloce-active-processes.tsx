"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, Send, Users, Sparkles } from "lucide-react";

export function VeloceActiveProcesses() {
  const priorityTasks = [
    {
      id: "pt1",
      title: "Kirim Invoice ke PT Alpha",
      desc: "Tagihan termin 2 senilai Rp 25.000.000",
      time: "Hari Ini",
      icon: Send,
      isCompleted: false,
      badge: "Mendesak",
    },
    {
      id: "pt2",
      title: "Meeting Klien Beta",
      desc: "Pembahasan revisi dashboard & alur approval",
      time: "14:00 WIB",
      icon: Users,
      isCompleted: false,
      badge: "Pertemuan",
    },
    {
      id: "pt3",
      title: "Review Desain Web",
      desc: "Quality control UI & kelayakan responsif",
      time: "Selesai",
      icon: Sparkles,
      isCompleted: true,
      badge: "QC Desain",
    },
  ];

  return (
    <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-6 flex flex-col justify-between h-full min-h-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Tugas Prioritas Hari Ini</h3>
            <p className="text-[11px] text-slate-400">Daftar Pekerjaan Mendesak</p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[10px] font-mono font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          3 Tugas
        </span>
      </div>

      {/* Process/Task List */}
      <div className="space-y-3 py-4">
        {priorityTasks.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition-colors flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-slate-900 text-blue-400 border border-slate-700/80 shrink-0">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-100 truncate group-hover:text-blue-300 transition-colors">
                      {t.title}
                    </h4>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{t.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {t.isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    {t.time}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
        <span>Target Harian: 3/3 Tercapai</span>
        <span className="text-blue-400 font-semibold cursor-pointer hover:underline">Kelola Semua Tugas →</span>
      </div>
    </Card>
  );
}
