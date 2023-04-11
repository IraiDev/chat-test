import React from "react"
import { ChatBubble } from "./components/ChatBubble"
import { type IUser } from "./models/user.model"
import { useChatConnection } from "./hooks"

export const USERS: IUser[] = [
  {
    id: 290,
    name: "Ignacio A.",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImlhcnJpYWdhZGEiLCJ1c2VySWQiOiIyOTAiLCJlbnRlcnByaXNlSWQiOiIxIiwiaWF0IjoxNjgwNTM3NzUwfQ.oryFS6JMdh2FE8iMKzFUyb5DleYofp67Fzqo24dOn-o",
  },
  {
    id: 213,
    name: "Sebastian A.",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNhY3VuYSIsInVzZXJJZCI6IjIxMyIsImVudGVycHJpc2VJZCI6IjEiLCJpYXQiOjE2ODA4MDMyNDJ9.ptViEPL9zOh16fUPkoOU68-T0b5CK07LiAg8mKkDyaM",
  },
]

const App = () => {
  const { signIn, signOut, loggedUser } = useChatConnection({
    url: "https://chat.zpruebas.cl",
    users: USERS,
  })

  return (
    <main
      className="min-h-screen w-full grid place-content-center bg-neutral-200 
      dark:bg-neutral-900 text-neutral-800 dark:text-neutral-50"
    >
      <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg shadow-lg">
        <button onClick={signOut}>Cerrar session</button>
        <ul className="space-y-2">
          {USERS.map((user) => (
            <li
              className={`
                px-2 py-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700
                cursor-pointer transition-colors duration-200
                ${loggedUser?.id === user.id ? "text-blue-600 font-bold" : ""}
              `}
              key={user.id}
              onClick={() => {
                signIn(user)
              }}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      <ChatBubble hidden={false} defaultChatName="BCN Chat" />
    </main>
  )
}

export default App
