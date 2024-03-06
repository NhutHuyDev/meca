import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

export class ChatOneToOne {
  @prop({ ref: () => User })
  firstUser: Ref<User>

  @prop({ ref: () => User })
  secondUser: Ref<User>
}

const ChatOneToOneModel = getModelForClass(ChatOneToOne, {
  schemaOptions: {
    collection: 'ChatOneToOnes',
    timestamps: true
  }
})

export default ChatOneToOneModel
