export default function GridCard({ company, index, onClick }) {
  const isEmpty = !company

  if (isEmpty) {
    return (
      <a
        href="tel:+79130401111"
        className="rounded-2xl flex flex-col items-center justify-center gap-2 transition-opacity hover:opacity-60"
        style={{
          background: 'linear-gradient(135deg, #1A0A2E 0%, #0D0010 100%)',
          border: '1px dashed #3B1060',
          minHeight: 180,
          opacity: 0.35,
        }}
      >
        <span className="text-2xl text-[#5A3090]">+</span>
        <p className="text-[10px] text-[#5A3090] uppercase tracking-widest text-center px-2">Станьте<br />партнёром</p>
      </a>
    )
  }

  return (
    <div
      onClick={() => onClick(company)}
      className="rounded-2xl cursor-pointer relative overflow-hidden group"
      style={{
        background: 'linear-gradient(145deg, #22103A 0%, #130A25 60%, #0D0010 100%)',
        border: '1px solid #C8A96E33',
        minHeight: 220,
        boxShadow: '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 #C8A96E22',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(200,169,110,0.25), 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 #C8A96E44'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 #C8A96E22'
      }}
    >
      {/* Фоновое свечение */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(ellipse at top, #C8A96E08 0%, transparent 70%)' }} />

      <div className="relative p-4 flex flex-col h-full" style={{ minHeight: 220 }}>
        {/* Лого */}
        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3"
          style={{ background: 'linear-gradient(135deg, #2A1050, #1A0830)', border: '1px solid #C8A96E22' }}>
          <span className="text-2xl">🏢</span>
        </div>

        {/* Категория */}
        <p className="text-[10px] text-[#AB85D9] uppercase tracking-wide mb-1 leading-tight">
          {company.category}
        </p>

        {/* Название */}
        <h3 className="text-base font-bold text-white leading-tight mb-auto"
          style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: '0.95rem' }}>
          {company.name}
        </h3>

        {/* Разделитель */}
        <div className="w-full h-px my-3" style={{ background: 'linear-gradient(90deg, #C8A96E33, transparent)' }} />

        {/* Подарок */}
        <div>
          <p className="text-[10px] text-[#D9B97A] uppercase tracking-wide mb-0.5">🎁 Подарок</p>
          <p className="text-xl font-bold text-[#C8A96E]"
            style={{ textShadow: '0 0 12px #C8A96E66' }}>
            {company.giftAmount.toLocaleString('ru-RU')} ₽
          </p>
        </div>

        {/* Кнопка */}
        <div className="mt-3 w-full py-2.5 rounded-xl text-center text-xs font-semibold text-black active:scale-95 transition-transform"
          style={{ background: 'linear-gradient(90deg, #C8A96E, #FFD966)' }}>
          Активировать →
        </div>
      </div>

      {/* Золотая линия снизу */}
      <div className="absolute bottom-0 left-4 right-4 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #C8A96E66, transparent)' }} />
    </div>
  )
}
