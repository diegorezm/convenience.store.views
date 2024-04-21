import { z } from 'zod'
import Product from "./product";

export default interface ProductEntity {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,
  products: Product[]
}

export interface ProductEntityDTO {
  name: string
}

export const productEntityFormSchema = z.object({
  name: z.string()
    .min(5, {
      message: "Not enough characters.(less than 5)"
    }).max(30, {
      message: "Too many characters.(more than 30)"
    }),
})
