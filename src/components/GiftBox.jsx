import { companies } from '../data/companies'

// SVG бантик
function Bow({ color = '#fff' }) {
  return (
    <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '70%', maxWidth: 88, display: 'block', margin: '0 auto', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.18))' }}>
      {/* Левая петля */}
      <ellipse cx="22" cy="22" rx="20" ry="12" fill={color} fillOpacity="0.9" transform="rotate(-18 22 22)" />
      <ellipse cx="22" cy="22" rx="12" ry="7"  fill={color} fillOpacity="0.5" transform="rotate(-18 22 22)" />
      {/* Правая петля */}
      <ellipse cx="58" cy="22" rx="20" ry="12" fill={color} fillOpacity="0.9" transform="rotate(18 58 22)" />
      <ellipse cx="58" cy="22" rx="12" ry="7"  fill={color} fillOpacity="0.5" transform="rotate(18 58 22)" />
      {/* Центральный узел */}
      <ellipse cx="40" cy="22" rx="9" ry="9" fill={color} />
      <ellipse cx="40" cy="22" rx="5" ry="5" fill={color} fillOpacity="0.5" />
      {/* Ленты вниз */}
      <rect x="37" y="28" width="6" height="16" rx="3" fill={color} fillOpacity="0.85" />
    </svg>
  )
}

export default function GiftBox({ partner, count, onClick, delay = 0 }) {
  const company  = companies.find(c => c.id === partner.partnerId)
  const initials = partner.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const bg       = partner.colorGradient || partner.color

  return (
    <div
      onClick={onClick}
      className="gift-box-card"
      style={{
        animationDelay: `${delay}s`,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Коробочка */}
      <div
        className="gift-box-inner"
        style={{
          width: '100%',
          paddingTop: '115%',
          position: 'relative',
          borderRadius: 24,
          background: bg,
          boxShadow: '0 8px 28px rgba(0,0,0,0.18)',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '10px 8px 14px' }}>
          {/* Бантик */}
          <div style={{ width: '100%', paddingTop: 4 }}>
            <Bow color="rgba(255,255,255,0.92)" />
          </div>

          {/* Лента горизонтальная */}
          <div style={{ position: 'absolute', top: '48%', left: 0, right: 0, height: 6, background: 'rgba(255,255,255,0.25)' }} />

          {/* Лого или инициалы */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {company?.logo ? (
              <img src={company.logo} alt={partner.name}
                style={{ width: 52, height: 52, objectFit: 'contain', borderRadius: 10,
                  background: 'rgba(255,255,255,0.15)', padding: 4,
                  filter: 'brightness(0) invert(1)' }} />
            ) : (
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: 20,
                backdropFilter: 'blur(4px)',
              }}>
                {initials}
              </div>
            )}
          </div>

          {/* Название */}
          <p style={{
            color: '#fff', fontWeight: 800, fontSize: 11, textAlign: 'center',
            lineHeight: 1.2, textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            padding: '0 4px',
          }}>
            {partner.name}
          </p>
        </div>
      </div>

      {/* Подпись под коробочкой */}
      <p style={{ fontSize: 11, color: '#A09890', marginTop: 8, fontWeight: 500 }}>
        {count} {plural(count, 'подарок', 'подарка', 'подарков')}
      </p>
    </div>
  )
}

function plural(n, one, few, many) {
  const mod10  = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 19) return many
  if (mod10 === 1) return one
  if (mod10 >= 2 && mod10 <= 4) return few
  return many
}
