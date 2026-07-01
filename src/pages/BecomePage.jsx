import { useState, useRef } from 'react'
import { logToSheets } from '../utils/logToSheets'
import PartnerBackButton from '../components/PartnerBackButton'
import { companies } from '../data/companies'

const ACCENT = '#E8621A'
const BG     = '#F7F4F0'
const WEB3   = '2c502e1a-5b57-43a0-b56f-9ffa8c423793'

const STATS = [
  { val: 'Тысячи', label: 'новосёлов Красноярска' },
  { val: '11',     label: 'партнёров на платформе' },
  { val: '3',      label: 'подарка каждому новосёлу' },
  { val: '0 ₽',   label: 'для жильцов — всё бесплатно' },
]

const WHY = [
  {
    icon: '🏠',
    title: 'Они только въехали',
    text: 'Новосёл ещё не выбрал ни одну компанию. Нет привычек и лояльности к конкурентам. Вы можете стать его первым и любимым поставщиком.',
  },
  {
    icon: '💰',
    title: 'Они активно тратят',
    text: 'Новосёлы тратят значительно больше обычных жителей в первый год — на ремонт, мебель, технику, услуги.',
  },
  {
    icon: '🎯',
    title: 'Вы попадаете в нужный момент',
    text: 'Через Гид Новосёла вы достигаете их именно тогда, когда они ищут то, что вы предлагаете.',
  },
]

const STEPS = [
  {
    num: '1', title: 'Оставьте заявку',
    text: 'Заполните форму. Мы свяжемся в течение 24 часов и расскажем про условия партнёрства.',
  },
  {
    num: '2', title: 'Создадим вашу страницу',
    text: 'Разместим вашу компанию на платформе с красивой страницей и подарками для новосёлов.',
  },
  {
    num: '3', title: 'Получайте клиентов',
    text: 'Новосёлы видят ваш подарок, активируют сертификат и приходят к вам. Вы видите каждую заявку.',
  },
]

const LOGOS = companies
  .filter(c => c.logo)
  .map(c => ({ id: c.id, name: c.name, logo: c.logo }))

