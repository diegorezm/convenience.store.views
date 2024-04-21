export default interface Product {
  id: number,
  entityId: number,
  sold: boolean,
  createdAt: Date,
  updatedAt: Date,
}

export type ProductDTO = {
  entityId: number
}
