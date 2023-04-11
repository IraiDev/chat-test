import React, {
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  useRef,
  useState,
} from "react"
import { BsSendFill } from "react-icons/bs"
import { SERVER_CHANNELS } from "../utils/constants"
import { useChatContext } from "../store/ChatStore"

interface Props {
  chatUid: string
}

export const MessageSender = ({ chatUid }: Props) => {
  const { connection, loggedUser } = useChatContext()
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const sendMessage = () => {
    if (textareaRef.current === null || connection === null || loggedUser === null) return
    if (message === "") return

    connection.emit(SERVER_CHANNELS.messages, {
      message,
      token: loggedUser.token,
      chatUid,
    })

    setMessage("")
    textareaRef.current.style.height = "auto"
  }

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const scrollHeight = e.target.scrollHeight
    e.target.style.height = `${scrollHeight}px`
    setMessage(value)

    if (value === "") {
      e.target.style.height = "auto"
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return
    e.preventDefault()
    sendMessage()
  }

  if (chatUid === "")
    return <footer className="h-[70px] bg-neutral-200 dark:bg-neutral-900/70" />

  return (
    <footer className="p-2">
      <form
        onSubmit={handleSubmit}
        className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-xl flex items-center gap-2 shadow-md
        border border-neutral-300 dark:border-neutral-600"
      >
        <textarea
          disabled={chatUid === ""}
          name="message"
          autoComplete="off"
          rows={1}
          ref={textareaRef}
          value={message}
          onKeyDown={handleKeyDown}
          onChange={handleChangeValue}
          className="py-1.5 px-3 rounded-lg outline-none bg-neutral-200/60 
          dark:bg-neutral-700 hover:ring-2 hover:ring-emerald-600 w-full
          transition duration-200 scroll-app h-auto resize-none disabled:hover:ring-transparent"
        ></textarea>
        <button
          disabled={message === ""}
          type="submit"
          className="min-w-[36px] h-9 grid place-content-center bg-emerald-600 
          hover:bg-emerald-500 text-white transition duration-200 outline-none
          rounded-full disabled:bg-neutral-300 disabled:hover:bg-neutral-300
          dark:bg-neutral-600 dark:disabled:bg-neutral-700 dark:disabled:hover:bg-neutral-700"
        >
          <BsSendFill />
        </button>
      </form>
    </footer>
  )
}
