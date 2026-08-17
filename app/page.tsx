import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Zap, FileText, Users, MessageCircle, DollarSign, Briefcase } from "lucide-react";

export default async function LandingPage(props: { searchParams?: Promise<{ theme?: string }> }) {
  const searchParams = await props.searchParams;
  const theme = searchParams?.theme || "white"; // default to white/light
  const isDark = theme === "dark";

  // Theme-specific classes — Light vs Dark, always using blue palette
  const mainBgClass = isDark
    ? "bg-slate-950 text-slate-100"
    : "bg-white text-slate-900";

  const headerClass = isDark
    ? "bg-slate-950/80 border-slate-800"
    : "bg-white/80 border-slate-200";

  const heroBgClass = isDark
    ? "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-slate-800"
    : "bg-gradient-to-b from-white via-blue-50/30 to-white border-slate-200";

  const cardBgClass = isDark
    ? "bg-slate-900 border-slate-800 shadow-black/20"
    : "bg-white border-slate-200 shadow-blue-900/5";

  const mutedBgClass = isDark
    ? "bg-slate-900/50 border-slate-800"
    : "bg-slate-50 border-slate-200";

  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-600";
  const textMuted = isDark ? "text-slate-500" : "text-slate-500";
  const borderSubtle = isDark ? "border-slate-800" : "border-slate-100";

  return (
    <div className={cn("min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white", mainBgClass)}>
      {/* Header Navigation — single row: Logo | Center Nav | Right controls */}
      <header className={cn("sticky top-0 z-50 w-full border-b backdrop-blur-md", headerClass)}>
        <div className="container mx-auto relative flex h-14 items-center justify-between px-4 md:px-8">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <span className={cn("font-bold text-xl tracking-tight", textPrimary)}>Veloce OS</span>
          </div>

          {/* Center: Navigation Links (absolute center) */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <a href="#features" className={cn("text-sm font-semibold transition-colors hover:text-blue-600", isDark ? "text-slate-400 hover:text-blue-400" : "text-slate-500 hover:text-blue-600")}>
              Fitur Utama
            </a>
            <a href="#workflow" className={cn("text-sm font-semibold transition-colors hover:text-blue-600", isDark ? "text-slate-400 hover:text-blue-400" : "text-slate-500 hover:text-blue-600")}>
              Cara Kerja
            </a>
            <a href="#tech" className={cn("text-sm font-semibold transition-colors hover:text-blue-600", isDark ? "text-slate-400 hover:text-blue-400" : "text-slate-500 hover:text-blue-600")}>
              Teknologi
            </a>
          </nav>

          {/* Right: Theme Toggle + Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Pill Theme Switcher */}
            <div className={cn("hidden md:flex items-center gap-0.5 p-0.5 rounded-full", isDark ? "bg-slate-800" : "bg-slate-200/60")}>
              <Link
                href="?theme=white"
                className={cn(
                  "px-3 py-1 text-xs rounded-full font-semibold transition-all",
                  !isDark
                    ? "bg-white shadow-sm text-slate-900"
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                White
              </Link>
              <Link
                href="?theme=dark"
                className={cn(
                  "px-3 py-1 text-xs rounded-full font-semibold transition-all",
                  isDark
                    ? "bg-slate-700 shadow-sm text-white"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                Dark
              </Link>
            </div>

            <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), isDark ? "text-slate-300 hover:bg-slate-800 hover:text-white" : "text-slate-700 hover:bg-slate-200/50 hover:text-slate-900")}>
              Masuk
            </Link>
            <Link href="/dashboard" className={cn(buttonVariants({ size: "sm" }), "bg-blue-600 text-white hover:bg-blue-700")}>
              Buka Dashboard <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={cn("relative overflow-hidden py-20 md:py-32 border-b", heroBgClass)}>
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl space-y-8 relative z-10">
          <Badge variant="outline" className={cn("px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5", isDark ? "border-blue-800 text-blue-300 bg-blue-950/50" : "border-blue-200 text-blue-700 bg-blue-50")}>
            <Zap className={cn("h-3.5 w-3.5 fill-current", isDark ? "text-blue-400" : "text-blue-600")} /> Operating System untuk Freelancer & Agensi Kecil
          </Badge>

          <h1 className={cn("text-4xl md:text-6xl font-extrabold tracking-tight leading-tight", textPrimary)}>
            Pusat Kendali Operasional & <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Finansial Ringkas</span>
          </h1>

          <p className={cn("text-lg md:text-xl max-w-2xl mx-auto leading-relaxed", textSecondary)}>
            Kelola CRM klien, pantau status proyek, buat invoice PDF otomatis, dan monitor pemasukan secara real-time tanpa ribet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto text-base px-8 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20")}
            >
              Mulai Pakai Veloce OS <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto text-base px-8 h-12 rounded-xl", isDark ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white" : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900")}
            >
              Login Akun Demo
            </Link>
          </div>

          {/* Key Bullet Highlights */}
          <div className={cn("pt-6 flex flex-wrap items-center justify-center gap-6 text-sm", textMuted)}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Presisi Uang (Decimal.js)
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Export PDF Server-Side
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Reminder WhatsApp 1-Klik
            </div>
          </div>
        </div>
      </section>

      {/* App UI Preview Mockup */}
      <section className={cn("py-16 border-b", mutedBgClass)}>
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className={cn("rounded-2xl border p-4 md:p-8 shadow-2xl space-y-6", cardBgClass)}>
            <div className={cn("flex items-center justify-between border-b pb-4", borderSubtle)}>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className={cn("ml-2 text-xs font-mono", textMuted)}>veloce-os.app/dashboard</span>
              </div>
              <Badge variant="secondary" className={cn("text-[10px] border-transparent", isDark ? "bg-slate-800 text-slate-400 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}>Live Preview</Badge>
            </div>

            {/* Dashboard Mockup Grid */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className={cn("p-4 rounded-xl border shadow-sm space-y-2", isDark ? "border-slate-800 bg-slate-900" : "border-slate-100 bg-white")}>
                <div className={cn("flex justify-between items-center text-xs", textMuted)}>
                  <span>Total Revenue</span>
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-xl font-bold text-emerald-600">Rp 49.950.000</div>
                <div className={cn("text-[10px]", textMuted)}>Invoice Berstatus Paid</div>
              </div>
              <div className={cn("p-4 rounded-xl border shadow-sm space-y-2", isDark ? "border-slate-800 bg-slate-900" : "border-slate-100 bg-white")}>
                <div className={cn("flex justify-between items-center text-xs", textMuted)}>
                  <span>Proyek Aktif</span>
                  <Briefcase className="h-4 w-4 text-blue-500" />
                </div>
                <div className={cn("text-xl font-bold", textPrimary)}>4 Proyek</div>
                <div className={cn("text-[10px]", textMuted)}>Status In Progress & Review</div>
              </div>
              <div className={cn("p-4 rounded-xl border shadow-sm space-y-2", isDark ? "border-slate-800 bg-slate-900" : "border-slate-100 bg-white")}>
                <div className={cn("flex justify-between items-center text-xs", textMuted)}>
                  <span>Belum Dibayar</span>
                  <FileText className="h-4 w-4 text-amber-500" />
                </div>
                <div className={cn("text-xl font-bold", textPrimary)}>Rp 13.875.000</div>
                <div className={cn("text-[10px]", textMuted)}>1 Invoice Sent</div>
              </div>
              <div className={cn("p-4 rounded-xl border shadow-sm space-y-2", isDark ? "border-slate-800 bg-slate-900" : "border-slate-100 bg-white")}>
                <div className={cn("flex justify-between items-center text-xs", textMuted)}>
                  <span>Total Klien</span>
                  <Users className="h-4 w-4 text-purple-500" />
                </div>
                <div className={cn("text-xl font-bold", textPrimary)}>12 Klien</div>
                <div className={cn("text-[10px]", textMuted)}>Terdaftar di CRM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className={cn("py-20 md:py-28 container mx-auto px-4 md:px-8 max-w-6xl space-y-16")}>
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className={cn("text-3xl font-bold tracking-tight", textPrimary)}>Semua yang Anda Butuhkan dalam 1 Tempat</h2>
          <p className={cn("text-base", textSecondary)}>
            Dirancang khusus untuk efisiensi bisnis freelancer tanpa kerumitan software enterprise.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className={cn("p-6 rounded-2xl border space-y-4 transition-all hover:-translate-y-1 hover:shadow-lg", cardBgClass)}>
            <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center font-bold", isDark ? "bg-blue-950 text-blue-400" : "bg-blue-100 text-blue-600")}>
              <Users className="h-6 w-6" />
            </div>
            <h3 className={cn("text-xl font-bold", textPrimary)}>CRM Klien & Proyek</h3>
            <p className={cn("text-sm leading-relaxed", textSecondary)}>
              Simpan database klien lengkap dengan catatan khusus, serta pantau progres proyek dari Lead hingga Completed.
            </p>
          </div>

          <div className={cn("p-6 rounded-2xl border space-y-4 transition-all hover:-translate-y-1 hover:shadow-lg", cardBgClass)}>
            <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center font-bold", isDark ? "bg-emerald-950 text-emerald-400" : "bg-emerald-100 text-emerald-600")}>
              <FileText className="h-6 w-6" />
            </div>
            <h3 className={cn("text-xl font-bold", textPrimary)}>Invoice PDF Otomatis</h3>
            <p className={cn("text-sm leading-relaxed", textSecondary)}>
              Buat penagihan profesional secara instan dengan kalkulasi pajak & desimal presisi tinggi, lalu unduh PDF server-side.
            </p>
          </div>

          <div className={cn("p-6 rounded-2xl border space-y-4 transition-all hover:-translate-y-1 hover:shadow-lg", cardBgClass)}>
            <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center font-bold", isDark ? "bg-purple-950 text-purple-400" : "bg-purple-100 text-purple-600")}>
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className={cn("text-xl font-bold", textPrimary)}>Reminder WhatsApp 1-Klik</h3>
            <p className={cn("text-sm leading-relaxed", textSecondary)}>
              Kirim pesan penagihan langsung ke WhatsApp klien dengan pesan pre-filled nomor invoice & total tagihan.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Footer Banner */}
      <section id="tech" className={cn("py-16 border-t", mutedBgClass)}>
        <div className="container mx-auto px-4 md:px-8 text-center space-y-6 max-w-4xl">
          <Badge variant="outline" className={cn("text-xs", isDark ? "bg-slate-800 text-slate-300 border-slate-700" : "bg-white text-slate-700 border-slate-200")}>Teknologi Modern</Badge>
          <h3 className={cn("text-2xl font-bold", textPrimary)}>Next.js 16 · TypeScript · PostgreSQL + Drizzle ORM · Auth.js</h3>
          <p className={cn("text-sm max-w-xl mx-auto", textSecondary)}>
            Dibangun dengan standar performa tinggi, keamanan tipe data finansial ketat, dan arsitektur serverless modern.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={cn("border-t py-8", isDark ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white")}>
        <div className={cn("container mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs", textMuted)}>
          <div className="flex items-center gap-2">
            <span className={cn("font-bold", textPrimary)}>Veloce OS</span> © {new Date().getFullYear()} — Freelancer Control Center.
          </div>
          <div className="flex gap-6">
            <Link href="/dashboard" className={cn("hover:text-blue-600", isDark && "hover:text-blue-400")}>Dashboard</Link>
            <Link href="/login" className={cn("hover:text-blue-600", isDark && "hover:text-blue-400")}>Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
