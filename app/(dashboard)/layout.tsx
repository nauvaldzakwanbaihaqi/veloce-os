import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  return (
    <SidebarProvider>
      <AppSidebar userName={user?.name ?? "User"} userEmail={user?.email ?? ""} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
