import { getTransactionById } from '@/actions/transactionActions';
import { Modal } from '@/components/modal';
import ReceiptViwer from '@/components/receiptviwer';
import Transaction from '@/models/transaction';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type TransactionLoadReceiptProps = {
  id: string
  clearParams: () => void
}

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
        <Text>Section #1</Text>
      </View>
      <View style={pdfStyle.section}>
        <Text>Id: {transaction.id}</Text>
        <Text>Cpf: {transaction.cpf}</Text>
        <Text>Id do produto: {transaction.productId}</Text>
        <Text>Dia: {transaction.createdAt.getDay()}</Text>
      </View>
    </Page>
  </Document>
  )
}

export default function TransactionLoadReceipt({ id, clearParams }: TransactionLoadReceiptProps) {
  const [transaction, setTransaction] = useState<Transaction>({
    id: 0,
    cpf: "",
    productId: 0,
    createdAt: new Date()
  })
  useEffect(() => {
    getTransactionById(parseInt(id)).then(e => {
      if ('message' in e) {
        toast.error(e.message)
        return
      }
      setTransaction(e)
    })
  }, [])
  return (
    <Modal.Root clearParams={clearParams}>
      <div className='h-72'>
        <ReceiptViwer {...transaction} />
      </div>
    </Modal.Root>
  )
}
