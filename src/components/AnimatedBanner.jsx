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

// Частицы — детерминированные позиции и векторы движения
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  x:        ((i * 6.1 + 5)  % 90) + 5,
  y:        ((i * 9.3 + 12) % 80) + 10,
  size:     4 + (i % 3),
  delay:    -(i * 0.65),
  duration: 8 + (i % 6) * 1.5,
  dx:       ((i % 5) - 2) * 18,
  dy:       ((i % 4) - 2) * 22,
  opacity:  0.3 + (i % 3) * 0.05,
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
    }, 3000)
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

      {/* ── KEYNOTE ЭКРАН ── */}
      <div className="ak-screen" style={{
        position: 'relative',
        width: '100%',
        background: '#0a0a0a',
        borderRadius: 16,
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: '"Montserrat", -apple-system, sans-serif',
      }}>

        {/* Частицы */}
        {PARTICLES.map((p, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: '#E8621A',
            opacity: p.opacity,
            animation: `akParticle${i % 4} ${p.duration}s ${p.delay}s ease-in-out infinite`,
            pointerEvents: 'none', zIndex: 1,
          }} />
        ))}

        {/* Контент слайда */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '28px 24px 10px',
          height: 'calc(100% - 28px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.97)',
          transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)',
        }}>

          {/* Метка сверху */}
          <div style={{
            fontSize: 11, fontWeight: 700,
            color: '#888', letterSpacing: '3px',
            textTransform: 'uppercase', marginBottom: 16,
          }}>
            Партнёр Гид Новосёла
          </div>

          {/* Логотип */}
          <div className="ak-logo-wrap" style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
            overflow: 'hidden',
            marginBottom: 20,
          }}>
            {showLogo ? (
              <img
                src={slide.logo}
                alt={slide.title}
                onError={() => setImgOk(false)}
                className="ak-logo-img"
                style={{ objectFit: 'contain', display: 'block' }}
              />
            ) : (
              <div className="ak-logo-initials" style={{
                background: slide.color,
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, color: '#fff', letterSpacing: '-0.02em',
              }}>
                {slide.initials}
              </div>
            )}
          </div>

          {/* Название */}
          <h2 className="ak-title" style={{
            color: '#fff', fontWeight: 900,
            letterSpacing: '2px', margin: '0 0 10px',
            lineHeight: 1.1, textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            {slide.title}
          </h2>

          {/* Подарок */}
          <p className="ak-sub" style={{
            color: '#E8621A', fontWeight: 400,
            margin: 0, lineHeight: 1.4,
            textAlign: 'center',
          }}>
            {slide.subtitle}
          </p>
        </div>

        {/* Точки-индикаторы */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: 5, paddingBottom: 12, position: 'relative', zIndex: 3,
        }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => goTo(i)} style={{
              width: i === idx ? 18 : 5,
              height: 5,
              borderRadius: 3,
              background: i === idx ? '#fff' : '#555',
              transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
              cursor: 'pointer',
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}
