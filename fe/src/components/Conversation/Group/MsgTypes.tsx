import clsx from 'clsx'
import { DotsThreeVertical, Download, Image } from 'phosphor-react'
import { ReactElement } from 'react'
import { PopoverUI, align } from '@/components/ui/Popover'
import { Message_options } from '@/data'
import { diffBetweenDateAndNow } from '@/utils/diffBetweenDates'
import { useAppSelector } from '@/hooks/redux'
import defaultAvatar from '@/assets/default-avatar.svg'
import { ContactUser } from '@/types/user.types'

type PropTypes = {
  text?: string
  message?: string
  reply?: string
  img?: string
  preview?: string
  senderId?: string
  createdAt?: string
  isLastMessage?: boolean
}

function TextMsg({
  message,
  senderId,
  createdAt,
  isLastMessage
}: PropTypes): ReactElement {
  const { currentFroms } = useAppSelector((state) => state.chatGroup)
  const { clientId } = useAppSelector((state) => state.auth)

  const sender = currentFroms.filter(
    (user: ContactUser) => user._id === senderId
  )[0] as ContactUser

  const senderAvatar = sender.avatar || defaultAvatar

  const { statusLastMessage } = useAppSelector((state) => state.chatGroup)

  return (
    <>
      <div
        className={clsx(
          'w-3/4 h-fit flex flex-col items-start relative justify-start space-y-2',
          `${
            clientId !== senderId
              ? ''
              : 'justify-start flex-row-reverse ml-auto'
          }`
        )}
      >
        {clientId !== senderId && (
          <div className='flex space-x-2 items-center'>
            <img className='w-4 h-4' src={senderAvatar} />
            <span className='text-sm text-grey-500'>{sender.lastName}</span>
          </div>
        )}

        <div
          className={`flex w-full
        ${clientId !== senderId ? '' : 'flex-row-reverse'}`}
        >
          <div className='flex flex-col space-y-2'>
            <div
              className={clsx(
                'rounded-xl p-2 text-grey-700',
                `${
                  clientId !== senderId ? 'bg-grey-300' : 'bg-secondary-lighter'
                }`
              )}
            >
              <p>{message}</p>
              <span className='text-xs text-grey-500 italic'>
                {createdAt && diffBetweenDateAndNow(createdAt)}
              </span>
            </div>
            {isLastMessage &&
              clientId === senderId &&
              (statusLastMessage > 0 ? (
                <p
                  className='w-fit text-grey-600 text-right text-sm italic p-1 
              px-2 rounded-lg bg-grey-300'
                >
                  {statusLastMessage + ' seen'}
                </p>
              ) : (
                <p
                  className='w-fit text-grey-600 text-right text-sm italic p-1 
          px-2 rounded-lg bg-grey-300'
                >
                  {'sent'}
                </p>
              ))}
          </div>

          <PopoverUI
            align={align.start}
            Trigger={
              <div className='cursor-pointer'>
                <DotsThreeVertical />
              </div>
            }
            Content={<MessageOptions />}
          />
        </div>
      </div>
    </>
  )
}

function ImgMsg({ message, img, senderId }: PropTypes): ReactElement {
  return (
    <div
      className={clsx(
        'w-full h-fit flex items-start justify-start',
        `${senderId === '' ? '' : 'flex-row-reverse'}`
      )}
    >
      <div
        className={clsx(
          'rounded-xl overflow-hidden w-fit h-fit text-grey-700',
          `${senderId === '' ? 'bg-grey-300' : 'bg-secondary-lighter'}`
        )}
      >
        <img src={img} alt='image message' className='max-w-[410px] h-auto' />
        <p className='pt-1 pb-2 px-2'>{message}</p>
      </div>
      <PopoverUI
        align={align.start}
        Trigger={
          <div className='cursor-pointer'>
            <DotsThreeVertical />
          </div>
        }
        Content={<MessageOptions />}
      />
    </div>
  )
}

