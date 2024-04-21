import DeleteDropdown from "@/components/deletedropdown";
import { UserDropdownProps } from ".";
import toast from "react-hot-toast";
import { deleteUser } from "@/actions/userActions";
import { useState } from "react";

export default function DeleteUser({ id, clearParams, setUsers }: UserDropdownProps) {
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
      const response = await deleteUser(pId)
      if ('message' in response) {
        toast.error(response.message)
        return
      }
      toast.success("User deleted!")
      setUsers(t => t.filter(i => i.id !== pId))
    } catch (error) {
      toast.error("Someting went wrong!")
    } finally {
      setLoading(false)
      openChange()
    }
  }
  return <DeleteDropdown
    title={`Delete user with id ${pId}`}
    openChange={openChange}
    open={open}
    text={`Are you sure you want to delete this user?`}
    handleDelete={handleDelete}
    isLoading={loading}
  />
}
