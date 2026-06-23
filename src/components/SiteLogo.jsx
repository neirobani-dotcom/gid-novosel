function BuildingIcon({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Башня */}
      <rect x="18" y="4" width="12" height="14" rx="2" />
      <rect x="21" y="7" width="6" height="6" rx="1" fill="white" fillOpacity="0.9" />
      {/* Основной корпус */}
      <rect x="6" y="16" width="36" height="30" rx="2" />
      {/* Окна */}
      <rect x="10" y="20" width="7" height="7" rx="1" fill="white" fillOpacity="0.9" />
      <rect x="31" y="20" width="7" height="7" rx="1" fill="white" fillOpacity="0.9" />
      <rect x="10" y="31" width="7" height="7" rx="1" fill="white" fillOpacity="0.9" />
      <rect x="31" y="31" width="7" height="7" rx="1" fill="white" fillOpacity="0.9" />
      {/* Дверь */}
      <rect x="20" y="34" width="8" height="12" rx="1" fill="white" fillOpacity="0.9" />
    </svg>
  )
}

export default function SiteLogo({ variant = 'large' }) {
  if (variant === 'small') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
        <span className="logo-icon-pulse" style={{ color: '#E8621A', display: 'flex', lineHeight: 1 }}>
          <BuildingIcon size={22} />
        </span>
        <span style={{ fontSize: 14, fontWeight: 800, color: '#E8621A', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
          Гид Новосёла
        </span>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
      <span className="logo-icon-pulse" style={{ color: '#E8621A', display: 'flex' }}>
        <BuildingIcon size={60} />
      </span>
      <div style={{ fontSize: 36, fontWeight: 800, color: '#E8621A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
        Гид&nbsp;Новосёла
      </div>
    </div>
  )
}
