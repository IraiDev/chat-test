import React from "react"
import { ChatBubble } from "./components/ChatBubble"
import { useChatConnection } from "./hooks"
import { IUser } from "./models/user.model"
import { useDarkMode } from "./hooks/useDarkMode"

function formatUsers(array: any[]): IUser[] {
  return array.map((item) => ({
    id: Number(item.value),
    name: item.label,
    token: item.token,
    cantCreateGroup: item.crea_grupo_chat,
  }))
}

const users = [
  {
    value: "54",
    label: "fmarin",
    nombre_completo: "FELIX MARIN",
    crea_grupo_chat: false,
  },
  {
    value: "290",
    label: "iarriagada",
    nombre_completo: "IGNACIO ARRIAGADA",
    crea_grupo_chat: true,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRlcnByaXNlSWQiOiIxIiwidXNlcklkIjoiMjkwIiwidXNlck5hbWUiOiJpYXJyaWFnYWRhIiwiY2FuQ3JlYXRlR3JvdXBzIjp0cnVlLCJpYXQiOjE2ODMyMTYwMzB9.UzQ3ZgwusSoWeTdYSVLPH-0Zufy7UeSie72A0SNSyrY",
  },
  {
    value: "62",
    label: "lvergara",
    nombre_completo: "LUIS VERGARA",
    crea_grupo_chat: true,
  },
  {
    value: "56",
    label: "RDELCANTO",
    nombre_completo: "RODRIGO DEL CANTO",
    crea_grupo_chat: false,
  },
  {
    value: "213",
    label: "sacuna",
    nombre_completo: "SEBASTIAN ACUÑA",
    crea_grupo_chat: true,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRlcnByaXNlSWQiOiIxIiwidXNlcklkIjoiMjEzIiwidXNlck5hbWUiOiJzYWN1bmEiLCJjYW5DcmVhdGVHcm91cHMiOmZhbHNlLCJpYXQiOjE2ODMyMTYwOTV9.KpE7N7xYfFC18WSLxN5cQ6MCCj2EmzwPU26jGRay9NA",
  },
  {
    value: "221",
    label: "TBONGARDT",
    nombre_completo: "TOMAS BONGARDT",
    crea_grupo_chat: false,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRCT05HQVJEVCIsInVzZXJJZCI6IjIyMSIsImVudGVycHJpc2VJZCI6IjEiLCJjYW5DcmVhdGVHcm91cHMiOnRydWUsImlhdCI6MTY4MTg0NDAzOX0.acN-X6wzSkJdP56NKOSloLrDGDU0DEX7xLJlAZi9LY0",
  },
]

// export const USERS: IUser[] = [
//   {
//     id: 290,
//     name: "Ignacio A.",
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImlhcnJpYWdhZGEiLCJ1c2VySWQiOiIyOTAiLCJlbnRlcnByaXNlSWQiOiIxIiwiaWF0IjoxNjgwNTM3NzUwfQ.oryFS6JMdh2FE8iMKzFUyb5DleYofp67Fzqo24dOn-o",
//     cantCreateGroup: true,
//   },
//   {
//     id: 213,
//     name: "Sebastian A.",
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNhY3VuYSIsInVzZXJJZCI6IjIxMyIsImVudGVycHJpc2VJZCI6IjEiLCJpYXQiOjE2ODA4MDMyNDJ9.ptViEPL9zOh16fUPkoOU68-T0b5CK07LiAg8mKkDyaM",
//     cantCreateGroup: false,
//   },
// ]

export const USERS: IUser[] = formatUsers(users)

const App = () => {
  const { handleToggleDarkMode, isDarkModeActive } = useDarkMode()
  const { signIn, loggedUser, signOut } = useChatConnection({
    url: "https://chat.zpruebas.cl",
    users: USERS,
  })

  return (
    <main className="grid w-full min-h-screen place-content-center bg-neutral-200 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-50">
      <div className="p-4 rounded-lg shadow-lg bg-neutral-50 dark:bg-neutral-800">
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
        {loggedUser !== null && (
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 mt-5"
            onClick={signOut}
          >
            Cerrar session
          </button>
        )}
      </div>

      <ChatBubble defaultChatName="BCN Chat" />

      <button
        onClick={handleToggleDarkMode}
        className="fixed bottom-5 right-5 dark:bg-neutral-50 dark:hover:bg-neutral-200 font-semibold
        dark:text-neutral-800 text-neutral-50 bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5"
      >
        {isDarkModeActive ? "Light mode" : "Dark mode"}
      </button>
    </main>
  )
}

export default App
