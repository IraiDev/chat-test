import React, { useMemo } from "react"
import { HiUserGroup } from "react-icons/hi"
import { CreateGroup } from "./CreateGroup"
import { type IChat } from "../models/chat.model"

interface ItemProps {
  groupName: string
  onClick: () => void
  notReadedMessages: number
}

interface Props {
  chats: IChat[]
  isOpen: boolean
  onSelectChat: (chat: IChat) => void
  onClose: (value: boolean) => void
}

export const Groups = ({ isOpen, chats, onSelectChat, onClose }: Props) => {
  const handleClick = (chat: IChat) => {
    onSelectChat(chat)
    onClose(false)
  }

  if (!isOpen) return null
  return (
    <div
      className="absolute top-0 h-full w-2/3 border-r pt-24 pb-4
      z-10 bg-neutral-50 dark:bg-neutral-800 border-neutral-300
      dark:border-neutral-600 shadow-md"
    >
      <header className="mb-2 px-2 flex items-center justify-between gap-2">
        <h3 className="font-semibold text-lg">Grupos</h3>
        <CreateGroup />
      </header>
      <section>
        <ul
          className="divide-y divide-neutral-300 dark:divide-neutral-600 
          max-h-[calc(100%-(6rem+28px))] scroll-app"
        >
          {chats.map((chat) => (
            <GroupItem
              key={chat.id}
              groupName={chat.name}
              notReadedMessages={chat.notReadedMessages}
              onClick={() => {
                handleClick(chat)
              }}
            />
          ))}
        </ul>
      </section>
    </div>
  )
}

const GroupItem = ({ groupName, onClick, notReadedMessages }: ItemProps) => {
  const notReadedMessagesNormalized = useMemo(() => {
    return notReadedMessages > 99 ? "+99" : notReadedMessages
  }, [notReadedMessages])

  return (
    <li
      onClick={onClick}
      className="flex items-center gap-2 w-full p-2 hover:bg-neutral-200
      dark:hover:bg-neutral-700 transition-colors duration-200 cursor-pointer"
    >
      <picture className="rounded-full h-8 min-w-[32px] grid place-content-center bg-neutral-300">
        <HiUserGroup className="text-xl text-neutral-600" />
      </picture>
      <span className="block max-w-[85%] truncate">{groupName}</span>
      {notReadedMessages > 0 && (
        <span
          className="bg-red-500 rounded-full h-[18px] min-w-[18px] text-white grid 
          place-content-center text-xs"
        >
          {notReadedMessagesNormalized}
        </span>
      )}
    </li>
  )
}
