"use server"
import { ax } from "@/config/axios";
import Transaction from "../models/transaction";
import ErrorMessage from "../models/errorMessage";
import { AxiosError } from "axios";

const URL = "/transaction"

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
        message: "Could not create the new transaction.",
        status: 500
      }
    }
    if (error.response.status == 403 || error.response.status == 401) {
      return {
        message: "unauthorized.",
        status: error.response.status
      }
    }
    if (error.response.status === 400 || error.response.status === 404) {
      return error.response.data as ErrorMessage;
    }
  }
  return {
    message: "Internal server error.",
    status: 500
  };
}

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

export async function registerNewTransaction(data: Transaction) {
  try {
    const response = await ax.post(URL, data)
    return response.data
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
