import { getInvoiceById } from "@/lib/actions/invoice";
import { getProjects } from "@/lib/actions/project";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { InvoiceEditForm } from "@/components/invoice/invoice-edit-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText } from "lucide-react";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [invoice, projects] = await Promise.all([
    getInvoiceById(id),
    getProjects(),
  ]);

  if (!invoice) {
    notFound();
  }

  const isDraft = invoice.status === "DRAFT";

  return (
    <>
      <PageHeader
        title={`Invoice ${invoice.invoiceNumber}`}
        description={
          isDraft
            ? "Edit detail invoice ini."
            : "Invoice ini tidak dapat diedit karena sudah berstatus selain DRAFT."
        }
        action={
          <Button variant="outline" render={<Link href={`/api/invoices/${invoice.id}/pdf`} target="_blank" />}>
            <FileText className="w-4 h-4 mr-2" /> Lihat PDF
          </Button>
        }
      />
      <div className="p-4">
        {isDraft ? (
          <InvoiceEditForm invoice={invoice} projects={projects} />
        ) : (
          <div className="bg-muted p-6 rounded-lg text-center max-w-3xl border">
            <h3 className="text-lg font-semibold mb-2">Invoice tidak dapat diedit</h3>
            <p className="text-muted-foreground mb-4">
              Invoice ini berstatus <strong>{invoice.status}</strong>. Hanya invoice dengan status DRAFT yang dapat diubah.
            </p>
            <Button render={<Link href={`/api/invoices/${invoice.id}/pdf`} target="_blank" />}>
              Buka PDF Invoice
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
