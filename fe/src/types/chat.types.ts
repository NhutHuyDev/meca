import { OneToOneMessage } from './message.types'
import { ContactUser } from './user.types'

export type ChatOneToOne = {
  _id: string
  from: ContactUser
  isFriend: boolean
  unread: number
  lastMessage: OneToOneMessage
  pinned?: boolean
}
