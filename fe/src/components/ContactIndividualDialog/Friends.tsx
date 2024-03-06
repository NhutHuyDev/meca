import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { ContactUser, thunkFetchFriends } from '@/redux/slice/individualContact'
import { useEffect } from 'react'
import ScrollArea from '../ScrollArea'
import { ReactElement } from 'react'
import defaultAvatar from '@/assets/default-avatar.svg'

function Friends() {
  const dispatch = useAppDispatch()

  const { friends } = useAppSelector((state) => state.individualContact)

  useEffect(() => {
    dispatch(thunkFetchFriends())
  }, [dispatch])

  return (
    <ScrollArea maxHeight={'150px'}>
      <div className='p-4 space-y-2'>
        {friends.map((friend: ContactUser) => (
          <Friend key={friend._id} {...friend} />
        ))}
      </div>
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
        <div className='w-full flex justify-between px-3'>
          <h3 className='text-sm font-bold'>{firstName + ' ' + lastName}</h3>
          <p className='text-sm italic text-grey-500'>friend</p>
        </div>
      </div>
    </div>
  )
}
