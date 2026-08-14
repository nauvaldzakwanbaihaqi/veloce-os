"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateProjectStatus } from "@/lib/actions/project";

interface ProjectStatusSelectProps {
  projectId: string;
  currentStatus: "LEAD" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
}

export function ProjectStatusSelect({ projectId, currentStatus }: ProjectStatusSelectProps) {
  const [loading, setLoading] = useState(false);

  async function handleStatusChange(val: string | null) {
    if (!val) return;
    setLoading(true);
    try {
      await updateProjectStatus(projectId, val as "LEAD" | "IN_PROGRESS" | "REVIEW" | "COMPLETED");
    } catch {
      alert("Gagal memperbarui status proyek");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Select defaultValue={currentStatus} onValueChange={handleStatusChange} disabled={loading}>
      <SelectTrigger className="w-[160px] h-9">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="LEAD">Lead</SelectItem>
        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
        <SelectItem value="REVIEW">Review</SelectItem>
        <SelectItem value="COMPLETED">Completed</SelectItem>
      </SelectContent>
    </Select>
  );
}
