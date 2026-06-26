import SiteHeader from '../components/SiteHeader'
import SiteLogo from '../components/SiteLogo'
import GidHubSection from '../components/GidHubSection'
import GridCard from '../components/GridCard'
import WhatsAppButton from '../components/WhatsAppButton'
import ScrollToTop from '../components/ScrollToTop'
import { companies } from '../data/companies'

const AUTO_PARTNER_IDS = ['irbis', 'krasnoyarsk-rassrochka-avto']

export default function GidVoditelya({ onNavigate, onPartnerClick }) {
  const autoPartners = companies.filter(c => AUTO_PARTNER_IDS.includes(c.id))

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
              🚗 Красноярск
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 8vw, 42px)', fontWeight: 900,
            color: '#E8621A', letterSpacing: '-0.03em',
            lineHeight: 1.2, marginBottom: 10,
          }}>
            Гид Водителя
          </h1>
          <p style={{ fontSize: 15, color: '#6B6560', lineHeight: 1.6, maxWidth: '36ch' }}>
            Кузовной ремонт, автосервис и покупка автомобиля в рассрочку — всё для вашего авто
          </p>
        </div>
      </section>

      {/* Разделы Гида */}
      <GidHubSection onNavigate={onNavigate} activePage="gid-voditelya" />

      {/* Партнёры */}
      <section style={{ padding: '8px 16px 16px', maxWidth: 640, margin: '0 auto' }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1A1816', marginBottom: 6 }}>
          Партнёры раздела
        </h2>
        <p style={{ fontSize: 13, color: '#A09890', marginBottom: 14 }}>
          Предъявите{' '}
          <span style={{ fontWeight: 800, color: '#E8621A', fontSize: '1rem' }}>СЕРТИФИКАТ</span>
          {' '}при визите — и получите скидку
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
          {autoPartners.map((company, i) => (
            <div key={company.id} className="fade-up-card" style={{ animationDelay: `${i * 0.06}s` }}>
              <GridCard company={company} onClick={c => onPartnerClick?.(c)} />
            </div>
          ))}
        </div>
      </section>

      <WhatsAppButton />
      <ScrollToTop />

      {/* Футер */}
      <footer style={{ background: '#2D2D2D', marginTop: 40, padding: '28px 20px 20px' }}>
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
