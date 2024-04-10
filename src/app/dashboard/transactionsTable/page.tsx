"use client"

import { useEffect, useState } from "react"
import Transaction from "@/models/transaction"
import { transactionCols } from "@/columns/transactionCols"
import { DataTable } from "@/components/datatable"
import { getAllTransactions } from "@/actions/transactionActions"
import toast from "react-hot-toast"
import TransactionInputFilter from "./TransactionInputFilter"

export default function Transactions() {
  const [transactions, setTransaction] = useState<Transaction[]>([])

  useEffect(() => {
    getAllTransactions().then(e => {
      if ('message' in e) {
        toast.error(e.message)
        return
      }
      setTransaction(e)
    })
  }, [])
  return (
    <section className="flex flex-col gap-2 p-4">
    <TransactionInputFilter transactions={transactions} setTransactions={setTransaction}/>
      <DataTable data={transactions} columns={transactionCols} />
    </section>
  )
}
