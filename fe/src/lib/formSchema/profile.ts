import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(1, 'name is required'),
  about: z.string().min(1, 'about is required')
})

export type TProfileSchema = z.infer<typeof profileSchema>
