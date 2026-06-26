import { useState, useEffect } from 'react'

const slides = [
  {
    emoji: '🏠',
    title: 'ДОБРО ПОЖАЛОВАТЬ, НОВОСЁЛ!',
    text: 'Этот сайт создан специально для тех,\nкто только заселился в новую квартиру.\nЗдесь тебя ждут подарки от лучших\nкомпаний Красноярска — бесплатно!',
  },
  {
    emoji: '🎁',
    title: 'КАК ПОЛУЧИТЬ ПОДАРОК?',
    text: '1️⃣ Выбери раздел и найди компанию\n2️⃣ Нажми «Активировать подарок»\n3️⃣ Оставь имя и телефон\n4️⃣ Менеджер свяжется за 1 час\n5️⃣ Приходи и забирай подарок!',
  },
  {
    emoji: '🚗',
    title: 'ГИД ВОДИТЕЛЯ',
    text: 'Всё для твоего автомобиля:\n• Кузовной ремонт — Ирбис\n• Рассрочка на авто —\n  Красноярск Рассрочка Авто',
  },
  {
    emoji: '🏠',
    title: 'ГИД НОВОСЁЛА',
    text: 'Всё для нового дома:\n• Шторы и текстиль\n• Мебель и кухни\n• Плитка и отделка\n• Сауны и многое другое',
  },
  {
    emoji: '⏰',
    title: 'ВАЖНО ЗНАТЬ!',
    text: '✅ Все подарки — БЕСПЛАТНО\nдля новосёлов Красноярска\n\n⏰ Предложения ограничены\n\n🔒 Сайт проверен и безопасен\n\nНажми «Смотреть подарки»!',
  },
]

function getMbDims() {
  const w = typeof window !== 'undefined' ? window.innerWidth : 600
  const isMobile = w < 540
  return {
    mbW: isMobile ? Math.min(300, w - 40) : 520,
    lidH: isMobile ? 210 : 320,
  }
}

export default function InstructionModal() {
  const [open, setOpen] = useState(false)
  const [lidOpen, setLidOpen] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [dims, setDims] = useState(getMbDims)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideKey, setSlideKey] = useState(0)

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
      setCurrentSlide(0)
      setSlideKey(0)
    }
  }, [open])

  const goTo = (idx) => {
    setCurrentSlide(idx)
    setSlideKey(k => k + 1)
  }

  const { mbW, lidH } = dims
  const slide = slides[currentSlide]

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
          height: 80,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          border: '1.5px solid rgba(0,255,200,0.25)',
          borderRadius: 20,
          cursor: 'pointer',
          padding: '0 20px',
          marginTop: 14,
          textAlign: 'left',
        }}
      >
        {/* Мини MacBook */}
        <div style={{ flexShrink: 0, width: 44, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ perspective: '200px', width: 44 }}>
            <div style={{
              width: 44,
              height: 28,
              background: 'linear-gradient(180deg, #C8C8C8, #A8A8A8)',
              borderRadius: '4px 4px 0 0',
              transformOrigin: 'bottom center',
              animation: 'macbook-lid 3s ease-in-out infinite',
              padding: 3,
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                flex: 1,
                background: '#1a1a2e',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'flex-start',
                padding: '2px 3px',
                gap: 2,
              }}>
                {['#FF5F57', '#FFBD2E', '#28C840'].map(c => (
                  <div key={c} style={{ width: 3, height: 3, borderRadius: '50%', background: c, flexShrink: 0 }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ width: 44, height: 5, background: 'linear-gradient(180deg, #B0B0B0, #909090)', borderRadius: '0 0 3px 3px' }} />
          <div style={{ width: 20, height: 3, background: '#808080' }} />
        </div>

        {/* Текст */}
        <div style={{ flex: 1, marginLeft: 16 }}>
          <p style={{
            margin: 0,
            lineHeight: 1.2,
            fontSize: '18px',
            fontWeight: '600',
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            background: 'linear-gradient(90deg, #FFD700, #FFA500, #00FFD1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Инструкция новосёла
          </p>
          <p style={{
            margin: 0,
            marginTop: 4,
            fontSize: '12px',
            fontFamily: "'Inter', sans-serif",
            color: 'rgba(255,255,255,0.7)',
          }}>
            Как пользоваться сайтом?
          </p>
        </div>

        {/* Стрелка */}
        <span style={{
          fontSize: '22px',
          color: '#00FFD1',
          flexShrink: 0,
          animation: 'arrow-bounce 1.5s ease-in-out infinite',
          display: 'inline-block',
        }}>›</span>
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

                  {/* Контент экрана — слайдер */}
                  {textVisible && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                      {/* Левая стрелка */}
                      {currentSlide > 0 && (
                        <button
                          onClick={() => goTo(currentSlide - 1)}
                          style={{
                            position: 'absolute', left: 6, top: '50%',
                            transform: 'translateY(-50%)',
                            width: 22, height: 22, borderRadius: '50%',
                            background: 'rgba(0,255,200,0.15)',
                            border: '1px solid rgba(0,255,200,0.4)',
                            color: '#00FFD1', fontSize: 14,
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 10,
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,200,0.3)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,255,200,0.15)'}
                        >‹</button>
                      )}

                      {/* Правая стрелка */}
                      {currentSlide < slides.length - 1 && (
                        <button
                          onClick={() => goTo(currentSlide + 1)}
                          style={{
                            position: 'absolute', right: 6, top: '50%',
                            transform: 'translateY(-50%)',
                            width: 22, height: 22, borderRadius: '50%',
                            background: 'rgba(0,255,200,0.15)',
                            border: '1px solid rgba(0,255,200,0.4)',
                            color: '#00FFD1', fontSize: 14,
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 10,
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,200,0.3)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,255,200,0.15)'}
                        >›</button>
                      )}

                      {/* Слайд */}
                      <div
                        key={slideKey}
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '12px 34px',
                          animation: 'slideIn 0.4s ease forwards',
                        }}
                      >
                        <div style={{ fontSize: 36, marginBottom: 8, lineHeight: 1 }}>{slide.emoji}</div>
                        <div style={{
                          color: '#00FFD1',
                          fontSize: 11,
                          fontWeight: 'bold',
                          marginBottom: 10,
                          textAlign: 'center',
                          fontFamily: 'monospace',
                          letterSpacing: '0.03em',
                        }}>
                          {slide.title}
                        </div>
                        <div style={{
                          color: '#cccccc',
                          fontSize: 10,
                          lineHeight: 1.8,
                          textAlign: 'center',
                          whiteSpace: 'pre-line',
                          fontFamily: 'monospace',
                        }}>
                          {slide.text}
                        </div>
                      </div>

                      {/* Точки */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 6,
                        marginTop: 10,
                        paddingBottom: 10,
                        flexShrink: 0,
                      }}>
                        {slides.map((_, i) => (
                          <div
                            key={i}
                            onClick={() => goTo(i)}
                            style={{
                              width: i === currentSlide ? 8 : 6,
                              height: i === currentSlide ? 8 : 6,
                              borderRadius: '50%',
                              background: i === currentSlide ? '#00FFD1' : '#444',
                              transition: 'all 0.3s',
                              cursor: 'pointer',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
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
