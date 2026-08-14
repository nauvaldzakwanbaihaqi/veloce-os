"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Invoice, Project, Client } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Trash2, MessageCircle, FileDown } from "lucide-react";
import { deleteInvoice, updateInvoiceStatus } from "@/lib/actions/invoice";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

type InvoiceWithProject = Invoice & { project: Project & { client: Client } };

export function InvoiceTable({ invoices }: { invoices: InvoiceWithProject[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus invoice ini?")) return;
    setLoadingId(id);
    try {
      await deleteInvoice(id);
    } catch {
      alert("Gagal menghapus invoice");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleStatusChange(id: string, newStatus: string | null) {
    if (!newStatus) return;
    setLoadingId(id);
    try {
      await updateInvoiceStatus(id, newStatus as "DRAFT" | "SENT" | "PAID" | "CANCELLED");
    } catch {
      alert("Gagal mengubah status");
    } finally {
      setLoadingId(null);
    }
  }

  function formatCurrency(value: string) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(Number(value));
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nomor Invoice</TableHead>
            <TableHead>Klien / Proyek</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Jatuh Tempo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                Belum ada data invoice.
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-medium">{inv.invoiceNumber}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{inv.project.client.name}</span>
                    <span className="text-xs text-muted-foreground">{inv.project.title}</span>
                  </div>
                </TableCell>
                <TableCell>{formatCurrency(inv.total)}</TableCell>
                <TableCell>{new Date(inv.dueDate).toLocaleDateString('id-ID')}</TableCell>
                <TableCell>
                  <Select 
                    defaultValue={inv.status} 
                    onValueChange={(val) => handleStatusChange(inv.id, val)}
                    disabled={loadingId === inv.id}
                  >
                    <SelectTrigger className="w-[120px] h-8 border-none bg-transparent shadow-none px-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="SENT">Sent</SelectItem>
                      <SelectItem value="PAID">Paid</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="icon" title="Buka PDF" render={<Link href={`/api/invoices/${inv.id}/pdf`} target="_blank" />}>
                    <FileDown className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    title="Kirim WA"
                    render={
                      <Link
                        href={`https://wa.me/${inv.project.client.phone?.replace(/\D/g, '') ?? ''}?text=Halo%20${encodeURIComponent(inv.project.client.name)},%20terlampir%20invoice%20${encodeURIComponent(inv.invoiceNumber)}.`}
                        target="_blank"
                      />
                    }
                  >
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(inv.id)}
                    disabled={loadingId === inv.id}
                    title="Hapus"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

