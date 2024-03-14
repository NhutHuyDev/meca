import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

// class Friend {
//   @prop({ ref: () => User })
//   user: Ref<User>
// }

export class FriendShip {
  @prop({ ref: () => User })
  user: Ref<User>

  @prop({ ref: () => User, default: [], _id: false })
  friends: Ref<User>[]
}

const FriendShipModel = getModelForClass(FriendShip, {
  schemaOptions: {
    collection: 'Friendships',
    timestamps: true
  }
})

export default FriendShipModel
