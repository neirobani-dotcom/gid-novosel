import PhotoSlider from './PhotoSlider'

export default function GridCard({ company, index, onClick }) {
  const isEmpty = !company

  if (isEmpty) {
    return (
      <a
        href="tel:+79130401111"
        className="rounded-2xl flex flex-col items-center justify-center gap-2 transition-opacity hover:opacity-70"
        style={{ background: '#FFF9F5', border: '1.5px dashed #F0D8C0', minHeight: 220 }}
      >
        <span className="text-2xl font-light" style={{ color: '#E8C09A' }}>+</span>
        <p className="text-[10px] uppercase tracking-widest text-center px-3 leading-relaxed"
          style={{ color: '#C8A880' }}>
          Станьте<br />партнёром
        </p>
      </a>
    )
  }

  const initials = company.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div
      onClick={() => onClick(company)}
      className="rounded-2xl cursor-pointer overflow-hidden flex flex-col"
      style={{
        background: '#FFFFFF',
        border: '1px solid #EDE8E0',
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
      {/* Акцентная полоска */}
      <div style={{ height: 3, background: company.color || '#E8621A', flexShrink: 0 }} />

      {/* ── Блок логотипа ── фиксированная высота, никогда не заменяется фото */}
      <div className="flex items-center justify-center px-4"
        style={{ height: 80, flexShrink: 0, background: '#FAFAF9' }}>
        {company.logo ? (
          <img
            src={company.logo}
            alt={`${company.name} логотип`}
            style={{ maxHeight: 52, maxWidth: '90%', objectFit: 'contain' }}
          />
        ) : (
          <div className="rounded-xl flex items-center justify-center text-white font-bold text-sm"
            style={{ width: 48, height: 48, background: company.color || '#E8621A' }}>
            {initials}
          </div>
        )}
      </div>

      <div style={{ height: 1, background: '#F0EBE3', flexShrink: 0 }} />

      {/* ── Блок информации ── */}
      <div className="px-4 pt-3 pb-3 flex-1 flex flex-col">
        <p className="text-[10px] font-semibold uppercase tracking-wide mb-1 leading-tight"
          style={{ color: '#E8621A' }}>
          {company.category}
        </p>
        <h3 className="font-bold leading-tight mb-2" style={{ color: '#1A1816', fontSize: '0.9rem' }}>
          {company.name}
        </h3>
        <div className="mt-auto">
          <p className="text-[10px] font-medium uppercase tracking-wide mb-0.5" style={{ color: '#A09890' }}>
            🎁 Подарок
          </p>
          <p className="text-sm font-extrabold leading-tight" style={{ color: '#E8621A' }}>
            {company.giftLabel}
          </p>
        </div>
      </div>

      {/* ── Блок превью работ ── слайдер, отдельно от логотипа */}
      {company.images?.length > 0 && (
        <div className="px-3 pb-2">
          <PhotoSlider
            images={company.images}
            borderRadius={12}
            background="#F7F4F0"
            autoHeight
          />
        </div>
      )}

      {/* ── Кнопка ── */}
      <div className="px-3 pb-3">
        <div className="w-full py-2.5 rounded-xl text-center text-xs font-semibold text-white"
          style={{ background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)' }}>
          Активировать →
        </div>
      </div>
    </div>
  )
}
