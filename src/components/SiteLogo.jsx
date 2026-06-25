export default function SiteLogo({ variant = 'large' }) {
  if (variant === 'header') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, textDecoration: 'none' }}>
        <img
          src="/site-logo.png"
          alt="Гид Новосёла"
          className="logo-icon-pulse"
          style={{ width: 40, height: 40, objectFit: 'contain' }}
          loading="eager"
        />
        <span style={{ fontSize: 15, fontWeight: 800, color: '#E8621A', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
          Гид Новосёла
        </span>
      </div>
    )
  }

  if (variant === 'small') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
        <img
          src="/site-logo.png"
          alt="Гид Новосёла"
          style={{ width: 32, height: 32, objectFit: 'contain' }}
          loading="eager"
        />
        <span style={{ fontSize: 14, fontWeight: 800, color: '#E8621A', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
          Гид Новосёла
        </span>
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img
          src="/site-logo.png"
          alt="Гид Новосёла"
          style={{ width: 36, height: 36, objectFit: 'contain', opacity: 0.9 }}
          loading="lazy"
        />
        <span style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
          Гид Новосёла
        </span>
      </div>
    )
  }

  // large — для Hero (крупный, с анимацией)
  return (
    <img
      src="/site-logo.png"
      alt="Гид Новосёла"
      className="logo-icon-pulse"
      style={{ width: 900, height: 'auto', objectFit: 'contain' }}
      loading="eager"
    />
  )
}
