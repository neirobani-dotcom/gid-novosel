import { companies } from '../data/companies'

export default function GiftBox({ partner, count, onClick, delay = 0 }) {
  const company  = companies.find(c => c.id === partner.partnerId)
  const logo     = company?.logo
  const initials = partner.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div
      onClick={onClick}
      className="gift-box-card"
      style={{ animationDelay: `${delay}s`, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div className="gift-box-inner" style={{ width: '100%', position: 'relative' }}>

        {/* ── КОРОБОЧКА ── */}
        <div style={{ width: '100%', paddingTop: '105%', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>

            {/* БАНТ */}
            <div style={{ position: 'relative', height: '22%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 2 }}>
              {/* Левая петля */}
              <div style={{
                position: 'absolute', left: '28%', bottom: 2,
                width: '20%', height: '80%',
                background: 'linear-gradient(135deg, #fff 60%, #f0f0f0)',
                border: '2px solid #D4AF37',
                borderRadius: '50% 50% 20% 50%',
                transform: 'rotate(-30deg)',
                boxShadow: '1px 1px 4px rgba(0,0,0,0.18)',
              }} />
              {/* Правая петля */}
              <div style={{
                position: 'absolute', right: '28%', bottom: 2,
                width: '20%', height: '80%',
                background: 'linear-gradient(225deg, #fff 60%, #f0f0f0)',
                border: '2px solid #D4AF37',
                borderRadius: '50% 50% 50% 20%',
                transform: 'rotate(30deg)',
                boxShadow: '-1px 1px 4px rgba(0,0,0,0.18)',
              }} />
              {/* Центральный узел */}
              <div style={{
                position: 'relative', zIndex: 3,
                width: '12%', height: '50%',
                background: 'radial-gradient(circle at 40% 40%, #fff 40%, #D4AF37)',
                border: '2px solid #D4AF37',
                borderRadius: '50%',
                boxShadow: '0 2px 6px rgba(0,0,0,0.22)',
              }} />
              {/* Ленты вниз от банта */}
              <div style={{
                position: 'absolute', bottom: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: '10%', height: '30%',
                background: '#fff',
                border: '1px solid #D4AF37',
                zIndex: 1,
              }} />
            </div>

            {/* КРЫШКА */}
            <div style={{
              height: '20%',
              background: 'linear-gradient(180deg, #E74C3C 0%, #C0392B 100%)',
              borderRadius: '6px 6px 0 0',
              position: 'relative',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              zIndex: 1,
            }}>
              {/* Горизонтальная лента на крышке */}
              <div style={{
                position: 'absolute', top: '50%', left: 0, right: 0,
                transform: 'translateY(-50%)',
                height: '28%',
                background: '#fff',
                borderTop: '1.5px solid #D4AF37',
                borderBottom: '1.5px solid #D4AF37',
              }} />
              {/* Вертикальная лента на крышке */}
              <div style={{
                position: 'absolute', top: 0, bottom: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: '12%',
                background: '#fff',
                borderLeft: '1.5px solid #D4AF37',
                borderRight: '1.5px solid #D4AF37',
              }} />
            </div>

            {/* ЗОЛОТАЯ РАЗДЕЛИТЕЛЬНАЯ ЛИНИЯ */}
            <div style={{ height: 3, background: 'linear-gradient(90deg, #B8860B, #FFD700, #B8860B)', flexShrink: 0 }} />

            {/* ОСНОВАНИЕ КОРОБКИ */}
            <div style={{
              flex: 1,
              background: 'linear-gradient(180deg, #C0392B 0%, #96281B 100%)',
              borderRadius: '0 0 8px 8px',
              position: 'relative',
              boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.2)',
            }}>
              {/* Вертикальная лента */}
              <div style={{
                position: 'absolute', top: 0, bottom: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: '12%',
                background: '#fff',
                borderLeft: '1.5px solid #D4AF37',
                borderRight: '1.5px solid #D4AF37',
              }} />

              {/* МЕСТО ДЛЯ ЛОГОТИПА */}
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60%', height: '55%',
                border: '1.5px dashed rgba(255,255,255,0.6)',
                borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.12)',
              }}>
                {logo ? (
                  <img src={logo} alt={partner.name}
                    style={{ width: '85%', height: '85%', objectFit: 'contain', borderRadius: 4 }} />
                ) : (
                  <div style={{
                    background: 'rgba(255,255,255,0.92)',
                    borderRadius: 6,
                    padding: '5px 9px',
                    fontWeight: 900,
                    fontSize: 'clamp(12px,3vw,17px)',
                    color: '#1A1816',
                    textAlign: 'center',
                    letterSpacing: '-0.01em',
                  }}>
                    {initials}
                  </div>
                )}
              </div>

              {/* Блик сбоку */}
              <div style={{
                position: 'absolute', top: 0, bottom: 0, left: 0,
                width: '8%',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.12), transparent)',
                borderRadius: '0 0 0 8px',
              }} />
            </div>

          </div>
        </div>
      </div>

      {/* Подпись */}
      <p style={{ marginTop: 8, fontSize: 14, fontWeight: 700, color: '#1A1816', textAlign: 'center', lineHeight: 1.3 }}>
        {partner.name}
      </p>
      <p style={{ fontSize: 12, color: '#A09890', marginTop: 2 }}>
        {count} {plural(count)}
      </p>
    </div>
  )
}

function plural(n) {
  const m10 = n % 10, m100 = n % 100
  if (m100 >= 11 && m100 <= 19) return 'подарков'
  if (m10 === 1) return 'подарок'
  if (m10 >= 2 && m10 <= 4) return 'подарка'
  return 'подарков'
}
