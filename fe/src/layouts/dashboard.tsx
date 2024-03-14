import { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from '@/components/SideBar'
import { useAppSelector } from '@/hooks/redux'
import ToastMessage from '@/components/ui/ToastMessage'
import RealTimeWapper from '@/realtime/RealTimeWapper'

const DashboardLayout = (): ReactElement => {
  const { isLoggedIn } = useAppSelector((state) => state.auth)
  const { open, message } = useAppSelector((state) => state.messageToast)

  return (
    <>
      {isLoggedIn ? (
        <RealTimeWapper>
          <div className='flex'>
            <SideBar />
            <Outlet />
            <ToastMessage open={open} message={message} />
          </div>
        </RealTimeWapper>
      ) : (
        <Navigate to='/auth/sign-in' replace={true} />
      )}
    </>
  )
}

export default DashboardLayout
