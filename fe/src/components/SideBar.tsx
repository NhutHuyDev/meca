import { ReactElement, useEffect, useState } from 'react'
import logo2 from '@/assets/icon-2.png'
import { Profile_Menu } from '@/data'
import { ChatCircleDots, Gear, Phone, SignOut, Users } from 'phosphor-react'
import defaultAvatar from '@/assets/default-avatar.svg'
import SwitchUI from '@/components/ui/Switch'
import { PopoverUI, side } from './ui/Popover'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { thunkSignOut } from '@/redux/slice/auth'
import { ChatGroup, ChatOneToOne } from '@/types/chat.types'

function SideBar(): ReactElement {
  const [switchOn, setSwitchOn] = useState(true)
  const [individualNewMsg, setIndividualNewMsg] = useState(false)
  const [groupNewMsg, setGroupNewMsg] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const { chatOneToOnes } = useAppSelector((state) => state.chatOneToOne)
  const { chatGroups } = useAppSelector((state) => state.chatGroup)

  useEffect(() => {
    let individualNewMsg = false
    let groupNewMsg = false

    for (let index = 0; index < chatOneToOnes.length; index++) {
      const chatOneToOne = chatOneToOnes[index] as ChatOneToOne
      if (chatOneToOne.unread > 0) {
        individualNewMsg = true
        break
      }
    }

    for (let index = 0; index < chatGroups.length; index++) {
      const chatGroup = chatGroups[index] as ChatGroup
      if (chatGroup.currentUnread > 0) {
        groupNewMsg = true
        break
      }
    }
    setIndividualNewMsg(individualNewMsg)
    setGroupNewMsg(groupNewMsg)
  }, [chatOneToOnes, chatGroups])

  return (
    <nav className='flex flex-col justify-between w-28 h-[100vh] p-6 bg-background-paper shadow'>
      <div className='flex flex-col justify-center items-center space-y-5'>
        <div className='h-16 w-16 rounded-lg overflow-hidden'>
          <img src={logo2} alt='logo meca' className='h-full w-full' />
        </div>

        <button
          className={`
              relative 
            ${
              location.pathname === '/app' &&
              'bg-primary-main text-common-white '
            }

            ${
              individualNewMsg &&
              location.pathname !== '/app' &&
              `after:content-[""] after:block after:h-[10px] after:w-[10px]
              after:rounded-full after:bg-error-main after:absolute
              after:top-0 after:right-0 after:shadow`
            }

            text-2xl w-fit p-3 rounded-lg`}
          onClick={() => {
            navigate('/app')
          }}
        >
          <ChatCircleDots />
        </button>

        <button
          className={`
              relative 
            ${
              location.pathname === '/group' &&
              'bg-primary-main text-common-white '
            }

            ${
              groupNewMsg &&
              location.pathname !== '/group' &&
              `after:content-[""] after:block after:h-[10px] after:w-[10px]
              after:rounded-full after:bg-error-main after:absolute
              after:top-0 after:right-0 after:shadow`
            }

            text-2xl w-fit p-3 rounded-lg`}
          onClick={() => {
            navigate('/group')
          }}
        >
          <Users />
        </button>

        <button
          className={`
              relative 
            ${
              location.pathname === '/call' &&
              'bg-primary-main text-common-white '
            }
            text-2xl w-fit p-3 rounded-lg`}
          onClick={() => {
            navigate('/call')
          }}
        >
          <Phone />
        </button>

        <span style={{ height: '1px' }} className='w-full bg-divider '></span>

        <button
          className={`
            ${
              location.pathname === '/settings' &&
              'bg-primary-main text-common-white'
            }
            text-2xl w-fit p-3 rounded-lg`}
          onClick={() => {
            navigate('/settings')
          }}
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

function ProfileOptions(): ReactElement {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <div className='m-2 p-3 shadow-xl bg-grey-100 rounded-xl w-fix'>
      {Profile_Menu.map((menu, index) => (
        <button
          key={index}
          className='w-full p-2 hover:bg-grey-300 outline-none rounded-lg flex items-center space-x-2'
          onClick={() => {
            navigate(menu.path)
          }}
        >
          <p className='text-start whitespace-nowrap'>{menu.title}</p>
          {menu.icon}
        </button>
      ))}

      <button
        className='w-full p-2 hover:bg-grey-300 outline-none rounded-lg flex items-center space-x-2'
        onClick={() => {
          dispatch(thunkSignOut())
        }}
      >
        <p className='text-start whitespace-nowrap'>Logout</p>
        <SignOut />
      </button>
    </div>
  )
}
