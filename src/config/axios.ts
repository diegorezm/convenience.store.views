import { logout } from "@/actions/userActions"
import { getToken, getTokenExpiresAt } from "@/lib/tokenCookieManager"
import axios from "axios"

export const ax = axios.create({
  baseURL: process.env.API_URL ?? "http://localhost:8080",
})

const isTokenExpired = (expired: Date) => {
  const currentDate = new Date()
  return currentDate > expired
}

export const axInterceptor = ax.interceptors.request.use(async (config) => {
  const token = await getToken()
  const expired = await getTokenExpiresAt()
  if (expired != null && isTokenExpired(expired)) {
    logout()
  }
  else if (expired == null || token == "") {
    logout()
  } else {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export const setAxiosAuthHeader = async (token: string) => {
  ax.defaults.headers.common.Authorization = `Bearer ${token}`
}
