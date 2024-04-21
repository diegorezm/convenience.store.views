import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Modal } from "@/components/modal";
import { UserDropdownProps } from ".";
import { UserEditDTO, userEditFormSchema } from "@/models/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { getUserById, updateUser } from '@/actions/userActions';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';

export default function EditUser({ id, clearParams, setUsers }: UserDropdownProps) {
  const pId = parseInt(id)
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof userEditFormSchema>>({
    resolver: zodResolver(userEditFormSchema),
    defaultValues: {
      username: "",
      email: ""
    },
  })

  useEffect(() => {
    getUserById(pId).then(e => {
      if ('message' in e) {
        toast.error(e.message)
        return
      }
      form.reset({
        username: e.username,
        email: e.email
      })
    })
  }, [])

  const onSubmit = async (values: z.infer<typeof userEditFormSchema>) => {
    try {
      setLoading(true)
      const request: UserEditDTO = {
        username: values.username,
        email: values.email
      }
      const response = await updateUser(pId, request)
      if ('message' in response) {
        toast.error(response.message)
        return
      }
      toast.success("User updated!")
      setUsers(users => {
        const updatedUser = users.map(u => (u.id === pId ? response : u))
        return updatedUser
      })
      clearParams()
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal.Root clearParams={clearParams}>
      <Modal.Header title={`Editing user with id: ${id}`} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your new username..."  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your new email..."  {...field} />
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
