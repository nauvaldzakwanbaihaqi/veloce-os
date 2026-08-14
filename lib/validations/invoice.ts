import { z } from "zod";

export const invoiceItemSchema = z.object({
  description: z.string().min(1, "Deskripsi wajib diisi"),
  qty: z.coerce.number().int().min(1, "Kuantitas minimal 1"),
  unitPrice: z.string().min(1, "Harga satuan wajib diisi"), // dikirim sebagai string agar presisi decimal.js aman
});

export const invoiceSchema = z.object({
  projectId: z.string().min(1, "Proyek wajib dipilih"),
  issueDate: z.string().min(1, "Tanggal terbit wajib diisi"),
  dueDate: z.string().min(1, "Tanggal jatuh tempo wajib diisi"),
  items: z.array(invoiceItemSchema).min(1, "Minimal 1 item invoice"),
  taxRate: z.coerce.number().min(0).max(100).default(0), // dalam persentase, e.g., 11 untuk 11%
});

export type InvoiceInput = z.infer<typeof invoiceSchema>;
export type InvoiceItemInput = z.infer<typeof invoiceItemSchema>;
