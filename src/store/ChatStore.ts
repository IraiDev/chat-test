import { create } from 'zustand'

export interface IChat {
  id: number
  uid: string
  enterpriseId: number
  creatorUserId: number
  name: string
  description: string
  is_group: boolean
  lastConnection: string
}

interface Store {
  chats: IChat[]
  selectedChat: IChat | null
  setChats: (chats: IChat[]) => void
  updateChats: (chats: IChat[]) => void
  clearChatsState: () => void
  selectChat: (chat: IChat) => void
  clearSelectedChat: () => void
}

export const useChatsStore = create<Store>((set) => ({
  chats: [],
  selectedChat: null,
  setChats: (chats) => { set(() => ({ chats })) },
  updateChats: (chats) => { set(({ chats: prevChats }) => ({ chats: [...prevChats, ...chats] })) },
  clearChatsState: () => { set(() => ({ chats: [] })) },
  selectChat: (chat) => { set(() => ({ selectedChat: chat })) },
  clearSelectedChat: () => { set(() => ({ selectedChat: null })) }
}))