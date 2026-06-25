import { companies } from '../data/companies'

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
      {/* Коробочка — соотношение 600:700 чтобы contain совпал точно */}
      <div
        className="gift-box-inner"
        style={{
          width: '100%',
          paddingTop: '116.67%', // 700/600
          position: 'relative',
          borderRadius: 20,
          background: bg,
          boxShadow: '0 6px 24px rgba(0,0,0,0.22)',
          overflow: 'hidden',
        }}
      >
        {/* Фото коробочки — уменьшена до 82% чтобы цвет фирмы был виден */}
        <img
          src="/images/gift-box.jpeg"
          alt="Подарок"
          style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '82%', height: '82%',
            objectFit: 'contain',
            display: 'block',
          }}
        />

        {/* Логотип / инициалы — точно в пунктирный прямоугольник */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '61.7%',
          transform: 'translate(-50%, -50%)',
          width: '34%',
          height: '19%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
          {company?.logo ? (
            <img
              src={company.logo}
              alt={partner.name}
              style={{
                width: '100%', height: '100%',
                objectFit: 'contain',
                borderRadius: 6,
              }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 900, fontSize: 'clamp(12px, 4vw, 20px)',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              letterSpacing: '-0.02em',
            }}>
              {initials}
            </div>
          )}
        </div>
      </div>

      {/* Подпись */}
      <p style={{ fontSize: 12, fontWeight: 700, color: '#1A1816', marginTop: 8, textAlign: 'center', lineHeight: 1.3 }}>
        {partner.name}
      </p>
      <p style={{ fontSize: 11, color: '#A09890', marginTop: 2 }}>
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
