import { useEffect, useState } from "react"
import { ProductEntityDTO } from "@/models/productEntity"
import { getProductEntityById, updateProductEntity } from "@/actions/productEntityActions"
import toast from "react-hot-toast"
import { Modal } from "@/components/modal"
import { ProductDropdownWithUpdatesProps } from "."
export default function EditProductDropdown({ clearParams, setProducts, id }: ProductDropdownWithUpdatesProps) {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<ProductEntityDTO>({
    name: "",
  })
  const pId = parseInt(id)
  useEffect(() => {
    getProductEntityById(pId).then(e => {
      if ('message' in e) {
        toast.error(e.message)
        return
      }
      setProduct(e)
    })
  }, [])

  const handleEditRequest = async () => {
    try {
      setLoading(true)
      const response = await updateProductEntity({ id: pId, data: product })
      if ('message' in response) {
        toast.error(response.message)
      } else {
        toast.success(`Product is now called: ${response.name}`)
        setProducts(products => {
          const updatedProducts = products.map(p => (p.id === pId ? response : p))
          return updatedProducts
        })
      }
    }
    catch (error) {
      toast.error("Something went wrong while editing this record!")
    } finally {
      setLoading(false)
      clearParams()
    }
  }

  return (
    <>
      <Modal.Root clearParams={clearParams}>
        <Modal.Header title={`Editing: ${product.name}`} />
        <Modal.InputField id="name" label="Name" value={product.name} onChange={e => setProduct({ name: e.target.value })} />
        <Modal.Footer isLoading={loading} loadingText="Updating..." handler={handleEditRequest} />
      </Modal.Root>
    </>
  )
}
