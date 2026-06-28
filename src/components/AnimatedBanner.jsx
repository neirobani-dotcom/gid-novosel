import { useState, useEffect } from 'react'

// ── Добавь нового партнёра сюда — он появится в анимации автоматически ──
const slides = [
  { icon: '🏠', title: 'ГИД НОВОСЁЛА', subtitle: 'Всё для вашего нового дома — в одном месте' },
  { icon: '🛋️', title: 'МЕБЕЛЬ И ШКАФЫ', subtitle: 'СибМебель, Шатура — скидки для новосёлов' },
  { icon: '🚪', title: 'ДВЕРИ', subtitle: 'СМД — царговые двери в подарок' },
  { icon: '🪟', title: 'ОКНА И БАЛКОНЫ', subtitle: 'Олкон — 15 000 ₽ в подарок' },
  { icon: '🍳', title: 'КУХНИ НА ЗАКАЗ', subtitle: 'Кухни Шик — до 30 000 ₽ в подарок' },
  { icon: '🧠', title: 'НЕЙРОБАНЯ', subtitle: 'Баня + бизнес за один визит' },
  { icon: '🚗', title: 'АВТО В РАССРОЧКУ', subtitle: 'Красноярск Рассрочка Авто — без банков' },
  { icon: '✨', title: 'ГИД НОВОСЁЛА', subtitle: '53 жилых комплекса Красноярска. Все подарки бесплатно!' },
]

// Частицы — позиции вычислены один раз
const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  left:     ((i * 6.7 + 2) % 96) + 2,
  bottom:   ((i * 13.3 + 5) % 60) + 5,
  size:     3 + (i % 4),
  delay:    -(i * 0.7),
  duration: 7 + (i % 5) * 1.5,
  opacity:  0.35 + (i % 3) * 0.15,
}))

export default function AnimatedBanner() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let tid
    const iv = setInterval(() => {
      setVisible(false)
      tid = setTimeout(() => {
        setIdx(i => (i + 1) % slides.length)
        setVisible(true)
      }, 380)
    }, 2500)
    return () => { clearInterval(iv); clearTimeout(tid) }
  }, [])

  const slide = slides[idx]

  return (
    <div style={{ padding: '12px 16px 0', maxWidth: 640, margin: '0 auto' }}>
      <div className="anim-banner" style={{
        position: 'relative',
        height: 220,
        borderRadius: 16,
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1a0e 60%, #1a0e05 100%)',
        border: '2px solid #E8621A',
        boxShadow: '0 0 28px rgba(232,98,26,0.35), 0 6px 24px rgba(0,0,0,0.4)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
        userSelect: 'none',
      }}>

        {/* Частицы */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              bottom: `${p.bottom}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: '#E8621A',
              opacity: p.opacity,
              animation: `bannerParticle ${p.duration}s ${p.delay}s linear infinite`,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Центральное свечение */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 260, height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,98,26,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Слайд */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', padding: '0 24px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.38s ease',
        }}>
          <div style={{ fontSize: 40, lineHeight: 1, marginBottom: 12 }}>
            {slide.icon}
          </div>
          <h2 className="anim-banner-title" style={{
            color: '#fff',
            fontWeight: 900,
            letterSpacing: '0.04em',
            margin: '0 0 8px',
            textShadow: '0 0 20px rgba(232,98,26,0.5)',
          }}>
            {slide.title}
          </h2>
          <p className="anim-banner-sub" style={{
            color: '#E8621A',
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.4,
          }}>
            {slide.subtitle}
          </p>
        </div>

        {/* Точки-индикаторы */}
        <div style={{
          position: 'absolute', bottom: 14, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: 6,
          zIndex: 2,
        }}>
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => { setVisible(false); setTimeout(() => { setIdx(i); setVisible(true) }, 380) }}
              style={{
                width: i === idx ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: i === idx ? '#E8621A' : 'rgba(255,255,255,0.25)',
                transition: 'all 0.35s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* Лого ГН */}
        <div style={{
          position: 'absolute', bottom: 12, right: 14,
          fontSize: 13, fontWeight: 900, color: '#fff',
          opacity: 0.2, letterSpacing: '0.05em', zIndex: 2,
        }}>
          ГН
        </div>
      </div>
    </div>
  )
}
