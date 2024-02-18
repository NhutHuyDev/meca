import { Types } from 'mongoose'
import { generateRSAKeyPair } from '../../helpers/rsa'
import KeyStoreModel from '../keyStore.model'

class KeyStoreRepo {
  static createKeyPair = async function (userId: string) {
    const { publicKey, privateKey } = generateRSAKeyPair()

    const publicKeyEncoding = Buffer.from(publicKey).toString('base64')
    const privateKeyEncoding = Buffer.from(privateKey).toString('base64')

    return KeyStoreModel.create({
      user: new Types.ObjectId(userId),
      publicKey: publicKeyEncoding,
      privateKey: privateKeyEncoding
    })
  }

  static getKeyPairByUserId = async function (userId: string) {
    const keyPair = await KeyStoreModel.findOne({
      user: new Types.ObjectId(userId)
    })

    const { publicKey, privateKey } = keyPair ? keyPair.toJSON() : { publicKey: '', privateKey: '' }

    const publicKeyDecoding = Buffer.from(publicKey, 'base64').toString('ascii')
    const privateKeyDecoding = Buffer.from(privateKey, 'base64').toString('ascii')

    return {
      publicKeyDecoding,
      privateKeyDecoding
    }
  }
}

export default KeyStoreRepo
