import RequestVerifyOtpForm from '@/form/RequestVerifyOtp'
import { Link } from 'react-router-dom'
import { CaretLeft } from 'phosphor-react'

function RequestVerifyOtp() {
  return (
    <div className='space-y-3 w-5/6 mx-auto'>
      <div className='space-y-1'>
        <h3 className='text-2xl font-semibold'>Request verify OTP</h3>
        <p className='text-grey-500'>
          please enter the email associated with your account and we will email
          you a OTP to verify it, before create your account.
        </p>
      </div>

      <RequestVerifyOtpForm />

      <Link
        to={'/auth/sign-in'}
        className='flex justify-start items-center text-grey-600 hover:underline'
      >
        <CaretLeft />
        Back to Sign In
      </Link>
    </div>
  )
}

export default RequestVerifyOtp
