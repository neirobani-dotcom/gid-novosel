import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Certificate.css'

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
  } catch (_) {}
}

// ── Corner decoration helper ─────────────────────────────────────────────────
function Corner({ pos }) {
  const style = {
    position: 'absolute', width: 24, height: 24, zIndex: 2,
    ...pos,
  }
  return <div style={style} />
}

// ── Watermark ────────────────────────────────────────────────────────────────
function Watermark() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0,
      width: '100%', height: '100%',
      zIndex: 0, pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          color: 'rgba(232,98,26,0.045)',
          fontSize: '15px',
          fontWeight: '800',
          whiteSpace: 'nowrap',
          transform: 'rotate(-28deg)',
          top: `${(i % 6) * 18}%`,
          left: `${Math.floor(i / 6) * 38 - 8}%`,
          userSelect: 'none',
          letterSpacing: '2px',
        }}>ГИД НОВОСЁЛА</div>
      ))}
    </div>
  )
}

// ── Form step (identity) ─────────────────────────────────────────────────────
function FormStep({ company, certCode, onClose, onSubmit }) {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [phone, setPhone] = useState('')
  const [lnT, setLNT] = useState(false)
  const [fnT, setFNT] = useState(false)
  const [phT, setPHT] = useState(false)
  const [consent, setConsent] = useState(false)
  const [consentT, setConsentT] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const lnValid = lastName.trim().length >= 2
  const fnValid = firstName.trim().length >= 2
  const phValid = phone.replace(/\D/g, '').length === 11
  const formValid = lnValid && fnValid && phValid && consent

  const border = (valid, touched) => touched
    ? `1.5px solid ${valid ? '#22C55E' : '#EF4444'}`
    : '1.5px solid #E0D5C5'
  const bg = (valid, touched) => touched
    ? (valid ? '#F0FDF4' : '#FFF5F5')
    : '#FDFBF8'

  const handleSubmit = () => {
    setLNT(true); setFNT(true); setPHT(true); setConsentT(true)
    if (!formValid) return
    sendReport({ lastName: lastName.trim(), firstName: firstName.trim(), phone, partnerName: company.name, certCode })
    onSubmit({ lastName: lastName.trim(), firstName: firstName.trim(), phone })
  }

  const fieldStyle = (valid, touched) => ({
    width: '100%', padding: '11px 36px 11px 12px', borderRadius: 10,
    border: border(valid, touched), background: bg(valid, touched),
    fontSize: 16, color: '#1a1a1a', outline: 'none',
    transition: 'border-color 0.15s, background 0.15s',
    boxSizing: 'border-box',
  })

  return (
    <div className="cert-form-overlay" onClick={onClose}>
      <div className="cert-form-modal" onClick={e => e.stopPropagation()}>

        {/* ── Крестик закрыть ── */}
        <button className="cert-form-close-btn" onClick={onClose}>×</button>

        {/* ── Прокручиваемый контент ── */}
        <div className="cert-form-scrollable">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <img src="/site-logo.png" alt="Гид Новосёла" style={{ width: 26, height: 26, objectFit: 'contain' }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: '#E8621A', letterSpacing: '0.5px' }}>ГИД НОВОСЁЛА</span>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1a1a1a', margin: '0 0 4px' }}>
            Получите ваш сертификат
          </h2>
          <p style={{ fontSize: 13, color: '#888', margin: '0 0 18px', lineHeight: 1.4 }}>
            Введите данные — сертификат откроется сразу
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 4 }}>
            <div style={{ position: 'relative' }}>
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
              {lnT && (
                <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 15, fontWeight: 700, color: lnValid ? '#22C55E' : '#EF4444' }}>
                  {lnValid ? '✓' : '!'}
                </span>
              )}
            </div>

            <div style={{ position: 'relative' }}>
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
              {fnT && (
                <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 15, fontWeight: 700, color: fnValid ? '#22C55E' : '#EF4444' }}>
                  {fnValid ? '✓' : '!'}
                </span>
              )}
            </div>

            <div style={{ position: 'relative' }}>
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
              {phT && (
                <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 15, fontWeight: 700, color: phValid ? '#22C55E' : '#EF4444' }}>
                  {phValid ? '✓' : '!'}
                </span>
              )}
            </div>

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

            {/* Согласие на обработку данных */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginTop: 4 }}>
              <input
                type="checkbox"
                checked={consent}
                onChange={e => { setConsent(e.target.checked); setConsentT(true) }}
                style={{ marginTop: 2, flexShrink: 0, accentColor: '#E8621A', width: 16, height: 16 }}
              />
              <span style={{ fontSize: 12, color: consentT && !consent ? '#EF4444' : '#888', lineHeight: 1.5 }}>
                Я согласен(а) с{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#E8621A', textDecoration: 'underline' }}>
                  политикой обработки персональных данных
                </a>
              </span>
            </label>
          </div>
        </div>

        {/* ── Кнопки — зафиксированы внизу ── */}
        <div className="cert-form-footer">
          <button
            onClick={handleSubmit}
            style={{
              width: '100%', padding: '14px',
              borderRadius: 12, border: 'none',
              cursor: formValid ? 'pointer' : 'not-allowed',
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
              width: '100%', marginTop: 8, padding: '8px',
              background: 'transparent', border: 'none',
              color: '#aaa', fontSize: 13, cursor: 'pointer',
            }}
          >
            Отмена
          </button>
        </div>

      </div>
    </div>
  )
}

