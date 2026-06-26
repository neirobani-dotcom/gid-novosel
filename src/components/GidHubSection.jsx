const SECTIONS = [
  { emoji: '🚗', label: 'Гид Водителя',      page: 'gid-voditelya',  path: '/gid-voditelya' },
  { emoji: '👨‍👩‍👧', label: 'Гид для Родителей', page: 'gid-roditelyam', path: '/gid-roditelyam' },
  { emoji: '🔧', label: 'Гид Сервис',         page: 'gid-servis',     path: '/gid-servis' },
  { emoji: '💼', label: 'Гид для Бизнеса',    page: 'gid-biznes',     path: '/gid-biznes' },
]

export default function GidHubSection({ onNavigate, activePage }) {
  return (
    <div style={{ padding: '28px 20px 4px', maxWidth: 640, margin: '0 auto' }}>
      <p style={{
        fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.08em', color: '#A09890', marginBottom: 12,
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
              className="gid-hub-btn"
              style={{
                background: isActive ? '#FFF3E8' : '#FFFFFF',
                border: isActive ? '2px solid #E8621A' : '1.5px solid #EDE8E0',
              }}
            >
              <span style={{ fontSize: 32 }}>{s.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#E8621A', lineHeight: 1.2 }}>{s.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
