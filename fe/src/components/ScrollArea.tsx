import { ReactNode, useEffect, useRef, useState } from 'react'

type PropsType = {
  children: ReactNode
  maxHeight: string
  autoScrollBottom?: boolean
}

function ScrollArea({ children, maxHeight, autoScrollBottom }: PropsType) {
  const [hideThumb, setHideThumb] = useState(true)

  const scrollRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)

  const [childHeight, setChildHeight] = useState(childRef.current?.offsetHeight)

  useEffect(() => {
    if (!hideThumb) {
      const timeoutId = setTimeout(() => setHideThumb(true), 3000)

      return () => clearTimeout(timeoutId)
    }
  }, [hideThumb])

  useEffect(() => {
    setChildHeight(childRef.current?.offsetHeight)

    if (autoScrollBottom && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: childHeight,
        left: 0,
        behavior: 'instant'
      })
    }
  }, [childHeight, autoScrollBottom, children])

  return (
    <div className={`scroll-bar-wrap`}>
      <div
        ref={scrollRef}
        className={hideThumb ? 'scroll-box hidden-thumb' : 'scroll-box'}
        style={{ height: maxHeight }}
        onScroll={() => setHideThumb(false)}
        onMouseMove={() => setHideThumb(false)}
      >
        <div ref={childRef}>{children}</div>
      </div>
    </div>
  )
}

export default ScrollArea
