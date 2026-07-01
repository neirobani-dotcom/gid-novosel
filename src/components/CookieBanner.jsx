import { useState } from 'react'

const KEY = 'gid_cookie_accepted'

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(KEY))

  if (!visible) return null

  const accept = () => {
    localStorage.setItem(KEY, '1')
    setVisible(false)
  }

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      zIndex: 9000,
      background: 'rgba(26,24,22,0.97)',
      backdropFilter: 'blur(8px)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '14px 20px',
      display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12,
      justifyContent: 'space-between',
      fontFamily: '"Montserrat", system-ui, sans-serif',
    }}>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.5, flex: '1 1 260px' }}>
        Мы используем файлы cookie и обрабатываем персональные данные в соответствии с{' '}
        <a href="/privacy" style={{ color: '#E8621A', textDecoration: 'underline' }}>
          политикой конфиденциальности
        </a>.
      </p>
      <button
        onClick={accept}
        style={{
          flexShrink: 0, padding: '10px 24px', borderRadius: 10, border: 'none',
          background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
          color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          transition: 'filter 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.9)'}
        onMouseLeave={e => e.currentTarget.style.filter = ''}
      >
        Принять
      </button>
    </div>
  )
}
