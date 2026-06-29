import { useState, useRef } from 'react'

const ACCENT = '#E8621A'
const WEB3   = '2c502e1a-5b57-43a0-b56f-9ffa8c423793'
const FONT   = '"Montserrat", system-ui, sans-serif'

const FIELDS = [
  { name: 'company', label: 'Название компании',                        type: 'text',     validate: v => v.trim().length >= 2 },
  { name: 'contact', label: 'Ваше имя и должность',                     type: 'text',     validate: v => v.trim().length >= 2 },
  { name: 'phone',   label: 'Номер телефона',                           type: 'tel',      validate: v => v.replace(/\D/g, '').length >= 10 },
  { name: 'email',   label: 'Email компании',                           type: 'email',    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
  { name: 'about',   label: 'Чем занимается ваша компания',             type: 'text',     validate: v => v.trim().length >= 2 },
  { name: 'gift',    label: 'Какой подарок предложите новосёлам',       type: 'textarea', validate: v => v.trim().length >= 5 },
]
const INIT_VALUES  = Object.fromEntries(FIELDS.map(f => [f.name, '']))
const INIT_ERRORS  = Object.fromEntries(FIELDS.map(f => [f.name, false]))
const INIT_TOUCHED = Object.fromEntries(FIELDS.map(f => [f.name, false]))

function inputStyle(hasError) {
  return {
    width: '100%', boxSizing: 'border-box',
    padding: '14px 16px', borderRadius: 12, outline: 'none',
    fontSize: 15, color: '#1A1816', resize: 'vertical',
    fontFamily: FONT,
    border: `1.5px solid ${hasError ? '#EF4444' : '#E5E0D8'}`,
    background: hasError ? '#FFF8F8' : '#fff',
    transition: 'border-color 0.15s, background 0.15s',
  }
}

export default function PartnersPage({ onBack }) {
  const formRef   = useRef(null)
  const [values,  setValues]  = useState(INIT_VALUES)
  const [errors,  setErrors]  = useState(INIT_ERRORS)
  const [touched, setTouched] = useState(INIT_TOUCHED)
  const [status,  setStatus]  = useState('idle')

  const validate = (name, val) => {
    const f = FIELDS.find(f => f.name === name)
    return f ? !f.validate(val) : false
  }
  const handleChange = (name, val) => {
    setValues(v => ({ ...v, [name]: val }))
    if (touched[name]) setErrors(e => ({ ...e, [name]: validate(name, val) }))
  }
  const handleBlur = (name) => {
    setTouched(t => ({ ...t, [name]: true }))
    setErrors(e => ({ ...e, [name]: validate(name, values[name]) }))
  }
  const allValid = FIELDS.every(f => f.validate(values[f.name]))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newTouched = Object.fromEntries(FIELDS.map(f => [f.name, true]))
    const newErrors  = Object.fromEntries(FIELDS.map(f => [f.name, !f.validate(values[f.name])]))
    setTouched(newTouched)
    setErrors(newErrors)
    if (!allValid) return
    setStatus('sending')
    const body = `Новая заявка партнёра — Гид Новосёла\n\nКомпания: ${values.company}\nКонтакт: ${values.contact}\nТелефон: ${values.phone}\nEmail: ${values.email}\nДеятельность: ${values.about}\nПодарок: ${values.gift}\n\nСайт: gidnovosela.ru`
    try {
      const fd = new FormData()
      fd.append('access_key', WEB3)
      fd.append('subject',    'Новая заявка партнёра')
      fd.append('from_name',  'Гид Новосёла')
      fd.append('message',    body)
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const scrollToForm = () =>
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)

  const orangeBtn = (text, onClick, href) => {
    const style = {
      display: 'inline-block', padding: '15px 40px', borderRadius: 12, border: 'none',
      background: `linear-gradient(90deg, ${ACCENT} 0%, #FF9B2F 100%)`,
      color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
      fontFamily: FONT, textDecoration: 'none',
      boxShadow: '0 4px 20px rgba(232,98,26,0.28)',
      transition: 'filter 0.15s',
    }
    const hover = e => e.currentTarget.style.filter = 'brightness(0.9)'
    const leave = e => e.currentTarget.style.filter = ''
    if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={style} onMouseEnter={hover} onMouseLeave={leave}>{text}</a>
    return <button onClick={onClick} style={style} onMouseEnter={hover} onMouseLeave={leave}>{text}</button>
  }

  return (
    <div style={{ background: '#F7F4F0', minHeight: '100vh', fontFamily: FONT }}>

      {/* ── ШАПКА НАЗАД ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(247,244,240,0.96)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #EDE8E0', padding: '12px 20px',
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: ACCENT, fontSize: 14, fontWeight: 700, fontFamily: FONT,
          }}
        >
          <span style={{ fontSize: 16 }}>←</span> На главную
        </button>
      </div>

      {/* ══ БЛОК 1: ГЕРОЙ ══ */}
      <section style={{
        background: '#F7F4F0',
        padding: 'clamp(48px,8vw,96px) 20px clamp(56px,9vw,104px)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '2.5px',
            color: ACCENT, textTransform: 'uppercase', marginBottom: 18,
          }}>
            Для бизнеса
          </p>
          <h1 style={{
            fontSize: 'clamp(28px,6vw,52px)', fontWeight: 900,
            color: '#1A1816', lineHeight: 1.15, letterSpacing: '-0.02em',
            margin: '0 0 20px',
          }}>
            Станьте партнёром<br />
            <span style={{ color: ACCENT }}>Гид Новосёла</span>
          </h1>
          <p style={{
            fontSize: 'clamp(15px,2.5vw,18px)', color: '#6B6560',
            lineHeight: 1.65, margin: '0 auto 40px', maxWidth: '44ch',
          }}>
            Получайте новых клиентов среди новосёлов Красноярска — именно тогда, когда они ищут то, что вы предлагаете
          </p>
          {orangeBtn('Оставить заявку →', scrollToForm)}
        </div>
      </section>

      {/* ══ БЛОК 2: ЦИФРЫ ══ */}
      <section style={{ background: '#1a1a1a', padding: 'clamp(56px,8vw,88px) 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(22px,4vw,32px)', fontWeight: 900,
            color: '#fff', margin: '0 0 12px',
          }}>
            Цифры которые говорят сами за себя
          </h2>
          <p style={{ fontSize: 15, color: '#888', margin: '0 0 48px' }}>
            Новосёлы — самая активная аудитория для местного бизнеса
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 20, marginBottom: 48,
          }}>
            {[
              { val: 'В 5 раз',  desc: 'больше тратят новосёлы в первый год по сравнению с обычными жителями' },
              { val: '1 из 1',   desc: 'только одна компания вашей сферы в программе — конкуренты не попадут к вашим клиентам' },
              { val: '30 сек',   desc: 'за столько новосёл активирует сертификат и становится вашим клиентом' },
            ].map((s, i) => (
              <div key={i} style={{
                background: '#2a2a2a', borderRadius: 16, padding: '36px 24px',
              }}>
                <p style={{ fontSize: 48, fontWeight: 900, color: ACCENT, margin: '0 0 14px', lineHeight: 1 }}>
                  {s.val}
                </p>
                <p style={{ fontSize: 14, color: '#fff', margin: 0, lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={scrollToForm}
            style={{
              padding: '15px 40px', borderRadius: 10, border: 'none',
              background: ACCENT, color: '#fff',
              fontSize: 16, fontWeight: 700, cursor: 'pointer',
              fontFamily: FONT, transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#c45415'}
            onMouseLeave={e => e.currentTarget.style.background = ACCENT}
          >
            Хочу таких клиентов →
          </button>
        </div>
      </section>

      {/* ══ БЛОК 3: PDF ══ */}
      <section style={{ background: '#1a1a1a', padding: '0 20px clamp(56px,8vw,88px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            background: '#222', border: '1px solid #333',
            borderRadius: 16, padding: 'clamp(28px,4vw,48px)',
            display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap',
          }}>
            {/* Текст */}
            <div style={{ flex: '1 1 260px' }}>
              <p style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '2px',
                color: ACCENT, textTransform: 'uppercase', marginBottom: 12,
              }}>
                БЕСПЛАТНО
              </p>
              <h3 style={{
                fontSize: 'clamp(18px,3vw,24px)', fontWeight: 800,
                color: '#fff', lineHeight: 1.3, margin: '0 0 20px',
              }}>
                Руководство — как привлечь новосёлов
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Почему новосёлы лучшие клиенты', 'Как работает платформа', 'Что получает партнёр', 'Как начать за 24 часа'].map((t, i) => (
                  <li key={i} style={{ fontSize: 14, color: '#fff', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>✓</span>{t}
                  </li>
                ))}
              </ul>
              {orangeBtn('📄 Скачать бесплатный гайд', null, '/gid-novosel-partner-guide.pdf')}
            </div>
            {/* PDF значок */}
            <div style={{ flex: '0 1 auto' }}>
              <p style={{
                fontSize: 80, fontWeight: 900, color: ACCENT,
                lineHeight: 1, margin: 0, letterSpacing: '-4px',
              }}>
                PDF
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ БЛОК 4: ФОРМА ══ */}
      <section
        id="form"
        ref={formRef}
        style={{ background: '#F7F4F0', padding: 'clamp(48px,7vw,80px) 20px clamp(64px,9vw,100px)' }}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(22px,4vw,30px)', fontWeight: 900, color: '#1A1816',
            margin: '0 0 8px', textAlign: 'center',
          }}>
            Оставьте заявку
          </h2>
          <p style={{ fontSize: 14, color: '#8A8480', textAlign: 'center', margin: '0 0 36px' }}>
            Мы свяжемся в течение рабочего дня
          </p>

          {status === 'success' ? (
            <div style={{
              background: '#fff', borderRadius: 20, padding: '48px 32px',
              textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: '#1A1816', marginBottom: 12 }}>
                Заявка отправлена!
              </h3>
              <p style={{ fontSize: 15, color: '#6B6560', lineHeight: 1.6 }}>
                Мы изучим её и свяжемся с вами<br />в течение рабочего дня.
              </p>
            </div>
          ) : (
            <div style={{
              background: '#fff', borderRadius: 20,
              padding: 'clamp(24px,4vw,40px)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}>
              <form onSubmit={handleSubmit} noValidate>
                {FIELDS.map(f => (
                  <div key={f.name} style={{ marginBottom: 16 }}>
                    <label style={{
                      display: 'block', fontSize: 12, fontWeight: 600,
                      color: '#6B6560', marginBottom: 6,
                    }}>
                      {f.label} <span style={{ color: ACCENT }}>*</span>
                    </label>
                    {f.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        value={values[f.name]}
                        onChange={e => handleChange(f.name, e.target.value)}
                        onBlur={() => handleBlur(f.name)}
                        placeholder={f.label}
                        style={inputStyle(errors[f.name] && touched[f.name])}
                      />
                    ) : (
                      <input
                        type={f.type}
                        value={values[f.name]}
                        onChange={e => handleChange(f.name, e.target.value)}
                        onBlur={() => handleBlur(f.name)}
                        placeholder={f.label}
                        style={inputStyle(errors[f.name] && touched[f.name])}
                      />
                    )}
                    {errors[f.name] && touched[f.name] && (
                      <p style={{ fontSize: 11, color: '#EF4444', marginTop: 4 }}>
                        {f.type === 'email' ? 'Введите корректный email' :
                         f.type === 'tel'   ? 'Введите корректный номер (от 10 цифр)' :
                                              'Заполните это поле'}
                      </p>
                    )}
                  </div>
                ))}

                {status === 'error' && (
                  <p style={{ fontSize: 12, color: '#EF4444', marginBottom: 12, textAlign: 'center' }}>
                    Ошибка отправки. Напишите на neirobanya@mail.ru
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    width: '100%', padding: '16px 0', borderRadius: 12, border: 'none',
                    background: status === 'sending'
                      ? '#C8A880'
                      : `linear-gradient(90deg, ${ACCENT} 0%, #FF9B2F 100%)`,
                    color: '#fff', fontSize: 16, fontWeight: 800, fontFamily: FONT,
                    cursor: status === 'sending' ? 'default' : 'pointer',
                    transition: 'filter 0.15s', marginTop: 8,
                  }}
                  onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.filter = 'brightness(0.9)' }}
                  onMouseLeave={e => { e.currentTarget.style.filter = '' }}
                >
                  {status === 'sending' ? 'Отправляем...' : 'Отправить заявку на партнёрство →'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
