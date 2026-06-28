export default function PartnerBackButton({ onClick, hidden }) {
  return (
    <button
      onClick={onClick}
      className="partner-back-btn"
      style={{
        position: 'fixed',
        top: 16,
        left: 16,
        zIndex: 9999,
        display: hidden ? 'none' : 'inline-flex',
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
        whiteSpace: 'nowrap',
        lineHeight: 1,
        boxShadow: '0 2px 10px rgba(232,98,26,0.35)',
      }}
    >
      ← Все партнёры
    </button>
  )
}
