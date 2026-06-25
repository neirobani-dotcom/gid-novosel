import { useState, useEffect, useCallback } from 'react'

const WEB3FORMS_KEY = '2c502e1a-5b57-43a0-b56f-9ffa8c423793'

export default function ActivateModal({ isOpen, onClose, giftTitle, partnerName, partnerColor }) {
  const [name,   setName]   = useState('')
  const [phone,  setPhone]  = useState('')
  const [house,  setHouse]  = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
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
      setName(''); setPhone(''); setHouse('')
      setErrors({}); setStatus('idle')
    }, 300)
  }, [onClose])

  const validate = () => {
    const e = {}
    if (!name.trim())                          e.name  = 'Введите имя'
    if (phone.replace(/\D/g, '').length < 10) e.phone = 'Введите корректный номер'
    if (!house.trim())                         e.house = 'Введите адрес'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setStatus('sending')

    const message = `Заявка на подарок!

Подарок: ${giftTitle}
Партнёр: ${partnerName}

Имя: ${name}
Телефон: ${phone}
Адрес / ЖК: ${house}

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
        {/* Цветная полоска вверху */}
        <div style={{ height: 5, background: partnerColor || '#E8621A' }} />

        <div style={{ padding: '24px 20px 20px' }}>
          {/* Крестик */}
          <button onClick={handleClose} aria-label="Закрыть"
            style={{ position: 'absolute', top: 16, right: 16,
              width: 34, height: 34, borderRadius: '50%',
              background: '#F5F5F5', border: 'none',
              fontSize: 16, cursor: 'pointer', color: '#666',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                style={{ padding: '11px 28px', borderRadius: 12,
                  background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
                  color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
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
                {[
                  { label: 'Ваше имя', val: name,  set: setName,  key: 'name',  type: 'text',  placeholder: 'Иван Иванов' },
                  { label: 'Номер телефона', val: phone, set: setPhone, key: 'phone', type: 'tel',   placeholder: '+7 900 000 00 00' },
                  { label: 'Адрес дома / название ЖК', val: house, set: setHouse, key: 'house', type: 'text',  placeholder: 'ЖК Символ, ул. Примерная 1' },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6B6560', marginBottom: 4 }}>
                      {f.label} <span style={{ color: '#E8621A' }}>*</span>
                    </label>
                    <input type={f.type} value={f.val} placeholder={f.placeholder}
                      onChange={e => { f.set(e.target.value); setErrors(er => ({ ...er, [f.key]: '' })) }}
                      style={{
                        width: '100%', padding: '11px 13px',
                        border: `1.5px solid ${errors[f.key] ? '#E8321A' : '#E0DAD4'}`,
                        borderRadius: 10, fontSize: 14, color: '#1A1816',
                        background: errors[f.key] ? '#FFF8F8' : '#FAFAF9',
                        outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                      }} />
                    {errors[f.key] && (
                      <p style={{ fontSize: 11, color: '#E8321A', marginTop: 3 }}>{errors[f.key]}</p>
                    )}
                  </div>
                ))}

                {status === 'error' && (
                  <p style={{ fontSize: 12, color: '#E8321A', marginBottom: 10, textAlign: 'center' }}>
                    Ошибка. Попробуйте ещё раз или позвоните нам.
                  </p>
                )}

                <button type="submit" disabled={status === 'sending'}
                  style={{
                    width: '100%', padding: '14px 0', marginTop: 4,
                    background: status === 'sending' ? '#C8A880' : 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
                    color: '#fff', border: 'none', borderRadius: 12,
                    fontSize: 15, fontWeight: 800,
                    cursor: status === 'sending' ? 'default' : 'pointer', minHeight: 50,
                  }}>
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
