import { useState, useRef } from 'react'
import PartnerBackButton from '../components/PartnerBackButton'
import Lightbox from '../components/Lightbox'
import { companies } from '../data/companies'

const ACCENT  = '#E8621A'
const BG      = '#F7F4F0'
const CARD_BG = '#FFFFFF'
const WEB3    = '2c502e1a-5b57-43a0-b56f-9ffa8c423793'
const PROMO   = 'КАФЕЛЬ-2026'

const GIFTS_DETAIL = [
  {
    num: '01',
    icon: '🎁',
    title: 'Скидка 5 000 ₽ на первую покупку керамогранита',
    text: 'Покупаете плитку впервые в «Наш Кафель» через Гид Новосёла — и сразу получаете скидку 5 000 ₽. Промокод применяется при любой покупке от 50 000 ₽.',
    badge: `Промокод: ${PROMO} · Действует до 31 декабря 2026 г.`,
    extra: null,
  },
  {
    num: '02',
    icon: '📐',
    title: 'Визуализация раскладки плитки + инструкция для укладчика — в подарок',
    text: 'Вы увидите своё помещение с выбранной плиткой ещё до покупки. А вместе с ней — готовую схему раскладки для мастера-укладчика.',
    badge: 'Стоимость без подарка: от 3 000 ₽ → Для вас: бесплатно',
    extra: ['Цифровая визуализация', 'Схема раскладки', 'Расчёт количества', 'Инструкция для укладчика'],
  },
  {
    num: '03',
    icon: '🛠️',
    title: 'Технический дизайн — подбор затирки, клея и комплектующих',
    text: 'Менеджер «Наш Кафель» подберёт весь комплект под вашу коллекцию и ваш бюджет. Никаких лишних поездок по строительным магазинам.',
    badge: 'Стоимость без подарка: от 1 500 ₽ → Для вас: бесплатно',
    extra: ['Затирка', 'Клей', 'Угловые профили', 'Итоговый список с артикулами'],
  },
]

const SOLUTIONS = [
  { icon: '🚿', title: 'Ванная комната под ключ', sub: 'Ванная, которой не стыдно — за один визит в салон', text: 'Подберём керамогранит под пол и плитку под стены так, чтобы это смотрелось как единый дизайн.', price: 'от 1 200 ₽/м²', term: 'сегодня выбираете — завтра забираете' },
  { icon: '🍳', title: 'Кухонный фартук', sub: 'Фартук на кухне: красиво, практично, за один день', text: 'Небольшая зона — а разница огромная.', price: 'от 800 ₽/м²', term: 'в наличии, можно забрать сегодня' },
  { icon: '🚪', title: 'Коридор и прихожая', sub: 'Пол в прихожей — первое впечатление от квартиры', text: 'Керамогранит в прихожей — это не просто красиво, это практично на годы.', price: 'от 900 ₽/м²', term: 'в наличии' },
  { icon: '🌿', title: 'Лоджия и балкон', sub: 'Лоджия: плитка, которая переживёт любую зиму', text: 'Морозостойкий керамогранит специально для открытых или застеклённых лоджий.', price: 'от 1 100 ₽/м²', term: 'в наличии на складе' },
  { icon: '✨', title: 'Акцентная стена', sub: 'Одна стена — и квартира выглядит как из журнала', text: 'Дизайнерский приём: одна стена выделяется плиткой с фактурой.', price: 'Тренды 2025–2026', term: 'травертин, мрамор, бетон, рельефная плитка' },
  { icon: '🏠', title: 'Весь ремонт под ключ', sub: 'Рассчитаем плитку для всей квартиры за один визит', text: 'Ванная, кухня, прихожая, лоджия — всё в одном месте и в единой стилистике.', price: null, term: null },
]

const WHY = [
  { icon: '🏭', title: 'Российские и зарубежные фабрики', text: 'Независимость от курса доллара. Прямые поставки с заводов.' },
  { icon: '📦', title: '100 000 м² на складе', text: 'Большинство коллекций можно забрать в день покупки.' },
  { icon: '💰', title: 'Лучшие цены', text: 'Работаем с производителями напрямую.' },
  { icon: '📐', title: 'Визуализация и расчёт бесплатно', text: 'Вы увидите, как плитка будет выглядеть до покупки.' },
  { icon: '🤝', title: 'Менеджеры, а не продавцы', text: 'Помогут, а не продадут.' },
  { icon: '🚚', title: 'Доставка по Красноярску', text: 'Привезём на объект.' },
]

