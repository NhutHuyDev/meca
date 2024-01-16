import { Phone, Camera } from 'phosphor-react'
import { ReactElement } from 'react'

type PropsType = {
  id?: string
  img?: string
  name?: string
  online?: boolean
}

function CallSelection({ img, name, online }: PropsType): ReactElement {
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
        <h3 className='text-sm font-bold'>{name}</h3>

        <div className='flex gap-3 items-center'>
          <Phone fontSize={20} className='text-success-main' />
          <Camera fontSize={20} className='text-success-main' />
        </div>
      </div>
    </div>
  )
}

export default CallSelection
