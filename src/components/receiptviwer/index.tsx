import Transaction from "@/models/transaction"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
const PDF = dynamic(() => import("./pdf"))

export default function ReceiptViwer(transaction: Transaction) {
  const [client, setClient] = useState(false)
  useEffect(() => { setClient(true) }, [])
  return (
    <PDF {...transaction} />
  )
}
