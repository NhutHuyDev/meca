import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { thunkFetchFriends } from '@/redux/slice/individualContact'
import { useEffect } from 'react'
import ScrollArea from '../ScrollArea'
import { ReactElement } from 'react'
import defaultAvatar from '@/assets/default-avatar.png'
import FriendEventEmit from '@/realtime/friend.event/emit'
import { PopoverUI, side } from '../ui/Popover'
import { ContactUser } from '@/types/user.types'

function Friends() {
  const dispatch = useAppDispatch()

  const { friends } = useAppSelector((state) => state.individualContact)

  useEffect(() => {
    dispatch(thunkFetchFriends())
  }, [dispatch])

  return (
    <ScrollArea maxHeight={'150px'}>
      {friends.length > 0 ? (
        <div className='p-4 space-y-2'>
          {friends.map((friend: ContactUser) => (
            <Friend key={friend._id} {...friend} />
          ))}
        </div>
      ) : (
        <div className='p-4 mt-5'>
          <p className='text-grey-500 italic text-center text-sm'>Empty</p>
        </div>
      )}
    </ScrollArea>
  )
}

export default Friends

type PropsType = {
  _id: string
  avatar?: string
  firstName: string
  lastName: string
  online?: boolean
}

function Friend({
  _id,
  avatar,
  firstName,
  lastName,
  online
}: PropsType): ReactElement {
  const avatarUri = avatar ? `url(${avatar})` : `url(${defaultAvatar})`

  return (
    <div
      className='h-fit p-3 rounded-2xl bg-common-white 
    flex justify-center items-center gap-3 cursor-pointer'
    >
      <div
        className={`flex-shrink-0 h-9 w-9 rounded-full 
        bg-cover bg-no-repeat bg-center
        relative  
        ${
          online &&
          ' after:content-[""] after:block after:h-[10px] after:w-[10px]' +
            ' after:rounded-full after:bg-success-main' +
            ' after:absolute after:right-0 after:bottom-0 after:shadow'
        }`}
        style={{ backgroundImage: avatarUri }}
      ></div>
      <div className='w-full'>
        <div className='w-full flex justify-between items-center px-3'>
          <h3 className='text-sm font-bold'>{firstName + ' ' + lastName}</h3>
          <PopoverUI
            side={side.right}
            Trigger={
              <button className='flex p-2 rounded-full hover:bg-grey-300 items-center text-sm italic text-grey-500'>
                friend
              </button>
            }
            Content={<FriendOption friendId={_id} />}
          />
        </div>
      </div>
    </div>
  )
}

function FriendOption({ friendId }: { friendId: string }): ReactElement {
  const dispatch = useAppDispatch()

  const { clientId } = useAppSelector((state) => state.auth)

  return (
    <div className='m-2 p-2 shadow-xl bg-grey-100 rounded-xl w-fix'>
      <button className='w-full p-1 hover:bg-secondary-lighter outline-none rounded-lg flex items-center space-x-2'>
        <p className='text-start text-sm text-primary-main whitespace-nowrap'>
          View Profile
        </p>
      </button>
      <button
        onClick={() => {
          dispatch(
            FriendEventEmit.un_friend({
              friendId: friendId,
              fromId: clientId
            })
          )
        }}
        className='w-full p-1 hover:bg-error-lighter outline-none rounded-lg flex items-center space-x-2'
      >
        <p className='text-start text-sm text-error-main whitespace-nowrap'>
          UnFriend
        </p>
      </button>
    </div>
  )
}
