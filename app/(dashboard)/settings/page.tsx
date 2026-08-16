import { PageHeader } from "@/components/layout/page-header";
import { getUserProfile } from "@/lib/actions/user";
import { SettingsForm } from "@/components/settings/settings-form";
import { notFound } from "next/navigation";

export default async function SettingsPage() {
  const user = await getUserProfile();

  if (!user) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title="Pengaturan"
        description="Kelola informasi akun dan preferensi bisnis Anda."
      />
      <div className="p-4">
        <SettingsForm user={user} />
      </div>
    </>
  );
}
