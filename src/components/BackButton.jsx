import { useState, useEffect } from 'react'

function getPath() {
  return window.location.pathname
}

export default function BackButton() {
  const [path, setPath] = useState(getPath)

  useEffect(() => {
    const update = () => setPath(getPath())
    window.addEventListener('popstate', update)
    window.addEventListener('gid:navigate', update)
    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener('gid:navigate', update)
    }
  }, [])

  if (path === '/') return null

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }

  return (
    <button
      onClick={handleBack}
      title="Назад"
      onMouseEnter={e => {
        e.currentTarget.style.background = '#c9541a'
        e.currentTarget.style.width = '54px'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#E8621A'
        e.currentTarget.style.width = '48px'
      }}
      style={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        width: 48,
        height: 48,
        borderRadius: '0 28px 28px 0',
        background: '#E8621A',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '2px 4px 12px rgba(232,98,26,0.4)',
        transition: 'background 0.2s ease, width 0.2s ease',
        color: '#fff',
        fontSize: 22,
        fontWeight: 900,
        letterSpacing: '-2px',
        paddingLeft: 6,
      }}
    >
      ‹‹
    </button>
  )
}
