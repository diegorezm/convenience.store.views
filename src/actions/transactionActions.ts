"use server"
import { ax } from "@/config/axios";
import Transaction, { TransactionDTO } from "../models/transaction";
import ErrorMessage from "../models/errorMessage";
import handleAxiosError from "./handleAxiosError";

const URL = "/transaction"

export async function getAllTransactions() {
  try {
    let reqUrl = `${URL}`
    const response = await ax.get(reqUrl)
    return response.data as Transaction[]
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function getTransactionById(id: number) {
  try {
    let reqUrl = `${URL}/${id}`
    const response = await ax.get(reqUrl)
    return response.data as Transaction
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function getTransactionByProductId(productId: number) {
  try {
    let reqUrl = `${URL}/product/${productId}`
    const response = await ax.get(reqUrl)
    return response.data as Transaction
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function registerNewTransaction(data: TransactionDTO): Promise<Transaction | ErrorMessage> {
  try {
    const response = await ax.post(URL, data)
    return response.data as Transaction
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export async function deleteTransaction(id: number) {
  try {
    let reqUrl = `${URL}/${id}`
    const response = await ax.delete(reqUrl)
    return response.data as Transaction
  } catch (error: any) {
    return handleAxiosError(error)
  }
}
