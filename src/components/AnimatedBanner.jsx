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

// Частицы — детерминированные позиции
const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  x:        ((i * 7.3 + 3) % 94) + 3,
  y:        ((i * 11.7 + 8) % 80) + 5,
  size:     2 + (i % 3),
  delay:    -(i * 0.8),
  duration: 6 + (i % 5) * 1.4,
  opacity:  0.3 + (i % 3) * 0.2,
}))

export default function AnimatedBanner() {
  const [idx, setIdx]           = useState(0)
  const [visible, setVisible]   = useState(true)
  const [imgOk, setImgOk]       = useState(true)
  const [progressKey, setProgressKey] = useState(0)

  useEffect(() => {
    let tid
    const iv = setInterval(() => {
      setVisible(false)
      tid = setTimeout(() => {
        setIdx(i => (i + 1) % slides.length)
        setImgOk(true)
        setProgressKey(k => k + 1)
        setVisible(true)
      }, 450)
    }, 3000)
    return () => { clearInterval(iv); clearTimeout(tid) }
  }, [])

  const goTo = (i) => {
    setVisible(false)
    setTimeout(() => { setIdx(i); setImgOk(true); setProgressKey(k => k + 1); setVisible(true) }, 450)
  }

  const slide    = slides[idx]
  const showLogo = slide.logo && imgOk

  return (
    <div style={{ padding: '12px 16px 0', maxWidth: 640, margin: '0 auto' }}>

      {/* ── РЕКЛАМНЫЙ ЭКРАН ── */}
      <div className="ad-screen" style={{
        position: 'relative',
        width: '100%',
        background: '#0a0a0a',
        borderRadius: 8,
        border: '3px solid #E8621A',
        boxShadow: '0 0 20px rgba(232,98,26,0.5), 0 0 40px rgba(232,98,26,0.15)',
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: '"Montserrat", -apple-system, sans-serif',
      }}>

        {/* Сканирующий луч */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, width: '35%',
          background: 'linear-gradient(90deg, transparent, rgba(232,98,26,0.06), rgba(255,150,50,0.1), rgba(232,98,26,0.06), transparent)',
          animation: 'adScan 5s linear infinite',
          pointerEvents: 'none', zIndex: 1,
        }} />

        {/* Частицы */}
        {PARTICLES.map((p, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: '#E8621A',
            opacity: p.opacity,
            animation: `adParticle ${p.duration}s ${p.delay}s linear infinite`,
            pointerEvents: 'none', zIndex: 1,
          }} />
        ))}

        {/* Угловые акценты */}
        {[
          { top: 0, left: 0, borderTop: '2px solid #E8621A', borderLeft: '2px solid #E8621A' },
          { top: 0, right: 0, borderTop: '2px solid #E8621A', borderRight: '2px solid #E8621A' },
          { bottom: 18, left: 0, borderBottom: '2px solid #E8621A', borderLeft: '2px solid #E8621A' },
          { bottom: 18, right: 0, borderBottom: '2px solid #E8621A', borderRight: '2px solid #E8621A' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 16, height: 16, zIndex: 3, ...s }} />
        ))}

        {/* Контент слайда */}
        <div className="ad-content" style={{
          position: 'relative', zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-12px)',
          transition: 'opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)',
        }}>

          {/* Логотип */}
          <div className="ad-logo-wrap" style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}>
            {showLogo ? (
              <img
                src={slide.logo}
                alt={slide.title}
                onError={() => setImgOk(false)}
                className="ad-logo-img"
                style={{ objectFit: 'contain', display: 'block' }}
              />
            ) : (
              <div className="ad-logo-initials" style={{
                background: slide.color,
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, color: '#fff', letterSpacing: '-0.02em',
              }}>
                {slide.initials}
              </div>
            )}
          </div>

          {/* Текст */}
          <div className="ad-text" style={{ minWidth: 0 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: 'rgba(232,98,26,0.6)',
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6,
            }}>
              Партнёр Гид Новосёла
            </div>
            <h2 className="ad-title" style={{
              color: '#fff', fontWeight: 900,
              letterSpacing: '3px', margin: '0 0 8px',
              lineHeight: 1.1, textTransform: 'uppercase',
            }}>
              {slide.title}
            </h2>
            <p className="ad-sub" style={{
              color: '#E8621A', fontWeight: 400,
              margin: 0, lineHeight: 1.4,
            }}>
              {slide.subtitle}
            </p>
          </div>
        </div>

        {/* Нижняя панель — точки + прогресс */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 18, zIndex: 3,
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Точки-индикаторы */}
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            gap: 4, flex: 1,
          }}>
            {slides.map((_, i) => (
              <div key={i} onClick={() => goTo(i)} style={{
                width: i === idx ? 16 : 4,
                height: 4,
                borderRadius: 2,
                background: i === idx ? '#E8621A' : 'rgba(255,255,255,0.18)',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                cursor: 'pointer',
              }} />
            ))}
          </div>

          {/* Прогресс-полоса */}
          <div style={{ height: 2, background: 'rgba(232,98,26,0.15)' }}>
            <div
              key={progressKey}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #E8621A, #FF9B2F)',
                animation: 'adProgress 3s linear forwards',
                boxShadow: '0 0 6px rgba(232,98,26,0.6)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
