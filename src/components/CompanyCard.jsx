export default function CompanyCard({ company, onClick }) {
  return (
    <div
      onClick={() => onClick(company)}
      className="border border-[#C8A96E55] rounded-xl cursor-pointer transition-all duration-200 hover:border-[#C8A96E] hover:shadow-[0_0_12px_#C8A96E33] active:scale-95"
      style={{ height: 110, background: '#1A0A2E' }}
    >
      <div className="h-full flex flex-col justify-between p-3">
        {/* Верх: название + сумма */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[9px] text-[#9966CC] uppercase tracking-widest truncate">{company.category}</p>
            <p className="text-sm font-semibold text-white leading-tight mt-0.5 truncate">{company.name}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[9px] text-[#C8A96E] uppercase tracking-wider">Подарок</p>
            <p className="text-base font-bold text-[#C8A96E] leading-tight">
              {company.giftAmount.toLocaleString('ru-RU')} ₽
            </p>
          </div>
        </div>

        {/* Низ: адрес + CTA */}
        <div className="flex items-end justify-between gap-2">
          <p className="text-[9px] text-[#6633AA] truncate">📍 {company.address}</p>
          <p className="text-[10px] text-[#C8A96E] font-medium shrink-0">Активировать →</p>
        </div>
      </div>
    </div>
  )
}
