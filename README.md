# Veloce OS

Pusat kendali operasional & finansial ringkas untuk freelancer, solopreneur, dan pemilik agensi kecil — CRM klien & proyek, invoice generator, reminder pembayaran, dan dashboard finansial dalam satu tempat.

## Masalah yang diselesaikan

- **Administrasi tercecer** — data klien & status proyek tersebar di HP, Sheets, WhatsApp.
- **Invoicing lambat** — pembuatan invoice manual dan tidak ada sistem reminder penagihan.
- **Buta finansial** — tidak ada gambaran real-time soal proyeksi pendapatan, piutang, dan performa historis.

## Fitur utama

1. **CRM & Project Management** — profil klien, riwayat proyek, status (Lead → In Progress → Review → Completed).
2. **One-Click Invoice** — generate invoice, export PDF profesional, reminder pembayaran via link WhatsApp.
3. **Financial Dashboard** — KPI card & grafik: total revenue, proyek aktif, invoice overdue/unpaid.

## Tech Stack

Next.js 15 (App Router) · TypeScript · PostgreSQL + Drizzle ORM · Auth.js · Tailwind + shadcn/ui · @react-pdf/renderer · Tremor

Alasan di balik setiap pilihan ada di [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Getting Started

```bash
# install dependencies
pnpm install

# copy env template & isi kredensial
cp .env.example .env.local

# generate migration dari schema
pnpm dlx drizzle-kit generate

# apply migration ke database
pnpm dlx drizzle-kit migrate

# jalankan dev server
pnpm dev
```

## Struktur proyek

```
app/                  # Next.js App Router — routes & pages
components/
  ui/                 # shadcn/ui primitives
  invoice/, client/, dashboard/   # komponen per domain
db/
  schema.ts           # Drizzle ORM schema (data model)
lib/
  db.ts               # Drizzle client singleton (Neon driver)
  utils.ts            # Utility functions (cn, etc.)
  validations/        # Zod schemas
drizzle/              # Generated SQL migrations (drizzle-kit)
tasks/
  todo.md             # plan-first checklist (lihat AGENTS.md)
```

## Dokumen lain

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — keputusan desain, data model, dan alasannya.
- [`AGENTS.md`](./AGENTS.md) — instruksi untuk AI coding agent (Claude Code / Cursor / dll).

## Status

MVP — lihat scope & non-goals di `ARCHITECTURE.md`.
