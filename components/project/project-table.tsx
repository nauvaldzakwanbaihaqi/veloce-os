"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Project, Client } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteProject } from "@/lib/actions/project";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type ProjectWithClient = Project & { client: Client };

export function ProjectTable({ projects }: { projects: ProjectWithClient[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Judul</TableHead>
            <TableHead>Klien</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Nilai</TableHead>
            <TableHead>Jatuh Tempo</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                Belum ada data proyek.
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => (
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
  );
}
