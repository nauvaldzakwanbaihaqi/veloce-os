# tasks/todo.md — Plan-First Workspace

Cara pakai (untuk kamu dan untuk agent):

1. Sebelum mulai coding task yang nyentuh lebih dari 1 file, tulis checklist rencana di bawah `## Current Task`.
2. Rencana harus bisa direview SEBELUM ada perubahan kode — ini titik paling murah untuk koreksi arah, jauh lebih murah daripada review diff setelah jadi.
3. Setelah task selesai dan sudah lolos `pnpm lint` + `pnpm test`, pindahkan ke `## Done` dengan ringkasan singkat.
4. File ini boleh "kosong" di antara task — jangan dibiarkan menumpuk jadi backlog permanen. Kalau ada ide fitur besar yang belum waktunya, itu masuk `ARCHITECTURE.md` sebagai catatan, bukan di sini.

---

## Current Task

*Seluruh fitur MVP, Detail Pages, Dashboard Charts, Table Filter, Settings, & Landing Page (Phase 1 s/d Phase 6) telah selesai dilaksanakan.*

## Done

### Phase 6: Edit Forms, Dashboard Charts, Table Filtering, Settings & Landing Page ✅

**Selesai: 2026-08-16**

- [x] **Option A — Edit Forms (Client & Project)**: Server actions `updateClient` & `updateProject`, modal dialog `ClientEditForm` & `ProjectEditForm` di halaman list & detail.
- [x] **Option B — Financial Dashboard Charts**: Komponen visual `FinancialCharts` (`components/dashboard/financial-charts.tsx`) dengan indikator rasio realisasi pendapatan (Paid vs Unpaid) dan breakdown pipeline status proyek.
- [x] **Option C — Table Search & Filtering**: Fitur pencarian kata kunci dan filter dropdown status pada Client Table, Project Table, dan Invoice Table (termasuk filter status `OVERDUE`).
- [x] **Option D — Settings Page & Main Landing Page**:
  - Halaman Pengaturan (`app/(dashboard)/settings/page.tsx`) dan server action `updateUserSettings` untuk mengedit profil & identitas studio/bisnis.
  - Landing Page Veloce OS modern di `app/page.tsx` (Hero section, live preview mockup, fitur grid, & CTA ke Dashboard/Login).
- [x] **Verifikasi**: `pnpm lint` (0 error, 0 warning) & `pnpm build` (berhasil 100%).

## Done

### Phase 5: Detail Pages, Sidebar User Profile & Seed Script ✅

**Selesai: 2026-08-14**

- [x] Server actions `lib/actions/client.ts` & `lib/actions/project.ts`: Added `getClientById`, `getProjectById`, dan `updateProjectStatus`.
- [x] Halaman Detail Klien (`app/(dashboard)/clients/[id]/page.tsx`): Info kontak, catatan, stats revenue terbayar, serta tabel proyek & invoice terkait.
- [x] Halaman Detail Proyek (`app/(dashboard)/projects/[id]/page.tsx`): Info nilai proyek, tanggal mulai/due, interactive status selector, serta daftar invoice terkait.
- [x] User Profile & Logout: `components/layout/app-sidebar.tsx` dilengkapi dengan footer avatar user & server action `logout()`.
- [x] Demo Seed Script: `scripts/seed.ts` & command `pnpm seed` untuk membuat data sampel demo (user, clients, projects, invoices).
- [x] Lolos `pnpm lint` & `pnpm build`.

## Done

### Phase 4: Financial Dashboard & Metrics ✅

**Selesai: 2026-08-14**

- [x] Server action `lib/actions/dashboard.ts` (`getDashboardMetrics`) untuk agregasi SQL efisien: Total Revenue (PAID), Proyek Aktif (IN_PROGRESS/REVIEW), Invoice Unpaid & Overdue (SENT), Total Clients.
- [x] UI Dashboard di `app/(dashboard)/dashboard/page.tsx` dengan KPI cards, status badges, alert peringatan overdue invoice, serta tabel ringkasan Invoice & Proyek Terbaru.
- [x] Lolos `pnpm lint` & `pnpm build`.

### Phase 3: Invoice Generation (PDF & WhatsApp Reminder) ✅

**Selesai: 2026-08-14**

- [x] Schema database `invoices` & `invoice_items` dengan tipe `numeric(12,2)`
- [x] Integration `decimal.js` untuk kalkulasi presisi & `@react-pdf/renderer` untuk export PDF
- [x] Zod validations `lib/validations/invoice.ts`
- [x] Server actions `lib/actions/invoice.ts` (`createInvoice`, `getInvoices`, `getInvoiceById`, `updateInvoiceStatus`, `deleteInvoice`)
- [x] UI Invoices list, dialog create invoice, PDF generation API route (`/api/invoices/[id]/pdf`), & WhatsApp reminder deep link
- [x] Lolos `pnpm lint` & `pnpm build`

