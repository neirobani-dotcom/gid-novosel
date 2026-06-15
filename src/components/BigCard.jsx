export default function BigCard({ company, index, onClick }) {
  const isEmpty = !company

  return (
    <div
      onClick={() => !isEmpty && onClick(company)}
      className="w-full relative flex flex-col items-center justify-center text-center px-8"
      style={{
        minHeight: '100svh',
        background: isEmpty
          ? 'linear-gradient(160deg, #0D0010 0%, #1A0A2E 100%)'
          : 'linear-gradient(160deg, #1A0A2E 0%, #0D0010 100%)',
        borderBottom: '1px solid #2A0A4A',
        cursor: isEmpty ? 'default' : 'pointer',
      }}
    >
      {/* Номер */}
      <p className="absolute top-6 left-8 text-xs text-[#3B1060] tracking-widest">
        {String(index + 1).padStart(2, '0')}
      </p>

      {isEmpty ? (
        /* Пустой слот */
        <div className="flex flex-col items-center gap-4 opacity-30">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#4A2070] flex items-center justify-center">
            <span className="text-4xl text-[#4A2070]">+</span>
          </div>
          <p className="text-xs text-[#4A2070] uppercase tracking-[4px]">Место партнёра</p>
        </div>
      ) : (
        /* Реальная компания */
        <div className="flex flex-col items-center gap-6 max-w-sm w-full">

          {/* Логотип — заглушка */}
          <div
            className="w-28 h-28 rounded-3xl border border-[#C8A96E44] flex items-center justify-center"
            style={{ background: '#110020' }}
          >
            <span className="text-4xl">🏢</span>
          </div>

          {/* Категория */}
          <p className="text-xs text-[#9966CC] uppercase tracking-[3px]">{company.category}</p>

          {/* Название */}
          <h2
            className="text-3xl sm:text-4xl font-bold text-white leading-tight"
            style={{ fontFamily: 'Cinzel Decorative, serif', textShadow: '0 0 30px #C8A96E44' }}
          >
            {company.name}
          </h2>

          {/* Подарок */}
          <div
            className="pulse-card border border-[#C8A96E55] rounded-2xl px-8 py-4 w-full"
            style={{ background: '#1A0A2E' }}
          >
            <p className="text-[10px] text-[#C8A96E] uppercase tracking-[3px] mb-1">🎁 Подарок новосёлу</p>
            <p
              className="text-4xl font-bold text-[#C8A96E]"
              style={{ fontFamily: 'Cinzel Decorative, serif' }}
            >
              {company.giftAmount.toLocaleString('ru-RU')} ₽
            </p>
            <p className="text-xs text-[#6633AA] mt-1">{company.giftTarget}</p>
          </div>

          {/* Бесплатно */}
          <div className="flex flex-col gap-2 w-full">
            {company.freebies.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#110020] border border-[#2A0A4A] rounded-xl px-4 py-3">
                <span className="text-green-400 text-sm">✓</span>
                <span className="text-sm text-[#CCC]">{f}</span>
              </div>
            ))}
          </div>

          {/* Адрес */}
          <p className="text-xs text-[#6633AA] tracking-wide">📍 {company.address} · {company.hours}</p>

          {/* CTA */}
          <button
            onClick={(e) => { e.stopPropagation(); onClick(company) }}
            className="w-full py-4 rounded-2xl font-bold text-black text-lg transition-all"
            style={{ background: 'linear-gradient(90deg, #C8A96E, #FFD966, #C8A96E)', backgroundSize: '200%' }}
          >
            Активировать подарок →
          </button>

          {/* Телефон */}
          <a
            href={`tel:${company.phone}`}
            onClick={e => e.stopPropagation()}
            className="text-sm text-[#9966CC] hover:text-[#C8A96E] transition-colors"
          >
            📞 {company.phoneFriendly}
          </a>
        </div>
      )}

      {/* Скролл-подсказка */}
      {!isEmpty && (
        <div className="absolute bottom-8 flex flex-col items-center gap-1 opacity-40">
          <p className="text-[9px] text-[#6633AA] uppercase tracking-widest">Следующая</p>
          <span className="text-[#6633AA] animate-bounce">↓</span>
        </div>
      )}
    </div>
  )
}