export default function BecomePage({ onBack }) {
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', company: '', sphere: '', phone: '', email: '', gift: '' })
  const [touched, setTouched] = useState({})
  const [step, setStep] = useState('form')

  const touch = (field) => setTouched(t => ({ ...t, [field]: true }))

  const valid = {
    name:    form.name.trim().length >= 2,
    company: form.company.trim().length >= 2,
    sphere:  form.sphere.trim().length >= 2,
    phone:   form.phone.replace(/\D/g, '').length >= 10,
    email:   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    gift:    form.gift.trim().length >= 5,
  }
  const isValid = Object.values(valid).every(Boolean)

  const fieldStyle = (key) => ({
    width: '100%', boxSizing: 'border-box',
    padding: '14px 16px', borderRadius: 12,
    fontSize: 15, color: '#1A1816', outline: 'none',
    fontFamily: 'Inter, system-ui, sans-serif',
    border: !touched[key]
      ? '1.5px solid #E5E0D8'
      : valid[key] ? '1.5px solid #22C55E' : '1.5px solid #EF4444',
    background: !touched[key] ? '#fff' : valid[key] ? '#F0FDF4' : '#FFF8F8',
    transition: 'border-color 0.15s, background 0.15s',
  })

  const err = (key, msg) => touched[key] && !valid[key]
    ? <p style={{ fontSize: 11, color: '#EF4444', margin: '3px 0 0 4px' }}>{msg}</p>
    : null

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched({ name: true, company: true, sphere: true, phone: true, email: true, gift: true })
    if (!isValid) return

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3,
        subject: 'Новая заявка партнёра — Гид Новосёла',
        from_name: 'Гид Новосёла',
        Имя: form.name,
        Компания: form.company,
        Сфера: form.sphere,
        Телефон: form.phone,
        Email: form.email,
        'Подарок для новосёлов': form.gift,
      }),
    }).catch(() => {})
    logToSheets({ name: form.name, phone: form.phone })

    setStep('success')
  }

  if (step === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: BG, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <PartnerBackButton onClick={onBack} />
        <div style={{ maxWidth: 520, margin: '0 auto', padding: '100px 20px 60px', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#1A1816', margin: '0 0 16px' }}>
            Заявка принята!
          </h2>
          <p style={{ fontSize: 16, color: '#6B6560', lineHeight: 1.7, margin: '0 0 32px' }}>
            Мы свяжемся с вами в течение 24 часов.
          </p>
          <button onClick={onBack} style={{
            height: 52, paddingInline: 32, borderRadius: 14, border: 'none',
            background: `linear-gradient(90deg, ${ACCENT} 0%, #F5A623 100%)`,
            color: '#fff', fontSize: 16, fontWeight: 800, cursor: 'pointer',
            boxShadow: `0 6px 24px rgba(232,98,26,0.3)`,
          }}>
            На главную →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: 'Inter, system-ui, sans-serif' }}>

      <style>{`
        @media (max-width: 600px) {
          .bp-stats  { grid-template-columns: 1fr 1fr !important; }
          .bp-why    { grid-template-columns: 1fr !important; }
          .bp-logos  { grid-template-columns: repeat(3, 1fr) !important; }
          .bp-bignum { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>

      <PartnerBackButton onClick={onBack} />

      {/* ══ РАЗДЕЛ 1 — ГЕРОЙ ══ */}
      <div style={{
        background: 'linear-gradient(160deg, #1A1816 0%, #2D1A0A 60%, #1A1816 100%)',
        padding: '80px 20px 64px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(232,98,26,0.15) 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'rgba(232,98,26,0.15)', border: '1px solid rgba(232,98,26,0.3)',
            borderRadius: 20, padding: '6px 16px', marginBottom: 24,
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: ACCENT }}>
              ДЛЯ БИЗНЕСА · КРАСНОЯРСК
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 900, color: '#fff',
            margin: '0 0 20px', lineHeight: 1.2,
          }}>
            Станьте партнёром<br />Гида Новосёла
          </h1>

          <p style={{
            fontSize: 16, color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.75, margin: '0 auto 36px', maxWidth: 480,
          }}>
            Получайте новых клиентов среди новосёлов Красноярска — людей, которые прямо сейчас обустраивают новую квартиру и готовы тратить.
          </p>

          <button
            onClick={() => setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)}
            style={{
              height: 56, paddingInline: 36, borderRadius: 14, border: 'none',
              background: `linear-gradient(90deg, ${ACCENT} 0%, #F5A623 100%)`,
              color: '#fff', fontSize: 17, fontWeight: 800, cursor: 'pointer',
              boxShadow: `0 8px 32px rgba(232,98,26,0.4)`,
            }}
          >
            Оставить заявку
          </button>
        </div>
      </div>

      {/* ══ РАЗДЕЛ 2 — ЦИФРЫ ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E5E0D8', padding: '32px 20px' }}>
        <div className="bp-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, maxWidth: 640, margin: '0 auto' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 900, color: ACCENT, margin: '0 0 4px', lineHeight: 1 }}>{s.val}</p>
              <p style={{ fontSize: 12, color: '#6B6560', margin: 0, lineHeight: 1.4 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 16px 60px' }}>

        {/* ══ РАЗДЕЛ 3 — ПОЧЕМУ НОВОСЁЛЫ ══ */}
        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1A1816', margin: '0 0 24px', textAlign: 'center' }}>
          Почему новосёлы — самые ценные клиенты?
        </h2>
        <div className="bp-why" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 48 }}>
          {WHY.map((w, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 20,
              border: '1px solid #E5E0D8',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              padding: '24px 18px',
            }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{w.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1A1816', margin: '0 0 10px', lineHeight: 1.3 }}>{w.title}</h3>
              <p style={{ fontSize: 13, color: '#6B6560', margin: 0, lineHeight: 1.65 }}>{w.text}</p>
            </div>
          ))}
        </div>

        {/* ══ РАЗДЕЛ — ЦИФРЫ ══ */}
        <div style={{
          background: '#1a1a1a',
          margin: '0 -16px 48px',
          padding: '80px 40px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 900, color: '#fff',
            margin: '0 0 12px', fontFamily: '"Montserrat", sans-serif',
          }}>
            Цифры которые говорят сами за себя
          </h2>
          <p style={{
            fontSize: 16, color: '#999999', margin: '0 0 50px',
            fontFamily: '"Montserrat", sans-serif',
          }}>
            Новосёлы — самая активная аудитория для местного бизнеса
          </p>

          <div className="bp-bignum" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 50 }}>
            {[
              { val: 'В 5 раз',  desc: 'больше тратят новосёлы в первый год по сравнению с обычными жителями' },
              { val: '1 из 1',   desc: 'только одна компания вашей сферы в программе — конкуренты не попадут к вашим клиентам' },
              { val: '30 сек',   desc: 'за столько новосёл активирует сертификат и становится вашим клиентом' },
            ].map((s, i) => (
              <div key={i} style={{
                background: '#2a2a2a', borderRadius: 16, padding: 40,
                textAlign: 'center',
              }}>
                <p style={{
                  fontSize: 48, fontWeight: 900, color: ACCENT,
                  margin: '0 0 12px', lineHeight: 1,
                  fontFamily: '"Montserrat", sans-serif',
                }}>{s.val}</p>
                <p style={{
                  fontSize: 14, color: '#fff', margin: 0, lineHeight: 1.6,
                  fontFamily: '"Montserrat", sans-serif',
                }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)}
            style={{
              padding: '16px 40px', borderRadius: 8, border: 'none',
              background: ACCENT, color: '#fff',
              fontSize: 16, fontWeight: 700, cursor: 'pointer',
              fontFamily: '"Montserrat", sans-serif',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#c45415'}
            onMouseLeave={e => e.currentTarget.style.background = ACCENT}
          >
            Хочу таких клиентов →
          </button>
        </div>

        {/* ══ РАЗДЕЛ — PDF ГАЙД ══ */}
        <div style={{
          background: '#1a1a1a', borderRadius: 12,
          padding: '28px 24px', marginBottom: 48,
          display: 'flex', gap: 32, alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: ACCENT, margin: '0 0 10px' }}>
              БЕСПЛАТНО
            </p>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: '0 0 6px', lineHeight: 1.3 }}>
              Руководство для бизнеса — как привлечь новосёлов
            </h3>
            <p style={{ fontSize: 12, color: '#6B6560', margin: '0 0 18px' }}>
              3 страницы · PDF · Скачать бесплатно
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
              {[
                'Почему новосёлы — лучшие клиенты',
                'Как работает платформа шаг за шагом',
                'Что получает партнёр',
                'Как начать за 24 часа',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: ACCENT, fontWeight: 900, flexShrink: 0, lineHeight: 1.5 }}>✓</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <a
              href="/gid-novosel-partner-guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                height: 48, paddingInline: 24, borderRadius: 12,
                background: `linear-gradient(90deg, ${ACCENT} 0%, #F5A623 100%)`,
                color: '#fff', fontSize: 15, fontWeight: 800,
                textDecoration: 'none',
                boxShadow: `0 6px 20px rgba(232,98,26,0.4)`,
              }}
            >
              📄 Скачать бесплатный гайд
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 80, lineHeight: 1, opacity: 0.9 }}>📋</span>
          </div>
        </div>

        {/* ══ РАЗДЕЛ 4 — КАК ЭТО РАБОТАЕТ ══ */}
        <div style={{
          background: 'linear-gradient(135deg, #1A1816 0%, #2D1A0A 100%)',
          borderRadius: 24, padding: '32px 24px', marginBottom: 48,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: '0 0 28px', textAlign: 'center' }}>
            Как это работает
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                  background: ACCENT, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 17, fontWeight: 900,
                }}>{s.num}</div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>{s.title}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.6 }}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ РАЗДЕЛ 5 — ФОРМА ══ */}
        <div ref={formRef} style={{
          background: '#fff', borderRadius: 24,
          border: '1px solid #E5E0D8',
          boxShadow: `0 4px 32px rgba(232,98,26,0.07)`,
          padding: '32px 24px', marginBottom: 48,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1A1816', margin: '0 0 6px' }}>
            Оставьте заявку — мы свяжемся за 24 часа
          </h2>
          <p style={{ fontSize: 13, color: '#A09890', margin: '0 0 24px' }}>
            Без обязательств. Расскажем об условиях и ответим на вопросы.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <input type="text" placeholder="Ваше имя"
                value={form.name}
                onChange={e => { setForm(f => ({ ...f, name: e.target.value })); touch('name') }}
                onBlur={() => touch('name')}
                style={fieldStyle('name')} />
              {err('name', 'Введите ваше имя')}
            </div>

            <div>
              <input type="text" placeholder="Название компании"
                value={form.company}
                onChange={e => { setForm(f => ({ ...f, company: e.target.value })); touch('company') }}
                onBlur={() => touch('company')}
                style={fieldStyle('company')} />
              {err('company', 'Введите название компании')}
            </div>

            <div>
              <input type="text" placeholder="Сфера деятельности"
                value={form.sphere}
                onChange={e => { setForm(f => ({ ...f, sphere: e.target.value })); touch('sphere') }}
                onBlur={() => touch('sphere')}
                style={fieldStyle('sphere')} />
              {err('sphere', 'Укажите сферу деятельности')}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <input type="tel" placeholder="Телефон"
                  value={form.phone}
                  onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); touch('phone') }}
                  onBlur={() => touch('phone')}
                  style={fieldStyle('phone')} />
                {err('phone', 'Введите телефон')}
              </div>
              <div>
                <input type="email" placeholder="Email"
                  value={form.email}
                  onChange={e => { setForm(f => ({ ...f, email: e.target.value })); touch('email') }}
                  onBlur={() => touch('email')}
                  style={fieldStyle('email')} />
                {err('email', 'Введите email')}
              </div>
            </div>

            <div>
              <textarea
                placeholder="Ваш подарок для новосёлов — что предложите?"
                value={form.gift}
                onChange={e => { setForm(f => ({ ...f, gift: e.target.value })); touch('gift') }}
                onBlur={() => touch('gift')}
                rows={3}
                style={{ ...fieldStyle('gift'), resize: 'vertical', fontFamily: 'inherit' }}
              />
              {err('gift', 'Опишите ваш подарок для новосёлов')}
            </div>

            <button
              type="submit" disabled={!isValid}
              style={{
                width: '100%', height: 56, borderRadius: 14, border: 'none',
                background: isValid ? `linear-gradient(90deg, ${ACCENT} 0%, #F5A623 100%)` : '#D0C8BC',
                color: '#fff', fontSize: 16, fontWeight: 800,
                cursor: isValid ? 'pointer' : 'not-allowed',
                opacity: isValid ? 1 : 0.6,
                transition: 'all 0.25s',
                boxShadow: isValid ? `0 6px 20px rgba(232,98,26,0.35)` : 'none',
                marginTop: 4,
              }}
            >
              Отправить заявку
            </button>
          </form>
        </div>

        {/* ══ РАЗДЕЛ 6 — УЖЕ С НАМИ ══ */}
        <h2 style={{ fontSize: 18, fontWeight: 900, color: '#1A1816', margin: '0 0 20px', textAlign: 'center' }}>
          Уже доверяют Гиду Новосёла
        </h2>
        <div className="bp-logos" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
          {LOGOS.map((p) => (
            <div key={p.id} style={{
              background: '#fff', borderRadius: 14,
              border: '1px solid #E5E0D8',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '14px 10px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}>
              <div style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden', background: '#F7F4F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={p.logo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={e => { e.currentTarget.style.display = 'none' }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#6B6560', textAlign: 'center', lineHeight: 1.3 }}>{p.name}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#A09890', textAlign: 'center', margin: 0 }}>
          Хотите оказаться здесь? Оставьте заявку выше.
        </p>

      </div>
    </div>
  )
}
