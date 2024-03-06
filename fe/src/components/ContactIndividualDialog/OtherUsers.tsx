import { ReactElement, useEffect } from 'react'
import defaultAvatar from '@/assets/default-avatar.svg'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { ContactUser, thunkFetchOthers } from '@/redux/slice/individualContact'
import ScrollArea from '../ScrollArea'
import {
  emitAcceptFriendRequestEvent,
  emitAddNewFriendEvent
} from '@/realtime/friend.event'
import { PopoverUI, side } from '../ui/Popover'

function OtherUsers() {
  const dispatch = useAppDispatch()

  const { others } = useAppSelector((state) => state.individualContact)

  useEffect(() => {
    dispatch(thunkFetchOthers())
  }, [dispatch])

  return (
    <ScrollArea maxHeight={'150px'}>
      <div className='p-4 space-y-2'>
        {others.map((other: ContactUser) => (
          <OtherUser key={other._id} {...other} />
        ))}
      </div>
    </ScrollArea>
  )
}

export default OtherUsers

type PropsType = {
  _id: string
  avatar?: string
  firstName: string
  lastName: string
  online?: boolean
  isFriend?: boolean
  isSentFriendRequest?: boolean
  wantToMakeFriend?: boolean
  friendshipRequestId?: string
}

function OtherUser({
  _id,
  avatar,
  firstName,
  lastName,
  online,
  isFriend,
  isSentFriendRequest,
  wantToMakeFriend,
  friendshipRequestId
}: PropsType): ReactElement {
  const avatarUri = avatar ? `url(${avatar})` : `url(${defaultAvatar})`
  const { clientId } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const handleAddNewFriendClick = () => {
    dispatch(
      emitAddNewFriendEvent({
        from: clientId,
        to: _id
      })
    )
  }

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
        <div className='w-full flex items-center px-1 justify-between'>
          <h3 className='text-sm font-bold'>{firstName + ' ' + lastName}</h3>
          {!isFriend && !isSentFriendRequest && !wantToMakeFriend && (
            <button
              className='text-sm italic p-2 rounded-full outline-none text-primary-main hover:bg-secondary-lighter'
              onClick={handleAddNewFriendClick}
            >
              add friend
            </button>
          )}

          {!isFriend && isSentFriendRequest && (
            <p className='text-sm italic text-grey-500'>sent friend request</p>
          )}

          {!isFriend && wantToMakeFriend && friendshipRequestId && (
            <PopoverUI
              side={side.right}
              Trigger={
                <button className='flex p-2 rounded-full hover:bg-grey-300 items-center text-sm italic text-grey-500'>
                  want to make friend
                </button>
              }
              Content={
                <FriendRequestOption friendRequestId={friendshipRequestId} />
              }
            />
          )}

          {isFriend && <p className='text-sm italic text-grey-500'>friend</p>}
        </div>
      </div>
    </div>
  )
}

function FriendRequestOption({
  friendRequestId
}: {
  friendRequestId: string
}): ReactElement {
  const dispatch = useAppDispatch()

  return (
    <div className='m-2 p-2 shadow-xl bg-grey-100 rounded-xl w-fix'>
      <button
        onClick={() => {
          console.log('helow world')
          dispatch(
            emitAcceptFriendRequestEvent({
              friendRequestId: friendRequestId
            })
          )
        }}
        className='w-full p-1 hover:bg-secondary-lighter outline-none rounded-lg flex items-center space-x-2'
      >
        <p className='text-start text-sm text-primary-main whitespace-nowrap'>
          Accept
        </p>
      </button>
      <button className='w-full p-1 hover:bg-error-lighter outline-none rounded-lg flex items-center space-x-2'>
        <p className='text-start text-sm text-error-main whitespace-nowrap'>
          Delete
        </p>
      </button>
    </div>
  )
}
