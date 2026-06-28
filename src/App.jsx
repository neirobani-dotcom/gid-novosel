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
import VisitorCounter from './components/VisitorCounter'
import MatrixTitle from './components/MatrixTitle'
import AnimatedText from './components/AnimatedText'
import PopupWidget from './components/PopupWidget'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'
import GidHubSection from './components/GidHubSection'
import GidVoditelya from './pages/GidVoditelya'
import GidEmpty from './pages/GidEmpty'
import SmdPage from './pages/SmdPage'
import SibmebelPage from './pages/SibmebelPage'
import NeirobanyaPage from './pages/NeirobanyaPage'
import ProclimatPage from './pages/ProclimatPage'
import ShaturaPage from './pages/ShaturaPage'
import PartnerNavArrows from './components/PartnerNavArrows'
import AnimatedBanner from './components/AnimatedBanner'
import InstructionModal from './components/InstructionModal'
import './index.css'

const EMPTY_COUNT = 35
const PARTNER_SECTION_ID = 'partners'
const AUTO_PARTNER_IDS = ['irbis', 'krasnoyarsk-rassrochka-avto']

// Появление при скролле
function FadeInSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.12 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Анимированный счётчик числа
function AnimatedCounter({ target, duration = 2000 }) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)
  const startedRef = useRef(false)
  const elRef = useRef(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true
        observer.disconnect()
        const startTime = performance.now()
        const update = (now) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.floor(eased * target))
          if (progress < 1) rafRef.current = requestAnimationFrame(update)
        }
        rafRef.current = requestAnimationFrame(update)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => { observer.disconnect(); cancelAnimationFrame(rafRef.current) }
  }, [target, duration])

  return <span ref={elRef}>{value.toLocaleString('ru-RU')}</span>
}

const STEPS = [
  { icon: '🏪', num: '1', title: 'Выберите партнёра', desc: 'Найдите компанию в каталоге' },
  { icon: '📱', num: '2', title: 'Оставьте заявку за 1 минуту', desc: 'Укажите имя и телефон' },
  { icon: '🎁', num: '3', title: 'Получите подарок', desc: 'Менеджер свяжется за час' },
]

