const SECTIONS = [
  {
    emoji: '🚗',
    label: 'Гид Водителя',
    page: 'gid-voditelya',
    path: '/gid-voditelya',
    gradient: 'linear-gradient(135deg, #FF6B35, #E8621A)',
    shadowColor: '#a8420e',
  },
  {
    emoji: '👨‍👩‍👧',
    label: 'Гид для Родителей',
    page: 'gid-roditelyam',
    path: '/gid-roditelyam',
    gradient: 'linear-gradient(135deg, #4ECDC4, #2BA99F)',
    shadowColor: '#1a7a74',
  },
  {
    emoji: '🔧',
    label: 'Гид Сервис',
    page: 'gid-servis',
    path: '/gid-servis',
    gradient: 'linear-gradient(135deg, #667EEA, #764BA2)',
    shadowColor: '#4a2d6e',
  },
  {
    emoji: '💼',
    label: 'Гид для Бизнеса',
    page: 'gid-biznes',
    path: '/gid-biznes',
    gradient: 'linear-gradient(135deg, #F7971E, #FFD200)',
    shadowColor: '#b8700a',
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
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = isActive
                    ? `0 8px 0 ${s.shadowColor}, 0 12px 20px rgba(0,0,0,0.3), 0 0 0 3px rgba(255,255,255,0.7)`
                    : `0 8px 0 ${s.shadowColor}, 0 12px 20px rgba(0,0,0,0.3)`
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.animationPlayState = 'running'
                }}
                onMouseDown={e => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)'
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)'
                }}
              >
                <span style={{ fontSize: 48, lineHeight: 1, display: 'block' }}>{s.emoji}</span>
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
