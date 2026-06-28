import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Lightbox({ images, index, onClose, onNavigate }) {
  const touchStartX = useRef(null)
  const total = images.length

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft'  && index > 0)         onNavigate(index - 1)
      if (e.key === 'ArrowRight' && index < total - 1) onNavigate(index + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, total, onClose, onNavigate])

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const dx = touchStartX.current - e.changedTouches[0].clientX
    if (dx >  50 && index < total - 1) onNavigate(index + 1)
    if (dx < -50 && index > 0)         onNavigate(index - 1)
    touchStartX.current = null
  }

  const btnStyle = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    width: 56, height: 56, borderRadius: '50%',
    background: 'rgba(255,255,255,0.22)',
    backdropFilter: 'blur(6px)',
    border: '1.5px solid rgba(255,255,255,0.35)',
    color: '#fff', fontSize: 26, fontWeight: 700,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
    lineHeight: 1,
    userSelect: 'none',
    flexShrink: 0,
  }

  return createPortal(
    <div
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        position: 'fixed', inset: 0, zIndex: 30000,
        background: 'rgba(0,0,0,0.93)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Закрыть */}
      <button
        onClick={e => { e.stopPropagation(); onClose() }}
        style={{
          position: 'absolute', top: 16, right: 16,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)', border: 'none',
          color: '#fff', fontSize: 22, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >×</button>

      {/* ← */}
      {index > 0 && (
        <button
          onClick={e => { e.stopPropagation(); onNavigate(index - 1) }}
          style={{ ...btnStyle, left: 12 }}
        >←</button>
      )}

      {/* Фото */}
      <img
        src={images[index]}
        alt={`фото ${index + 1}`}
        onClick={e => e.stopPropagation()}
        draggable={false}
        style={{
          maxWidth: 'calc(100vw - 144px)',
          maxHeight: '85vh',
          objectFit: 'contain',
          borderRadius: 10,
          userSelect: 'none',
          pointerEvents: 'none',
          display: 'block',
        }}
      />

      {/* → */}
      {index < total - 1 && (
        <button
          onClick={e => { e.stopPropagation(); onNavigate(index + 1) }}
          style={{ ...btnStyle, right: 12 }}
        >→</button>
      )}

      {/* Счётчик */}
      <div style={{
        position: 'absolute', bottom: 24, left: 0, right: 0,
        textAlign: 'center',
        fontSize: 15, fontWeight: 600,
        color: 'rgba(255,255,255,0.75)',
        letterSpacing: '0.04em',
        pointerEvents: 'none',
      }}>
        {index + 1} / {total}
      </div>
    </div>,
    document.body
  )
}
