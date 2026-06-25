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
      <div className="gift-box-inner" style={{ position: 'relative', width: '100%' }}>
        <img
          src="/images/gift-box.jpeg"
          alt="подарок"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '68%',
          transform: 'translate(-50%,-50%)',
          width: '45%',
        }}>
          {logo ? (
            <img src={logo} alt={partner.name} style={{ width: '100%', height: 'auto' }} />
          ) : (
            <div style={{ background: '#ffffff', borderRadius: 6, padding: '6px 10px', fontWeight: 900, fontSize: 'clamp(13px,3.5vw,18px)', color: '#1A1816', textAlign: 'center' }}>
              {initials}
            </div>
          )}
        </div>
      </div>

      <p style={{ marginTop: 8, fontSize: 14, fontWeight: 700, color: '#1A1816', textAlign: 'center' }}>{partner.name}</p>
      <p style={{ fontSize: 12, color: '#A09890', marginTop: 2 }}>{count} {plural(count)}</p>
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
