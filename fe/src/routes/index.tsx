import {
  ComponentType,
  FunctionComponent,
  ReactElement,
  Suspense,
  lazy,
  useEffect
} from 'react'
import { Navigate, useLocation, useRoutes } from 'react-router-dom'

// layouts
import DashboardLayout from '../layouts/dashboard'
import MainLayout from '../layouts/main'
import SecondaryLayout from '../layouts/secondary'

// config
import { DEFAULT_PATH } from '../config'
import LoadingScreen from '../components/LoadingScreen'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { clearRequest } from '@/redux/slice/request'

const Loadable = <P extends object>(
  Component: ComponentType<P>
): FunctionComponent<P> => {
  return (props: P): ReactElement => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

export default function Router() {
  const dispatch = useAppDispatch()

  const location = useLocation()

  const lastRequest = useAppSelector((state) => state.lastRequest)

  useEffect(() => {
    lastRequest.request && dispatch(clearRequest())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, dispatch])

  return useRoutes([
    {
      path: '/auth',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Navigate to='sign-in' replace={true} />
        },
        {
          path: 'sign-in',
          element: <SignInPage />
        },
        {
          path: 'request-verify-otp',
          element: <RequestVerifyOtpPage />
        },
        {
          path: 'verify-email',
          element: <VerifyEmailPage />
        },
        {
          path: 'sign-up',
          element: <SignUpPage />
        },
        {
          path: 'reset-password',
          element: <ResetPasswordPage />
        },
        {
          path: 'new-password/:userId/:passwordResetCode',
          element: <NewPasswordPage />
        }
      ]
    },
    {
      path: 'confirmation',
      element: <SecondaryLayout />,
      children: [
        {
          path: '',
          element: <Navigate to='/app' replace={true} />
        },
        {
          path: 'auth/sent-mail/',
          element: <ConfirmSentMailPage />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'group', element: <GroupPage /> },
        { path: 'call', element: <CallPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'settings', element: <Settings /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to='/404' replace /> }
      ]
    },
    { path: '*', element: <Navigate to='/404' replace /> }
  ])
}

const SignInPage = Loadable(lazy(() => import('../pages/auth/SignIn')))
const SignUpPage = Loadable(lazy(() => import('../pages/auth/SignUp')))
const RequestVerifyOtpPage = Loadable(
  lazy(() => import('../pages/auth/RequestVerifyOtp'))
)
const VerifyEmailPage = Loadable(
  lazy(() => import('../pages/auth/VerifyEmail'))
)
const ResetPasswordPage = Loadable(
  lazy(() => import('../pages/auth/ResetPassword'))
)
const NewPasswordPage = Loadable(
  lazy(() => import('../pages/auth/NewPassword'))
)
const ConfirmSentMailPage = Loadable(
  lazy(() => import('../pages/confirmation/ConfirmSentMail'))
)
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')))
const GroupPage = Loadable(lazy(() => import('../pages/dashboard/Group')))
const CallPage = Loadable(lazy(() => import('../pages/dashboard/Call')))
const ProfilePage = Loadable(lazy(() => import('../pages/dashboard/Profile')))
const Settings = Loadable(lazy(() => import('../pages/settings')))
const Page404 = Loadable(lazy(() => import('../pages/Page404')))
