import { useState, useEffect, useRef } from 'react'
import SiteHeader from './components/SiteHeader'
import SiteLogo from './components/SiteLogo'
import { companies } from './data/companies'
import GridCard from './components/GridCard'
import EmptySlot from './components/EmptySlot'
import GiftsPage from './pages/GiftsPage'
import GiftsBoxPage from './pages/GiftsBoxPage'
import GiftDetailPage from './pages/GiftDetailPage'
import CompanyPage from './pages/CompanyPage'
import AdminPage from './pages/AdminPage'
import CountdownTimer from './components/CountdownTimer'
import PopupWidget from './components/PopupWidget'
import WhatsAppButton from './components/WhatsAppButton'
import './index.css'

const EMPTY_COUNT = 35
const PARTNER_SECTION_ID = 'partners'

// Анимированный счётчик числа
function AnimatedCounter({ target, duration = 1400 }) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return <>{value.toLocaleString('ru-RU')}</>
}

const STEPS = [
  { icon: '🏪', num: '1', title: 'Выберите партнёра', desc: 'Найдите компанию в каталоге' },
  { icon: '📱', num: '2', title: 'Оставьте заявку за 1 минуту', desc: 'Укажите имя и телефон' },
  { icon: '🎁', num: '3', title: 'Получите подарок', desc: 'Менеджер свяжется за час' },
]

