import { z } from "zod/v4";

/**
 * Zod schemas untuk validasi input Client.
 * Semua input user WAJIB melewati schema ini sebelum masuk Drizzle
 * (lihat AGENTS.md > Konvensi).
 */

export const createClientSchema = z.object({
  name: z
    .string()
    .min(1, "Nama klien wajib diisi")
    .max(255, "Nama klien terlalu panjang"),
  email: z
    .email("Format email tidak valid")
    .max(255, "Email terlalu panjang")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .max(50, "Nomor telepon terlalu panjang")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .max(255, "Nama perusahaan terlalu panjang")
    .optional()
    .or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
});

export const updateClientSchema = createClientSchema.partial();

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
