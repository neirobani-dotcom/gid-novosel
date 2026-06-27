import { useState, useEffect, useRef } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const ringRef = useRef({ x: -100, y: -100 })
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 })
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: -100, y: -100 })

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  useEffect(() => {
    if (window.innerWidth < 768) return

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove)

    const lerp = (a, b, f) => a + (b - a) * f
    const animate = () => {
      ringRef.current.x = lerp(ringRef.current.x, mouseRef.current.x, 0.12)
      ringRef.current.y = lerp(ringRef.current.y, mouseRef.current.y, 0.12)
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)
    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  const dotSize = hovering ? 12 : 8
  const ringSize = hovering ? 50 : 36

  return (
    <>
      {/* Точка */}
      <div style={{
        position: 'fixed',
        left: pos.x - dotSize / 2,
        top: pos.y - dotSize / 2,
        width: dotSize,
        height: dotSize,
        borderRadius: '50%',
        background: '#E8621A',
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'width 0.2s, height 0.2s',
      }} />
      {/* Кольцо */}
      <div style={{
        position: 'fixed',
        left: ringPos.x - ringSize / 2,
        top: ringPos.y - ringSize / 2,
        width: ringSize,
        height: ringSize,
        borderRadius: '50%',
        border: `2px solid ${hovering ? 'rgba(232,98,26,0.8)' : 'rgba(232,98,26,0.5)'}`,
        background: 'transparent',
        pointerEvents: 'none',
        zIndex: 99998,
        transition: 'width 0.2s, height 0.2s, border-color 0.2s',
      }} />
    </>
  )
}
