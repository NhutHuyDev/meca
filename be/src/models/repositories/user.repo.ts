import UserModel from '../user.model'

class UserRepo {
  static findUserById = async function (id: string) {
    return UserModel.findById(id)
  }

  static findUserByEmail = async function (email: string) {
    return UserModel.findOne({
      email: email
    })
  }
}

export default UserRepo
