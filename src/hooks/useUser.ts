import { useUserStore } from "../store/UserStore"

export const useUser = () => {
  const { setUser, clearUser, user } = useUserStore()

  return {
    setUser,
    clearUser,
    user
  }
}