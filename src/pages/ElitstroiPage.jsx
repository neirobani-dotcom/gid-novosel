import { useState, useRef } from 'react'
import PartnerBackButton from '../components/PartnerBackButton'
import PhotoSlider from '../components/PhotoSlider'
import { companies } from '../data/companies'

const ACCENT = '#1A4E8A'
const GOLD   = '#2E7DD1'
const BG     = '#F5F8FF'
const WEB3   = '2c502e1a-5b57-43a0-b56f-9ffa8c423793'

const GIFTS = [
  {
    icon: '🏷️',
    title: 'Скидка 10% на керамогранит',
    desc: 'На весь ассортимент керамогранита. Действует до 31 декабря 2026 года.',
  },
  {
    icon: '📐',
    title: 'Дизайн-проект бесплатно',
    desc: 'При покупке керамогранита. Действует до 31 декабря 2026 года.',
  },
  {
    icon: '🎁',
    title: 'Сертификат 10 000 ₽',
    desc: 'На сантехнику и санфаянс. Действует до 31 декабря 2026 года.',
  },
]

const ADVANTAGES = [
  'Российские и европейские фабрики',
  'Крупнейшая экспозиция керамогранита в городе',
  'Европейская сантехника',
  'Большинство товаров в наличии',
]

const STEPS = [
  'Оставьте заявку с именем, телефоном и адресом ЖК',
  'Получите персональный сертификат',
  'Посетите салон и назовите промокод менеджеру',
]

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

