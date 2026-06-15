import { useState } from 'react'
import { companies } from './data/companies'
import CompanyCard from './components/CompanyCard'
import EmptySlot from './components/EmptySlot'
import ActivationModal from './components/ActivationModal'
import './index.css'

const TOTAL_SLOTS = 20

export default function App() {
  const [selected, setSelected] = useState(null)

  const totalGifts = companies.reduce((s, c) => s + c.giftAmount, 0)

  const leftSlots = [
    ...companies.map(c => ({ type: 'company', data: c })),
    ...Array(TOTAL_SLOTS - companies.length).fill({ type: 'empty' }),
  ]
  const rightSlots = Array(TOTAL_SLOTS).fill({ type: 'empty' })

  return (
    <div className="min-h-screen px-4 pb-16" style={{ background: 'linear-gradient(180deg, #1A003A 0%, #0D0010 50%)' }}>

      {/* ── ШАПКА ── */}
      <div className="text-center pt-10 pb-8">

        {/* Город */}
        <p className="text-xs text-[#C8A96E] uppercase tracking-[6px] mb-4">
          Красноярск
        </p>

        {/* Название */}
        <h1 className="neon-title uppercase mb-2"
          style={{
            fontSize: 'clamp(2rem, 7vw, 4.5rem)',
            letterSpacing: '0.08em',
            lineHeight: 1.1,
            transform: 'perspective(400px) rotateX(6deg)',
          }}>
          Гид Новосёла 2026
        </h1>

        {/* Подзаголовок */}
        <p className="text-xs text-[#9966CC] tracking-[2px] mt-2 uppercase">
          Подарки от лучших компаний города — специально для вас
        </p>

        {/* Разделитель */}
        <div className="flex items-center gap-4 max-w-xs mx-auto my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C8A96E55]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C8A96E55]" />
        </div>

        {/* Пульсирующий счётчик */}
        <div className="pulse-card inline-block border border-[#C8A96E55] rounded-2xl px-10 py-4"
          style={{ background: '#1A0A2E' }}>
          <p className="text-[10px] text-[#C8A96E] uppercase tracking-[3px] mb-1">Доступно подарков</p>
          <p className="text-4xl font-bold text-[#C8A96E]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {totalGifts.toLocaleString('ru-RU')} ₽
          </p>
          <p className="text-[10px] text-[#6633AA] mt-1 tracking-wider">
            от {companies.length} компаний-партнёров
          </p>
        </div>
      </div>

      {/* ── СЕТКА КОМПАНИЙ ── */}
      <div className="max-w-4xl mx-auto">

        {/* Заголовки колонок */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-[#C8A96E33]" />
            <p className="text-[9px] text-[#C8A96E] uppercase tracking-[3px] whitespace-nowrap">Наши партнёры</p>
            <div className="flex-1 h-px bg-[#C8A96E33]" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-[#3B1060]" />
            <p className="text-[9px] text-[#4A2070] uppercase tracking-[3px] whitespace-nowrap">Скоро здесь</p>
            <div className="flex-1 h-px bg-[#3B1060]" />
          </div>
        </div>

        {/* Ячейки */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            {leftSlots.map((slot, i) =>
              slot.type === 'company'
                ? <CompanyCard key={slot.data.id} company={slot.data} onClick={setSelected} />
                : <EmptySlot key={`l-${i}`} />
            )}
          </div>
          <div className="flex flex-col gap-3">
            {rightSlots.map((_, i) => (
              <EmptySlot key={`r-${i}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Подвал */}
      <div className="text-center mt-12">
        <div className="w-12 h-px bg-[#C8A96E33] mx-auto mb-4" />
        <p className="text-[10px] text-[#3B1060] tracking-widest uppercase">© 2026 Гид Новосёла · Красноярск</p>
      </div>

      {selected && (
        <ActivationModal company={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
