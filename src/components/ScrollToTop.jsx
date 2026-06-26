import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Наверх"
      style={{
        position: 'fixed',
        bottom: 30,
        right: 20,
        zIndex: 997,
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: '#E8621A',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, background 0.15s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#C0501A'}
      onMouseLeave={e => e.currentTarget.style.background = '#E8621A'}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4L3 11h4v5h6v-5h4L10 4z"/>
      </svg>
    </button>
  )
}
