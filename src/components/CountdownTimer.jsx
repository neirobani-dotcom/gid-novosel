import { useState, useEffect, useRef } from 'react'

function getTimeLeft() {
  const now = new Date()
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
  const diff = Math.max(0, lastDay - now)
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

function getLastDay() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
}

function getMonthName() {
  const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
  return months[new Date().getMonth()]
}

function FadingNum({ value }) {
  const str = String(value).padStart(2, '0')
  const prevRef = useRef(str)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    if (prevRef.current === str) return
    setOpacity(0)
    const t = setTimeout(() => { setOpacity(1); prevRef.current = str }, 160)
    return () => clearTimeout(t)
  }, [str])

  return (
    <span style={{
      transition: 'opacity 0.16s ease',
      opacity,
      fontVariantNumeric: 'tabular-nums',
    }}>
      {str}
    </span>
  )
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      width: '100%',
      height: 44,
      background: '#E8621A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: '0 16px',
      boxSizing: 'border-box',
    }}>
      <span style={{
        color: 'rgba(255,255,255,0.92)',
        fontSize: 14,
        fontWeight: 400,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
        whiteSpace: 'nowrap',
        letterSpacing: '-0.01em',
      }}>
        🔥 Предложение до {getLastDay()} {getMonthName()}
      </span>

      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>•</span>

      <span style={{
        color: '#fff',
        fontSize: 16,
        fontWeight: 700,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}>
        <FadingNum value={time.days} /><span style={{ opacity: 0.6, margin: '0 1px' }}>д</span>
        <span style={{ opacity: 0.5, margin: '0 3px' }}>:</span>
        <FadingNum value={time.hours} /><span style={{ opacity: 0.6, margin: '0 1px' }}>ч</span>
        <span style={{ opacity: 0.5, margin: '0 3px' }}>:</span>
        <FadingNum value={time.minutes} /><span style={{ opacity: 0.6, margin: '0 1px' }}>м</span>
        <span style={{ opacity: 0.5, margin: '0 3px' }}>:</span>
        <FadingNum value={time.seconds} /><span style={{ opacity: 0.6, margin: '0 1px' }}>с</span>
      </span>
    </div>
  )
}
