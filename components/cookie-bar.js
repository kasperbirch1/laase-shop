import React, { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import Cookies from 'js-cookie'

import { useHasMounted } from '@lib/helpers'

import CustomLink from '@components/link'

const barAnim = {
  show: {
    y: '0%',
    transition: {
      duration: 0.6,
      delay: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hide: {
    y: '100%',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const CookieBar = React.memo(({ data = {} }) => {
  const { enabled, message, link } = data

  if (!enabled) return null

  const hasMounted = useHasMounted()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()

  if (!hasMounted || !message) return null

  return (
    <AnimatePresence>
      {!acceptedCookies && (
        <FocusTrap
          focusTrapOptions={{
            allowOutsideClick: true,
            fallbackFocus: '#__next',
          }}
        >
          <m.div
            initial="hide"
            animate="show"
            exit="hide"
            variants={barAnim}
            role="dialog"
            aria-live="polite"
            className="fixed bottom-0 right-0 z-9 w-full max-w-3xl p-16"
            data-name="cookie-bar"
          >
            <div
              className="is-inverted grid items-center gap-24 rounded-xl border bg-pageText p-24 pb-16 text-pageBG sm:flex sm:p-24"
              data-name="cookie-bar-content"
            >
              <div
                className="flex-1 text-center sm:pr-32 sm:text-left"
                data-name="cookie-bar--message"
              >
                <p className="text-14 leading-150">
                  {message.split('\n').map((text, i) => {
                    // using React.fragment to parse line breaks
                    return (
                      <React.Fragment key={i}>
                        {text}
                        {message.split('\n')[i + 1] && <br />}
                      </React.Fragment>
                    )
                  })}
                </p>
              </div>

              <div
                className="grid flex-shrink-0 gap-8 sm:grid-cols-2 sm:items-center"
                data-name="cookie-bar--actions"
              >
                {link && (
                  <CustomLink
                    className="btn is-text"
                    link={{ ...{ page: link }, ...{ title: 'Learn More' } }}
                  />
                )}
                <button
                  onClick={() => onAcceptCookies()}
                  className="btn is-primary order-first sm:order-none"
                >
                  Accept
                </button>
              </div>
            </div>
          </m.div>
        </FocusTrap>
      )}
    </AnimatePresence>
  )
})

function useAcceptCookies(cookieName = 'accept_cookies') {
  const [acceptedCookies, setAcceptedCookies] = useState(true)

  useEffect(() => {
    if (!Cookies.get(cookieName)) {
      setAcceptedCookies(false)
    }
  }, [])

  const acceptCookies = () => {
    setAcceptedCookies(true)
    Cookies.set(cookieName, 'accepted', { expires: 365 })
  }

  return {
    acceptedCookies,
    onAcceptCookies: acceptCookies,
  }
}

export default CookieBar
