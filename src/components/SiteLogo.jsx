export default function SiteLogo({ variant = 'large' }) {
  if (variant === 'small') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
        <img src="/site-logo.png" alt="Гид Новосёла" style={{ width: 22, height: 22, objectFit: 'contain' }} />
        <span style={{ fontSize: 14, fontWeight: 800, color: '#E8621A', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
          Гид Новосёла
        </span>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
      <img src="/site-logo.png" alt="Гид Новосёла" style={{ width: 60, height: 60, objectFit: 'contain' }} />
      <div style={{ fontSize: 36, fontWeight: 800, color: '#E8621A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
        Гид&nbsp;Новосёла
      </div>
    </div>
  )
}
