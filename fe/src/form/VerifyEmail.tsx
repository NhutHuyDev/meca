import { TVerifyEmailSchema } from '@/lib/formSchema/verifyEmail'
import { useAppDispatch } from '@//hooks/redux'
import useRequest from '@/hooks/useRequest'
import {
  TRequestVerifyOtpResquest,
  TVerifyEmailResquest,
  thunkVerifyEmail
} from '@/redux/slice/auth'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'

function VerifyEmail() {
  const location = useLocation()

  const navigator = useNavigate()

  const dispatch = useAppDispatch()

  const previousRequest = location.state
    ?.previousRequest as TRequestVerifyOtpResquest

  const request = useRequest<TVerifyEmailResquest>()

  const searchParams = new URLSearchParams(location.search)

  const email = searchParams.get('email')

  const [otp, setOtp] = useState('')

  const onSubmit = async () => {
    const data = {
      email,
      otp
    } as TVerifyEmailSchema

    dispatch(thunkVerifyEmail(data))
  }

  useEffect(() => {
    if (request?.verifyEmail?.success) {
      const email = request?.verifyEmail?.responseData?.email

      console.log('--- in ----')

      navigator(`/auth/sign-up?email=${email}`, {
        state: {
          previousRequest: request
        },
        replace: true
      })
    }
  }, [request, navigator, dispatch])

  return (
    <>
      {previousRequest?.requestVerifyOtp?.success ? (
        <form className='space-y-4 text-end'>
          <span className='text-sm italic'>{email}</span>

          <OtpInput
            value={otp}
            onChange={setOtp}
            inputType='tel'
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: '50px',
              height: '50px',
              border: '1px solid',
              borderRadius: '5px'
            }}
            containerStyle={{
              justifyContent: 'space-around'
            }}
          />

          {request?.verifyEmail?.error && (
            <p className='text-left text-error-main'>{`${request.verifyEmail.errorMessage}`}</p>
          )}

          <button
            onClick={onSubmit}
            disabled={request?.verifyEmail?.isLoading}
            type='submit'
            className='bg-common-black text-common-white p-4 rounded-lg w-full disabled:opacity-75'
          >
            Verify Email
          </button>
        </form>
      ) : (
        <Navigate to={`/auth/sign-in`} replace />
      )}
    </>
  )
}

export default VerifyEmail
