import { useState } from 'react'
import { companies } from './data/companies'
import GridCard from './components/GridCard'
import ActivationModal from './components/ActivationModal'
import GiftsPage from './pages/GiftsPage'
import './index.css'

const EMPTY_COUNT = 38
const allSlots = [
  ...companies,
  ...Array(EMPTY_COUNT).fill(null),
]

export default function App() {
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState('home')
  const [filter, setFilter] = useState('Все')
  const totalGifts = companies.reduce((s, c) => s + c.giftAmount, 0)

  const categories = ['Все', ...new Set(companies.map(c => c.category))]
  const visibleSlots = filter === 'Все'
    ? allSlots
    : allSlots.filter(c => !c || c.category === filter)

  if (page === 'gifts') {
    return (
      <GiftsPage
        onBack={() => setPage('home')}
        onSelect={c => { setSelected(c); setPage('home') }}
      />
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #1A003A 0%, #0D0010 30%)' }}>

      {/* ── ШАПКА ── */}
      <div className="text-center px-6 pt-10 pb-8">
        <p className="text-[10px] text-[#C8A96E] uppercase tracking-[6px] mb-4">Красноярск</p>

        <h1
          className="neon-title uppercase mb-3"
          style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)', letterSpacing: '0.06em', lineHeight: 1.15 }}
        >
          Гид Новосёла
        </h1>

        <p className="text-xs text-[#9966CC] tracking-[2px] uppercase mb-6">
          Подарки от лучших компаний города — специально для вас
        </p>

        {/* Счётчик — кликабельный */}
        <button
          onClick={() => setPage('gifts')}
          className="pulse-card inline-flex flex-col items-center border border-[#C8A96E44] rounded-2xl px-10 py-4 hover:border-[#C8A96E] transition-colors"
          style={{ background: 'linear-gradient(135deg, #1A0A2E, #110020)' }}
        >
          <p className="text-[10px] text-[#C8A96E] uppercase tracking-[3px] mb-1">Доступно подарков</p>
          <p className="text-4xl font-bold text-[#C8A96E]"
            style={{ fontFamily: 'Cinzel Decorative, serif', textShadow: '0 0 20px #C8A96E88' }}>
            {totalGifts.toLocaleString('ru-RU')} ₽
          </p>
          <p className="text-[10px] text-[#6633AA] mt-1 tracking-wider">
            от {companies.length} компаний-партнёров · Смотреть →
          </p>
        </button>
      </div>

      {/* Разделитель */}
      <div className="flex items-center gap-4 px-6 max-w-2xl mx-auto mb-6">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C8A96E44)' }} />
        <p className="text-[9px] text-[#C8A96E66] uppercase tracking-[4px] whitespace-nowrap">Компании-партнёры</p>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #C8A96E44, transparent)' }} />
      </div>

      {/* Фильтр категорий */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-5 max-w-2xl mx-auto no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="shrink-0 text-[11px] px-4 py-2 rounded-full border whitespace-nowrap transition-colors"
            style={
              filter === cat
                ? { background: '#C8A96E', color: '#000', borderColor: '#C8A96E', fontWeight: 600 }
                : { background: 'transparent', color: '#9966CC', borderColor: '#3B1060' }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── СЕТКА ── */}
      <div className="px-4 pb-16 max-w-2xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {visibleSlots.map((company, i) => (
            <GridCard key={i} company={company} index={i} onClick={setSelected} />
          ))}
        </div>
      </div>

      {/* Подвал */}
      <div className="text-center pb-8">
        <div className="w-12 h-px mx-auto mb-4" style={{ background: '#C8A96E33' }} />
        <p className="text-[10px] text-[#3B1060] tracking-widest uppercase">© 2026 Гид Новосёла · Красноярск</p>
      </div>

      {selected && (
        <ActivationModal company={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
