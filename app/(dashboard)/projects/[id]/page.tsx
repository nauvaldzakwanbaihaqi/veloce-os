import { getProjectById } from "@/lib/actions/project";
import { getClients } from "@/lib/actions/client";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, FileText, FileDown, MessageCircle } from "lucide-react";
import Link from "next/link";
import { ProjectStatusSelect } from "@/components/project/project-status-select";
import { ProjectEditForm } from "@/components/project/project-edit-form";

function formatCurrency(value: string | number | null) {
  if (!value) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function getInvoiceStatusBadge(status: string, dueDate: string) {
  const isOverdue = status === "SENT" && new Date(dueDate) < new Date();
  if (isOverdue) return <Badge variant="destructive">Overdue</Badge>;

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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, clients] = await Promise.all([
    getProjectById(id),
    getClients(),
  ]);

  if (!project) {
    notFound();
  }

  const totalBilled = project.invoices.reduce((sum, inv) => sum + Number(inv.total), 0);
  const totalPaid = project.invoices
    .filter((inv) => inv.status === "PAID")
    .reduce((sum, inv) => sum + Number(inv.total), 0);

  return (
    <>
      <PageHeader
        title={project.title}
        description={`Klien: ${project.client.name}`}
        action={
          <div className="flex items-center gap-2">
            <ProjectEditForm project={project} clients={clients} />
            <ProjectStatusSelect projectId={project.id} currentStatus={project.status} />
            <Button variant="outline" size="sm" render={<Link href="/projects" />}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Proyek
            </Button>
          </div>
        }
      />

      <div className="p-4 space-y-6">
        {/* Metric Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Nilai Proyek
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{formatCurrency(project.value)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Ditagihkan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{formatCurrency(totalBilled)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {project.invoices.length} invoice dibuat
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Terbayar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(totalPaid)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Klien Terkait
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="font-semibold text-sm flex items-center gap-1.5">
                <User className="w-4 h-4 text-muted-foreground" />
                <Link href={`/clients/${project.client.id}`} className="hover:underline text-primary">
                  {project.client.name}
                </Link>
              </div>
              {project.client.company && (
                <p className="text-xs text-muted-foreground">{project.client.company}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Project Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Jadwal & Detail Proyek</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Tanggal Mulai:</span>
              <span className="font-medium">
                {project.startDate ? new Date(project.startDate).toLocaleDateString("id-ID") : "-"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Jatuh Tempo Proyek:</span>
              <span className="font-medium">
                {project.dueDate ? new Date(project.dueDate).toLocaleDateString("id-ID") : "-"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Project Invoices Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Invoice Proyek ({project.invoices.length})</CardTitle>
              <CardDescription>Daftar invoice yang diterbitkan untuk proyek ini</CardDescription>
            </div>
            <Button size="sm" render={<Link href="/invoices" />}>
              <FileText className="w-4 h-4 mr-2" /> Buat Invoice Baru
            </Button>
          </CardHeader>
          <CardContent>
            {project.invoices.length === 0 ? (
              <div className="text-center py-6 text-sm text-muted-foreground">
                Belum ada invoice untuk proyek ini.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nomor Invoice</TableHead>
                    <TableHead>Tanggal Terbit</TableHead>
                    <TableHead>Jatuh Tempo</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.invoiceNumber}</TableCell>
                      <TableCell>{new Date(inv.issueDate).toLocaleDateString("id-ID")}</TableCell>
                      <TableCell>{new Date(inv.dueDate).toLocaleDateString("id-ID")}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(inv.total)}</TableCell>
                      <TableCell>{getInvoiceStatusBadge(inv.status, inv.dueDate)}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="outline" size="icon" title="PDF" render={<Link href={`/api/invoices/${inv.id}/pdf`} target="_blank" />}>
                          <FileDown className="w-4 h-4" />
                        </Button>
                        {project.client.phone && (
                          <Button
                            variant="outline"
                            size="icon"
                            title="WhatsApp"
                            render={
                              <Link
                                href={`https://wa.me/${project.client.phone.replace(/\D/g, "")}?text=Halo%20${encodeURIComponent(project.client.name)},%20terlampir%20invoice%20${encodeURIComponent(inv.invoiceNumber)}.`}
                                target="_blank"
                              />
                            }
                          >
                            <MessageCircle className="w-4 h-4 text-green-600" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
