export interface IUser {
  id: number
  name: string
  token: string
}

export type LoggedUser = IUser | null
