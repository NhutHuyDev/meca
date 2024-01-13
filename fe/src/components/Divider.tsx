import * as Separator from '@radix-ui/react-separator'

const Divider = () => (
  <Separator.Root
    className='bg-divider data-[orientation=horizontal]:h-px 
  data-[orientation=horizontal]:w-5/6 data-[orientation=vertical]:h-full 
  data-[orientation=vertical]:w-px my-[15px] mx-auto'
  />
)

export default Divider
