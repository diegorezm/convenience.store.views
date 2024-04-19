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
