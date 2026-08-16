"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FinancialChartsProps {
  totalRevenue: string;
  unpaidTotal: string;
  overdueTotal: string;
  activeProjectsCount: number;
  recentProjects: Array<{
    id: string;
    title: string;
    status: string;
    value: string | null;
  }>;
}

function formatCurrency(val: string | number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(val));
}

export function FinancialCharts({
  totalRevenue,
  unpaidTotal,
  overdueTotal,
  recentProjects,
}: FinancialChartsProps) {
  const revNum = Number(totalRevenue) || 0;
  const unpaidNum = Number(unpaidTotal) || 0;
  const overdueNum = Number(overdueTotal) || 0;
  const totalVolume = revNum + unpaidNum;

  const paidPercentage = totalVolume > 0 ? Math.round((revNum / totalVolume) * 100) : 0;
  const unpaidPercentage = totalVolume > 0 ? Math.round((unpaidNum / totalVolume) * 100) : 0;

  // Project status distribution
  const statusCounts = recentProjects.reduce(
    (acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalProj = recentProjects.length || 1;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* 1. Revenue Collection & Billing Ratio Chart */}
      <Card>
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
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                Terbayar (Paid): {formatCurrency(revNum)}
              </span>
              <span className="font-semibold">{paidPercentage}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${paidPercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                Belum Dibayar (Sent): {formatCurrency(unpaidNum)}
              </span>
              <span className="font-semibold">{unpaidPercentage}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: `${unpaidPercentage}%` }}
              />
            </div>
          </div>

          {overdueNum > 0 && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center justify-between">
              <span>Menunggak (Overdue):</span>
              <span className="font-bold">{formatCurrency(overdueNum)}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2. Project Pipeline Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center justify-between">
            <span>Distribusi Pipeline Proyek</span>
            <Badge variant="secondary" className="text-xs">
              Status Breakdown
            </Badge>
          </CardTitle>
          <CardDescription>
            Persentase status proyek dalam pipeline operasional Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { key: "LEAD", label: "Lead", color: "bg-zinc-400" },
            { key: "IN_PROGRESS", label: "In Progress", color: "bg-blue-500" },
            { key: "REVIEW", label: "Review", color: "bg-purple-500" },
            { key: "COMPLETED", label: "Completed", color: "bg-emerald-500" },
          ].map((item) => {
            const count = statusCounts[item.key] || 0;
            const pct = Math.round((count / totalProj) * 100);

            return (
              <div key={item.key} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    {item.label} ({count})
                  </span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full ${item.color} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
