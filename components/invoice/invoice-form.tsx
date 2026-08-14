"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createInvoice } from "@/lib/actions/invoice";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Project, Client } from "@/db/schema";
import type { InvoiceItemInput } from "@/lib/validations/invoice";

type ProjectWithClient = Project & { client: Client };

export function InvoiceForm({ projects }: { projects: ProjectWithClient[] }) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [items, setItems] = useState<InvoiceItemInput[]>([
    { description: "", qty: 1, unitPrice: "" }
  ]);

  function addItem() {
    setItems([...items, { description: "", qty: 1, unitPrice: "" }]);
  }

  function removeItem(index: number) {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  }

  function updateItem(index: number, field: keyof InvoiceItemInput, value: string | number) {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    try {
      await createInvoice({
        projectId: formData.get("projectId") as string,
        issueDate: formData.get("issueDate") as string,
        dueDate: formData.get("dueDate") as string,
        taxRate: Number(formData.get("taxRate") || 0),
        items: items,
      });
      setOpen(false);
      setItems([{ description: "", qty: 1, unitPrice: "" }]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to create invoice");
      } else {
        setError("Failed to create invoice");
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>Buat Invoice</Button>} />
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Buat Invoice Baru</DialogTitle>
          <DialogDescription>
            Masukkan detail invoice dan line items. Total akan dihitung otomatis.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectId">Proyek</Label>
              <Select name="projectId" required disabled={isPending}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih proyek" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.title} - {p.client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxRate">Pajak (%)</Label>
              <Input id="taxRate" name="taxRate" type="number" step="0.1" defaultValue="0" disabled={isPending} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">Tanggal Terbit</Label>
              <Input id="issueDate" name="issueDate" type="date" required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Jatuh Tempo</Label>
              <Input id="dueDate" name="dueDate" type="date" required disabled={isPending} />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Items</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem} disabled={isPending}>
                <Plus className="w-4 h-4 mr-2" /> Tambah Item
              </Button>
            </div>
            
            {items.map((item, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1 space-y-2">
                  <Input 
                    placeholder="Deskripsi..." 
                    value={item.description} 
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    required
                    disabled={isPending}
                  />
                </div>
                <div className="w-24 space-y-2">
                  <Input 
                    type="number" 
                    min="1" 
                    placeholder="Qty" 
                    value={item.qty} 
                    onChange={(e) => updateItem(index, 'qty', parseInt(e.target.value) || 1)}
                    required
                    disabled={isPending}
                  />
                </div>
                <div className="w-32 space-y-2">
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="Harga Satuan" 
                    value={item.unitPrice} 
                    onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
                    required
                    disabled={isPending}
                  />
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1 || isPending}
                  className="mt-0"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan & Generate
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
