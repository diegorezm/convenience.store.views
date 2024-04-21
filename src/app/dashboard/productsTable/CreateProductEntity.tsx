import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Modal } from "@/components/modal"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import ProductEntity, { ProductEntityDTO, productEntityFormSchema } from "@/models/productEntity"
import { Dispatch, SetStateAction, useState } from "react"
import toast from "react-hot-toast"
import { registerNewProductEntity } from "@/actions/productEntityActions"
import { Input } from "@/components/ui/input"

type FormType = z.infer<typeof productEntityFormSchema>

type Props = {
  close: () => void
  setProducts: Dispatch<SetStateAction<ProductEntity[]>>
}

export default function CreateProductEntity({ close, setProducts }: Props) {
  const [loading, setLoading] = useState(false)
  const form = useForm<FormType>({
    resolver: zodResolver(productEntityFormSchema),
    defaultValues: {
      name: ""
    },
  })
  const onSubmit = async (value: FormType) => {
    try {
      setLoading(true)
      const request: ProductEntityDTO = {
        name: value.name
      }
      const response = await registerNewProductEntity(request)
      if ('message' in response) {
        toast.error(response.message)
        return
      }
      setProducts(p => [...p, response])
      toast.success(`Product ${response.name} created!`)
      close()
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal.Root>
      <Modal.Header title="Register new product" />
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
  )
}
