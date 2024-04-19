"use server"
import { ax } from "@/config/axios"
import ProductEntity from "../models/product"
import { Order } from "../queryParams"
import { OrderByProducts, soldQueryParam } from "../queryParams/productsQueryParams"
import Product from "../models/product"
import handleAxiosError from "./handleAxiosError"

const URL = '/products'

export async function getAllProducts({
  orderby = OrderByProducts.id,
  order = Order.asc,
  sold
}: {
  orderby?: OrderByProducts
  order?: Order
  sold?: soldQueryParam
}) {
  let reqUrl = `${URL}?orderby=${orderby}`
  if (sold) {
    reqUrl += `&sold=${sold}`
  }
  reqUrl += `&order=${order}`
  try {
    const response = await ax.get(reqUrl)
    return response.data as Product[]
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function getProductById(id: number) {
  try {
    let reqUrl = `${URL}/${id}`
    const response = await ax.get(reqUrl)
    return response.data as Product
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function getProductByEntityId(id: number) {
  try {
    let reqUrl = `${URL}/entity/${id}`
    const response = await ax.get(reqUrl)
    return response.data as Product[]
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function registerNewProduct(data: ProductEntity) {
  try {
    const response = await ax.post(URL, data)
    return response.data as Product
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function deleteProduct(id: number) {
  try {
    let reqUrl = `${URL}/${id}`
    const response = await ax.delete(reqUrl)
    return response.data as Product
  } catch (error: any) {
    return handleAxiosError(error)

  }
}
