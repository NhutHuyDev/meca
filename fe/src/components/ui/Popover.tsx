import * as Popover from '@radix-ui/react-popover'
import { ReactNode } from 'react'

enum side {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left'
}

enum align {
  start = 'start',
  center = 'center',
  end = 'end'
}

enum sticky {
  partial = 'partial',
  always = 'always'
}

type PropsType = {
  Trigger: ReactNode
  Content: ReactNode
  side?: side
  align?: align
  sticky?: sticky
}

const PopoverUI = ({ Trigger, Content, side, align }: PropsType) => (
  <Popover.Root>
    <Popover.Trigger asChild>{Trigger}</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        side={side}
        align={align}
        hideWhenDetached={true}
        sticky={sticky.always}
      >
        {Content}
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
)

export { PopoverUI, align, side }
