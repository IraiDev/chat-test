import React from "react"
import { createPortal } from "react-dom"
import { Popover } from "./Popover"
import { AiOutlineMessage } from "react-icons/ai"
import { ChatHeader } from "./ChatHeader"
import { MessageWrapper } from "./MessageWrapper"
import { MessageSender } from "./MessageSender"
import { Groups } from "./Groups"
import { useChat } from "../hooks/useChat"
import { NotReadedMessagesProps } from "../models/chat.model"
import { CHAT_BUBBLE_ROOT, EXIST_CHAT_ROOT, EXIST_MODAL_ROOT } from "../utils/constants"

interface BtnProps {
  notReadedMessages: NotReadedMessagesProps
  onClick: () => void
}

interface Props {
  hidden?: boolean
  defaultChatName?: string
}

export const ChatBubble = ({ defaultChatName = "Chat", hidden = false }: Props) => {
  const {
    selectedChat,
    messages,
    chats,
    notReadedMessages,
    isChatOpen,
    isGroupOpen,
    showChatBubble,
    handleToggleChat,
    handleOpenGroup,
    handleSelectChat,
    setIsGroupOpen,
  } = useChat({ hidden })

  if (!EXIST_CHAT_ROOT) {
    console.warn(
      'Es obligatorio crear una entrada para el portal de renderizado del chat con el nombre "chat-bubble-root"'
    )
    return null
  }

  if (!EXIST_MODAL_ROOT) {
    console.warn(
      'Es obligatorio crear una entrada para el portal de renderizado del modal con el nombre "chat-modal-root"'
    )
    return null
  }

  if (!showChatBubble || hidden) return null

  return createPortal(
    <Popover
      isOpen={isChatOpen}
      btnComponent={
        <ChatButton notReadedMessages={notReadedMessages} onClick={handleToggleChat} />
      }
    >
      <ChatHeader
        isGroupOpen={isGroupOpen}
        defaulChatName={defaultChatName}
        chat={selectedChat}
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
    </Popover>,
    CHAT_BUBBLE_ROOT!
  )
}

const ChatButton = ({ onClick, notReadedMessages }: BtnProps) => {
  return (
    <button
      onClick={onClick}
      className="relative grid text-white transition-colors duration-200 rounded-full h-11 w-11 place-content-center bg-emerald-500 hover:bg-emerald-600"
    >
      <AiOutlineMessage className="text-2xl" />
      {notReadedMessages.total > 0 && (
        <span className="absolute grid w-5 h-5 text-xs bg-red-500 rounded-full -top-1 -right-1 place-content-center animate-bounce">
          {notReadedMessages.normalized}
        </span>
      )}
    </button>
  )
}
