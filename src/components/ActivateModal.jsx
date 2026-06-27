import { useState, useEffect, useCallback } from 'react'

const WEB3FORMS_KEY = '2c502e1a-5b57-43a0-b56f-9ffa8c423793'

const formatPhone = (value) => {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 0) return ''
  let result = '+7'
  if (digits.length > 1) result += ' (' + digits.substring(1, 4)
  if (digits.length >= 4) result += ') ' + digits.substring(4, 7)
  if (digits.length >= 7) result += '-' + digits.substring(7, 9)
  if (digits.length >= 9) result += '-' + digits.substring(9, 11)
  return result
}

export default function ActivateModal({ isOpen, onClose, giftTitle, partnerName, partnerColor }) {
  const [name,    setName]    = useState('')
  const [phone,   setPhone]   = useState('')
  const [address, setAddress] = useState('')
  const [touched, setTouched] = useState({ name: false, phone: false, address: false })
  const [status,  setStatus]  = useState('idle')

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (status !== 'success') return
    const t = setTimeout(() => handleClose(), 4000)
    return () => clearTimeout(t)
  }, [status])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  const handleClose = useCallback(() => {
    onClose()
    setTimeout(() => {
      setName(''); setPhone(''); setAddress('')
      setTouched({ name: false, phone: false, address: false })
      setStatus('idle')
    }, 300)
  }, [onClose])

  const nameValid    = name.trim().length >= 2
  const phoneValid   = phone.replace(/\D/g, '').length === 11
  const addressValid = address.length >= 5 && /[а-яёА-ЯЁa-zA-Z]/.test(address) && /\d/.test(address)
  const isFormValid  = nameValid && phoneValid && addressValid

  const nameHint = () => {
    if (!touched.name) return { text: 'Только буквы, без цифр', color: '#999' }
    if (!nameValid)    return { text: 'Введите настоящее имя', color: '#EF4444' }
    return               { text: '✓ Имя заполнено', color: '#22C55E' }
  }

  const phoneHint = () => {
    if (!touched.phone) return { text: 'Формат: +7 (XXX) XXX-XX-XX', color: '#999' }
    if (!phoneValid)    return { text: 'Введите полный номер телефона', color: '#EF4444' }
    return                { text: '✓ Номер заполнен', color: '#22C55E' }
  }

  const addressHint = () => {
    if (!touched.address) return { text: 'Улица, номер дома, название ЖК', color: '#999' }
    if (!addressValid)    return { text: 'Укажите улицу, номер дома и название ЖК', color: '#EF4444' }
    return                  { text: '✓ Адрес заполнен', color: '#22C55E' }
  }

  const fieldBorder = (isValid, isTouched) => {
    if (!isTouched) return '1.5px solid #E0DAD4'
    return isValid ? '1.5px solid #22C55E' : '2px solid #EF4444'
  }

  const fieldBg = (isValid, isTouched) => {
    if (!isTouched) return '#FAFAF9'
    return isValid ? '#F0FDF4' : '#FFF8F8'
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setTouched({ name: true, phone: true, address: true })
    if (!isFormValid) return
    setStatus('sending')

    const message = `Заявка на подарок!

Подарок: ${giftTitle}
Партнёр: ${partnerName}

Имя: ${name}
Телефон: ${phone}
Адрес / ЖК: ${address}

Заявка получена с сайта gidnovosela.ru`

    try {
      const fd = new FormData()
      fd.append('access_key', WEB3FORMS_KEY)
      fd.append('subject',    `🎁 Заявка на подарок — ${partnerName} — gidnovosela.ru`)
      fd.append('from_name',  'Гид Новосёла')
      fd.append('message',    message)
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (!isOpen) return null

  const nh = nameHint()
  const ph = phoneHint()
  const ah = addressHint()

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
        animation: 'modalBgFadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 20,
          width: '100%', maxWidth: 420,
          boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
          animation: 'modalSlideIn 0.25s cubic-bezier(0.34,1.56,0.64,1)',
          overflow: 'hidden',
        }}
      >
        <div style={{ height: 5, background: partnerColor || '#E8621A' }} />

        <div style={{ padding: '24px 20px 20px' }}>
          <button onClick={handleClose} aria-label="Закрыть"
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 34, height: 34, borderRadius: '50%',
              background: '#F5F5F5', border: 'none',
              fontSize: 16, cursor: 'pointer', color: '#666',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            ✕
          </button>

          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '12px 0 4px' }}>
              <div className="success-icon" style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
              <h3 style={{ fontSize: 19, fontWeight: 900, color: '#1A1816', marginBottom: 8 }}>
                Отлично! Заявка принята.
              </h3>
              <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.6, marginBottom: 22 }}>
                Свяжемся с вами в течение часа.
              </p>
              <button onClick={handleClose}
                style={{
                  padding: '11px 28px', borderRadius: 12,
                  background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
                  color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                }}>
                Закрыть
              </button>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🎁</div>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#1A1816', lineHeight: 1.25, marginBottom: 4 }}>
                  {giftTitle}
                </h3>
                <p style={{ fontSize: 12, color: '#8A8480' }}>от {partnerName}</p>
              </div>

              <form onSubmit={handleSubmit} noValidate>

                {/* Имя */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6B6560', marginBottom: 4 }}>
                    Ваше имя <span style={{ color: '#E8621A' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Иван Иванов"
                    onChange={e => {
                      const v = e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z\s]/g, '')
                      setName(v)
                      setTouched(t => ({ ...t, name: true }))
                    }}
                    onBlur={() => setTouched(t => ({ ...t, name: true }))}
                    style={{
                      width: '100%', padding: '11px 13px',
                      border: fieldBorder(nameValid, touched.name),
                      borderRadius: 10, fontSize: 14, color: '#1A1816',
                      background: fieldBg(nameValid, touched.name),
                      outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                  />
                  <p style={{ fontSize: 11, color: nh.color, marginTop: 3 }}>{nh.text}</p>
                </div>

                {/* Телефон */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6B6560', marginBottom: 4 }}>
                    Номер телефона <span style={{ color: '#E8621A' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    placeholder="+7 (___) ___-__-__"
                    onChange={e => {
                      setPhone(formatPhone(e.target.value))
                      setTouched(t => ({ ...t, phone: true }))
                    }}
                    onBlur={() => setTouched(t => ({ ...t, phone: true }))}
                    style={{
                      width: '100%', padding: '11px 13px',
                      border: fieldBorder(phoneValid, touched.phone),
                      borderRadius: 10, fontSize: 14, color: '#1A1816',
                      background: fieldBg(phoneValid, touched.phone),
                      outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                  />
                  <p style={{ fontSize: 11, color: ph.color, marginTop: 3 }}>{ph.text}</p>
                </div>

                {/* Адрес */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6B6560', marginBottom: 4 }}>
                    Адрес дома / название ЖК <span style={{ color: '#E8621A' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    placeholder="Например: ул. Тотмина 25А, ЖК Орбита"
                    onChange={e => {
                      const v = e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z0-9\s.,\-\/]/g, '')
                      setAddress(v)
                      setTouched(t => ({ ...t, address: true }))
                    }}
                    onBlur={() => setTouched(t => ({ ...t, address: true }))}
                    style={{
                      width: '100%', padding: '11px 13px',
                      border: fieldBorder(addressValid, touched.address),
                      borderRadius: 10, fontSize: 14, color: '#1A1816',
                      background: fieldBg(addressValid, touched.address),
                      outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                  />
                  <p style={{ fontSize: 11, color: ah.color, marginTop: 3 }}>{ah.text}</p>
                </div>

                {status === 'error' && (
                  <p style={{ fontSize: 12, color: '#EF4444', marginBottom: 10, textAlign: 'center' }}>
                    Ошибка. Попробуйте ещё раз или позвоните нам.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending' || !isFormValid}
                  style={{
                    width: '100%', padding: '14px 0', marginTop: 4,
                    background: status === 'sending'
                      ? '#C8A880'
                      : isFormValid
                        ? 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)'
                        : '#D0D0D0',
                    color: '#fff', border: 'none', borderRadius: 12,
                    fontSize: 15, fontWeight: 800,
                    cursor: (status === 'sending' || !isFormValid) ? 'not-allowed' : 'pointer',
                    opacity: (!isFormValid && status !== 'sending') ? 0.6 : 1,
                    minHeight: 50,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {status === 'sending' ? 'Отправляем...' : 'Получить подарок →'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
