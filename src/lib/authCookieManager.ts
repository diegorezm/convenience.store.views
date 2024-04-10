"use server"

import { cookies } from 'next/headers'

export default async function authCookieManager(state: "true" | "false") {
  const cookieStore = cookies()
  if (cookieStore.has("auth")) {
    cookieStore.delete("auth")
  }
  cookieStore.set("auth", state)
}
