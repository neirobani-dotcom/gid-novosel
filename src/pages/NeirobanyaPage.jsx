import { useState } from 'react'
import Certificate from '../components/Certificate'
import ContactButtons from '../components/ContactButtons'
import Lightbox from '../components/Lightbox'
import PartnerBackButton from '../components/PartnerBackButton'
import PhotoSlider from '../components/PhotoSlider'
import { companies } from '../data/companies'

const CERT_CODE = 'GNS-NBN-2026'

const IMAGES = [
  '/partners/neirobanya/photo-9.jpg',
  '/partners/neirobanya/photo-1.jpg',
  '/partners/neirobanya/photo-2.jpg',
  '/partners/neirobanya/photo-4.jpg',
  '/partners/neirobanya/photo-5.jpg',
  '/partners/neirobanya/photo-6.jpg',
  '/partners/neirobanya/photo-8.jpg',
]

const FREEBIES = [
  { icon: '🛁', title: '4-й час бани — бесплатно', desc: 'При бронировании от 3 часов' },
  { icon: '📊', title: 'Консультация по маркетингу', desc: 'Разбор вашего бизнеса, идеи продвижения, стратегия роста за один сеанс' },
  { icon: '🌿', title: 'Восстановление тела и разума', desc: 'Профессиональные процедуры для здоровья' },
  { icon: '💼', title: 'Баня + бизнес за один визит', desc: 'Решаем задачи пока вы паритесь' },
]

const WHY = [
  { icon: '🧠', text: 'Баня + бизнес-сессия за один визит' },
  { icon: '💻', text: 'Сайт, лендинг, маркетинг под ключ — всё решим за один сеанс' },
  { icon: '🏠', text: 'Специальные условия для новосёлов Красноярска' },
  { icon: '⚡', text: 'Нейробаня — инструмент который прокачивает ваш бизнес пока вы паритесь' },
]

