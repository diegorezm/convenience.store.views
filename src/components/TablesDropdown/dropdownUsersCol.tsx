import User from "@/models/user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LucideIcon, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { UserActions } from "@/queryParams/userQueryParams";
import { useAuthStore } from "@/lib/useAuthStore";

type Actions = {
  name: string
  Icon: LucideIcon
  paramFn: () => void
}
export default function DropdownUsersCols(user: User) {
  const auth = useAuthStore()
  const pathname = usePathname()
  const { replace } = useRouter()
  const onDeleteParam = () => {
    const param = new URLSearchParams()
    param.set(UserActions.deleteUser, user.id.toString())
    replace(`${pathname}?${param.toString()}`);
  }

  const onEditParam = () => {
    const param = new URLSearchParams()
    param.set(UserActions.editUser, user.id.toString())
    replace(`${pathname}?${param.toString()}`);
  }

  const actions: Actions[] = [
    {
      name: "delete",
      Icon: Trash2,
      paramFn: onDeleteParam
    },
    {
      name: "edit",
      Icon: Pencil,
      paramFn: onEditParam
    }
  ]
  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((e, u) => {
          if(user.id === auth.user.id && e.name == "delete") return
          return (
            <DropdownMenuItem key={u}
              onClick={e.paramFn}
              className="flex flex-row gap-2 items-center">
              <e.Icon className="w-4 h-4" />
              {e.name}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
