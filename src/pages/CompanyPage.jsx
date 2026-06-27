import { useState } from 'react'
import SiteLogo from '../components/SiteLogo'
import PhotoSlider from '../components/PhotoSlider'
import RassrochkaCalculator from '../components/RassrochkaCalculator'

const formatPhone = (input) => {
  const raw = input.replace(/\D/g, '')
  if (raw.length === 0) return ''
  let d = raw.startsWith('7') ? raw
        : raw.startsWith('8') ? '7' + raw.slice(1)
        : '7' + raw
  d = d.substring(0, 11)
  if (d.length <= 1) return '+7'
  if (d.length <= 4) return '+7 (' + d.substring(1)
  if (d.length <= 7) return '+7 (' + d.substring(1,4) + ') ' + d.substring(4)
  if (d.length <= 9) return '+7 (' + d.substring(1,4) + ') ' + d.substring(4,7) + '-' + d.substring(7)
  return '+7 (' + d.substring(1,4) + ') ' + d.substring(4,7) + '-' + d.substring(7,9) + '-' + d.substring(9,11)
}

export default function CompanyPage({ company, onBack }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [touched, setTouched] = useState({ name: false, phone: false, address: false })
  const [submitted, setSubmitted] = useState(null)
  const [step, setStep] = useState('form')
  const [activeBtn, setActiveBtn] = useState(company.ctaButtons[0].type)
  const [showCalc, setShowCalc] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  const nameValid    = form.name.trim().length >= 2
  const phoneValid   = form.phone.replace(/\D/g, '').length === 11
  const addressValid = form.address.trim().length >= 5
  const isFormValid  = nameValid && phoneValid && addressValid

  const fieldBorder = (isValid, isTouched) => {
    if (!isTouched) return '1px solid #EDE8E0'
    return isValid ? '1.5px solid #22C55E' : '2px solid #EF4444'
  }
  const fieldBg = (isValid, isTouched) => {
    if (!isTouched) return '#FFF'
    return isValid ? '#F0FDF4' : '#FFF8F8'
  }
  const hint = (isValid, isTouched, errText, okText) => {
    if (!isTouched) return null
    return (
      <p style={{ fontSize: 11, color: isValid ? '#22C55E' : '#EF4444', marginTop: 3 }}>
        {isValid ? okText : errText}
      </p>
    )
  }

function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched({ name: true, phone: true, address: true })
    if (!isFormValid) return

    localStorage.setItem('gid_user', JSON.stringify({ name: form.name, phone: form.phone }))

    const activation = {
      id: Date.now(),
      companyId: company.id,
      companyName: company.name,
      category: company.category,
      giftLabel: company.giftLabel,
      giftAmount: company.giftAmount,
      requestType: activeBtn,
      name: form.name,
      phone: form.phone,
      address: form.address,
      createdAt: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem('gid_activations') || '[]')
    localStorage.setItem('gid_activations', JSON.stringify([activation, ...existing]))

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: '2c502e1a-5b57-43a0-b56f-9ffa8c423793',
        subject:    company.emailSubject || `Новая заявка — ${company.name}`,
        from_name:  'Гид Новосёла',
        Компания:   company.name,
        Имя:        form.name,
        Телефон:    form.phone,
        'Адрес/ЖК': form.address,
      }),
    })
      .then(r => r.json())
      .then(data => console.log('[web3forms]', data))
      .catch(err => console.error('[web3forms] error', err))

    // Сохраняем отправленные данные и очищаем форму
    setSubmitted({ name: form.name, phone: form.phone, address: form.address })
    setForm({ name: '', phone: '', address: '' })
    setStep('success')
  }

  const initials = company.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  // freebies can be strings (old) or {icon, label} objects (new)
  const freebiesAsObjects = company.freebies?.map(f =>
    typeof f === 'string' ? { icon: '✓', label: f } : f
  ) || []
  const hasIconFreebies = company.freebies?.some(f => typeof f === 'object')

  return (
    <div className="min-h-screen" style={{ background: '#F7F4F0' }}>

      {/* Шапка */}
      <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3"
        style={{ background: 'rgba(247,244,240,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #EDE8E0', visibility: lightbox !== null ? 'hidden' : 'visible' }}>
        <button onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
          style={{ background: '#FFF', border: '1px solid #EDE8E0', color: '#6B6560' }}>
          ←
        </button>
        <SiteLogo variant="small" />
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wide truncate" style={{ color: '#E8621A' }}>
            {company.category}
          </p>
          <p className="text-sm font-bold truncate" style={{ color: '#1A1816' }}>
            {company.name}
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">

        {step === 'success' ? (

          /* ── УСПЕХ ── */
          <div className="text-center py-10">
            <div className="success-icon w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: '#F0FDF4', border: '2px solid #BBF7D0', fontSize: 40 }}>
              ✅
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#1A1816' }}>
              Заявка принята!
            </h3>
            <p className="text-sm mb-2" style={{ color: '#6B6560' }}>
              Мы позвоним вам в течение 1 часа.
            </p>
            <p className="text-sm mb-6" style={{ color: '#6B6560' }}>
              Менеджер{' '}
              <span className="font-semibold" style={{ color: '#1A1816' }}>{company.name}</span>{' '}
              подтвердит ваш подарок.
            </p>

            <div className="rounded-2xl p-5 mb-6 text-left"
              style={{ background: '#FFF', border: '1px solid #EDE8E0', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#A09890' }}>
                Ваш подарок
              </p>
              <p className="font-bold text-xl mb-1" style={{ color: '#E8621A' }}>
                {company.giftLabel}
              </p>
              <p className="text-xs mb-4" style={{ color: '#A09890' }}>{company.giftCondition}</p>
              <div className="pt-3" style={{ borderTop: '1px solid #F0EBE3' }}>
                <p className="text-[10px] mb-1" style={{ color: '#A09890' }}>Заявка оформлена на:</p>
                <p className="text-sm font-semibold" style={{ color: '#1A1816' }}>
                  {submitted?.name} · {submitted?.phone}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#6B6560' }}>{submitted?.address}</p>
              </div>
            </div>

            <button onClick={onBack}
              className="w-full font-bold py-4 rounded-2xl text-white"
              style={{ background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)' }}>
              На главную
            </button>
          </div>

        ) : (

          /* ── ФОРМА ── */
          <>
            {/* ── Карточка компании ── */}
            <div className="rounded-2xl overflow-hidden mb-5"
              style={{ background: '#FFF', border: '1px solid #EDE8E0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              {company.logo && (
                <div className="flex items-center justify-center px-6 pt-5 pb-3"
                  style={{ background: `linear-gradient(135deg, ${company.color}12 0%, transparent 100%)` }}>
                  <img src={company.logo} alt={`${company.name} логотип`}
                    style={{ height: 56, maxWidth: 220, objectFit: 'contain' }} />
                </div>
              )}
              <div className="px-5 pt-3 pb-4 flex items-center gap-4"
                style={company.logo ? {} : { background: `linear-gradient(135deg, ${company.color}18 0%, transparent 100%)` }}>
                {!company.logo && (
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ background: company.color || '#E8621A' }}>
                    {initials}
                  </div>
                )}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#E8621A' }}>
                    {company.category}
                  </p>
                  <p className="font-bold text-base" style={{ color: '#1A1816' }}>{company.name}</p>
                  {company.rating && (
                    <p className="text-xs mt-0.5" style={{ color: '#6B6560' }}>{company.rating}</p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Главный оффер ── */}
            <div className="rounded-2xl px-5 py-4 mb-5"
              style={{ background: '#FFF3E8', border: '1px solid #FFD0A0' }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#A09890' }}>
                🎁 Подарок новосёлу
              </p>
              <p className="text-2xl font-extrabold" style={{ color: '#E8621A', letterSpacing: '-0.02em' }}>
                {company.giftLabel}
              </p>
              <p className="text-xs mt-1" style={{ color: '#C25820' }}>{company.giftCondition}</p>
            </div>

            {/* ── Бонусы — иконки 2×2 или список ── */}
            {freebiesAsObjects.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#A09890' }}>
                  Бесплатно для вас
                </p>
                {hasIconFreebies ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {freebiesAsObjects.map((f, i) => (
                      <div key={i} className="rounded-xl px-3 py-3 flex flex-col items-start gap-1"
                        style={{ background: '#FFF', border: '1px solid #EDE8E0' }}>
                        <span style={{ fontSize: 22 }}>{f.icon}</span>
                        <span className="text-xs font-medium leading-tight" style={{ color: '#1A1816' }}>{f.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {freebiesAsObjects.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm" style={{ color: '#1A1816' }}>
                        <span className="text-xs font-bold flex-shrink-0" style={{ color: '#22C55E' }}>✓</span>
                        {f.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Галерея работ ── */}
            {company.images?.length > 0 && (
              <div className="mb-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#A09890' }}>
                  Примеры работ
                </p>
                <PhotoSlider
                  images={company.images}
                  height={260}
                  borderRadius={16}
                  onPhotoClick={(i) => setLightbox(i)}
                  showDots
                />
              </div>
            )}

            {/* ── Преимущества ── */}
            {company.advantages?.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#A09890' }}>
                  Почему выбирают нас
                </p>
                <div className="flex flex-col gap-2">
                  {company.advantages.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm" style={{ color: '#6B6560' }}>
                      <span style={{ color: '#E8621A', fontWeight: 700 }}>·</span>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Описание компании ── */}
            {company.description && (
              <div className="rounded-2xl px-5 py-4 mb-5"
                style={{ background: '#FFF', border: '1px solid #EDE8E0' }}>
                <p className="text-sm leading-relaxed" style={{ color: '#6B6560' }}>
                  {company.description}
                </p>
              </div>
            )}

            {/* ── Как это работает ── */}
            {company.steps?.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#A09890' }}>
                  Как это работает
                </p>
                <div className="rounded-2xl overflow-hidden" style={{ background: '#FFF', border: '1px solid #EDE8E0' }}>
                  {company.steps.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3"
                      style={{ borderBottom: i < company.steps.length - 1 ? '1px solid #F0EBE3' : 'none' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                        style={{ background: '#E8621A', marginTop: 2, minWidth: 32 }}>
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: '#1A1816' }}>{s.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#A09890', lineHeight: 1.4 }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Кнопки CTA — вертикально ── */}
            <div className="flex flex-col gap-2 mb-5">
              {company.ctaButtons.map(btn => (
                <button
                  key={btn.type}
                  onClick={() => {
                    if (btn.type === 'discount' && company.calculator === 'rassrochka') {
                      setShowCalc(true)
                    } else {
                      setActiveBtn(btn.type)
                    }
                  }}
                  className="w-full text-sm py-3.5 px-4 rounded-xl transition-all font-semibold text-left"
                  style={
                    activeBtn === btn.type
                      ? { background: '#E8621A', color: '#FFF', border: '1px solid #E8621A' }
                      : { background: '#FFF', color: '#6B6560', border: '1px solid #EDE8E0' }
                  }
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* ── Форма ── */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-5">

              {/* Имя */}
              <div style={{ position: 'relative' }}>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  placeholder="Ваше имя"
                  onChange={e => {
                    const v = e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z\s]/g, '')
                    setForm(f => ({ ...f, name: v }))
                    setTouched(t => ({ ...t, name: true }))
                  }}
                  onBlur={() => setTouched(t => ({ ...t, name: true }))}
                  className="rounded-xl text-sm focus:outline-none w-full"
                  style={{
                    padding: touched.name && nameValid ? '12px 36px 12px 16px' : '12px 16px',
                    background: fieldBg(nameValid, touched.name),
                    border: fieldBorder(nameValid, touched.name),
                    color: '#1A1816',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                />
                {touched.name && nameValid && (
                  <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#22C55E', fontWeight: 700, fontSize: 16, pointerEvents: 'none' }}>✓</span>
                )}
                {hint(nameValid, touched.name, 'Введите настоящее имя (только буквы)', '✓ Имя заполнено')}
              </div>

              {/* Телефон */}
              <div style={{ position: 'relative' }}>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  placeholder="+7 (_) _-_-_"
                  onChange={e => {
                    setForm(f => ({ ...f, phone: formatPhone(e.target.value) }))
                    setTouched(t => ({ ...t, phone: true }))
                  }}
                  onBlur={() => setTouched(t => ({ ...t, phone: true }))}
                  className="rounded-xl text-sm focus:outline-none w-full"
                  style={{
                    padding: touched.phone && phoneValid ? '12px 36px 12px 16px' : '12px 16px',
                    background: fieldBg(phoneValid, touched.phone),
                    border: fieldBorder(phoneValid, touched.phone),
                    color: '#1A1816',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                />
                {touched.phone && phoneValid && (
                  <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#22C55E', fontWeight: 700, fontSize: 16, pointerEvents: 'none' }}>✓</span>
                )}
                {hint(phoneValid, touched.phone, 'Введите полный номер: +7 (XXX) XXX-XX-XX', '✓ Номер заполнен')}
              </div>

              {/* Адрес */}
              <div style={{ position: 'relative' }}>
                <input
                  name="address"
                  type="text"
                  value={form.address}
                  placeholder="Адрес и название ЖК"
                  onChange={e => {
                    const v = e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z0-9\s.,\-\/]/g, '')
                    setForm(f => ({ ...f, address: v }))
                    setTouched(t => ({ ...t, address: true }))
                  }}
                  onBlur={() => setTouched(t => ({ ...t, address: true }))}
                  className="rounded-xl text-sm focus:outline-none w-full"
                  style={{
                    padding: touched.address && addressValid ? '12px 36px 12px 16px' : '12px 16px',
                    background: fieldBg(addressValid, touched.address),
                    border: fieldBorder(addressValid, touched.address),
                    color: '#1A1816',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                />
                {touched.address && addressValid && (
                  <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#22C55E', fontWeight: 700, fontSize: 16, pointerEvents: 'none' }}>✓</span>
                )}
                {hint(addressValid, touched.address, 'Укажите адрес и название ЖК', '✓ Адрес заполнен')}
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className="w-full font-bold py-4 rounded-2xl mt-1 text-white"
                style={{
                  background: isFormValid
                    ? 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)'
                    : '#D0D0D0',
                  cursor: isFormValid ? 'pointer' : 'not-allowed',
                  opacity: isFormValid ? 1 : 0.6,
                  transition: 'all 0.3s ease',
                }}>
                Активировать подарок →
              </button>
            </form>

            {/* ── Адреса ── */}
            {company.addresses?.length > 0 ? (
              <div className="mt-2 pt-4 flex flex-col gap-3" style={{ borderTop: '1px solid #EDE8E0' }}>
                {company.addresses.map((loc, i) => (
                  <div key={i} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold mb-0.5" style={{ color: '#1A1816' }}>{loc.label}</p>
                      <p className="text-xs" style={{ color: '#A09890' }}>📍 {loc.address}</p>
                      {loc.phoneFriendly && (
                        <p className="text-xs mt-0.5" style={{ color: '#A09890' }}>📞 {loc.phoneFriendly}</p>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
                      <a href={`tel:${loc.phoneFriendly?.replace(/\D/g, '').replace(/^7/, '+7') || company.phone}`}
                        className="text-xs font-semibold px-3 py-2 rounded-xl transition-colors tap-target"
                        style={{ background: '#FFF3E8', border: '1px solid #FFD0A0', color: '#E8621A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        📞 Звонить
                      </a>
                      <a
                        href={`https://yandex.ru/maps/?text=${encodeURIComponent(loc.address)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="text-xs font-semibold px-3 py-2 rounded-xl transition-colors tap-target"
                        style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', color: '#0369A1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        🗺 Маршрут
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 pt-4 flex items-center justify-between"
                style={{ borderTop: '1px solid #EDE8E0' }}>
                <div>
                  <p className="text-xs mb-1" style={{ color: '#A09890' }}>📍 {company.address}</p>
                  <p className="text-xs" style={{ color: '#A09890' }}>🕐 {company.hours}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {company.phones?.length > 0 ? company.phones.map((p, i) => (
                    <a key={i} href={`tel:${p.number}`}
                      className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors tap-target"
                      style={{ background: '#FFF3E8', border: '1px solid #FFD0A0', color: '#E8621A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      📞 {p.friendly}
                    </a>
                  )) : (
                  <a href={`tel:${company.phone}`}
                    className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors tap-target"
                    style={{ background: '#FFF3E8', border: '1px solid #FFD0A0', color: '#E8621A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    📞 Позвонить
                  </a>
                  )}
                  {company.address && company.address !== 'Красноярск' && (
                    <a
                      href={`https://yandex.ru/maps/?text=${encodeURIComponent(company.address + ', Красноярск')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors tap-target"
                      style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', color: '#0369A1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      🗺 Маршрут
                    </a>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Калькулятор рассрочки ── */}
      {showCalc && <RassrochkaCalculator onClose={() => setShowCalc(false)} />}

      {/* ── Лайтбокс ── */}
      {lightbox !== null && company.images?.length > 0 && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.93)', zIndex: 9999 }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 flex items-center justify-center rounded-full text-white"
            style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.15)', fontSize: 20, lineHeight: 1 }}
            onClick={() => setLightbox(null)}
          >×</button>

          <p className="absolute top-5 left-0 right-0 text-center text-sm font-semibold"
            style={{ color: 'rgba(255,255,255,0.7)' }}>
            {lightbox + 1} / {company.images.length}
          </p>

          {lightbox > 0 && (
            <button
              className="absolute left-3 flex items-center justify-center rounded-full text-white"
              style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.15)', fontSize: 22, top: '50%', transform: 'translateY(-50%)' }}
              onClick={e => { e.stopPropagation(); setLightbox(l => l - 1) }}
            >‹</button>
          )}

          <img
            src={company.images[lightbox]}
            alt={`${company.name} — фото ${lightbox + 1}`}
            style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: 12 }}
            onClick={e => e.stopPropagation()}
          />

          {lightbox < company.images.length - 1 && (
            <button
              className="absolute right-3 flex items-center justify-center rounded-full text-white"
              style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.15)', fontSize: 22, top: '50%', transform: 'translateY(-50%)' }}
              onClick={e => { e.stopPropagation(); setLightbox(l => l + 1) }}
            >›</button>
          )}

          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5">
            {company.images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setLightbox(i) }}
                style={{
                  width: i === lightbox ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === lightbox ? '#E8621A' : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
