import { ReactElement, useState } from 'react'
import logo from '@/assets/logo.png'
import { Nav_Buttons, Profile_Menu } from '@/data'
import { Gear } from 'phosphor-react'
import defaultAvatar from '@/assets/default-avatar.svg'
import SwitchUI from '@/components/ui/Switch'
import { PopoverUI, side } from './ui/Popover'

function ProfileOptions(): ReactElement {
  return (
    <div className='m-2 p-3 shadow-xl bg-grey-100 rounded-xl w-fix'>
      {Profile_Menu.map((menu, index) => (
        <button
          key={index}
          className='w-full p-2 hover:bg-grey-300 outline-none rounded-lg flex items-center space-x-2'
        >
          <p className='text-start whitespace-nowrap'>{menu.title}</p>
          {menu.icon}
        </button>
      ))}
    </div>
  )
}

function SideBar(): ReactElement {
  const [selectedNav, setSeletedNav] = useState(0)
  const [switchOn, setSwitchOn] = useState(true)

  return (
    <nav className='flex flex-col justify-between w-28 h-[100vh] p-6 bg-background-paper shadow'>
      <div className='flex flex-col justify-center items-center space-y-5'>
        <div className='h-16 w-16 rounded-lg overflow-hidden'>
          <img src={logo} alt='logo meca' className='h-full w-full' />
        </div>

        {Nav_Buttons.map((nav_Button) => {
          return (
            <button
              className={`
            ${
              selectedNav === nav_Button.index &&
              'bg-primary-main text-common-white'
            }
            text-2xl w-fit p-3 rounded-lg`}
              key={nav_Button.index}
              onClick={() => setSeletedNav(nav_Button.index)}
            >
              {nav_Button.icon}
            </button>
          )
        })}

        <span style={{ height: '1px' }} className='w-full bg-divider '></span>

        <button
          className={`
            ${selectedNav === 3 && 'bg-primary-main text-common-white'}
            text-2xl w-fit p-3 rounded-lg`}
          onClick={() => setSeletedNav(3)}
        >
          <Gear />
        </button>
      </div>

      <div className='flex flex-col justify-center items-center space-y-5'>
        <SwitchUI checked={switchOn} onCheckedChange={setSwitchOn} />
        <PopoverUI
          side={side.right}
          Trigger={
            <button className='h-12 w-12 rounded-full overflow-hidden'>
              <img
                src={defaultAvatar}
                className='h-full w-full'
                alt='user avatar'
              />
            </button>
          }
          Content={<ProfileOptions />}
        />
      </div>
    </nav>
  )
}

export default SideBar