function ReplyMsg({ message, reply, senderId }: PropTypes): ReactElement {
  return (
    <div
      className={clsx(
        'w-full h-fit flex items-start relative justify-start',
        `${senderId === '' ? '' : 'flex-row-reverse'}`
      )}
    >
      <div
        className={clsx(
          'rounded-xl overflow-hidden w-fit h-fit p-2 text-grey-700',
          `${senderId === '' ? 'bg-grey-300' : 'bg-secondary-lighter'}`
        )}
      >
        <div className='space-y-2'>
          <p className='p-2 rounded-lg text-grey-700 bg-common-white'>
            {message}
          </p>
          <p>{reply}</p>
        </div>
      </div>
      <PopoverUI
        align={align.start}
        Trigger={
          <div className='cursor-pointer'>
            <DotsThreeVertical />
          </div>
        }
        Content={<MessageOptions />}
      />
    </div>
  )
}

function LinkMsg({ message, preview, senderId }: PropTypes): ReactElement {
  return (
    <div
      className={clsx(
        'w-full h-fit flex items-start relative justify-start',
        `${senderId === '' ? '' : 'flex-row-reverse'}`
      )}
    >
      <div
        className={clsx(
          'rounded-xl overflow-hidden w-fit h-fit p-2 text-grey-700',
          `${senderId === '' ? 'bg-grey-300' : 'bg-secondary-lighter'}`
        )}
      >
        <div className='space-y-3'>
          <img
            src={preview}
            alt='image preview'
            className='max-w-[410px] h-auto rounded-xl'
          />
          <p className='font-semibold'>Enjoy Your Day</p>
          <a
            href='https://www.youtube.com/'
            target='_blank'
            className='underline text-primary-main'
          >
            www.youtube.com
          </a>
          <p>{message}</p>
        </div>
      </div>
      <PopoverUI
        align={align.start}
        Trigger={
          <div className='cursor-pointer'>
            <DotsThreeVertical />
          </div>
        }
        Content={<MessageOptions />}
      />
    </div>
  )
}

function FileMsg({ message, senderId }: PropTypes): ReactElement {
  return (
    <div
      className={clsx(
        'w-full h-fit flex items-start relative justify-start',
        `${senderId === '' ? '' : 'flex-row-reverse'}`
      )}
    >
      <div
        className={clsx(
          'rounded-xl p-2 text-grey-700',
          `${senderId === '' ? 'bg-grey-300' : 'bg-secondary-lighter'}`
        )}
      >
        <button className='flex items-center gap-3 bg-common-white p-2 rounded-lg'>
          <Image size={38} />
          <p>finalReport.word</p>
          <Download size={18} />
        </button>
        <p className='mt-1'>{message}</p>
      </div>
      <PopoverUI
        align={align.start}
        Trigger={
          <div className='cursor-pointer'>
            <DotsThreeVertical />
          </div>
        }
        Content={<MessageOptions />}
      />
    </div>
  )
}

function Timeline({ text }: PropTypes): ReactElement {
  return (
    <div className='w-full h-fit flex justify-center items-center gap-3'>
      <span style={{ height: '0.5px' }} className='w-5/12 bg-divider '></span>
      <span className='text-sm text-grey-600'>{text}</span>
      <span style={{ height: '0.5px' }} className='w-5/12 bg-divider '></span>
    </div>
  )
}

function MessageOptions(): ReactElement {
  return (
    <div className='m-2 p-3 bg-grey-100 rounded-xl w-44'>
      {Message_options.map((option, index) => (
        <button
          key={index}
          className='w-full p-2 hover:bg-grey-300 outline-none rounded-lg'
        >
          <p className='text-start whitespace-nowrap'>{option.title}</p>
        </button>
      ))}
    </div>
  )
}

export { TextMsg, Timeline, ImgMsg, ReplyMsg, LinkMsg, FileMsg }
