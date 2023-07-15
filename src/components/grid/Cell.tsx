import classnames from 'classnames'

import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'
import { CharStatus } from '../../lib/statuses'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`
  const isHighContrast = false

  const classes = classnames(
  'xxshort:w-11 xxshort:h-11 border-[5px] mx-[15px] my-1 short:text-2xl short:w-12 short:h-12 w-[135px] h-[100px] border-solid flex items-center justify-center text-2xl font-bold rounded-xl dark:text-white',
    {
      'bg-[#232323]/50 border-[#232323] cell-animation':
        !status,
      'border-white': value && !status,
      'absent bg-[#FF0086] text-white border-[#232323]':
        status === 'absent',
      'correct bg-[#13E2BA] text-white border-[#232323]':
        status === 'correct' && !isHighContrast,
      'present bg-[#FFCB00] text-white border-[#232323]':
        status === 'present' && !isHighContrast,
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  return (
    <div className={classes} style={{
      animationDelay,
    }}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
