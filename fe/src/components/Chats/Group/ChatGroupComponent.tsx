import { ChatGroup } from '@/types/chat.types'
import { diffBetweenDateAndNow } from '@/utils/diffBetweenDates'
import { ReactElement } from 'react'
import defaultAvatar from '@/assets/default-avatar.svg'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setChatGroupId } from '@/redux/slice/chatGroup'

function ChatGroupComponent({
  _id,
  members,
  currentUnread,
  lastMessage
}: ChatGroup): ReactElement {
  const dispatch = useAppDispatch()

  const { chatGroupId } = useAppSelector((state) => state.chatGroup)

  const name = members.reduce((accumulator, currentValue) => {
    if (accumulator === '') {
      return currentValue.lastName
    } else {
      return accumulator + ', ' + currentValue.lastName
    }
  }, '')

  const imgMember1 = members[0].avatar || defaultAvatar
  const imgMember2 = members[1].avatar || defaultAvatar
  const imgMember3 = members[2].avatar || defaultAvatar

  const avatarGroup = (
    <div className='flex flex-col'>
      <div className='flex -mb-3'>
        <img className='h-7 w-7 -mr-3' src={imgMember1} />
        <img className='h-7 w-7' src={imgMember2} />
      </div>
      <div className={`flex ${members.length === 3 ? 'justify-center' : ''}`}>
        <img className='h-7 w-7 -mr-3' src={imgMember3} />
        {members.length > 3 ? (
          <div className='h-7 w-7 text-sm bg-grey-300 text-grey-600 rounded-full p-3 flex justify-center items-center'>
            <span>+{members.length - 3}</span>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )

  const handleChatOnClick = () => {
    dispatch(
      setChatGroupId({
        chatGroupId: _id
      })
    )
  }

  return (
    <div
      className={`min-h-[64px] p-2 px-3 rounded-2xl ${
        chatGroupId === _id ? 'bg-secondary-light' : 'bg-common-white'
      }
    flex space-x-2 items-center gap-3 cursor-pointer`}
      onClick={handleChatOnClick}
    >
      {avatarGroup}
      <div className='w-full'>
        <div className='w-full flex justify-between'>
          <h3 className='text-sm font-bold text-grey-700 truncate text-ellipsis max-w-[150px]'>
            {name}
          </h3>
          {lastMessage && (
            <span className='text-xs text-grey-700'>
              {diffBetweenDateAndNow(lastMessage.createdAt)}
            </span>
          )}
        </div>
        {lastMessage && (
          <div className='text-xs flex justify-between items-center'>
            <p className='max-w-[150px] truncate text-ellipsis'>
              {lastMessage.text}
            </p>
            {currentUnread > 0 && (
              <span
                className='flex-shrink-0 text-[8px] text-center
              p-1 h-6 w-6 rounded-full 
          bg-secondary-main text-info-contrastText'
              >
                {currentUnread}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatGroupComponent
