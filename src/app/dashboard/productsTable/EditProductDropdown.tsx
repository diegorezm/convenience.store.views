import { useEffect, useState } from "react"
import { ProductEntityDTO } from "@/models/productEntity"
import { getProductEntityById, updateProductEntity } from "@/actions/productEntityActions"
import toast from "react-hot-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Modal } from "@/components/modal"
import { ProductDropdownWithUpdatesProps } from "."
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"

const editFormSchema = z.object({
  name: z.string().min(5, {
    message: "Not enough characters.(less than 5)"
  }).max(25, {
    message: "Too many characters.(more than 25)"
  })
})

export default function EditProductDropdown({ clearParams, setProducts, id }: ProductDropdownWithUpdatesProps) {
  const pId = parseInt(id)
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      name: ""
    },
  })
  useEffect(() => {
    getProductEntityById(pId).then(e => {
      if ('message' in e) {
        toast.error(e.message)
        return
      }
      form.reset({
        name: e.name
      })
    })
  }, [])
  const onSubmit = async (values: z.infer<typeof editFormSchema>) => {
    try {
      const request: ProductEntityDTO = {
        name: values.name
      }
      setLoading(true)
      const response = await updateProductEntity({ id: pId, data: request })
      if ('message' in response) {
        toast.error(response.message)
      } else {
        toast.success(`Product is now called: ${response.name}`)
        setProducts(products => {
          const updatedProducts = products.map(p => (p.id === pId ? response : p))
          return updatedProducts
        })
      }
    } catch (error) {
      toast.error("Something went wrong while editing this record!")
    } finally {
      setLoading(false)
      clearParams()
    }
  }

  return (
    <>
      <Modal.Root clearParams={clearParams}>
        <Modal.Header title={`Editing product with id: ${id}`} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your new product name..."  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Modal.Footer isLoading={loading} type={"submit"} className="mt-2" />
          </form>
        </Form>
      </Modal.Root>
    </>
  )
}
