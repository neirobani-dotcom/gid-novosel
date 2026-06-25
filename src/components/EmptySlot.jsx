export default function EmptySlot({ onPartnerClick }) {
  return (
    <div
      style={{
        background: '#FFF8F5',
        border: '1.5px dashed #F0C4A8',
        borderRadius: 16,
        minHeight: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '20px 16px',
        cursor: onPartnerClick ? 'pointer' : 'default',
        transition: 'border-color 0.15s ease, background 0.15s ease',
      }}
      onClick={onPartnerClick}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#E8621A'
        e.currentTarget.style.background = '#FFF3EC'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#F0C4A8'
        e.currentTarget.style.background = '#FFF8F5'
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: '#FFE8D6', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, color: '#E8621A', fontWeight: 300, lineHeight: 1,
      }}>+</div>
      <p style={{ fontSize: 11, color: '#C8A880', fontWeight: 600, textAlign: 'center', lineHeight: 1.4 }}>
        Скоро здесь появится<br />новый партнёр
      </p>
      {onPartnerClick && (
        <span style={{
          fontSize: 10, color: '#E8621A', fontWeight: 700,
          background: '#FFF0E6', border: '1px solid #FFD0A0',
          borderRadius: 20, padding: '3px 10px', marginTop: 2,
        }}>
          Стать партнёром →
        </span>
      )}
    </div>
  )
}
