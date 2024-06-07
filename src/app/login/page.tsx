"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Login } from "@/models/user";
import { login } from "@/actions/userActions";
import toast from "react-hot-toast";
import { useAuthStore } from "@/lib/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingButton from "@/components/loadingButton";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email." }),
  password: z
    .string()
    .min(6, { message: "Not enough characters.(less than 6)" })
    .max(16, { message: "Too many characters.(more than 16)" }),
});

export default function LoginPage() {
  const { userPersist } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const authUser: Login = {
      email: values.email,
      password: values.password,
    };
    try {
      setLoading(true);
      const response = await login(authUser);
      if ("message" in response) {
        toast.error(response.message);
      } else {
        if (response.user) {
          userPersist(response.user, response.token);
          toast.success("User logged in!");
          form.reset();
          router.push("/");
        } else {
          toast.error("Something went wrong!");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full flex justify-center items-center">
    <Form {...form}>
      <div className="w-full lg:w-2/3 p-6">
        <div className="w-full text-center my-2">
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="shadow-md space-y-8 p-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email..." {...field} />
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
                  <Input
                    type="password"
                    placeholder="Your password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton text="submit" type="submit" isLoading={loading} />
        </form>
      </div>
    </Form>
    </section>
  );
}
