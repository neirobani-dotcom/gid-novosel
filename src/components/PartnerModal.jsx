import { useState, useEffect, useCallback } from 'react'

const WEB3FORMS_KEY = '2c502e1a-5b57-43a0-b56f-9ffa8c423793'

const FIELDS = [
  { name: 'company',  label: 'Название вашей компании',                       type: 'text',     validate: v => v.trim().length > 0 },
  { name: 'contact',  label: 'Ваше имя и должность',                          type: 'text',     validate: v => v.trim().length > 0 },
  { name: 'phone',    label: 'Номер телефона',                                 type: 'tel',      validate: v => v.replace(/\D/g, '').length >= 10 },
  { name: 'email',    label: 'Email компании',                                 type: 'email',    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
  { name: 'about',    label: 'Чем занимается ваша компания',                   type: 'text',     validate: v => v.trim().length > 0 },
  { name: 'gift',     label: 'Какой подарок или скидку готовы предложить новосёлам?', type: 'textarea', validate: v => v.trim().length > 0 },
]

const EMPTY = Object.fromEntries(FIELDS.map(f => [f.name, '']))
const NO_ERRORS = Object.fromEntries(FIELDS.map(f => [f.name, false]))

export default function PartnerModal({ isOpen, onClose }) {
  const [values, setValues]   = useState(EMPTY)
  const [errors, setErrors]   = useState(NO_ERRORS)
  const [touched, setTouched] = useState(NO_ERRORS)
  const [status, setStatus]   = useState('idle') // idle | sending | success | error

  // Блокировка скролла
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Автозакрытие после успеха
  useEffect(() => {
    if (status !== 'success') return
    const t = setTimeout(() => {
      handleClose()
    }, 4000)
    return () => clearTimeout(t)
  }, [status])

  // Закрытие по Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  const handleClose = useCallback(() => {
    onClose()
    setTimeout(() => {
      setValues(EMPTY)
      setErrors(NO_ERRORS)
      setTouched(NO_ERRORS)
      setStatus('idle')
    }, 300)
  }, [onClose])

  const validate = (name, value) => {
    const field = FIELDS.find(f => f.name === name)
    return field ? !field.validate(value) : false
  }

  const handleChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }))
    if (touched[name]) {
      setErrors(e => ({ ...e, [name]: validate(name, value) }))
    }
  }

  const handleBlur = (name) => {
    setTouched(t => ({ ...t, [name]: true }))
    setErrors(e => ({ ...e, [name]: validate(name, values[name]) }))
  }

  const allValid = FIELDS.every(f => f.validate(values[f.name]))

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Помечаем всё touched и показываем ошибки
    const newTouched = Object.fromEntries(FIELDS.map(f => [f.name, true]))
    const newErrors  = Object.fromEntries(FIELDS.map(f => [f.name, !f.validate(values[f.name])]))
    setTouched(newTouched)
    setErrors(newErrors)
    if (!allValid) return

    setStatus('sending')

    const body = `Новая заявка на партнёрство!

Компания: ${values.company}
Контактное лицо: ${values.contact}
Телефон: ${values.phone}
Email: ${values.email}
Чем занимается: ${values.about}
Что предлагают новосёлам: ${values.gift}

Заявка получена с сайта gidnovosela.ru`

    try {
      const fd = new FormData()
      fd.append('access_key', WEB3FORMS_KEY)
      fd.append('subject',    '🤝 Новая заявка на партнёрство — gidnovosela.ru')
      fd.append('from_name',  'Гид Новосёла')
      fd.append('message',    body)

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (!isOpen) return null

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        animation: 'modalBgFadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 20,
          width: '100%',
          maxWidth: 500,
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
          animation: 'modalSlideIn 0.25s cubic-bezier(0.34,1.56,0.64,1)',
          position: 'relative',
        }}
      >
        {/* Крестик */}
        <button
          onClick={handleClose}
          aria-label="Закрыть"
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 10,
            width: 36, height: 36, borderRadius: '50%',
            background: '#F5F5F5', border: 'none',
            fontSize: 18, cursor: 'pointer', color: '#666',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        <div style={{ padding: '28px 24px 24px' }}>
          {status === 'success' ? (
            <SuccessScreen onClose={handleClose} />
          ) : (
            <>
              {/* Шапка */}
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🤝</div>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1A1816', marginBottom: 8, lineHeight: 1.2 }}>
                  Стать партнёром Гид Новосёла
                </h2>
                <p style={{ fontSize: 13, color: '#8A8480', lineHeight: 1.55, maxWidth: '34ch', margin: '0 auto' }}>
                  Оставьте заявку — мы свяжемся с вами в течение дня и расскажем об условиях сотрудничества
                </p>
              </div>

              {/* Форма */}
              <form onSubmit={handleSubmit} noValidate>
                {FIELDS.map(f => (
                  <div key={f.name} style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6B6560', marginBottom: 5 }}>
                      {f.label} <span style={{ color: '#E8621A' }}>*</span>
                    </label>
                    {f.type === 'textarea' ? (
                      <textarea
                        value={values[f.name]}
                        onChange={e => handleChange(f.name, e.target.value)}
                        onBlur={() => handleBlur(f.name)}
                        rows={3}
                        style={inputStyle(errors[f.name])}
                        placeholder={f.label}
                      />
                    ) : (
                      <input
                        type={f.type}
                        value={values[f.name]}
                        onChange={e => handleChange(f.name, e.target.value)}
                        onBlur={() => handleBlur(f.name)}
                        style={inputStyle(errors[f.name])}
                        placeholder={f.label}
                      />
                    )}
                    {errors[f.name] && (
                      <p style={{ fontSize: 11, color: '#E8321A', marginTop: 3 }}>
                        {f.type === 'email' ? 'Введите корректный email' :
                         f.type === 'tel'   ? 'Введите корректный номер (минимум 10 цифр)' :
                                              'Заполните это поле'}
                      </p>
                    )}
                  </div>
                ))}

                {status === 'error' && (
                  <p style={{ fontSize: 12, color: '#E8321A', marginBottom: 10, textAlign: 'center' }}>
                    Ошибка отправки. Попробуйте ещё раз или напишите на neirobanya@mail.ru
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    width: '100%', padding: '14px 0',
                    background: status === 'sending'
                      ? '#C8A880'
                      : 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
                    color: '#fff', border: 'none', borderRadius: 12,
                    fontSize: 15, fontWeight: 800, cursor: status === 'sending' ? 'default' : 'pointer',
                    transition: 'filter 0.15s',
                    marginTop: 4,
                    minHeight: 50,
                  }}
                  onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.filter = 'brightness(0.9)' }}
                  onMouseLeave={e => { e.currentTarget.style.filter = '' }}
                >
                  {status === 'sending' ? 'Отправляем...' : 'Отправить заявку на партнёрство →'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function SuccessScreen({ onClose }) {
  return (
    <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
      <div className="success-icon" style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
      <h3 style={{ fontSize: 20, fontWeight: 900, color: '#1A1816', marginBottom: 10 }}>
        Заявка отправлена!
      </h3>
      <p style={{ fontSize: 14, color: '#6B6560', lineHeight: 1.6, marginBottom: 28 }}>
        Мы изучим её и свяжемся с вами<br />в течение рабочего дня.
      </p>
      <button
        onClick={onClose}
        style={{
          padding: '12px 32px', borderRadius: 12,
          background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
          color: '#fff', border: 'none', fontSize: 14, fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        Закрыть
      </button>
    </div>
  )
}

function inputStyle(hasError) {
  return {
    width: '100%',
    padding: '11px 13px',
    border: `1.5px solid ${hasError ? '#E8321A' : '#E0DAD4'}`,
    borderRadius: 10,
    fontSize: 14,
    color: '#1A1816',
    background: hasError ? '#FFF8F8' : '#FAFAF9',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
    fontFamily: 'inherit',
  }
}
