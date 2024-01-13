import { z } from 'zod'

export const resetPasswordSchema = z.object({
  email: z.string().email('email is invalid')
})
export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>
