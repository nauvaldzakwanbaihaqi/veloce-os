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

## Cara menggunakan web app ini

### 1. Buka & Login
1. Akses halaman utama Veloce OS di browser.
2. Klik **"Buka Dashboard"** atau **"Masuk"** di navbar.
3. Login dengan akun demo: `user@nextmail.com` / `123456`, atau buat akun baru.

### 2. Dashboard — Pusat Komando
Setelah login, Anda langsung masuk ke **Dashboard** yang menampilkan:
- **Alert Banner** — peringatan tagihan overdue yang perlu ditindaklanjuti.
- **Metrik Utama** — progress Target Pendapatan, Proyek Selesai, dan Kapasitas Tim.
- **Stat Cards** — jumlah Proyek Aktif, Klien Terdaftar, dan Tugas Selesai.
- **Performa Bisnis** — grafik pendapatan bulanan (bar chart).
- **Pelacak Waktu Kerja** — timer sesi kerja harian dengan target 8 jam.
- **Jadwal & Tenggat Waktu** — kalender mingguan deadline proyek dan penagihan.
- **Tugas Prioritas** — daftar pekerjaan mendesak hari ini.

### 3. Klien — CRM Database
Navigasi ke tab **"Klien"** untuk:
- Melihat daftar semua klien terdaftar.
- Menambah klien baru (nama, email, telepon, alamat).
- Melihat detail profil klien dan riwayat proyek terkait.

### 4. Proyek — Manajemen Proyek
Tab **"Proyek"** untuk:
- Membuat proyek baru dan assign ke klien tertentu.
- Melacak status proyek: `Lead → In Progress → Review → Completed`.
- Melihat detail proyek termasuk deskripsi, nilai kontrak, dan timeline.

### 5. Tagihan — Invoice & Penagihan
Tab **"Tagihan"** untuk:
- Membuat invoice baru dengan item, kuantitas, harga, dan pajak.
- Mengunduh invoice sebagai **PDF profesional** (server-side rendered).
- Mengirim **reminder WhatsApp 1-klik** ke klien dengan pesan pre-filled.
- Melacak status pembayaran: `Draft → Sent → Paid → Overdue`.

### 6. Pengaturan
Tab **"Pengaturan"** untuk mengelola preferensi akun dan konfigurasi sistem.

### Tips
- Gunakan **pill toggle White/Dark** di halaman utama untuk preview tema terang/gelap.
- Semua data keuangan dihitung dengan **presisi desimal** (Decimal.js) untuk akurasi.
- Dashboard memiliki **animasi transisi** saat berpindah tab untuk pengalaman yang smooth.

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
