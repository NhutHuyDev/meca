import { useAppDispatch } from '@/hooks/redux'
import { updateSidebarType } from '@/redux/slice/app'
import { CaretLeft } from 'phosphor-react'
import { ReactElement } from 'react'
import ScrollArea from '../ScrollArea'
import { Chat_History } from '@/data'

function StarredMessage() {
  const dispatch = useAppDispatch()

  return (
    <div className='w-80 h-[100vh] shadow-inner flex flex-col'>
      <div className='p-6 bg-grey-200 text-grey-700 flex items-center gap-16'>
        <button
          onClick={() => {
            dispatch(updateSidebarType({ type: 'CONTACT' }))
          }}
        >
          <CaretLeft size={22} />
        </button>
        <p className='font-bold'>Starred Message</p>
      </div>

      <div className='flex-grow'>
        <ScrollArea maxHeight={'calc(100vh - 72px)'} bgColor='bg-common-white'>
          <div className='m-4'>
            {Chat_History.map((chat, index) => {
              return (
                chat.type === 'msg' && (
                  <StarredImgMsg
                    key={index}
                    img={chat.img}
                    message={chat.message}
                  />
                )
              )
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

type starredImgMsgProps = {
  img?: string
  message?: string
}

function StarredImgMsg({ img, message }: starredImgMsgProps): ReactElement {
  return (
    <div className='w-full space-y-3'>
      {img && (
        <div
          className='w-auto h-20 bg-contain bg-no-repeat bg-common-white'
          style={{ backgroundImage: `url(${img})` }}
        />
      )}
      <div className='col-span-3'>
        <span>{message}</span>
      </div>
    </div>
  )
}

export default StarredMessage
