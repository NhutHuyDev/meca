import { Types } from 'mongoose'
import KeyStoreModel from '@/models/keyStore.model'

class KeyStoreRepo {
  static getKeyPairByUserId = async function (userId: string) {
    const keyPair = await KeyStoreModel.findOne({
      user: new Types.ObjectId(userId)
    })

    const { publicKey, privateKey } = keyPair
      ? keyPair.toJSON()
      : { publicKey: '', privateKey: '' }

    const publicKeyDecoding = Buffer.from(publicKey, 'base64').toString('ascii')
    const privateKeyDecoding = Buffer.from(privateKey, 'base64').toString('ascii')

    return {
      publicKeyDecoding,
      privateKeyDecoding
    }
  }
}

export default KeyStoreRepo
