import { useState, useEffect } from 'react'

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

function Block({ value, label }) {
  const str = String(value).padStart(2, '0')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        background: '#1A1A1A',
        borderRadius: 12,
        padding: '10px 12px',
        minWidth: 64,
        textAlign: 'center',
        boxShadow: '0 0 20px rgba(255,215,0,0.25), 0 4px 16px rgba(0,0,0,0.45)',
        border: '1px solid rgba(255,215,0,0.2)',
        overflow: 'hidden',
      }}>
        <span
          key={str}
          style={{
            display: 'block',
            fontSize: 'clamp(36px, 9vw, 48px)',
            fontWeight: 900,
            color: '#FFD700',
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
            fontFamily: 'Inter, system-ui, sans-serif',
            animation: 'flipIn 0.3s ease',
          }}
        >
          {str}
        </span>
      </div>
      <span style={{
        fontSize: 11,
        fontWeight: 700,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 7,
        letterSpacing: '0.07em',
      }}>
        {label}
      </span>
    </div>
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
      background: 'linear-gradient(135deg, #E8621A 0%, #C0392B 100%)',
      borderRadius: 20,
      padding: '20px 16px',
      boxShadow: '0 8px 36px rgba(232,98,26,0.38)',
      maxWidth: 600,
      margin: '24px auto 0',
      width: '100%',
    }}>
      <p style={{
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: 600,
        marginBottom: 16,
        letterSpacing: '-0.01em',
      }}>
        🔥 Предложение действует до {getLastDay()} {getMonthName()}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <Block value={time.days}    label="ДНЕЙ" />
        <Colon />
        <Block value={time.hours}   label="ЧАСОВ" />
        <Colon />
        <Block value={time.minutes} label="МИНУТ" />
        <Colon />
        <Block value={time.seconds} label="СЕКУНД" />
      </div>
    </div>
  )
}

function Colon() {
  return (
    <span style={{
      color: '#FFD700',
      fontSize: 'clamp(24px, 6vw, 32px)',
      fontWeight: 900,
      paddingBottom: 22,
      lineHeight: 1,
      userSelect: 'none',
    }}>
      :
    </span>
  )
}
