import { useState, useEffect } from 'react'

// ── Добавь нового партнёра сюда — он появится в анимации автоматически ──
const slides = [
  { icon: '🏠', title: 'ГИД НОВОСЁЛА',      subtitle: 'Всё для вашего нового дома — в одном месте',             logo: '/site-logo.png' },
  { icon: '🛋️', title: 'МЕБЕЛЬ И ШКАФЫ',    subtitle: 'СибМебель, Шатура — скидки для новосёлов',               logo: '/partners/sibmebel/logo.jpeg' },
  { icon: '🚪', title: 'ДВЕРИ',              subtitle: 'СМД — царговые двери в подарок',                         logo: '/smd/logo.jpeg' },
  { icon: '🪟', title: 'ОКНА И БАЛКОНЫ',     subtitle: 'Олкон — 15 000 ₽ в подарок',                            logo: '/partners/olkon/logo.png' },
  { icon: '🍳', title: 'КУХНИ НА ЗАКАЗ',     subtitle: 'Кухни Шик — до 30 000 ₽ в подарок',                     logo: null },
  { icon: '🧠', title: 'НЕЙРОБАНЯ',          subtitle: 'Баня + бизнес за один визит',                            logo: '/partners/neirobanya/logo.png' },
  { icon: '🚗', title: 'АВТО В РАССРОЧКУ',   subtitle: 'Красноярск Рассрочка Авто — без банков',                 logo: '/partners/avto/logo.jpeg' },
  { icon: '🎨', title: 'ШТОРЫ ТАС',          subtitle: 'Академия штор — 10 000 ₽ на текстиль',                  logo: '/partners/tac/logo.jpeg' },
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

  const slide    = slides[idx]
  const showLogo = slide.logo && imgOk

  return (
    <div style={{
      padding: '16px 16px 0',
      maxWidth: 640,
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      userSelect: 'none',
    }}>

      {/* ── КОРПУС iPad ── */}
      <div className="ipad-frame" style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 100%)',
        borderRadius: 28,
        padding: '28px 16px 22px',
        boxShadow:
          '0 0 0 1px #0a0a0a, ' +
          '0 30px 80px rgba(0,0,0,0.6), ' +
          '0 8px 24px rgba(0,0,0,0.35), ' +
          'inset 0 1px 0 rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}>

        {/* Камера сверху */}
        <div style={{
          position: 'absolute', top: 10, left: '50%',
          transform: 'translateX(-50%)',
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#0a0a0a',
          boxShadow: 'inset 0 0 3px rgba(255,255,255,0.15)',
        }} />

        {/* ── ЭКРАН ── */}
        <div className="ipad-screen" style={{
          width: '100%',
          background: 'linear-gradient(160deg, #1a1a1a 0%, #2d1a0e 60%, #1a0e05 100%)',
          borderRadius: 14,
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
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.1) 60%, transparent)',
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
            padding: '16px 20px 32px',
            width: '100%',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.42s cubic-bezier(0.4,0,0.2,1), transform 0.42s cubic-bezier(0.4,0,0.2,1)',
          }}>

            {/* Логотип или эмодзи */}
            {showLogo ? (
              <div className="ipad-logo-wrap" style={{
                borderRadius: 20,
                background: 'rgba(255,255,255,0.96)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14,
                boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <img
                  src={slide.logo}
                  alt={slide.title}
                  onError={() => setImgOk(false)}
                  className="ipad-logo-img"
                  style={{ objectFit: 'contain', display: 'block' }}
                />
              </div>
            ) : (
              <div className="ipad-icon" style={{ lineHeight: 1, marginBottom: 14 }}>
                {slide.icon}
              </div>
            )}

            <h2 className="ipad-title" style={{
              fontFamily: '"Montserrat", -apple-system, sans-serif',
              color: '#fff',
              fontWeight: 900,
              letterSpacing: '2px',
              margin: '0 0 8px',
              lineHeight: 1.15,
              textTransform: 'uppercase',
            }}>
              {slide.title}
            </h2>

            <p className="ipad-sub" style={{
              fontFamily: '"Montserrat", -apple-system, sans-serif',
              color: '#E8621A',
              fontWeight: 400,
              margin: 0,
              lineHeight: 1.45,
            }}>
              {slide.subtitle}
            </p>
          </div>

          {/* Точки-индикаторы */}
          <div style={{
            position: 'absolute', bottom: 8, left: 0, right: 0,
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

        {/* Кнопка Home снизу */}
        <div style={{
          width: 22, height: 22,
          borderRadius: '50%',
          border: '2px solid #333',
          background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 4px rgba(0,0,0,0.5)',
          flexShrink: 0,
        }} />

      </div>
    </div>
  )
}
