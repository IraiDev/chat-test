import { create } from 'zustand'

export const USERS: User[] = [
  { id: 290, name: 'Ignacio A.', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImlhcnJpYWdhZGEiLCJ1c2VySWQiOiIyOTAiLCJlbnRlcnByaXNlSWQiOiIxIiwiaWF0IjoxNjgwNTM3NzUwfQ.oryFS6JMdh2FE8iMKzFUyb5DleYofp67Fzqo24dOn-o' },
  { id: 213, name: 'Sebastian A.', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNhY3VuYSIsInVzZXJJZCI6IjIxMyIsImVudGVycHJpc2VJZCI6IjEiLCJpYXQiOjE2ODA4MDMyNDJ9.ptViEPL9zOh16fUPkoOU68-T0b5CK07LiAg8mKkDyaM' },
  // { id: 3, name: 'Rodrigo del C.', token: 'rdelcanto' },
  // { id: 2, name: 'Felix M.', token: 'fmarin' },
  // { id: 4, name: 'Luis V.', token: 'lvergara' }
]

export interface User { id: number, name: string, token: string }

interface Store {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => { set(() => ({ user })) },
  clearUser: () => { set(() => ({ user: null })); }
}))