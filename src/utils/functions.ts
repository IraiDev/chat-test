import { Options } from "./types"
import { IUser } from "../models/user.model"

interface UserAdapter {
  array: IUser[]
  loggedUserId: string | number
}

export function usersOptionsAdapter({ array = [], loggedUserId }: UserAdapter): Options {
  const userId = typeof loggedUserId === "number" ? loggedUserId.toString() : loggedUserId
  return array
    .filter((el) => el.id.toString() !== userId)
    .map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }))
}

interface Notification {
  title: string
  body: string
  tag: string
}

export function generarNotificacion({ body, title, tag }: Notification) {
  if ("Notification" in window) {
    Notification.requestPermission()
      .then(function (result) {
        if (result === "granted") {
          const noti = new Notification(title, {
            body,
            icon: "https://todo-v2.zproduccion.cl/favicon.svg",
            badge: "https://todo-v2.zproduccion.cl/favicon.svg",
            vibrate: [-1, 1000],
            tag,
          })
          noti.close()
        }
      })
      .catch(console.log)
  }
}
