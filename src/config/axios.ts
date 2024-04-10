import { getToken } from "@/lib/tokenCookieManager"
import axios from "axios"

export const ax = axios.create({
  baseURL: 'http://localhost:8080',
})

export const axInterceptor = ax.interceptors.request.use(async (config) => {
  const token = await getToken()
  if (token != "") {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export const setAxiosAuthHeader = async (token: string) => {
  ax.defaults.headers.common.Authorization = `Bearer ${token}`
  console.log("header: " + ax.defaults.headers.Authorization)
}
