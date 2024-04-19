import DeleteDropdown from "@/components/deletedropdown"
import { deleteProductEntity } from "@/actions/productEntityActions"
import { ProductDropdownWithUpdatesProps } from "./index"
import { useState } from "react"
import toast from "react-hot-toast"
export default function DeleteEntityDropdown({ clearParams, setProducts, id }: ProductDropdownWithUpdatesProps) {
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const pId = parseInt(id)
  const openChange = () => {
    clearParams()
    setOpen(!open)
  }
  const handleDelete = async () => {
    try {
      setLoading(true)
      const response = await deleteProductEntity(pId)
      if ('message' in response) {
        toast.error(response.message)
        return
      }
      toast.success(`Entry with id ${pId} was deleted!`)
      setProducts(products => products.filter(product => product.id !== pId));
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
      openChange()
    }
  }
  return <DeleteDropdown handleDelete={handleDelete} openChange={openChange} isLoading={loading} open={open} text={`Are you sure you want to delete entry with id ${pId}?`} />
}
