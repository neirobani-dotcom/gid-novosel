const IconWheel = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="18" stroke="white" strokeWidth="2.5"/>
    <circle cx="26" cy="26" r="4" stroke="white" strokeWidth="2.5"/>
    <line x1="26" y1="22" x2="26" y2="8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="22" y1="28" x2="11" y2="34" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="30" y1="28" x2="41" y2="34" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
)

const IconFamily = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="14" r="5" stroke="white" strokeWidth="2"/>
    <path d="M8 38 C8 28 24 28 24 38" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="36" cy="14" r="5" stroke="white" strokeWidth="2"/>
    <path d="M28 38 C28 28 44 28 44 38" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="26" cy="30" r="3.5" stroke="white" strokeWidth="2"/>
    <path d="M20 46 C20 39 32 39 32 46" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const IconGear = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="7" stroke="white" strokeWidth="2.5"/>
    <path d="M22 10 L22 14 M22 30 L22 34 M10 22 L14 22 M30 22 L34 22 M13.5 13.5 L16.5 16.5 M27.5 27.5 L30.5 30.5 M30.5 13.5 L27.5 16.5 M16.5 27.5 L13.5 30.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M32 32 L44 44" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="30" cy="30" r="4" stroke="white" strokeWidth="2.5"/>
  </svg>
)

const IconBriefcase = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="20" width="40" height="26" rx="4" stroke="white" strokeWidth="2.5"/>
    <path d="M18 20 L18 14 C18 11 34 11 34 14 L34 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="6" y1="33" x2="46" y2="33" stroke="white" strokeWidth="2"/>
    <rect x="22" y="29" width="8" height="8" rx="2" stroke="white" strokeWidth="2"/>
  </svg>
)

const IconHealth = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="8" width="12" height="36" rx="3" stroke="white" strokeWidth="2.5"/>
    <rect x="8" y="20" width="36" height="12" rx="3" stroke="white" strokeWidth="2.5"/>
    <path d="M26 30 C26 30 20 26 20 22 C20 19.5 22 18 24 18.5 C25 18.8 26 20 26 20 C26 20 27 18.8 28 18.5 C30 18 32 19.5 32 22 C32 26 26 30 26 30Z" fill="white"/>
  </svg>
)

const SECTIONS = [
  {
    Icon: IconWheel,
    label: 'Гид Водителя',
    page: 'gid-voditelya',
    path: '/gid-voditelya',
    gradient: 'linear-gradient(135deg, #FF6B35, #E8621A)',
    shadowColor: '#a8420e',
  },
  {
    Icon: IconFamily,
    label: 'Гид для Родителей',
    page: 'gid-roditelyam',
    path: '/gid-roditelyam',
    gradient: 'linear-gradient(135deg, #4ECDC4, #2BA99F)',
    shadowColor: '#1a7a74',
  },
  {
    Icon: IconGear,
    label: 'Гид Сервис',
    page: 'gid-servis',
    path: '/gid-servis',
    gradient: 'linear-gradient(135deg, #667EEA, #764BA2)',
    shadowColor: '#4a2d6e',
  },
  {
    Icon: IconBriefcase,
    label: 'Гид для Бизнеса',
    page: 'gid-biznes',
    path: '/gid-biznes',
    gradient: 'linear-gradient(135deg, #F7971E, #FFD200)',
    shadowColor: '#b8700a',
  },
  {
    Icon: IconHealth,
    label: 'Гид Здоровья',
    page: 'gid-zdorovya',
    path: '/gid-zdorovya',
    gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
    shadowColor: '#0a6b61',
  },
]

export default function GidHubSection({ onNavigate, activePage }) {
  return (
    <div style={{
      padding: '28px 20px 32px',
      background: 'rgba(0,0,0,0.02)',
      borderTop: '1px solid rgba(0,0,0,0.06)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
    }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: '#888',
          marginBottom: 18,
          textAlign: 'center',
        }}>
          Разделы Гида
        </p>
        <div className="gid-hub-grid">
          {SECTIONS.map(s => {
            const isActive = s.page === activePage
            return (
              <button
                key={s.page}
                onClick={() => onNavigate?.(s.page, s.path)}
                className="gid-hub-btn-3d"
                style={{
                  background: s.gradient,
                  boxShadow: isActive
                    ? `0 8px 0 ${s.shadowColor}, 0 12px 20px rgba(0,0,0,0.3), 0 0 0 3px rgba(255,255,255,0.7)`
                    : `0 8px 0 ${s.shadowColor}, 0 12px 20px rgba(0,0,0,0.3)`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 12px 0 ${s.shadowColor}, 0 20px 32px rgba(0,0,0,0.38)`
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)'
                  e.currentTarget.style.animationPlayState = 'paused'
                  e.currentTarget.querySelector('svg').style.filter = 'drop-shadow(0 4px 8px rgba(255,255,255,0.4))'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = isActive
                    ? `0 8px 0 ${s.shadowColor}, 0 12px 20px rgba(0,0,0,0.3), 0 0 0 3px rgba(255,255,255,0.7)`
                    : `0 8px 0 ${s.shadowColor}, 0 12px 20px rgba(0,0,0,0.3)`
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.animationPlayState = 'running'
                  e.currentTarget.querySelector('svg').style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                }}
                onMouseDown={e => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)'
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)'
                }}
              >
                <div style={{
                  width: 52, height: 52,
                  marginBottom: 10,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                  transition: 'filter 0.3s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <s.Icon />
                </div>
                <span style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#fff',
                  textShadow: '0 1px 4px rgba(0,0,0,0.35)',
                  lineHeight: 1.2,
                  textAlign: 'center',
                  padding: '0 6px',
                  display: 'block',
                }}>
                  {s.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
