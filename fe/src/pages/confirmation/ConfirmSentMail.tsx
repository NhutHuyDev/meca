import { TForgotPasswordResquest } from '@/redux/slice/auth'
import { CaretLeft, CheckCircle } from 'phosphor-react'
import { Link, Navigate, useLocation } from 'react-router-dom'

function ConfirmSentMail() {
  const location = useLocation()

  const previousRequest = location.state
    ?.previousRequest as TForgotPasswordResquest

  const searchParams = new URLSearchParams(location.search)

  const email = searchParams.get('email')

  return (
    <>
      {previousRequest?.forgotPassword?.success ? (
        <div className='space-y-4 w-5/6 mx-auto'>
          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold'>
              Sent password code successfully
            </h3>
            <div className='flex space-x-3 items-center'>
              <CheckCircle className='text-success-dark text-4xl' />
              <p>
                Please! access your email -{' '}
                <span className='font-semibold italic'>{email}</span> to reset
                your password
              </p>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center w-full'>
                <CaretLeft className='text-xl text-grey-600' />
                <Link
                  to='/app'
                  replace={true}
                  className=' block text-left text-grey-600'
                >
                  {' '}
                  Back to Meca
                </Link>
              </div>

              <Link
                to='https://mail.google.com/'
                target='_blank'
                className='w-full block text-right underline italic text-primary-main'
              >
                {' '}
                Go to my email
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={'/app'} replace={true} />
      )}
    </>
  )
}

export default ConfirmSentMail
