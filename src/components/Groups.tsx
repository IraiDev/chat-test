import { HiUserGroup } from "react-icons/hi"
import { useClickOutside } from "../hooks/useClickOutside"
import { useChat } from "../hooks/useChat"
import { CreateGroup } from "./CreateGroup"
import { type Options } from "@/utils/types"
import { type LoggedUser } from "./ChatBubble"

interface Props {
  isOpen: boolean
  onClose: (value: boolean) => void
  systemUsers: Options
  loggedUser: LoggedUser | null
}

export const Groups = ({ isOpen, onClose, systemUsers, loggedUser }: Props) => {
  const { chats, handleSelectChat } = useChat({ loggedUser })
  const [containerRef] = useClickOutside({ handler: onClose })

  if (!isOpen) return null
  return (
    <div
      ref={containerRef}
      className="absolute top-0 h-full w-2/3 border-r pt-24 pb-4
      z-10 bg-neutral-50 dark:bg-neutral-700 border-neutral-300
      dark:border-neutral-600 shadow-md"
    >
      <header className="mb-2 px-2 flex items-center justify-between gap-2">
        <h3 className="font-semibold text-lg">Grupos</h3>
        <CreateGroup users={systemUsers} />
      </header>
      <section>
        <ul className="divide-y divide-neutral-300 dark:divide-neutral-600">
          {chats.map((chat) => (
            <GroupItem
              key={chat.id}
              groupName={chat.name}
              onClick={() => {
                handleSelectChat(chat)
              }}
            />
          ))}
        </ul>
      </section>
    </div>
  )
}

const GroupItem = ({
  groupName,
  onClick,
}: {
  groupName: string
  onClick: () => void
}) => {
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
    </li>
  )
}
