# AGENTS.md — Freelancer OS

Instruksi ini dibaca AI agent (Claude Code, Cursor, dll) di awal setiap sesi. Jaga file ini di bawah ~200 baris. Kalau mau nambah rule, tanya dulu: "ini instruksi yang HARUS selalu diikuti, atau lebih cocok jadi hook otomatis?" Rule yang sifatnya wajib-selalu (format, lint) sebaiknya jadi hook, bukan baris teks yang berharap agent inget terus.

Kompatibel Claude Code (`CLAUDE.md`) — bisa disalin/symlink jadi `CLAUDE.md` kalau kamu commit ke tool itu secara spesifik.

## Project ini apa

Freelancer OS — pusat kendali operasional & finansial untuk freelancer/agensi kecil: CRM klien & proyek, generator invoice (PDF), reminder pembayaran via WhatsApp, dashboard finansial.

**Baca `ARCHITECTURE.md` dulu sebelum kerja di sini.** File ini cuma instruksi operasional — keputusan desain dan alasannya ada di sana. Jangan asumsi dari nama file/folder.

## Stack

- Next.js 15 (App Router) + TypeScript strict
- PostgreSQL via Drizzle ORM (`@neondatabase/serverless` driver)
- Auth.js (credentials provider)
- Tailwind CSS + shadcn/ui
- `@react-pdf/renderer` untuk PDF invoice
- Tremor untuk chart & KPI card
- Zod untuk semua validasi input

## Commands

```bash
pnpm dev                        # dev server
pnpm build                      # production build
pnpm lint                       # eslint + typecheck
pnpm test                       # vitest
pnpm dlx drizzle-kit generate   # generate SQL migration dari perubahan schema
pnpm dlx drizzle-kit migrate    # apply migration ke database
pnpm dlx drizzle-kit studio     # inspect DB lokal (Drizzle Studio)
```

## Konvensi

- Mutation (create/update/delete) lewat **Server Actions**, bukan API routes — kecuali dibutuhkan external webhook.
- Semua input user WAJIB divalidasi Zod schema di `lib/validations/` sebelum masuk Drizzle. Jangan trust data dari client, termasuk hasil kalkulasi (subtotal/tax/total dihitung ulang di server).
- Query database HANYA lewat `lib/db.ts` (Drizzle client singleton, instantiate sekali dari `@neondatabase/serverless`). Jangan bikin koneksi baru di file lain — bikin connection pool bocor, apalagi di serverless environment.
- Nilai uang pakai tipe `numeric` di Drizzle (`{ precision: 12, scale: 2 }`), bukan `integer`/`real`. Drizzle balikin ini sebagai `string` — jangan `parseFloat` untuk kalkulasi, lakukan aritmatika di SQL atau library decimal-safe. Ini non-negotiable untuk data finansial.
- Struktur komponen: primitive shadcn/ui di `components/ui/`, komponen domain-specific di `components/{domain}/` (misal `components/invoice/`).
- Status enum (`projectStatus`, `invoiceStatus`) didefinisikan sekali di `db/schema.ts` pakai `pgEnum`. Jangan duplicate string literal di komponen — import type yang di-infer dari schema (`$inferSelect`/`$inferInsert`).

## Do

- Sebelum mulai task yang nyentuh >1 file, tulis checklist rencana ke `tasks/todo.md` dulu.
- Jalankan `npm run lint` dan `npm run test` sebelum menganggap task selesai.
- Kalau nemu keputusan yang menyentuh perhitungan uang (rounding, pajak, currency) yang belum ada jawabannya di `ARCHITECTURE.md`, **berhenti dan tanya** — jangan asumsi sendiri.

## Don't

- Jangan hardcode secret/API key. Pakai `.env.local`, akses lewat `process.env`.
- Jangan generate PDF di client-side — semua generation invoice terjadi di server.
- Jangan modifikasi file di `prisma/migrations/` yang sudah pernah di-apply — buat migration baru.
- Jangan tambah dependency baru tanpa alasan yang disebutkan di commit message.
- Jangan implementasi item di "Non-Goals MVP" (lihat `ARCHITECTURE.md`) tanpa konfirmasi eksplisit — termasuk payment gateway integration, multi-tenant, recurring invoice.

## Kalau stuck / ambigu

Cek `ARCHITECTURE.md#open-questions`. Kalau pertanyaanmu belum ada di situ, tambahkan ke section itu daripada diam-diam mengasumsikan jawaban.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
