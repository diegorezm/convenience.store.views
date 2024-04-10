"use client"
import { getAllProductEntities } from "@/actions/productEntityActions"
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

export type EntityDropdownProps = {
  clearParams: () => void
  id: string
  setProductEntities: Dispatch<SetStateAction<ProductEntity[]>>
}

export default function Products() {
  const [productEntities, setProductEntities] = useState<ProductEntity[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const clearParams = () => {
    router.replace(pathname);
  };
  const params = useSearchParams()


  const LoadModalComponents = () => {
    const showInfoParam = params.get(EntityActionsParam.showInfo) ?? ""
    const deleteEntityParam = params.get(EntityActionsParam.deleteEntity) ?? ""
    const editEntityParam = params.get(EntityActionsParam.editEntity) ?? ""
    const deleteProductParam = params.get(ProductActionsParam.deleteProduct) ?? ""
    if (params.has(EntityActionsParam.showInfo)) return <EntityInfoDropdown clearParams={clearParams} id={showInfoParam} setProductEntities={setProductEntities}/>
    if (params.has(EntityActionsParam.deleteEntity)) return <DeleteEntityDropdown clearParams={clearParams} id={deleteEntityParam} setProductEntities={setProductEntities}/>
    if (params.has(EntityActionsParam.editEntity)) return <EditEntityDropdown clearParams={clearParams} id={editEntityParam} setProductEntities={setProductEntities}/>
      if(params.has(ProductActionsParam.deleteProduct)) return <DeleteProductDropdown clearParams={clearParams} id={deleteProductParam}/>
    return null
  }

  useEffect(() => {
    getAllProductEntities({}).then(e => {
      if ('message' in e) {
        toast.error(e.message)
        return
      }
      setProductEntities(e)
    })
  }, [])
  return (
    <section className="flex flex-col p-4 gap-2">
      {LoadModalComponents() != null && LoadModalComponents()}
      <ProductsInputFilter setProducts={setProductEntities} products={productEntities} />
      <DataTable data={productEntities} columns={entityColumns} />
    </section>
  )
}
