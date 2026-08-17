"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, LayoutGrid, Users, Briefcase, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface VeloceTopNavProps {
  userName?: string;
  userEmail?: string;
}

export function VeloceTopNav({ userName = "Alex Aethera" }: VeloceTopNavProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
    { label: "Klien", href: "/clients", icon: Users },
    { label: "Proyek", href: "/projects", icon: Briefcase },
    { label: "Tagihan", href: "/invoices", icon: FileText },
    { label: "Pengaturan", href: "/settings", icon: Settings },
  ];

  return (
    <header className="w-full flex items-center justify-between gap-4 py-2">
      {/* Left: Veloce OS Pill Logo */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900 dark:bg-slate-800 text-white shadow-sm border border-slate-800/80 hover:bg-slate-800 transition-colors"
        >
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </div>
          <span className="font-bold text-sm tracking-tight text-white">Veloce OS</span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold border border-blue-400/20">
            Bisnis
          </span>
        </Link>
      </div>

      {/* Center: Pill-shaped Business Navigation Menu */}
      <nav className="hidden md:flex items-center p-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200",
                isActive
                  ? "bg-slate-900 text-white shadow-sm dark:bg-blue-600 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              )}
            >
              <item.icon
                className={cn(
                  "h-3.5 w-3.5",
                  isActive ? "text-blue-400 dark:text-white" : "text-slate-400"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right: Actions & User Avatar */}
      <div className="flex items-center gap-3">
        {/* Quick Search trigger */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-slate-500 text-xs shadow-xs">
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-[11px] text-slate-400">Cari klien / invoice...</span>
          <kbd className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">⌘K</kbd>
        </div>

        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
          aria-label="Notifikasi"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
        </button>

        {/* User Pill / Avatar */}
        <div className="flex items-center gap-2.5 pl-2 pr-3.5 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-blue-500/20">
            {userName.slice(0, 2).toUpperCase()}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              {userName}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
              Administrator
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
