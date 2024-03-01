import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

class Friend {
  @prop({ ref: () => User })
  friendId: Ref<User>
}

export class FriendShip {
  @prop({ ref: () => User })
  user: Ref<User>

  @prop({ type: () => [Friend], default: [] })
  friends: Friend[]
}

export const privateFields = ['__v', 'verified', 'deleted']

const FriendShipModel = getModelForClass(FriendShip, {
  schemaOptions: {
    collection: 'Friendships',
    timestamps: true
  }
})

export default FriendShipModel
