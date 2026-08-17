"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export function VelocePerformanceChart() {
  const data = [
    { bulan: "Jan", pendapatan: 28, isPeak: false },
    { bulan: "Feb", pendapatan: 35, isPeak: false },
    { bulan: "Mar", pendapatan: 42, isPeak: false },
    { bulan: "Apr", pendapatan: 50, isPeak: true },
    { bulan: "Mei", pendapatan: 38, isPeak: false },
    { bulan: "Jun", pendapatan: 58, isPeak: true },
    { bulan: "Jul", pendapatan: 49.95, isPeak: false },
  ];

  return (
    <Card className="rounded-3xl border-0 shadow-sm shadow-blue-900/5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-5 flex flex-col justify-between h-full min-h-55">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <TrendingUp className="h-4 w-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Performa Bisnis</h3>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Pertumbuhan Pendapatan Bulanan
          </p>
        </div>

        <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200/80 font-mono text-[10px]">
          +24.5% bln ini
        </Badge>
      </div>

      {/* Bar Chart */}
      <div className="h-32 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="bulan"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#94a3b8" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              domain={[0, 70]}
              width={25}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                fontSize: "11px",
                backgroundColor: "#0f172a",
                borderColor: "#1e293b",
                color: "#ffffff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(val: any) => [`Rp ${val} Juta`, "Pendapatan"]}
            />
            <Bar dataKey="pendapatan" radius={[6, 6, 2, 2]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isPeak ? "#2563eb" : "#93c5fd"}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Metrics */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10.5px] font-mono text-slate-500 dark:text-slate-400">
        <span>Rata: <strong className="text-slate-900 dark:text-white">Rp 43jt/bln</strong></span>
        <span>Puncak: <strong className="text-blue-600 dark:text-blue-400">Rp 58jt (Jun)</strong></span>
      </div>
    </Card>
  );
}
