import CredentialModel from '@/models/credential.model'
import { Types } from 'mongoose'

class CredentialRepo {
  static findOneByUserId = async function (userId: string) {
    return CredentialModel.findOne({
      user: new Types.ObjectId(userId)
    })
  }

  static findOneByCredLogin = async function (credLogin: string) {
    return CredentialModel.findOne({
      credLogin: credLogin
    })
  }

  static findValidRequestResetPassword = async function (userId: string) {
    return CredentialModel.findOne({
      user: new Types.ObjectId(userId),
      passwordResetExpires: { $ne: null, $gt: new Date() }
    })
  }
}

export default CredentialRepo
