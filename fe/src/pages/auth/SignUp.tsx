import AuthSocial from '@/components/Auth/AuthSocial'
import SignUpForm from '@/form/SignUp'
import Divider from '@/components/ui/Divider'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className='space-y-3 w-5/6 mx-auto'>
      <div className='space-y-1'>
        <h3 className='text-xl'>
          Get Started with{' '}
          <span className='font-semibold text-secondary-main'>MECA</span>
        </h3>
        <p className='text-grey-700'>
          Already have an account?{' '}
          <Link
            to={'/auth/sign-in'}
            className='text-secondary-dark hover:underline'
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Sign Up Form  */}
      <SignUpForm />

      <Divider rootStyle='my-3'>
        <span className='text-grey-500'>OR</span>
      </Divider>

      {/* Auth Social  */}
      <AuthSocial />
    </div>
  )
}

export default SignUp
