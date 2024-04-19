export default interface Transaction {
  id: number,
  cpf: string,
  productId: number,
  createdAt: Date,
}
export interface TransactionDTO {
  cpf: string
  productId: number
}
