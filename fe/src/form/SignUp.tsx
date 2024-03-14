import { TSignUpSchema, signUpSchema } from '@/lib/formSchema/signUp'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Eye, EyeSlash } from 'phosphor-react'
import useRequest from '@/hooks/useRequest'
import {
  TSignUpRequest,
  TVerifyEmailResquest,
  thunkSignUp
} from '@/redux/slice/auth'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/redux'

function SignUp() {
  const navigator = useNavigate()

  const location = useLocation()

  const dispatch = useAppDispatch()

  const previousRequest = location.state
    ?.previousRequest as TVerifyEmailResquest

  const request = useRequest<TSignUpRequest>()

  const searchParams = new URLSearchParams(location.search)

  const email = searchParams.get('email')

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema)
  })

  useEffect(() => {
    setValue('email', email || '')
  }, [setValue, email])

  const onSubmit = (data: TSignUpSchema) => {
    dispatch(thunkSignUp(data))
  }

  useEffect(() => {
    if (request?.signUp?.success) {
      navigator('/auth/sign-in', { replace: true })
    }
  }, [request, navigator, dispatch])

  return (
    <>
      {previousRequest?.verifyEmail?.success ? (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 text-end'>
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <input
                {...register('firstName')}
                placeholder='First name'
                className='p-3 rounded border-2 border-grey-500 w-full'
              />
              {errors.firstName && (
                <p className='text-left text-error-main'>{`${errors.firstName.message}`}</p>
              )}
            </div>
            <div>
              <input
                {...register('lastName')}
                placeholder='Last name'
                className='p-3 rounded border-2 border-grey-500 w-full'
              />
              {errors.lastName && (
                <p className='text-left text-error-main'>{`${errors.lastName.message}`}</p>
              )}
            </div>
          </div>
          <input
            {...register('email')}
            placeholder='Email'
            disabled={true}
            value={getValues('email')}
            className='p-3 rounded border-2 border-grey-500 w-full disabled:bg-grey-400'
          />
          {errors.email && (
            <p className='text-left text-error-main'>{`${errors.email.message}`}</p>
          )}
          <div className='flex justify-center items-center text-xl p-3 rounded border-2 border-grey-500 focus-within:border-common-black'>
            <input
              {...register('credPassword')}
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

          {errors.credPassword && (
            <p className='text-left text-error-main'>{`${errors.credPassword.message}`}</p>
          )}

          <div className='flex justify-center items-center text-xl p-3 rounded border-2 border-grey-500 focus-within:border-common-black'>
            <input
              {...register('passwordConfirmation')}
              placeholder='Confirm password'
              className='w-full text-base outline-none'
              type={showConfirmPassword ? 'text' : 'password'}
            />
            {showConfirmPassword ? (
              <button
                onClick={() => setShowConfirmPassword(false)}
                type='button'
              >
                <Eye />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmPassword(true)}
                type='button'
              >
                <EyeSlash />
              </button>
            )}
          </div>

          {errors.passwordConfirmation && (
            <p className='text-left text-error-main'>{`${errors.passwordConfirmation.message}`}</p>
          )}

          <button
            disabled={request?.signUp?.success}
            type='submit'
            className='bg-common-black text-common-white p-4 rounded-lg w-full disabled:opacity-75'
          >
            Create Account
          </button>
        </form>
      ) : (
        <Navigate to='/auth/sign-in' replace />
      )}
    </>
  )
}

export default SignUp
