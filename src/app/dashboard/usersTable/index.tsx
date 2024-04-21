import { getAllUsers } from "@/actions/userActions";
import { userCols } from "@/columns/userCols";
import { DataTable } from "@/components/datatable";
import User from "@/models/user";
import { UserActions } from "@/queryParams/userQueryParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteUser from "./deleteUser";
import EditUser from "./editUser";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateUser from "./createUser";
import UserInputFilter from "./userInputFilter";

export type UserDropdownProps = {
  id: string
  clearParams: () => void
  setUsers: Dispatch<SetStateAction<User[]>>
}

export default function UsersTable() {
  const [createModal, setcreateModal] = useState(false)

  const [users, setUsers] = useState<User[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const openCloseCreateModal = () => {
    setcreateModal(!createModal)
  }

  const clearParams = () => {
    router.replace(pathname);
  };

  const LoadComponents = () => {
    const deleteParam = params.get(UserActions.deleteUser) ?? ""
    const editParam = params.get(UserActions.editUser) ?? ""
    if (params.has(UserActions.deleteUser)) return <DeleteUser
      id={deleteParam} clearParams={clearParams} setUsers={setUsers}
    />
    if (params.has(UserActions.editUser)) return <EditUser
      id={editParam} clearParams={clearParams} setUsers={setUsers}
    />
    return null
  }

  useEffect(() => {
    getAllUsers({}).then(e => {
      if ('message' in e) {
        toast.error(e.message)
      } else {
        setUsers(e)
      }
    })
  }, [])

  return (
    <section className="flex flex-col p-4 gap-2">
      {LoadComponents() != null && LoadComponents()}
      {createModal && <CreateUser close={openCloseCreateModal} setUsers={setUsers} />}
      <div className="w-full flex flex-row justify-between">
        <UserInputFilter users={users} setUsers={setUsers} />
        <Button className="flex justify-center gap-2" onClick={openCloseCreateModal}>
          <span>Create new product</span>
          <Plus className="w-5 h-5" />
        </Button>
      </div>
      <DataTable data={users} columns={userCols} />
    </section>
  )
}
