export default function EmptySlot({ index }) {
  return (
    <div className="border border-dashed border-[#3B1060] rounded-xl flex flex-col items-center justify-center text-center"
      style={{ height: 110 }}>
      <p className="text-[#4A2070] text-xl leading-none mb-1">+</p>
      <p className="text-[9px] text-[#4A2070] uppercase tracking-widest">Место партнёра</p>
    </div>
  )
}
