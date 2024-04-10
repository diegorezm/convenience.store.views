export default interface User{
  id: number 
  username: string
  email: string
  password?: string
  role: String
  createdAt: Date,
  updatedAt: Date,
}

export type Login = {
  email: string
  password: string
}
