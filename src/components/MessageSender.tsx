import { type ChangeEvent, type FormEvent, useRef } from 'react'
import { BsSendFill } from "react-icons/bs"
import { useSocketStore } from '../store/SocketStore'
import { SERVER_CHANNELS } from '../utils/constants'
import { useUser } from '../hooks/useUser'
import { useChat } from '../hooks/useChat'

export const MessageSender = () => {
  const { connection } = useSocketStore()
  const { user } = useUser()
  const { selectedChat } = useChat()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (inputRef.current === null) return

    const value = e.target.value
    const scrollHeight = e.target.scrollHeight
    e.target.style.height = `${scrollHeight}px`

    inputRef.current.value = value

    if (value === '') {
      e.target.style.height = 'auto'
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (inputRef.current === null || connection === null || user === null) return

    const message = inputRef.current.value

    connection.emit(SERVER_CHANNELS.messages, { message, token: user.token, chatUid: selectedChat?.uid })
    inputRef.current.value = ''
    inputRef.current.style.height = 'auto'
  }

  return (
    <footer className="p-2">
      <form
        onSubmit={handleSubmit}
        className='p-2 bg-white rounded-xl flex items-center gap-2 shadow-md
        border border-neutral-300 dark:border-neutral-600'
      >
        <textarea
          className="py-1.5 px-3 rounded-lg outline-none bg-neutral-200/60 
          dark:bg-neutral-700 hover:ring-2 hover:ring-emerald-600 w-full
          transition duration-200 scroll-app h-auto resize-none"
          name="message"
          autoComplete="off"
          rows={1}
          ref={inputRef}
          onChange={handleChangeValue}
        ></textarea>
        <button
          type='submit'
          className='min-w-[36px] h-9 grid place-content-center bg-emerald-600 
          hover:bg-emerald-500 text-white transition duration-200 outline-none
          rounded-full'
        >
          <BsSendFill />
        </button>
      </form>
    </footer>
  )
}
