import { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from '@/components/SideBar'

const isAuthenticated = true

const DashboardLayout = (): ReactElement => {
  if (!isAuthenticated) {
    return <Navigate to='/auth/sign-in' />
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
