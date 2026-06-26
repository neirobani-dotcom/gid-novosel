import { useState, useEffect } from 'react'

const BLOCKS = [
  { text: '🏠 ДОБРО ПОЖАЛОВАТЬ, НОВОСЁЛ!', bold: true },
  { text: '' },
  { text: 'Этот сайт создан специально для тех, кто только заселился в новую квартиру. Здесь тебя ждут подарки от лучших компаний Красноярска — бесплатно!' },
  { text: '' },
  { text: 'КАК ПОЛУЧИТЬ ПОДАРОК:', bold: true },
  { text: '1️⃣  Выбери раздел и найди компанию' },
  { text: '2️⃣  Нажми «Активировать подарок»' },
  { text: '3️⃣  Оставь имя и телефон' },
  { text: '4️⃣  Менеджер свяжется за 1 час' },
  { text: '5️⃣  Приходи и забирай подарок!' },
  { text: '' },
  { text: 'РАЗДЕЛЫ САЙТА:', bold: true },
  { text: '🚗 Гид Водителя — кузовной ремонт, автосервис, рассрочка на авто' },
  { text: '👨‍👩‍👧 Гид для Родителей — товары и услуги для детей (скоро)' },
  { text: '🔧 Гид Сервис — мастера на дом, ремонт техники (скоро)' },
  { text: '💼 Гид для Бизнеса — для предпринимателей (скоро)' },
  { text: '🏠 Гид Новосёла — мебель, кухни, плитка, шторы, сауны и многое другое для нового дома' },
  { text: '' },
  { text: '✅ Все подарки — БЕСПЛАТНО!', bold: true },
  { text: '⏰ Предложения ограничены!', bold: true },
]

function getMbDims() {
  const w = typeof window !== 'undefined' ? window.innerWidth : 600
  const isMobile = w < 540
  return {
    mbW: isMobile ? Math.min(300, w - 40) : 520,
    lidH: isMobile ? 210 : 320,
    fontSize: isMobile ? 9 : 11,
  }
}

export default function InstructionModal() {
  const [open, setOpen] = useState(false)
  const [lidOpen, setLidOpen] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [dims, setDims] = useState(getMbDims)

  useEffect(() => {
    const onResize = () => setDims(getMbDims())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (open) {
      const t1 = setTimeout(() => setLidOpen(true), 200)
      const t2 = setTimeout(() => setTextVisible(true), 1100)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    } else {
      setLidOpen(false)
      setTextVisible(false)
    }
  }, [open])

  const { mbW, lidH, fontSize } = dims

  return (
    <>
      {/* ── КНОПКА ── */}
      <button
        onClick={() => setOpen(true)}
        className="btn-instruction tap-target"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: 70,
          background: '#FFF8E7',
          border: '1.5px solid #E8D5B0',
          borderRadius: 16,
          cursor: 'pointer',
          padding: '0 16px',
          gap: 14,
          marginTop: 14,
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'left',
        }}
      >
        {/* Оранжевая полоска слева */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 4, background: '#E8621A',
          borderRadius: '16px 0 0 16px',
        }} />

        <span style={{ fontSize: 28, marginLeft: 8, flexShrink: 0, lineHeight: 1 }}>📜</span>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#333', margin: 0, lineHeight: 1.2 }}>
            Инструкция новосёла
          </p>
          <p style={{ fontSize: 12, color: '#888', margin: 0, marginTop: 3 }}>
            Как пользоваться сайтом?
          </p>
        </div>

        <span style={{ fontSize: 24, color: '#E8621A', fontWeight: 300, flexShrink: 0 }}>›</span>
      </button>

      {/* ── МОДАЛ ── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.82)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'mbFadeIn 0.3s ease both',
            padding: 20,
          }}
        >
          {/* Крестик */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute', top: 18, right: 18,
              background: 'rgba(255,255,255,0.12)',
              border: 'none', color: '#fff',
              fontSize: 18, fontWeight: 700,
              width: 36, height: 36, borderRadius: '50%',
              cursor: 'pointer', lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ✕
          </button>

          {/* MacBook */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Обёртка с перспективой */}
            <div style={{ perspective: '1200px' }}>
              {/* Крышка */}
              <div style={{
                width: mbW,
                height: lidH,
                background: 'linear-gradient(175deg, #D5D5D5 0%, #B5B5B5 100%)',
                borderRadius: '12px 12px 0 0',
                transformOrigin: 'bottom center',
                transform: lidOpen ? 'rotateX(0deg)' : 'rotateX(-85deg)',
                transition: 'transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 10px 0',
                boxShadow: '0 -6px 24px rgba(0,0,0,0.35)',
                position: 'relative',
              }}>
                {/* Камера */}
                <div style={{
                  width: 8, height: 8,
                  background: '#3a3a3a',
                  borderRadius: '50%',
                  margin: '0 auto 6px',
                  flexShrink: 0,
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)',
                }} />

                {/* Экран */}
                <div style={{
                  flex: 1,
                  background: '#0f0f1a',
                  borderRadius: '5px 5px 0 0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* macOS строка */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '6px 10px',
                    background: '#161628',
                    flexShrink: 0,
                  }}>
                    {['#FF5F57', '#FFBD2E', '#28C840'].map(c => (
                      <div key={c} style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: c,
                        boxShadow: `0 0 4px ${c}88`,
                      }} />
                    ))}
                    <span style={{ fontSize: 8, color: '#555', marginLeft: 6, fontFamily: 'monospace' }}>
                      gidnovosela.ru
                    </span>
                  </div>

                  {/* Контент экрана */}
                  <div
                    className="no-scrollbar"
                    style={{
                      flex: 1,
                      overflowY: 'auto',
                      padding: 14,
                      fontSize,
                      color: '#C8C8C8',
                      lineHeight: 1.75,
                      fontFamily: 'monospace',
                    }}
                  >
                    {textVisible && BLOCKS.map((b, i) => (
                      <p
                        key={i}
                        style={{
                          margin: 0,
                          marginBottom: b.text === '' ? '0.5em' : 0,
                          fontWeight: b.bold ? 700 : 400,
                          color: b.bold ? '#FFFFFF' : b.text === '' ? 'transparent' : '#C8D0E0',
                          letterSpacing: b.bold ? '0.04em' : 0,
                          opacity: 0,
                          animation: 'screenLineIn 0.55s ease forwards',
                          animationDelay: `${i * 0.12}s`,
                          fontFamily: 'monospace',
                          fontSize: b.bold ? fontSize + 1 : fontSize,
                        }}
                      >
                        {b.text || ' '}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Основание */}
            <div style={{
              width: mbW,
              height: 28,
              background: 'linear-gradient(180deg, #C8C8C8 0%, #A0A0A0 100%)',
              borderRadius: '0 0 10px 10px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            }}>
              {/* Ножка */}
              <div style={{
                width: '60%',
                height: 5,
                background: 'linear-gradient(180deg, #888 0%, #666 100%)',
                borderRadius: '0 0 6px 6px',
              }} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
