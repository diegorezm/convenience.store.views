"use server"
import { cookies } from 'next/headers'

export async function setToken(token: string) {
  const cookieStore = cookies()
  cookieStore.set("token", token)
}
export async function getToken() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")
  return token?.value ?? ""
}

export async function deleteToken() {
  const cookieStore = cookies()
  cookieStore.set("token", "")
}
