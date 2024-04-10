import DeleteDropdown from "@/components/deletedropdown"
import { deleteProductEntity } from "@/actions/productEntityActions"
import { EntityDropdownProps } from "./page"
import { useState } from "react"
import toast from "react-hot-toast"
export default function DeleteEntityDropdown({ clearParams, setProductEntities, id }: EntityDropdownProps) {
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
      setProductEntities(e => {
        const filteredList = e.filter(p => p.id != pId)
        return filteredList
      })
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
      openChange()
    }
  }
  return <DeleteDropdown handleDelete={handleDelete} openChange={openChange} isLoading={loading} open={open} text={`Are you sure you want to delete entry with id ${pId}?`} />
}
