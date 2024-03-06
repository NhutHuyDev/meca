import { useAppDispatch } from '@/hooks/redux'
import { setChatOneToOneId } from '@/redux/slice/chatOneToOne'
import { ReactElement } from 'react'

type PropsType = {
  id: string
  img: string
  name: string
  msg: string
  time: string
  unread: number
  online: boolean
}

function Chat({
  id,
  img,
  name,
  msg,
  time,
  unread,
  online
}: PropsType): ReactElement {
  const dispatch = useAppDispatch()

  const bgUrl = `url(${img})`

  const handleChatOnClick = () => {
    dispatch(
      setChatOneToOneId({
        chatOneToOneId: id
      })
    )
  }

  return (
    <div
      className='h-fit p-3 rounded-2xl bg-common-white 
    flex justify-center items-center gap-3 cursor-pointer'
      onClick={handleChatOnClick}
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
        style={{ backgroundImage: bgUrl }}
      ></div>
      <div className='w-full'>
        <div className='w-full flex justify-between'>
          <h3 className='text-sm font-bold'>{name}</h3>
          <span className='text-xs text-grey-700'>{time}</span>
        </div>
        <div className='text-xs flex justify-between items-center'>
          <p className='max-w-[180px] truncate text-ellipsis'>{msg}</p>
          {unread > 0 && (
            <span
              className='flex-shrink-0 text-[8px] text-center
              p-1 h-6 w-6 rounded-full 
          bg-secondary-main text-info-contrastText'
            >
              {unread}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chat
