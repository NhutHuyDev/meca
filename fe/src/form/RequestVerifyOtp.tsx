import {
  TRequestVerifyOtpSchema,
  requestVerifyOtpSchema
} from '@/lib/formSchema/requestVerifyOtp'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@//hooks/redux'
import {
  TRequestVerifyOtpResquest,
  thunkRequestVerifyOtp
} from '@/redux/slice/auth'
import { useNavigate } from 'react-router-dom'
import useRequest from '@/hooks/useRequest'
import { useEffect } from 'react'

function RequestVerifyOtp() {
  const navigator = useNavigate()

  const dispatch = useAppDispatch()

  const request = useRequest<TRequestVerifyOtpResquest>()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TRequestVerifyOtpSchema>({
    resolver: zodResolver(requestVerifyOtpSchema)
  })

  const onSubmit = async (data: TRequestVerifyOtpSchema) => {
    dispatch(thunkRequestVerifyOtp(data))
  }

  useEffect(() => {
    if (request?.requestVerifyOtp?.success) {
      const sentEmail = request?.requestVerifyOtp?.responseData?.email

      navigator(`/auth/verify-email/?email=${sentEmail}`, {
        state: { previousRequest: request },
        replace: true
      })
    }
  }, [request, navigator, dispatch])

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

        {request?.requestVerifyOtp?.error && (
          <p className='text-left text-error-main'>{`${request.requestVerifyOtp.errorMessage}`}</p>
        )}

        <button
          disabled={request?.requestVerifyOtp?.isLoading}
          type='submit'
          className='bg-common-black text-common-white p-4 rounded-lg w-full disabled:opacity-75'
        >
          Send Request
        </button>
      </form>
    </>
  )
}

export default RequestVerifyOtp
