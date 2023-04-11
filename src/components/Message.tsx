import React from "react"
import moment from "moment"
import { useChatContext } from "../store/ChatStore"

interface Props {
  content: string
  date: string
  user: number
  sendedByMe: boolean
}

export const Message = ({ content, date, user, sendedByMe }: Props) => {
  const { usersList } = useChatContext()
  return (
    <li
      className={`
      rounded-lg p-2 px-3 max-w-[90%] w-max relative
      ${
        sendedByMe
          ? "bg-emerald-600 self-end text-white shadow-lg"
          : "bg-neutral-50 dark:bg-neutral-700 shadow-md"
      }
    `}
    >
      {!sendedByMe && (
        <h5
          className={`
          text-sm
          ${sendedByMe ? "text-emerald-200" : "text-neutral-500 dark:text-neutral-400"} 
          `}
        >
          {usersList.find((us) => us.id === user)?.name ?? "usuario desconocido"}
        </h5>
      )}
      <p className="break-words text-lg">{content}</p>
      <small
        className={`
          text-end block text-xs font-light 
          ${sendedByMe ? "text-emerald-200" : "text-neutral-500 dark:text-neutral-400"}
        `}
      >
        {moment(date).format("DD-MM-yyyy, HH:mm")}
      </small>
      <span
        className={`
        h-3 w-3 rounded bottom-1.5 absolute rotate-45 
        ${
          sendedByMe
            ? "-right-1 bg-emerald-600"
            : "-left-1 bg-neutral-50 dark:bg-neutral-700"
        }
      `}
      />
    </li>
  )
}
