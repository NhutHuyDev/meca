import { ReactNode, useEffect, useState } from 'react'

type PropsType = {
  children: ReactNode
  maxHeight: string
}

function ScrollArea({ children, maxHeight }: PropsType) {
  const [hideThumb, setHideThumb] = useState(true)

  useEffect(() => {
    if (!hideThumb) {
      const timeoutId = setTimeout(() => setHideThumb(true), 3000)

      return () => clearTimeout(timeoutId)
    }
  }, [hideThumb])

  return (
    <div className={`scroll-bar-wrap`}>
      <div
        className={hideThumb ? 'scroll-box hidden-thumb' : 'scroll-box'}
        style={{ height: maxHeight }}
        onScroll={() => setHideThumb(false)}
        onMouseMove={() => setHideThumb(false)}
      >
        {children}
      </div>
    </div>
  )
}

export default ScrollArea
