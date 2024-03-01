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
import { clearRequestHistory } from '@/redux/slice/request'

function VerifyEmail() {
  const location = useLocation()

  const navigator = useNavigate()

  const dispatch = useAppDispatch()

  const previousRequest = location.state?.request as TRequestVerifyOtpResquest

  const { request, isLoading } = useRequest<TVerifyEmailResquest>()

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

  /**
   * @description navigation
   */

  useEffect(() => {
    if (request?.verifyEmail?.success) {
      const email = request?.verifyEmail?.responseData?.email

      navigator(`/auth/sign-up?email=${email}`, {
        state: {
          request: request
        },
        replace: true
      })

      dispatch(clearRequestHistory())
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
            disabled={isLoading}
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
