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
          path: 'login',
          element: <LoginPage />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'settings', element: <Settings /> },

        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to='/404' replace /> }
      ]
    },
    { path: '*', element: <Navigate to='/404' replace /> }
  ])
}

const LoginPage = Loadable(lazy(() => import('../pages/auth/Login')))
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')))
const Settings = Loadable(lazy(() => import('../pages/Settings/Settings')))
const Page404 = Loadable(lazy(() => import('../pages/Page404')))
