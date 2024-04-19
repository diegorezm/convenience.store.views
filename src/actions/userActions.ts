"use server"
import { ax, axInterceptor, setAxiosAuthHeader } from "@/config/axios";
import User, { Login } from "../models/user";
import { Order } from "../queryParams";
import { OrderByUsers } from "../queryParams/userQueryParams";
import authCookieManager from "@/lib/authCookieManager";
import { deleteExpirationDate, deleteToken, setToken, setTokenExpiresAt } from "@/lib/tokenCookieManager";
import { LoginResponse } from "@/models/loginResponse";
import handleAxiosError from "./handleAxiosError";

const URL = "/users"

export async function login(data: Login) {
  try {
    let reqUrl = `${URL}/login`
    const response = await ax.post(reqUrl, data)
    authCookieManager("true")
    const dataResponse = response.data as LoginResponse
    setToken(dataResponse.token)
    setTokenExpiresAt(dataResponse.expiresAt)
    setAxiosAuthHeader(dataResponse.token)
    return dataResponse
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function register(data: User) {
  try {
    const response = await ax.post(URL, data)
    return response.data as User
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function getAllUsers({ order = Order.desc, orderby = OrderByUsers.id }) {
  try {
    let reqUrl = `${URL}?order=${order}&orderby=${orderby}`
    const response = await ax.get(reqUrl)
    return response.data as User[]
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function updateUser(data: User) {
  try {
    let reqUrl = `${URL}/${data.id}`
    const response = await ax.put(reqUrl, data)
    return response.data as User
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function deleteUser(id: number) {
  try {
    let reqUrl = `${URL}/${id}`
    const response = await ax.delete(reqUrl)
    return response.data as User
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function logout() {
  deleteToken()
  authCookieManager("false")
  deleteExpirationDate()
  ax.interceptors.request.eject(axInterceptor)
}
