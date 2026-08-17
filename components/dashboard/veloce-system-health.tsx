"use client";

import { Card } from "@/components/ui/card";
import { DollarSign, CheckCircle2, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VeloceSystemHealthProps {
  healthScore?: number;
  statusText?: string;
}

export function VeloceSystemHealth({
  healthScore = 85,
  statusText = "Arus Kas Positif",
}: VeloceSystemHealthProps) {
  // SVG circle calculation
  const strokeDashoffset = 283 - (283 * healthScore) / 100;

  const healthItems = [
    { label: "Rasio Pembayaran", value: "92% Tepat Waktu", icon: CheckCircle2, color: "text-emerald-500" },
    { label: "Margin Keuntungan", value: "68% Sehat", icon: TrendingUp, color: "text-blue-500" },
    { label: "Piutang Tertagih", value: "Rp 49.95 jt", icon: Wallet, color: "text-indigo-500" },
  ];

  return (
    <Card className="rounded-3xl border-0 shadow-sm shadow-blue-900/5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-5 flex flex-col justify-between h-full min-h-[220px]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <DollarSign className="h-4 w-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Kesehatan Finansial</h3>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Indikator Arus Kas & Likuiditas
          </p>
        </div>

        <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200/80 text-[10px] font-semibold">
          {statusText}
        </Badge>
      </div>

      {/* Circular Progress & Score */}
      <div className="py-2 flex items-center justify-between gap-4">
        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              className="text-slate-100 dark:text-slate-800"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              className="text-blue-600 dark:text-blue-500 transition-all duration-700"
              strokeWidth="10"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {healthScore}%
            </span>
            <span className="text-[8px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
              Skor Kas
            </span>
          </div>
        </div>

        {/* Micro Health Status List */}
        <div className="space-y-2 flex-1 min-w-0">
          {healthItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-[11px] font-sans gap-1">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                <item.icon className={`h-3 w-3 ${item.color} shrink-0`} />
                <span className="truncate">{item.label}</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white shrink-0 text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Linear Micro Bar */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
        <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500">
          <span>Pemeriksaan Kas</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Kondisi Sangat Baik (0 Macet)</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full w-[85%]" />
        </div>
      </div>
    </Card>
  );
}
