import { ChatBubble } from "./components/ChatBubble"
import { type User } from "./store/UserStore"
import { useUser } from "./hooks/useUser"
import { type Options } from "./utils/types"

export const USERS: User[] = [
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
  // { id: 3, name: 'Rodrigo del C.', token: 'rdelcanto' },
  // { id: 2, name: 'Felix M.', token: 'fmarin' },
  // { id: 4, name: 'Luis V.', token: 'lvergara' }
]
function formatUser(array: User[], loggedUserId: number): Options {
  return array
    .filter((el) => el.id !== loggedUserId)
    .map((user) => ({
      label: user.name,
      value: user.id.toString(),
    }))
}

const App = () => {
  const { user, setUser } = useUser()

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

      {user !== null && (
        <ChatBubble
          loggedUser={user}
          socketUrl="https://chat.zpruebas.cl"
          systemUsers={formatUser(USERS, user.id)}
        />
      )}
    </main>
  )
}

export default App
