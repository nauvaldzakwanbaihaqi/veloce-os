import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Zap, FileText, Users, MessageCircle, DollarSign, Briefcase } from "lucide-react";

export default async function LandingPage(props: { searchParams?: Promise<{ theme?: string }> }) {
  const searchParams = await props.searchParams;
  const theme = searchParams?.theme || "blue"; // default to blue
  const isWhite = theme === "white";

  // Theme-specific classes
  const mainBgClass = isWhite 
    ? "bg-white text-slate-900" 
    : "bg-slate-50 text-slate-900 bg-gradient-to-br from-blue-50/50 via-slate-50 to-indigo-50/30";
    
  const headerClass = isWhite
    ? "bg-white/80 border-slate-200"
    : "bg-slate-50/80 border-blue-100";

  const heroBgClass = isWhite
    ? "bg-gradient-to-b from-white via-slate-50 to-white border-slate-200"
    : "bg-gradient-to-b from-transparent via-blue-50/30 to-transparent border-blue-100";

  const cardBgClass = isWhite
    ? "bg-white border-slate-200"
    : "bg-white/60 backdrop-blur-md border-blue-100/50 shadow-blue-900/5";

  const mutedBgClass = isWhite
    ? "bg-slate-50 border-slate-200"
    : "bg-blue-50/30 border-blue-100";

  return (
    <div className={cn("min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white", mainBgClass)}>
      {/* Header Navigation */}
      <header className={cn("sticky top-0 z-50 w-full border-b backdrop-blur-md", headerClass)}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight text-slate-900">Veloce OS</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Fitur Utama</a>
            <a href="#workflow" className="hover:text-blue-600 transition-colors">Cara Kerja</a>
            <a href="#tech" className="hover:text-blue-600 transition-colors">Teknologi</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Switcher for Preview Purposes */}
            <div className="hidden md:flex items-center gap-1 mr-4 bg-slate-200/50 p-1 rounded-lg">
              <Link 
                href="?theme=white" 
                className={cn("px-2 py-1 text-xs rounded-md font-medium transition-all", isWhite ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-900")}
              >
                White
              </Link>
              <Link 
                href="?theme=blue" 
                className={cn("px-2 py-1 text-xs rounded-md font-medium transition-all", !isWhite ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-900")}
              >
                Blue
              </Link>
            </div>

            <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-slate-700 hover:bg-slate-200/50 hover:text-slate-900")}>
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
          <Badge variant="outline" className={cn("px-3 py-1 rounded-full text-xs font-medium border-blue-200 text-blue-700 bg-blue-50 inline-flex items-center gap-1.5", isWhite && "border-slate-200 text-slate-700 bg-slate-50")}>
            <Zap className={cn("h-3.5 w-3.5 fill-current", isWhite ? "text-slate-700" : "text-blue-600")} /> Operating System untuk Freelancer & Agensi Kecil
          </Badge>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
            Pusat Kendali Operasional & <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Finansial Ringkas</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
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
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto text-base px-8 h-12 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900")}
            >
              Login Akun Demo
            </Link>
          </div>

          {/* Key Bullet Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
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
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-mono text-slate-400">veloce-os.app/dashboard</span>
              </div>
              <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 hover:bg-slate-200 border-transparent">Live Preview</Badge>
            </div>

            {/* Dashboard Mockup Grid */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Total Revenue</span>
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-xl font-bold text-emerald-600">Rp 49.950.000</div>
                <div className="text-[10px] text-slate-400">Invoice Berstatus Paid</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Proyek Aktif</span>
                  <Briefcase className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-xl font-bold text-slate-800">4 Proyek</div>
                <div className="text-[10px] text-slate-400">Status In Progress & Review</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Belum Dibayar</span>
                  <FileText className="h-4 w-4 text-amber-500" />
                </div>
                <div className="text-xl font-bold text-slate-800">Rp 13.875.000</div>
                <div className="text-[10px] text-slate-400">1 Invoice Sent</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Total Klien</span>
                  <Users className="h-4 w-4 text-purple-500" />
                </div>
                <div className="text-xl font-bold text-slate-800">12 Klien</div>
                <div className="text-[10px] text-slate-400">Terdaftar di CRM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 md:py-28 container mx-auto px-4 md:px-8 max-w-6xl space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Semua yang Anda Butuhkan dalam 1 Tempat</h2>
          <p className="text-slate-600 text-base">
            Dirancang khusus untuk efisiensi bisnis freelancer tanpa kerumitan software enterprise.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className={cn("p-6 rounded-2xl border space-y-4 transition-all hover:-translate-y-1 hover:shadow-lg", cardBgClass)}>
            <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">CRM Klien & Proyek</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Simpan database klien lengkap dengan catatan khusus, serta pantau progres proyek dari Lead hingga Completed.
            </p>
          </div>

          <div className={cn("p-6 rounded-2xl border space-y-4 transition-all hover:-translate-y-1 hover:shadow-lg", cardBgClass)}>
            <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Invoice PDF Otomatis</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Buat penagihan profesional secara instan dengan kalkulasi pajak & desimal presisi tinggi, lalu unduh PDF server-side.
            </p>
          </div>

          <div className={cn("p-6 rounded-2xl border space-y-4 transition-all hover:-translate-y-1 hover:shadow-lg", cardBgClass)}>
            <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Reminder WhatsApp 1-Klik</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Kirim pesan penagihan langsung ke WhatsApp klien dengan pesan pre-filled nomor invoice & total tagihan.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Footer Banner */}
      <section id="tech" className={cn("py-16 border-t", mutedBgClass)}>
        <div className="container mx-auto px-4 md:px-8 text-center space-y-6 max-w-4xl">
          <Badge variant="outline" className="text-xs bg-white text-slate-700 border-slate-200">Teknologi Modern</Badge>
          <h3 className="text-2xl font-bold text-slate-900">Next.js 15 · TypeScript · PostgreSQL + Drizzle ORM · Auth.js</h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Dibangun dengan standar performa tinggi, keamanan tipe data finansial ketat, dan arsitektur serverless modern.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="container mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">Veloce OS</span> © {new Date().getFullYear()} — Freelancer Control Center.
          </div>
          <div className="flex gap-6">
            <Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link>
            <Link href="/login" className="hover:text-slate-900">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
