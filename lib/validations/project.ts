import { z } from "zod/v4";

/**
 * Zod schemas untuk validasi input Project.
 * Semua input user WAJIB melewati schema ini sebelum masuk Drizzle
 * (lihat AGENTS.md > Konvensi).
 *
 * Catatan: `value` diterima sebagai string (bukan number) karena
 * nilai uang disimpan sebagai numeric(12,2) di Postgres dan Drizzle
 * mengembalikannya sebagai string. Jangan parseFloat — gunakan
 * aritmatika di SQL atau library decimal-safe (lihat ARCHITECTURE.md).
 */

const projectStatusValues = [
  "LEAD",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
] as const;

export const createProjectSchema = z.object({
  clientId: z.string().uuid("Client ID harus berupa UUID valid"),
  title: z
    .string()
    .min(1, "Judul proyek wajib diisi")
    .max(255, "Judul proyek terlalu panjang"),
  status: z.enum(projectStatusValues).optional().default("LEAD"),
  value: z
    .string()
    .regex(
      /^\d{1,10}(\.\d{1,2})?$/,
      "Nilai proyek harus berupa angka desimal valid (maks 10 digit, 2 desimal)"
    )
    .optional()
    .or(z.literal("")),
  startDate: z.iso.date("Format tanggal mulai tidak valid (YYYY-MM-DD)").optional().or(z.literal("")),
  dueDate: z.iso.date("Format tanggal jatuh tempo tidak valid (YYYY-MM-DD)").optional().or(z.literal("")),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
