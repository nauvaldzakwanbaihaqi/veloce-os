# ARCHITECTURE.md — Freelancer OS

Dokumen ini berisi keputusan desain dan alasannya. Kalau kamu (atau agent) mau mengubah keputusan besar (stack, data model, flow), update dulu bagian relevan di sini — jangan biarkan kode dan dokumen ini divergen.

## 1. Scope & Non-Goals (MVP)

**Yang dibangun di MVP:**
- CRM ringan: klien + proyek dengan status (Lead → In Progress → Review → Completed)
- Invoice generator: buat invoice, export PDF, generate link reminder WhatsApp
- Dashboard finansial: total revenue, proyek aktif, invoice overdue/unpaid

**Non-goals MVP (sadar, bukan lupa):**
- ❌ Payment gateway integration (Midtrans/Xendit/Stripe) — status "Paid" di-set manual oleh user. Alasan: zero cost, zero proses approval merchant, cukup untuk validasi apakah orang mau pakai app ini dulu sebelum invest ke integrasi pembayaran.
- ❌ Multi-user / team roles — 1 akun = 1 freelancer/pemilik bisnis. Kalau nanti pivot ke "agensi dengan banyak anggota tim", perlu redesign auth & permission model.
- ❌ Recurring invoice / subscription billing.
- ❌ Multi-currency dalam satu akun (1 akun = 1 currency, dipilih saat setup).
- ❌ WhatsApp Business API otomatis — pakai `wa.me` deep link (user tetap klik & kirim manual). Kirim otomatis butuh API resmi (biaya + approval proses), overkill untuk MVP.

Setiap kali ada dorongan nambah fitur di luar list "yang dibangun" — cek dulu apakah itu emang perlu buat validasi MVP, atau cuma "kayaknya keren".

## 2. Tech Stack & Rationale

| Layer | Pilihan | Alasan | Trade-off yang diterima |
|---|---|---|---|
| Framework | Next.js 15 (App Router) | Fullstack dalam satu repo (UI + server logic), SSR bagus buat demo cepat ke calon klien, ekosistem matang | Sedikit lock-in ke pola Vercel; App Router punya learning curve kalau terbiasa Pages Router |
| Bahasa | TypeScript (strict mode) | Data finansial butuh type safety — salah tipe di angka uang itu mahal | Verbosity lebih tinggi, tapi ini investasi yang wajar |
| Database | PostgreSQL (Neon/Supabase serverless) | Data ini *inherently relasional* (klien → proyek → invoice → item), butuh transaction integrity untuk data uang | Setup sedikit lebih berat dari file-based DB, tapi serverless Postgres menghilangkan sebagian besar friction ini |
| ORM | Drizzle ORM (+ `@neondatabase/serverless` driver) | Type-safe, query builder-nya dekat dengan SQL asli (predictable, gampang di-debug), tanpa query engine binary — cocok untuk runtime serverless/edge di Vercel + Neon, lebih ringan & cold-start lebih cepat dari Prisma | Migration tooling (`drizzle-kit`) belum sematang Prisma Migrate; sedikit lebih verbose untuk query relasi kompleks (butuh join manual, bukan `include` ala Prisma) |
| Auth | Auth.js (NextAuth) — credentials provider | Cukup untuk single-user MVP, gratis, kontrol penuh atas data | Kalau nanti butuh SSO/multi-tenant, perlu effort migrasi |
| UI | Tailwind CSS + shadcn/ui | Bisa di-custom penuh (penting — ini portfolio piece, jangan keliatan "generic AI app"), komponen accessible by default | Butuh disiplin design token biar konsisten |
| PDF | `@react-pdf/renderer` | Generate PDF langsung dari komponen React di server, tanpa overhead headless browser | Styling PDF lebih terbatas dibanding HTML-to-PDF (Puppeteer) — tapi cukup untuk dokumen invoice |
| Chart/KPI | Tremor (di atas Recharts) | KPI card & chart siap pakai, konsisten dengan Tailwind | Kurang fleksibel untuk visualisasi custom yang sangat kompleks |
| Reminder | `wa.me` deep link | Zero cost, zero approval proses | Tidak terkirim otomatis — trade-off sadar untuk MVP (lihat non-goals) |
| Deploy | Vercel + Neon | Zero-config deploy, gampang di-share ke calon klien | Biaya bisa naik di skala besar — bukan concern untuk MVP |

