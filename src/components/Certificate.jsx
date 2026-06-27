import { useState } from 'react'

const WEB3FORMS_KEY = '2c502e1a-5b57-43a0-b56f-9ffa8c423793'

const formatPhone = (input) => {
  const raw = input.replace(/\D/g, '')
  if (!raw) return ''
  let d = raw.startsWith('8') ? '7' + raw.slice(1) : raw.startsWith('7') ? raw : '7' + raw
  d = d.substring(0, 11)
  if (d.length <= 1) return '+7'
  if (d.length <= 4) return '+7 (' + d.substring(1)
  if (d.length <= 7) return '+7 (' + d.substring(1, 4) + ') ' + d.substring(4)
  if (d.length <= 9) return '+7 (' + d.substring(1, 4) + ') ' + d.substring(4, 7) + '-' + d.substring(7)
  return '+7 (' + d.substring(1, 4) + ') ' + d.substring(4, 7) + '-' + d.substring(7, 9) + '-' + d.substring(9, 11)
}

const getTodayStr = () => {
  const now = new Date()
  return String(now.getDate()).padStart(2, '0') + '.' +
    String(now.getMonth() + 1).padStart(2, '0') + '.' +
    now.getFullYear()
}

const sendReport = async ({ lastName, firstName, phone, partnerName, certCode }) => {
  try {
    const now = new Date()
    const when = now.toLocaleString('ru-RU', {
      timeZone: 'Asia/Krasnoyarsk',
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
    const fd = new FormData()
    fd.append('access_key', WEB3FORMS_KEY)
    fd.append('subject', `📜 Сертификат выдан — ${partnerName}`)
    fd.append('from_name', 'Гид Новосёла')
    fd.append('message',
      `Фамилия: ${lastName}\nИмя: ${firstName}\nТелефон: ${phone}\nПартнёр: ${partnerName}\nКод: ${certCode}\nДата: ${when} (Красноярск)`
    )
    await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
  } catch (e) {
    // silent — email is a bonus, not a blocker
  }
}

// ── Watermark layer ─────────────────────────────────────────────────────────
function Watermark() {
  const text = 'ГИД НОВОСЁЛА'
  const lines = Array(8).fill(null)
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      borderRadius: 'inherit', pointerEvents: 'none', zIndex: 0,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
      opacity: 0.035,
    }}>
      {lines.map((_, i) => (
        <div key={i} style={{
          whiteSpace: 'nowrap', fontSize: 14, fontWeight: 800,
          color: '#E8621A', letterSpacing: '4px',
          transform: 'rotate(-30deg) translateX(-20px)',
        }}>
          {Array(6).fill(text).join('   ')}
        </div>
      ))}
    </div>
  )
}

