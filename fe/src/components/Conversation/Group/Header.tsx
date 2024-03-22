import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react'
import { ReactElement } from 'react'
import { useAppDispatch } from '@/hooks/redux'
import { toggleSidebar } from '@/redux/slice/app'
import defaultAvatar from '@/assets/default-avatar.svg'
import { ContactUser } from '@/types/user.types'

function Header({
  currentFroms
}: {
  currentFroms: ContactUser[]
}): ReactElement {
  const dispatch = useAppDispatch()

  const name = currentFroms.reduce((accumulator, currentValue) => {
    if (accumulator === '') {
      return currentValue.lastName
    } else {
      return accumulator + ', ' + currentValue.lastName
    }
  }, '')

  const imgMember1 = currentFroms[0].avatar || defaultAvatar
  const imgMember2 = currentFroms[1].avatar || defaultAvatar
  const imgMember3 = currentFroms[2].avatar || defaultAvatar

  const avatarGroup = (
    <div className='flex flex-col'>
      <div className='flex -mb-3'>
        <img className='h-7 w-7 -mr-3' src={imgMember1} />
        <img className='h-7 w-7' src={imgMember2} />
      </div>
      <div
        className={`flex ${currentFroms.length === 3 ? 'justify-center' : ''}`}
      >
        <img className='h-7 w-7' src={imgMember3} />
        {currentFroms.length > 3 ? (
          <div className=' -ml-3 h-7 w-7 text-sm bg-grey-300 text-grey-600 rounded-full p-3 flex justify-center items-center'>
            <span>+{currentFroms.length - 3}</span>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )

  return (
    <div className='bg-grey-200 h-fit w-full px-6 py-4 flex justify-between items-center z-[99] shadow-inner'>
      {/* Avatar  */}
      <div
        onClick={() => {
          dispatch(toggleSidebar())
        }}
        className='cursor-pointer flex items-center gap-3 w-fit'
      >
        {avatarGroup}

        <div className='text-sm'>
          <h3 className='font-semibold'>{name}</h3>
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
