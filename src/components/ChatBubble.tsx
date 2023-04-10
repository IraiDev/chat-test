import { useEffect, useState } from "react"
import io from "socket.io-client"
import { Popover } from "./Popover"
import { AiOutlineMessage } from "react-icons/ai"
import { ChatHeader } from "./ChatHeader"
import { MessageWrapper } from "./MessageWrapper"
import { MessageSender } from "./MessageSender"
import { Groups } from "./Groups"
import { useChat } from "../hooks/useChat"
import { SERVER_CHANNELS } from "@/utils/constants"
import { useSocketStore } from "@/store/SocketStore"
import { type Options } from "@/utils/types"

export interface LoggedUser {
  token: string
  id: number
}

interface Props {
  systemUsers: Options
  socketUrl: string
  loggedUser: LoggedUser | null
}

export const ChatBubble = ({
  systemUsers = [],
  socketUrl = "",
  loggedUser,
}: Props) => {
  const { saveConnection, clearConnection } = useSocketStore()
  const { selectedChat, messages } = useChat({ loggedUser })
  const [isOpen, setIsOpen] = useState(false)
  const [isGroupOpen, setIsGroupOpen] = useState(false)

  if (socketUrl === "") {
    throw new Error("you must send a socketUrl prop")
  }

  if (systemUsers.length === 0) {
    throw new Error("you must send a list of users in props")
  }

  useEffect(() => {
    if (loggedUser === null) return
    const socketConnection = io(socketUrl)
    socketConnection.emit(SERVER_CHANNELS.login, loggedUser.token)
    saveConnection(socketConnection)
    return () => {
      socketConnection.disconnect()
      clearConnection()
    }
  }, [loggedUser])

  return (
    <Popover
      open={isOpen}
      onClose={setIsOpen}
      btnComponent={
        <ChatButton
          onClick={() => {
            setIsOpen((prevValue) => !prevValue)
          }}
        />
      }
    >
      <ChatHeader
        chatName={selectedChat?.name ?? ""}
        showGroup={() => {
          setIsGroupOpen((prevValue) => !prevValue)
        }}
      />
      <Groups
        isOpen={isGroupOpen}
        onClose={setIsGroupOpen}
        systemUsers={systemUsers}
        loggedUser={loggedUser}
      />
      <MessageWrapper
        loggedUserId={loggedUser?.id ?? 0}
        messages={messages}
        systemUsers={systemUsers}
      />
      <MessageSender loggedUser={loggedUser} />
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
