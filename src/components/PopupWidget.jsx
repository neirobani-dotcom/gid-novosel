import { useState, useEffect } from 'react'
import { companies } from '../data/companies'

export default function PopupWidget({ onGiftsClick }) {
  const totalGifts = companies.reduce((s, c) => s + c.giftAmount, 0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('popup_shown')) return
    const timer = setTimeout(() => {
      setVisible(true)
      sessionStorage.setItem('popup_shown', '1')
    }, 30000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  const handleClose = () => setVisible(false)
  const handleGifts = () => {
    setVisible(false)
    onGiftsClick()
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 20,
      zIndex: 999,
      width: 320,
      maxWidth: 'calc(100vw - 40px)',
      background: '#FFFFFF',
      borderRadius: 20,
      boxShadow: '0 16px 56px rgba(0,0,0,0.20), 0 4px 16px rgba(0,0,0,0.10)',
      animation: 'slideInUp 0.5s ease both',
      overflow: 'hidden',
    }}>
      <button
        onClick={handleClose}
        aria-label="Закрыть"
        style={{
          position: 'absolute',
          top: 12,
          right: 14,
          background: '#F5F5F5',
          border: 'none',
          borderRadius: '50%',
          width: 32,
          height: 32,
          fontSize: 16,
          color: '#6B6560',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
          zIndex: 1,
        }}
      >
        ✕
      </button>

      <div style={{ padding: '24px 20px 20px' }}>
        <div style={{ textAlign: 'center', fontSize: 52, marginBottom: 12, lineHeight: 1 }}>🎁</div>
        <h3 style={{
          fontSize: 18,
          fontWeight: 800,
          color: '#1A1816',
          textAlign: 'center',
          marginBottom: 10,
        }}>
          Подарки для новосёлов!
        </h3>
        <p style={{
          fontSize: 14,
          color: '#6B6560',
          lineHeight: 1.65,
          textAlign: 'center',
          marginBottom: 18,
        }}>
          Компании-партнёры Красноярска дарят подарки на сумму{' '}
          <strong style={{ color: '#E8621A' }}>{totalGifts.toLocaleString('ru-RU')} ₽</strong> — специально для тех,
          кто обустраивает новый дом
        </p>
        <button
          onClick={handleGifts}
          style={{
            display: 'block',
            width: '100%',
            background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '14px 0',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '-0.01em',
          }}
        >
          Смотреть подарки →
        </button>
      </div>
    </div>
  )
}
