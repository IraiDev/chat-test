import { create } from 'zustand'
import { type Socket } from 'socket.io-client'

interface Store {
  connection: Socket | null
  saveConnection: (socket: Socket) => void
  clearConnection: () => void
}

export const useSocketStore = create<Store>((set) => ({
  connection: null,
  saveConnection: (connection) => { set(() => ({ connection })) },
  clearConnection: () => { set(() => ({ connection: null })) }
}))