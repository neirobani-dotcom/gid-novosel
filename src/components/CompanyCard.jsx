export default function CompanyCard({ company, onClick }) {
  return (
    <div
      onClick={() => onClick(company)}
      className="bg-[#1A0A2E] border border-[#3B1060] rounded-2xl p-5 cursor-pointer hover:border-[#C84BFF] transition-all duration-200 hover:shadow-lg hover:shadow-[#C84BFF10] active:scale-95"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-xs text-[#666] uppercase tracking-widest mb-1">{company.category}</p>
          <h3 className="text-lg font-semibold text-white">{company.name}</h3>
        </div>
        <div className="ml-3 bg-[#C84BFF15] border border-[#C84BFF40] rounded-xl px-3 py-2 text-right shrink-0">
          <p className="text-[10px] text-[#C84BFF] uppercase tracking-wider">Подарок</p>
          <p className="text-[#C84BFF] font-bold text-lg leading-tight">
            {company.giftAmount.toLocaleString('ru-RU')} ₽
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {company.freebies.map((f, i) => (
          <span key={i} className="text-xs bg-[#0F0F0F] text-[#888] rounded-full px-3 py-1 border border-[#3B1060]">
            🎁 {f}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-[#555]">📍 {company.address}</p>
        <span className="text-xs text-[#C84BFF] font-medium">Активировать →</span>
      </div>
    </div>
  )
}
