"use server"
import ProductEntity from "../models/productEntity"
import { ax } from "@/config/axios"
import { OrderbyProductEntity, ShowProducts } from "../queryParams/productEntityQueryParams"
import { Order } from "../queryParams"
import ErrorMessage from "../models/errorMessage"
import { AxiosError } from "axios"

const URL = "/products/entities"

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

export async function getAllProductEntities({
  orderby = OrderbyProductEntity.id,
  showProducts = ShowProducts.false,
  order = Order.asc
}): Promise<ProductEntity[] | ErrorMessage> {
  const reqUrl = `${URL}?orderby=${orderby}&showProducts=${showProducts}&order=${order}`
  try {
    const response = await ax.get(reqUrl)
    return response.data as ProductEntity[]
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function getProductEntityById(id: number): Promise<ProductEntity | ErrorMessage> {
  const reqUrl = `${URL}/${id}`
  try {
    const response = await ax.get(reqUrl)
    return response.data as ProductEntity
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function registerNewProductEntity(data: ProductEntity): Promise<ProductEntity | ErrorMessage> {
  try {
    const response = await ax.post(URL, data)
    return response.data
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function updateProductEntity(data: ProductEntity): Promise<ProductEntity | ErrorMessage> {
  const reqUrl = `${URL}/${data.id}`
  try {
    const response = await ax.put(reqUrl, data)
    return response.data
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function deleteProductEntity(id: number): Promise<ProductEntity | ErrorMessage> {
  const reqUrl = `${URL}/${id}`
  try {
    const response = await ax.delete(reqUrl)
    return response.data
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

