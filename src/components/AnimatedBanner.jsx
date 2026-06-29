import { useState, useEffect, useRef } from 'react'

const VIDEOS = [
  { src: '/videos/proklimat2.mp4', label: 'ПроКлимат' },
  { src: '/videos/tas.mp4',        label: 'Академия штор ТАС' },
]

// ── СКРЫТО — логотипы партнёров (оставлены для возврата) ──
const _slides = [
  { icon: '🏠', title: 'ГИД НОВОСЁЛА',    subtitle: 'Всё для вашего нового дома — в одном месте',             logo: '/site-logo.png',                    initials: 'ГН', color: '#E8621A' },
  { icon: '🛋️', title: 'СИБМЕБЕЛЬ',        subtitle: 'Шкафы-купе и кухни на заказ — скидки для новосёлов',    logo: '/partners/sibmebel/logo.jpeg',       initials: 'СМ', color: '#1A3A5C' },
  { icon: '🪟', title: 'ОЛКОН',            subtitle: 'Окна и балконы — 15 000 ₽ в подарок',                   logo: '/partners/olkon/logo.png',           initials: 'ОЛ', color: '#2D7A2D' },
  { icon: '🚪', title: 'СМД',              subtitle: 'Царговые двери — 3 000 ₽ за каждое полотно',            logo: '/partners/smd/logo.jpeg',            initials: 'СМД', color: '#5D4037' },
  { icon: '🎨', title: 'АКАДЕМИЯ ШТОР',    subtitle: 'Шторы и карнизы — 10 000 ₽ в подарок',                 logo: '/partners/tac/logo.jpeg',            initials: 'АШ', color: '#6B3FA0' },
  { icon: '🛁', title: 'ШАТУРА',           subtitle: 'Мебель для дома — скидки для новосёлов',                logo: '/partners/shatura/logo.jpg',         initials: 'ШТ', color: '#8B4513' },
  { icon: '🧠', title: 'НЕЙРОБАНЯ',        subtitle: '4-й час бани бесплатно + бизнес-консультация',          logo: '/partners/neirobanya/logo.png',      initials: 'НБ', color: '#1A1A2E' },
  { icon: '🚗', title: 'АВТО В РАССРОЧКУ', subtitle: 'Автомобиль без банков и переплат — от 0%',             logo: '/partners/avto/logo.jpeg',           initials: 'АР', color: '#1A3A6B' },
  { icon: '🔧', title: 'ИРБИС',            subtitle: 'Кузовной ремонт — 5-й элемент бесплатно',              logo: '/partners/irbis/logo.jpeg',          initials: 'ИР', color: '#1A3A6B' },
  { icon: '🍳', title: 'КУХНИ ШИК',        subtitle: 'Кухни на заказ — до 30 000 ₽ в подарок',              logo: null,                                 initials: 'КШ', color: '#C0392B' },
  { icon: '✨', title: 'ГИД НОВОСЁЛА',     subtitle: '53 ЖК Красноярска · 10 партнёров · Все подарки бесплатно', logo: '/site-logo.png',                 initials: 'ГН', color: '#E8621A' },
]

export default function AnimatedBanner() {
  const [idx, setIdx]     = useState(0)
  const [muted, setMuted] = useState(true)
  const videoRefs = useRef([])

  useEffect(() => {
    const iv = setInterval(() => {
      setIdx(i => (i + 1) % VIDEOS.length)
    }, 15000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === idx) {
        v.currentTime = 0
        v.play().catch(() => {})
      }
    })
  }, [idx])

  useEffect(() => {
    videoRefs.current.forEach(v => { if (v) v.muted = muted })
  }, [muted])

  const goTo = (i) => setIdx(i)

  return (
    <div style={{ padding: '12px 16px 0', maxWidth: 640, margin: '0 auto' }}>

      <div className="pb-screen" style={{
        position: 'relative',
        width: '100%',
        background: '#0d0d0d',
        borderRadius: 20,
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: '"Montserrat", -apple-system, sans-serif',
      }}>

        {/* ── ВИДЕО ── */}
        {VIDEOS.map((v, i) => (
          <video
            key={i}
            ref={el => { videoRefs.current[i] = el }}
            src={v.src}
            autoPlay={i === 0}
            muted
            loop
            playsInline
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: i === idx ? 1 : 0,
              transition: 'opacity 0.6s ease',
              zIndex: 1,
            }}
          />
        ))}

        {/* ── Кнопка звука ── */}
        <button
          onClick={() => setMuted(m => !m)}
          style={{
            position: 'absolute', top: 12, right: 12, zIndex: 4,
            width: 36, height: 36, borderRadius: '50%', border: 'none',
            background: 'rgba(0,0,0,0.5)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, backdropFilter: 'blur(4px)',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.75)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
          title={muted ? 'Включить звук' : 'Выключить звук'}
        >
          {muted ? '🔇' : '🔊'}
        </button>

        {/* ── Подпись партнёра — нижний левый угол ── */}
        <div style={{
          position: 'absolute', bottom: 36, left: 16,
          zIndex: 3,
          background: 'rgba(0,0,0,0.45)',
          borderRadius: 8, padding: '4px 12px',
        }}>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em' }}>
            {VIDEOS[idx].label}
          </span>
        </div>

        {/* ── Точки-навигация ── */}
        <div style={{
          position: 'absolute', bottom: 10, left: 0, right: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 3, zIndex: 3,
        }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {VIDEOS.map((_, i) => (
              <div key={i} onClick={() => goTo(i)} style={{
                width: i === idx ? 20 : 8,
                height: 8,
                borderRadius: 4,
                background: i === idx ? '#fff' : 'rgba(255,255,255,0.35)',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                cursor: 'pointer',
              }} />
            ))}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '1px' }}>Листай →</span>
        </div>

      </div>
    </div>
  )
}
