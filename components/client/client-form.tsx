"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/actions/client";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function ClientForm() {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function action(formData: FormData) {
    setIsPending(true);
    setError(null);
    try {
      await createClient({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        company: formData.get("company") as string,
        notes: formData.get("notes") as string,
      });
      setOpen(false);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "Failed to create client");
      } else {
        setError("Failed to create client");
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>Tambah Klien</Button>} />
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Tambah Klien Baru</DialogTitle>
          <DialogDescription>
            Masukkan detail klien di bawah ini.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Klien</Label>
            <Input id="name" name="name" required disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Perusahaan</Label>
            <Input id="company" name="company" disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telepon</Label>
            <Input id="phone" name="phone" disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Catatan</Label>
            <Textarea id="notes" name="notes" disabled={isPending} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
