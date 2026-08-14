import { PageHeader } from "@/components/layout/page-header";
import { InvoiceTable } from "@/components/invoice/invoice-table";
import { InvoiceForm } from "@/components/invoice/invoice-form";
import { getInvoices } from "@/lib/actions/invoice";
import { getProjects } from "@/lib/actions/project";

export default async function InvoicesPage() {
  const [invoices, projects] = await Promise.all([
    getInvoices(),
    getProjects(),
  ]);

  return (
    <>
      <PageHeader
        title="Invoices"
        description="Kelola penagihan klien Anda di sini."
        action={<InvoiceForm projects={projects} />}
      />
      <div className="p-4">
        <InvoiceTable invoices={invoices} />
      </div>
    </>
  );
}
