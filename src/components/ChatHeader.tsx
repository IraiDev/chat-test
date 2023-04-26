import React from "react"
import { RiMenuFoldLine } from "react-icons/ri"
import { ChatAvatar } from "./ChatAvatar"
import { TbPlugConnected } from "react-icons/tb"
import { useChatContext } from "../store/ChatStore"
import { SERVER_CHANNELS } from "../utils/constants"
import { SocketError } from "../utils/types"
import { IChat } from "../models/chat.model"
import { ChatMembers } from "./ChatMembers"

interface Props {
  chat: IChat | null
  defaulChatName: string
  isGroupOpen: boolean
  showGroup: () => void
}

export const ChatHeader = ({ chat, showGroup, isGroupOpen, defaulChatName }: Props) => {
  return (
    <header className="z-50 flex items-center gap-2 px-2 py-2 shadow-md sm:py-6 bg-neutral-50 dark:bg-neutral-800">
      <TogglerBtn isGroupOpen={isGroupOpen} showGroup={showGroup} />
      <ChatAvatar />
      <div className="flex flex-col max-w-[220px] sm:max-w-[280px]">
        <h1 className="w-full text-xl font-bold truncate first-letter:uppercase">
          {chat?.name ?? defaulChatName}
        </h1>
        <ChatMembers members={chat?.users ?? []} creatorId={chat?.creatorUserId ?? 0} />
      </div>
      <ConnectionBtn />
    </header>
  )
}

const TogglerBtn = ({
  isGroupOpen: idGroupOpen,
  showGroup,
}: Pick<Props, "isGroupOpen" | "showGroup">) => {
  const { isConnected } = useChatContext()
  return (
    <button
      disabled={!isConnected}
      onClick={showGroup}
      className="flex items-center justify-center w-8 h-8 text-xl duration-200 bg-transparent rounded-full outline-none trnasition hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
    >
      <RiMenuFoldLine
        className={`
          transition-transform duration-200
          ${idGroupOpen ? "" : "rotate-180"} 
          `}
      />
    </button>
  )
}

const ConnectionBtn = () => {
  const { isConnected, connection, loggedUser, setIsConnected } = useChatContext()

  const handleSignIn = () => {
    if (connection == null || loggedUser === null) return
    connection.emit(
      SERVER_CHANNELS.login,
      loggedUser.token,
      ({ ok, message }: SocketError) => {
        console.log({ ok, message })
        setIsConnected(ok)
      }
    )
  }

  if (isConnected) return null
  return (
    <button
      onClick={handleSignIn}
      className="bg-green-500 hover:bg-green-600 text-neutral-50 rounded-full py-0.5 px-2 text-sm transition-colors duration-200 flex items-center gap-2"
    >
      conectarse
      <TbPlugConnected />
    </button>
  )
}