export default function App() {
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState('home')
  const [giftPartnerId, setGiftPartnerId] = useState(null)
  const [filter, setFilter] = useState('Все')
  const [tapCount, setTapCount] = useState(0)
  const partnerRef = useRef(null)

  const totalGifts = companies.reduce((s, c) => s + c.giftAmount, 0)
  const categories = ['Все', ...new Set(companies.map(c => c.category))]
  const visibleCompanies = filter === 'Все' ? companies : companies.filter(c => c.category === filter)

  const scrollToPartners = () => {
    document.getElementById(PARTNER_SECTION_ID)?.scrollIntoView({ behavior: 'smooth' })
  }

  if (page === 'admin') return <AdminPage onBack={() => setPage('home')} />
  if (page === 'gifts') return (
    <GiftsPage onBack={() => setPage('home')} onSelect={c => { setSelected(c); setPage('company') }} />
  )
  if (page === 'gifts-boxes') return (
    <GiftsBoxPage
      onBack={() => setPage('home')}
      onSelect={pid => { setGiftPartnerId(pid); setPage('gift-detail') }}
    />
  )
  if (page === 'gift-detail' && giftPartnerId) return (
    <GiftDetailPage
      partnerId={giftPartnerId}
      onBack={() => setPage('gifts-boxes')}
    />
  )
  if (page === 'company' && selected) return <CompanyPage company={selected} onBack={() => setPage('home')} />

  return (
    <div className="min-h-screen" style={{ background: '#F7F4F0' }}>

      {/* ── STICKY ШАПКА ── */}
      <SiteHeader onPartnerClick={scrollToPartners} />

      {/* ── СЧЁТЧИК-БАННЕР ── */}
      <CountdownTimer />

      {/* ── ГЕРОЙ ── */}
      <section style={{ background: 'linear-gradient(160deg, #FFF3E0 0%, #FFFAF5 50%, #F7F4F0 100%)', paddingBottom: 40, position: 'relative', overflow: 'hidden' }}>
        {/* Декоративные блики */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,176,64,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,98,26,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px 0' }}>
          {/* Бейдж города */}
          <div className="hero-title" style={{ marginBottom: 16 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: '#FFF0DC', border: '1px solid #FFD0A0',
              borderRadius: 20, padding: '5px 12px',
              fontSize: 12, fontWeight: 600, color: '#C25820',
            }}>
              📍 Красноярск
            </span>
          </div>

          {/* Заголовок */}
          <h1 className="hero-title" style={{
            fontSize: 'clamp(26px, 7vw, 38px)',
            fontWeight: 900,
            color: '#1A1816',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: 14,
          }}>
            Подарки для новосёлов<br />
            <span style={{ color: '#E8621A' }}>Красноярска</span>
          </h1>

          {/* Подзаголовок */}
          <p className="hero-sub" style={{
            fontSize: 16, color: '#6B6560', lineHeight: 1.6,
            marginBottom: 24, maxWidth: '38ch',
          }}>
            Скидки и подарки от лучших компаний города — для тех, кто обустраивает новый дом
          </p>

          {/* Строка доверия */}
          <div className="hero-sub" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginBottom: 24 }}>
            {[
              `✓ ${companies.length} компаний-партнёров`,
              `✓ Подарки на сумму ${totalGifts.toLocaleString('ru-RU')} ₽`,
              '✓ Бесплатно для новосёлов',
            ].map((t, i) => (
              <span key={i} style={{ fontSize: 13, color: '#22C55E', fontWeight: 600 }}>{t}</span>
            ))}
          </div>

          {/* Счётчик */}
          <div
            className="hero-counter"
            onClick={() => {
              const next = tapCount + 1
              if (next >= 5) { setTapCount(0); setPage('admin') }
              else { setTapCount(next); scrollToPartners() }
            }}
            style={{
              display: 'inline-flex', flexDirection: 'column',
              background: '#FFFFFF', border: '1px solid #EDE8E0',
              borderRadius: 20, padding: '16px 24px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              marginBottom: 24, cursor: 'pointer',
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', marginBottom: 4 }}>
              Подарков на сумму
            </p>
            <p style={{ fontSize: 38, fontWeight: 900, color: '#E8621A', letterSpacing: '-0.04em', lineHeight: 1 }}>
              <AnimatedCounter target={totalGifts} /> ₽
            </p>
            <p style={{ fontSize: 12, color: '#A09890', marginTop: 4 }}>
              от {companies.length} компаний-партнёров · 47 новосёлов уже получили подарки
            </p>
          </div>

          {/* CTA кнопка */}
          <div className="hero-cta" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={() => setPage('gifts-boxes')}
              className="btn-orange btn-pulse tap-target"
              style={{
                background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
                color: '#fff', border: 'none', borderRadius: 16,
                padding: '0 32px', fontSize: 16, fontWeight: 800,
                cursor: 'pointer', height: 56, display: 'inline-flex',
                alignItems: 'center', gap: 8,
              }}
            >
              Смотреть подарки →
            </button>
          </div>

        </div>
      </section>

      {/* ── КАК ЭТО РАБОТАЕТ ── */}
      <section style={{ padding: '32px 20px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: '20px 16px', border: '1px solid #EDE8E0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', marginBottom: 20 }}>
              Как это работает
            </p>
            <div style={{ display: 'flex', gap: 0 }}>
              {STEPS.map((s, i) => (
                <div key={i} style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  {i < STEPS.length - 1 && (
                    <div style={{ position: 'absolute', top: 20, left: 'calc(50% + 22px)', right: 0, height: 1, background: '#EDE8E0' }} />
                  )}
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, marginBottom: 8, position: 'relative', zIndex: 1,
                    ...(i === 0
                      ? { background: '#E8621A', boxShadow: '0 4px 12px rgba(232,98,26,0.3)' }
                      : { background: '#FFF3E8', border: '1.5px solid #FFD0A0' }),
                  }}>
                    {s.icon}
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#1A1816', lineHeight: 1.3, marginBottom: 3, padding: '0 4px' }}>
                    {s.title}
                  </p>
                  <p style={{ fontSize: 10, color: '#A09890', padding: '0 4px', lineHeight: 1.3 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ПАРТНЁРЫ ── */}
      <section id={PARTNER_SECTION_ID} style={{ padding: '0 16px 16px', maxWidth: 640, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1A1816' }}>Компании-партнёры</h2>
          <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: '#FFF0DC', color: '#C25820' }}>
            {companies.length} из 40
          </span>
        </div>
        <p style={{ fontSize: 13, color: '#A09890', marginBottom: 14 }}>
          Предъявите{' '}
          <span style={{ fontWeight: 800, color: '#E8621A', fontSize: '1rem' }}>СЕРТИФИКАТ</span>
          {' '}при визите — и получите скидку
        </p>

        {/* Фильтры */}
        <div className="no-scrollbar" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 14 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="filter-btn tap-target"
              style={{
                flexShrink: 0, fontSize: 12, padding: '0 16px', borderRadius: 20,
                whiteSpace: 'nowrap', fontWeight: 500, border: '1px solid',
                height: 36, cursor: 'pointer',
                ...(filter === cat
                  ? { background: '#E8621A', color: '#FFF', borderColor: '#E8621A' }
                  : { background: '#FFF', color: '#6B6560', borderColor: '#EDE8E0' }),
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Сетка карточек */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
          {visibleCompanies.map((company, i) => (
            <div key={company.id} className="fade-up-card" style={{ animationDelay: `${Math.min(i, 8) * 0.06}s` }}>
              <GridCard
                company={company}
                onClick={c => { setSelected(c); setPage('company') }}
              />
            </div>
          ))}

          {/* Пустые слоты */}
          {filter === 'Все' && Array(EMPTY_COUNT).fill(null).map((_, i) => (
            <div key={`empty-${i}`} className="fade-up-card" style={{ animationDelay: `${Math.min(i + visibleCompanies.length, 12) * 0.04}s` }}>
              <EmptySlot onPartnerClick={i < 3 ? scrollToPartners : undefined} />
            </div>
          ))}
        </div>
      </section>

      {/* ── КАРТА ── */}
      <section style={{ padding: '40px 20px 0', maxWidth: 640, margin: '0 auto' }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1816', marginBottom: 6 }}>
          Где нас найти
        </h2>
        <p style={{ fontSize: 14, color: '#A09890', marginBottom: 16 }}>
          Все компании-партнёры в Красноярске
        </p>
        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.09)' }}>
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=92.8932,56.0097&z=12"
            className="map-iframe"
            title="Партнёры в Красноярске"
            allowFullScreen
          />
        </div>
      </section>

      {/* ── КНОПКА WHATSAPP ── */}
      <WhatsAppButton />

      {/* ── ВСПЛЫВАШКА (30 сек) ── */}
      <PopupWidget onGiftsClick={() => setPage('gifts-boxes')} />

      {/* ── ФУТЕР ── */}
      <footer id="become-partner" style={{ background: '#2D2D2D', marginTop: 40, padding: '32px 20px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <SiteLogo variant="footer" />
          <p style={{ fontSize: 13, color: '#A09890', marginTop: 10, marginBottom: 20, lineHeight: 1.6 }}>
            Гид Новосёла — подарки для тех,<br />кто обустраивает новый дом в Красноярске
          </p>

          <div style={{ borderTop: '1px solid #3D3D3D', paddingTop: 16, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <p style={{ fontSize: 12, color: '#6B6560' }}>📧 neirobanya@mail.ru</p>
              <p style={{ fontSize: 11, color: '#4A4A4A', marginTop: 6 }}>© 2025 Гид Новосёла. Все права защищены.</p>
            </div>
            <button
              onClick={scrollToPartners}
              style={{
                background: 'transparent', border: '1px solid #E8621A',
                color: '#E8621A', borderRadius: 10, padding: '8px 16px',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Стать партнёром →
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
