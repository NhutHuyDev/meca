import { ReactNode, useEffect, useState } from 'react'

type PropsType = {
  children: ReactNode
  maxHeight: string
  bgColor: string
}

function ScrollArea({ children, maxHeight, bgColor }: PropsType) {
  const [coverBar, setCoverBar] = useState('cover-bar')

  useEffect(() => {
    if (coverBar === 'cover-bar hidden') {
      const timeoutId = setTimeout(() => setCoverBar('cover-bar'), 3000)

      return () => clearTimeout(timeoutId)
    }
  }, [coverBar])

  return (
    <div className={`scroll-bar-wrap`}>
      <div
        className='scroll-box'
        style={{ height: maxHeight }}
        onScroll={() => setCoverBar('cover-bar hidden')}
        onMouseMove={() => setCoverBar('cover-bar hidden')}
      >
        {children}
      </div>
      <div className={coverBar + ' ' + bgColor}></div>
    </div>
  )
}

export default ScrollArea
