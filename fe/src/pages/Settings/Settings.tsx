import ScrollArea from '@/components/ScrollArea'
import { faker } from '@faker-js/faker'
import {
  Bell,
  CaretLeft,
  Image,
  Info,
  Key,
  Keyboard,
  Lock,
  Note,
  PencilCircle
} from 'phosphor-react'
import ShortcutDialog from './ShortcutDialog'
import { useState } from 'react'

function Settings() {
  const [openShortcut, setOpenShortcut] = useState(false)

  const Setting_List = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: 'Notifications',
      onclick: () => {}
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: 'Privacy',
      onclick: () => {}
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: 'Security',
      onclick: () => {}
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: 'Theme'
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: 'Chat Wallpaper',
      onclick: () => {}
    },
    {
      key: 5,
      icon: <Note size={20} />,
      title: 'Request Account Info',
      onclick: () => {}
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: 'Keyboard Shortcuts',
      onclick: () => {
        setOpenShortcut(true)
      }
    },
    {
      key: 7,
      icon: <Info size={20} />,
      title: 'Help',
      onclick: () => {}
    }
  ]

  return (
    <div>
      <div className='p-5 h-[100vh] w-80 bg-grey-200 shadow-inner flex flex-col space-y-8'>
        <div className='flex items-center space-x-5'>
          <CaretLeft size={24} />
          <h2 className='font-semibold text-2xl'>Settings</h2>
        </div>

        <div className='flex items-center gap-5 w-fit'>
          <div
            className='flex-shrink-0 h-12 w-12 rounded-full 
                  bg-cover bg-no-repeat bg-center'
            style={{ backgroundImage: `url(${faker.image.avatar()}` }}
          ></div>

          <div>
            <h3 className='font-semibold'>Nguyen Nhut Huy</h3>
            <span className='text-grey-700 text-sm'>Exploring</span>
          </div>
        </div>

        <div className='flex-grow'>
          <ScrollArea maxHeight={'calc(100vh - 170px)'} bgColor='bg-grey-200'>
            <div className='px-3'>
              {Setting_List.map((setting) => (
                <div
                  className='flex gap-5 p-5 px-3 cursor-pointer shadow-[inset_0_1px_0_0] shadow-grey-400'
                  onClick={setting.onclick}
                >
                  {setting.icon}
                  <p>{setting.title}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <ShortcutDialog
        open={openShortcut}
        handleCloseDialog={() => {
          setOpenShortcut(false)
        }}
      />
    </div>
  )
}

export default Settings
