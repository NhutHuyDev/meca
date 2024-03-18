import checkValidObjectId from '@/utils/checkValidObjectId'
import { object, string, array, TypeOf } from 'zod'

const participantId = string().refine(checkValidObjectId)

export const create_group_schema = object({
  creatorId: string().refine(checkValidObjectId),
  participantIds: array(participantId).nonempty()
})

export type T_Create_Group = TypeOf<typeof create_group_schema>
