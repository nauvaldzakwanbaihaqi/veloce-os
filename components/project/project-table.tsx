"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Project, Client } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Search } from "lucide-react";
import { deleteProject } from "@/lib/actions/project";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type ProjectWithClient = Project & { client: Client };

export function ProjectTable({ projects }: { projects: ProjectWithClient[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus proyek ini?")) return;
    setDeletingId(id);
    try {
      await deleteProject(id);
    } catch {
      alert("Gagal menghapus proyek");
    } finally {
      setDeletingId(null);
    }
  }

  function formatCurrency(value: string | null) {
    if (!value) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(Number(value));
  }

  function StatusBadge({ status }: { status: string }) {
    switch (status) {
      case "LEAD": return <Badge variant="secondary">Lead</Badge>;
      case "IN_PROGRESS": return <Badge variant="default">In Progress</Badge>;
      case "REVIEW": return <Badge variant="outline">Review</Badge>;
      case "COMPLETED": return <Badge variant="default" className="bg-green-600 hover:bg-green-700">Completed</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  }

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari judul proyek atau klien..."
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
              <SelectItem value="LEAD">Lead</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="REVIEW">Review</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <span className="text-xs text-muted-foreground">
          Menampilkan {filteredProjects.length} dari {projects.length} proyek
        </span>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Klien</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Nilai</TableHead>
              <TableHead>Jatuh Tempo</TableHead>
              <TableHead className="w-25 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  Tidak ada data proyek yang cocok.
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <Link href={`/projects/${project.id}`} className="hover:underline text-primary">
                      {project.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/clients/${project.client.id}`} className="hover:underline text-muted-foreground hover:text-foreground">
                      {project.client.name}
                    </Link>
                  </TableCell>
                  <TableCell><StatusBadge status={project.status} /></TableCell>
                  <TableCell>{formatCurrency(project.value)}</TableCell>
                  <TableCell>{project.dueDate ? new Date(project.dueDate).toLocaleDateString('id-ID') : "-"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(project.id)}
                      disabled={deletingId === project.id}
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
    </div>
  );
}
