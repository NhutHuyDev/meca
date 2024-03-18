import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

export class ParticipantUnread {
  @prop({ ref: () => User })
  participantId: Ref<User>

  @prop({ default: 0 })
  unread: number
}

export class ChatGroup {
  @prop({ ref: () => User, default: [], _id: false })
  participants: Ref<User>[]

  @prop({ ref: () => User })
  creator: Ref<User>

  @prop({ type: () => [ParticipantUnread] })
  participantUnreads: ParticipantUnread[]
}

const ChatGroupModel = getModelForClass(ChatGroup, {
  schemaOptions: {
    collection: 'ChatGroups',
    timestamps: true
  }
})

export default ChatGroupModel
