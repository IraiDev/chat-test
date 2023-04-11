import { useEffect, useMemo, useState } from "react"
import { CLIENT_CHANNELS, SERVER_CHANNELS } from "../utils/constants"
import { useChatContext } from "../store/ChatStore"
import {
  type NotReadedMessages,
  type IChat,
  type IMessage,
} from "../models/chat.model"

export function useChat() {
  const { connection, loggedUser } = useChatContext()
  const [chats, setChats] = useState<IChat[]>([])
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null)
  const [messages, setMessages] = useState<IMessage[]>([])

  const notReadedMessages: NotReadedMessages = useMemo(() => {
    const notReaded = chats
      .filter((chat) => chat.notReadedMessages > 0)
      .reduce((acc, cur) => acc + cur.notReadedMessages, 0)
    return {
      total: notReaded,
      normalized: notReaded > 99 ? "+99" : notReaded.toString(),
    }
  }, [chats])

  // ? funcion que captura el chat seleccionado
  const handleSelectChat = (chat: IChat) => {
    if (connection === null || loggedUser === null) return
    setSelectedChat(chat)
    setChats((prevState) =>
      prevState.map((item) => ({
        ...item,
        notReadedMessages: chat.id === item.id ? 0 : item.notReadedMessages,
      }))
    )
    connection.emit(SERVER_CHANNELS["join-room"], {
      uidChat: chat.uid,
      token: loggedUser.token,
    })
  }

  // ? efecto para almacenar la data de los chats/grupos
  useEffect(() => {
    if (connection === null) return
    connection.on(CLIENT_CHANNELS.chats, (data: IChat[]) => {
      console.log(data)
      setChats(data)
    })

    return () => {
      setChats([])
      setSelectedChat(null)
    }
  }, [connection])

  // ? efecto para almacenar la data de los mensajes del chat o grupo seleccionado
  useEffect(() => {
    if (connection === null) return
    connection.on(CLIENT_CHANNELS.messages, (data: IMessage[]) => {
      setMessages(data)
    })

    return () => {
      setMessages([])
    }
  }, [connection])

  return {
    chats,
    messages,
    selectedChat,
    notReadedMessages,
    handleSelectChat,
  }
}
