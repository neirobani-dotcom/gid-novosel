import { useState, useEffect, useRef } from 'react'

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'
const TEXT = 'Гид Новосёла'

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export default function MatrixTitle({ className }) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const [letters, setLetters] = useState(() =>
    Array.from(TEXT).map(char => ({ char, current: char === ' ' ? ' ' : randomChar(), final: false }))
  )
  const [showCanvas, setShowCanvas] = useState(true)
  const [canvasOpacity, setCanvasOpacity] = useState(1)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const timers = []

    canvas.width = wrap.offsetWidth || 300
    canvas.height = wrap.offsetHeight || 80

    const ctx = canvas.getContext('2d')
    const colSize = 14
    const columns = Math.floor(canvas.width / colSize)
    const drops = Array.from({ length: columns }, () =>
      Math.random() * (canvas.height / colSize)
    )

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${colSize}px monospace`

      drops.forEach((y, i) => {
        const x = i * colSize
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y * colSize)
        ctx.fillStyle = '#00FF41'
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, (y - 1) * colSize)
        ctx.fillStyle = '#003B00'
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, (y - 3) * colSize)
        drops[i] += Math.random() * 0.5 + 0.5
        if (drops[i] * colSize > canvas.height && Math.random() > 0.975) drops[i] = 0
      })
    }

    const rainInterval = setInterval(draw, 33)

    const t1 = setTimeout(() => {
      // Fade canvas
      let opacity = 1
      const fade = setInterval(() => {
        opacity -= 0.05
        setCanvasOpacity(Math.max(0, opacity))
        if (opacity <= 0) {
          clearInterval(fade)
          clearInterval(rainInterval)
          setShowCanvas(false)
        }
      }, 40)
      timers.push(fade)

      // Assemble letters
      const scrambleTimers = []
      Array.from(TEXT).forEach((finalChar, index) => {
        const lt = setTimeout(() => {
          if (finalChar === ' ') {
            setLetters(prev => prev.map((l, i) =>
              i === index ? { char: ' ', current: ' ', final: true } : l
            ))
            return
          }
          let count = 0
          const si = setInterval(() => {
            setLetters(prev => prev.map((l, i) =>
              i === index ? { ...l, current: CHARS[Math.floor(Math.random() * CHARS.length)] } : l
            ))
            count++
            if (count >= 8) {
              clearInterval(si)
              setLetters(prev => prev.map((l, i) =>
                i === index ? { char: finalChar, current: finalChar, final: true } : l
              ))
            }
          }, 25)
          scrambleTimers.push(si)
        }, index * 80)
        scrambleTimers.push(lt)
      })
      timers.push(...scrambleTimers)
    }, 2500)

    timers.push(t1)

    return () => {
      clearInterval(rainInterval)
      timers.forEach(t => { clearTimeout(t); clearInterval(t) })
      // Reset state for StrictMode re-run
      setShowCanvas(true)
      setCanvasOpacity(1)
      setLetters(Array.from(TEXT).map(char => ({ char, current: char === ' ' ? ' ' : randomChar(), final: false })))
    }
  }, [])

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'inline-block' }}>
      {showCanvas && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            opacity: canvasOpacity,
            pointerEvents: 'none',
            zIndex: 10,
            borderRadius: 4,
          }}
        />
      )}
      <span className={className} style={{ display: 'inline-block' }}>
        {letters.map((l, i) => (
          <span
            key={i}
            style={{
              color: l.final ? '#E8621A' : '#00FF41',
              fontFamily: l.final ? 'inherit' : 'monospace',
              display: 'inline-block',
              minWidth: l.char === ' ' ? '0.25em' : 'auto',
              transition: l.final ? 'color 0.3s ease' : 'none',
            }}
          >
            {l.current}
          </span>
        ))}
      </span>
    </div>
  )
}
