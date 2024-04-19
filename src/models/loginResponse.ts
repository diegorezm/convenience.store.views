import User from "./user"

export type LoginResponse = {
  token: string
  expiresAt: Date
  user?: User
}
