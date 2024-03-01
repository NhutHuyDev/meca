import {
  TResetPasswordSchema,
  resetPasswordSchema
} from '@/lib/formSchema/resetPassword'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/hooks/redux'
import {
  TForgotPasswordResquest,
  thunkForgotPassword
} from '@/redux/slice/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useRequest from '@/hooks/useRequest'
import { clearRequestHistory } from '@/redux/slice/request'

function ResetPassword() {
  const dispatch = useAppDispatch()

  const navigator = useNavigate()

  const { request, isLoading } = useRequest<TForgotPasswordResquest>()

  useEffect(() => {
    if (request?.forgotPassword?.success) {
      const sentEmail = request?.forgotPassword?.responseData?.email

      navigator(
        `/confirmation/auth/sent-mail?email=${sentEmail}&status=sucess`,
        {
          state: { request: request },
          replace: true
        }
      )

      dispatch(clearRequestHistory())
    }
  }, [navigator, request, dispatch])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const onSubmit = async (data: TResetPasswordSchema) => {
    dispatch(thunkForgotPassword(data))
  }

  /**
   * @description navigation
   */

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 text-end'>
        <input
          {...register('email')}
          placeholder='Email'
          className='p-3 rounded border-2 border-grey-500 w-full'
        />
        {errors.email && (
          <p className='text-left text-error-main'>{`${errors.email.message}`}</p>
        )}

        {request?.forgotPassword?.error && (
          <p className='text-left text-error-main'>{`${request.forgotPassword.errorMessage}`}</p>
        )}

        <button
          disabled={isLoading}
          type='submit'
          className='bg-common-black text-common-white p-4 rounded-lg w-full disabled:opacity-75'
        >
          Send Request
        </button>
      </form>
    </>
  )
}

export default ResetPassword
