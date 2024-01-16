import { ArrowDownLeft, ArrowUpRight, Phone } from 'phosphor-react'
import { ReactElement } from 'react'

type PropsType = {
  id?: string
  img: string
  name: string
  online: boolean
  time: string
  missed: boolean
  incomming: boolean
}

function CallLog({
  img,
  name,
  online,
  time,
  missed,
  incomming
}: PropsType): ReactElement {
  const bgUrl = `url(${img})`

  return (
    <div
      className='h-fit p-3 rounded-2xl bg-common-white 
    flex justify-center items-center gap-3'
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
      <div className='w-full flex justify-between items-center pr-4'>
        <div>
          <h3 className='text-sm font-bold'>{name}</h3>
          <div className='text-xs flex gap-1 items-center mt-1'>
            {incomming ? (
              <ArrowDownLeft
                fontSize={16}
                className={
                  'text-lg ' + missed ? 'text-error-main' : 'text-success-main'
                }
              />
            ) : (
              <ArrowUpRight
                fontSize={16}
                className={
                  'text-lg ' +
                  `${missed ? 'text-error-main' : 'text-success-main'}`
                }
              />
            )}{' '}
            <span className='font-semibold'>{time}</span>
          </div>
        </div>

        <Phone fontSize={20} />
      </div>
    </div>
  )
}

export default CallLog