const STEPS = [
  { num: '1', title: 'Активируйте сертификат', text: 'Оставьте имя, телефон и адрес ЖК. 30 секунд.' },
  { num: '2', title: 'Получите промокод', text: `Промокод ${PROMO} появится на экране сразу.` },
  { num: '3', title: 'Придите в салон', text: 'Назовите промокод, все три подарка применяются к заказу.' },
]

const SHOPS = [
  { name: 'ТЦ Dommer', addr: 'ул. 9 Мая, 79, Красноярск', hours: 'Пн–Вс: 10:00–21:00', email: 'dommer@nashkafel.ru', maps: 'Красноярск, ул. 9 Мая, 79' },
  { name: 'ТЦ «Атмосфера дома»', addr: 'ул. Ак. Вавилова, 1 стр. 39 (вход 2), Красноярск', hours: 'Пн–Вс: 10:00–20:00', email: 'adoma@nashkafel.ru', maps: 'Красноярск, ул. Академика Вавилова, 1' },
]

const STATS = [
  { val: '100 000 м²', label: 'керамогранита на складе' },
  { val: '2', label: 'шоурума в Красноярске' },
  { val: 'RU + EU', label: 'фабрики' },
  { val: '5 000 ₽', label: 'подарок новосёлу' },
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

export default function KafelPage({ onBack }) {
  const company = companies.find(c => c.id === 'kafel')
  const [form, setForm]         = useState({ name: '', phone: '', address: '' })
  const [touched, setTouched]   = useState({ name: false, phone: false, address: false })
  const [step, setStep]         = useState('form')
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const formRef = useRef(null)

  if (!company) return null

  const images = company.images
  const nameValid    = form.name.trim().length >= 2
  const phoneValid   = form.phone.replace(/\D/g, '').length === 11
  const addressValid = form.address.trim().length >= 5
  const isFormValid  = nameValid && phoneValid && addressValid

  const fieldStyle = (valid, isTouched) => ({
    width: '100%', boxSizing: 'border-box',
    padding: '14px 16px', borderRadius: 12,
    fontSize: 15, color: '#1A1816', outline: 'none',
    fontFamily: 'Inter, system-ui, sans-serif',
    border: !isTouched ? '1.5px solid #E5E0D8' : valid ? '1.5px solid #22C55E' : '1.5px solid #EF4444',
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
        subject: 'Новая заявка — Наш Кафель',
        from_name: 'Гид Новосёла',
        Компания: 'Наш Кафель', Имя: form.name, Телефон: form.phone, 'Адрес/ЖК': form.address,
      }),
    }).catch(() => {})

    setForm({ name: '', phone: '', address: '' })
    setStep('success')
  }

  /* ── SUCCESS ── */
  if (step === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: BG, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <PartnerBackButton onClick={onBack} />
        <div style={{ maxWidth: 540, margin: '0 auto', padding: '80px 20px 60px', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#1A1816', margin: '0 0 12px' }}>
            Поздравляем! Ваш сертификат активирован.
          </h2>
          <div style={{
            background: '#fff', borderRadius: 20, padding: '24px 20px',
            border: `2px solid ${ACCENT}`, marginBottom: 24,
            boxShadow: `0 8px 32px rgba(232,98,26,0.15)`,
          }}>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A09890', margin: '0 0 8px' }}>
              Ваш промокод
            </p>
            <p style={{ fontSize: 32, fontWeight: 900, color: ACCENT, margin: '0 0 12px', letterSpacing: '0.05em' }}>
              {PROMO}
            </p>
            <p style={{ fontSize: 14, color: '#6B6560', margin: 0, lineHeight: 1.6 }}>
              Скоро вам позвонит менеджер «Наш Кафель» для подтверждения.<br />
              Покажите промокод в любом из двух салонов.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {['Скидка 5 000 ₽ на керамогранит', 'Визуализация раскладки — бесплатно', 'Технический дизайн — бесплатно'].map((g, i) => (
              <div key={i} style={{ background: '#F0FDF4', borderRadius: 10, padding: '10px 16px', border: '1px solid #BBF7D0', fontSize: 14, fontWeight: 600, color: '#15803D' }}>
                ✓ {g}
              </div>
            ))}
          </div>
          <button onClick={onBack} style={{
            width: '100%', height: 52, borderRadius: 14, border: 'none',
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

  /* ── MAIN ── */
  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: 'Inter, system-ui, sans-serif' }}>

      <style>{`
        @media (max-width: 600px) {
          .kafel-gallery { grid-template-columns: 1fr 1fr !important; }
          .kafel-solutions { grid-template-columns: 1fr !important; }
          .kafel-why { grid-template-columns: 1fr !important; }
          .kafel-stats { grid-template-columns: 1fr 1fr !important; }
        }
        .kafel-gallery-img { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: pointer; }
        .kafel-gallery-img:hover { transform: scale(1.03); box-shadow: 0 8px 28px rgba(0,0,0,0.18) !important; }
        .kafel-sol-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .kafel-sol-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(0,0,0,0.1) !important; }
      `}</style>

      <PartnerBackButton onClick={onBack} />

      {/* ══ РАЗДЕЛ 1 — ГЕРОЙ ══ */}
      <div style={{
        background: 'linear-gradient(160deg, #fff 0%, #F7F5F2 60%, #F0EDE8 100%)',
        padding: '64px 20px 52px',
        borderBottom: '1px solid #E5E0D8',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,98,26,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          {/* Логотип */}
          <div style={{
            width: 140, height: 140, borderRadius: 20, margin: '0 auto 20px',
            background: '#fff', border: '1px solid #E5E0D8',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
          }}>
            <img
              src="/partners/kafel/logo.png"
              alt="Наш Кафель"
              style={{ width: '80%', height: '80%', objectFit: 'contain' }}
              onError={e => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.innerHTML = '<span style="font-size:24px;font-weight:900;color:#6B7280">НК</span>'
              }}
            />
          </div>

          {/* Бейдж */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(232,98,26,0.08)', border: '1px solid rgba(232,98,26,0.2)',
            borderRadius: 20, padding: '6px 16px', marginBottom: 20,
          }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: ACCENT }}>
              ОФИЦИАЛЬНЫЙ ПАРТНЁР ГИДА НОВОСЁЛА · КРАСНОЯРСК
            </span>
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1A1A1A', margin: '0 0 12px', lineHeight: 1.25 }}>
            Плитка для вашей новой квартиры — уже в наличии на складе
          </h1>
          <p style={{ fontSize: 16, color: '#555', margin: '0 0 16px', fontWeight: 500 }}>
            Российские и зарубежные фабрики. Лучшие цены. Визуализация раскладки бесплатно.
          </p>
          <p style={{ fontSize: 14, color: '#777', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 28px', textAlign: 'left' }}>
            Вы только получили ключи. Впереди — ванная, кухня, коридор, лоджия. «Наш Кафель» — это не просто магазин плитки. Это место, где вам помогут подобрать всё от А до Я: выбрать коллекцию, рассчитать количество, нарисовать раскладку и сэкономить на покупке. Специально для жителей новостроек — три подарка, которых нет в открытом доступе.
          </p>

          {/* Три плашки-подарка */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 480, margin: '0 auto 28px', textAlign: 'left' }}>
            {[
              { icon: '🎁', text: 'Скидка 5 000 ₽ на первую покупку' },
              { icon: '📐', text: 'Визуализация раскладки бесплатно' },
              { icon: '🛠️', text: 'Технический дизайн и инструкция для укладчика' },
            ].map((g, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 12,
                border: '1px solid #E5E0D8',
                padding: '14px 18px',
                display: 'flex', alignItems: 'center', gap: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}>
                <span style={{ fontSize: 22 }}>{g.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1816' }}>{g.text}</span>
              </div>
            ))}
          </div>

          {/* Кнопки */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 400, margin: '0 auto' }}>
            <button
              onClick={() => setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)}
              style={{
                height: 56, borderRadius: 14, border: 'none',
                background: `linear-gradient(90deg, ${ACCENT} 0%, #F5A623 100%)`,
                color: '#fff', fontSize: 16, fontWeight: 800, cursor: 'pointer',
                boxShadow: `0 8px 28px rgba(232,98,26,0.35)`,
              }}
            >
              🎁 Активировать подарки
            </button>
            <a
              href="tel:88003550150"
              style={{
                height: 52, borderRadius: 14,
                background: '#fff', color: '#1A1816',
                border: `2px solid #E5E0D8`,
                fontSize: 15, fontWeight: 700, textDecoration: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              📞 Позвонить: 8-800-355-01-50
            </a>
          </div>
          <p style={{ fontSize: 12, color: '#A09890', marginTop: 12 }}>
            Активация за 30 секунд · Без обязательств
          </p>
        </div>
      </div>

      {/* ══ РАЗДЕЛ 2 — ПОЛОСА ДОВЕРИЯ ══ */}
      <div style={{ background: '#1A1816', padding: '28px 20px' }}>
        <div className="kafel-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, maxWidth: 640, margin: '0 auto' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 20, fontWeight: 900, color: ACCENT, margin: '0 0 4px', lineHeight: 1 }}>{s.val}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.3 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 16px 48px' }}>

        {/* ══ РАЗДЕЛ 3 — ТРИ ПОДАРКА ДЕТАЛЬНО ══ */}
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 16px' }}>
          Три подарка для новосёла
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
          {GIFTS_DETAIL.map((g, i) => (
            <div key={i} style={{
              background: CARD_BG, borderRadius: 20,
              border: '1px solid #E5E0D8',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              padding: '24px 20px',
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: 'rgba(232,98,26,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>{g.icon}</div>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: '0.08em' }}>ПОДАРОК №{g.num}</span>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1A1816', margin: '4px 0 0', lineHeight: 1.35 }}>{g.title}</h3>
                </div>
              </div>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.65, margin: '0 0 12px' }}>{g.text}</p>
              {g.extra && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                  {g.extra.map((item, j) => (
                    <span key={j} style={{
                      fontSize: 12, fontWeight: 600, padding: '5px 12px',
                      borderRadius: 20, background: '#F7F4F0',
                      border: '1px solid #E5E0D8', color: '#555',
                    }}>{item}</span>
                  ))}
                </div>
              )}
              <div style={{
                background: 'rgba(232,98,26,0.06)', borderRadius: 10,
                border: '1px solid rgba(232,98,26,0.15)',
                padding: '8px 14px',
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: ACCENT }}>{g.badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ══ РАЗДЕЛ 4 — ГАЛЕРЕЯ ══ */}
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 6px' }}>
          Готовые решения для вашей квартиры
        </p>
        <div className="kafel-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 10 }}>
          {images.map((src, i) => (
            <div
              key={i}
              className="kafel-gallery-img"
              onClick={() => setLightboxIdx(i)}
              style={{
                borderRadius: 10, overflow: 'hidden',
                aspectRatio: '1 / 1',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <img
                src={src}
                alt={`Наш Кафель ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: '#A09890', margin: '0 0 36px', textAlign: 'center' }}>
          Коллекции в наличии на складе в Красноярске
        </p>

        {/* Лайтбокс */}
        {lightboxIdx !== null && (
          <Lightbox
            images={images}
            index={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onNavigate={setLightboxIdx}
          />
        )}

        {/* ══ РАЗДЕЛ 5 — ГОТОВЫЕ РЕШЕНИЯ ══ */}
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 16px' }}>
          Готовые решения
        </p>
        <div className="kafel-solutions" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 36 }}>
          {SOLUTIONS.map((s, i) => (
            <div key={i} className="kafel-sol-card" style={{
              background: CARD_BG, borderRadius: 16,
              border: '1px solid #E5E0D8',
              boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
              padding: '20px 16px',
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
              <h4 style={{ fontSize: 14, fontWeight: 800, color: '#1A1816', margin: '0 0 4px', lineHeight: 1.3 }}>{s.title}</h4>
              <p style={{ fontSize: 12, fontWeight: 600, color: ACCENT, margin: '0 0 8px' }}>{s.sub}</p>
              <p style={{ fontSize: 12, color: '#777', margin: '0 0 10px', lineHeight: 1.55 }}>{s.text}</p>
              {s.price && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#1A1816' }}>{s.price}</span>
                  <span style={{ fontSize: 11, color: '#A09890' }}>{s.term}</span>
                </div>
              )}
              {!s.price && (
                <span style={{ fontSize: 11, color: '#A09890', fontStyle: 'italic' }}>{s.term ?? 'Рассчитаем индивидуально'}</span>
              )}
            </div>
          ))}
        </div>

        {/* ══ РАЗДЕЛ 6 — ПОЧЕМУ «НАШ КАФЕЛЬ» ══ */}
        <div style={{
          background: CARD_BG, borderRadius: 20,
          border: '1px solid #E5E0D8',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          padding: '24px 20px', marginBottom: 36,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 20px' }}>
            Почему «Наш Кафель»
          </p>
          <div className="kafel-why" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {WHY.map((w, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1 }}>{w.icon}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#1A1816', margin: '0 0 3px' }}>{w.title}</p>
                  <p style={{ fontSize: 12, color: '#777', margin: 0, lineHeight: 1.5 }}>{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ РАЗДЕЛ 7 — КАК ПОЛУЧИТЬ ПОДАРОК ══ */}
        <div style={{
          background: 'linear-gradient(135deg, #FFF5EC 0%, #FFF8F0 100%)',
          borderRadius: 20, border: '1px solid rgba(232,98,26,0.15)',
          padding: '24px 20px', marginBottom: 36,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 20px' }}>
            Как получить подарок
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: ACCENT, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15, fontWeight: 900,
                }}>{s.num}</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: '#1A1816', margin: '0 0 3px' }}>{s.title}</p>
                  <p style={{ fontSize: 13, color: '#555', margin: 0, lineHeight: 1.5 }}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ РАЗДЕЛ 8 — ФОРМА ══ */}
        <div ref={formRef} style={{
          background: CARD_BG, borderRadius: 20,
          border: '1px solid #E5E0D8',
          boxShadow: '0 4px 24px rgba(232,98,26,0.07)',
          padding: '28px 20px', marginBottom: 32,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1A1816', margin: '0 0 6px' }}>
            Получите три подарка прямо сейчас
          </h2>
          <p style={{ fontSize: 13, color: '#A09890', margin: '0 0 24px' }}>
            Оставьте данные — промокод появится на экране через 5 секунд.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <input
                type="text" placeholder="Ваше имя"
                value={form.name}
                onChange={e => { setForm(f => ({ ...f, name: e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z\s]/g, '') })); setTouched(t => ({ ...t, name: true })) }}
                onBlur={() => setTouched(t => ({ ...t, name: true }))}
                style={fieldStyle(nameValid, touched.name)}
              />
              {touched.name && !nameValid && <p style={{ fontSize: 11, color: '#EF4444', margin: '3px 0 0 4px' }}>Введите ваше имя</p>}
            </div>

            <div>
              <input
                type="tel" placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={e => { setForm(f => ({ ...f, phone: formatPhone(e.target.value) })); setTouched(t => ({ ...t, phone: true })) }}
                onBlur={() => setTouched(t => ({ ...t, phone: true }))}
                style={fieldStyle(phoneValid, touched.phone)}
              />
              {touched.phone && !phoneValid && <p style={{ fontSize: 11, color: '#EF4444', margin: '3px 0 0 4px' }}>Введите полный номер</p>}
            </div>

            <div>
              <input
                type="text" placeholder="Адрес вашего ЖК / дома"
                value={form.address}
                onChange={e => { setForm(f => ({ ...f, address: e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z0-9\s.,\-\/]/g, '') })); setTouched(t => ({ ...t, address: true })) }}
                onBlur={() => setTouched(t => ({ ...t, address: true }))}
                style={fieldStyle(addressValid, touched.address)}
              />
              {touched.address && !addressValid && <p style={{ fontSize: 11, color: '#EF4444', margin: '3px 0 0 4px' }}>Укажите адрес и название ЖК</p>}
            </div>

            <button
              type="submit" disabled={!isFormValid}
              style={{
                width: '100%', height: 56, borderRadius: 14, border: 'none',
                background: isFormValid ? `linear-gradient(90deg, ${ACCENT} 0%, #F5A623 100%)` : '#D0C8BC',
                color: '#fff', fontSize: 16, fontWeight: 800,
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                opacity: isFormValid ? 1 : 0.6,
                transition: 'all 0.25s',
                boxShadow: isFormValid ? `0 6px 20px rgba(232,98,26,0.35)` : 'none',
                marginTop: 4,
              }}
            >
              {isFormValid ? '🎁 Получить сертификат' : 'Заполните все поля'}
            </button>
          </form>
        </div>

        {/* ══ РАЗДЕЛ 9 — АДРЕСА ══ */}
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 14px' }}>
          Наши салоны
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {SHOPS.map((shop, i) => (
            <div key={i} style={{
              background: CARD_BG, borderRadius: 16,
              border: '1px solid #E5E0D8',
              padding: '18px 20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#1A1816', margin: '0 0 4px' }}>{shop.name}</p>
              <p style={{ fontSize: 13, color: '#6B6560', margin: '0 0 2px' }}>📍 {shop.addr}</p>
              <p style={{ fontSize: 12, color: '#A09890', margin: '0 0 12px' }}>🕐 {shop.hours}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a
                  href={`https://yandex.ru/maps/?text=${encodeURIComponent(shop.maps)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontSize: 12, fontWeight: 600, padding: '6px 14px',
                    borderRadius: 8, textDecoration: 'none',
                    background: '#F0F9FF', color: '#0369A1',
                    border: '1px solid #BAE6FD',
                  }}
                >
                  🗺 Маршрут
                </a>
                <a
                  href={`mailto:${shop.email}`}
                  style={{
                    fontSize: 12, fontWeight: 600, padding: '6px 14px',
                    borderRadius: 8, textDecoration: 'none',
                    background: '#F7F4F0', color: '#555',
                    border: '1px solid #E5E0D8',
                  }}
                >
                  ✉️ {shop.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Телефоны и сайт */}
        <div style={{
          background: `linear-gradient(135deg, rgba(232,98,26,0.05) 0%, rgba(245,166,35,0.05) 100%)`,
          borderRadius: 16, border: '1px solid rgba(232,98,26,0.12)',
          padding: '18px 20px', marginBottom: 24, textAlign: 'center',
        }}>
          <a href="tel:88003550150" style={{ display: 'block', fontSize: 20, fontWeight: 900, color: ACCENT, textDecoration: 'none', marginBottom: 6 }}>
            📞 8-800-355-01-50
          </a>
          <p style={{ fontSize: 12, color: '#A09890', margin: '0 0 8px' }}>бесплатный звонок</p>
          <a href="tel:+79080115085" style={{ fontSize: 14, fontWeight: 600, color: '#555', textDecoration: 'none', display: 'block', marginBottom: 8 }}>
            +7 (908) 011-50-85
          </a>
          <a href="https://нашкафель.рф" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, fontWeight: 600, color: '#0369A1', textDecoration: 'none' }}>
            🌐 нашкафель.рф
          </a>
        </div>

        {/* ══ РАЗДЕЛ 10 — УСЛОВИЯ ══ */}
        <p style={{ fontSize: 11, color: '#B0A898', lineHeight: 1.7, textAlign: 'center' }}>
          Скидка 5 000 ₽ при покупке от 50 000 ₽, не более 10% от суммы заказа. Визуализация, технический дизайн и инструкция предоставляются бесплатно при любой покупке. Предложение для жителей новостроек Красноярска, зарегистрировавшихся через «Гид Новосёла». Скидка не суммируется с другими акциями. Действует до 31.12.2026. ИП Насыпова Светлана Петровна. ОГРНИП 320246800112482. ИНН 246308108866.
        </p>

      </div>
    </div>
  )
}
