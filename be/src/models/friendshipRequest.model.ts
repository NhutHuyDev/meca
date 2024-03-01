import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

export class FriendshipRequest {
  @prop({ ref: () => User })
  sender: Ref<User>

  @prop({ ref: () => User })
  recipient: Ref<User>
}

const FriendShipModel = getModelForClass(FriendshipRequest, {
  schemaOptions: { 
    collection: 'FriendshipRequest',
    timestamps: true
  }
})

export default FriendShipModel
