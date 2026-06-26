import { useState, useEffect, useRef } from 'react'

const getInitialVisitors = () => {
  const hour = new Date().getHours()
  if (hour >= 0 && hour < 7)  return Math.floor(Math.random() * 5)  + 3
  if (hour >= 7 && hour < 10) return Math.floor(Math.random() * 7)  + 8
  if (hour >= 10 && hour < 18) return Math.floor(Math.random() * 13) + 15
  if (hour >= 18 && hour < 22) return Math.floor(Math.random() * 15) + 20
  return Math.floor(Math.random() * 7) + 8
}

export default function VisitorCounter() {
  const saved = sessionStorage.getItem('gid_visitors')
  const [visitors, setVisitors] = useState(saved ? parseInt(saved) : getInitialVisitors())
  const [changing, setChanging] = useState(false)
  const prevRef = useRef(visitors)

  useEffect(() => {
    sessionStorage.setItem('gid_visitors', visitors.toString())
    if (visitors !== prevRef.current) {
      setChanging(true)
      const t = setTimeout(() => setChanging(false), 320)
      prevRef.current = visitors
      return () => clearTimeout(t)
    }
  }, [visitors])

  useEffect(() => {
    const schedule = () => {
      const delay = Math.random() * 20000 + 20000
      return setTimeout(() => {
        const hour = new Date().getHours()
        const isNight = hour >= 0 && hour < 7
        const maxV = isNight ? 10 : 40

        setVisitors(prev => {
          const rand = Math.random()
          if (rand < 0.4) return Math.min(prev + 1, maxV)
          if (rand < 0.8) return Math.max(prev - 1, 3)
          return prev
        })

        timerRef.current = schedule()
      }, delay)
    }

    const timerRef = { current: schedule() }
    return () => clearTimeout(timerRef.current)
  }, [])

  // редкий буст ±2
  useEffect(() => {
    const schedule = () => {
      const delay = Math.random() * 120000 + 180000
      return setTimeout(() => {
        const hour = new Date().getHours()
        const isNight = hour >= 0 && hour < 7
        const maxV = isNight ? 10 : 40

        setVisitors(prev => {
          const rand = Math.random()
          if (rand < 0.3) return Math.min(prev + 2, maxV)
          if (rand < 0.6) return Math.max(prev - 2, 3)
          return prev
        })

        timerRef.current = schedule()
      }, delay)
    }

    const timerRef = { current: schedule() }
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <div
      className="hero-sub"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        background: '#FFFFFF',
        border: '1px solid #EDE8E0',
        borderRadius: 20,
        padding: '8px 14px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        marginBottom: 16,
      }}
    >
      {/* Пульсирующая точка */}
      <span style={{
        width: 8, height: 8, borderRadius: '50%',
        background: '#22C55E', flexShrink: 0,
        animation: 'visitorPulse 2s ease-in-out infinite',
        display: 'inline-block',
      }} />

      <span style={{ fontSize: 13, color: '#666666' }}>Прямо сейчас смотрят</span>

      <span
        className={changing ? 'visitor-num changing' : 'visitor-num'}
        style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', minWidth: 20, textAlign: 'center' }}
      >
        {visitors}
      </span>

      <span style={{ fontSize: 13, color: '#666666' }}>человек</span>
    </div>
  )
}
