import { ReactNode } from 'react'

const Divider = ({
  children,
  rootStyle
}: {
  children?: ReactNode
  rootStyle?: string
}) => (
  <div className={`w-full ${children && 'gap-2'}`}>
    <div
      className={`w-5/6 flex justify-center items-center m-auto ${rootStyle}`}
    >
      <span
        style={{ height: '0.5px' }}
        className='block w-full bg-grey-300'
      ></span>
      {children && <span className='text-divider p-2'>{children}</span>}
      <span
        style={{ height: '0.5px' }}
        className='block w-full bg-grey-300'
      ></span>
    </div>
  </div>
)

export default Divider
