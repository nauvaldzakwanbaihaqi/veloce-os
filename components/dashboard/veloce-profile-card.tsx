"use client";

import { Card } from "@/components/ui/card";
import { ShieldCheck, CheckCircle2, UserCheck, Briefcase } from "lucide-react";

interface VeloceProfileCardProps {
  userName?: string;
  role?: string;
  sessionStatus?: string;
}

export function VeloceProfileCard({
  userName = "Alex Aethera",
  role = "Administrator",
  sessionStatus = "Sedang Aktif",
}: VeloceProfileCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-3xl border-0 shadow-sm shadow-blue-900/5 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-6 flex flex-col justify-between min-h-[220px]">
      {/* Background Glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Top Header: Green 'Sedang Aktif' Badge & Briefcase Icon */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-md text-emerald-300 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          {sessionStatus}
        </div>
        <div className="p-2 rounded-xl bg-white/10 text-white/80 border border-white/10">
          <Briefcase className="h-4 w-4 text-blue-400" />
        </div>
      </div>

      {/* Center/Bottom Info: Avatar, Name, Role */}
      <div className="relative z-10 pt-6 space-y-3">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center text-white font-bold text-xl font-mono">
                {userName.slice(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 p-0.5 bg-slate-900 rounded-full">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" title="Online" />
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-bold tracking-tight text-white">{userName}</h2>
              <ShieldCheck className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-xs text-slate-400 font-medium">{role}</p>
          </div>
        </div>

        {/* Micro Telemetry Bar */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <UserCheck className="h-3 w-3 text-emerald-400" /> Akses Lengkap
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-blue-400" /> Sesi Terverifikasi
          </span>
        </div>
      </div>
    </Card>
  );
}
