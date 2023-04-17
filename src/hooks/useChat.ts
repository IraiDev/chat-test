import { useEffect, useMemo, useState } from "react"
import { CLIENT_CHANNELS, SERVER_CHANNELS } from "../utils/constants"
import { useChatContext } from "../store/ChatStore"
import {
  NotReadedMessagesProps,
  IChat,
  IMessage,
  NotReadedMessages,
  ChatDisconnected,
} from "../models/chat.model"
import { SocketError } from "../utils/types"

interface Props {
  hidden?: boolean
}

export function useChat({ hidden }: Props) {
  const { connection, loggedUser, usersList, isConnected, setIsConnected } =
    useChatContext()
  const [chats, setChats] = useState<IChat[]>([])
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isGroupOpen, setIsGroupOpen] = useState(true)

  const showChatBubble = useMemo(() => {
    return loggedUser !== null && usersList.length > 0 && connection !== null && !hidden
  }, [loggedUser, usersList, connection])

  const notReadedMessages: NotReadedMessagesProps = useMemo(() => {
    const notReaded = chats.reduce((acc, cur) => acc + cur.notReadedMessages, 0)
    return {
      total: notReaded,
      normalized: notReaded > 99 ? "+99" : notReaded.toString(),
    }
  }, [chats])

  const handleToggleChat = () => {
    if (connection === null) return
    setIsChatOpen((prevValue) => {
      if (prevValue && selectedChat !== null) {
        connection.emit(
          SERVER_CHANNELS["leave-room"],
          { uidChat: selectedChat?.uid, token: loggedUser?.token },
          (error: SocketError) => {
            console.log(error)
          }
        )
      }
      return !prevValue
    })
  }
  const handleOpenGroup = () => {
    setIsGroupOpen((prevValue) => !prevValue)
  }

  // ? funcion que captura el chat seleccionado
  const handleSelectChat = (chat: IChat) => {
    if (connection === null || loggedUser === null) return
    setSelectedChat(chat)
    setChats((prevState) =>
      prevState.map((item) => ({
        ...item,
        notReadedMessages: chat.uid === item.uid ? 0 : item.notReadedMessages,
      }))
    )
    connection.emit(
      SERVER_CHANNELS["join-room"],
      {
        uidChat: chat.uid,
        token: loggedUser.token,
      },
      ({ ok, message }: SocketError) => {
        console.log({ ok, message })
      }
    )
  }

  // ? efecto para almacenar la data de los chats/grupos
  useEffect(() => {
    if (!showChatBubble) return

    connection?.on(CLIENT_CHANNELS.chats, (data: IChat[]) => {
      setSelectedChat((prevState) => data.find((el) => el.uid === prevState?.uid) ?? null)
      setChats(data)
    })
    return () => {
      setChats([])
      setSelectedChat(null)
    }
  }, [connection])

  // ? efecto para almacenar la data de los mensajes del chat o grupo seleccionado
  useEffect(() => {
    if (!showChatBubble) return
    if (selectedChat === null) {
      setMessages([])
      return
    }
    connection?.on(CLIENT_CHANNELS.messages, (data: IMessage[]) => {
      setMessages(data)
    })

    return () => {
      setMessages([])
    }
  }, [connection, selectedChat])

  // ? efecto para cheackar nuevos mensajes sin leer
  useEffect(() => {
    if (!showChatBubble) return
    connection?.on(
      CLIENT_CHANNELS["new-messages"],
      ({ notReadedMessages }: { notReadedMessages: NotReadedMessages }) => {
        const { quantity, uid } = notReadedMessages
        setChats((prevChats) =>
          prevChats.map(({ notReadedMessages, ...item }) => ({
            ...item,
            notReadedMessages: uid === item.uid ? quantity : notReadedMessages,
          }))
        )
      }
    )
  }, [connection])

  useEffect(() => {
    if (connection === null) return
    connection.on(
      CLIENT_CHANNELS.disconnected,
      ({ connected, message }: ChatDisconnected) => {
        setIsConnected(connected)
        console.log({ connected, message })
      }
    )
  }, [connection])

  return {
    chats,
    messages,
    selectedChat,
    isConnected,
    notReadedMessages,
    isChatOpen,
    isGroupOpen,
    showChatBubble,
    handleSelectChat,
    handleToggleChat,
    handleOpenGroup,
    setIsGroupOpen,
  }
}
