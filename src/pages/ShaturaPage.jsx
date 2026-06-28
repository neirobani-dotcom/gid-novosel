import { useState, useRef } from 'react'
import PartnerBackButton from '../components/PartnerBackButton'
import ContactButtons from '../components/ContactButtons'
import PhotoSlider from '../components/PhotoSlider'
import { companies } from '../data/companies'

const ACCENT = '#E8621A'
const GOLD   = '#F5A623'
const BG     = '#FFF8F0'
const WEB3   = '2c502e1a-5b57-43a0-b56f-9ffa8c423793'
const EXPERT_PHONE = '89920130522'

const SHIMMER_STYLE = {
  background: 'linear-gradient(90deg, #E8621A 0%, #FFD700 50%, #E8621A 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: 'shaturaShimmer 3s linear infinite',
  display: 'inline-block',
}


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

const FREEBIES = [
  { icon: '📐', label: 'Замер на дому', sub: 'Специалист приедет бесплатно' },
  { icon: '🖥️', label: '3D дизайн-проект', sub: 'По размерам вашей квартиры' },
  { icon: '🚗', label: 'Дизайнер выезжает', sub: 'К вам домой бесплатно' },
  { icon: '🔧', label: 'Сборка 100%', sub: 'Полная компенсация стоимости' },
]

const ADDRESSES = [
  { label: 'ТЦ «Континент»',      address: 'ул. Шахтёров, 65',                       phone: '+7 913 180 11 82' },
  { label: 'ТЦ «Доммер»',         address: 'ул. 9 Мая, 79',                           phone: '+7 913 180 12 08' },
  { label: 'ТЦ «Атмосфера Дома»', address: 'ул. Академика Вавилова, 1, стр. 39',      phone: '+7 913 180 11 78' },
]

const ADVANTAGES = [
  'История с 1961 года — поколения доверяют Шатуре',
  'Полный ассортимент мебели от кухни до спальни',
  'Бренд года 2025 — мебель по индивидуальному проекту',
  'Сертифицированное качество и гарантия до 5 лет',
]

const ALL_PHOTOS = [
  ...Array.from({ length: 4 }, (_, i) => `/partners/shatura/nabor-kuhni/${i + 1}.jpeg`),
  ...Array.from({ length: 6 }, (_, i) => `/partners/shatura/kuhni-zakaz/${i + 1}.jpeg`),
  ...Array.from({ length: 5 }, (_, i) => `/partners/shatura/spalni/${i + 1}.jpeg`),
  '/partners/shatura/zamer/1.jpeg',
]
const GALLERY_KUHNI = [
  ...Array.from({ length: 4 }, (_, i) => `/partners/shatura/nabor-kuhni/${i + 1}.jpeg`),
  ...Array.from({ length: 6 }, (_, i) => `/partners/shatura/kuhni-zakaz/${i + 1}.jpeg`),
]
const GALLERY_SPALNI = Array.from({ length: 5 }, (_, i) => `/partners/shatura/spalni/${i + 1}.jpeg`)
const GALLERY_ZAMER  = ['/partners/shatura/zamer/1.jpeg']

