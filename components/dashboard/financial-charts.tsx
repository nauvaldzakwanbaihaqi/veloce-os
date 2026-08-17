"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Decimal from "decimal.js";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface FinancialChartsProps {
  totalRevenue: string;
  unpaidTotal: string;
  overdueTotal: string;
  activeProjectsCount: number;
  projectStatusBreakdown: {
    lead: number;
    inProgress: number;
    review: number;
    completed: number;
  };
}

function formatCurrency(val: string | number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(val));
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  LEAD: { label: "Lead", color: "#a1a1aa" },
  IN_PROGRESS: { label: "In Progress", color: "#3b82f6" },
  REVIEW: { label: "Review", color: "#a855f7" },
  COMPLETED: { label: "Completed", color: "#10b981" },
};

export function FinancialCharts({
  totalRevenue,
  unpaidTotal,
  overdueTotal,
  projectStatusBreakdown,
}: FinancialChartsProps) {
  // Use decimal.js for precise ratio calculation (ARCHITECTURE.md compliance)
  const revDec = new Decimal(totalRevenue || "0");
  const unpaidDec = new Decimal(unpaidTotal || "0");
  const overdueDec = new Decimal(overdueTotal || "0");
  const totalVolume = revDec.add(unpaidDec);

  const paidPercentage = totalVolume.gt(0)
    ? revDec.div(totalVolume).mul(100).round().toNumber()
    : 0;
  const unpaidPercentage = totalVolume.gt(0)
    ? unpaidDec.div(totalVolume).mul(100).round().toNumber()
    : 0;

  // Revenue donut chart data
  const revenueData = [
    { name: "Terbayar", value: revDec.toNumber(), color: "#10b981" },
    { name: "Belum Dibayar", value: unpaidDec.toNumber(), color: "#f59e0b" },
  ].filter((d) => d.value > 0);

  // If no data, show placeholder
  if (revenueData.length === 0) {
    revenueData.push({ name: "Belum Ada Data", value: 1, color: "#e5e7eb" });
  }

  const statusCounts: Record<string, number> = {
    LEAD: projectStatusBreakdown.lead,
    IN_PROGRESS: projectStatusBreakdown.inProgress,
    REVIEW: projectStatusBreakdown.review,
    COMPLETED: projectStatusBreakdown.completed,
  };

  const projectData = Object.entries(STATUS_CONFIG).map(([key, cfg]) => ({
    name: cfg.label,
    count: statusCounts[key] || 0,
    fill: cfg.color,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2 h-full">
      {/* 1. Revenue Donut Chart */}
      <Card className="flex flex-col h-full border-0 shadow-lg shadow-blue-900/5 bg-white dark:bg-slate-900/50">
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center justify-between">
            <span>Rasio Realisasi Pendapatan</span>
            <Badge variant="outline" className="text-xs">
              Paid vs Unpaid
            </Badge>
          </CardTitle>
          <CardDescription>
            Perbandingan total pembayaran masuk vs invoice yang belum dibayar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    dataKey="value"
                    strokeWidth={2}
                    stroke="hsl(var(--background))"
                  >
                    {revenueData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => formatCurrency(value)}
                    contentStyle={{
                      borderRadius: "8px",
                      fontSize: "12px",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--popover))",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="h-3 w-3 rounded-full bg-emerald-500 shrink-0" />
                <span className="flex-1">Terbayar</span>
                <span className="font-semibold">{paidPercentage}%</span>
              </div>
              <div className="text-xs text-muted-foreground pl-5">
                {formatCurrency(revDec.toString())}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="h-3 w-3 rounded-full bg-amber-500 shrink-0" />
                <span className="flex-1">Belum Dibayar</span>
                <span className="font-semibold">{unpaidPercentage}%</span>
              </div>
              <div className="text-xs text-muted-foreground pl-5">
                {formatCurrency(unpaidDec.toString())}
              </div>
              {overdueDec.gt(0) && (
                <div className="p-2 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center justify-between">
                  <span>Menunggak:</span>
                  <span className="font-bold">{formatCurrency(overdueDec.toString())}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Project Pipeline Bar Chart */}
      <Card className="flex flex-col h-full border-0 shadow-lg shadow-blue-900/5 bg-white dark:bg-slate-900/50">
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center justify-between">
            <span>Distribusi Pipeline Proyek</span>
            <Badge variant="secondary" className="text-xs">
              Status Breakdown
            </Badge>
          </CardTitle>
          <CardDescription>
            Jumlah proyek berdasarkan status dalam pipeline Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-45">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectData} layout="vertical" barSize={20}>
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={90}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    fontSize: "12px",
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--popover))",
                    color: "hsl(var(--popover-foreground))",
                  }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`${value} proyek`, "Jumlah"]}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {projectData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Legend
            content={() => (
              <div className="flex flex-wrap gap-3 mt-2 justify-center">
                {projectData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5 text-xs">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    {item.name} ({item.count})
                  </div>
                ))}
              </div>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
