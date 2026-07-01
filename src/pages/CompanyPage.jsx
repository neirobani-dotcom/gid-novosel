import { useState } from 'react'
import { logToSheets } from '../utils/logToSheets'
import PhotoSlider from '../components/PhotoSlider'
import RassrochkaCalculator from '../components/RassrochkaCalculator'
import Lightbox from '../components/Lightbox'
import PartnerBackButton from '../components/PartnerBackButton'
import ContactButtons from '../components/ContactButtons'

function PinterestGallery({ images, onPhotoClick }) {
  const [failed, setFailed] = useState(new Set())
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {!failed.has(0) && images[0] && (
        <div className="gallery-hero" style={{ borderRadius: 10, overflow: 'hidden', cursor: 'pointer' }}
          onClick={() => onPhotoClick(0)}>
          <img src={images[0]} alt="фото 1"
            onError={() => setFailed(p => new Set([...p, 0]))}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      )}
      {images.length > 1 && (
        <div className="gallery-rest" style={{ display: 'grid', gap: 4 }}>
          {images.slice(1).map((src, j) => {
            const i = j + 1
            if (failed.has(i)) return null
            return (
              <div key={i} style={{ aspectRatio: '1 / 1', borderRadius: 6, overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => onPhotoClick(i)}>
                <img src={src} alt={`фото ${i + 1}`}
                  onError={() => setFailed(p => new Set([...p, i]))}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function hexToRgba(hex, alpha) {
  if (!hex || hex.length < 7) return `rgba(30,20,10,${alpha})`
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

const formatPhone = (input) => {
  const raw = input.replace(/\D/g, '')
  if (raw.length === 0) return ''
  let d = raw.startsWith('7') ? raw : raw.startsWith('8') ? '7' + raw.slice(1) : '7' + raw
  d = d.substring(0, 11)
  if (d.length <= 1) return '+7'
  if (d.length <= 4) return '+7 (' + d.substring(1)
  if (d.length <= 7) return '+7 (' + d.substring(1, 4) + ') ' + d.substring(4)
  if (d.length <= 9) return '+7 (' + d.substring(1, 4) + ') ' + d.substring(4, 7) + '-' + d.substring(7)
  return '+7 (' + d.substring(1, 4) + ') ' + d.substring(4, 7) + '-' + d.substring(7, 9) + '-' + d.substring(9, 11)
}

export default function CompanyPage({ company, onBack }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [touched, setTouched] = useState({ name: false, phone: false, address: false })
  const [submitted, setSubmitted] = useState(null)
  const [step, setStep] = useState('form')
  const [activeBtn, setActiveBtn] = useState(company.ctaButtons[0].type)
  const [showCalc, setShowCalc] = useState(false)
  const [lbImages, setLbImages] = useState(null)
  const [lbIndex, setLbIndex] = useState(0)

  const openLightbox = (images, index) => { setLbImages(images); setLbIndex(index) }
  const closeLightbox = () => setLbImages(null)

  const nameValid    = form.name.trim().length >= 2
  const phoneValid   = form.phone.replace(/\D/g, '').length === 11
  const addressValid = form.address.trim().length >= 5
  const isFormValid  = nameValid && phoneValid && addressValid

  const fieldBorder = (v, t) => !t ? '1px solid #EDE8E0' : v ? '1.5px solid #22C55E' : '2px solid #EF4444'
  const fieldBg     = (v, t) => !t ? '#FFF' : v ? '#F0FDF4' : '#FFF8F8'
  const hint        = (v, t, err, ok) => !t ? null : (
    <p style={{ fontSize: 11, color: v ? '#22C55E' : '#EF4444', marginTop: 3 }}>
      {v ? ok : err}
    </p>
  )

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched({ name: true, phone: true, address: true })
    if (!isFormValid) return
    localStorage.setItem('gid_user', JSON.stringify({ name: form.name, phone: form.phone }))
    const activation = {
      id: Date.now(), companyId: company.id, companyName: company.name,
      category: company.category, giftLabel: company.giftLabel, giftAmount: company.giftAmount,
      requestType: activeBtn, name: form.name, phone: form.phone, address: form.address,
      createdAt: new Date().toISOString(),
    }
    const existing = JSON.parse(localStorage.getItem('gid_activations') || '[]')
    localStorage.setItem('gid_activations', JSON.stringify([activation, ...existing]))
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: '2c502e1a-5b57-43a0-b56f-9ffa8c423793',
        subject: company.emailSubject || `Новая заявка — ${company.name}`,
        from_name: 'Гид Новосёла',
        Компания: company.name, Имя: form.name, Телефон: form.phone, 'Адрес/ЖК': form.address,
      }),
    }).then(r => r.json()).then(d => console.log('[web3forms]', d)).catch(e => console.error(e))
    logToSheets({ name: form.name, phone: form.phone, zhk: form.address })
    setSubmitted({ name: form.name, phone: form.phone, address: form.address })
    setForm({ name: '', phone: '', address: '' })
    setStep('success')
  }

  const initials = company.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const freebiesAsObjects = company.freebies?.map(f =>
    typeof f === 'string' ? { icon: '✓', label: f } : f
  ) || []
  const hasIconFreebies = company.freebies?.some(f => typeof f === 'object')

  const accent = company.color || '#E8621A'
  const heroGrad = `linear-gradient(160deg, ${hexToRgba(accent, 0.92)} 0%, #140c04 65%, #1a1008 100%)`

  return (
    <div style={{ minHeight: '100vh', background: '#F7F4F0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <PartnerBackButton onClick={onBack} hidden={lbImages !== null} />

      {/* ── HERO ── */}
      <div style={{
        background: heroGrad,
        padding: '56px 20px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          width: 320, height: 320, borderRadius: '50%',
          background: `radial-gradient(circle, ${hexToRgba(accent, 0.2)} 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        {company.logo ? (
          <div style={{
            width: 100, height: 100, borderRadius: 24,
            background: 'rgba(255,255,255,0.12)',
            border: '2px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 18px',
            overflow: 'hidden',
          }}>
            <img src={company.logo} alt={company.name}
              style={{ width: '82%', height: '82%', objectFit: 'contain' }}
              onError={e => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.innerHTML = `<span style="font-size:28px;font-weight:900;color:#fff;letter-spacing:-0.02em">${initials}</span>`
              }}
            />
          </div>
        ) : (
          <div style={{
            width: 100, height: 100, borderRadius: 24, margin: '0 auto 18px',
            background: 'rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em',
          }}>
            {initials}
          </div>
        )}

        <h1 style={{
          fontSize: 28, fontWeight: 900, color: '#fff',
          margin: '0 0 8px', letterSpacing: '-0.01em',
          textShadow: `0 0 20px ${hexToRgba(accent, 0.5)}, 0 2px 4px rgba(0,0,0,0.4)`,
          position: 'relative',
        }}>
          {company.name}
        </h1>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 20, padding: '5px 14px',
          position: 'relative',
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {company.category}
          </span>
        </div>

        {(company.address && company.address !== 'Красноярск') && (
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: '12px 0 0', position: 'relative' }}>
            📍 {company.address}
          </p>
        )}
      </div>

      <div style={{ padding: '20px 16px', maxWidth: 600, margin: '0 auto' }}>

        {step === 'success' ? (
          /* ── УСПЕХ ── */
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: '#F0FDF4', border: '2px solid #BBF7D0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36, margin: '0 auto 20px',
            }}>✅</div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: '#1A1816', margin: '0 0 8px' }}>
              Заявка принята!
            </h3>
            <p style={{ fontSize: 14, color: '#6B6560', margin: '0 0 4px' }}>
              Мы позвоним вам в течение 1 часа.
            </p>
            <p style={{ fontSize: 14, color: '#6B6560', margin: '0 0 24px' }}>
              Менеджер <strong style={{ color: '#1A1816' }}>{company.name}</strong> подтвердит ваш подарок.
            </p>
            <div style={{
              background: '#fff', borderRadius: 16, padding: 20, marginBottom: 20,
              border: '1px solid #EDE8E0', textAlign: 'left',
            }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 6px' }}>
                Ваш подарок
              </p>
              <p style={{ fontSize: 20, fontWeight: 800, color: '#E8621A', margin: '0 0 4px' }}>
                {company.giftLabel}
              </p>
              <p style={{ fontSize: 11, color: '#A09890', margin: '0 0 12px' }}>{company.giftCondition}</p>
              <div style={{ borderTop: '1px solid #F0EBE3', paddingTop: 12 }}>
                <p style={{ fontSize: 10, color: '#A09890', margin: '0 0 4px' }}>Заявка оформлена на:</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1816', margin: 0 }}>
                  {submitted?.name} · {submitted?.phone}
                </p>
                <p style={{ fontSize: 12, color: '#6B6560', margin: '2px 0 0' }}>{submitted?.address}</p>
              </div>
            </div>
            <button onClick={onBack} style={{
              width: '100%', height: 52, borderRadius: 14,
              background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
              color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}>
              На главную
            </button>
          </div>

        ) : (
          <>
            {/* ── БЛОК ПОДАРКА ── */}
            <div style={{
              background: '#1a1a1a',
              borderRadius: 20,
              border: `2px solid ${accent}`,
              boxShadow: `0 0 28px ${hexToRgba(accent, 0.22)}, 0 8px 32px rgba(0,0,0,0.2)`,
              padding: '24px 20px',
              marginBottom: 16,
              textAlign: 'center',
            }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: hexToRgba(accent, 0.7), letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px' }}>
                Подарок новосёлу
              </p>
              <div className="gift-pulse" style={{ fontSize: 24, fontWeight: 900, color: accent, lineHeight: 1.25, margin: '0 0 8px' }}>
                🎁 {company.giftLabel}
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5 }}>
                {company.giftCondition}
              </p>
            </div>

            {/* ── БЕСПЛАТНО ДЛЯ ВАС ── */}
            {freebiesAsObjects.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 10px' }}>
                  Бесплатно для вас
                </p>
                {hasIconFreebies ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {freebiesAsObjects.map((f, i) => (
                      <div key={i} style={{
                        background: '#fff', borderRadius: 14,
                        border: '1px solid #EDE8E0',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                        padding: '14px 12px',
                      }}>
                        <div style={{ fontSize: 26, marginBottom: 8 }}>{f.icon}</div>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#1A1816', margin: 0, lineHeight: 1.35 }}>{f.label}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {freebiesAsObjects.map((f, i) => (
                      <div key={i} style={{
                        background: '#fff', borderRadius: 12, padding: '10px 14px',
                        border: '1px solid #EDE8E0',
                        display: 'flex', alignItems: 'center', gap: 10,
                      }}>
                        <span style={{ color: '#22C55E', fontWeight: 700 }}>✓</span>
                        <span style={{ fontSize: 13, color: '#1A1816' }}>{f.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── ГАЛЕРЕЯ ── */}
            {company.galleries?.length > 0 ? (
              <div style={{ marginBottom: 16 }}>
                {company.galleries.map((gallery, gi) => (
                  <div key={gi}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <div style={{ width: 4, height: 26, background: '#E8621A', borderRadius: 2, flexShrink: 0 }} />
                      <p style={{ fontSize: 16, fontWeight: 800, color: '#1A1816', margin: 0 }}>{gallery.title}</p>
                    </div>
                    <PinterestGallery images={gallery.images} onPhotoClick={(i) => openLightbox(gallery.images, i)} />
                    {gi < company.galleries.length - 1 && (
                      <div style={{ height: 2, background: '#E8621A', margin: '20px 0', borderRadius: 1, opacity: 0.2 }} />
                    )}
                  </div>
                ))}
              </div>
            ) : company.images?.length > 0 ? (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 10px' }}>
                  ✨ Примеры работ
                </p>
                <div style={{ borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
                  <PhotoSlider
                    images={company.images}
                    height={280}
                    borderRadius={0}
                    showDots
                    onPhotoClick={(i) => openLightbox(company.images, i)}
                  />
                </div>
              </div>
            ) : null}

            {/* ── ПОЧЕМУ МЫ (ADVANTAGES) ── */}
            {company.advantages?.length > 0 && (
              <div style={{
                background: '#1a1a1a', borderRadius: 20,
                padding: '22px 18px', marginBottom: 16,
              }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: hexToRgba(accent, 0.7), margin: '0 0 16px' }}>
                  Почему выбирают нас
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {company.advantages.map((a, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: accent, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── ОПИСАНИЕ (ЦИТАТА) ── */}
            {company.description && (
              <div style={{
                background: `linear-gradient(135deg, ${hexToRgba(accent, 0.08)} 0%, #fff 100%)`,
                borderRadius: 16, border: `1px solid ${hexToRgba(accent, 0.2)}`,
                padding: '20px', marginBottom: 16, position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: -10, left: 14,
                  fontSize: 70, color: hexToRgba(accent, 0.1),
                  fontFamily: 'serif', lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                }}>"</div>
                <p style={{ fontSize: 14, fontStyle: 'italic', color: '#555', lineHeight: 1.6, margin: 0, position: 'relative' }}>
                  {company.description}
                </p>
              </div>
            )}

            {/* ── КАК ЭТО РАБОТАЕТ ── */}
            {company.steps?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 10px' }}>
                  Как это работает
                </p>
                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #EDE8E0', overflow: 'hidden' }}>
                  {company.steps.map((s, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 12, alignItems: 'flex-start',
                      padding: '14px 16px',
                      borderBottom: i < company.steps.length - 1 ? '1px solid #F0EBE3' : 'none',
                    }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                        background: '#E8621A', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 700,
                      }}>{i + 1}</div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1816', margin: '0 0 2px' }}>{s.title}</p>
                        <p style={{ fontSize: 11, color: '#A09890', margin: 0, lineHeight: 1.4 }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── CTA КНОПКИ ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
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
                  style={{
                    width: '100%', height: 50, borderRadius: 14,
                    fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    border: 'none', transition: 'all 0.2s',
                    ...(activeBtn === btn.type
                      ? {
                          background: `linear-gradient(90deg, ${accent} 0%, #FF9B2F 100%)`,
                          color: '#fff',
                          boxShadow: `0 4px 16px ${hexToRgba(accent, 0.35)}`,
                        }
                      : {
                          background: '#fff',
                          color: '#555',
                          border: '1px solid #EDE8E0',
                        }),
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* ── ФОРМА ── */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              <div style={{ position: 'relative' }}>
                <input
                  name="name" type="text" value={form.name}
                  placeholder="Ваше имя"
                  onChange={e => {
                    setForm(f => ({ ...f, name: e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z\s]/g, '') }))
                    setTouched(t => ({ ...t, name: true }))
                  }}
                  onBlur={() => setTouched(t => ({ ...t, name: true }))}
                  style={{
                    width: '100%', borderRadius: 12, fontSize: 14, outline: 'none',
                    padding: touched.name && nameValid ? '13px 36px 13px 16px' : '13px 16px',
                    background: fieldBg(nameValid, touched.name),
                    border: fieldBorder(nameValid, touched.name), color: '#1A1816',
                    boxSizing: 'border-box',
                  }}
                />
                {touched.name && nameValid && (
                  <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#22C55E', fontSize: 16, pointerEvents: 'none' }}>✓</span>
                )}
                {hint(nameValid, touched.name, 'Введите настоящее имя', '✓ Имя заполнено')}
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  name="phone" type="tel" value={form.phone}
                  placeholder="+7 (_) _-_-_"
                  onChange={e => {
                    setForm(f => ({ ...f, phone: formatPhone(e.target.value) }))
                    setTouched(t => ({ ...t, phone: true }))
                  }}
                  onBlur={() => setTouched(t => ({ ...t, phone: true }))}
                  style={{
                    width: '100%', borderRadius: 12, fontSize: 14, outline: 'none',
                    padding: touched.phone && phoneValid ? '13px 36px 13px 16px' : '13px 16px',
                    background: fieldBg(phoneValid, touched.phone),
                    border: fieldBorder(phoneValid, touched.phone), color: '#1A1816',
                    boxSizing: 'border-box',
                  }}
                />
                {touched.phone && phoneValid && (
                  <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#22C55E', fontSize: 16, pointerEvents: 'none' }}>✓</span>
                )}
                {hint(phoneValid, touched.phone, 'Введите полный номер', '✓ Номер заполнен')}
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  name="address" type="text" value={form.address}
                  placeholder="Адрес и название ЖК"
                  onChange={e => {
                    setForm(f => ({ ...f, address: e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z0-9\s.,\-\/]/g, '') }))
                    setTouched(t => ({ ...t, address: true }))
                  }}
                  onBlur={() => setTouched(t => ({ ...t, address: true }))}
                  style={{
                    width: '100%', borderRadius: 12, fontSize: 14, outline: 'none',
                    padding: touched.address && addressValid ? '13px 36px 13px 16px' : '13px 16px',
                    background: fieldBg(addressValid, touched.address),
                    border: fieldBorder(addressValid, touched.address), color: '#1A1816',
                    boxSizing: 'border-box',
                  }}
                />
                {touched.address && addressValid && (
                  <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#22C55E', fontSize: 16, pointerEvents: 'none' }}>✓</span>
                )}
                {hint(addressValid, touched.address, 'Укажите адрес и название ЖК', '✓ Адрес заполнен')}
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                style={{
                  width: '100%', height: 56, borderRadius: 14,
                  background: isFormValid
                    ? `linear-gradient(90deg, ${accent} 0%, #FF9B2F 100%)`
                    : '#D0D0D0',
                  color: '#fff', border: 'none',
                  fontSize: 16, fontWeight: 800, cursor: isFormValid ? 'pointer' : 'not-allowed',
                  opacity: isFormValid ? 1 : 0.6,
                  transition: 'all 0.3s ease',
                  boxShadow: isFormValid ? `0 4px 20px ${hexToRgba(accent, 0.4)}` : 'none',
                  marginTop: 4,
                }}
              >
                Активировать подарок →
              </button>
            </form>

            {/* ── КОНТАКТЫ ── */}
            <div style={{
              background: '#fff', borderRadius: 16,
              border: '1px solid #EDE8E0',
              padding: '18px', marginBottom: 12,
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', margin: '0 0 12px' }}>
                Связаться с {company.name}
              </h3>

              {company.addresses?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {company.addresses.map((loc, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 600, color: '#1A1816', margin: '0 0 2px' }}>{loc.label}</p>
                        <p style={{ fontSize: 11, color: '#A09890', margin: '0 0 1px' }}>📍 {loc.address}</p>
                        {loc.phoneFriendly && <p style={{ fontSize: 11, color: '#A09890', margin: 0 }}>📞 {loc.phoneFriendly}</p>}
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <a href={`tel:${(loc.phoneFriendly || company.phone)?.replace(/\D/g, '')}`}
                          style={{ fontSize: 11, fontWeight: 600, padding: '7px 12px', borderRadius: 10, background: '#FFF3E8', border: '1px solid #FFD0A0', color: '#E8621A', textDecoration: 'none' }}>
                          📞 Звонить
                        </a>
                        <a href={`https://yandex.ru/maps/?text=${encodeURIComponent(loc.address)}`}
                          target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: 11, fontWeight: 600, padding: '7px 12px', borderRadius: 10, background: '#F0F9FF', border: '1px solid #BAE6FD', color: '#0369A1', textDecoration: 'none' }}>
                          🗺 Путь
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ marginBottom: 12 }}>
                  {company.address && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#555', marginBottom: 6 }}>
                      <span>📍</span><span>{company.address}</span>
                    </div>
                  )}
                  {company.hours && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#555' }}>
                      <span>🕐</span><span>{company.hours}</span>
                    </div>
                  )}
                </div>
              )}

              <ContactButtons
                phones={company.phones}
                partnerName={company.name}
                messengers={company.messengers}
              />

              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                {company.phones?.[0] && (
                  <a href={`tel:${company.phones[0].number}`} style={{
                    flex: 1, height: 44, borderRadius: 11,
                    background: '#F7F4F0', border: '1px solid #EDE8E0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 5, fontSize: 13, fontWeight: 600, color: '#1a1a1a', textDecoration: 'none',
                  }}>
                    📞 Позвонить
                  </a>
                )}
                {company.address && company.address !== 'Красноярск' && (
                  <a href={`https://yandex.ru/maps/?text=${encodeURIComponent(company.address + ', Красноярск')}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      flex: 1, height: 44, borderRadius: 11,
                      background: '#F7F4F0', border: '1px solid #EDE8E0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: 5, fontSize: 13, fontWeight: 600, color: '#1a1a1a', textDecoration: 'none',
                    }}>
                    📍 Маршрут
                  </a>
                )}
              </div>
            </div>

          </>
        )}
      </div>

      {showCalc && <RassrochkaCalculator onClose={() => setShowCalc(false)} />}

      {lbImages !== null && (
        <Lightbox images={lbImages} index={lbIndex} onClose={closeLightbox} onNavigate={setLbIndex} />
      )}
    </div>
  )
}
