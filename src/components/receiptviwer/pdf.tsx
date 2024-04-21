import Transaction from '@/models/transaction';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

const pdfStyle = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const PdfTemplate = (transaction: Transaction) => {
  return (<Document>
    <Page size="A4" style={pdfStyle.page}>
      <View style={pdfStyle.section}>
        <Text>Receipt</Text>
      </View>
      <View style={pdfStyle.section}>
        <Text>Id: {transaction.id}</Text>
        <Text>Cpf: {transaction.cpf}</Text>
        <Text>Id do produto: {transaction.productId}</Text>
        <Text>Dia: {transaction.createdAt.toString()}</Text>
      </View>
    </Page>
  </Document>
  )
}
export default function PDFview(transaction: Transaction) {
  const [client, setClient] = useState(false)
  useEffect(() => { setClient(true) }, [])
  return (
    <PDFViewer className='w-full h-full'>
      <PdfTemplate {...transaction} />
    </PDFViewer>
  )
}
