import { z } from 'zod'

export const createNewGroupSchema = z.object({
  groupName: z.string().min(1, 'group name is required'),
  members: z.array(z.string()).min(2, 'at least two member in a group')
})

export type TCreateNewGroupSchema = z.infer<typeof createNewGroupSchema>
