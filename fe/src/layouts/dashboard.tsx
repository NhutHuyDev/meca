import { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from '@/components/SideBar'
import { useAppSelector } from '@/hooks/redux'
import ToastMessage from '@/components/ui/ToastMessage'

const DashboardLayout = (): ReactElement => {
  const { isLoggedIn } = useAppSelector((state) => state.auth)

  return (
    <>
      {isLoggedIn ? (
        <div className='flex'>
          <SideBar />
          <Outlet />
          <ToastMessage />
        </div>
      ) : (
        <Navigate to='/auth/sign-in' replace={true} />
      )}
    </>
  )
}

export default DashboardLayout
