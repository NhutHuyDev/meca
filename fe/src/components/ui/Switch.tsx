import React, { ReactElement } from 'react'
import * as Switch from '@radix-ui/react-switch'
import clsx from 'clsx'

type PropsTypes = {
  checked: boolean
  onCheckedChange: React.Dispatch<React.SetStateAction<boolean>>
}

const SwitchUI = ({ checked, onCheckedChange }: PropsTypes): ReactElement => (
  <Switch.Root
    checked={checked}
    className={clsx(
      'w-10 h-6 bg-grey-500 rounded-full',
      'data-[state=checked]:bg-secondary-dark'
    )}
    onCheckedChange={() => onCheckedChange(!checked)}
  >
    <Switch.Thumb
      className={clsx(
        'block w-5 h-5 rounded-full',
        'bg-primary-contrastText shadow-lg',
        'translate-x-[2px]',
        'data-[state=checked]:translate-x-[18px]',
        'transition-transform'
      )}
    />
  </Switch.Root>
)

export default SwitchUI
