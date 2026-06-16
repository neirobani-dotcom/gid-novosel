import { useState } from 'react'

export default function CompanyPage({ company, onBack }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [step, setStep] = useState('form')
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

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #1A003A 0%, #0D0010 30%)' }}>

      {/* Шапка со стрелкой назад */}
      <div className="sticky top-0 z-10 flex items-center gap-4 px-4 py-4 border-b border-[#2A0A4A]"
        style={{ background: 'rgba(13,0,16,0.92)', backdropFilter: 'blur(12px)' }}>
        <button onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-[#3B1060] text-[#C8A96E] hover:border-[#C8A96E] transition-colors">
          ←
        </button>
        <div>
          <p className="text-xs text-[#9966CC] uppercase tracking-widest">{company.category}</p>
          <p className="text-sm font-bold text-white" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            {company.name}
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">

        {step === 'success' ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">Заявка отправлена!</h3>
            <p className="text-[#9966CC] text-sm mb-6">
              Менеджер <span className="text-white font-medium">{company.name}</span> свяжется с вами в течение 1 часа.
            </p>
            <div className="rounded-xl p-4 mb-6" style={{ background: '#1A0A2E', border: '1px solid #C8A96E44' }}>
              <p className="text-xs text-[#C8A96E] uppercase tracking-wider mb-1">Ваш подарок активирован</p>
              <p className="text-[#C8A96E] font-bold text-2xl">{company.giftAmount.toLocaleString('ru-RU')} ₽</p>
              <p className="text-xs text-[#6633AA] mt-1">{company.giftTarget}</p>
            </div>
            <button onClick={onBack}
              className="w-full font-bold py-3 rounded-xl text-black"
              style={{ background: 'linear-gradient(90deg, #C8A96E, #FFD966)' }}>
              На главную
            </button>
          </div>
        ) : (
          <>
            {/* Лого-заглушка */}
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: 'linear-gradient(135deg, #2A1050, #1A0830)', border: '1px solid #C8A96E33' }}>
              <span className="text-3xl">🏢</span>
            </div>

            {/* Подарок */}
            <div className="rounded-xl p-4 mb-5" style={{ background: '#1A0A2E', border: '1px solid #C8A96E44' }}>
              <p className="text-xs text-[#C8A96E] uppercase tracking-wider mb-1">🎁 Подарок новосёлу</p>
              <p className="text-[#C8A96E] font-bold text-2xl">{company.giftLabel}</p>
              <p className="text-xs text-[#C8A96E80] mt-1">{company.giftCondition}</p>
            </div>

            {/* Бесплатно */}
            <div className="mb-5">
              <p className="text-xs text-[#6633AA] uppercase tracking-wider mb-2">Бесплатно для вас</p>
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
              <p className="text-xs text-[#6633AA] uppercase tracking-wider mb-2">Почему выбирают нас</p>
              <div className="flex flex-col gap-2">
                {company.advantages.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#999]">
                    <span className="text-[#C8A96E]">·</span> {a}
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
                  className="flex-1 text-sm py-2 px-3 rounded-xl border transition-all"
                  style={
                    activeBtn === btn.type
                      ? { background: '#C8A96E', color: '#000', borderColor: '#C8A96E', fontWeight: 600 }
                      : { background: 'transparent', color: '#999', borderColor: '#3B1060' }
                  }
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Форма */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="name" value={form.name} onChange={handleChange}
                placeholder="Ваше имя" required
                className="rounded-xl px-4 py-3 text-white placeholder-[#555] focus:outline-none transition-colors"
                style={{ background: '#0D0010', border: '1px solid #3B1060' }}
              />
              <input
                name="phone" value={form.phone} onChange={handleChange}
                placeholder="Номер телефона" type="tel" required
                className="rounded-xl px-4 py-3 text-white placeholder-[#555] focus:outline-none transition-colors"
                style={{ background: '#0D0010', border: '1px solid #3B1060' }}
              />
              <input
                name="address" value={form.address} onChange={handleChange}
                placeholder="Адрес дома / название ЖК" required
                className="rounded-xl px-4 py-3 text-white placeholder-[#555] focus:outline-none transition-colors"
                style={{ background: '#0D0010', border: '1px solid #3B1060' }}
              />
              <button type="submit"
                className="w-full font-bold py-4 rounded-xl mt-1 text-black"
                style={{ background: 'linear-gradient(90deg, #C8A96E, #FFD966)' }}>
                Активировать подарок →
              </button>
            </form>

            {/* Контакты */}
            <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid #3B1060' }}>
              <div>
                <p className="text-xs text-[#6633AA]">📍 {company.address}</p>
                <p className="text-xs text-[#6633AA]">🕐 {company.hours}</p>
              </div>
              <a href={`tel:${company.phone}`}
                className="text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                style={{ background: '#1A0A2E', border: '1px solid #3B1060', color: '#C8A96E' }}>
                📞 Позвонить
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
