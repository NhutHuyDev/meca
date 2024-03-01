import UserModel from '../user.model'
import { Types } from 'mongoose'
import { privateFields } from '../user.model'

class UserRepo {
  static findUserById = async function (id: string) {
    return UserModel.findById(id)
  }

  static findUserByEmail = async function (email: string) {
    return UserModel.findOne({
      email: email
    })
  }

  static setSocketId = async function (id: string, socketId: string) {
    return UserModel.findByIdAndUpdate(id, {
      socketId: socketId
    })
  }

  static findOthers = async function (currentId: string) {
    const excludeFields: { [key: string]: 0 } = {}
    privateFields.forEach((field) => {
      excludeFields[field] = 0
    })

    return UserModel.find(
      {
        _id: { $ne: new Types.ObjectId(currentId) }
      },
      excludeFields
    )
  }
}

export default UserRepo
