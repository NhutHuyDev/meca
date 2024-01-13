import clsx from 'clsx'
import { DotsThreeVertical, Download, Image } from 'phosphor-react'
import { ReactElement } from 'react'
import { PopoverUI, align } from '../ui/Popover'
import { Message_options } from '@/data'

type PropTypes = {
  text?: string
  message?: string
  reply?: string
  img?: string
  preview?: string
  incoming?: boolean
}

function TextMsg({ message, incoming }: PropTypes): ReactElement {
  return (
    <div
      className={clsx(
        'w-full h-fit flex items-start relative justify-start',
        `${incoming ? '' : 'justify-start flex-row-reverse'}`
      )}
    >
      <div
        className={clsx(
          'rounded-xl p-2 text-grey-700',
          `${incoming ? 'bg-grey-300' : 'bg-secondary-lighter'}`
        )}
      >
        <p>{message}</p>
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

function ImgMsg({ message, img, incoming }: PropTypes): ReactElement {
  return (
    <div
      className={clsx(
        'w-full h-fit flex items-start justify-start',
        `${incoming ? '' : 'flex-row-reverse'}`
      )}
    >
      <div
        className={clsx(
          'rounded-xl overflow-hidden w-fit h-fit text-grey-700',
          `${incoming ? 'bg-grey-300' : 'bg-secondary-lighter'}`
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

function ReplyMsg({ message, reply, incoming }: PropTypes): ReactElement {
  return (
    <div
      className={clsx(
        'w-full h-fit flex items-start relative justify-start',
        `${incoming ? '' : 'flex-row-reverse'}`
      )}
    >
      <div
        className={clsx(
          'rounded-xl overflow-hidden w-fit h-fit p-2 text-grey-700',
          `${incoming ? 'bg-grey-300' : 'bg-secondary-lighter'}`
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

function LinkMsg({ message, preview, incoming }: PropTypes): ReactElement {
  return (
    <div
      className={clsx(
        'w-full h-fit flex items-start relative justify-start',
        `${incoming ? '' : 'flex-row-reverse'}`
      )}
    >
      <div
        className={clsx(
          'rounded-xl overflow-hidden w-fit h-fit p-2 text-grey-700',
          `${incoming ? 'bg-grey-300' : 'bg-secondary-lighter'}`
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

function FileMsg({ message, incoming }: PropTypes): ReactElement {
  return (
    <div
      className={clsx(
        'w-full h-fit flex items-start relative justify-start',
        `${incoming ? '' : 'flex-row-reverse'}`
      )}
    >
      <div
        className={clsx(
          'rounded-xl p-2 text-grey-700',
          `${incoming ? 'bg-grey-300' : 'bg-secondary-lighter'}`
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
