import SiteHeader from '../components/SiteHeader'
import SiteLogo from '../components/SiteLogo'
import GidHubSection from '../components/GidHubSection'
import WhatsAppButton from '../components/WhatsAppButton'
import ScrollToTop from '../components/ScrollToTop'

export default function GidEmpty({ title, emoji, activePage, onNavigate }) {
  return (
    <div className="min-h-screen" style={{ background: '#F7F4F0' }}>
      <SiteHeader onPartnerClick={() => {}} />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(160deg, #FFF3E0 0%, #FFFAF5 50%, #F7F4F0 100%)',
        padding: '20px 20px 32px',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <button
            onClick={() => onNavigate?.('home', '/')}
            style={{
              background: 'none', border: 'none', color: '#A09890',
              fontSize: 14, cursor: 'pointer', padding: '0 0 16px',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            ← На главную
          </button>

          <div style={{ marginBottom: 8 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: '#FFF0DC', borderRadius: 20, padding: '5px 12px',
              fontSize: 12, fontWeight: 600, color: '#C25820',
            }}>
              📍 Красноярск
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 8vw, 42px)', fontWeight: 900,
            color: '#E8621A', letterSpacing: '-0.03em',
            lineHeight: 1.2, marginBottom: 10,
          }}>
            {emoji} {title}
          </h1>
          <p style={{ fontSize: 15, color: '#6B6560', lineHeight: 1.6 }}>
            Раздел в разработке — скоро здесь появятся партнёры с подарками для вас
          </p>
        </div>
      </section>

      {/* Разделы Гида */}
      <GidHubSection onNavigate={onNavigate} activePage={activePage} />

      {/* Заглушка */}
      <section style={{ padding: '8px 16px 40px', maxWidth: 640, margin: '0 auto' }}>
        <div style={{
          background: '#FFFFFF', borderRadius: 20, padding: '36px 24px',
          border: '2px dashed #EDE8E0', textAlign: 'center',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}>
          <p style={{ fontSize: 44, marginBottom: 14 }}>🔜</p>
          <p style={{ fontSize: 18, fontWeight: 800, color: '#1A1816', marginBottom: 8 }}>
            Партнёры скоро появятся
          </p>
          <p style={{ fontSize: 14, color: '#A09890', lineHeight: 1.6, marginBottom: 24 }}>
            Мы уже ведём переговоры с партнёрами<br />для этого раздела. Возвращайтесь позже!
          </p>
          <button
            onClick={() => onNavigate?.('home', '/')}
            className="btn-orange tap-target"
            style={{
              background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
              color: '#fff', border: 'none', borderRadius: 12,
              padding: '0 28px', fontSize: 15, fontWeight: 700,
              cursor: 'pointer', height: 52, display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            ← На главную
          </button>
        </div>
      </section>

      <WhatsAppButton />
      <ScrollToTop />

      {/* Футер */}
      <footer style={{ background: '#2D2D2D', padding: '28px 20px 20px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <SiteLogo variant="footer" />
          <p style={{ fontSize: 13, color: '#A09890', marginTop: 10, marginBottom: 20, lineHeight: 1.6 }}>
            Гид Новосёла — подарки для тех,<br />кто обустраивает новый дом в Красноярске
          </p>
          <div style={{
            borderTop: '1px solid #3D3D3D', paddingTop: 16,
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-between', gap: 12,
          }}>
            <div>
              <p style={{ fontSize: 12, color: '#6B6560' }}>📧 neirobanya@mail.ru</p>
              <p style={{ fontSize: 11, color: '#4A4A4A', marginTop: 6 }}>© 2026 Гид Новосёла. Все права защищены.</p>
            </div>
            <button
              onClick={() => onNavigate?.('home', '/')}
              style={{
                background: 'transparent', border: '1px solid #E8621A',
                color: '#E8621A', borderRadius: 10, padding: '8px 16px',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              ← На главную
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
