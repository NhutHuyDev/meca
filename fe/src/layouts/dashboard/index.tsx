import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '@/components/SideBar'

const DashboardLayout = (): ReactElement => {
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