export default function App() {
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(() => {
    const p = window.location.pathname
    if (p === '/gid-voditelya') return 'gid-voditelya'
    if (p === '/gid-roditelyam') return 'gid-roditelyam'
    if (p === '/gid-servis') return 'gid-servis'
    if (p === '/gid-biznes') return 'gid-biznes'
    if (p === '/gid-zdorovya') return 'gid-zdorovya'
    if (p === '/gifts/smd') return 'smd'
    if (p === '/gifts/sibmebel') return 'sibmebel'
    if (p === '/gifts/neirobanya') return 'neirobanya'
    if (p === '/gifts/proclimat') return 'proclimat'
    if (p === '/gifts/shatura') return 'shatura'
    return 'home'
  })
  const [giftPartnerId, setGiftPartnerId] = useState(null)
  const [filter, setFilter] = useState('Все')
  const [barWidth, setBarWidth] = useState(0)
  const [tapCount, setTapCount] = useState(0)
  const partnerRef = useRef(null)
  const prevPageRef = useRef('home')

  const totalGifts = companies.reduce((s, c) => s + c.giftAmount, 0)
  const mainCompanies = companies.filter(c => !AUTO_PARTNER_IDS.includes(c.id))
  const categories = ['Все', ...new Set(mainCompanies.map(c => c.category))]
  const visibleCompanies = filter === 'Все' ? mainCompanies : mainCompanies.filter(c => c.category === filter)

  const scrollToPartners = () => {
    document.getElementById(PARTNER_SECTION_ID)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navigateTo = (pageName, urlPath) => {
    window.history.pushState({}, '', urlPath)
    window.dispatchEvent(new CustomEvent('gid:navigate'))
    setPage(pageName)
  }

  const navigateToPartner = (company) => {
    window.scrollTo(0, 0)
    if (company.id === 'smd') { navigateTo('smd', '/gifts/smd') }
    else if (company.id === 'sibmebel') { navigateTo('sibmebel', '/gifts/sibmebel') }
    else if (company.id === 'neirobanya') { navigateTo('neirobanya', '/gifts/neirobanya') }
    else if (company.id === 'proclimat') { navigateTo('proclimat', '/gifts/proclimat') }
    else if (company.id === 'shatura') { navigateTo('shatura', '/gifts/shatura') }
    else { setSelected(company); prevPageRef.current = 'home'; setPage('company') }
  }

  useEffect(() => {
    const handlePop = () => {
      const p = window.location.pathname
      if (p === '/gid-voditelya') setPage('gid-voditelya')
      else if (p === '/gid-roditelyam') setPage('gid-roditelyam')
      else if (p === '/gid-servis') setPage('gid-servis')
      else if (p === '/gid-biznes') setPage('gid-biznes')
      else if (p === '/gid-zdorovya') setPage('gid-zdorovya')
      else if (p === '/gifts/smd') setPage('smd')
      else if (p === '/gifts/sibmebel') setPage('sibmebel')
      else if (p === '/gifts/neirobanya') setPage('neirobanya')
      else if (p === '/gifts/proclimat') setPage('proclimat')
      else if (p === '/gifts/shatura') setPage('shatura')
      else setPage('home')
    }
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setBarWidth((companies.length / 40) * 100), 300)
    return () => clearTimeout(t)
  }, [])

  if (page === 'admin') return <AdminPage onBack={() => setPage('home')} />
  if (page === 'gid-voditelya') return (
    <GidVoditelya
      onNavigate={navigateTo}
      onPartnerClick={(c) => { setSelected(c); prevPageRef.current = 'gid-voditelya'; setPage('company') }}
    />
  )
  if (page === 'gid-roditelyam') return <GidEmpty title="Гид для Родителей" emoji="👨‍👩‍👧" activePage="gid-roditelyam" onNavigate={navigateTo} />
  if (page === 'gid-servis') return <GidEmpty title="Гид Сервис" emoji="🔧" activePage="gid-servis" onNavigate={navigateTo} />
  if (page === 'gid-biznes') return <GidEmpty title="Гид для Бизнеса" emoji="💼" activePage="gid-biznes" onNavigate={navigateTo} />
  if (page === 'gid-zdorovya') return <GidEmpty title="Гид Здоровья" emoji="🏥" activePage="gid-zdorovya" onNavigate={navigateTo} />
  if (page === 'gifts') return (
    <GiftsPage onBack={() => setPage('home')} onSelect={c => { setSelected(c); prevPageRef.current = 'home'; setPage('company') }} />
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
  if (page === 'shatura') return (
    <>
      <ShaturaPage onBack={() => navigateTo('home', '/')} />
      <PartnerNavArrows currentId="shatura" onNavigate={navigateToPartner} />
    </>
  )
  if (page === 'neirobanya') return (
    <>
      <NeirobanyaPage onBack={() => navigateTo('home', '/')} />
      <PartnerNavArrows currentId="neirobanya" onNavigate={navigateToPartner} />
    </>
  )
  if (page === 'proclimat') return (
    <>
      <ProclimatPage onBack={() => navigateTo('home', '/')} />
      <PartnerNavArrows currentId="proclimat" onNavigate={navigateToPartner} />
    </>
  )
  if (page === 'smd') return (
    <>
      <SmdPage onBack={() => navigateTo('home', '/')} />
      <PartnerNavArrows currentId="smd" onNavigate={navigateToPartner} />
    </>
  )
  if (page === 'sibmebel') return (
    <>
      <SibmebelPage onBack={() => navigateTo('home', '/')} />
      <PartnerNavArrows currentId="sibmebel" onNavigate={navigateToPartner} />
    </>
  )
  if (page === 'company' && selected) return (
    <>
      <CompanyPage
        company={selected}
        onBack={() => { setPage(prevPageRef.current); prevPageRef.current = 'home' }}
      />
      <PartnerNavArrows currentId={selected.id} onNavigate={navigateToPartner} />
    </>
  )

  return (
    <div className="min-h-screen" style={{ background: '#F7F4F0' }}>

      {/* ── STICKY ШАПКА ── */}
      <SiteHeader onPartnerClick={scrollToPartners} />

      {/* ── СЧЁТЧИК-БАННЕР ── */}
      <CountdownTimer />

      {/* ── АНИМИРОВАННЫЙ БАННЕР ── */}
      <AnimatedBanner />

      {/* ── ГЕРОЙ ── */}
      <section style={{ background: 'linear-gradient(160deg, #FFF3E0 0%, #FFFAF5 50%, #F7F4F0 100%)', paddingBottom: 40, position: 'relative', overflow: 'hidden' }}>
        {/* Декоративные блики */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,176,64,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,98,26,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px 0' }}>
          {/* Бейдж города */}
          <div className="hero-title" style={{ marginBottom: 10 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: '#FFF0DC',
              borderRadius: 20, padding: '5px 12px',
              fontSize: 12, fontWeight: 600, color: '#C25820',
            }}>
              📍 Красноярск
            </span>
          </div>

          {/* Матрица */}
          <div className="hero-title" style={{ marginBottom: 10 }}>
            <MatrixTitle className="hero-title-matrix" />
          </div>

          {/* Заголовок */}
          <h1 className="hero-title" style={{
            fontSize: 'clamp(26px, 7vw, 38px)',
            fontWeight: 900,
            color: '#1A1816',
            lineHeight: 1.4,
            letterSpacing: '-0.03em',
            marginBottom: 14,
          }}>
            <AnimatedText text="Подарки для новосёлов" delay={2500} />
            {' '}
            <span style={{ color: '#E8621A' }}>
              <AnimatedText text="Красноярска" delay={2950} />
            </span>
          </h1>

          {/* Подзаголовок */}
          <p className="hero-sub" style={{
            fontSize: 16, color: '#6B6560', lineHeight: 1.6,
            marginBottom: 24, maxWidth: '38ch',
          }}>
            <AnimatedText text="Скидки и подарки от лучших компаний города — для тех, кто обустраивает новый дом" delay={3000} />
          </p>

          {/* Счётчик посетителей */}
          <VisitorCounter />

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
              className="btn-orange pulse-button tap-target"
              style={{
                background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
                color: '#fff', border: 'none', borderRadius: 16,
                padding: '0 32px', fontSize: 16, fontWeight: 800,
                cursor: 'pointer', height: 56, display: 'inline-flex',
                alignItems: 'center', gap: 8,
                animationDelay: '4s',
              }}
            >
              Смотреть подарки →
            </button>
          </div>

          <InstructionModal />

        </div>
      </section>

      {/* ── РАЗДЕЛЫ ГИДА ── */}
      <GidHubSection onNavigate={navigateTo} />

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
        {/* Огненная плашка */}
        <div style={{ marginBottom: 8 }}>
          <span style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, #FF4500, #E8621A)',
            color: '#fff',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '1.5px',
            padding: '4px 12px',
            borderRadius: 20,
          }}>
            🔥 ЭКСКЛЮЗИВНО ДЛЯ НОВОСЁЛОВ
          </span>
        </div>

        {/* Заголовок с огненным градиентом */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{
            fontSize: 18,
            fontWeight: 800,
            background: 'linear-gradient(90deg, #FF4500 0%, #E8621A 50%, #FF8C00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'fire-glow 2s ease-in-out infinite',
            margin: 0,
          }}>
            Компании-партнёры
          </h2>
          <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: '#FFF0DC', color: '#C25820', flexShrink: 0 }}>
            {companies.length} из 40
          </span>
        </div>

        {/* Прогресс-бар мест */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          padding: '14px 16px',
          marginBottom: 16,
          boxShadow: '0 2px 12px rgba(232,98,26,0.1)',
          border: '1px solid rgba(232,98,26,0.15)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: '#6B6560' }}>Занято мест партнёров</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#E8621A' }}>{companies.length} из 40</span>
          </div>
          <div style={{ width: '100%', height: 10, borderRadius: 10, background: '#E8E8E8', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${barWidth}%`,
              borderRadius: 10,
              background: 'linear-gradient(90deg, #FF4500, #E8621A, #FF8C00)',
              transition: 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <span style={{ fontSize: 12, color: '#22C55E' }}>✅ {40 - companies.length} мест ещё доступно</span>
            <span style={{ fontSize: 12, color: '#EF4444', animation: 'urgent-pulse 1.2s ease-in-out infinite', display: 'inline-block' }}>
              🔴 Торопитесь!
            </span>
          </div>
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
                onClick={c => {
                  if (c.id === 'smd') { navigateTo('smd', '/gifts/smd'); return }
                  if (c.id === 'sibmebel') { navigateTo('sibmebel', '/gifts/sibmebel'); return }
                  if (c.id === 'neirobanya') { navigateTo('neirobanya', '/gifts/neirobanya'); return }
                  if (c.id === 'proclimat') { navigateTo('proclimat', '/gifts/proclimat'); return }
                  if (c.id === 'shatura') { navigateTo('shatura', '/gifts/shatura'); return }
                  setSelected(c); prevPageRef.current = 'home'; setPage('company')
                }}
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
        <a
          href="https://yandex.ru/maps/?ll=92.8932,56.0097&z=12&pt=92.9057,56.0398~92.8750,56.0201~92.8823,56.0127~92.8932,56.0097~92.9080,56.0374~92.9068,56.0385~92.9640,56.0124~92.9213,56.0141~92.8664,56.0103~92.8678,56.0187"
          target="_blank"
          rel="noopener noreferrer"
          title="Открыть карту в Яндекс Картах"
          style={{ display: 'block', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.09)', cursor: 'pointer' }}
        >
          <img
            src="https://static-maps.yandex.ru/1.x/?ll=92.8932,56.0097&z=11&l=map&lang=ru_RU&pt=92.9057,56.0398,pm2rdm~92.8750,56.0201,pm2rdm~92.8823,56.0127,pm2rdm~92.8932,56.0097,pm2rdm~92.9080,56.0374,pm2rdm~92.9068,56.0385,pm2rdm~92.9640,56.0124,pm2rdm~92.9213,56.0141,pm2rdm~92.8664,56.0103,pm2rdm~92.8678,56.0187,pm2rdm&size=600,380"
            alt="Партнёры в Красноярске"
            className="map-iframe"
            style={{ display: 'block', width: '100%', objectFit: 'cover' }}
          />
        </a>
      </section>

      {/* ── КНОПКА WHATSAPP + НАВЕРХ ── */}
      <WhatsAppButton />
      <ScrollToTop />

      {/* ── ВСПЛЫВАШКА (30 сек) ── */}
      <PopupWidget onGiftsClick={() => setPage('gifts-boxes')} />

      {/* ── ФУТЕР ── */}
      <footer id="become-partner" style={{ background: '#2D2D2D', marginTop: 40, padding: '32px 20px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <FadeInSection delay={0}>
            <SiteLogo variant="footer" />
            <p style={{ fontSize: 13, color: '#A09890', marginTop: 10, marginBottom: 20, lineHeight: 1.6 }}>
              Гид Новосёла — подарки для тех,<br />кто обустраивает новый дом в Красноярске
            </p>
          </FadeInSection>

          {/* Статистика */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {[
              { num: companies.length.toString(), label: 'компаний-партнёров' },
              { num: '283 000 ₽', label: 'подарков на сумму' },
              { num: '47', label: 'новосёлов получили' },
            ].map((stat, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div style={{
                  background: '#2A2A2A', borderRadius: 12, padding: 16,
                  minWidth: 90, flex: '1 1 80px',
                }}>
                  <p style={{ fontSize: 22, fontWeight: 900, color: '#E8621A', lineHeight: 1, marginBottom: 4 }}>{stat.num}</p>
                  <p style={{ fontSize: 12, color: '#888888', lineHeight: 1.3 }}>{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={300}>
            <div style={{ borderTop: '1px solid #3D3D3D', paddingTop: 16, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <p style={{ fontSize: 12, color: '#6B6560' }}>📧 neirobanya@mail.ru</p>
                <p style={{ fontSize: 11, color: '#4A4A4A', marginTop: 6 }}>© 2026 Гид Новосёла. Все права защищены.</p>
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
          </FadeInSection>
        </div>
      </footer>
    </div>
  )
}
