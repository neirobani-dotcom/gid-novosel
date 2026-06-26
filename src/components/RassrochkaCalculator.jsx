import { useState, useEffect } from 'react'

const TERMS = [18, 24, 36]
const MIN = 300_000, MAX = 3_000_000, STEP = 50_000
const fmt = n => n.toLocaleString('ru-RU')

export default function RassrochkaCalculator({ onClose }) {
  const [price,   setPrice]   = useState(600_000)
  const [term,    setTerm]    = useState(24)
  const [phase,   setPhase]   = useState('calc') // 'calc' | 'form' | 'success'
  const [name,    setName]    = useState('')
  const [phone,   setPhone]   = useState('')
  const [closing, setClosing] = useState(false)

  const totalAmount = price * 2
  const monthly     = Math.round(totalAmount / term)
  const pct         = ((price - MIN) / (MAX - MIN)) * 100

  const close = () => { setClosing(true); setTimeout(onClose, 290) }

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', fn)
      document.body.style.overflow = ''
    }
  }, [])

  const submit = e => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('access_key',          '2c502e1a-5b57-43a0-b56f-9ffa8c423793')
    fd.append('subject',             '🚗 Заявка на рассрочку авто — gidnovosela.ru')
    fd.append('from_name',           'Гид Новосёла')
    fd.append('Имя',                 name)
    fd.append('Телефон',             phone)
    fd.append('Сумма автомобиля',    `${fmt(price)} ₽`)
    fd.append('Сумма выкупа (×2)',   `${fmt(totalAmount)} ₽`)
    fd.append('Срок выкупа',         `${term} месяцев`)
    fd.append('Ежемесячный платёж',  `${fmt(monthly)} ₽`)
    fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd }).catch(console.error)
    setPhase('success')
  }

  const ao = closing
    ? { backdrop: 'calcFadeOut 0.29s ease forwards', modal: 'calcSlideOut 0.29s ease forwards' }
    : { backdrop: 'calcFadeIn  0.25s ease',          modal: 'calcSlideIn  0.38s ease' }

  const sliderBg = `linear-gradient(to right,#E8621A ${pct}%,#EDE8E0 ${pct}%)`

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.62)', animation: ao.backdrop }}
      />

      {/* Sheet wrapper */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2001, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', pointerEvents: 'none' }}>
        <div
          onClick={e => e.stopPropagation()}
          style={{
            pointerEvents: 'auto',
            width: '100%', maxWidth: 440,
            background: '#FFF',
            borderRadius: '20px 20px 0 0',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.2)',
            maxHeight: '92dvh', overflowY: 'auto',
            animation: ao.modal,
          }}
        >
          {/* Sticky close button */}
          <div style={{ position: 'sticky', top: 0, zIndex: 1, display: 'flex', justifyContent: 'flex-end', padding: '14px 16px 0', background: '#FFF' }}>
            <button
              onClick={close}
              style={{ width: 36, height: 36, borderRadius: '50%', background: '#F0EBE3', border: 'none', cursor: 'pointer', fontSize: 16, color: '#6B6560', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >✕</button>
          </div>

          {/* ── PHASE: CALC ── */}
          {phase === 'calc' && (
            <div style={{ padding: '4px 20px 28px' }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 44, marginBottom: 8 }}>🚗</div>
                <h2 style={{ fontSize: 21, fontWeight: 900, color: '#1A1816', marginBottom: 4 }}>Рассчитайте рассрочку</h2>
                <p style={{ fontSize: 13, color: '#A09890', lineHeight: 1.4 }}>Без первоначального взноса по промокоду ГИД НОВОСЁЛА</p>
              </div>

              {/* Стоимость */}
              <div style={{ marginBottom: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#6B6560' }}>Стоимость автомобиля</span>
                  <span style={{ fontSize: 20, fontWeight: 900, color: '#1A1816' }}>{fmt(price)} ₽</span>
                </div>
                <input
                  type="range"
                  min={MIN} max={MAX} step={STEP}
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="calc-slider"
                  style={{ background: sliderBg }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: '#C0B8B0' }}>300 000 ₽</span>
                  <span style={{ fontSize: 11, color: '#C0B8B0' }}>3 000 000 ₽</span>
                </div>
              </div>

              {/* Срок */}
              <div style={{ marginBottom: 22 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#6B6560', marginBottom: 10 }}>Срок выкупа</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {TERMS.map(t => (
                    <button
                      key={t}
                      onClick={() => setTerm(t)}
                      style={{
                        flex: 1, padding: '13px 0', borderRadius: 12, border: 'none', cursor: 'pointer',
                        fontWeight: 700, fontSize: 14, transition: 'all 0.15s',
                        background: term === t ? '#E8621A' : '#F0EBE3',
                        color:      term === t ? '#FFF'    : '#6B6560',
                      }}
                    >{t} мес.</button>
                  ))}
                </div>
              </div>

              {/* Результат */}
              <div style={{ borderRadius: 16, padding: '18px 20px', marginBottom: 12, textAlign: 'center', background: 'linear-gradient(135deg,#E8621A 0%,#C0392B 100%)' }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', marginBottom: 4 }}>
                  ВАШ ЕЖЕМЕСЯЧНЫЙ ПЛАТЁЖ
                </p>
                <p style={{ fontSize: 44, fontWeight: 900, color: '#FFF', letterSpacing: '-0.03em', lineHeight: 1.1, transition: 'all 0.2s ease' }}>
                  {fmt(monthly)} ₽
                </p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>в месяц</p>
              </div>

              {/* Итоги */}
              <div style={{ background: '#FFF', border: '1px solid #EDE8E0', borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#6B6560' }}>Всего выплатите:</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: '#1A1816' }}>{fmt(totalAmount)} ₽</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: '#6B6560' }}>Первоначальный взнос:</span>
                  <span>
                    <span style={{ fontSize: 12, color: '#A09890', textDecoration: 'line-through', marginRight: 6 }}>100 000 ₽</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#22C55E' }}>0 ₽</span>
                  </span>
                </div>
                <p style={{ fontSize: 12, color: '#22C55E', fontWeight: 600, marginTop: 6 }}>
                  Вы экономите 100 000 ₽ прямо сейчас по промокоду ГИД НОВОСЁЛА!
                </p>
              </div>

              {/* Выгоды */}
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12, padding: '12px 14px', marginBottom: 18 }}>
                {[
                  '✓ Вы экономите 100 000 ₽ по промокоду ГИД НОВОСЁЛА',
                  '✓ Без банка и кредитной истории',
                  '✓ Автомобиль уже готов к выдаче',
                ].map((t, i) => (
                  <p key={i} style={{ fontSize: 13, color: '#166534', fontWeight: 600, marginBottom: i < 2 ? 5 : 0 }}>{t}</p>
                ))}
              </div>

              <button
                onClick={() => setPhase('form')}
                style={{ width: '100%', padding: '16px 0', borderRadius: 14, border: 'none', cursor: 'pointer', background: 'linear-gradient(90deg,#E8621A,#FF9B2F)', color: '#FFF', fontWeight: 800, fontSize: 15 }}
              >
                Оставить заявку на этот автомобиль →
              </button>
            </div>
          )}

          {/* ── PHASE: FORM ── */}
          {phase === 'form' && (
            <form onSubmit={submit} style={{ padding: '4px 20px 28px' }}>
              <div style={{ textAlign: 'center', marginBottom: 14 }}>
                <div style={{ fontSize: 36, marginBottom: 6 }}>🚗</div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1816' }}>Оставить заявку</h2>
              </div>

              <div style={{ background: '#FFF3E8', border: '1px solid #FFD0A0', borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#C25820' }}>
                  Автомобиль на {fmt(price)} ₽, срок {term} мес.
                </p>
                <p style={{ fontSize: 12, color: '#A09890', marginTop: 3 }}>
                  Платёж: {fmt(monthly)} ₽/мес · Всего: {fmt(totalAmount)} ₽ · Взнос: 0 ₽
                </p>
              </div>

              {[
                { val: name,  set: setName,  placeholder: 'Ваше имя',       type: 'text' },
                { val: phone, set: setPhone, placeholder: 'Номер телефона', type: 'tel'  },
              ].map((f, i) => (
                <input
                  key={i}
                  type={f.type}
                  value={f.val}
                  onChange={e => f.set(e.target.value)}
                  placeholder={f.placeholder}
                  required
                  style={{ width: '100%', boxSizing: 'border-box', padding: '14px 16px', borderRadius: 12, border: '1px solid #EDE8E0', marginBottom: 10, background: '#FFF', color: '#1A1816', outline: 'none' }}
                />
              ))}

              <button
                type="submit"
                style={{ width: '100%', padding: '16px 0', borderRadius: 14, border: 'none', cursor: 'pointer', background: 'linear-gradient(90deg,#E8621A,#FF9B2F)', color: '#FFF', fontWeight: 800, fontSize: 15 }}
              >
                Отправить заявку →
              </button>
              <button
                type="button"
                onClick={() => setPhase('calc')}
                style={{ width: '100%', padding: '12px 0', marginTop: 8, borderRadius: 14, border: 'none', cursor: 'pointer', background: 'transparent', color: '#A09890', fontSize: 13 }}
              >
                ← Изменить параметры
              </button>
            </form>
          )}

          {/* ── PHASE: SUCCESS ── */}
          {phase === 'success' && (
            <div style={{ padding: '4px 20px 28px', textAlign: 'center' }}>
              <div style={{ fontSize: 52, marginBottom: 8 }}>✅</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1A1816', marginBottom: 6 }}>Заявка принята!</h2>
              <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 16 }}>Перезвоним в течение часа.</p>
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12, padding: 14, marginBottom: 20, textAlign: 'left' }}>
                <p style={{ fontSize: 13, color: '#166534', fontWeight: 600, marginBottom: 4 }}>🚗 Автомобиль на {fmt(price)} ₽</p>
                <p style={{ fontSize: 13, color: '#166534', fontWeight: 600, marginBottom: 4 }}>📅 Срок: {term} месяцев · Всего: {fmt(totalAmount)} ₽</p>
                <p style={{ fontSize: 13, color: '#166534', fontWeight: 600 }}>💰 Платёж: {fmt(monthly)} ₽/месяц</p>
              </div>
              <button
                onClick={close}
                style={{ width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', cursor: 'pointer', background: 'linear-gradient(90deg,#E8621A,#FF9B2F)', color: '#FFF', fontWeight: 700, fontSize: 15 }}
              >
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
