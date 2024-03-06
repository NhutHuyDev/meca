import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

export class FriendshipRequest {
  @prop({ ref: () => User })
  sender: Ref<User>

  @prop({ ref: () => User })
  recipient: Ref<User>
}

const FriendshipRequestModel = getModelForClass(FriendshipRequest, {
  schemaOptions: {
    collection: 'FriendshipRequests',
    timestamps: true
  }
})

export default FriendshipRequestModel
