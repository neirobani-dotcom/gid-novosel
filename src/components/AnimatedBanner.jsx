import { useState, useEffect } from 'react'

// ── Добавь нового партнёра сюда — он появится в анимации автоматически ──
const slides = [
  { icon: '🏠', title: 'ГИД НОВОСЁЛА',      subtitle: 'Всё для вашего нового дома — в одном месте',          logo: '/site-logo.png' },
  { icon: '🛋️', title: 'МЕБЕЛЬ И ШКАФЫ',    subtitle: 'СибМебель, Шатура — скидки для новосёлов',            logo: '/partners/sibmebel/logo.jpeg' },
  { icon: '🚪', title: 'ДВЕРИ',              subtitle: 'СМД — царговые двери в подарок',                      logo: '/smd/logo.jpeg' },
  { icon: '🪟', title: 'ОКНА И БАЛКОНЫ',     subtitle: 'Олкон — 15 000 ₽ в подарок',                         logo: '/partners/olkon/logo.png' },
  { icon: '🍳', title: 'КУХНИ НА ЗАКАЗ',     subtitle: 'Кухни Шик — до 30 000 ₽ в подарок',                  logo: null },
  { icon: '🧠', title: 'НЕЙРОБАНЯ',          subtitle: 'Баня + бизнес за один визит',                         logo: '/partners/neirobanya/logo.png' },
  { icon: '🚗', title: 'АВТО В РАССРОЧКУ',   subtitle: 'Красноярск Рассрочка Авто — без банков',              logo: '/partners/avto/logo.jpeg' },
  { icon: '🎨', title: 'ШТОРЫ ТАС',          subtitle: 'Академия штор — 10 000 ₽ на текстиль',               logo: '/partners/tac/logo.jpeg' },
  { icon: '🛁', title: 'НЕЙРОБАНЯ',          subtitle: '4-й час бани бесплатно для новосёлов',                logo: '/partners/neirobanya/logo.png' },
  { icon: '✨', title: 'ГИД НОВОСЁЛА',       subtitle: '53 жилых комплекса Красноярска. Все подарки бесплатно!', logo: '/site-logo.png' },
]

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
      }, 420)
    }, 2800)
    return () => { clearInterval(iv); clearTimeout(tid) }
  }, [])

  const goTo = (i) => {
    setVisible(false)
    setTimeout(() => { setIdx(i); setImgOk(true); setVisible(true) }, 420)
  }

  const slide = slides[idx]
  const showLogo = slide.logo && imgOk

  return (
    <div style={{
      padding: '16px 16px 0',
      maxWidth: 640,
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
      userSelect: 'none',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* ── КОРПУС МОНИТОРА ── */}
        <div className="imac-bezel" style={{
          width: '100%',
          background: 'linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%)',
          borderRadius: 18,
          padding: 12,
          boxShadow:
            '0 0 0 1px #111, ' +
            '0 24px 64px rgba(0,0,0,0.55), ' +
            '0 6px 20px rgba(0,0,0,0.3), ' +
            'inset 0 1px 0 rgba(255,255,255,0.07)',
          position: 'relative',
        }}>

          {/* Зелёная точка — монитор включён */}
          <div style={{
            position: 'absolute',
            bottom: 16, right: 16,
            width: 8, height: 8,
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 6px #22c55e',
            animation: 'greenDot 2s ease-in-out infinite',
            zIndex: 10,
          }} />

          {/* ── ЭКРАН ── */}
          <div className="imac-screen" style={{
            width: '100%',
            background: 'linear-gradient(160deg, #1a1a1a 0%, #2d1a0e 60%, #1a0e05 100%)',
            borderRadius: 8,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>

            {/* Блик стекла */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.12) 60%, transparent)',
              pointerEvents: 'none', zIndex: 5,
            }} />

            {/* Радиальное свечение */}
            <div style={{
              position: 'absolute', top: '40%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: 280, height: 280, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(232,98,26,0.1) 0%, transparent 65%)',
              pointerEvents: 'none',
            }} />

            {/* Контент слайда */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              textAlign: 'center',
              padding: '20px 24px 36px',
              width: '100%',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.42s cubic-bezier(0.4,0,0.2,1), transform 0.42s cubic-bezier(0.4,0,0.2,1)',
            }}>

              {/* Логотип или эмодзи */}
              {showLogo ? (
                <div style={{
                  width: 64, height: 64,
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.95)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <img
                    src={slide.logo}
                    alt={slide.title}
                    onError={() => setImgOk(false)}
                    style={{ width: 52, height: 52, objectFit: 'contain', display: 'block' }}
                  />
                </div>
              ) : (
                <div className="imac-icon" style={{ lineHeight: 1, marginBottom: 14 }}>
                  {slide.icon}
                </div>
              )}

              <h2 className="imac-title" style={{
                color: '#fff',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                margin: '0 0 8px',
                lineHeight: 1.15,
              }}>
                {slide.title}
              </h2>

              <p className="imac-sub" style={{
                color: '#E8621A',
                fontWeight: 500,
                margin: 0,
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
              }}>
                {slide.subtitle}
              </p>
            </div>

            {/* Точки-индикаторы */}
            <div style={{
              position: 'absolute', bottom: 10, left: 0, right: 0,
              display: 'flex', justifyContent: 'center', gap: 5, zIndex: 5,
            }}>
              {slides.map((_, i) => (
                <div key={i} onClick={() => goTo(i)} style={{
                  width: i === idx ? 18 : 5,
                  height: 5,
                  borderRadius: 3,
                  background: i === idx ? '#E8621A' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                  cursor: 'pointer',
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── ПОДСТАВКА — скрыта на мобильных ── */}
        <div className="imac-stand-wrap">
          {/* Шейка — трапеция */}
          <div style={{
            width: 0, height: 0,
            borderLeft: '55px solid transparent',
            borderRight: '55px solid transparent',
            borderTop: '22px solid #2a2a2a',
          }} />
          {/* Основание */}
          <div style={{
            width: 200, height: 9,
            background: 'linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)',
            borderRadius: '0 0 8px 8px',
            boxShadow: '0 3px 10px rgba(0,0,0,0.35)',
          }} />
        </div>

      </div>
    </div>
  )
}
