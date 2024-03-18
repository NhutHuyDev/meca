import { z } from 'zod'

export const createNewGroupSchema = z.object({
  groupName: z.string().optional(),
  members: z.array(z.string()).min(2, 'at least two member in a group')
})

export type TCreateNewGroupSchema = z.infer<typeof createNewGroupSchema>
