"use server"
import ProductEntity, { ProductEntityDTO } from "../models/productEntity"
import { ax } from "@/config/axios"
import { OrderbyProductEntity } from "../queryParams/productEntityQueryParams"
import { Order } from "../queryParams"
import ErrorMessage from "../models/errorMessage"
import handleAxiosError from "./handleAxiosError"

const URL = "/products/entities"

export async function getAllProductEntities({
  orderby = OrderbyProductEntity.id,
  order = Order.asc
}): Promise<ProductEntity[] | ErrorMessage> {
  const reqUrl = `${URL}?orderby=${orderby}&order=${order}`
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

export async function registerNewProductEntity(data: ProductEntityDTO): Promise<ProductEntity | ErrorMessage> {
  try {
    const response = await ax.post(URL, data)
    return response.data
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function updateProductEntity({ id, data }: { id: number, data: ProductEntityDTO }): Promise<ProductEntity | ErrorMessage> {
  const reqUrl = `${URL}/${id}`
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

