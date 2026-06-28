import { useState } from 'react'
import Certificate from '../components/Certificate'
import ContactButtons from '../components/ContactButtons'
import Lightbox from '../components/Lightbox'
import { companies } from '../data/companies'

const CERT_CODE = 'GNS-SIB-2026'

function PinterestGallery({ images, onPhotoClick }) {
  const [failed, setFailed] = useState(new Set())
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {!failed.has(0) && images[0] && (
        <div
          className="gallery-hero"
          style={{ borderRadius: 10, overflow: 'hidden', cursor: 'pointer' }}
          onClick={() => onPhotoClick(0)}
        >
          <img
            src={images[0]} alt="фото 1"
            onError={() => setFailed(p => new Set([...p, 0]))}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}
      {images.length > 1 && (
        <div className="gallery-rest" style={{ display: 'grid', gap: 4 }}>
          {images.slice(1).map((src, j) => {
            const i = j + 1
            if (failed.has(i)) return null
            return (
              <div key={i}
                style={{ aspectRatio: '1 / 1', borderRadius: 6, overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => onPhotoClick(i)}
              >
                <img src={src} alt={`фото ${i + 1}`}
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

export default function SibmebelPage({ onBack }) {
  const company = companies.find(c => c.id === 'sibmebel')
  const [showCert, setShowCert] = useState(false)
  const [lbImages, setLbImages] = useState(null)
  const [lbIndex, setLbIndex] = useState(0)

  if (!company) return null

  const openLightbox = (images, index) => { setLbImages(images); setLbIndex(index) }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F4F0', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── Навигация ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#fff', borderBottom: '1px solid #EDE8E0',
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 20, color: '#E8621A', padding: '4px 8px 4px 0',
        }}>‹</button>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>Партнёры Гид Новосёла</span>
      </div>

      {/* ── Логотип — 200px, центр, отступы ── */}
      <div style={{
        background: '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #EDE8E0',
      }}>
        <img
          src="/partners/sibmebel/logo.jpeg"
          alt="СибМебель"
          style={{ width: 200, height: 'auto', objectFit: 'contain', display: 'block' }}
        />
        <p style={{ fontSize: 13, color: '#888', margin: '10px 0 0', textAlign: 'center' }}>
          Шкафы-купе и распашные шкафы на заказ
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 12, color: '#aaa' }}>
          <span>📍 ул. Петра Славцова, 5</span>
          <span>🕐 9:00 — 19:30</span>
        </div>
      </div>

      <div style={{ padding: '16px', maxWidth: 600, margin: '0 auto' }}>

        {/* ── Блок подарка ── */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          border: '2px solid #E8621A',
          boxShadow: '0 4px 24px rgba(232,98,26,0.18)',
          padding: '28px 20px 24px',
          marginBottom: 24,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 52, lineHeight: 1, marginBottom: 10 }}>🎁</div>
          <p style={{ fontSize: 13, color: '#999', margin: '0 0 6px', fontWeight: 500 }}>
            Подарок новосёлу от СибМебель
          </p>
          <div className="gift-pulse" style={{
            fontSize: 48, fontWeight: 900, color: '#E8621A',
            lineHeight: 1, margin: '0 0 10px',
          }}>
            5 000 ₽
          </div>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', margin: '0 0 4px' }}>
            на шкаф-купе или распашной шкаф
          </p>
          <p style={{ fontSize: 12, color: '#bbb', margin: 0 }}>
            * от итоговой суммы заказа. Подарок можно использовать частями.
          </p>
        </div>

        {/* ── Галереи ── */}
        {company.galleries?.map((gallery, gi) => (
          <div key={gi}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 4, height: 26, background: '#E8621A', borderRadius: 2, flexShrink: 0 }} />
              <p style={{ fontSize: 17, fontWeight: 800, color: '#1A1816', margin: 0, lineHeight: 1.2 }}>
                {gallery.title}
              </p>
            </div>
            <PinterestGallery
              images={gallery.images}
              onPhotoClick={(i) => openLightbox(gallery.images, i)}
            />
            {gi < company.galleries.length - 1 && (
              <div style={{ height: 2, background: '#E8621A', margin: '24px 0', borderRadius: 1, opacity: 0.25 }} />
            )}
          </div>
        ))}

        {/* ── Связаться ── */}
        <div style={{
          background: '#fff', borderRadius: 16,
          border: '1px solid #EDE8E0',
          padding: '16px', marginTop: 24, marginBottom: 16,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', margin: '0 0 12px' }}>
            Связаться с СибМебель
          </h3>
          <ContactButtons
            phones={company.phones}
            partnerName={company.name}
            messengers={company.messengers}
          />
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <a href="tel:+73912881010" style={{
              flex: 1, height: 46, borderRadius: 12,
              background: '#F7F4F0', border: '1px solid #EDE8E0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 6, fontSize: 13, fontWeight: 600, color: '#1a1a1a',
              textDecoration: 'none',
            }}>📞 Позвонить</a>
            <a
              href="https://yandex.ru/maps/?text=%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D1%8F%D1%80%D1%81%D0%BA+%D1%83%D0%BB.+%D0%9F%D0%B5%D1%82%D1%80%D0%B0+%D0%A1%D0%BB%D0%B0%D0%B2%D1%86%D0%BE%D0%B2%D0%B0+5"
              target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, height: 46, borderRadius: 12,
                background: '#F7F4F0', border: '1px solid #EDE8E0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 6, fontSize: 13, fontWeight: 600, color: '#1a1a1a',
                textDecoration: 'none',
              }}
            >📍 Маршрут</a>
          </div>
        </div>

        {/* ── Сертификат ── */}
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

      {lbImages !== null && (
        <Lightbox
          images={lbImages}
          index={lbIndex}
          onClose={() => setLbImages(null)}
          onNavigate={setLbIndex}
        />
      )}
    </div>
  )
}
