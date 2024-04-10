import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Info, LucideIcon, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import ProductEntity from "@/models/productEntity";
import {  usePathname, useRouter } from "next/navigation";
import { EntityActionsParam } from "@/queryParams/productEntityQueryParams";

type Actions = {
  name: string
  Icon: LucideIcon
  paramFn: () => void
}


export default function DropdownColumnEntity({ product }: { product: ProductEntity }) {
  const pathname = usePathname()
  const { replace } = useRouter()
  const onInfoParam = () => {
    const param = new URLSearchParams()
    param.set(EntityActionsParam.showInfo, product.id.toString())
    replace(`${pathname}?${param.toString()}`);
  }

  const onDeleteParam = () => {
    const param = new URLSearchParams()
    param.set(EntityActionsParam.deleteEntity, product.id.toString())
    replace(`${pathname}?${param.toString()}`);
  }

  const onEditParam = () => {
    const param = new URLSearchParams()
    param.set(EntityActionsParam.editEntity, product.id.toString())
    replace(`${pathname}?${param.toString()}`);
  }
  const actions: Actions[] = [
    {
      name: "edit",
      Icon: Pencil,
      paramFn: onEditParam
    },
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
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="flex flex-row gap-2 items-center"
          onClick={() => onInfoParam()}
        >
          <Info className="w-4 h-4" /> Product info
        </DropdownMenuItem>
        <DropdownMenuSeparator />
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
