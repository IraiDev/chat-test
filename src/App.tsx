import { useEffect } from "react"
import io from "socket.io-client"
import { ChatBubble } from "./components/ChatBubble"
import { useSocketStore } from "./store/SocketStore"
import { USERS } from "./store/UserStore"
import { SERVER_CHANNELS } from "./utils/constants"
import { useUser } from "./hooks/useUser"

const App = () => {
  const { saveConnection, clearConnection } = useSocketStore()
  const { user, setUser } = useUser()

  useEffect(() => {
    if (user === null) return
    const socketConnection = io("https://chat.zpruebas.cl")
    socketConnection.emit(SERVER_CHANNELS.login, user.token)
    saveConnection(socketConnection)
    return () => {
      socketConnection.disconnect()
      clearConnection()
    }
  }, [user])

  return (
    <main
      className="min-h-screen w-full grid place-content-center bg-neutral-200 
      dark:bg-neutral-900 text-neutral-800 dark:text-neutral-50"
    >
      <div className="bg-neutral-50 p-4 rounded-lg shadow-lg">
        <ul className="space-y-2">
          {USERS.map((us) => (
            <li
              className={`
                  px-2 py-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700
                  cursor-pointer transition-colors duration-200
                  ${user?.id === us.id ? "text-blue-600 font-bold" : ""}
                `}
              key={us.id}
              onClick={() => {
                setUser(us)
              }}
            >
              {us.name}
            </li>
          ))}
        </ul>
      </div>

      {user !== null && <ChatBubble />}
    </main>
  )
}

export default App
