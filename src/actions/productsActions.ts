"use server"
import { ax } from "@/config/axios"
import ProductEntity from "../models/product"
import { Order } from "../queryParams"
import { OrderByProducts, soldQueryParam } from "../queryParams/productsQueryParams"
import ErrorMessage from "../models/errorMessage"
import { AxiosError } from "axios"
import Product from "../models/product"

const URL = '/products'

async function handleAxiosError(error: AxiosError): Promise<ErrorMessage> {
  if (error.response) {
    if (error.response.status == 401 && 'message' in error.response) {
      return error.response.data as ErrorMessage;
    }
    if (error.response.status == 403 || error.response.status == 401) {
      return {
        message: "unauthorized.",
        status: error.response.status
      }
    }
    if (error.response.status == 201) {
      return {
        message: "Could not create the new product.",
        status: 500
      }
    }
    if (error.response.status === 400 || error.response.status === 404) {
      return error.response.data as ErrorMessage
    }
  }
  return {
    message: "Internal server error.",
    status: 500
  }
}

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
