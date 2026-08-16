"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProject } from "@/lib/actions/project";
import { Loader2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Project, Client } from "@/db/schema";

interface ProjectEditFormProps {
  project: Project;
  clients?: Client[];
}

export function ProjectEditForm({ project, clients }: ProjectEditFormProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function action(formData: FormData) {
    setIsPending(true);
    setError(null);
    try {
      const selectedClient = formData.get("clientId") as string;
      await updateProject(project.id, {
        title: formData.get("title") as string,
        clientId: selectedClient || project.clientId,
        status: (formData.get("status") as "LEAD" | "IN_PROGRESS" | "REVIEW" | "COMPLETED") || project.status,
        value: (formData.get("value") as string) || null,
        startDate: (formData.get("startDate") as string) || null,
        dueDate: (formData.get("dueDate") as string) || null,
      });
      setOpen(false);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "Failed to update project");
      } else {
        setError("Failed to update project");
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" title="Edit Proyek" />}>
        <Edit className="w-4 h-4 mr-1.5" /> Edit Proyek
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Edit Data Proyek</DialogTitle>
          <DialogDescription>
            Perbarui detail proyek dan informasi tenggat waktu.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Proyek</Label>
            <Input id="title" name="title" defaultValue={project.title} required disabled={isPending} />
          </div>
          {clients && clients.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="clientId">Klien</Label>
              <Select name="clientId" defaultValue={project.clientId} disabled={isPending}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} {client.company ? `(${client.company})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Nilai (Rp)</Label>
              <Input id="value" name="value" type="number" step="0.01" defaultValue={project.value || ""} disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={project.status} disabled={isPending}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LEAD">Lead</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="REVIEW">Review</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Mulai</Label>
              <Input id="startDate" name="startDate" type="date" defaultValue={project.startDate || ""} disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Jatuh Tempo</Label>
              <Input id="dueDate" name="dueDate" type="date" defaultValue={project.dueDate || ""} disabled={isPending} />
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
