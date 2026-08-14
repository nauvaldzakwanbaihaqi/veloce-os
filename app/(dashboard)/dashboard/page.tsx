import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDashboardMetrics } from "@/lib/actions/dashboard";
import { DollarSign, Briefcase, FileText, Users, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

function formatCurrency(value: string | number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function getProjectStatusBadge(status: string) {
  switch (status) {
    case "LEAD":
      return <Badge variant="outline">Lead</Badge>;
    case "IN_PROGRESS":
      return <Badge variant="default">In Progress</Badge>;
    case "REVIEW":
      return <Badge variant="secondary">Review</Badge>;
    case "COMPLETED":
      return <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50">Completed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getInvoiceStatusBadge(status: string, dueDate: string) {
  const isOverdue = status === "SENT" && new Date(dueDate) < new Date();
  
  if (isOverdue) {
    return <Badge variant="destructive">Overdue</Badge>;
  }

  switch (status) {
    case "DRAFT":
      return <Badge variant="outline">Draft</Badge>;
    case "SENT":
      return <Badge variant="secondary">Sent</Badge>;
    case "PAID":
      return <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50">Paid</Badge>;
    case "CANCELLED":
      return <Badge variant="outline" className="text-muted-foreground">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();

  return (
    <>
      <PageHeader 
        title="Dashboard" 
        description="Ringkasan performa finansial dan proyek operasional Anda."
      />
      
      <div className="p-4 space-y-6">
        {/* Overdue Warning Alert Banner if overdue invoices exist */}
        {metrics.overdueInvoicesCount > 0 && (
          <div className="flex items-center justify-between p-4 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <p className="font-semibold text-sm">
                  Perhatian: Ada {metrics.overdueInvoicesCount} invoice menunggak (Overdue)!
                </p>
                <p className="text-xs opacity-90">
                  Total tagihan jatuh tempo sebesar {formatCurrency(metrics.overdueInvoicesTotal)}. Segera kirim reminder ke klien.
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="border-amber-300 dark:border-amber-800" render={<Link href="/invoices" />}>
              Kelola Invoices
            </Button>
          </div>
        )}

        {/* Top Metric Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-md">
                <DollarSign className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(metrics.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Dari invoice berstatus Paid
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proyek Aktif</CardTitle>
              <div className="p-2 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-md">
                <Briefcase className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.activeProjectsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Status In Progress & Review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Belum Dibayar</CardTitle>
              <div className="p-2 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-md">
                <FileText className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(metrics.unpaidInvoicesTotal)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.unpaidInvoicesCount} invoice dikirim (Sent)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Klien</CardTitle>
              <div className="p-2 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-md">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalClientsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Klien terdaftar di CRM
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Activity & Lists Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Invoices */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Invoice Terbaru</CardTitle>
                <CardDescription>5 penagihan terakhir yang dibuat</CardDescription>
              </div>
              <Button variant="ghost" size="sm" render={<Link href="/invoices" />}>
                Lihat Semua <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </CardHeader>
            <CardContent>
              {metrics.recentInvoices.length === 0 ? (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  Belum ada invoice.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nomor</TableHead>
                      <TableHead>Klien</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrics.recentInvoices.map((inv) => (
                      <TableRow key={inv.id}>
                        <TableCell className="font-medium text-xs">{inv.invoiceNumber}</TableCell>
                        <TableCell className="text-xs">{inv.project.client.name}</TableCell>
                        <TableCell className="text-xs font-semibold">{formatCurrency(inv.total)}</TableCell>
                        <TableCell>{getInvoiceStatusBadge(inv.status, inv.dueDate)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Proyek Terbaru</CardTitle>
                <CardDescription>5 proyek terbaru yang didaftarkan</CardDescription>
              </div>
              <Button variant="ghost" size="sm" render={<Link href="/projects" />}>
                Lihat Semua <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </CardHeader>
            <CardContent>
              {metrics.recentProjects.length === 0 ? (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  Belum ada proyek.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul</TableHead>
                      <TableHead>Klien</TableHead>
                      <TableHead>Nilai</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrics.recentProjects.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium text-xs">{p.title}</TableCell>
                        <TableCell className="text-xs">{p.client.name}</TableCell>
                        <TableCell className="text-xs font-semibold">
                          {p.value ? formatCurrency(p.value) : "-"}
                        </TableCell>
                        <TableCell>{getProjectStatusBadge(p.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