export default function ShaturaPage({ onBack }) {
  const company = companies.find(c => c.id === 'shatura')
  const [activeBtn, setActiveBtn]     = useState('certificate')
  const [form, setForm]               = useState({ name: '', phone: '', address: '' })
  const [touched, setTouched]         = useState({ name: false, phone: false, address: false })
  const [step, setStep]               = useState('form')
  const [submitted, setSubmitted]     = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const formRef = useRef(null)

  if (!company) return null

  const nameValid    = form.name.trim().length >= 2
  const phoneValid   = form.phone.replace(/\D/g, '').length === 11
  const addressValid = form.address.trim().length >= 5
  const isFormValid  = nameValid && phoneValid && addressValid

  const scrollToForm = () => {
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  const handleCta = (type) => {
    setActiveBtn(type)
    scrollToForm()
  }

  const fieldStyle = (valid, isTouched) => ({
    width: '100%', boxSizing: 'border-box',
    padding: '14px 16px', borderRadius: 14,
    fontSize: 15, color: '#1A1816', outline: 'none',
    border: !isTouched
      ? '1.5px solid #EDE8E0'
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
      requestType: activeBtn, name: form.name, phone: form.phone, address: form.address,
      createdAt: new Date().toISOString(),
    }
    const existing = JSON.parse(localStorage.getItem('gid_activations') || '[]')
    localStorage.setItem('gid_activations', JSON.stringify([activation, ...existing]))

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3,
        subject: `Новая заявка — Шатура`,
        from_name: 'Гид Новосёла',
        Компания: company.name, Имя: form.name, Телефон: form.phone, 'Адрес/ЖК': form.address,
        'Тип заявки': activeBtn,
      }),
    }).catch(() => {})

    setSubmitted({ name: form.name, phone: form.phone, address: form.address })
    setForm({ name: '', phone: '', address: '' })
    setStep('success')
  }

  /* ── SUCCESS ── */
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
            Менеджер Шатуры позвонит в течение 1 часа.
          </p>
          <p style={{ fontSize: 14, color: '#A09890', margin: '0 0 32px' }}>
            {submitted?.name} · {submitted?.phone}
          </p>
          <div style={{
            background: '#fff', borderRadius: 20, padding: '20px',
            border: '1px solid #F0E8DC', marginBottom: 24, textAlign: 'left',
            boxShadow: '0 4px 24px rgba(232,98,26,0.08)',
          }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 6px' }}>
              Ваш подарок
            </p>
            <p style={{ fontSize: 22, fontWeight: 900, color: ACCENT, margin: '0 0 4px' }}>30 000 ₽ на мебель</p>
            <p style={{ fontSize: 12, color: '#A09890', margin: 0 }}>* до 10% от суммы заказа</p>
          </div>
          <button onClick={onBack} style={{
            width: '100%', height: 54, borderRadius: 16,
            background: `linear-gradient(90deg, ${ACCENT} 0%, ${GOLD} 100%)`,
            color: '#fff', border: 'none', fontSize: 16, fontWeight: 800, cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(232,98,26,0.3)',
          }}>
            На главную →
          </button>
        </div>
      </div>
    )
  }

  /* ── MAIN PAGE ── */
  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: 'Inter, system-ui, sans-serif' }}>

      <style>{`
        @keyframes shaturaShimmer {
          0%   { background-position: 0% center; }
          50%  { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        @keyframes shaturaStarPulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
        .shatura-freebie-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .shatura-freebie-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.12) !important;
        }
        .shatura-gallery::-webkit-scrollbar { display: none; }
        .shatura-gallery { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      <PartnerBackButton onClick={onBack} />

      {/* ── ШАПКА ── */}
      <div style={{
        background: 'linear-gradient(160deg, #fff 0%, #FFF5EB 60%, #FFF8F0 100%)',
        padding: '64px 20px 48px',
        textAlign: 'center',
        borderBottom: '1px solid #F0E8DC',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,98,26,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Логотип 160×160 */}
        <div style={{
          width: 160, height: 160, borderRadius: 20, margin: '0 auto 20px',
          background: '#fff', border: '1px solid #F0E8DC',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', position: 'relative',
        }}>
          <img
            src="/partners/shatura/logo.jpg"
            alt="Шатура"
            style={{ width: '86%', height: '86%', objectFit: 'contain', display: 'block' }}
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.parentElement.innerHTML = '<span style="font-size:36px;font-weight:900;color:#3D3931">ША</span>'
            }}
          />
        </div>

        {/* Бейдж shimmer */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(232,98,26,0.08)', border: '1px solid rgba(232,98,26,0.2)',
          borderRadius: 20, padding: '6px 16px', marginBottom: 16,
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', ...SHIMMER_STYLE }}>
            ПАРТНЁР ГИДА НОВОСЁЛА · КРАСНОЯРСК
          </span>
        </div>

        {/* Заголовок */}
        <h1 style={{
          fontSize: 48, fontWeight: 800, color: '#1A1A1A',
          margin: '0 0 10px', lineHeight: 1.1,
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}>
          Шатура
        </h1>

        <p style={{ fontSize: 18, color: '#333', margin: '0 0 6px', fontWeight: 500 }}>
          Мебель для всего дома
        </p>

        <p style={{ margin: '0 0 14px' }}>
          <span style={{ fontSize: 22, fontWeight: 700, ...SHIMMER_STYLE }}>с 1961 года</span>
        </p>

        {/* Звёзды */}
        <p style={{ margin: '0 0 20px', fontSize: 14 }}>
          {[0, 1, 2, 3, 4].map(i => (
            <span key={i} style={{ display: 'inline-block', animation: `shaturaStarPulse 1.5s ease-in-out ${i * 0.2}s infinite` }}>⭐</span>
          ))}
          {' '}
          <span style={{ color: '#333', fontWeight: 600, fontSize: 14 }}>Бренд года 2025</span>
        </p>

        {/* Основной текст */}
        <p style={{
          fontSize: 15, color: '#555', lineHeight: 1.7,
          maxWidth: 520, margin: '0 auto',
          textAlign: 'left',
        }}>
          Мебель для всего дома в наличии и под заказ. Современные функциональные дизайнерские решения и экологичный состав продукции — коллекции мебели МК «Шатура» предпочитают те, кто выбирает для себя самое лучшее.
        </p>
      </div>

      {/* ── СЛАЙДЕР ФОТО ── */}
      <PhotoSlider images={ALL_PHOTOS} height={280} borderRadius={0} />

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px 48px' }}>

        {/* ── БЛОК ПОДАРКА ── */}
        <div style={{
          background: `linear-gradient(135deg, ${ACCENT} 0%, ${GOLD} 100%)`,
          borderRadius: 24, padding: '40px 28px',
          marginBottom: 24, textAlign: 'center',
          boxShadow: '0 12px 40px rgba(232,98,26,0.35)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -30, right: -30,
            width: 180, height: 180, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)', pointerEvents: 'none',
          }} />
          <div style={{ fontSize: 48, marginBottom: 12, lineHeight: 1 }}>🎁</div>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px' }}>
            Подарок для новосёла
          </p>
          <p style={{ fontSize: 52, fontWeight: 900, color: '#fff', margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.03em' }}>
            30 000 ₽
          </p>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>
            на мебель для нового дома
          </p>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: '6px 18px' }}>
            <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>* до 10% от суммы заказа</span>
          </div>
        </div>

        {/* ── 4 КАРТОЧКИ УСЛУГ ── */}
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 12px' }}>
          Бесплатно для вас
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {FREEBIES.map((f, i) => (
            <div
              key={i}
              className="shatura-freebie-card"
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: '#fff', borderRadius: 18,
                border: '1px solid #F0E8DC',
                boxShadow: hoveredCard === i ? '0 8px 28px rgba(0,0,0,0.12)' : '0 4px 20px rgba(0,0,0,0.08)',
                padding: '20px 16px',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                transform: hoveredCard === i ? 'translateY(-4px)' : 'none',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'rgba(232,98,26,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, marginBottom: 12,
              }}>
                {f.icon}
              </div>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#1A1816', margin: '0 0 4px', lineHeight: 1.3 }}>{f.label}</p>
              <p style={{ fontSize: 11, color: '#A09890', margin: 0, lineHeight: 1.4 }}>{f.sub}</p>
            </div>
          ))}
        </div>

        {/* ── ПОЧЕМУ ВЫБИРАЮТ НАС ── */}
        <div style={{
          background: '#fff', borderRadius: 20,
          border: '1px solid #F0E8DC',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          padding: '22px', marginBottom: 24,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 16px' }}>
            Почему выбирают нас
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ADVANTAGES.map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.4, color: ACCENT, fontWeight: 900 }}>✓</span>
                <span style={{ fontSize: 16, color: '#333', lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── ВЫЕЗДНОЙ ДИЗАЙНЕР ── */}
        <div style={{
          background: `linear-gradient(135deg, #FFF5EC 0%, #FFF8F0 100%)`,
          borderRadius: 20, border: `1px solid rgba(232,98,26,0.2)`,
          boxShadow: '0 4px 20px rgba(232,98,26,0.08)',
          padding: '24px 22px', marginBottom: 24,
        }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              background: 'rgba(232,98,26,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
            }}>🚗</div>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1A1A1A', margin: '0 0 8px' }}>
                Выездной дизайнер
              </h3>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: 0 }}>
                Дизайнер приедет к вам бесплатно. Подберём мебель, цветовые решения и материалы с учётом вашего интерьера. Привезём образцы фасадов, тканей и отделки.
              </p>
            </div>
          </div>
        </div>

        {/* ── ГАЛЕРЕЯ: КУХНИ ── */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 12px' }}>
            Кухни Шатура
          </p>
          <div className="shatura-gallery" style={{ display: 'flex', gap: 12, overflowX: 'auto' }}>
            {GALLERY_KUHNI.map((src, i) => (
              <img key={i} src={src} alt={`Кухни Шатура ${i + 1}`}
                style={{ height: 280, width: 'auto', minWidth: 200, borderRadius: 12, objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
            ))}
          </div>
        </div>

        {/* ── ГАЛЕРЕЯ: СПАЛЬНИ ── */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 12px' }}>
            Спальни Шатура
          </p>
          <div className="shatura-gallery" style={{ display: 'flex', gap: 12, overflowX: 'auto' }}>
            {GALLERY_SPALNI.map((src, i) => (
              <img key={i} src={src} alt={`Спальни Шатура ${i + 1}`}
                style={{ height: 280, width: 'auto', minWidth: 200, borderRadius: 12, objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
            ))}
          </div>
        </div>

        {/* ── ГАЛЕРЕЯ: ЗАМЕР ── */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 12px' }}>
            Выездной замер бесплатно
          </p>
          <div className="shatura-gallery" style={{ display: 'flex', gap: 12, overflowX: 'auto' }}>
            {GALLERY_ZAMER.map((src, i) => (
              <img key={i} src={src} alt={`Замер ${i + 1}`}
                style={{ height: 280, width: 'auto', minWidth: 200, borderRadius: 12, objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
            ))}
          </div>
        </div>

        {/* ── CTA КНОПКИ ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          <button
            onClick={() => handleCta('certificate')}
            style={{
              width: '100%', height: 58, borderRadius: 16, border: 'none',
              background: `linear-gradient(90deg, ${ACCENT} 0%, ${GOLD} 100%)`,
              color: '#fff', fontSize: 16, fontWeight: 800, cursor: 'pointer',
              boxShadow: '0 8px 28px rgba(232,98,26,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            🎁 Активировать сертификат 30 000 ₽
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button
              onClick={() => handleCta('measure')}
              style={{
                height: 50, borderRadius: 14, cursor: 'pointer', fontSize: 13, fontWeight: 700,
                background: activeBtn === 'measure' ? 'rgba(232,98,26,0.08)' : '#fff',
                color: ACCENT, border: `2px solid ${ACCENT}`,
              }}
            >
              📐 Записаться на замер
            </button>
            <button
              onClick={() => handleCta('designer')}
              style={{
                height: 50, borderRadius: 14, cursor: 'pointer', fontSize: 13, fontWeight: 700,
                background: activeBtn === 'designer' ? 'rgba(232,98,26,0.08)' : '#fff',
                color: ACCENT, border: `2px solid ${ACCENT}`,
              }}
            >
              🚗 Вызвать дизайнера
            </button>
          </div>

          {/* Кнопка "Задать вопрос эксперту" */}
          <a
            href={`tel:${EXPERT_PHONE}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', height: 52, borderRadius: 14,
              background: ACCENT, color: '#fff',
              fontSize: 15, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(232,98,26,0.3)',
            }}
          >
            💬 Задать вопрос эксперту
          </a>
        </div>

        {/* ── ФОРМА ── */}
        <div ref={formRef} style={{
          background: '#fff', borderRadius: 20,
          border: '1px solid #F0E8DC',
          boxShadow: '0 4px 24px rgba(232,98,26,0.07)',
          padding: '24px 20px', marginBottom: 24,
        }}>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1A1816', margin: '0 0 4px' }}>
            {activeBtn === 'certificate' && 'Активировать сертификат'}
            {activeBtn === 'measure' && 'Записаться на замер'}
            {activeBtn === 'designer' && 'Вызвать дизайнера домой'}
          </h3>
          <p style={{ fontSize: 13, color: '#A09890', margin: '0 0 20px' }}>
            Заполните форму — менеджер позвонит в течение 1 часа
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
                boxShadow: isFormValid ? '0 6px 20px rgba(232,98,26,0.35)' : 'none',
                marginTop: 4,
              }}
            >
              {isFormValid ? 'Активировать подарок →' : 'Заполните все поля'}
            </button>
          </form>
        </div>

        {/* ── АДРЕСА МАГАЗИНОВ ── */}
        <div style={{
          background: '#fff', borderRadius: 20,
          border: '1px solid #F0E8DC',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          padding: '20px', marginBottom: 24,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1A1816', margin: '0 0 16px' }}>
            Три шоурума в Красноярске
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ADDRESSES.map((loc, i) => (
              <div key={i} style={{
                paddingBottom: i < ADDRESSES.length - 1 ? 14 : 0,
                borderBottom: i < ADDRESSES.length - 1 ? '1px solid #F0EBE3' : 'none',
              }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1816', margin: '0 0 2px' }}>{loc.label}</p>
                <p style={{ fontSize: 12, color: '#6B6560', margin: '0 0 6px' }}>📍 {loc.address}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <a
                    href={`tel:${loc.phone.replace(/\D/g, '')}`}
                    style={{
                      fontSize: 12, fontWeight: 600, padding: '6px 14px',
                      borderRadius: 10, textDecoration: 'none',
                      background: 'rgba(232,98,26,0.1)', color: ACCENT,
                      border: '1px solid rgba(232,98,26,0.2)',
                    }}
                  >
                    📞 {loc.phone}
                  </a>
                  <a
                    href={`https://yandex.ru/maps/?text=${encodeURIComponent(loc.address + ', Красноярск')}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      fontSize: 12, fontWeight: 600, padding: '6px 14px',
                      borderRadius: 10, textDecoration: 'none',
                      background: '#F0F9FF', color: '#0369A1',
                      border: '1px solid #BAE6FD',
                    }}
                  >
                    🗺 Маршрут
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <ContactButtons
              phones={company.phones}
              partnerName={company.name}
              messengers={company.messengers}
            />
          </div>
        </div>

        {/* ── РЕЖИМ РАБОТЫ ── */}
        <div style={{
          background: `linear-gradient(135deg, rgba(232,98,26,0.06) 0%, rgba(245,166,35,0.06) 100%)`,
          borderRadius: 16, border: '1px solid rgba(232,98,26,0.15)',
          padding: '16px 20px', textAlign: 'center', marginBottom: 8,
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#6B6560', margin: 0 }}>
            🕐 Режим работы: <span style={{ color: '#1A1816', fontWeight: 700 }}>10:00 — 20:00, ежедневно</span>
          </p>
        </div>

      </div>
    </div>
  )
}
