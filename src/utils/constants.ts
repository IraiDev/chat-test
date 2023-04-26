export const DOC_ELEMENT = document.documentElement.classList
export const DARK_MODE = "dark"
export const LIGHT_MODE = "light"
export const CHAT_BUBBLE_ROOT = document.getElementById("chat-bubble-root")
export const CHAT_MODAL_ROOT = document.getElementById("chat-modal-root")
export const EXIST_MODAL_ROOT = CHAT_MODAL_ROOT !== null
export const EXIST_CHAT_ROOT = CHAT_BUBBLE_ROOT !== null

export const CLIENT_CHANNELS = {
  chats: "client:chatLists",
  messages: "client:messages",
  error: "client:error",
  "new-messages": "client:new-messages",
  disconnected: "client:disconnected",
}

export const SERVER_CHANNELS = {
  login: "server:logged-in",
  messages: "server:messages",
  "join-room": "server:join-room",
  "create-chat": "server:create-chat",
  "update-chat": "server:update-chat",
  "delete-chat": "server:delete-chat",
  "leave-room": "server:leave-room",
}
