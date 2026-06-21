export default function GridCard({ company, index, onClick }) {
  const isEmpty = !company

  if (isEmpty) {
    return (
      <a
        href="tel:+79130401111"
        className="rounded-2xl flex flex-col items-center justify-center gap-2 transition-opacity hover:opacity-70"
        style={{
          background: '#FFF9F5',
          border: '1.5px dashed #F0D8C0',
          minHeight: 180,
        }}
      >
        <span className="text-2xl font-light" style={{ color: '#E8C09A' }}>+</span>
        <p className="text-[10px] uppercase tracking-widest text-center px-3 leading-relaxed"
          style={{ color: '#C8A880' }}>
          Станьте<br />партнёром
        </p>
      </a>
    )
  }

  const initials = company.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      onClick={() => onClick(company)}
      className="rounded-2xl cursor-pointer relative overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1px solid #EDE8E0',
        minHeight: 220,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 14px 40px rgba(232,98,26,0.13)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'
      }}
    >
      {/* Цветная полоска сверху */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: company.color || '#E8621A', opacity: 0.7 }} />

      <div className="p-4 flex flex-col h-full" style={{ minHeight: 220 }}>
        {/* Аватар с инициалами */}
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 flex-shrink-0
          text-white text-sm font-bold"
          style={{ background: company.color || '#E8621A' }}>
          {initials}
        </div>

        {/* Категория */}
        <p className="text-[10px] font-semibold uppercase tracking-wide mb-1 leading-tight"
          style={{ color: '#E8621A' }}>
          {company.category}
        </p>

        {/* Название */}
        <h3 className="font-bold leading-tight mb-auto" style={{ color: '#1A1816', fontSize: '0.95rem' }}>
          {company.name}
        </h3>

        {/* Разделитель */}
        <div className="w-full h-px my-3" style={{ background: '#F0EBE3' }} />

        {/* Подарок */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide mb-0.5" style={{ color: '#A09890' }}>
            🎁 Подарок
          </p>
          <p className="text-xl font-extrabold" style={{ color: '#E8621A', letterSpacing: '-0.02em' }}>
            {company.giftAmount.toLocaleString('ru-RU')} ₽
          </p>
        </div>

        {/* Кнопка */}
        <div className="mt-3 w-full py-2.5 rounded-xl text-center text-xs font-semibold text-white"
          style={{ background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)' }}>
          Активировать →
        </div>
      </div>
    </div>
  )
}
