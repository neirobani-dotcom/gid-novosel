import { useState, useEffect, useRef } from 'react'

const CHARS = '0123456789ABCDEFXZアイウエガギズネノ#$%&@*!?'

export default function MatrixText({ text, className }) {
  const [display, setDisplay] = useState(() =>
    text.split('').map(c => (c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)])).join('')
  )
  const iterRef = useRef(0)
  const idRef = useRef(null)

  const startEffect = () => {
    clearInterval(idRef.current)
    iterRef.current = 0
    idRef.current = setInterval(() => {
      iterRef.current += 0.3
      const iter = iterRef.current
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i < iter) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      if (iter >= text.length) {
        clearInterval(idRef.current)
        setDisplay(text)
      }
    }, 35)
  }

  useEffect(() => {
    const t = setTimeout(startEffect, 300)
    return () => { clearTimeout(t); clearInterval(idRef.current) }
  }, [])

  return (
    <span
      className={className}
      onMouseEnter={startEffect}
      onClick={startEffect}
      style={{ cursor: 'pointer', userSelect: 'none' }}
    >
      {display}
    </span>
  )
}
