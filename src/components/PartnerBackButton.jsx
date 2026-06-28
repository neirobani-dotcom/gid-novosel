export default function PartnerBackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="partner-back-btn"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '8px 16px',
        background: '#E8621A',
        color: '#fff',
        border: 'none',
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 700,
        cursor: 'pointer',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        lineHeight: 1,
      }}
    >
      ← Все партнёры
    </button>
  )
}
