"use client"
import { DataTable } from "@/components/datatable"
import { entityColumns } from "@/columns/entityCols"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ProductEntity from "@/models/productEntity"
import toast from "react-hot-toast"
import ProductsInputFilter from "./ProductsInputFilter"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { EntityActionsParam } from "@/queryParams/productEntityQueryParams"
import EditEntityDropdown from "./EditProductDropdown"
import EntityInfoDropdown from "./InfoProductDropdown"
import DeleteEntityDropdown from "./DeleteEntityDropdown"
import { ProductActionsParam } from "@/queryParams/productsQueryParams"
import DeleteProductDropdown from "./DeleteProductDropdown"
import CreateTransaction from "./CreateTransaction"
import { getAllProductEntities } from "@/actions/productEntityActions"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import CreateProductEntity from "./CreateProductEntity"

export interface ProductDropdownProps {
  clearParams: () => void
  id: string
}

export interface ProductDropdownWithUpdatesProps extends ProductDropdownProps {
  setProducts: Dispatch<SetStateAction<ProductEntity[]>>
}

export default function ProductsTable() {
  const [createModal, setcreateModal] = useState(false)
  const [productEntities, setProductEntities] = useState<ProductEntity[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const clearParams = () => {
    router.replace(pathname);
  };
  useEffect(() => {
    getAllProductEntities({}).then(e => {
      if ('message' in e) {
        toast.error(e.message)
      } else {
        setProductEntities(e)
      }
    })
  }, [])

  const LoadModalComponents = () => {
    const showInfoParam = params.get(EntityActionsParam.showProductInfo) ?? ""
    const deleteEntityParam = params.get(EntityActionsParam.deleteProductEntity) ?? ""
    const editEntityParam = params.get(EntityActionsParam.editProductEntity) ?? ""
    const deleteProductParam = params.get(ProductActionsParam.deleteProduct) ?? ""
    const transactionsParm = params.get(ProductActionsParam.productTransaction) ?? ""
    if (params.has(EntityActionsParam.showProductInfo)) return <EntityInfoDropdown clearParams={clearParams} id={showInfoParam} />
    if (params.has(EntityActionsParam.deleteProductEntity)) return <DeleteEntityDropdown clearParams={clearParams} id={deleteEntityParam} setProducts={setProductEntities} />
    if (params.has(EntityActionsParam.editProductEntity)) return <EditEntityDropdown clearParams={clearParams} id={editEntityParam} setProducts={setProductEntities} />
    if (params.has(ProductActionsParam.deleteProduct)) return <DeleteProductDropdown clearParams={clearParams} id={deleteProductParam} />
    if (params.has(ProductActionsParam.productTransaction)) return <CreateTransaction id={transactionsParm} clearParams={clearParams} />
    return null
  }
  const openCloseCreateModal = () => {
    setcreateModal(!createModal)
  }
  return (
    <section className="flex flex-col p-4 gap-2">
      {LoadModalComponents() != null && LoadModalComponents()}
      {createModal && <CreateProductEntity setProducts={setProductEntities} close={openCloseCreateModal} />}
      <div className="w-full flex flex-row justify-between">
        <ProductsInputFilter setProducts={setProductEntities} products={productEntities} />
        <Button className="flex justify-center gap-2" onClick={openCloseCreateModal}>
          <span>Create new product</span>
          <Plus className="w-5 h-5" />
        </Button>
      </div>
      <DataTable data={productEntities} columns={entityColumns} />
    </section>
  )
}
