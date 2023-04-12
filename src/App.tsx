import React, { useLayoutEffect, useState } from "react"
import { ChatBubble } from "./components/ChatBubble"
import { useChatConnection } from "./hooks"
import { type IUser } from "./models/user.model"

const DOC_ELEMENT = document.documentElement.classList
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

function useDarkMode() {
  const [isDarkModeActive, setIsDarkModeActive] = useState(DOC_ELEMENT.contains("dark"))

  const handleToggleDarkMode = () => {
    setIsDarkModeActive(!isDarkModeActive)
  }

  useLayoutEffect(() => {
    isDarkModeActive ? DOC_ELEMENT.add("dark") : DOC_ELEMENT.remove("dark")
  }, [isDarkModeActive])

  return {
    isDarkModeActive,
    handleToggleDarkMode,
  }
}

const App = () => {
  const { handleToggleDarkMode, isDarkModeActive } = useDarkMode()
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

      <ChatBubble hidden={false} defaultChatName="BCN Chat" />

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
