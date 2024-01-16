import {
  ComponentType,
  FunctionComponent,
  ReactElement,
  Suspense,
  lazy
} from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

// layouts
import DashboardLayout from '../layouts/dashboard'
import MainLayout from '../layouts/main'

// config
import { DEFAULT_PATH } from '../config'
import LoadingScreen from '../components/LoadingScreen'

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
  return useRoutes([
    {
      path: '/auth',
      element: <MainLayout />,
      children: [
        {
          path: 'sign-in',
          element: <SignInPage />
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
          path: 'new-password',
          element: <NewPasswordPage />
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
const ResetPasswordPage = Loadable(
  lazy(() => import('../pages/auth/ResetPassword'))
)
const NewPasswordPage = Loadable(
  lazy(() => import('../pages/auth/NewPassword'))
)
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')))
const GroupPage = Loadable(lazy(() => import('../pages/dashboard/Group')))
const CallPage = Loadable(lazy(() => import('../pages/dashboard/Call')))
const ProfilePage = Loadable(lazy(() => import('../pages/dashboard/Profile')))
const Settings = Loadable(lazy(() => import('../pages/settings')))
const Page404 = Loadable(lazy(() => import('../pages/Page404')))
