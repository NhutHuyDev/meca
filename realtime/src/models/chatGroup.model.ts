import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

class Participant {
  @prop({ ref: () => User })
  userId: Ref<User>
}

export class ChatGroup {
  @prop({ type: () => [Participant], default: [] })
  participants: Participant[]
}

const ChatGroupModel = getModelForClass(ChatGroup, {
  schemaOptions: {
    collection: 'ChatGroups',
    timestamps: true
  }
})

export default ChatGroupModel
