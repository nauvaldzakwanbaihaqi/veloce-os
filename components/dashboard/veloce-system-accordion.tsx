"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Users, Activity, ChevronDown, ArrowRight, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function VeloceSystemAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const sections = [
    {
      id: "ringkasan-klien",
      title: "Ringkasan Klien",
      subtitle: "Database & Portofolio",
      icon: Users,
      badge: "20 Klien",
      badgeColor: "text-blue-700 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200",
      content: (
        <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-400 font-sans">
          <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
            <span>Klien Aktif:</span>
            <span className="font-bold text-slate-900 dark:text-slate-200">15 Klien (75%)</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
            <span>Prospek Baru (Lead):</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">5 Prospek</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Retensi Klien:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">94.2% Positif</span>
          </div>
          <Link
            href="/clients"
            className="flex items-center justify-between p-2 mt-1 rounded-xl bg-blue-50/60 dark:bg-slate-800 text-blue-700 dark:text-blue-300 font-medium hover:bg-blue-100 transition-colors"
          >
            <span>Buka Manajemen Klien</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ),
    },
    {
      id: "laporan-keuangan",
      title: "Laporan Keuangan",
      subtitle: "Arus Kas & Piutang",
      icon: DollarSign,
      badge: "Rp 49.95 jt",
      badgeColor: "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200",
      content: (
        <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
            <span>Total Penerimaan:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Rp 49.950.000</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
            <span>Menunggu Pembayaran:</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">Rp 13.875.000</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Perhitungan Pajak:</span>
            <span className="font-mono text-slate-900 dark:text-slate-200">PPh Final 0.5% (Tersedia)</span>
          </div>
          <Link
            href="/invoices"
            className="flex items-center justify-between p-2 mt-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 transition-colors"
          >
            <span>Lihat Semua Invoice</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ),
    },
    {
      id: "aktivitas-terbaru",
      title: "Aktivitas Terbaru",
      subtitle: "Log Penagihan & Proyek",
      icon: Activity,
      badge: "3 Baru",
      content: (
        <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-900 dark:text-white">Invoice #INV-004 Terkirim</span>
              <span className="text-[10px] text-slate-400 font-mono">10m lalu</span>
            </div>
            <p className="text-[10px] text-slate-500">PT Maju Bersama · Rp 13.875.000</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-900 dark:text-white">Proyek Website Selesai</span>
              <span className="text-[10px] text-slate-400 font-mono">2j lalu</span>
            </div>
            <p className="text-[10px] text-slate-500">Klien CV Sukses Makmur · Milestone 3</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Card className="rounded-3xl border-0 shadow-sm shadow-blue-900/5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 space-y-2">
      <div className="px-2 py-1.5 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
          Modul Bisnis & Informasi
        </span>
        <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-semibold">3 Modul</span>
      </div>

      <div className="space-y-1.5">
        {sections.map((section, idx) => {
          const isExpanded = expandedIndex === idx;
          const Icon = section.icon;

          return (
            <div
              key={section.id}
              className={cn(
                "rounded-2xl border transition-all duration-200 overflow-hidden",
                isExpanded
                  ? "bg-slate-50/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 shadow-xs"
                  : "bg-transparent border-transparent hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
              )}
            >
              <button
                type="button"
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="w-full p-3 flex items-center justify-between text-left focus:outline-hidden"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-xl transition-colors",
                      isExpanded
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {section.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                      {section.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-[10px] font-mono px-2 py-0.5 rounded-full border",
                      section.badgeColor || "text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    )}
                  >
                    {section.badge}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-slate-400 transition-transform duration-200",
                      isExpanded && "rotate-180 text-blue-600"
                    )}
                  />
                </div>
              </button>

              {isExpanded && <div className="px-4 pb-3 animate-in fade-in-50 duration-200">{section.content}</div>}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
