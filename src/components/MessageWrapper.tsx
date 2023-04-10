import { Message } from "./Message"
import { type IMessage } from "../hooks/useChat"
import { type Options } from "@/utils/types"

interface Props {
  messages: IMessage[]
  loggedUserId: number
  systemUsers: Options
}

export const MessageWrapper = ({
  messages = [],
  loggedUserId,
  systemUsers = [],
}: Props) => {
  return (
    <section className="w-80 sm:w-96 p-2 px-4 bg-neutral-200/70 h-[400px] scroll-app">
      <ul className="flex flex-col gap-2.5 w-full">
        {messages.map(({ id, message, dateTimeSent, userId }) => (
          <Message
            key={id}
            sendedByMe={userId === loggedUserId}
            content={message}
            date={dateTimeSent}
            userName={
              systemUsers.find((user) => user.value === userId.toString())
                ?.label ?? "Usuario desconcido"
            }
          />
        ))}
      </ul>
    </section>
  )
}
