export default function SiteLogo({ variant = 'large' }) {
  if (variant === 'small') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
        <img src="/site-logo.png" alt="Гид Новосёла" style={{ width: 330, height: 330, objectFit: 'contain' }} />
        <span style={{ fontSize: 14, fontWeight: 800, color: '#E8621A', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
          Гид Новосёла
        </span>
      </div>
    )
  }

  return (
    <img src="/site-logo.png" alt="Гид Новосёла" className="logo-icon-pulse" style={{ width: 900, height: 900, objectFit: 'contain' }} />
  )
}