## 3. Data Model

```
User (freelancer)
 ├── id, name, email, passwordHash
 ├── businessName, currency (default "IDR")
 └── createdAt

Client
 ├── id, userId (FK)
 ├── name, email, phone, company, notes
 └── createdAt

Project
 ├── id, userId (FK), clientId (FK)
 ├── title, status: LEAD | IN_PROGRESS | REVIEW | COMPLETED
 ├── value (Decimal), startDate, dueDate
 └── createdAt

Invoice
 ├── id, userId (FK), projectId (FK)
 ├── invoiceNumber, issueDate, dueDate
 ├── status: DRAFT | SENT | PAID | OVERDUE | CANCELLED
 ├── subtotal, tax, total (semua Decimal)
 └── createdAt

InvoiceItem
 ├── id, invoiceId (FK)
 ├── description, qty, unitPrice, amount (Decimal)
```

**Catatan penting:** semua kolom nilai uang pakai tipe `numeric` di Drizzle (`numeric('amount', { precision: 12, scale: 2 })`), bukan `integer`/`real`/`float`. Drizzle mengembalikan `numeric` sebagai `string` di JS secara default — ini disengaja oleh library-nya, jangan di-`parseFloat` langsung untuk kalkulasi (rounding error). Kalau butuh aritmatika (sum, tax calculation), lakukan di level SQL (`SUM()`) atau pakai library decimal-safe (misal `decimal.js`) di server, baru convert ke `string`/format tampilan di boundary terakhir sebelum dikirim ke client.

Status `OVERDUE` dihitung derived (bukan disimpan permanen) dari `status = SENT AND dueDate < now()` — dievaluasi saat query dashboard, bukan lewat cron job terpisah, untuk menghindari state yang bisa out-of-sync. Kalau nanti butuh notifikasi proaktif, baru introduce scheduled job.

## 4. Key Flows

**Flow: Generate Invoice**
1. User pilih project → sistem prefill client info dari relasi
2. User isi line items (description, qty, unit price) → subtotal/tax/total dihitung di server (jangan trust kalkulasi dari client)
3. Server Action simpan invoice + items dalam satu `db.transaction()` Drizzle
4. User klik "Export PDF" → server render `@react-pdf/renderer` component → return file
5. User klik "Kirim Reminder" → sistem generate `wa.me` link dengan pesan pre-filled (nomor invoice, jumlah, due date) → buka di tab baru

**Flow: Dashboard Aggregation**
- Total Revenue = SUM(total) WHERE status = PAID, filtered by periode
- Active Projects = COUNT(*) WHERE status IN (IN_PROGRESS, REVIEW)
- Overdue/Unpaid = SUM(total) WHERE status = SENT AND dueDate < now()

Semua agregasi ini query langsung ke Postgres (bukan dihitung di application layer) — biar konsisten dan scalable kalau data tumbuh.

## 5. Open Questions (belum diputuskan, jangan asumsi)
- Format nomor invoice: sequential per user (`INV-001`) atau per tahun (`INV-2026-001`)?
- Apakah butuh soft-delete untuk client/project (histori tetap ada meski "dihapus"), atau hard-delete cukup untuk MVP?

Kalau agent menemukan pertanyaan yang belum terjawab di sini saat implementasi, tambahkan ke section ini — jangan diam-diam mengasumsikan jawaban untuk keputusan yang berdampak ke data finansial.
