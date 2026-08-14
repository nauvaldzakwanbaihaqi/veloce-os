import { PageHeader } from "@/components/layout/page-header";
import { ClientTable } from "@/components/client/client-table";
import { ClientForm } from "@/components/client/client-form";
import { getClients } from "@/lib/actions/client";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <>
      <PageHeader
        title="Clients"
        description="Kelola data klien Anda di sini."
        action={<ClientForm />}
      />
      <div className="p-4">
        <ClientTable clients={clients} />
      </div>
    </>
  );
}