// ── Certificate step ─────────────────────────────────────────────────────────
function CertStep({ company, certCode, recipient, onClose }) {
  const [showHint, setShowHint] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const gifts = company.gifts || [company.giftLabel]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const sendScreenshotReport = async () => {
    try {
      const fd = new FormData()
      fd.append('access_key', WEB3FORMS_KEY)
      fd.append('to', 'neirobanya@mail.ru')
      fd.append('subject', `📸 Скриншот сертификата — ${company.name}`)
      fd.append('from_name', 'Гид Новосёла')
      fd.append('message', [
        `Получатель: ${recipient.lastName} ${recipient.firstName}`,
        `Телефон: ${recipient.phone}`,
        `Дата активации: ${getTodayStr()}`,
        `Партнёр: ${company.name}`,
        `Код сертификата: ${certCode}`,
      ].join('\n'))
      await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
    } catch (_) {}
  }

  const handleScreenshot = () => {
    setShowHint(true)
    setShowFlash(true)
    sendScreenshotReport()
    setTimeout(() => setShowFlash(false), 3000)
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.92)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
        padding: '20px',
        boxSizing: 'border-box',
        willChange: 'opacity',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
      onClick={e => e.stopPropagation()}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* ── Outer gradient border wrapper ── */}
        <div
          className="cert-width cert-card-animate"
          style={{
            padding: 3,
            background: 'linear-gradient(145deg, #FF6B35, #E8621A, #FF8C00)',
            borderRadius: 22,
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,140,0,0.2)',
            willChange: 'transform',
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
            isolation: 'isolate',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* ── Inner card ── */}
          <div
            style={{
              background: 'linear-gradient(145deg, #FFFEF5, #FFF8E7, #FFFEF5)',
              borderRadius: 20,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Corner decorations */}
            <div style={{ position: 'absolute', top: 10, left: 10, width: 24, height: 24, zIndex: 2, borderTop: '2.5px solid #E8621A', borderLeft: '2.5px solid #E8621A', borderRadius: '4px 0 0 0' }} />
            <div style={{ position: 'absolute', top: 10, right: 10, width: 24, height: 24, zIndex: 2, borderTop: '2.5px solid #E8621A', borderRight: '2.5px solid #E8621A', borderRadius: '0 4px 0 0' }} />
            <div style={{ position: 'absolute', bottom: 10, left: 10, width: 24, height: 24, zIndex: 2, borderBottom: '2.5px solid #E8621A', borderLeft: '2.5px solid #E8621A', borderRadius: '0 0 0 4px' }} />
            <div style={{ position: 'absolute', bottom: 10, right: 10, width: 24, height: 24, zIndex: 2, borderBottom: '2.5px solid #E8621A', borderRight: '2.5px solid #E8621A', borderRadius: '0 0 4px 0' }} />

            {/* Watermark */}
            <Watermark />

            {/* Top stripe */}
            <div style={{
              height: 5,
              background: 'linear-gradient(90deg, #FF4500, #E8621A, #FF8C00, #E8621A, #FF4500)',
              width: '100%',
              position: 'relative', zIndex: 1,
            }} />

            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #FF4500 0%, #E8621A 50%, #FF8C00 100%)',
              padding: '20px 24px 18px',
              textAlign: 'center',
              position: 'relative', zIndex: 1,
            }}>
              <img
                src="/site-logo.png"
                alt="Гид Новосёла"
                style={{
                  width: 52, height: 52,
                  borderRadius: '50%',
                  border: '3px solid rgba(255,255,255,0.6)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  display: 'block',
                  margin: '0 auto 10px',
                  background: 'white',
                  padding: 2,
                  objectFit: 'contain',
                }}
              />
              <div style={{
                fontSize: 22, fontWeight: 900,
                color: 'white',
                letterSpacing: 4,
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                marginBottom: 4,
              }}>
                ГИД НОВОСЁЛА
              </div>
              <div style={{
                fontSize: 10, fontWeight: 600,
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: 5,
              }}>
                ЭЛЕКТРОННЫЙ СЕРТИФИКАТ
              </div>
              <div style={{
                width: 60, height: 2,
                background: 'rgba(255,255,255,0.5)',
                margin: '10px auto 0',
                borderRadius: 2,
              }} />
            </div>

            {/* Body */}
            <div style={{ padding: '20px 24px', position: 'relative', zIndex: 1 }}>

              {/* Partner logo */}
              <div style={{
                width: 76, height: 76,
                margin: '0 auto 12px',
                borderRadius: 16,
                border: '2px solid #F0E8D8',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                background: 'white',
                padding: 4,
                overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {company.logo
                  ? <img src={company.logo} alt={company.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  : <span style={{ fontSize: 26, fontWeight: 800, color: company.color || '#E8621A' }}>
                      {company.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </span>
                }
              </div>

              {/* Partner name */}
              <p style={{ fontSize: 22, fontWeight: 900, color: '#1a1a1a', textAlign: 'center', margin: 0 }}>
                {company.name}
              </p>
              <p style={{ fontSize: 12, color: '#999', textAlign: 'center', margin: '3px 0 16px' }}>
                {company.category}
              </p>

              <div style={{ borderTop: '2px dashed #E8D5B0', marginBottom: 16 }} />

              {/* Recipient block */}
              <div style={{
                background: 'rgba(232,98,26,0.06)',
                borderRadius: 14, padding: '14px 18px',
                border: '1px solid rgba(232,98,26,0.12)',
                marginBottom: 16,
              }}>
                <p style={{ fontSize: 9, color: '#bbb', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 8px' }}>
                  Получатель
                </p>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
                  {recipient.lastName} {recipient.firstName}
                </p>
                <p style={{ fontSize: 14, color: '#E8621A', fontWeight: 600, margin: '4px 0 0' }}>
                  {recipient.phone}
                </p>
                <p style={{ fontSize: 12, color: '#999', margin: '4px 0 0' }}>
                  {getTodayStr()}
                </p>
              </div>

              <div style={{ borderTop: '2px dashed #E8D5B0', marginBottom: 16 }} />

              {/* Gifts */}
              <div>
                <span style={{
                  display: 'inline-block',
                  background: 'linear-gradient(90deg, #FF4500, #E8621A)',
                  color: 'white', fontSize: 10, fontWeight: 800,
                  letterSpacing: 2, padding: '5px 14px',
                  borderRadius: 20, marginBottom: 12,
                }}>
                  🎁 ВАШИ ПОДАРКИ
                </span>
                {gifts.map((gift, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{ color: '#22C55E', fontWeight: 800, marginRight: 10, flexShrink: 0, fontSize: 16, lineHeight: 1.3 }}>✓</span>
                    <span style={{ fontSize: 14, color: '#333', lineHeight: 1.4 }}>{gift}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '2px dashed #E8D5B0', margin: '16px 0 12px' }} />

              {/* Code + expiry */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
                <div>
                  <p style={{ fontSize: 9, color: '#bbb', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 4px' }}>
                    Код сертификата
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#E8621A', margin: 0, letterSpacing: 1 }}>
                    {certCode}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 9, color: '#bbb', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 4px' }}>
                    Действует до
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#333', margin: 0 }}>
                    31 декабря 2026
                  </p>
                </div>
              </div>
            </div>

            {/* Stamp */}
            <div style={{
              position: 'absolute', right: 22, bottom: 95,
              zIndex: 2,
              width: 64, height: 64,
              border: '2.5px solid rgba(232,98,26,0.5)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: 'rotate(-14deg)',
              opacity: 0.45,
              pointerEvents: 'none',
            }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#E8621A' }}>ГН</span>
            </div>

            {/* Bottom stripe */}
            <div style={{
              height: 5,
              background: 'linear-gradient(90deg, #FF4500, #E8621A, #FF8C00, #E8621A, #FF4500)',
            }} />

            {/* Flash overlay — появляется при нажатии Скриншот */}
            {showFlash && (
              <div className="cert-flash-overlay" style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.72)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                zIndex: 20,
                borderRadius: 20,
              }}>
                <div style={{ fontSize: 68, marginBottom: 16, lineHeight: 1 }}>📱</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 10, padding: '0 24px' }}>
                  Сфотографируйте экран!
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', textAlign: 'center', padding: '0 28px', lineHeight: 1.55 }}>
                  Покажите сертификат партнёру для получения подарка
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Buttons below card ── */}
        <div className="cert-width" style={{ marginTop: 20 }}>
          {showHint && (
            <div style={{
              background: 'rgba(26,26,46,0.95)',
              borderRadius: 12, padding: '14px 18px',
              marginBottom: 12, color: 'white',
              fontSize: 12, lineHeight: 2,
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              📱 iPhone — кнопка питания + громкость ↑<br />
              🤖 Android — питание + громкость ↓<br />
              💻 Mac — Shift + Cmd + 3
            </div>
          )}
          <div style={{ display: 'flex', gap: 12 }}>
            {showHint ? (
              <button
                className="cert-btn-screenshot"
                onClick={onClose}
                style={{
                  flex: 1, height: 52,
                  background: '#22C55E',
                  color: 'white', border: 'none',
                  borderRadius: 14,
                  fontSize: 15, fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                ✅ Готово — закрыть
              </button>
            ) : (
              <button
                className="cert-btn-screenshot"
                onClick={handleScreenshot}
                style={{
                  flex: 1, height: 52,
                  background: 'linear-gradient(135deg, #FF8C42, #E8621A)',
                  color: 'white', border: 'none',
                  borderRadius: 14,
                  fontSize: 15, fontWeight: 700,
                  boxShadow: '0 4px 16px rgba(232,98,26,0.4)',
                  cursor: 'pointer',
                }}
              >
                📸 Скриншот
              </button>
            )}
            <button
              className="cert-btn-close"
              onClick={onClose}
              style={{
                flex: 1, height: 52,
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: 14,
                fontSize: 15, fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Закрыть
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function Certificate({ company, certCode, onClose }) {
  const [step, setStep] = useState('form')
  const [recipient, setRecipient] = useState(null)

  const content = step === 'form' ? (
    <FormStep
      company={company}
      certCode={certCode}
      onClose={onClose}
      onSubmit={(data) => {
        setRecipient(data)
        setStep('cert')
      }}
    />
  ) : (
    <CertStep
      company={company}
      certCode={certCode}
      recipient={recipient}
      onClose={onClose}
    />
  )

  return createPortal(content, document.body)
}
