"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { updateUserSettings } from "@/lib/actions/user";
import { Loader2, CheckCircle2 } from "lucide-react";
import type { User } from "@/db/schema";

export function SettingsForm({ user }: { user: User }) {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    try {
      await updateUserSettings({
        name: formData.get("name") as string,
        businessName: formData.get("businessName") as string,
        currency: formData.get("currency") as string,
      });
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to update settings");
      } else {
        setError("Failed to update settings");
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Profil & Identitas Bisnis</CardTitle>
          <CardDescription>
            Kelola nama profil, nama studio/bisnis, dan mata uang default operasional Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" name="name" defaultValue={user.name} required disabled={isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Alamat Email</Label>
            <Input id="email" type="email" defaultValue={user.email} disabled className="bg-muted text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Email digunakan untuk kredensial login akun Anda.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessName">Nama Bisnis / Studio</Label>
            <Input
              id="businessName"
              name="businessName"
              defaultValue={user.businessName}
              placeholder="e.g. Aethera Studio"
              required
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Mata Uang Default</Label>
            <Input id="currency" name="currency" defaultValue={user.currency} placeholder="IDR" required disabled={isPending} />
          </div>

          {success && (
            <div className="flex items-center gap-2 p-3 text-sm font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 rounded-md border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              Pengaturan profil berhasil diperbarui!
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Simpan Pengaturan
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
