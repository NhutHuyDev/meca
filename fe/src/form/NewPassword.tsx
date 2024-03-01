import {
  TNewPasswordSchema,
  newPasswordSchema
} from '@/lib/formSchema/newPassword'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Eye, EyeSlash } from 'phosphor-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/redux'
import { TResetPasswordResquest, thunkResetPassword } from '@/redux/slice/auth'
import useRequest from '@/hooks/useRequest'
import { clearRequestHistory } from '@/redux/slice/request'

function NewPassword() {
  const dispatch = useAppDispatch()

  const navigator = useNavigate()

  const { request, isLoading } = useRequest<TResetPasswordResquest>()

  const { userId, passwordResetCode } = useParams()

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TNewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema)
  })

  const onSubmit = async (data: TNewPasswordSchema) => {
    const updatedData: TNewPasswordSchema = {
      params: {
        userId,
        passwordResetCode
      },
      ...data
    }

    dispatch(thunkResetPassword(updatedData))
  }

  /**
   * @description navigation
   */
  useEffect(() => {
    if (request?.resetPassword?.success) {
      navigator('/auth/sign-in', { replace: true })

      dispatch(clearRequestHistory())
    }
  }, [dispatch, navigator, request])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 text-end'>
        <div className='flex justify-center items-center text-xl p-3 rounded border-2 border-grey-500 focus-within:border-common-black'>
          <input
            {...register('body.password')}
            placeholder='Password'
            className='w-full text-base outline-none'
            type={showPassword ? 'text' : 'password'}
          />
          {showPassword ? (
            <button onClick={() => setShowPassword(false)} type='button'>
              <Eye />
            </button>
          ) : (
            <button onClick={() => setShowPassword(true)} type='button'>
              <EyeSlash />
            </button>
          )}
        </div>

        {errors.body?.password && (
          <p className='text-left text-error-main'>{`${errors.body?.password}`}</p>
        )}

        <div className='flex justify-center items-center text-xl p-3 rounded border-2 border-grey-500 focus-within:border-common-black'>
          <input
            {...register('body.passwordConfirmation')}
            placeholder='Confirm password'
            className='w-full text-base outline-none'
            type={showConfirmPassword ? 'text' : 'password'}
          />
          {showConfirmPassword ? (
            <button onClick={() => setShowConfirmPassword(false)} type='button'>
              <Eye />
            </button>
          ) : (
            <button onClick={() => setShowConfirmPassword(true)} type='button'>
              <EyeSlash />
            </button>
          )}
        </div>

        {errors.body?.passwordConfirmation && (
          <p className='text-left text-error-main'>{`${errors.body?.passwordConfirmation.message}`}</p>
        )}

        {request?.resetPassword?.error && (
          <p className='text-left text-error-main'>{`${request.resetPassword.errorMessage}`}</p>
        )}

        <button
          disabled={isLoading}
          type='submit'
          className='bg-common-black text-common-white p-4 rounded-lg w-full disabled:opacity-75'
        >
          Update New Password
        </button>
      </form>
    </>
  )
}

export default NewPassword
