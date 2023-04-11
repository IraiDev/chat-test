export interface IChat {
  id: number
  uid: string
  enterpriseId: number
  creatorUserId: number
  name: string
  description: string
  is_group: boolean
  lastConnection: string
  notReadedMessages: number
}

export interface IMessage {
  id: number
  uid: string
  chatId: number
  userId: number
  message: string
  dateTimeSent: string
}

export interface NotReadedMessages {
  total: number
  normalized: string
}