### Phase 2: Auth.js + App Shell Layout + Client & Project CRUD ✅

**Selesai: 2026-08-06**

### A. Auth.js Setup

- [x] `pnpm add next-auth@beta` — pasang Auth.js v5 (NextAuth beta untuk Next.js App Router)
- [x] Buat `auth.ts` di root — konfigurasi credentials provider, session strategy JWT
- [x] Buat `auth.config.ts` — pisahkan config untuk edge-compatibility (middleware)
- [x] Buat `app/api/auth/[...nextauth]/route.ts` — handler route
- [x] Buat `middleware.ts` di root — proteksi semua route `/dashboard/*`, redirect ke `/login` jika belum auth
- [x] Buat `lib/validations/auth.ts` — Zod schema untuk login (email + password)
- [x] Buat `app/(auth)/login/page.tsx` — halaman login (form email + password)
- [x] Tambah `PASSWORD_SALT` / hash bcrypt: `pnpm add bcryptjs` + `pnpm add -D @types/bcryptjs`

### B. App Shell — Layout & Navigation

- [x] Install shadcn components yang dibutuhkan: `sidebar`, `avatar`, `dropdown-menu`, `badge`, `card`, `separator`, `sheet`, `tooltip`, `skeleton`
- [x] Buat `app/(dashboard)/layout.tsx` — root layout dashboard dengan sidebar
- [x] Buat `components/layout/app-sidebar.tsx` — sidebar nav: Dashboard, Clients, Projects, Invoices
- [x] Buat `components/layout/page-header.tsx` — reusable header dengan title + action slot
- [x] Buat `app/(dashboard)/dashboard/page.tsx` — placeholder KPI dashboard (diisi di Phase 4)

### C. Client Management

- [x] Install shadcn components: `table`, `dialog`, `form`, `input`, `label`, `textarea`, `select`, `alert-dialog`
- [x] Buat `app/(dashboard)/clients/page.tsx` — list klien (tabel + search + tombol add)
- [x] Buat `app/(dashboard)/clients/[id]/page.tsx` — detail klien + list proyek terkait (pending detail page)
- [x] Buat `components/client/client-table.tsx` — tabel dengan kolom: name, company, email, phone, # projects
- [x] Buat `components/client/client-form.tsx` — form create/edit client (shadcn Form + Zod)
- [x] Buat `lib/actions/client.ts` — Server Actions: `createClient`, `updateClient`, `deleteClient`, `getClients`, `getClientById`

### D. Project Management

- [x] Buat `app/(dashboard)/projects/page.tsx` — list proyek (tabel + filter by status)
- [x] Buat `app/(dashboard)/projects/[id]/page.tsx` — detail proyek + linked invoices (pending detail page)
- [x] Buat `components/project/project-table.tsx` — tabel dengan kolom: title, client, status badge, value, due date
- [x] Buat `components/project/project-form.tsx` — form create/edit project (client selector dropdown)
- [x] Buat `lib/actions/project.ts` — Server Actions: `createProject`, `updateProject`, `deleteProject`, `getProjects`, `getProjectById`

### E. Verifikasi

- [x] `pnpm lint` — no errors
- [x] `pnpm build` — production build berhasil
- [x] Manual check: login flow, create client, create project, update status, delete

## Done

### Phase 1: Boilerplate Next.js 15 + Drizzle ORM Schema Setup ✅

**Selesai: 2026-08-06**

- [x] **A. Init Next.js 15** — `create-next-app@latest` (App Router, TS strict, Tailwind v4, ESLint, flat `app/`)
- [x] **B. Dependencies** — shadcn/ui (nova preset), lucide-react, drizzle-orm, @neondatabase/serverless, drizzle-kit, zod, dotenv
- [x] **C. Config** — `drizzle.config.ts`, `.env.example`, `.gitignore` sudah cover `.env*`
- [x] **D. Schema** — `db/schema.ts`: tabel `users` (businessName default 'Aethera'), `clients`, `projects` + `pgEnum` projectStatus + relasi + inferred types
- [x] **E. DB Singleton** — `lib/db.ts`: Neon HTTP + Drizzle, globalThis pattern untuk dev hot-reload
- [x] **F. Zod Validations** — `lib/validations/client.ts`, `lib/validations/project.ts` (value sebagai string, bukan number)
- [x] **G. README** — fix Prisma → Drizzle references, folder structure updated
- [x] **H. Verifikasi** — `pnpm lint` ✅, `pnpm build` ✅, numeric(12,2) ✅, no hardcoded secrets ✅
