"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Transaction from "@/models/transaction"
import { transactionCols } from "@/columns/transactionCols"
import { DataTable } from "@/components/datatable"
import { getAllTransactions } from "@/actions/transactionActions"
import toast from "react-hot-toast"
import TransactionInputFilter from "./TransactionInputFilter"
import { TransactionQueryParam } from "@/queryParams/transactionQueryParam"
import TransactionDelete from "./TransactionDelete"

export default function Transactions() {
  const [transactions, setTransaction] = useState<Transaction[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const clearParams = () => {
    router.replace(pathname);
  };

  const LoadComponents = () => {
    const deleteParam = params.get(TransactionQueryParam.deleteTransaction) ?? ""
    if (params.has(TransactionQueryParam.deleteTransaction)) return <TransactionDelete setTransactions={setTransaction} id={deleteParam} clearParams={clearParams} />
    return null
  }
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
      {LoadComponents() != null && LoadComponents()}
      <TransactionInputFilter transactions={transactions} setTransactions={setTransaction} />
      <DataTable data={transactions} columns={transactionCols} />
    </section>
  )
}
