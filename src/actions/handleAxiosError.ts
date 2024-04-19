import ErrorMessage from "@/models/errorMessage"
import { AxiosError } from "axios"

export default async function handleAxiosError(error: AxiosError): Promise<ErrorMessage> {
  if (error.response) {
    if (error.response.data) {
      return error.response.data as ErrorMessage
    }
    if ('message' in error.response) {
      return error.response as ErrorMessage
    }
    if (error.response.status == 403 || error.response.status == 401) {
      return {
        message: "unauthorized.",
        status: error.response.status
      }
    }
  }
  return {
    message: "Internal server error.",
    status: 500
  }
}

