import Product from "./product";

export default interface ProductEntity {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,
}

export interface ProductEntityWithMetadata {
  productEntity: ProductEntity,
  products: Product[]
}
