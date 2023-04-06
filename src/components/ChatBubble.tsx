import { useState } from "react"
import { Popover } from "./Popover"
import { AiOutlineMessage } from "react-icons/ai"
import { ChatHeader } from "./ChatHeader"
import { MessageWrapper } from "./MessageWrapper"
import { MessageSender } from "./MessageSender"
import { Groups } from "./Groups"
import { useChat } from "../hooks/useChat"

export const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isGroupOpen, setIsGroupOpen] = useState(false)
  const { selectedChat, messages } = useChat()

  return (
    <Popover
      open={isOpen}
      onClose={setIsOpen}
      btnComponent={
        <ChatButton onClick={() => { setIsOpen(prevValue => !prevValue) }} />
      }
    >
      <ChatHeader
        chatName={selectedChat?.name ?? ''}
        showGroup={() => { setIsGroupOpen(prevValue => !prevValue) }}
      />
      <Groups isOpen={isGroupOpen} onClose={setIsGroupOpen} />
      <MessageWrapper messages={messages} />
      <MessageSender />
    </Popover>
  )
}

const ChatButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="h-11 w-11 grid place-content-center rounded-full bg-emerald-500 
      hover:bg-emerald-600 text-white transition-colors duration-200"
    >
      <AiOutlineMessage className="text-2xl" />
    </button>
  )
}

