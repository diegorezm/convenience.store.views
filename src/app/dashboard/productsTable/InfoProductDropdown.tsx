import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ProductDropdownProps } from "./index";
import { useEffect, useState } from "react";
import ProductEntity from "@/models/productEntity";
import Product from "@/models/product";
import { getProductEntityById } from "@/actions/productEntityActions";
import { getProductByEntityId } from "@/actions/productsActions";
import toast from "react-hot-toast";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, LucideIcon, MoreHorizontal, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ProductActionsParam } from "@/queryParams/productsQueryParams";

type Actions = {
  name: string
  Icon: LucideIcon
  paramFn: (id: number) => void
}

export default function InfoProductDropdown({ clearParams, id }: ProductDropdownProps) {
  const pId = parseInt(id)

  const { replace } = useRouter()
  const pathname = usePathname()

  const [productEntity, setProductEntity] = useState<ProductEntity>({
    id: pId,
    name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    products: []

  })
  const [products, setProducts] = useState<Product[]>([])
  const parseInfo = (id: number) => {
    getProductEntityById(id).then(e => {
      if ('message' in e) {
        toast.error(e.message)
        return
      }
      setProductEntity(e)
    })
    getProductByEntityId(id).then(e => {
      if ('message' in e) {
        toast.error(e.message)
        return
      }
      setProducts(e)
    })
  }

  useEffect(() => {
    parseInfo(pId)
  }, [pId])

  const handleDeleteChange = (id: number) => {
    const params = new URLSearchParams()
    params.set(ProductActionsParam.deleteProduct, id.toString())
    replace(`${pathname}?${params.toString()}`)
  }

  const handleTransactionChange = (id: number) => {
    const params = new URLSearchParams()
    params.set(ProductActionsParam.productTransaction, id.toString())
    replace(`${pathname}?${params.toString()}`)
  }

  const actions: Actions[] = [
    {
      name: "Delete",
      Icon: Trash2,
      paramFn: handleDeleteChange
    },
    {
      name: "Transaction",
      Icon: ArrowLeftRight,
      paramFn: handleTransactionChange
    },
  ]

  return (
    <>
      <Dialog defaultOpen onOpenChange={clearParams}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h1 className="text-2xl">Info</h1>
            </DialogTitle>
            <DialogDescription>
              <h2 className="text-lg">
                All of the availiable products for: <span className="font-bold">{productEntity.name}</span>
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">#</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map(e => {
                    return (
                      <TableRow key={e.id}>
                        <TableCell className="text-center">{e.id}</TableCell>
                        <TableCell className="text-center">{e.sold ? "Sold" : "Availiable"}</TableCell>
                        <TableCell className="text-center">

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              {actions.map((a, u) => {
                                if (e.sold && a.name == "Transaction") return;
                                return (
                                  <DropdownMenuItem key={u}
                                    onClick={() => {
                                      a.paramFn(e.id)
                                    }}
                                    className="flex flex-row gap-2 items-center">
                                    <a.Icon className="w-4 h-4" />
                                    {a.name}
                                  </DropdownMenuItem>
                                )
                              }
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogTrigger>
              <Button variant={"secondary"}>
                Close
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
