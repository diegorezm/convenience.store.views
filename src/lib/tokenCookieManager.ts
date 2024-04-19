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

export async function setTokenExpiresAt(exp: Date) {
  const cookieStore = cookies()
  cookieStore.set("tokenExpiresAt", exp.toString())
}

export async function getTokenExpiresAt() {
  const cookieStore = cookies()
  const exp = cookieStore.get("tokenExpiresAt")
  if (exp?.value) {
    return new Date(exp.value)
  }
  return null
}

export async function deleteExpirationDate() {
  const cookieStore = cookies()
  cookieStore.set("tokenExpiresAt", "")
}