// ── Form step ───────────────────────────────────────────────────────────────
function FormStep({ company, certCode, onClose, onSubmit }) {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [phone, setPhone] = useState('')
  const [lnT, setLNT] = useState(false)
  const [fnT, setFNT] = useState(false)
  const [phT, setPHT] = useState(false)

  const lnValid = lastName.trim().length >= 2
  const fnValid = firstName.trim().length >= 2
  const phValid = phone.replace(/\D/g, '').length === 11
  const formValid = lnValid && fnValid && phValid

  const border = (valid, touched) => touched
    ? `1.5px solid ${valid ? '#22C55E' : '#EF4444'}`
    : '1.5px solid #E0D5C5'
  const bg = (valid, touched) => touched
    ? (valid ? '#F0FDF4' : '#FFF5F5')
    : '#FDFBF8'
  const icon = (valid, touched) => touched ? (valid ? '✓' : '!') : null
  const iconColor = (valid) => valid ? '#22C55E' : '#EF4444'

  const handleSubmit = () => {
    setLNT(true); setFNT(true); setPHT(true)
    if (!formValid) return
    sendReport({ lastName: lastName.trim(), firstName: firstName.trim(), phone, partnerName: company.name, certCode })
    onSubmit({ lastName: lastName.trim(), firstName: firstName.trim(), phone })
  }

  const fieldWrap = (children) => (
    <div style={{ position: 'relative' }}>{children}</div>
  )

  const fieldStyle = (valid, touched) => ({
    width: '100%', padding: '11px 36px 11px 12px', borderRadius: 10,
    border: border(valid, touched), background: bg(valid, touched),
    fontSize: 16, color: '#1a1a1a', outline: 'none',
    transition: 'border-color 0.15s, background 0.15s',
    boxSizing: 'border-box',
  })

  const iconStyle = (valid) => ({
    position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
    fontSize: 15, fontWeight: 700, color: iconColor(valid), pointerEvents: 'none',
  })

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, willChange: 'transform',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 380,
          background: '#FFFEF9',
          borderRadius: 20, border: '2px solid #E8621A',
          padding: '28px 24px 24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          animation: 'cert-appear 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
          willChange: 'transform', isolation: 'isolate', transform: 'translateZ(0)',
        }}
      >
        {/* Шапка */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <img src="/site-logo.png" alt="Гид Новосёла" style={{ width: 28, height: 28, objectFit: 'contain' }} />
          <span style={{ fontSize: 12, fontWeight: 800, color: '#E8621A', letterSpacing: '0.5px' }}>ГИД НОВОСЁЛА</span>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1a1a1a', margin: '0 0 4px' }}>
          Получите ваш сертификат
        </h2>
        <p style={{ fontSize: 13, color: '#888', margin: '0 0 20px', lineHeight: 1.4 }}>
          Введите данные — сертификат откроется сразу
        </p>

        {/* Поля */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {fieldWrap(
            <>
              <input
                type="text"
                placeholder="Фамилия"
                value={lastName}
                onChange={e => {
                  setLastName(e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z\s-]/g, ''))
                  if (!lnT) setLNT(true)
                }}
                style={fieldStyle(lnValid, lnT)}
              />
              {lnT && <span style={iconStyle(lnValid)}>{icon(lnValid, lnT)}</span>}
            </>
          )}

          {fieldWrap(
            <>
              <input
                type="text"
                placeholder="Имя"
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z\s-]/g, ''))
                  if (!fnT) setFNT(true)
                }}
                style={fieldStyle(fnValid, fnT)}
              />
              {fnT && <span style={iconStyle(fnValid)}>{icon(fnValid, fnT)}</span>}
            </>
          )}

          {fieldWrap(
            <>
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={e => {
                  setPhone(formatPhone(e.target.value))
                  if (!phT) setPHT(true)
                }}
                style={fieldStyle(phValid, phT)}
              />
              {phT && <span style={iconStyle(phValid)}>{icon(phValid, phT)}</span>}
            </>
          )}

          <input
            type="text"
            value={'Дата: ' + getTodayStr()}
            readOnly
            style={{
              width: '100%', padding: '11px 12px', borderRadius: 10,
              border: '1.5px solid #E0D5C5', background: '#F5F0E8',
              fontSize: 16, color: '#999', outline: 'none', cursor: 'default',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Кнопка */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%', marginTop: 18, padding: '13px',
            borderRadius: 12, border: 'none', cursor: formValid ? 'pointer' : 'not-allowed',
            background: formValid
              ? 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)'
              : '#D0C8BC',
            color: '#fff', fontSize: 15, fontWeight: 700,
            transition: 'background 0.2s',
          }}
        >
          {formValid ? 'Получить сертификат →' : 'Заполните все поля'}
        </button>

        <button
          onClick={onClose}
          style={{
            width: '100%', marginTop: 8, padding: 10,
            background: 'transparent', border: 'none',
            color: '#aaa', fontSize: 13, cursor: 'pointer',
          }}
        >
          Отмена
        </button>
      </div>
    </div>
  )
}

