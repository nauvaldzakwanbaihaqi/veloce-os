import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Zap, FileText, Users, MessageCircle, DollarSign, Briefcase } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-sm">
              V
            </div>
            <span className="font-bold text-xl tracking-tight">Veloce OS</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Fitur Utama</a>
            <a href="#workflow" className="hover:text-foreground transition-colors">Cara Kerja</a>
            <a href="#tech" className="hover:text-foreground transition-colors">Teknologi</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              Masuk
            </Link>
            <Link href="/dashboard" className={cn(buttonVariants({ size: "sm" }))}>
              Buka Dashboard <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-linear-to-b from-background via-muted/30 to-background border-b">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl space-y-8">
          <Badge variant="outline" className="px-3 py-1 rounded-full text-xs font-medium border-primary/30 text-primary bg-primary/5 inline-flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> Operating System untuk Freelancer & Agensi Kecil
          </Badge>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Pusat Kendali Operasional & <span className="bg-linear-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">Finansial Ringkas</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Kelola CRM klien, pantau status proyek, buat invoice PDF otomatis, dan monitor pemasukan secara real-time tanpa ribet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/dashboard" 
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto text-base px-8 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all")}
            >
              Mulai Pakai Veloce OS <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/login" 
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto text-base px-8 h-12 rounded-xl")}
            >
              Login Akun Demo
            </Link>
          </div>

          {/* Key Bullet Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
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
      <section className="py-16 bg-muted/20 border-b">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="rounded-2xl border bg-card p-4 md:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-muted-foreground">veloce-os.app/dashboard</span>
              </div>
              <Badge variant="secondary" className="text-[10px]">Live Preview</Badge>
            </div>

            {/* Dashboard Mockup Grid */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className="p-4 rounded-xl border bg-background space-y-2">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Total Revenue</span>
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">Rp 49.950.000</div>
                <div className="text-[10px] text-muted-foreground">Invoice Berstatus Paid</div>
              </div>
              <div className="p-4 rounded-xl border bg-background space-y-2">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Proyek Aktif</span>
                  <Briefcase className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-xl font-bold">4 Proyek</div>
                <div className="text-[10px] text-muted-foreground">Status In Progress & Review</div>
              </div>
              <div className="p-4 rounded-xl border bg-background space-y-2">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Belum Dibayar</span>
                  <FileText className="h-4 w-4 text-amber-500" />
                </div>
                <div className="text-xl font-bold">Rp 13.875.000</div>
                <div className="text-[10px] text-muted-foreground">1 Invoice Sent</div>
              </div>
              <div className="p-4 rounded-xl border bg-background space-y-2">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Total Klien</span>
                  <Users className="h-4 w-4 text-purple-500" />
                </div>
                <div className="text-xl font-bold">12 Klien</div>
                <div className="text-[10px] text-muted-foreground">Terdaftar di CRM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 md:py-28 container mx-auto px-4 md:px-8 max-w-6xl space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">Semua yang Anda Butuhkan dalam 1 Tempat</h2>
          <p className="text-muted-foreground text-base">
            Dirancang khusus untuk efisiensi bisnis freelancer tanpa kerumitan software enterprise.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border bg-card space-y-4 hover:border-primary/50 transition-all">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">CRM Klien & Proyek</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Simpan database klien lengkap dengan catatan khusus, serta pantau progres proyek dari Lead hingga Completed.
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-card space-y-4 hover:border-primary/50 transition-all">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Invoice PDF Otomatis</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Buat penagihan profesional secara instan dengan kalkulasi pajak & desimal presisi tinggi, lalu unduh PDF server-side.
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-card space-y-4 hover:border-primary/50 transition-all">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Reminder WhatsApp 1-Klik</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Kirim pesan penagihan langsung ke WhatsApp klien dengan pesan pre-filled nomor invoice & total tagihan.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Footer Banner */}
      <section id="tech" className="py-16 bg-muted/40 border-t">
        <div className="container mx-auto px-4 md:px-8 text-center space-y-6 max-w-4xl">
          <Badge variant="outline" className="text-xs">Teknologi Modern</Badge>
          <h3 className="text-2xl font-bold">Next.js 15 · TypeScript · PostgreSQL + Drizzle ORM · Auth.js</h3>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Dibangun dengan standar performa tinggi, keamanan tipe data finansial ketat, dan arsitektur serverless modern.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-background">
        <div className="container mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">Veloce OS</span> © {new Date().getFullYear()} — Freelancer Control Center.
          </div>
          <div className="flex gap-6">
            <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <Link href="/login" className="hover:text-foreground">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
