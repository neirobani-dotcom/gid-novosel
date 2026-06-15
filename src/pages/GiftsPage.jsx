import { companies } from '../data/companies'

export default function GiftsPage({ onBack, onSelect }) {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #1A003A 0%, #0D0010 30%)' }}>

      {/* Шапка */}
      <div className="sticky top-0 z-10 flex items-center gap-4 px-4 py-4 border-b border-[#2A0A4A]"
        style={{ background: 'rgba(13,0,16,0.92)', backdropFilter: 'blur(12px)' }}>
        <button onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-[#3B1060] text-[#C8A96E] hover:border-[#C8A96E] transition-colors">
          ←
        </button>
        <div>
          <p className="text-xs text-[#C8A96E] font-semibold">Все подарки</p>
          <p className="text-[10px] text-[#6633AA]">{companies.length} компании-партнёра</p>
        </div>
      </div>

      {/* Итоговая сумма */}
      <div className="text-center px-6 py-8">
        <p className="text-[10px] text-[#C8A96E] uppercase tracking-[3px] mb-1">Суммарно подарков</p>
        <p className="text-5xl font-bold text-[#C8A96E]"
          style={{ fontFamily: 'Cinzel Decorative, serif', textShadow: '0 0 24px #C8A96E88' }}>
          {companies.reduce((s, c) => s + c.giftAmount, 0).toLocaleString('ru-RU')} ₽
        </p>
        <p className="text-xs text-[#6633AA] mt-2">Активируй и получи скидку на покупку</p>
      </div>

      {/* Карточки подарков */}
      <div className="px-4 pb-16 flex flex-col gap-5 max-w-lg mx-auto">
        {companies.map((company) => (
          <div key={company.id}
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #22103A 0%, #130A25 100%)',
              border: '1px solid #C8A96E33',
              boxShadow: '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 #C8A96E22',
            }}>

            {/* Фото — заглушка */}
            <div className="w-full flex items-center justify-center relative"
              style={{ height: 200, background: 'linear-gradient(135deg, #2A1050, #1A0830)' }}>
              <div className="flex flex-col items-center gap-2 opacity-40">
                <span className="text-5xl">📷</span>
                <p className="text-[10px] text-[#9966CC] uppercase tracking-widest">Фото скоро</p>
              </div>
              {/* Название поверх фото */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8"
                style={{ background: 'linear-gradient(0deg, #1A0A2E 0%, transparent 100%)' }}>
                <p className="text-[9px] text-[#9966CC] uppercase tracking-widest">{company.category}</p>
                <p className="text-lg font-bold text-white"
                  style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: '1rem' }}>
                  {company.name}
                </p>
              </div>
            </div>

            {/* Контент */}
            <div className="p-4">
              {/* Подарок */}
              <div className="flex items-center justify-between mb-4 p-3 rounded-xl"
                style={{ background: '#1A0A2E', border: '1px solid #C8A96E33' }}>
                <div>
                  <p className="text-[9px] text-[#C8A96E] uppercase tracking-wider">🎁 Подарок новосёлу</p>
                  <p className="text-2xl font-bold text-[#C8A96E]"
                    style={{ textShadow: '0 0 12px #C8A96E66' }}>
                    {company.giftAmount.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
                <p className="text-[10px] text-[#C8A96E88] max-w-[120px] text-right leading-tight">
                  {company.giftCondition}
                </p>
              </div>

              {/* Бесплатно */}
              <div className="flex flex-col gap-2 mb-4">
                {company.freebies.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#CCC]">
                    <span className="text-green-400 text-xs">✓</span> {f}
                  </div>
                ))}
              </div>

              {/* Адрес */}
              <p className="text-[10px] text-[#6633AA] mb-4">📍 {company.address} · {company.hours}</p>

              {/* Кнопки */}
              <div className="flex gap-2">
                <button
                  onClick={() => onSelect(company)}
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-black"
                  style={{ background: 'linear-gradient(90deg, #C8A96E, #FFD966)' }}>
                  Активировать подарок
                </button>
                <a href={`tel:${company.phone}`}
                  className="w-11 h-11 rounded-xl flex items-center justify-center border border-[#C8A96E44] text-[#C8A96E] hover:border-[#C8A96E] transition-colors">
                  📞
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
