import { auth } from "@/auth";
import { VeloceTopNav } from "@/components/dashboard/veloce-top-nav";
import { PageTransition } from "@/components/dashboard/page-transition";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userName = session?.user?.name || "Alex Aethera";
  const userEmail = session?.user?.email || "alex@veloce.os";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto w-full px-4 md:px-6 lg:px-8 py-4 space-y-6">
        {/* Global Top Navigation */}
        <VeloceTopNav userName={userName} userEmail={userEmail} />
        
        {/* Main Full-width Canvas with Page Transition */}
        <main className="w-full">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
