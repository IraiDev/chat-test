import { useEffect, useMemo, useState } from "react"
import { CLIENT_CHANNELS, SERVER_CHANNELS } from "../utils/constants"
import { useChatContext } from "../store/ChatStore"
import {
  type NotReadedMessagesProps,
  type IChat,
  type IMessage,
  type NotReadedMessages,
} from "../models/chat.model"

export function useChat() {
  const { connection, loggedUser } = useChatContext()
  const [chats, setChats] = useState<IChat[]>([])
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null)
  const [messages, setMessages] = useState<IMessage[]>([])

  const notReadedMessages: NotReadedMessagesProps = useMemo(() => {
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
    let notReaded: NotReadedMessages | null = null

    connection.on(CLIENT_CHANNELS["new-messages"], (data: NotReadedMessages) => {
      notReaded = data
    })

    connection.on(CLIENT_CHANNELS.chats, (data: IChat[]) => {
      setChats(
        data.map((item) => ({
          ...item,
          notReadedMessages:
            item.uid === notReaded?.uid ? notReaded?.quantity : item.notReadedMessages,
        }))
      )
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
