"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Laptop, ShieldCheck, RefreshCw, Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function VeloceSystemAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const sections = [
    {
      id: "device-info",
      title: "Device Info",
      subtitle: "Hardware & Platform",
      icon: Laptop,
      badge: "ARM64",
      content: (
        <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
          <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
            <span>Model:</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">Apple Silicon M3</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
            <span>Kernel:</span>
            <span className="text-slate-900 dark:text-slate-200">Darwin 24.1.0</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Engine:</span>
            <span className="text-blue-600 dark:text-blue-400">Node v22.4 (Turbopack)</span>
          </div>
        </div>
      ),
    },
    {
      id: "security",
      title: "Security Summary",
      subtitle: "Zero-Trust & Vault",
      icon: ShieldCheck,
      badge: "Protected",
      badgeColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200",
      content: (
        <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Check className="h-3.5 w-3.5" />
            <span>Encrypted Auth.js Session</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Check className="h-3.5 w-3.5" />
            <span>Strict Zod Schema Guard</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Check className="h-3.5 w-3.5" />
            <span>Decimal-Safe Ledger Active</span>
          </div>
        </div>
      ),
    },
    {
      id: "updates",
      title: "System Updates",
      subtitle: "OTA Patch & Sync",
      icon: RefreshCw,
      badge: "v2.4.0",
      content: (
        <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-400">
          <p className="text-[11px] leading-relaxed">
            All database migrations and core dependencies are synchronized with Neon Serverless Postgres.
          </p>
          <div className="p-2 rounded-xl bg-blue-50/50 dark:bg-slate-800 text-[11px] text-blue-700 dark:text-blue-300 font-medium flex items-center justify-between">
            <span>Status: Up to date</span>
            <span className="font-mono text-[10px] text-slate-400">Auto-sync</span>
          </div>
        </div>
      ),
    },
    {
      id: "network",
      title: "Network Config",
      subtitle: "Gateways & DNS",
      icon: Globe,
      badge: "1.2 Gbps",
      content: (
        <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
          <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
            <span>Protocol:</span>
            <span className="text-slate-900 dark:text-slate-200">HTTP/3 (QUIC)</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
            <span>Latency:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">14 ms</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Region:</span>
            <span className="text-slate-900 dark:text-slate-200">ap-southeast (Jakarta)</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Card className="rounded-3xl border-0 shadow-sm shadow-blue-900/5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 space-y-2">
      <div className="px-2 py-1.5 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
          Diagnostics & Config
        </span>
        <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">4 modules</span>
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
