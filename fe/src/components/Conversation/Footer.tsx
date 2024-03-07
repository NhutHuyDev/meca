import { Chat_Actions } from '@/data'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { LinkSimple, PaperPlaneTilt, Smiley } from 'phosphor-react'
import { ChangeEvent, ReactElement, useState } from 'react'
import { PopoverUI } from '@/components/ui/Popover'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { emitSendMessage } from '@/realtime/chat.event/emit.event'
import { ContactUser } from '@/redux/slice/individualContact'

function Footer({
  currentFrom,
  chatOneToOneId
}: {
  currentFrom?: ContactUser
  chatOneToOneId?: string
}): ReactElement {
  const dispatch = useAppDispatch()

  const { clientId } = useAppSelector((state) => state.auth)

  const [text, setText] = useState('')

  const handleEmojiPickerSelect = (emoji: TEmoji) => {
    console.log(emoji)

    setText((prev: string) => prev + emoji.native)
  }

  const handleSendMessageClick = () => {
    dispatch(
      emitSendMessage({
        chatOneToOne: chatOneToOneId,
        sender: clientId,
        recipient: currentFrom?._id,
        text: text,
        type: 'Text'
      })
    )
  }

  return (
    <div className='bg-grey-200 h-fit w-full px-3 py-2 flex gap-3 relative z-[99] shadow-inner'>
      <div className='w-full px-6 rounded-2xl bg-grey-300 flex items-center gap-3'>
        <PopoverUI
          Trigger={
            <button>
              <LinkSimple className='text-lg  text-grey-600' />
            </button>
          }
          Content={
            <div className={`absolute bottom-12 -left-6 block`}>
              <div className='w-fit flex flex-col space-y-4'>
                {Chat_Actions.map((action, index) => (
                  <div key={index} className='group gap-1 relative'>
                    <button className='p-3 rounded-full bg-primary-main hover:bg-secondary-dark text-common-white'>
                      {action.icon}
                    </button>
                    <span className='hidden group-hover:block absolute left-14 bottom-3 text-[10px] bg-grey-200 p-1 rounded-lg'>
                      {action.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        <input
          className='flex-grow py-3 focus:outline-none bg-grey-300 text-grey-600'
          type='text'
          placeholder='Typing...'
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value)
          }}
        />

        <PopoverUI
          Trigger={
            <button>
              <Smiley className='text-lg text-grey-600' />
            </button>
          }
          Content={
            <div className={`absolute bottom-10 -right-8 block`}>
              <Picker
                theme={'light'}
                data={data}
                previewPosition={'none'}
                onEmojiSelect={handleEmojiPickerSelect}
              />
            </div>
          }
        />
      </div>

      <button
        onClick={handleSendMessageClick}
        className=' bg-secondary-main rounded-2xl w-12 h-12 flex-shrink-0'
      >
        <PaperPlaneTilt className='text-common-white w-full' />
      </button>
    </div>
  )
}

export default Footer

type TEmoji = {
  id: string
  name: string
  native: string
}