export default function NeirobanyaPage({ onBack }) {
  const company = companies.find(c => c.id === 'neirobanya')
  const [showCert, setShowCert] = useState(false)
  const [lbIndex, setLbIndex] = useState(null)

  if (!company) return null

  return (
    <div style={{ minHeight: '100vh', background: '#F7F4F0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <PartnerBackButton onClick={onBack} hidden={lbIndex !== null} />

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(160deg, #1a1a1a 0%, #2d1a0e 60%, #1a1008 100%)',
        padding: '56px 20px 48px',
        textAlign: 'center',
        animation: 'nbFadeIn 0.7s ease both',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Декоративное свечение */}
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          width: 340, height: 340, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,98,26,0.18) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <img
          src="/partners/neirobanya/logo.png"
          alt="Нейробаня"
          style={{
            width: 120, height: 120, objectFit: 'contain',
            display: 'block', margin: '0 auto 20px',
            filter: 'drop-shadow(0 0 20px rgba(232,98,26,0.5))',
            position: 'relative',
          }}
          onError={e => { e.currentTarget.style.display = 'none' }}
        />

        <h1 style={{
          fontSize: 36, fontWeight: 900, color: '#fff',
          letterSpacing: '0.06em', margin: '0 0 10px',
          textShadow: '0 0 20px rgba(232,98,26,0.7), 0 0 40px rgba(255,140,0,0.4)',
          position: 'relative',
        }}>
          НЕЙРОБАНЯ
        </h1>

        <p style={{
          fontSize: 16, color: 'rgba(255,255,255,0.7)',
          margin: 0, letterSpacing: '0.04em',
          position: 'relative',
        }}>
          Баня&nbsp;•&nbsp;Восстановление&nbsp;•&nbsp;Бизнес
        </p>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          marginTop: 16, background: 'rgba(232,98,26,0.18)',
          border: '1px solid rgba(232,98,26,0.4)',
          borderRadius: 20, padding: '6px 14px',
          position: 'relative',
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#E8621A', letterSpacing: '0.1em' }}>
            ✓ ПАРТНЁР ГИД НОВОСЁЛА
          </span>
        </div>
      </div>

      <div style={{ padding: '20px 16px', maxWidth: 600, margin: '0 auto' }}>

        {/* ── БЛОК ПОДАРКА ── */}
        <div style={{
          background: '#1a1a1a',
          borderRadius: 20,
          border: '2px solid #E8621A',
          boxShadow: '0 0 30px rgba(232,98,26,0.25), 0 8px 32px rgba(0,0,0,0.3)',
          padding: '28px 20px 24px',
          marginBottom: 20,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(232,98,26,0.7)', letterSpacing: '0.1em', margin: '0 0 12px', textTransform: 'uppercase' }}>
            Подарок новосёлу
          </p>
          <div className="gift-pulse" style={{
            fontSize: 32, fontWeight: 900, color: '#E8621A',
            lineHeight: 1.2, margin: '0 0 10px',
          }}>
            🎁 4-й час — БЕСПЛАТНО
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: '0 0 16px', lineHeight: 1.5 }}>
            При бронировании от 3 часов&nbsp;•&nbsp;Подарок только для новосёлов
          </p>
          <div style={{
            background: 'rgba(232,98,26,0.12)',
            border: '1px solid rgba(232,98,26,0.3)',
            borderRadius: 12, padding: '10px 16px',
            display: 'inline-block',
          }}>
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>
              Вы экономите{' '}
              <span style={{ color: '#E8621A', fontWeight: 900, fontSize: 18 }}>5 000 ₽</span>
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: '14px 0 0', lineHeight: 1.6 }}>
            При бронировании от 6 часов — горячая или холодная купель в подарок по вашему выбору
          </p>
        </div>

        {/* ── ПОДАРОК 2 ── */}
        <div style={{
          background: '#1a1a1a',
          borderRadius: 20,
          border: '2px solid #E8621A',
          boxShadow: '0 0 30px rgba(232,98,26,0.25), 0 8px 32px rgba(0,0,0,0.3)',
          padding: '28px 20px 24px',
          marginBottom: 20,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(232,98,26,0.7)', letterSpacing: '0.1em', margin: '0 0 12px', textTransform: 'uppercase' }}>
            Подарок новосёлу
          </p>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#E8621A', lineHeight: 1.2, margin: '0 0 10px' }}>
            🎁 Подарок на 1 000 000 ₽
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: '0 0 16px', lineHeight: 1.6 }}>
            Это бесценный вклад в ваш бизнес. Наша команда за 3–12 часов настроит всё так, что вы начнёте зарабатывать от 1 000 000 рублей в месяц. Большинство предпринимателей не знают, как это сделать правильно — Нейробаня знает.
          </p>
          <a
            href="https://wa.me/79538420707"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 14,
              background: 'linear-gradient(90deg, #E8621A 0%, #F5A623 100%)',
              color: '#fff', fontSize: 15, fontWeight: 800, textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(232,98,26,0.4)',
            }}
          >
            💬 Получить консультацию
          </a>
        </div>

        {/* ── БЕСПЛАТНО ДЛЯ ВАС ── */}
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A09890', margin: '0 0 12px' }}>
          Бесплатно для вас
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 10, marginBottom: 20,
        }}>
          {FREEBIES.map((f, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #EDE8E0',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              padding: '16px 14px',
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', margin: '0 0 5px', lineHeight: 1.3 }}>
                {f.title}
              </p>
              <p style={{ fontSize: 11, color: '#A09890', margin: 0, lineHeight: 1.4 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── ПОЧЕМУ НЕЙРОБАНЯ ── */}
        <div style={{
          background: '#1a1a1a',
          borderRadius: 20,
          padding: '24px 20px',
          marginBottom: 20,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(232,98,26,0.7)', margin: '0 0 18px' }}>
            Почему Нейробаня
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {WHY.map((w, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1 }}>{w.icon}</span>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>
                  {w.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── ЦИТАТА ── */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1a0e 100%)',
          borderRadius: 20,
          border: '1px solid rgba(232,98,26,0.25)',
          padding: '28px 24px',
          marginBottom: 20,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -10, left: 16,
            fontSize: 80, color: 'rgba(232,98,26,0.12)',
            fontFamily: 'serif', lineHeight: 1, pointerEvents: 'none',
            userSelect: 'none',
          }}>
            "
          </div>
          <p style={{
            fontSize: 16, fontStyle: 'italic', color: 'rgba(255,255,255,0.88)',
            lineHeight: 1.65, margin: 0, position: 'relative',
          }}>
            Нейробаня — не просто баня. Это инструмент, который прокачает ваш бизнес, пока вы паритесь. Сайт, лендинг, маркетинг — всё решим за один сеанс.
          </p>
        </div>

        {/* ── СЛАЙДЕР ── */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#1a1a1a', margin: '0 0 12px' }}>
            ✨ Атмосфера Нейробани
          </p>
          <div style={{ borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}
            onClick={() => setLbIndex(0)}>
            <PhotoSlider
              images={IMAGES}
              height={350}
              borderRadius={0}
              showDots
              onPhotoClick={(i) => setLbIndex(i)}
            />
          </div>
        </div>

        {/* ── КНОПКА БРОНИРОВАНИЯ ── */}
        <button
          onClick={() => setShowCert(true)}
          className="nb-book-btn"
          style={{
            width: '100%', height: 62, borderRadius: 16,
            background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
            color: '#fff', border: 'none',
            fontSize: 18, fontWeight: 900, cursor: 'pointer',
            boxShadow: '0 6px 28px rgba(232,98,26,0.45)',
            marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          🔥 Забронировать со скидкой
        </button>

        {/* ── КОНТАКТЫ ── */}
        <div style={{
          background: '#fff', borderRadius: 16,
          border: '1px solid #EDE8E0',
          padding: '20px', marginBottom: 16,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', margin: '0 0 14px' }}>
            Связаться с Нейробаней
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#555' }}>
              <span style={{ fontSize: 18 }}>📍</span>
              <span>ул. Гуляева, 11, Красноярск</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#555' }}>
              <span style={{ fontSize: 18 }}>📞</span>
              <a href="tel:+79130401111" style={{ color: '#1a1a1a', fontWeight: 600, textDecoration: 'none' }}>
                +7 (913) 040-11-11
              </a>
            </div>
          </div>

          <ContactButtons
            phones={company.phones}
            partnerName={company.name}
            messengers={company.messengers}
          />

          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <a href="tel:+79130401111" style={{
              flex: 1, height: 48, borderRadius: 12,
              background: '#F7F4F0', border: '1px solid #EDE8E0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 6, fontSize: 14, fontWeight: 600, color: '#1a1a1a',
              textDecoration: 'none',
            }}>
              📞 Позвонить
            </a>
            <a
              href="https://yandex.ru/maps/?text=%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D1%8F%D1%80%D1%81%D0%BA+%D1%83%D0%BB.+%D0%93%D1%83%D0%BB%D1%8F%D0%B5%D0%B2%D0%B0+11"
              target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, height: 48, borderRadius: 12,
                background: '#F7F4F0', border: '1px solid #EDE8E0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 6, fontSize: 14, fontWeight: 600, color: '#1a1a1a',
                textDecoration: 'none',
              }}
            >
              📍 Маршрут
            </a>
          </div>
        </div>

        {/* ── ПОВТОР КНОПКИ ВНИЗУ ── */}
        <button
          onClick={() => setShowCert(true)}
          style={{
            width: '100%', height: 56, borderRadius: 14,
            background: '#1a1a1a',
            border: '2px solid #E8621A',
            color: '#E8621A', fontSize: 16, fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(232,98,26,0.2)',
            marginBottom: 32,
          }}
        >
          🎁 Получить сертификат
        </button>

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
