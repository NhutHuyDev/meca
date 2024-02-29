import { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from '@/components/SideBar'
import { useAppSelector } from '@/hooks/redux'

const DashboardLayout = (): ReactElement => {
  const { isLoggedIn } = useAppSelector((state) => state.auth)

  if (!isLoggedIn) {
    return <Navigate to='/auth/sign-in' replace={true} />
  }

  return (
    <>
      <div className='flex'>
        <SideBar />
        <Outlet />
      </div>
    </>
  )
}

export default DashboardLayout
