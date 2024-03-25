import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react'
import { ReactElement } from 'react'
import { useAppDispatch } from '@/hooks/redux'
import { toggleSidebar } from '@/redux/slice/app'
import defaultAvatar from '@/assets/default-avatar.png'
import { ContactUser } from '@/types/user.types'

function Header({ currentFrom }: { currentFrom?: ContactUser }): ReactElement {
  const dispatch = useAppDispatch()

  const avatarUrl = currentFrom?.avatar
    ? `url(${currentFrom?.avatar})`
    : `url(${defaultAvatar})`

  return (
    <div className='bg-grey-200 h-fit w-full px-6 py-4 flex justify-between items-center z-[99] shadow-inner'>
      {/* Avatar  */}
      <div
        onClick={() => {
          dispatch(toggleSidebar())
        }}
        className='cursor-pointer flex items-center gap-3 w-fit'
      >
        <div
          className={`flex-shrink-0 h-9 w-9 rounded-full 
          bg-cover bg-no-repeat bg-center
          relative ${
            currentFrom?.online &&
            'after:content-[""] after:block after:h-[10px] after:w-[10px] after:rounded-full after:bg-success-main after:absolute after:right-0 after:bottom-0 after:shadow'
          }`}
          style={{ backgroundImage: avatarUrl }}
        ></div>

        <div className='text-sm'>
          <h3 className='font-semibold'>
            {currentFrom?.firstName + ' ' + currentFrom?.lastName}
          </h3>
          {currentFrom?.online === true ? (
            <span className='text-grey-700'>Online</span>
          ) : (
            <span className='text-grey-700'>Offline</span>
          )}
        </div>
      </div>

      {/* Action  */}
      <div className='flex justify-around items-center gap-8 h-full'>
        <button>
          <VideoCamera size={22} />
        </button>
        <button>
          <Phone size={22} />
        </button>
        <button>
          <MagnifyingGlass size={22} />
        </button>
        <span style={{ width: '1px' }} className='block bg-divider h-3/4' />
        <button>
          <CaretDown size={22} />
        </button>
      </div>
    </div>
  )
}

export default Header
