"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Invoice, Project, Client } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, MessageCircle, FileDown, Search } from "lucide-react";
import { deleteInvoice, updateInvoiceStatus } from "@/lib/actions/invoice";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type InvoiceWithProject = Invoice & { project: Project & { client: Client } };

export function InvoiceTable({ invoices }: { invoices: InvoiceWithProject[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

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

  const filteredInvoices = invoices.filter((inv) => {
    const isOverdue = inv.status === "SENT" && new Date(inv.dueDate) < new Date();
    const query = search.toLowerCase();
    
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(query) ||
      inv.project.client.name.toLowerCase().includes(query) ||
      inv.project.title.toLowerCase().includes(query);

    let matchesStatus = statusFilter === "ALL" || inv.status === statusFilter;
    if (statusFilter === "OVERDUE") {
      matchesStatus = isOverdue;
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nomor invoice, klien, proyek..."
              className="pl-9 h-9 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "ALL")}>
            <SelectTrigger className="w-35 h-9 text-xs">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Semua Status</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="SENT">Sent</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="OVERDUE">Overdue</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <span className="text-xs text-muted-foreground">
          Menampilkan {filteredInvoices.length} dari {invoices.length} invoice
        </span>
      </div>

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
            {filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  Tidak ada data invoice yang cocok.
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((inv) => {
                const isOverdue = inv.status === "SENT" && new Date(inv.dueDate) < new Date();

                return (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">
                      <Link href={`/invoices/${inv.id}`} className="hover:underline text-primary">
                        {inv.invoiceNumber}
                      </Link>
                      {isOverdue && (
                        <Badge variant="destructive" className="ml-2 text-[10px] px-1.5 py-0">
                          Overdue
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <Link href={`/clients/${inv.project.client.id}`} className="font-semibold hover:underline">
                          {inv.project.client.name}
                        </Link>
                        <Link href={`/projects/${inv.project.id}`} className="text-xs text-muted-foreground hover:underline">
                          {inv.project.title}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{formatCurrency(inv.total)}</TableCell>
                    <TableCell>{new Date(inv.dueDate).toLocaleDateString("id-ID")}</TableCell>
                    <TableCell>
                      <Select
                        defaultValue={inv.status}
                        onValueChange={(val) => handleStatusChange(inv.id, val)}
                        disabled={loadingId === inv.id}
                      >
                        <SelectTrigger className="w-30 h-8 border-none bg-transparent shadow-none px-0">
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
                    <TableCell className="text-right space-x-1">
                      <Button variant="outline" size="icon" title="Buka PDF" render={<Link href={`/api/invoices/${inv.id}/pdf`} target="_blank" />}>
                        <FileDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        title="Kirim WA"
                        render={
                          <Link
                            href={`https://wa.me/${inv.project.client.phone?.replace(/\D/g, "") ?? ""}?text=Halo%20${encodeURIComponent(inv.project.client.name)},%20terlampir%20invoice%20${encodeURIComponent(inv.invoiceNumber)}.`}
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
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
