import UserModel from '@/models/user.model'

class UserRepo {
  static findUserById = async function (id: string) {
    return UserModel.findById(id)
  }

  static findUserByEmail = async function (email: string) {
    return UserModel.findOne({
      email: email
    })
  }

  static setOnline = async function (id: string, socketId: string) {
    return UserModel.findByIdAndUpdate(id, {
      socketId: socketId,
      online: true
    })
  }

  static setOffline = async function (id: string) {
    return UserModel.findByIdAndUpdate(id, {
      online: false
    })
  }
}

export default UserRepo
