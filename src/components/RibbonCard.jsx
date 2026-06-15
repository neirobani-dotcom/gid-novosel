export default function RibbonCard({ company, onClick }) {
  if (!company) {
    return (
      <div
        className="ribbon-card-empty shrink-0 border border-dashed border-[#3B1060] rounded-2xl flex flex-col items-center justify-center gap-1 cursor-default"
        style={{ width: 180, height: 120 }}
      >
        <p className="text-[#4A2070] text-2xl leading-none">+</p>
        <p className="text-[9px] text-[#3B1060] uppercase tracking-widest">Место партнёра</p>
      </div>
    )
  }

  return (
    <div
      onClick={() => onClick(company)}
      className="ribbon-card shrink-0 rounded-2xl cursor-pointer flex flex-col justify-between p-4 transition-transform duration-200 active:scale-95"
      style={{ width: 180, height: 120, background: '#1A0A2E', border: '1px solid #C8A96E44' }}
    >
      <div>
        <p className="text-[9px] text-[#9966CC] uppercase tracking-widest truncate">{company.category}</p>
        <p className="text-sm font-bold text-white mt-0.5 leading-tight" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
          {company.name}
        </p>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[9px] text-[#C8A96E] uppercase tracking-wider">Подарок</p>
          <p className="text-lg font-bold text-[#C8A96E]">{company.giftAmount.toLocaleString('ru-RU')} ₽</p>
        </div>
        <p className="text-[10px] text-[#C8A96E88]">→</p>
      </div>
    </div>
  )
}
