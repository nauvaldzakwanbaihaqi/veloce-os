"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateClient } from "@/lib/actions/client";
import { Loader2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Client } from "@/db/schema";

export function ClientEditForm({ client }: { client: Client }) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function action(formData: FormData) {
    setIsPending(true);
    setError(null);
    try {
      await updateClient(client.id, {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        company: formData.get("company") as string,
        notes: formData.get("notes") as string,
      });
      setOpen(false);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "Failed to update client");
      } else {
        setError("Failed to update client");
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" title="Edit Klien" />}>
        <Edit className="w-4 h-4 mr-1.5" /> Edit Klien
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Edit Data Klien</DialogTitle>
          <DialogDescription>
            Perbarui informasi kontak dan profil klien.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Klien</Label>
            <Input id="name" name="name" defaultValue={client.name} required disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Perusahaan</Label>
            <Input id="company" name="company" defaultValue={client.company || ""} disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={client.email || ""} disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telepon</Label>
            <Input id="phone" name="phone" defaultValue={client.phone || ""} disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Catatan</Label>
            <Textarea id="notes" name="notes" defaultValue={client.notes || ""} disabled={isPending} />
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
