import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { Invoice, InvoiceItem, Project, Client } from "@/db/schema";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#333' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111' },
  invoiceInfo: { textAlign: 'right' },
  infoText: { marginBottom: 4 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase', color: '#666' },
  clientName: { fontSize: 14, fontWeight: 'bold', marginBottom: 4, color: '#111' },
  clientCompany: { marginBottom: 4 },
  table: { display: 'flex', width: 'auto', borderStyle: 'solid', borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableColHeader: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, backgroundColor: '#f4f4f5' },
  tableCol: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCellHeader: { margin: 8, fontSize: 10, fontWeight: 'bold' },
  tableCell: { margin: 8, fontSize: 10 },
  descCol: { width: '40%' },
  qtyCol: { width: '15%', textAlign: 'center' },
  priceCol: { width: '22.5%', textAlign: 'right' },
  amountCol: { width: '22.5%', textAlign: 'right' },
  summary: { marginTop: 20, alignItems: 'flex-end' },
  summaryRow: { flexDirection: 'row', width: '50%', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontWeight: 'bold' },
  totalRow: { flexDirection: 'row', width: '50%', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#000' },
  totalLabel: { fontWeight: 'bold', fontSize: 12 },
  totalValue: { fontWeight: 'bold', fontSize: 12 },
});

type InvoiceFull = Invoice & { items: InvoiceItem[], project: Project & { client: Client } };

export function InvoiceDocument({ invoice }: { invoice: InvoiceFull }) {
  const formatCurrency = (val: string) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(val));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={{ marginTop: 8, color: '#666' }}>Aethera Studio</Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.infoText}>Invoice #: {invoice.invoiceNumber}</Text>
            <Text style={styles.infoText}>Tanggal Terbit: {new Date(invoice.issueDate).toLocaleDateString('id-ID')}</Text>
            <Text style={styles.infoText}>Jatuh Tempo: {new Date(invoice.dueDate).toLocaleDateString('id-ID')}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ditagihkan Kepada:</Text>
          <Text style={styles.clientName}>{invoice.project.client.name}</Text>
          {invoice.project.client.company && <Text style={styles.clientCompany}>{invoice.project.client.company}</Text>}
          {invoice.project.client.email && <Text style={styles.infoText}>{invoice.project.client.email}</Text>}
          {invoice.project.client.phone && <Text style={styles.infoText}>{invoice.project.client.phone}</Text>}
          <Text style={{ marginTop: 10, color: '#666' }}>Proyek: {invoice.project.title}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColHeader, styles.descCol]}>
              <Text style={styles.tableCellHeader}>Deskripsi</Text>
            </View>
            <View style={[styles.tableColHeader, styles.qtyCol]}>
              <Text style={styles.tableCellHeader}>Qty</Text>
            </View>
            <View style={[styles.tableColHeader, styles.priceCol]}>
              <Text style={styles.tableCellHeader}>Harga Satuan</Text>
            </View>
            <View style={[styles.tableColHeader, styles.amountCol]}>
              <Text style={styles.tableCellHeader}>Jumlah</Text>
            </View>
          </View>

          {invoice.items.map((item, i) => (
            <View style={styles.tableRow} key={i}>
              <View style={[styles.tableCol, styles.descCol]}>
                <Text style={styles.tableCell}>{item.description}</Text>
              </View>
              <View style={[styles.tableCol, styles.qtyCol]}>
                <Text style={styles.tableCell}>{item.qty}</Text>
              </View>
              <View style={[styles.tableCol, styles.priceCol]}>
                <Text style={styles.tableCell}>{formatCurrency(item.unitPrice)}</Text>
              </View>
              <View style={[styles.tableCol, styles.amountCol]}>
                <Text style={styles.tableCell}>{formatCurrency(item.amount)}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text>{formatCurrency(invoice.subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Pajak</Text>
            <Text>{formatCurrency(invoice.tax)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(invoice.total)}</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}
