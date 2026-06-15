import { useState } from 'react'

export default function ActivationModal({ company, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [step, setStep] = useState('form') // 'form' | 'success'
  const [activeBtn, setActiveBtn] = useState(company.ctaButtons[0].type)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.phone || !form.address) return

    const subject = encodeURIComponent(`Новый лид: ${company.name} — ${activeBtn === 'measure' ? 'Замер' : 'Проект'}`)
    const body = encodeURIComponent(
      `Компания: ${company.name}\n` +
      `Тип заявки: ${activeBtn === 'measure' ? 'Запись на замер' : 'Получить проект'}\n\n` +
      `Имя: ${form.name}\n` +
      `Телефон: ${form.phone}\n` +
      `Адрес дома / ЖК: ${form.address}`
    )
    window.open(`mailto:${company.email || ''}?subject=${subject}&body=${body}`)
    setStep('success')
  }

  if (step === 'success') {
    return (
      <Overlay onClose={onClose}>
        <div className="text-center py-6">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-white mb-2">Заявка отправлена!</h3>
          <p className="text-[#888] text-sm mb-6">
            Менеджер <span className="text-white font-medium">{company.name}</span> свяжется с вами в течение 1 часа.
          </p>
          <div className="bg-[#C84BFF15] border border-[#C84BFF40] rounded-xl p-4 mb-6">
            <p className="text-xs text-[#C84BFF] uppercase tracking-wider mb-1">Ваш подарок активирован</p>
            <p className="text-[#C84BFF] font-bold text-2xl">{company.giftAmount.toLocaleString('ru-RU')} ₽</p>
            <p className="text-xs text-[#666] mt-1">{company.giftTarget}</p>
          </div>
          <button onClick={onClose} className="w-full bg-[#C84BFF] text-black font-semibold py-3 rounded-xl">
            Отлично!
          </button>
        </div>
      </Overlay>
    )
  }

  return (
    <Overlay onClose={onClose}>
      {/* Заголовок */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs text-[#666] uppercase tracking-widest mb-1">{company.category}</p>
          <h2 className="text-xl font-bold text-white">{company.name}</h2>
        </div>
        <button onClick={onClose} className="text-[#555] hover:text-white text-2xl leading-none ml-4">×</button>
      </div>

      {/* Подарок */}
      <div className="bg-[#C84BFF15] border border-[#C84BFF40] rounded-xl p-4 mb-5">
        <p className="text-xs text-[#C84BFF] uppercase tracking-wider mb-1">🎁 Подарок новосёлу</p>
        <p className="text-[#C84BFF] font-bold text-2xl">{company.giftLabel}</p>
        <p className="text-xs text-[#C84BFF80] mt-1">{company.giftCondition}</p>
      </div>

      {/* Бесплатно */}
      <div className="mb-5">
        <p className="text-xs text-[#555] uppercase tracking-wider mb-2">Бесплатно для вас</p>
        <div className="flex flex-col gap-2">
          {company.freebies.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-[#CCC]">
              <span className="text-green-400">✓</span> {f}
            </div>
          ))}
        </div>
      </div>

      {/* Преимущества */}
      <div className="mb-5">
        <p className="text-xs text-[#555] uppercase tracking-wider mb-2">Почему выбирают нас</p>
        <div className="flex flex-col gap-2">
          {company.advantages.map((a, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-[#888]">
              <span className="text-[#C84BFF]">·</span> {a}
            </div>
          ))}
        </div>
      </div>

      {/* Выбор типа заявки */}
      <div className="flex gap-2 mb-5">
        {company.ctaButtons.map(btn => (
          <button
            key={btn.type}
            onClick={() => setActiveBtn(btn.type)}
            className={`flex-1 text-sm py-2 px-3 rounded-xl border transition-all ${
              activeBtn === btn.type
                ? 'bg-[#C84BFF] text-black border-[#C84BFF] font-semibold'
                : 'bg-transparent text-[#888] border-[#3B1060] hover:border-[#C84BFF40]'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Форма */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ваше имя"
          required
          className="bg-[#0D0010] border border-[#3B1060] rounded-xl px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-[#C84BFF] transition-colors"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Номер телефона"
          type="tel"
          required
          className="bg-[#0D0010] border border-[#3B1060] rounded-xl px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-[#C84BFF] transition-colors"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Адрес дома / название ЖК"
          required
          className="bg-[#0D0010] border border-[#3B1060] rounded-xl px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-[#C84BFF] transition-colors"
        />
        <button
          type="submit"
          className="w-full bg-[#C84BFF] hover:bg-[#E8C98E] text-black font-bold py-4 rounded-xl transition-colors mt-1"
        >
          Активировать подарок →
        </button>
      </form>

      {/* Контакты */}
      <div className="mt-5 pt-4 border-t border-[#3B1060] flex items-center justify-between">
        <div>
          <p className="text-xs text-[#555]">📍 {company.address}</p>
          <p className="text-xs text-[#555]">🕐 {company.hours}</p>
        </div>
        <a
          href={`tel:${company.phone}`}
          className="bg-[#1A0A2E] border border-[#3B1060] text-[#C84BFF] text-sm font-medium px-4 py-2 rounded-xl hover:border-[#C84BFF] transition-colors"
        >
          📞 Позвонить
        </a>
      </div>
    </Overlay>
  )
}

function Overlay({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md bg-[#1A0A2E] border border-[#3B1060] rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
