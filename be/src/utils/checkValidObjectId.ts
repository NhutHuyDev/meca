import { Types } from 'mongoose'

export default function checkValidObjectId(id: string) {
  if (Types.ObjectId.isValid(id)) {
    if (String(new Types.ObjectId(id)) === id) return true
    return false
  }
  return false
}
