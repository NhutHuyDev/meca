import { z } from 'zod'

export const newPasswordSchema = z.object({
  params: z
    .object({
      userId: z.string().optional(),
      passwordResetCode: z.string().optional()
    })
    .optional(),
  body: z
    .object({
      password: z.string().min(6, 'new password must be at least 6 characters'),
      passwordConfirmation: z.string()
    })
    .refine((body) => body.password === body.passwordConfirmation, {
      message: 'new confirm password must match',
      path: ['confirmNewPassword']
    })
})

export type TNewPasswordSchema = z.infer<typeof newPasswordSchema>
