import { z } from "zod"

export default interface User {
  id: number
  username: string
  email: string
  password?: string
  role: UserRoles
  createdAt: Date,
  updatedAt: Date,
}

export type Login = {
  email: string
  password: string
}

export type UserDTO = {
  username: string
  email: string
  password?: string
  role: string
}

export enum UserRoles {
  ADMIN = "admin",
  EMPLOYEE = "employee"
}

const zodUserRolesEnum = z.nativeEnum(UserRoles)

export type UserEditDTO = {
  username: string
  email: string
}

export const userFormSchema = z.object({
  username: z.string()
    .min(5, {
      message: "Not enough characters.(less than 5)"
    }).max(30, {
      message: "Too many characters.(more than 30)"
    }),
  email: z.string()
    .email({ message: "Please provide a valid email." })
    .min(5, {
      message: "Not enough characters.(less than 5)"
    }).max(30, {
      message: "Too many characters.(more than 30)"
    }),
  password: z.string()
    .min(6, {
      message: "Not enough characters.(less than 6)"
    }).max(16, {
      message: "Too many characters.(more than 1)"
    }),
  role: zodUserRolesEnum
})

export const userEditFormSchema = z.object({
  username: z.string()
    .min(5, {
      message: "Not enough characters.(less than 5)"
    }).max(30, {
      message: "Too many characters.(more than 30)"
    }),
  email: z.string()
    .email({ message: "Please provide a valid email." })
    .min(5, {
      message: "Not enough characters.(less than 5)"
    }).max(30, {
      message: "Too many characters.(more than 30)"
    })
})

