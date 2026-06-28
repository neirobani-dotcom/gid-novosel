import { useState } from 'react'
import { createPortal } from 'react-dom'
import Certificate from '../components/Certificate'
import ContactButtons from '../components/ContactButtons'
import { companies } from '../data/companies'

const CERT_CODE = 'GNS-SMD-2026'
const MAPS_URL = 'https://yandex.ru/maps/?text=%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D1%8F%D1%80%D1%81%D0%BA+%D0%A2%D0%B5%D0%BB%D0%B5%D0%B2%D0%B8%D0%B7%D0%BE%D1%80%D0%BD%D1%8B%D0%B9+%D0%BF%D0%B5%D1%80%D0%B5%D1%83%D0%BB%D0%BE%D0%BA+9%2F6'

export default function SmdPage({ onBack }) {
  const company = companies.find(c => c.id === 'smd')
  const [doors, setDoors] = useState(1)
  const [lightboxImg, setLightboxImg] = useState(null)
  const [showCert, setShowCert] = useState(false)
  const [failedImgs, setFailedImgs] = useState(new Set())

  const giftAmount = doors * 3000
  const images = Array.from({ length: 20 }, (_, i) => `/partners/smd/${i + 1}.jpeg`)

  if (!company) return null

  return (
    <div style={{ minHeight: '100vh', background: '#F7F4F0', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── Навигация ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#fff', borderBottom: '1px solid #EDE8E0',
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 20, color: '#E8621A', padding: '4px 8px 4px 0',
            display: 'flex', alignItems: 'center', gap: 4,
          }}
        >
          ‹
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>Партнёры Гид Новосёла</span>
      </div>

      {/* ── Шапка партнёра ── */}
      <div style={{ background: '#fff', padding: '20px 16px 16px', borderBottom: '1px solid #EDE8E0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 68, height: 68, borderRadius: 14,
            border: '2px solid #F0E8D8',
            overflow: 'hidden', background: '#fff', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img
              src="/smd/logo.jpeg"
              alt="СМД"
              onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.innerHTML = '<span style="font-size:28px;font-weight:800;color:#5D4037">СМ</span>' }}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
              <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1a1a1a', margin: 0 }}>СМД</h1>
              <span style={{
                fontSize: 10, fontWeight: 600, color: '#16A34A',
                background: '#F0FDF4', border: '1px solid #BBF7D0',
                borderRadius: 20, padding: '2px 8px',
              }}>✓ Партнёр</span>
            </div>
            <p style={{ fontSize: 13, color: '#888', margin: 0 }}>Межкомнатные двери</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#555' }}>
            <span>📍</span>
            <span>Красноярск, Телевизорный переулок, 9/6</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#555' }}>
            <span>🕐</span>
            <span>Ежедневно 10:00 — 20:00</span>
          </div>
        </div>
      </div>

      {/* ── Контент ── */}
      <div style={{ padding: '16px', maxWidth: 600, margin: '0 auto' }}>

        {/* Заголовок подарков */}
        <h2 style={{
          fontSize: 20, fontWeight: 900, color: '#1a1a1a',
          margin: '0 0 14px',
        }}>
          🎁 Подарки для новосёлов от СМД
        </h2>

        {/* ── Карточка 1: Царговые двери ── */}
        <div style={{
          background: '#fff', borderRadius: 16,
          border: '1px solid #EDE8E0',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          padding: '20px', marginBottom: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 22 }}>🚪</span>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1a1a1a', margin: 0 }}>Царговые двери</h3>
          </div>
          <p style={{ fontSize: 13, color: '#888', margin: '0 0 16px' }}>
            3 000 ₽ за каждое полотно — до 4 полотен
          </p>

          {/* Примеры */}
          <div style={{
            display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap',
          }}>
            {[1, 2, 4].map(n => (
              <button
                key={n}
                onClick={() => setDoors(n)}
                style={{
                  padding: '4px 12px', borderRadius: 20,
                  border: `1.5px solid ${doors === n ? '#E8621A' : '#EDE8E0'}`,
                  background: doors === n ? '#FFF4EE' : '#F7F4F0',
                  color: doors === n ? '#E8621A' : '#888',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}
              >
                {n} {n === 1 ? 'дверь' : n < 5 ? 'двери' : 'дверей'} = {(n * 3000).toLocaleString('ru-RU')} ₽
              </button>
            ))}
          </div>

          {/* Счётчик */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 16 }}>
            <button
              onClick={() => setDoors(d => Math.max(1, d - 1))}
              style={{
                width: 44, height: 44, borderRadius: '12px 0 0 12px',
                border: '1.5px solid #EDE8E0', borderRight: 'none',
                background: '#F7F4F0', fontSize: 22, fontWeight: 700,
                color: '#555', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >−</button>
            <div style={{
              width: 64, height: 44,
              border: '1.5px solid #E8621A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, fontWeight: 800, color: '#E8621A', background: '#FFF4EE',
            }}>
              {doors}
            </div>
            <button
              onClick={() => setDoors(d => Math.min(20, d + 1))}
              style={{
                width: 44, height: 44, borderRadius: '0 12px 12px 0',
                border: '1.5px solid #EDE8E0', borderLeft: 'none',
                background: '#F7F4F0', fontSize: 22, fontWeight: 700,
                color: '#555', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >+</button>
            <span style={{ marginLeft: 12, fontSize: 13, color: '#888' }}>
              {doors === 1 ? 'полотно' : doors < 5 ? 'полотна' : 'полотен'}
            </span>
          </div>

          {/* Итог */}
          <div style={{
            background: 'linear-gradient(135deg, #FFF4EE 0%, #FFE8D6 100%)',
            border: '1.5px solid rgba(232,98,26,0.2)',
            borderRadius: 12, padding: '14px 16px', marginBottom: 16,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 14, color: '#666' }}>Ваш подарок:</span>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#E8621A' }}>
              {giftAmount.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          <button
            onClick={() => setShowCert(true)}
            style={{
              width: '100%', height: 52, borderRadius: 12,
              background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
              color: '#fff', border: 'none',
              fontSize: 16, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(232,98,26,0.3)',
            }}
          >
            Получить подарок →
          </button>
        </div>

        {/* ── Карточка 2: Щитовые двери ── */}
        <div style={{
          background: '#1a1a1a', borderRadius: 16,
          padding: '24px 20px', marginBottom: 24,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -20, right: -10,
            fontSize: 140, fontWeight: 900, color: 'rgba(255,255,255,0.04)',
            lineHeight: 1, userSelect: 'none',
          }}>%</div>
          <div style={{
            fontSize: 72, fontWeight: 900,
            color: '#fff', lineHeight: 1, marginBottom: 8,
            position: 'relative', zIndex: 1,
          }}>10%</div>
          <p style={{
            fontSize: 15, color: 'rgba(255,255,255,0.85)',
            margin: '0 0 20px', lineHeight: 1.4, position: 'relative', zIndex: 1,
          }}>
            Скидка на весь ассортимент щитовых дверей
          </p>
          <button
            onClick={() => setShowCert(true)}
            style={{
              height: 48, padding: '0 24px', borderRadius: 12,
              background: '#E8621A', color: '#fff',
              border: 'none', fontSize: 15, fontWeight: 700,
              cursor: 'pointer',
              position: 'relative', zIndex: 1,
            }}
          >
            Узнать условия →
          </button>
        </div>

        {/* ── Почему СМД ── */}
        <div style={{
          background: '#fff', borderRadius: 16,
          border: '1px solid #EDE8E0',
          padding: '20px', marginBottom: 24,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1a1a1a', margin: '0 0 14px' }}>
            Почему выбирают СМД
          </h3>
          {company.advantages.map((adv, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < company.advantages.length - 1 ? 10 : 0 }}>
              <span style={{ color: '#22C55E', fontWeight: 700, flexShrink: 0, fontSize: 15 }}>✅</span>
              <span style={{ fontSize: 14, color: '#333', lineHeight: 1.45 }}>{adv}</span>
            </div>
          ))}
        </div>

        {/* ── Галерея ── */}
        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1a1a1a', margin: '0 0 10px' }}>
          Фото
        </h3>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 4, marginBottom: 24,
        }}>
          {images.map((src, i) => (
            <div
              key={i}
              style={{
                aspectRatio: '1 / 1', borderRadius: 8, overflow: 'hidden',
                background: '#F0EBE3',
                display: failedImgs.has(i) ? 'none' : 'block',
              }}
            >
              <img
                src={src}
                alt={`СМД фото ${i + 1}`}
                onError={() => setFailedImgs(prev => new Set([...prev, i]))}
                onClick={() => setLightboxImg(src)}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  cursor: 'pointer', display: 'block',
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Связаться ── */}
        <div style={{
          background: '#fff', borderRadius: 16,
          border: '1px solid #EDE8E0',
          padding: '16px', marginBottom: 24,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', margin: '0 0 12px' }}>
            Связаться с СМД
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ContactButtons
              phones={company.phones}
              partnerName={company.name}
              messengers={company.messengers}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href="tel:+79631901010"
                style={{
                  flex: 1, height: 48, borderRadius: 12,
                  background: '#F7F4F0', border: '1px solid #EDE8E0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 6, fontSize: 14, fontWeight: 600, color: '#1a1a1a',
                  textDecoration: 'none',
                }}
              >
                📞 Позвонить
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
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
        </div>

        {/* ── Активация сертификата (повторная кнопка) ── */}
        <button
          onClick={() => setShowCert(true)}
          style={{
            width: '100%', height: 56, borderRadius: 14,
            background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
            color: '#fff', border: 'none',
            fontSize: 16, fontWeight: 800, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(232,98,26,0.35)',
            marginBottom: 32,
          }}
        >
          🎁 Активировать подарок
        </button>

      </div>

      {/* ── Сертификат ── */}
      {showCert && (
        <Certificate
          company={company}
          certCode={CERT_CODE}
          onClose={() => setShowCert(false)}
        />
      )}

      {/* ── Лайтбокс галереи ── */}
      {lightboxImg && createPortal(
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 20000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16,
          }}
        >
          <img
            src={lightboxImg}
            alt="Фото СМД"
            style={{
              maxWidth: '95vw', maxHeight: '90vh',
              objectFit: 'contain', borderRadius: 8,
            }}
          />
          <button
            onClick={() => setLightboxImg(null)}
            style={{
              position: 'absolute', top: 20, right: 20,
              background: 'rgba(255,255,255,0.15)', border: 'none',
              color: '#fff', fontSize: 24, width: 40, height: 40,
              borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >×</button>
        </div>,
        document.body
      )}
    </div>
  )
}
