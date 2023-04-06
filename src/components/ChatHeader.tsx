import { BiMenu } from "react-icons/bi"
import { HiUserGroup } from "react-icons/hi"

interface Props {
  chatName: string
  showGroup: () => void
}

export const ChatHeader = ({ chatName, showGroup }: Props) => {
  return (
    <header
      className="px-2 py-6 bg-neutral-50 dark:bg-neutral-800 flex 
      items-center gap-2 border-b border-neutral-300 
      dark:border-neutral-600 shadow z-20"
    >
      <button
        onClick={showGroup}
        className="h-8 w-8 grid place-content-center text-xl rounded-full 
        bg-transparent trnasition duration-200
        hover:bg-neutral-200 dark:hover:bg-neutral-700 outline-none"
      >
        <BiMenu />
      </button>
      <picture
        className="rounded-full h-8 w-8 grid place-content-center bg-neutral-300"
      >
        <HiUserGroup className="text-xl text-neutral-600" />
      </picture>
      <h1 className="font-bold text-xl first-letter:uppercase max-w-[180px] truncate">
        {chatName}
      </h1>
    </header>
  )
}
