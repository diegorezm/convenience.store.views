import { Modal } from "@/components/modal";
import { ProductDropdownProps } from ".";
import { useState } from "react";
import { TransactionDTO } from "@/models/transaction";
import { registerNewTransaction } from "@/actions/transactionActions";
import toast from "react-hot-toast";

export default function CreateTransaction({ clearParams, id}: ProductDropdownProps) {
  const pId = Number.parseInt(id)
  const [loading, setLoading] = useState(false)
  const [request, setRequest] = useState<TransactionDTO>({
    cpf: "",
    productId: pId
  })

  const handleTransactionRequest = async () => {
    try {
      setLoading(true)
      const response = await registerNewTransaction(request)
      if ('message' in response) {
        toast.error(response.message)
        return;
      }
      toast.success("Transaction created!")
      clearParams()
      return;
    } catch (error: any) {
      toast.error("Error!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal.Root clearParams={clearParams}>
      <Modal.Header title="Creating a transaction" />
      <Modal.InputField
        id="id"
        label="Client id: "
        value={request.cpf}
        onChange={e => setRequest({ productId: pId, cpf: e.target.value })}
        placeholder="Client id..."
      />
      <Modal.Footer isLoading={loading} handler={handleTransactionRequest} />
    </Modal.Root>
  )
}
