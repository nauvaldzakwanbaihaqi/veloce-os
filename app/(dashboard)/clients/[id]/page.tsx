import { getClientById } from "@/lib/actions/client";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone, Building, FileText, Briefcase, DollarSign, MessageCircle, FileDown } from "lucide-react";
import Link from "next/link";

function formatCurrency(value: string | number | null) {
  if (!value) return "Rp 0";
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

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

  // Flatten all invoices across client projects
  const allInvoices = client.projects.flatMap((p) =>
    p.invoices.map((inv) => ({
      ...inv,
      projectTitle: p.title,
    }))
  );

  const totalPaidRevenue = allInvoices
    .filter((inv) => inv.status === "PAID")
    .reduce((acc, inv) => acc + Number(inv.total), 0);

  return (
    <>
      <PageHeader
        title={client.name}
        description={client.company || "Detail profil dan riwayat klien"}
        action={
          <Button variant="outline" size="sm" render={<Link href="/clients" />}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Klien
          </Button>
        }
      />

      <div className="p-4 space-y-6">
        {/* Top Info Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Informasi Kontak
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="font-semibold">{client.company || "Perorangan"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{client.email || "-"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{client.phone || "-"}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Statistik Proyek
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" /> Total Proyek
                </span>
                <span className="text-lg font-bold">{client.projects.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Total Invoice
                </span>
                <span className="text-lg font-bold">{allInvoices.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue Terbayar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <DollarSign className="w-5 h-5" />
                {formatCurrency(totalPaidRevenue)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total pembayaran invoice berstatus Paid
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Notes section if any */}
        {client.notes && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Catatan Klien</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {client.notes}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Projects List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Proyek Klien ({client.projects.length})</CardTitle>
            <CardDescription>Daftar proyek yang dikerjakan untuk klien ini</CardDescription>
          </CardHeader>
          <CardContent>
            {client.projects.length === 0 ? (
              <div className="text-center py-6 text-sm text-muted-foreground">
                Belum ada proyek untuk klien ini.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul Proyek</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Nilai Proyek</TableHead>
                    <TableHead>Tgl Mulai</TableHead>
                    <TableHead>Jatuh Tempo</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {client.projects.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.title}</TableCell>
                      <TableCell>{getProjectStatusBadge(p.status)}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(p.value)}</TableCell>
                      <TableCell>{p.startDate ? new Date(p.startDate).toLocaleDateString("id-ID") : "-"}</TableCell>
                      <TableCell>{p.dueDate ? new Date(p.dueDate).toLocaleDateString("id-ID") : "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" render={<Link href={`/projects/${p.id}`} />}>
                          Detail Proyek
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Invoices List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Invoice Klien ({allInvoices.length})</CardTitle>
            <CardDescription>Daftar seluruh invoice penagihan untuk klien ini</CardDescription>
          </CardHeader>
          <CardContent>
            {allInvoices.length === 0 ? (
              <div className="text-center py-6 text-sm text-muted-foreground">
                Belum ada invoice untuk klien ini.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nomor Invoice</TableHead>
                    <TableHead>Proyek</TableHead>
                    <TableHead>Total Tagihan</TableHead>
                    <TableHead>Jatuh Tempo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allInvoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.invoiceNumber}</TableCell>
                      <TableCell>{inv.projectTitle}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(inv.total)}</TableCell>
                      <TableCell>{new Date(inv.dueDate).toLocaleDateString("id-ID")}</TableCell>
                      <TableCell>{getInvoiceStatusBadge(inv.status, inv.dueDate)}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="outline" size="icon" title="PDF" render={<Link href={`/api/invoices/${inv.id}/pdf`} target="_blank" />}>
                          <FileDown className="w-4 h-4" />
                        </Button>
                        {client.phone && (
                          <Button
                            variant="outline"
                            size="icon"
                            title="WhatsApp"
                            render={
                              <Link
                                href={`https://wa.me/${client.phone.replace(/\D/g, "")}?text=Halo%20${encodeURIComponent(client.name)},%20terlampir%20invoice%20${encodeURIComponent(inv.invoiceNumber)}.`}
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
