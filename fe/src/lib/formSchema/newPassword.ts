import { z } from 'zod'

export const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(10, 'new password must be at least 10 characters'),
    confirmNewPassword: z.string()
  })
  .refine((formData) => formData.newPassword === formData.confirmNewPassword, {
    message: 'new confirm password must match',
    path: ['confirmNewPassword']
  })

export type TNewPasswordSchema = z.infer<typeof newPasswordSchema>
