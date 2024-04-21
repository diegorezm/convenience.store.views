import { registerUser } from "@/actions/userActions"
import { Modal } from "@/components/modal"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import User, { UserDTO, UserRoles, userFormSchema } from "@/models/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

type Props = {
  setUsers: Dispatch<SetStateAction<User[]>>
  close: () => void
}
type FormType = z.infer<typeof userFormSchema>

export default function CreateUser({ setUsers, close }: Props) {
  const userRoleNames = Object.keys(UserRoles) as (keyof typeof UserRoles)[];
  const [loading, setLoading] = useState(false)
  const form = useForm<FormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: UserRoles.EMPLOYEE
    },
  })

  const onSubmit = async (values: FormType) => {
    try {
      setLoading(true)
      const request: UserDTO = {
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role.toUpperCase()
      }
      const response = await registerUser(request)
      if ('message' in response) {
        toast.error(response.message)
        return
      }
      toast.success(`User ${response.username} created!`)
      setUsers(u => [...u, response])
      close()
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal.Root clearParams={close}>
      <Modal.Header title="Create new user" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Your new password..."  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {userRoleNames.map((role, i) => (
                      <SelectItem key={i} value={role.toLowerCase()}>{role.toLowerCase()}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
