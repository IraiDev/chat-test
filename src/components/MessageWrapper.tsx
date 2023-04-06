import { Message } from "./Message"
import { type IMessage } from "../hooks/useChat"
import { useUser } from "../hooks/useUser"

interface Props {
  messages: IMessage[]
}

export const MessageWrapper = ({ messages = [] }: Props) => {
  const { user } = useUser()
  return (
    <section className="w-80 sm:w-96 p-2 px-4 bg-neutral-200/70 h-[400px] scroll-app">
      <ul className="flex flex-col gap-2.5 w-full">
        {
          messages.map(({ id, message, dateTimeSent, userId }) => (
            <Message
              key={id}
              sendedByMe={userId === user?.id}
              user={userId}
              content={message}
              date={dateTimeSent}
            />
          ))
        }
      </ul>
    </section>
  )
}
