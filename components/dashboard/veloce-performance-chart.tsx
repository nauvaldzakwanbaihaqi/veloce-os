"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";
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
    { hour: "08:00", load: 28, isPeak: false },
    { hour: "10:00", load: 45, isPeak: false },
    { hour: "12:00", load: 82, isPeak: true },
    { hour: "14:00", load: 64, isPeak: false },
    { hour: "16:00", load: 91, isPeak: true },
    { hour: "18:00", load: 52, isPeak: false },
    { hour: "20:00", load: 34, isPeak: false },
  ];

  return (
    <Card className="rounded-3xl border-0 shadow-sm shadow-blue-900/5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-5 flex flex-col justify-between h-full min-h-[220px]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Activity className="h-4 w-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">System Performance</h3>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Throughput & Core Utilization
          </p>
        </div>

        <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200/80 font-mono text-[10px]">
          +14.8% ops
        </Badge>
      </div>

      {/* Bar Chart */}
      <div className="h-32 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#94a3b8" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              domain={[0, 100]}
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
              formatter={(val: any) => [`${val}% Load`, "Throughput"]}
            />
            <Bar dataKey="load" radius={[6, 6, 2, 2]}>
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
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <span>Avg Load: <strong className="text-slate-900 dark:text-white">56.5%</strong></span>
        <span>Peak: <strong className="text-blue-600 dark:text-blue-400">91% @ 16:00</strong></span>
      </div>
    </Card>
  );
}
