import { create } from "zustand"

export interface User {
  id: number
  name: string
  token: string
}

interface Store {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => {
    set(() => ({ user }))
  },
  clearUser: () => {
    set(() => ({ user: null }))
  },
}))
