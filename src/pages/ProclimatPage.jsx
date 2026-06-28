import { useState } from 'react'
import Certificate from '../components/Certificate'
import Lightbox from '../components/Lightbox'
import PartnerBackButton from '../components/PartnerBackButton'
import { companies } from '../data/companies'

const CERT_CODE = 'GNS-PCL-2026'
const WEB3FORMS_KEY = '2c502e1a-5b57-43a0-b56f-9ffa8c423793'
const IMAGES = Array.from({ length: 11 }, (_, i) => `/partners/proclimat/${i + 1}.jpeg`)

const BG = '#0d1117'
const CARD = '#141b26'
const ACCENT = '#00d4ff'
const BORDER = 'rgba(0,212,255,0.2)'
const FONT = "'Montserrat', sans-serif"

const s = {
  card: {
    background: CARD,
    borderRadius: 16,
    border: `1px solid ${BORDER}`,
    padding: '20px',
  },
}

function PinterestGallery({ images, onPhotoClick }) {
  const [failed, setFailed] = useState(new Set())
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {!failed.has(0) && images[0] && (
        <div
          style={{ borderRadius: 10, overflow: 'hidden', cursor: 'pointer', maxHeight: 320 }}
          onClick={() => onPhotoClick(0)}
        >
          <img
            src={images[0]}
            alt="фото 1"
            onError={() => setFailed(p => new Set([...p, 0]))}
            style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}
      {images.length > 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
          {images.slice(1).map((src, j) => {
            const i = j + 1
            if (failed.has(i)) return null
            return (
              <div
                key={i}
                style={{ aspectRatio: '1 / 1', borderRadius: 6, overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => onPhotoClick(i)}
              >
                <img
                  src={src}
                  alt={`фото ${i + 1}`}
                  onError={() => setFailed(p => new Set([...p, i]))}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

async function sendWriteNotification() {
  try {
    const fd = new FormData()
    fd.append('access_key', WEB3FORMS_KEY)
    fd.append('to', 'neirobanya@mail.ru')
    fd.append('subject', '💬 Переход в MAX — ПроКлимат')
    fd.append('from_name', 'Гид Новосёла')
    fd.append('message', `Пользователь нажал кнопку "Написать" на странице ПроКлимат\nДата: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Krasnoyarsk' })}`)
    await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
  } catch (_) {}
}

export default function ProclimatPage({ onBack }) {
  const company = companies.find(c => c.id === 'proclimat')
  const [showCert, setShowCert] = useState(false)
  const [lbIndex, setLbIndex] = useState(null)

  if (!company) return null

  const handleWrite = () => {
    sendWriteNotification()
    window.open('https://max.ru/u/f9LHodD0cOKP69jpIPJUZzqFDE7AWLiXlUGm4FH73pPmGQSMTzN1q2gWGWA', '_blank', 'noopener,noreferrer')
  }

  const baseText = { fontFamily: FONT, color: '#fff' }

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: FONT }}>
      <PartnerBackButton onClick={onBack} hidden={lbIndex !== null} />

      {/* ── БЛОК 1: ШАПКА ── */}
      <div style={{
        background: 'linear-gradient(160deg, #0d1117 0%, #0a1628 60%, #061020 100%)',
        padding: '60px 20px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
          width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        <img
          src="/partners/proclimat/logo.jpeg"
          alt="ПроКлимат"
          style={{
            width: 120, height: 120, objectFit: 'contain',
            borderRadius: 20, display: 'block', margin: '0 auto 20px',
            border: `2px solid ${BORDER}`,
            boxShadow: `0 0 30px rgba(0,212,255,0.25)`,
            position: 'relative',
          }}
          onError={e => { e.currentTarget.style.display = 'none' }}
        />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: `rgba(0,212,255,0.12)`, border: `1px solid rgba(0,212,255,0.35)`,
          borderRadius: 20, padding: '6px 14px', marginBottom: 16, position: 'relative',
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: '0.12em', fontFamily: FONT }}>
            ПАРТНЁР ГИДА НОВОСЁЛА · КРАСНОЯРСК
          </span>
        </div>

        <h1 style={{
          ...baseText, fontSize: 'clamp(24px, 6vw, 34px)', fontWeight: 900,
          margin: '0 0 10px', lineHeight: 1.2, position: 'relative',
        }}>
          Чистый воздух в вашей новой квартире
        </h1>

        <p style={{
          fontFamily: FONT, color: ACCENT, fontSize: 'clamp(14px, 4vw, 18px)',
          fontWeight: 600, margin: '0 0 20px', position: 'relative',
        }}>
          с первого дня — тихо, незаметно, навсегда
        </p>

        <a
          href="tel:+79232962500"
          style={{
            fontFamily: FONT, color: '#fff', fontWeight: 700, fontSize: 18,
            textDecoration: 'none', letterSpacing: '0.04em', position: 'relative',
          }}
        >
          +7 (923) 296-25-00
        </a>
      </div>

      <div style={{ padding: '16px', maxWidth: 640, margin: '0 auto' }}>

        {/* ── БЛОК 2: ПРОБЛЕМЫ ── */}
        <div style={{ ...s.card, marginBottom: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '❄️', text: 'Летом жарко' },
              { icon: '💨', text: 'Зимой душно' },
              { icon: '💧', text: 'Воздух пересушен' },
              { icon: '🪟', text: 'Окна и шум' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontFamily: FONT, color: 'rgba(255,255,255,0.85)', fontSize: 16, fontWeight: 600 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 20, padding: '14px 16px',
            background: `rgba(0,212,255,0.08)`, borderRadius: 12,
            border: `1px solid rgba(0,212,255,0.2)`,
          }}>
            <p style={{ fontFamily: FONT, color: ACCENT, fontSize: 13, fontWeight: 700, margin: 0, textAlign: 'center', lineHeight: 1.5 }}>
              ПРОКЛИМАТ решает это с нуля — ещё до окончания ремонта
            </p>
          </div>
        </div>

        {/* ── БЛОК 3: ТРИ ПОДАРКА ── */}
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ ...baseText, fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 900, margin: '0 0 6px' }}>
            Три подарка — только через Гид Новосёла
          </h2>
          <p style={{ fontFamily: FONT, color: 'rgba(255,255,255,0.5)', fontSize: 13, margin: '0 0 16px', lineHeight: 1.5 }}>
            Эти условия согласованы эксклюзивно. На сайте ПроКлимат их нет.
          </p>

          {/* Карточка 1 */}
          <div style={{
            ...s.card,
            borderLeft: `4px solid ${ACCENT}`,
            marginBottom: 12, position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: FONT, fontSize: 40, fontWeight: 900, color: ACCENT, lineHeight: 1 }}>1</span>
                <div style={{
                  display: 'inline-block', marginLeft: 10,
                  background: `rgba(0,212,255,0.15)`, border: `1px solid ${BORDER}`,
                  borderRadius: 20, padding: '3px 10px',
                }}>
                  <span style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: '0.1em' }}>
                    ПОДАРОК №1 · КОНДИЦИОНЕР
                  </span>
                </div>
                <h3 style={{ ...baseText, fontSize: 16, fontWeight: 800, margin: '10px 0 8px', lineHeight: 1.3 }}>
                  До 10 000 ₽ на установку кондиционера
                </h3>
                <p style={{ fontFamily: FONT, color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: '0 0 14px', lineHeight: 1.5 }}>
                  Скидка применяется при заказе монтажа. Не более 10% от суммы заказа.
                </p>
              </div>
              <span style={{ fontFamily: FONT, fontSize: 32, fontWeight: 900, color: ACCENT, marginLeft: 16, flexShrink: 0 }}>10К ₽</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: FONT, fontSize: 11, fontWeight: 700, color: '#fff',
                background: `rgba(0,212,255,0.2)`, borderRadius: 20, padding: '4px 10px',
              }}>
                ГидНовосела
              </span>
              <span style={{ fontFamily: FONT, fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>до 31.12.2026</span>
            </div>
          </div>

          {/* Карточка 2 — золотая, самая крупная */}
          <div style={{
            background: CARD, borderRadius: 16,
            border: '2px solid #f0b429',
            boxShadow: '0 0 30px rgba(240,180,41,0.15)',
            padding: '24px 20px', marginBottom: 12, position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: FONT, fontSize: 48, fontWeight: 900, color: '#f0b429', lineHeight: 1 }}>2</span>
                <div style={{
                  display: 'inline-block', marginLeft: 10,
                  background: 'rgba(240,180,41,0.15)', border: '1px solid rgba(240,180,41,0.4)',
                  borderRadius: 20, padding: '3px 10px',
                }}>
                  <span style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: '#f0b429', letterSpacing: '0.1em' }}>
                    ПОДАРОК №2 · КОМПЛЕКСНЫЙ ПАКЕТ
                  </span>
                </div>
                <h3 style={{ ...baseText, fontSize: 17, fontWeight: 800, margin: '12px 0 10px', lineHeight: 1.3 }}>
                  Сертификат 15 000 ₽ на создание идеального климата
                </h3>
              </div>
              <span style={{ fontFamily: FONT, fontSize: 32, fontWeight: 900, color: '#f0b429', marginLeft: 16, flexShrink: 0 }}>15К ₽</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {[
                'Бесплатный подбор оборудования инженером',
                'Выезд инженера на объект',
                'Проект размещения климатических систем',
                'Скидка 10% на оборудование при покупке от 150 000 ₽',
                'Скидка на монтаж',
                'Первое сервисное обслуживание бесплатно',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ color: '#22C55E', fontWeight: 800, flexShrink: 0, fontSize: 15, lineHeight: 1.4 }}>✓</span>
                  <span style={{ fontFamily: FONT, color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 1.45 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: FONT, fontSize: 11, fontWeight: 700, color: '#f0b429',
                background: 'rgba(240,180,41,0.15)', borderRadius: 20, padding: '4px 10px',
                border: '1px solid rgba(240,180,41,0.3)',
              }}>
                ГидНовосела
              </span>
              <span style={{ fontFamily: FONT, fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>до 31.12.2026</span>
            </div>
          </div>

          {/* Карточка 3 — зелёная */}
          <div style={{
            ...s.card,
            borderLeft: '4px solid #22C55E',
            marginBottom: 0, position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: FONT, fontSize: 40, fontWeight: 900, color: '#22C55E', lineHeight: 1 }}>3</span>
                <div style={{
                  display: 'inline-block', marginLeft: 10,
                  background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
                  borderRadius: 20, padding: '3px 10px',
                }}>
                  <span style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: '#22C55E', letterSpacing: '0.1em' }}>
                    ПОДАРОК №3 · ДО РЕМОНТА
                  </span>
                </div>
                <h3 style={{ ...baseText, fontSize: 16, fontWeight: 800, margin: '10px 0 8px', lineHeight: 1.3 }}>
                  Скидка 10% — закладные на кондиционер
                </h3>
                <p style={{ fontFamily: FONT, color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: '0 0 14px', lineHeight: 1.5 }}>
                  Закладные — это трассы для кондиционера, которые прокладываются до штукатурки. После ремонта — в 2-3 раза дороже. Активируй прямо сейчас!
                </p>
              </div>
              <span style={{ fontFamily: FONT, fontSize: 32, fontWeight: 900, color: '#22C55E', marginLeft: 16, flexShrink: 0 }}>10%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: FONT, fontSize: 11, fontWeight: 700, color: '#22C55E',
                background: 'rgba(34,197,94,0.15)', borderRadius: 20, padding: '4px 10px',
              }}>
                ГидНовосела
              </span>
              <span style={{ fontFamily: FONT, fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>до 31.12.2026</span>
            </div>
          </div>
        </div>

        {/* ── БЛОК 4: ЧТО ВХОДИТ ── */}
        <div style={{ ...s.card, marginBottom: 16 }}>
          <h2 style={{ ...baseText, fontSize: 16, fontWeight: 800, margin: '0 0 16px' }}>
            Что входит в подарок
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '🔬', text: 'Выезд инженера — бесплатно для новосёлов' },
              { icon: '📐', text: 'Проект размещения — бесплатно при заказе' },
              { icon: '🔧', text: 'Монтаж под ключ — собственная бригада' },
              { icon: '🔩', text: 'Первый сервис — бесплатно по сертификату' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 26, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontFamily: FONT, color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── БЛОК 5: КАК ЭТО РАБОТАЕТ ── */}
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ ...baseText, fontSize: 'clamp(16px, 4.5vw, 22px)', fontWeight: 900, margin: '0 0 16px' }}>
            Четыре шага до комфортного воздуха
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { num: '1', title: 'Активируйте подарок', desc: 'Оставьте имя и телефон, займёт 30 секунд' },
              { num: '2', title: 'Инженер звонит', desc: 'Уточнит задачи, согласует время визита' },
              { num: '3', title: 'Проект и расчёт', desc: 'Выезд, замер, план размещения бесплатно' },
              { num: '4', title: 'Монтаж под ключ', desc: 'Установка, запуск, гарантия. Интерьер не пострадает.' },
            ].map((step, i) => (
              <div key={i} style={{
                ...s.card,
                display: 'flex', alignItems: 'flex-start', gap: 16,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: `rgba(0,212,255,0.15)`, border: `2px solid ${ACCENT}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONT, fontSize: 20, fontWeight: 900, color: ACCENT,
                }}>
                  {step.num}
                </div>
                <div>
                  <p style={{ fontFamily: FONT, color: '#fff', fontSize: 15, fontWeight: 700, margin: '0 0 4px' }}>
                    {step.title}
                  </p>
                  <p style={{ fontFamily: FONT, color: 'rgba(255,255,255,0.55)', fontSize: 13, margin: 0, lineHeight: 1.4 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── БЛОК 6: ПОЧЕМУ ПРОКЛИМАТ ── */}
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ ...baseText, fontSize: 'clamp(16px, 4.5vw, 22px)', fontWeight: 900, margin: '0 0 6px' }}>
            Выбирают не за цену — за надёжность
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 10, marginTop: 14,
          }}>
            {[
              { icon: '🏆', title: '12 лет опыта', desc: 'Сотни проектов в Красноярске' },
              { icon: '🔄', title: 'Полный цикл', desc: 'Проект→поставка→монтаж→запуск→сервис' },
              { icon: '👤', title: 'Свои специалисты', desc: 'Никаких субподрядчиков' },
              { icon: '🎨', title: 'Дизайн не пострадает', desc: 'Монтаж скрытый, оборудование незаметно' },
            ].map((card, i) => (
              <div key={i} style={{ ...s.card }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
                <p style={{ fontFamily: FONT, color: '#fff', fontSize: 13, fontWeight: 700, margin: '0 0 5px', lineHeight: 1.3 }}>
                  {card.title}
                </p>
                <p style={{ fontFamily: FONT, color: 'rgba(255,255,255,0.5)', fontSize: 12, margin: 0, lineHeight: 1.4 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── БЛОК 7: СТАТИСТИКА ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10, marginBottom: 16,
        }}>
          {[
            { num: '12+', label: 'лет создаём комфортный климат' },
            { num: '3', label: 'подарка для каждого новосёла' },
            { num: '«под ключ»', label: 'от проекта до запуска' },
            { num: '0 ₽', label: 'консультация инженера' },
          ].map((stat, i) => (
            <div key={i} style={{
              ...s.card, textAlign: 'center',
              boxShadow: `0 0 20px rgba(0,212,255,0.06)`,
            }}>
              <p style={{ fontFamily: FONT, color: ACCENT, fontSize: 'clamp(18px, 5vw, 26px)', fontWeight: 900, margin: '0 0 6px', lineHeight: 1 }}>
                {stat.num}
              </p>
              <p style={{ fontFamily: FONT, color: 'rgba(255,255,255,0.55)', fontSize: 12, margin: 0, lineHeight: 1.4 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── CTA кнопка верхняя ── */}
        <button
          onClick={() => setShowCert(true)}
          style={{
            width: '100%', height: 60, borderRadius: 16, border: 'none',
            background: `linear-gradient(90deg, ${ACCENT} 0%, #0099cc 100%)`,
            color: '#000', fontFamily: FONT, fontSize: 17, fontWeight: 900,
            cursor: 'pointer', marginBottom: 16,
            boxShadow: `0 6px 28px rgba(0,212,255,0.35)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          🎁 Получить 3 подарка
        </button>

        {/* ── БЛОК 8: ГАЛЕРЕЯ ── */}
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ ...baseText, fontSize: 'clamp(16px, 4.5vw, 22px)', fontWeight: 900, margin: '0 0 14px' }}>
            Наши работы
          </h2>
          <PinterestGallery images={IMAGES} onPhotoClick={i => setLbIndex(i)} />
        </div>

        {/* ── БЛОК 9: КНОПКИ СВЯЗИ ── */}
        <div style={{ ...s.card, marginBottom: 16 }}>
          <h3 style={{ ...baseText, fontSize: 15, fontWeight: 700, margin: '0 0 14px' }}>
            Связаться с ПроКлимат
          </h3>
          <button
            onClick={() => setShowCert(true)}
            style={{
              width: '100%', height: 56, borderRadius: 14, border: 'none',
              background: `linear-gradient(90deg, ${ACCENT} 0%, #0099cc 100%)`,
              color: '#000', fontFamily: FONT, fontSize: 15, fontWeight: 900,
              cursor: 'pointer', marginBottom: 10,
              boxShadow: `0 4px 20px rgba(0,212,255,0.3)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            🎁 Получить 3 подарка
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <a
              href="tel:+79232962500"
              style={{
                height: 48, borderRadius: 12, display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 6, textDecoration: 'none',
                background: 'rgba(255,255,255,0.07)', border: `1px solid ${BORDER}`,
                fontFamily: FONT, fontSize: 13, fontWeight: 700, color: '#fff',
              }}
            >
              📞 Позвонить
            </a>
            <button
              onClick={handleWrite}
              style={{
                height: 48, borderRadius: 12, border: `1px solid ${BORDER}`,
                background: 'rgba(255,255,255,0.07)',
                fontFamily: FONT, fontSize: 13, fontWeight: 700, color: '#fff',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 6,
              }}
            >
              ✉️ Написать
            </button>
            <a
              href="https://yandex.ru/maps/?text=Красноярск+ул+Петра+Ломако+12"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: 48, borderRadius: 12, display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 6, textDecoration: 'none',
                background: 'rgba(255,255,255,0.07)', border: `1px solid ${BORDER}`,
                fontFamily: FONT, fontSize: 13, fontWeight: 700, color: '#fff',
                gridColumn: '1 / -1',
              }}
            >
              📍 Маршрут
            </a>
          </div>
        </div>

        {/* ── БЛОК 10: КОНТАКТЫ ── */}
        <div style={{ ...s.card, marginBottom: 16 }}>
          <h3 style={{ ...baseText, fontSize: 15, fontWeight: 700, margin: '0 0 14px' }}>
            Контакты
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '📍', text: 'ул. Петра Ломако, 12, 1 этаж' },
              { icon: '📞', text: '+7 (923) 296-25-00', href: 'tel:+79232962500' },
              { icon: '📞', text: '+7 (913) 837-25-00', href: 'tel:+79138372500' },
              { icon: '✈️', text: 'Telegram: @proclimate24k', href: 'https://t.me/proclimate24k' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                {item.href ? (
                  <a href={item.href} style={{ fontFamily: FONT, color: ACCENT, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                    {item.text}
                  </a>
                ) : (
                  <span style={{ fontFamily: FONT, color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{item.text}</span>
                )}
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>🕐</span>
              <span style={{ fontFamily: FONT, color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
                Пн–Пт 09:00–20:00, Сб–Вс по записи
              </span>
            </div>
          </div>
        </div>

        {/* ── БЛОК 11: ЮРИДИЧЕСКИЙ ── */}
        <div style={{ ...s.card, marginBottom: 32 }}>
          <p style={{
            fontFamily: FONT, color: 'rgba(255,255,255,0.3)',
            fontSize: 10, lineHeight: 1.6, margin: 0,
          }}>
            Подарок №1: скидка до 10 000 ₽ на монтаж кондиционера — не более 10% от суммы заказа, при предъявлении промокода «ГидНовосела». Подарок №2: сертификат 15 000 ₽ включает бесплатный подбор оборудования, выезд инженера, проект размещения, скидку 10% на оборудование при покупке от 150 000 ₽, скидку на монтаж и первое сервисное обслуживание. Подарок №3: скидка 10% на закладные при предъявлении промокода. Предложения действительны до 31.12.2026. Рекламодатель: ИП Голышев М.Г., ИНН 246411055720, ОГРНИП 318246800145560.
          </p>
        </div>

      </div>

      {showCert && (
        <Certificate
          company={company}
          certCode={CERT_CODE}
          onClose={() => setShowCert(false)}
        />
      )}

      {lbIndex !== null && (
        <Lightbox
          images={IMAGES}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onNavigate={setLbIndex}
        />
      )}
    </div>
  )
}
