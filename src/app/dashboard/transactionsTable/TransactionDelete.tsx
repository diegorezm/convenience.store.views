import { deleteTransaction } from "@/actions/transactionActions"
import DeleteDropdown from "@/components/deletedropdown"
import Transaction from "@/models/transaction"
import { Dispatch, SetStateAction, useState } from "react"
import toast from "react-hot-toast"

type TransactionDeleteProps = {
  id: string
  clearParams: () => void
  setTransactions: Dispatch<SetStateAction<Transaction[]>>
}

export default function TransactionDelete({ id, clearParams, setTransactions }: TransactionDeleteProps) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(true)
  const pId = parseInt(id)
  const openChange = () => {
    setOpen(!open)
    clearParams()
  }
  const handleDelete = async () => {
    try {
      setLoading(true)
      const response = await deleteTransaction(pId)
      if ('message' in response) {
        toast.error(response.message)
        return
      }
      toast.success("Transaction deleted!")
      setTransactions(t => t.filter(i => i.id !== pId))
    } catch (error) {
      toast.error("Someting went wrong!")
    } finally {
      setLoading(false)
      openChange()
    }
  }
  return <DeleteDropdown
    openChange={openChange}
    open={open}
    text={`Are you sure you want to delete this transaction?`}
    handleDelete={handleDelete}
    isLoading={loading}
  />
}
