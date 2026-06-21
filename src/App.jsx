import { useState } from 'react'
import logoSrc from './assets/logo.svg'
import { companies } from './data/companies'
import GridCard from './components/GridCard'
import GiftsPage from './pages/GiftsPage'
import CompanyPage from './pages/CompanyPage'
import AdminPage from './pages/AdminPage'
import './index.css'

const EMPTY_COUNT = 38
const allSlots = [
  ...companies,
  ...Array(EMPTY_COUNT).fill(null),
]

const STEPS = [
  { num: '1', title: 'Выберите партнёра', desc: 'Найдите компанию в каталоге' },
  { num: '2', title: 'Оставьте заявку', desc: 'Укажите имя и телефон' },
  { num: '3', title: 'Получите подарок', desc: 'Менеджер свяжется за час' },
]

export default function App() {
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState('home')
  const [filter, setFilter] = useState('Все')
  const [tapCount, setTapCount] = useState(0)
  const totalGifts = companies.reduce((s, c) => s + c.giftAmount, 0)

  const categories = ['Все', ...new Set(companies.map(c => c.category))]
  const visibleSlots = filter === 'Все'
    ? allSlots
    : allSlots.filter(c => !c || c.category === filter)

  if (page === 'admin') return <AdminPage onBack={() => setPage('home')} />
  if (page === 'gifts') return (
    <GiftsPage onBack={() => setPage('home')} onSelect={c => { setSelected(c); setPage('company') }} />
  )
  if (page === 'company' && selected) return <CompanyPage company={selected} onBack={() => setPage('home')} />

  return (
    <div className="min-h-screen" style={{ background: '#F7F4F0' }}>

      {/* ── ГЕРОЙ ── */}
      <div className="relative overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #FFF3E0 0%, #FFFAF5 55%, #F7F4F0 100%)' }}>

        {/* Декоративные блики */}
        <div className="absolute -top-28 -right-28 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,176,64,0.22) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,98,26,0.07) 0%, transparent 65%)' }} />

        <div className="relative max-w-2xl mx-auto px-5 pt-8 pb-12">

          {/* Логотип — фирменный знак слева */}
          <img src={logoSrc} alt="Гид Новосёла" style={{ width: '100%', maxWidth: 420, height: 'auto' }} className="mb-4" />

          {/* Бейдж города */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-5"
            style={{ background: '#FFF0DC', border: '1px solid #FFD0A0' }}>
            <span className="text-xs">📍</span>
            <span className="text-xs font-semibold" style={{ color: '#C25820' }}>Красноярск</span>
          </div>

          {/* Подзаголовок */}
          <p className="mb-8 leading-relaxed" style={{ color: '#6B6560', fontSize: '1.05rem', maxWidth: '36ch' }}>
            Приветственные подарки и скидки от компаний-партнёров — для тех, кто обустраивает новый дом в Красноярске
          </p>

          {/* Карточка-счётчик */}
          <button
            onClick={() => {
              const next = tapCount + 1
              if (next >= 5) { setTapCount(0); setPage('admin') }
              else { setTapCount(next); setPage('gifts') }
            }}
            className="text-left rounded-2xl px-6 py-5 transition-all duration-200"
            style={{
              background: '#FFFFFF',
              border: '1px solid #EDE8E0',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              display: 'inline-flex',
              flexDirection: 'column',
              gap: 6,
              minWidth: 270,
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 40px rgba(232,98,26,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)' }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#A09890' }}>
              Подарков на сумму
            </p>
            <p className="text-4xl font-extrabold" style={{ color: '#E8621A', letterSpacing: '-0.03em' }}>
              {totalGifts.toLocaleString('ru-RU')} ₽
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs" style={{ color: '#A09890' }}>
                от {companies.length} компаний-партнёров
              </p>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: '#FFF0DC', color: '#C25820' }}>
                Смотреть →
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ── КАК ЭТО РАБОТАЕТ ── */}
      <div className="max-w-2xl mx-auto px-5 py-7">
        <div className="rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid #EDE8E0' }}>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-5" style={{ color: '#A09890' }}>
            Как это работает
          </p>
          <div className="flex">
            {STEPS.map((s, i) => (
              <div key={i} className="flex-1 relative flex flex-col items-center text-center">
                {i < STEPS.length - 1 && (
                  <div className="absolute top-4 left-[calc(50%+18px)] right-0 h-px"
                    style={{ background: '#EDE8E0' }} />
                )}
                <div className="w-9 h-9 rounded-full flex items-center justify-center mb-2.5 text-sm font-bold relative z-10"
                  style={
                    i === 0
                      ? { background: '#E8621A', color: '#FFF' }
                      : { background: '#FFF3E8', color: '#E8621A', border: '1px solid #FFD0A0' }
                  }>
                  {s.num}
                </div>
                <p className="text-[11px] font-semibold leading-tight mb-1 px-1" style={{ color: '#1A1816' }}>
                  {s.title}
                </p>
                <p className="text-[10px] leading-tight px-1" style={{ color: '#A09890' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ПАРТНЁРЫ ── */}
      <div className="max-w-2xl mx-auto px-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold" style={{ color: '#1A1816' }}>Компании-партнёры</h2>
          <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{ background: '#FFF0DC', color: '#C25820' }}>
            {companies.length} из 40
          </span>
        </div>
        <p className="text-sm mb-5" style={{ color: '#A09890' }}>
          Предъявите{' '}
          <span className="font-bold" style={{ color: '#E8621A', fontSize: '1rem' }}>СЕРТИФИКАТ</span>
          {' '}при визите — и получите скидку
        </p>

        {/* Фильтр категорий */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="shrink-0 text-xs px-4 py-2 rounded-full whitespace-nowrap transition-all duration-150 font-medium"
              style={
                filter === cat
                  ? { background: '#E8621A', color: '#FFF', border: '1px solid #E8621A' }
                  : { background: '#FFF', color: '#6B6560', border: '1px solid #EDE8E0' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── СЕТКА ── */}
      <div className="px-4 pb-16 max-w-2xl mx-auto mt-1">
        <div className="grid grid-cols-2 gap-3">
          {visibleSlots.map((company, i) => (
            <div key={i} className="fade-up-card" style={{ animationDelay: `${Math.min(i, 10) * 0.04}s` }}>
              <GridCard
                company={company}
                index={i}
                onClick={c => { setSelected(c); setPage('company') }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── ПОДВАЛ ── */}
      <div className="text-center py-6" style={{ borderTop: '1px solid #EDE8E0' }}>
        <p className="text-xs" style={{ color: '#C0BAB2' }}>© 2026 Гид Новосёла · Красноярск</p>
      </div>
    </div>
  )
}
