import { object, string, array, TypeOf } from 'zod'


export const create_group_schema = object({
  creatorId: string(),
  participantIds: array(string()).min(2, 'at least two member in a group')
})

export type T_Create_Group = TypeOf<typeof create_group_schema>
