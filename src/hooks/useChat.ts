import { useEffect, useState } from 'react'
import { useSocketStore } from '../store/SocketStore'
import { CLIENT_CHANNELS, SERVER_CHANNELS } from '../utils/constants'
import { useChatsStore, type IChat } from '../store/ChatStore'
import { useUserStore } from '../store/UserStore';

export interface IMessage {
  id: number;
  uid: string;
  chatId: number;
  userId: number;
  message: string;
  dateTimeSent: string;
}

export const useChat = () => {
  const { connection } = useSocketStore()
  const { user } = useUserStore()
  const {
    chats,
    setChats,
    selectChat,
    selectedChat,
  } = useChatsStore()
  const [messages, setMessages] = useState<IMessage[]>([])

  const handleSelectChat = (chat: IChat) => {
    if (connection === null || user === null) return
    selectChat(chat)
    connection.emit(SERVER_CHANNELS['join-room'], { uidChat: chat.uid, token: user.token })
  }

  useEffect(() => {
    if (connection === null) return
    connection.on(CLIENT_CHANNELS.chats, (data: IChat[]) => {
      setChats(data)
    })
  }, [connection])

  useEffect(() => {
    if (connection === null) return
    connection.on(CLIENT_CHANNELS.messages, (data: IMessage[]) => {
      setMessages(data)
    })
  }, [connection])

  return {
    chats,
    messages,
    selectedChat,
    handleSelectChat
  }
}