export default function ElitstroiPage({ onBack }) {
  const company = companies.find(c => c.id === 'elitstroy')
  const [form, setForm]       = useState({ name: '', phone: '', address: '' })
  const [touched, setTouched] = useState({ name: false, phone: false, address: false })
  const [step, setStep]       = useState('form')
  const [submitted, setSubmitted] = useState(null)
  const formRef = useRef(null)

  if (!company) return null

  const nameValid    = form.name.trim().length >= 2
  const phoneValid   = form.phone.replace(/\D/g, '').length === 11
  const addressValid = form.address.trim().length >= 5
  const isFormValid  = nameValid && phoneValid && addressValid

  const fieldStyle = (valid, isTouched) => ({
    width: '100%', boxSizing: 'border-box',
    padding: '14px 16px', borderRadius: 14,
    fontSize: 15, color: '#1A1816', outline: 'none',
    border: !isTouched
      ? '1.5px solid #D0DCF0'
      : valid ? '1.5px solid #22C55E' : '1.5px solid #EF4444',
    background: !isTouched ? '#fff' : valid ? '#F0FDF4' : '#FFF8F8',
    transition: 'border-color 0.15s, background 0.15s',
  })

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched({ name: true, phone: true, address: true })
    if (!isFormValid) return

    localStorage.setItem('gid_user', JSON.stringify({ name: form.name, phone: form.phone }))
    const activation = {
      id: Date.now(), companyId: company.id, companyName: company.name,
      category: company.category, giftLabel: company.giftLabel, giftAmount: company.giftAmount,
      requestType: 'certificate', name: form.name, phone: form.phone, address: form.address,
      createdAt: new Date().toISOString(),
    }
    const existing = JSON.parse(localStorage.getItem('gid_activations') || '[]')
    localStorage.setItem('gid_activations', JSON.stringify([activation, ...existing]))

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3,
        subject: 'Новая заявка — ЭлитСтрой',
        from_name: 'Гид Новосёла',
        Компания: company.name, Имя: form.name, Телефон: form.phone, 'Адрес/ЖК': form.address,
        'Тип заявки': 'certificate',
      }),
    }).catch(() => {})

    setSubmitted({ name: form.name, phone: form.phone })
    setForm({ name: '', phone: '', address: '' })
    setStep('success')
  }

  if (step === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: BG }}>
        <PartnerBackButton onClick={onBack} />
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '80px 20px 40px', textAlign: 'center' }}>
          <div style={{
            width: 90, height: 90, borderRadius: '50%',
            background: '#F0FDF4', border: '2px solid #BBF7D0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 42, margin: '0 auto 24px',
          }}>✅</div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#1A1816', margin: '0 0 10px' }}>Заявка принята!</h2>
          <p style={{ fontSize: 15, color: '#6B6560', margin: '0 0 4px' }}>
            Менеджер ЭлитСтроя свяжется с вами в течение 1 часа.
          </p>
          <p style={{ fontSize: 14, color: '#A09890', margin: '0 0 32px' }}>
            {submitted?.name} · {submitted?.phone}
          </p>
          <div style={{
            background: '#fff', borderRadius: 20, padding: '20px',
            border: '1px solid #D0DCF0', marginBottom: 24, textAlign: 'left',
            boxShadow: `0 4px 24px rgba(26,78,138,0.08)`,
          }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 6px' }}>
              Ваши подарки
            </p>
            <p style={{ fontSize: 16, fontWeight: 800, color: ACCENT, margin: '0 0 4px' }}>Скидка 10% на керамогранит</p>
            <p style={{ fontSize: 16, fontWeight: 800, color: ACCENT, margin: '0 0 4px' }}>Дизайн-проект бесплатно</p>
            <p style={{ fontSize: 16, fontWeight: 800, color: ACCENT, margin: 0 }}>Сертификат 10 000 ₽</p>
          </div>
          <button onClick={onBack} style={{
            width: '100%', height: 54, borderRadius: 16,
            background: `linear-gradient(90deg, ${ACCENT} 0%, ${GOLD} 100%)`,
            color: '#fff', border: 'none', fontSize: 16, fontWeight: 800, cursor: 'pointer',
            boxShadow: `0 6px 24px rgba(26,78,138,0.3)`,
          }}>
            На главную →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: 'Inter, system-ui, sans-serif' }}>

      <PartnerBackButton onClick={onBack} />

      {/* ── ШАПКА ── */}
      <div style={{
        background: 'linear-gradient(160deg, #fff 0%, #EEF4FF 60%, #F5F8FF 100%)',
        padding: '64px 20px 48px',
        textAlign: 'center',
        borderBottom: '1px solid #D0DCF0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(26,78,138,0.06) 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        <div style={{
          width: 160, height: 160, borderRadius: 20, margin: '0 auto 20px',
          background: '#fff', border: '1px solid #D0DCF0',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <img
            src="/partners/elitstroy/logo.jpeg"
            alt="ЭлитСтрой"
            style={{ width: '86%', height: '86%', objectFit: 'contain', display: 'block' }}
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.parentElement.innerHTML = '<span style="font-size:28px;font-weight:900;color:#1A4E8A">ЭС</span>'
            }}
          />
        </div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: `rgba(26,78,138,0.08)`, border: `1px solid rgba(26,78,138,0.2)`,
          borderRadius: 20, padding: '6px 16px', marginBottom: 16,
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: ACCENT }}>
            ПАРТНЁР ГИДА НОВОСЁЛА · КРАСНОЯРСК
          </span>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px', lineHeight: 1.2 }}>
          Салон сантехники и кафеля «ЭлитСтрой»
        </h1>
        <p style={{ fontSize: 16, color: '#444', margin: '0 0 8px', fontWeight: 500 }}>
          Лучший выбор керамогранита в Красноярске
        </p>
        <p style={{ fontSize: 13, color: '#888', margin: 0 }}>
          📍 г. Красноярск, ул. Ады Лебедевой, 93Б
        </p>
      </div>

      {/* ── СЛАЙДЕР ── */}
      <PhotoSlider images={company.images} height={320} borderRadius={0} />

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px 48px' }}>

        {/* ── ТРИ ПОДАРКА ── */}
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 14px' }}>
          Подарки для новосёла
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {GIFTS.map((g, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 18,
              border: `1px solid #D0DCF0`,
              boxShadow: `0 4px 20px rgba(26,78,138,0.07)`,
              padding: '20px 18px',
              display: 'flex', gap: 16, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 14, flexShrink: 0,
                background: `rgba(26,78,138,0.08)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
              }}>{g.icon}</div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#1A1A1A', margin: '0 0 4px' }}>{g.title}</p>
                <p style={{ fontSize: 13, color: '#6B6560', margin: 0, lineHeight: 1.5 }}>{g.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── ПОЧЕМУ ВЫБИРАЮТ НАС ── */}
        <div style={{
          background: '#fff', borderRadius: 20,
          border: '1px solid #D0DCF0',
          boxShadow: `0 4px 20px rgba(26,78,138,0.06)`,
          padding: '22px', marginBottom: 24,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 16px' }}>
            Почему выбирают нас
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ADVANTAGES.map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16, flexShrink: 0, color: ACCENT, fontWeight: 900, lineHeight: 1.5 }}>✓</span>
                <span style={{ fontSize: 15, color: '#333', lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── КАК ПОЛУЧИТЬ ── */}
        <div style={{
          background: `linear-gradient(135deg, #EEF4FF 0%, #F5F8FF 100%)`,
          borderRadius: 20, border: `1px solid rgba(26,78,138,0.15)`,
          padding: '22px', marginBottom: 28,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 16px' }}>
            Как получить подарок
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {STEPS.map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: ACCENT, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 900,
                }}>{i + 1}</div>
                <span style={{ fontSize: 14, color: '#333', lineHeight: 1.6 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── ФОРМА ── */}
        <div ref={formRef} style={{
          background: '#fff', borderRadius: 20,
          border: '1px solid #D0DCF0',
          boxShadow: `0 4px 24px rgba(26,78,138,0.07)`,
          padding: '24px 20px', marginBottom: 24,
        }}>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1A1816', margin: '0 0 4px' }}>
            Получить подарки
          </h3>
          <p style={{ fontSize: 13, color: '#A09890', margin: '0 0 20px' }}>
            Заполните форму — менеджер свяжется в течение 1 часа
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <input
                type="text"
                placeholder="Ваше имя"
                value={form.name}
                onChange={e => {
                  setForm(f => ({ ...f, name: e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z\s]/g, '') }))
                  setTouched(t => ({ ...t, name: true }))
                }}
                onBlur={() => setTouched(t => ({ ...t, name: true }))}
                style={fieldStyle(nameValid, touched.name)}
              />
              {touched.name && !nameValid && (
                <p style={{ fontSize: 11, color: '#EF4444', margin: '3px 0 0 4px' }}>Введите ваше имя</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={e => {
                  setForm(f => ({ ...f, phone: formatPhone(e.target.value) }))
                  setTouched(t => ({ ...t, phone: true }))
                }}
                onBlur={() => setTouched(t => ({ ...t, phone: true }))}
                style={fieldStyle(phoneValid, touched.phone)}
              />
              {touched.phone && !phoneValid && (
                <p style={{ fontSize: 11, color: '#EF4444', margin: '3px 0 0 4px' }}>Введите полный номер</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Адрес и название ЖК"
                value={form.address}
                onChange={e => {
                  setForm(f => ({ ...f, address: e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z0-9\s.,\-\/]/g, '') }))
                  setTouched(t => ({ ...t, address: true }))
                }}
                onBlur={() => setTouched(t => ({ ...t, address: true }))}
                style={fieldStyle(addressValid, touched.address)}
              />
              {touched.address && !addressValid && (
                <p style={{ fontSize: 11, color: '#EF4444', margin: '3px 0 0 4px' }}>Укажите адрес и название ЖК</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                width: '100%', height: 56, borderRadius: 14, border: 'none',
                background: isFormValid ? `linear-gradient(90deg, ${ACCENT} 0%, ${GOLD} 100%)` : '#D0C8BC',
                color: '#fff', fontSize: 16, fontWeight: 800,
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                opacity: isFormValid ? 1 : 0.6,
                transition: 'all 0.25s',
                boxShadow: isFormValid ? `0 6px 20px rgba(26,78,138,0.35)` : 'none',
                marginTop: 4,
              }}
            >
              {isFormValid ? 'Получить подарки →' : 'Заполните все поля'}
            </button>
          </form>
        </div>

        {/* ── АДРЕС ── */}
        <div style={{
          background: '#fff', borderRadius: 16,
          border: '1px solid #D0DCF0',
          padding: '18px 20px',
        }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1816', margin: '0 0 8px' }}>
            📍 Адрес салона
          </p>
          <p style={{ fontSize: 14, color: '#555', margin: '0 0 12px' }}>
            г. Красноярск, ул. Ады Лебедевой, 93Б
          </p>
          <a
            href={`https://yandex.ru/maps/?text=${encodeURIComponent('Красноярск, ул. Ады Лебедевой, 93Б')}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 600, padding: '8px 16px',
              borderRadius: 10, textDecoration: 'none',
              background: '#F0F9FF', color: '#0369A1',
              border: '1px solid #BAE6FD',
            }}
          >
            🗺 Маршрут в Яндекс Картах
          </a>
        </div>

      </div>
    </div>
  )
}
