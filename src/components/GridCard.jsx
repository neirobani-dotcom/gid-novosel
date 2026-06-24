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

      {/* ── Верхний блок: логотип + текст ── */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12 }}>
        {company.logo ? (
          <img
            src={company.logo}
            alt={`${company.name} логотип`}
            style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 8, flexShrink: 0, background: '#FAFAF9' }}
          />
        ) : (
          <div style={{
            width: 80, height: 80, borderRadius: 8, flexShrink: 0,
            background: company.color || '#E8621A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 'bold', fontSize: 18,
          }}>
            {initials}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: '#A09890', fontSize: 12, marginBottom: 2 }}>{company.category}</p>
          <h3 style={{ color: '#1A1816', fontWeight: 700, fontSize: 16, marginBottom: 6, lineHeight: 1.2 }}>
            {company.name}
          </h3>
          <p style={{ color: '#A09890', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
            🎁 Подарок
          </p>
          <p style={{ color: '#E8621A', fontWeight: 800, fontSize: 13, lineHeight: 1.2 }}>
            {company.giftLabel}
          </p>
        </div>
      </div>

      <div style={{ height: 1, background: '#F0EBE3', flexShrink: 0 }} />

      {/* ── Фото на всю ширину ── */}
      {company.images?.length > 0 && (
        <PhotoSlider
          images={company.images}
          height={220}
          borderRadius={0}
          background="#f5f5f5"
          objectFit="contain"
          overflow="visible"
        />
      )}

      {/* ── Кнопка ── */}
      <div style={{ padding: 12 }}>
        <div
          style={{
            width: '100%',
            padding: '10px 0',
            borderRadius: 12,
            textAlign: 'center',
            fontSize: 13,
            fontWeight: 600,
            color: '#fff',
            background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
          }}
        >
          Активировать →
        </div>
      </div>
    </div>
  )
}
