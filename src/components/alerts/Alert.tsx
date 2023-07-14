import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment } from 'react'

type Props = {
  isOpen: boolean
  message: string
  variant?: 'success' | 'error'
  topMost?: boolean
}

export const Alert = ({
  isOpen,
  message,
  variant = 'error',
  topMost = false,
}: Props) => {
  const classes = classNames(
    'absolute z-20 top-[-12.7%] left-[50%] transform -translate-x-1/2 border-[2px] border-solid max-w-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
    {
      'text-[#FF0086] border-[#FF0086] bg-[#232323] text-white': variant === 'error',
      'text-[#13E2BA] border-[#13E2BA] bg-[#232323] text-white': variant === 'success',
    }
  )

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={classes}>
        <div className="p-2">
          <p style={{fontWeight: '900', letterSpacing: '1px'}} className="with-tommy uppercase text-center text-sm">{message}</p>
        </div>
      </div>
    </Transition>
  )
}
