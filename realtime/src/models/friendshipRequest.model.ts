import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

export class FriendshipRequest {
  @prop({ ref: () => User })
  sender: Ref<User>

  @prop({ ref: () => User })
  recipient: Ref<User>

  @prop({ default: false })
  deletedBySender: boolean

  @prop({ default: false })
  deletedByRecipient: boolean
}

const FriendshipRequestModel = getModelForClass(FriendshipRequest, {
  schemaOptions: {
    collection: 'FriendshipRequests',
    timestamps: true
  }
})

export default FriendshipRequestModel
