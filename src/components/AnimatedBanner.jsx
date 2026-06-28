import { useState, useEffect } from 'react'

// ── Добавь нового партнёра сюда — он появится в анимации автоматически ──
const slides = [
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

// Частицы летят снизу вверх — детерминированные позиции
const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  x:        ((i * 4.7 + 2) % 94) + 3,
  startY:   85 + (i % 5) * 3,
  size:     3 + (i % 3),
  delay:    -(i * 0.55),
  duration: 7 + (i % 7) * 1.2,
  opacity:  0.2 + (i % 3) * 0.05,
}))

export default function AnimatedBanner() {
  const [idx, setIdx]         = useState(0)
  const [visible, setVisible] = useState(true)
  const [imgOk, setImgOk]     = useState(true)

  useEffect(() => {
    let tid
    const iv = setInterval(() => {
      setVisible(false)
      tid = setTimeout(() => {
        setIdx(i => (i + 1) % slides.length)
        setImgOk(true)
        setVisible(true)
      }, 500)
    }, 3500)
    return () => { clearInterval(iv); clearTimeout(tid) }
  }, [])

  const goTo = (i) => {
    setVisible(false)
    setTimeout(() => { setIdx(i); setImgOk(true); setVisible(true) }, 500)
  }

  const slide    = slides[idx]
  const showLogo = slide.logo && imgOk

  return (
    <div style={{ padding: '12px 16px 0', maxWidth: 640, margin: '0 auto' }}>

      {/* ── ПРЕМИУМ БАННЕР 2026 ── */}
      <div className="pb-screen" style={{
        position: 'relative',
        width: '100%',
        background: 'linear-gradient(160deg, #0d0d0d 0%, #1a0a00 100%)',
        borderRadius: 20,
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: '"Montserrat", -apple-system, sans-serif',
      }}>

        {/* CSS-сетка поверх фона */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.05,
          pointerEvents: 'none', zIndex: 1,
        }} />

        {/* Частицы — летят снизу вверх */}
        {PARTICLES.map((p, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.startY}%`,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: '#E8621A',
            opacity: p.opacity,
            animation: `pbFloat ${p.duration}s ${p.delay}s linear infinite`,
            pointerEvents: 'none', zIndex: 2,
          }} />
        ))}

        {/* ── Оранжевая шапка ── */}
        <div style={{
          position: 'relative', zIndex: 3,
          height: 36,
          background: '#E8621A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            color: '#fff', fontWeight: 700, fontSize: 12,
            letterSpacing: '4px', textTransform: 'uppercase',
          }}>✦ Партнёры Гид Новосёла ✦</span>
        </div>

        {/* ── Контент слайда ── */}
        <div className="pb-body" style={{
          position: 'relative', zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)',
        }}>

          {/* Логотип */}
          <div className="pb-logo-wrap" style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            marginBottom: 18,
          }}>
            {showLogo ? (
              <img
                src={slide.logo}
                alt={slide.title}
                onError={() => setImgOk(false)}
                className="pb-logo-img"
                style={{ objectFit: 'contain', display: 'block' }}
              />
            ) : (
              <div className="pb-logo-initials" style={{
                background: slide.color,
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, color: '#fff',
              }}>
                {slide.initials}
              </div>
            )}
          </div>

          {/* Название */}
          <h2 className="pb-title" style={{
            color: '#fff', fontWeight: 900,
            letterSpacing: '3px', margin: '0 0 10px',
            lineHeight: 1.1, textTransform: 'uppercase',
            textAlign: 'center',
            textShadow: '0 0 20px rgba(255,255,255,0.3)',
          }}>
            {slide.title}
          </h2>

          {/* Подарок */}
          <p className="pb-sub" style={{
            color: '#E8621A', fontWeight: 600,
            margin: 0, lineHeight: 1.4,
            textAlign: 'center',
            textShadow: '0 0 10px rgba(232,98,26,0.5)',
          }}>
            {slide.subtitle}
          </p>
        </div>

        {/* ── Нижняя панель ── */}
        <div style={{
          position: 'relative', zIndex: 3,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 4,
          paddingBottom: 12,
        }}>
          {/* Точки */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {slides.map((_, i) => (
              <div key={i} onClick={() => goTo(i)} style={{
                width: i === idx ? 20 : 8,
                height: 8,
                borderRadius: 4,
                background: i === idx ? '#fff' : '#444',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                cursor: 'pointer',
              }} />
            ))}
          </div>
          {/* Подсказка */}
          <span style={{ color: '#666', fontSize: 10, letterSpacing: '1px' }}>Листай →</span>
        </div>
      </div>
    </div>
  )
}
