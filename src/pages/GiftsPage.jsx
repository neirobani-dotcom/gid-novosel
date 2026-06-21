import logoSrc from '../assets/logo.svg'
import { companies } from '../data/companies'

export default function GiftsPage({ onBack, onSelect }) {
  const totalGifts = companies.reduce((s, c) => s + c.giftAmount, 0)

  return (
    <div className="min-h-screen" style={{ background: '#F7F4F0' }}>

      {/* Шапка */}
      <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3"
        style={{ background: 'rgba(247,244,240,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #EDE8E0' }}>
        <button onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
          style={{ background: '#FFF', border: '1px solid #EDE8E0', color: '#6B6560' }}>
          ←
        </button>
        <img src={logoSrc} alt="Гид Новосёла" style={{ height: 36 }} className="flex-shrink-0" />
        <div>
          <p className="text-sm font-bold" style={{ color: '#1A1816' }}>Все подарки</p>
          <p className="text-[10px]" style={{ color: '#A09890' }}>{companies.length} компании-партнёра</p>
        </div>
      </div>

      {/* Итоговая сумма */}
      <div className="px-5 pt-6 pb-4 max-w-lg mx-auto">
        <div className="rounded-2xl px-5 py-4 flex items-center justify-between"
          style={{ background: '#FFF3E8', border: '1px solid #FFD0A0' }}>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#A09890' }}>
              Суммарно подарков
            </p>
            <p className="text-3xl font-extrabold" style={{ color: '#E8621A', letterSpacing: '-0.03em' }}>
              {totalGifts.toLocaleString('ru-RU')} ₽
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs leading-relaxed" style={{ color: '#C25820' }}>
              Активируй и получи<br />скидку на покупку
            </p>
          </div>
        </div>
      </div>

      {/* Карточки компаний */}
      <div className="px-4 pb-16 flex flex-col gap-4 max-w-lg mx-auto">
        {companies.map(company => {
          const initials = company.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
          return (
            <div key={company.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: '#FFF', border: '1px solid #EDE8E0', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>

              {/* Шапка карточки */}
              <div className="relative px-5 pt-5 pb-4 flex items-center gap-4"
                style={{ background: `linear-gradient(135deg, ${company.color}1A 0%, transparent 100%)` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ background: company.color || '#E8621A' }}>
                  {initials}
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#E8621A' }}>
                    {company.category}
                  </p>
                  <p className="font-bold text-lg leading-tight" style={{ color: '#1A1816' }}>
                    {company.name}
                  </p>
                </div>
              </div>

              {/* Контент */}
              <div className="px-5 pb-5">

                {/* Подарок */}
                <div className="flex items-start justify-between py-3 mb-3"
                  style={{ borderBottom: '1px solid #F0EBE3' }}>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#A09890' }}>
                      🎁 Подарок новосёлу
                    </p>
                    <p className="text-2xl font-extrabold" style={{ color: '#E8621A', letterSpacing: '-0.02em' }}>
                      {company.giftAmount.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                  <p className="text-[10px] max-w-[130px] text-right leading-relaxed mt-1" style={{ color: '#A09890' }}>
                    {company.giftCondition}
                  </p>
                </div>

                {/* Бесплатные услуги */}
                <div className="flex flex-col gap-2 mb-3">
                  {company.freebies.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm" style={{ color: '#1A1816' }}>
                      <span className="text-xs font-bold flex-shrink-0" style={{ color: '#22C55E' }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>

                {/* Адрес */}
                <p className="text-xs mb-4" style={{ color: '#A09890' }}>
                  📍 {company.address} · {company.hours}
                </p>

                {/* Кнопки */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onSelect(company)}
                    className="flex-1 py-3 rounded-xl font-bold text-sm text-white"
                    style={{ background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)' }}>
                    Активировать подарок
                  </button>
                  <a href={`tel:${company.phone}`}
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ background: '#FFF3E8', border: '1px solid #FFD0A0' }}>
                    📞
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
