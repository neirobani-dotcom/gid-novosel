// Зубчатые края через CSS: notched left/right via radial-gradient
export default function CouponCard({ gift, partnerColor, onActivate, delay = 0 }) {
  const light = hexToRgba(partnerColor || '#E8621A', 0.06)

  return (
    <div
      className="coupon-card"
      style={{ animationDelay: `${delay}s` }}
      onClick={onActivate}
    >
      {/* Зубчатые края */}
      <div className="coupon-notch-left"  style={{ '--color': light }} />
      <div className="coupon-notch-right" style={{ '--color': light }} />

      {/* Основное тело */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        background: light,
        border: `1.5px dashed ${hexToRgba(partnerColor || '#E8621A', 0.35)}`,
        borderRadius: 16,
        padding: '16px 14px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Декоративная полоска слева */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: partnerColor || '#E8621A', borderRadius: '16px 0 0 16px' }} />

        {/* Иконка */}
        <div style={{
          width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
          background: partnerColor || '#E8621A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, boxShadow: `0 4px 14px ${hexToRgba(partnerColor || '#E8621A', 0.35)}`,
          marginLeft: 8,
        }}>
          {gift.icon || '🎁'}
        </div>

        {/* Текст */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', marginBottom: 4 }}>
            Подарок новосёлу
          </p>
          <p style={{ fontSize: 14, fontWeight: 800, color: '#1A1816', lineHeight: 1.25, marginBottom: gift.oldPrice ? 6 : 4 }}>
            {gift.title}
          </p>
          {gift.oldPrice && (
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: '#A09890', textDecoration: 'line-through', marginRight: 6 }}>
                {gift.oldPrice}
              </span>
              <span style={{ fontSize: 15, fontWeight: 900, color: '#E8621A' }}>
                {gift.newPrice}
              </span>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#22C55E', marginLeft: 6 }}>
                экономия {gift.savings}
              </span>
            </div>
          )}
          <p style={{ fontSize: 11, color: '#8A8480', lineHeight: 1.4 }}>
            {gift.condition}
          </p>
        </div>

        {/* Кнопка */}
        <button
          onClick={e => { e.stopPropagation(); onActivate() }}
          style={{
            flexShrink: 0,
            background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
            color: '#fff', border: 'none', borderRadius: 10,
            padding: '10px 12px', fontSize: 12, fontWeight: 700,
            cursor: 'pointer', whiteSpace: 'nowrap',
            boxShadow: '0 3px 10px rgba(232,98,26,0.35)',
            minWidth: 88, textAlign: 'center',
          }}
        >
          Активировать →
        </button>
      </div>
    </div>
  )
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}