// ── Certificate step ─────────────────────────────────────────────────────────
function CertStep({ company, certCode, recipient, onClose }) {
  const [zoomed, setZoomed] = useState(false)
  const gifts = company.gifts || [company.giftLabel]

  return (
    <div
      onClick={zoomed ? undefined : onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, willChange: 'transform',
        overflowY: 'auto',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%', maxWidth: zoomed ? 420 : 360,
          background: 'linear-gradient(160deg, #FFFEF5 0%, #FFF5E8 100%)',
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 3px rgba(232,98,26,0.15)',
          animation: 'cert-appear 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
          willChange: 'transform', isolation: 'isolate', transform: 'translateZ(0)',
          transition: 'max-width 0.3s ease',
        }}
      >
        <Watermark />

        {/* Верхняя полоса */}
        <div style={{
          position: 'relative', zIndex: 1,
          background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 50%, #E8621A 100%)',
          padding: '14px 20px 12px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/site-logo.png" alt="" style={{ width: 26, height: 26, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', letterSpacing: '1px' }}>ГИД НОВОСЁЛА</span>
          </div>
          <span style={{
            fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.8)',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            ЭЛЕКТРОННЫЙ СЕРТИФИКАТ
          </span>
        </div>

        {/* Тело сертификата */}
        <div style={{ position: 'relative', zIndex: 1, padding: '20px 20px 0' }}>

          {/* Инструкция при зуме */}
          {zoomed && (
            <div style={{
              background: '#1a1a2e', color: 'white',
              fontSize: 12, padding: '10px 14px',
              borderRadius: 10, marginBottom: 14,
              textAlign: 'center', lineHeight: 1.5,
            }}>
              Сделайте скриншот экрана<br />
              <span style={{ opacity: 0.7 }}>Shift+Cmd+3 (Mac) · кнопка питания+громкость (телефон)</span>
            </div>
          )}

          {/* Лого партнёра */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 14,
              border: '2px solid #F0E5D0',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              overflow: 'hidden', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {company.logo
                ? <img src={company.logo} alt={company.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                : <span style={{ fontSize: 26, fontWeight: 800, color: company.color || '#E8621A' }}>
                    {company.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
              }
            </div>
          </div>

          {/* Компания */}
          <p style={{ fontSize: 17, fontWeight: 800, color: '#1a1a1a', textAlign: 'center', margin: '0 0 3px' }}>
            {company.name}
          </p>
          <p style={{ fontSize: 11, color: '#999', textAlign: 'center', margin: 0, letterSpacing: '0.3px' }}>
            {company.category}
          </p>

          <div style={{ borderTop: '2px dashed #E8D5B0', margin: '14px 0 12px' }} />

          {/* Получатель */}
          <div style={{
            background: 'rgba(232,98,26,0.05)',
            border: '1px solid rgba(232,98,26,0.15)',
            borderRadius: 12, padding: '12px 14px', marginBottom: 14,
          }}>
            <p style={{ fontSize: 9, color: '#E8621A', fontWeight: 700, letterSpacing: '2px', margin: '0 0 6px', textTransform: 'uppercase' }}>
              Получатель
            </p>
            <p style={{ fontSize: 17, fontWeight: 800, color: '#1a1a1a', margin: '0 0 3px' }}>
              {recipient.lastName} {recipient.firstName}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: 12, color: '#666', margin: 0 }}>{recipient.phone}</p>
              <p style={{ fontSize: 11, color: '#999', margin: 0 }}>{getTodayStr()}</p>
            </div>
          </div>

          {/* Подарки */}
          <p style={{ fontSize: 9, color: '#E8621A', fontWeight: 700, letterSpacing: '2px', margin: '0 0 8px', textTransform: 'uppercase' }}>
            Ваши подарки
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
            {gifts.map((gift, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{
                  flexShrink: 0, width: 18, height: 18, borderRadius: '50%',
                  background: '#E8621A', color: '#fff',
                  fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 1,
                }}>✓</span>
                <span style={{ fontSize: 13, color: '#333', lineHeight: 1.35 }}>{gift}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '2px dashed #E8D5B0', margin: '0 0 12px' }} />

          {/* Код + срок */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 9, color: '#999', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '1px' }}>Код сертификата</p>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#E8621A', margin: 0, letterSpacing: '1.5px' }}>{certCode}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 9, color: '#999', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '1px' }}>Действует до</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#333', margin: 0 }}>31 декабря 2026</p>
            </div>
          </div>
        </div>

        {/* Печать */}
        <div style={{
          position: 'absolute', right: 20, bottom: 100,
          width: 60, height: 60, borderRadius: '50%',
          border: '2.5px solid #E8621A', opacity: 0.25,
          transform: 'rotate(-15deg) translateZ(0)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', zIndex: 2,
        }}>
          <span style={{ fontSize: 14, fontWeight: 900, color: '#E8621A', lineHeight: 1 }}>ГН</span>
          <span style={{ fontSize: 5, color: '#E8621A', fontWeight: 700, textAlign: 'center', letterSpacing: '0.5px', marginTop: 2 }}>
            ГИД НОВОСЁЛА
          </span>
        </div>

        {/* Нижняя полоса с кнопками */}
        <div style={{
          position: 'relative', zIndex: 1,
          background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 50%, #E8621A 100%)',
          padding: '10px 16px',
        }}>
          {zoomed ? (
            <button
              onClick={onClose}
              style={{
                width: '100%', padding: '11px',
                borderRadius: 10, border: 'none',
                background: '#22C55E', color: '#fff',
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}
            >
              ✓ Готово — закрыть
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setZoomed(true)}
                style={{
                  flex: 1, padding: '10px',
                  borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.15)', color: '#fff',
                  fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                }}
              >
                📸 Скриншот
              </button>
              <button
                onClick={onClose}
                style={{
                  flex: 1, padding: '10px',
                  borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.15)', color: '#fff',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                }}
              >
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function Certificate({ company, certCode, onClose }) {
  const [step, setStep] = useState('form')
  const [recipient, setRecipient] = useState(null)

  if (step === 'form') {
    return (
      <FormStep
        company={company}
        certCode={certCode}
        onClose={onClose}
        onSubmit={(data) => {
          setRecipient(data)
          setStep('cert')
        }}
      />
    )
  }

  return (
    <CertStep
      company={company}
      certCode={certCode}
      recipient={recipient}
      onClose={onClose}
    />
  )
}
