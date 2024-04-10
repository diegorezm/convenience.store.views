import { useState } from "react"
import DeleteDropdown from "@/components/deletedropdown"
import { deleteProduct } from "@/actions/productsActions"
import toast from "react-hot-toast"

type DeleteProductDropdownProps = {
  clearParams: () => void
  id: string
}
export default function DeleteProductDropdown({ clearParams, id }: DeleteProductDropdownProps) {
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
      const response = await deleteProduct(pId)
      if ('message' in response) {
        toast.error(response.message)
        return
      }
      toast.success("Product deleted!")
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
    text={`Are you sure you want to delete this product with id ${id}?`}
    handleDelete={handleDelete}
    isLoading={loading}
  />
}
