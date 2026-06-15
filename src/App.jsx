import { useState } from 'react'
import { companies } from './data/companies'
import CompanyCard from './components/CompanyCard'
import ActivationModal from './components/ActivationModal'
import './index.css'

export default function App() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-transparent px-4 pb-10">
      {/* Шапка */}
      <div className="pt-10 pb-8 text-center">
        <p className="text-xs text-[#C84BFF] uppercase tracking-[4px] mb-3">Красноярск</p>
        <h1 className="text-3xl font-bold text-white mb-2">Гид Новосёла</h1>
        <p className="text-[#666] text-sm">Подарки от лучших компаний города — специально для вас</p>

        <div className="mt-6 bg-[#1A0A2E] border border-[#3B1060] rounded-2xl px-5 py-4 max-w-sm mx-auto">
          <p className="text-xs text-[#555] uppercase tracking-wider mb-1">Доступно подарков</p>
          <p className="text-2xl font-bold text-[#C84BFF]">
            {companies.reduce((s, c) => s + c.giftAmount, 0).toLocaleString('ru-RU')} ₽
          </p>
          <p className="text-xs text-[#555] mt-1">от {companies.length} компаний-партнёров</p>
        </div>
      </div>

      {/* Список компаний */}
      <div className="max-w-md mx-auto flex flex-col gap-4">
        <p className="text-xs text-[#444] uppercase tracking-widest text-center mb-2">
          Выберите компанию и активируйте подарок
        </p>
        {companies.map(company => (
          <CompanyCard key={company.id} company={company} onClick={setSelected} />
        ))}
      </div>

      {/* Подвал */}
      <div className="text-center mt-10">
        <p className="text-xs text-[#333]">© 2026 Гид Новосёла · Красноярск</p>
      </div>

      {/* Модалка */}
      {selected && (
        <ActivationModal company={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
