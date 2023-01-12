import React, { useState } from 'react'
import { m } from 'framer-motion'
import cx from 'classnames'

import Icon from '@components/icon'

const accordionAnim = {
  open: {
    opacity: 1,
    height: 'auto',
  },
  closed: {
    opacity: 0,
    height: 0,
  },
}

const Accordion = ({
  id,
  title,
  isOpen = false,
  isControlled = false,
  onToggle = () => {},
  className,
  children,
}) => {
  const [hasFocus, setHasFocus] = useState(isOpen)

  return (
    <div
      key={id}
      className={cx('w-full border-t', className)}
      data-name="accordion"
    >
      {!isControlled && (
        <button
          data-name="accordion-toggle"
          onClick={() => onToggle(id, !isOpen)}
          aria-expanded={isOpen}
          aria-controls={`accordion-${id}`}
          className={cx(
            'clean-btn flex w-full items-center justify-between bg-transparent px-0 py-16 text-left text-18 font-semibold leading-135'
            // { 'is-open': isOpen } // i dont think this is needed
          )}
        >
          {title}
          <div
            className={cx(
              'upside-down-animation relative ml-32 block h-12 w-12 flex-shrink-0 duration-300',
              {
                'rotate-180': isOpen,
              }
            )}
            data-name="accordion--icon"
          >
            <Icon className="block" name="Chevron Down" />
          </div>
        </button>
      )}

      <m.div
        id={`accordion-${id}`}
        className="overflow-hidden"
        data-name="accordion--content"
        initial={isOpen ? 'open' : 'closed'}
        animate={isOpen ? 'open' : 'closed'}
        variants={accordionAnim}
        transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
        onAnimationComplete={(v) => setHasFocus(v === 'open')}
      >
        <div
          className="m-0 max-w-2xl pb-48"
          data-name="accordion--inner"
          hidden={!isOpen && !hasFocus}
        >
          {children}
        </div>
      </m.div>
    </div>
  )
}

export default Accordion
