import moment from "moment"

interface Props {
  content: string
  date: string
  sendedByMe: boolean
  userName: string
}

export const Message = ({ content, date, sendedByMe, userName }: Props) => {
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
          className={`${
            sendedByMe ? "text-emerald-200" : "text-neutral-500"
          } text-sm`}
        >
          {userName}
        </h5>
      )}
      <p className="break-words text-lg">{content}</p>
      <small
        className={`
          text-end block text-xs font-light 
          ${sendedByMe ? "text-emerald-200" : "text-neutral-500"}
        `}
      >
        {moment(date).format("DD-MM-yyyy, HH:mm")}
      </small>
      <span
        className={`
        h-3 w-3 rounded bottom-1.5 absolute rotate-45 
        ${sendedByMe ? "-right-1 bg-emerald-600" : "-left-1 bg-neutral-50"}
      `}
      />
    </li>
  )
}
