import { companies } from '../data/companies'

export default function GiftBox({ partner, count, onClick, delay = 0 }) {
  const company  = companies.find(c => c.id === partner.partnerId)
  const initials = partner.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

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
        background: 'transparent',
        border: 'none',
        outline: 'none',
        padding: 0,
      }}
    >
      {/* Контейнер фото — соотношение 600:700 совпадает с gift-box.jpeg */}
      <div
        className="gift-box-inner"
        style={{
          width: '100%',
          paddingTop: '116.67%',
          position: 'relative',
          overflow: 'hidden',
          background: 'transparent',
          border: 'none',
          borderRadius: 0,
          boxShadow: 'none',
        }}
      >
        {/* Реальное фото коробочки */}
        <img
          src="/images/gift-box.jpeg"
          alt="Подарок"
          draggable={false}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            userSelect: 'none',
          }}
        />

        {/* Логотип — точно в пунктирный прямоугольник */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '68%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {company?.logo ? (
            <img
              src={company.logo}
              alt={partner.name}
              draggable={false}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 4,
                display: 'block',
              }}
            />
          ) : (
            <div style={{
              background: 'rgba(255,255,255,0.88)',
              borderRadius: 6,
              padding: '6px 10px',
              fontWeight: 900,
              fontSize: 'clamp(13px, 3.5vw, 18px)',
              color: '#1A1816',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}>
              {initials}
            </div>
          )}
        </div>
      </div>

      {/* Подпись */}
      <p style={{
        marginTop: 8,
        fontSize: 14,
        fontWeight: 700,
        color: '#1A1816',
        textAlign: 'center',
        lineHeight: 1.3,
        padding: '0 4px',
      }}>
        {partner.name}
      </p>
      <p style={{
        fontSize: 12,
        color: '#A09890',
        marginTop: 2,
        textAlign: 'center',
      }}>
        {count} {plural(count)}
      </p>
    </div>
  )
}

function plural(n) {
  const mod10  = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 19) return 'подарков'
  if (mod10 === 1) return 'подарок'
  if (mod10 >= 2 && mod10 <= 4) return 'подарка'
  return 'подарков'
}
