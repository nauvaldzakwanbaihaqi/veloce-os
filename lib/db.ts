import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

/**
 * Drizzle client singleton.
 *
 * Semua query database HARUS lewat instance ini — jangan bikin koneksi baru
 * di file lain (lihat AGENTS.md > Konvensi).
 *
 * Pada dev, instance disimpan di globalThis supaya tidak bocor saat
 * Next.js hot-reload me-re-evaluate module.
 */

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn(
      "⚠️ DATABASE_URL is not set. Copy .env.example to .env.local and fill in your Neon connection string."
    );
  }

  // Fallback ke dummy string agar dev server Next.js tidak crash saat module di-load.
  // Query betulan akan tetap gagal kalau ini belum di-set.
  const sql = neon(url || "postgres://dummy:dummy@dummy/dummy");
  return drizzle(sql, { schema });
}

// Singleton pattern: reuse across hot-reloads in dev
const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof createDb> | undefined;
};

export const db = globalForDb.db ?? createDb();

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}
