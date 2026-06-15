export default function GridCard({ company, index, onClick }) {
  const isEmpty = !company

  if (isEmpty) {
    return (
      <div
        className="rounded-2xl flex flex-col items-center justify-center gap-2 opacity-25"
        style={{
          background: 'linear-gradient(135deg, #1A0A2E 0%, #0D0010 100%)',
          border: '1px dashed #3B1060',
          minHeight: 180,
        }}
      >
        <span className="text-2xl text-[#4A2070]">+</span>
        <p className="text-[8px] text-[#4A2070] uppercase tracking-widest">Скоро</p>
      </div>
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
        <p className="text-[9px] text-[#9966CC] uppercase tracking-widest mb-1 leading-tight">
          {company.category}
        </p>

        {/* Название */}
        <h3 className="text-base font-bold text-white leading-tight mb-auto"
          style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: '0.9rem' }}>
          {company.name}
        </h3>

        {/* Разделитель */}
        <div className="w-full h-px my-3" style={{ background: 'linear-gradient(90deg, #C8A96E33, transparent)' }} />

        {/* Подарок */}
        <div>
          <p className="text-[9px] text-[#C8A96E88] uppercase tracking-wider mb-0.5">🎁 Подарок</p>
          <p className="text-xl font-bold text-[#C8A96E]"
            style={{ textShadow: '0 0 12px #C8A96E66' }}>
            {company.giftAmount.toLocaleString('ru-RU')} ₽
          </p>
        </div>

        {/* Кнопка */}
        <div className="mt-3 w-full py-2 rounded-xl text-center text-xs font-semibold text-black"
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
