import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Transaction from "@/models/transaction"
import { TransactionQueryParam } from "@/queryParams/transactionQueryParam";
import { LucideIcon, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
  transaction: Transaction
}

type Actions = {
  name: string
  Icon: LucideIcon
  paramFn: () => void
}

export default function DropdownTransaction({ transaction }: Props) {
  const pathname = usePathname()
  const { replace } = useRouter()
  const onDeleteParam = () => {
    const param = new URLSearchParams()
    param.set(TransactionQueryParam.deleteTransaction, transaction.id.toString())
    replace(`${pathname}?${param.toString()}`);
  }

  const actions: Actions[] = [
    {
      name: "delete",
      Icon: Trash2,
      paramFn: onDeleteParam
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
        {actions.map((e, u) => (
          <DropdownMenuItem key={u}
            onClick={e.paramFn}
            className="flex flex-row gap-2 items-center">
            <e.Icon className="w-4 h-4" />
            {e.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
