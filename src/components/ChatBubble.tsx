import React, { useEffect, useMemo, useState } from "react"
import { Popover } from "./Popover"
import { AiOutlineMessage } from "react-icons/ai"
import { ChatHeader } from "./ChatHeader"
import { MessageWrapper } from "./MessageWrapper"
import { MessageSender } from "./MessageSender"
import { Groups } from "./Groups"
import { useChat } from "../hooks/useChat"
import { useChatContext } from "../store/ChatStore"
import { CLIENT_CHANNELS } from "../utils/constants"
import { type NotReadedMessagesProps } from "../models/chat.model"

interface BtnProps {
  notReadedMessages: NotReadedMessagesProps
  onClick: () => void
}

interface Props {
  hidden: boolean
  defaultChatName?: string
}

export const ChatBubble = ({ defaultChatName = "Chat", hidden }: Props) => {
  const { loggedUser, usersList } = useChatContext()
  const { connection } = useChatContext()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isGroupOpen, setIsGroupOpen] = useState(false)
  const { selectedChat, messages, chats, notReadedMessages, handleSelectChat } = useChat()

  const showChatBubble = useMemo(() => {
    return loggedUser !== null && usersList.length > 0 && connection !== null
  }, [loggedUser, usersList, connection])

  const handleOpenChat = () => {
    setIsChatOpen((prevValue) => !prevValue)
  }
  const handleOpenGroup = () => {
    setIsGroupOpen((prevValue) => !prevValue)
  }

  useEffect(() => {
    if (connection === null) return
    connection.on(CLIENT_CHANNELS.error, (data) => {
      console.log(data)
    })
  }, [connection])

  if (!showChatBubble || hidden) return null

  return (
    <Popover
      isOpen={isChatOpen}
      btnComponent={
        <ChatButton notReadedMessages={notReadedMessages} onClick={handleOpenChat} />
      }
    >
      <ChatHeader
        chatName={selectedChat?.name ?? defaultChatName}
        showGroup={handleOpenGroup}
      />
      <Groups
        isOpen={isGroupOpen}
        chats={chats}
        onClose={setIsGroupOpen}
        onSelectChat={handleSelectChat}
      />
      <MessageWrapper messages={messages} />
      <MessageSender chatUid={selectedChat?.uid ?? ""} />
    </Popover>
  )
}

const ChatButton = ({ onClick, notReadedMessages }: BtnProps) => {
  return (
    <button
      onClick={onClick}
      className="h-11 w-11 grid place-content-center rounded-full bg-emerald-500 
      hover:bg-emerald-600 text-white transition-colors duration-200 relative"
    >
      <AiOutlineMessage className="text-2xl" />
      {notReadedMessages.total > 0 && (
        <span
          className="absolute -top-1 -right-1 bg-red-500 rounded-full h-5 w-5 grid 
          place-content-center text-xs animate-bounce"
        >
          {notReadedMessages.normalized}
        </span>
      )}
    </button>
  )
}
