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
      }, 400)
    }, 2500)
    return () => { clearInterval(iv); clearTimeout(tid) }
  }, [])

  const slide = slides[idx]
  const goTo = (i) => {
    setVisible(false)
    setTimeout(() => { setIdx(i); setVisible(true) }, 400)
  }

  return (
    <div style={{
      padding: '16px 16px 0',
      maxWidth: 640,
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
      userSelect: 'none',
    }}>

      {/* ── МОНИТОР iMac ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Экран */}
        <div style={{
          width: '100%',
          position: 'relative',
          background: '#111',
          borderRadius: 14,
          padding: 8,
          boxShadow:
            '0 0 0 1px rgba(0,0,0,0.3), ' +
            '0 20px 60px rgba(0,0,0,0.35), ' +
            '0 4px 16px rgba(0,0,0,0.2), ' +
            'inset 0 1px 0 rgba(255,255,255,0.08)',
        }}>

          {/* Внутренний экран (16:9 пропорция) */}
          <div className="imac-screen" style={{
            width: '100%',
            background: '#fff',
            borderRadius: 8,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>

            {/* Тонкая линия сверху — блик стекла */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.8) 60%, transparent)',
              zIndex: 10,
              pointerEvents: 'none',
            }} />

            {/* Контент слайда */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 28px 28px',
              width: '100%',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1)',
            }}>
              <div style={{ fontSize: 52, lineHeight: 1, marginBottom: 14 }}>
                {slide.icon}
              </div>
              <h2 className="imac-title" style={{
                color: '#1d1d1f',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                margin: '0 0 8px',
                lineHeight: 1.1,
              }}>
                {slide.title}
              </h2>
              <p className="imac-sub" style={{
                color: '#E8621A',
                fontWeight: 500,
                margin: 0,
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
              }}>
                {slide.subtitle}
              </p>
            </div>

            {/* Точки-индикаторы внизу экрана */}
            <div style={{
              position: 'absolute',
              bottom: 12,
              left: 0, right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 5,
              zIndex: 5,
            }}>
              {slides.map((_, i) => (
                <div
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === idx ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === idx ? '#E8621A' : '#d1d1d6',
                    transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Подставка — видна только на десктопе */}
        <div className="imac-stand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Шейка */}
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '50px solid transparent',
            borderRight: '50px solid transparent',
            borderTop: '20px solid #c8c8cc',
          }} />
          {/* Основание */}
          <div style={{
            width: 180,
            height: 8,
            background: 'linear-gradient(180deg, #c8c8cc 0%, #b8b8bc 100%)',
            borderRadius: '0 0 6px 6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }} />
        </div>

      </div>
    </div>
  )
}
