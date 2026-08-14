import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { InvoiceDocument } from "@/components/invoice/invoice-pdf";
import { Readable } from "stream";
import { getInvoiceById } from "@/lib/actions/invoice";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const invoice = await getInvoiceById(id);

  if (!invoice) {
    return new NextResponse("Not Found", { status: 404 });
  }

  try {
    const nodeStream = await renderToStream(<InvoiceDocument invoice={invoice} />);
    // @ts-expect-error Readable.toWeb returns ReadableStream but TS types lag behind Node 18+
    const webStream = Readable.toWeb(nodeStream);

    // @ts-expect-error NextResponse accepts ReadableStream body
    return new NextResponse(webStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="invoice-${invoice.invoiceNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new NextResponse("Failed to generate PDF", { status: 500 });
  }
}
