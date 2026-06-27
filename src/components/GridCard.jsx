import { useRef, useState } from 'react'
import PhotoSlider from './PhotoSlider'
import Certificate from './Certificate'

const CERT_CODES = {
  'akademiya-shtor-tas': 'GNS-TAC-2025',
  'olkon': 'GNS-OLK-2025',
  'irbis': 'GNS-IRB-2025',
  'krasnoyarsk-rassrochka-avto': 'GNS-KRA-2025',
  'kafel-emarti': 'GNS-EMR-2025',
  'shatura': 'GNS-SHA-2025',
  'sibmebel': 'GNS-SIB-2025',
  'neirobanya': 'GNS-NBN-2025',
  'kuhni-shik': 'GNS-KSH-2025',
}

export default function GridCard({ company, onClick }) {
  if (!company) return null

  const [showCert, setShowCert] = useState(false)
  const cardRef = useRef(null)
  const certCode = CERT_CODES[company.id]
  const initials = company.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    card.style.transition = 'transform 0.1s ease'
    card.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(232,98,26,0.2)`
  }

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
    card.style.transition = 'transform 0.5s ease'
    card.style.boxShadow = ''
  }

  return (
    <div
      ref={cardRef}
      className="partner-card"
      onClick={() => onClick(company)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: '#FFFFFF',
        border: '1px solid #EDE8E0',
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Цветная полоска */}
      <div style={{ height: 3, background: company.color || '#E8621A', flexShrink: 0 }} />

      {/* Верхний блок: лого + инфо */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 12px 10px', gap: 12 }}>
        {/* Лого или инициалы */}
        {company.logo ? (
          <img
            src={company.logo}
            alt={`${company.name} логотип`}
            loading="lazy"
            style={{ width: 72, height: 72, objectFit: 'contain', borderRadius: 10, flexShrink: 0, background: '#FAFAF9' }}
          />
        ) : (
          <div style={{
            width: 72, height: 72, borderRadius: 10, flexShrink: 0,
            background: company.color || '#E8621A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 20,
          }}>
            {initials}
          </div>
        )}

        {/* Текст */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
            <p style={{ color: '#A09890', fontSize: 11, lineHeight: 1 }}>{company.category}</p>
          </div>
          <h3 style={{ color: '#1A1816', fontWeight: 700, fontSize: 15, marginBottom: 5, lineHeight: 1.2 }}>
            {company.name}
          </h3>
          <span className="verified-badge">✓ Проверенный партнёр</span>
        </div>
      </div>

      {/* Подарок */}
      <div style={{ padding: '8px 12px', background: '#FFF8F2', borderTop: '1px solid #F5EBE0', borderBottom: '1px solid #F5EBE0' }}>
        <p style={{ fontSize: 10, color: '#A09890', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
          🎁 Подарок новосёлу
        </p>
        <p style={{ color: '#E8621A', fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>
          {company.giftLabel}
        </p>
        <p style={{ fontSize: 10, color: '#C8A880', marginTop: 2 }}>Бесплатно для новосёлов</p>
      </div>

      {/* Фото */}
      {company.images?.length > 0 && (
        <div style={{ position: 'relative' }}>
          <PhotoSlider
            images={company.images}
            height={200}
            borderRadius={0}
            background="#F7F4F0"
            objectFit="cover"
            overflow="hidden"
          />
          {/* Бейдж подарка поверх фото */}
          <div style={{
            position: 'absolute', top: 10, left: 10, zIndex: 4,
            background: '#E8621A', color: '#fff',
            fontSize: 10, fontWeight: 800, letterSpacing: '0.05em',
            padding: '3px 8px', borderRadius: 6,
            boxShadow: '0 2px 6px rgba(232,98,26,0.4)',
          }}>
            ПОДАРОК
          </div>
        </div>
      )}

      {/* Кнопки */}
      <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          className="btn-orange btn-pulse tap-target"
          style={{
            width: '100%',
            padding: '12px 0',
            borderRadius: 12,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 700,
            color: '#fff',
            background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Активировать подарок →
        </div>
        {certCode && (
          <button
            onClick={e => { e.stopPropagation(); setShowCert(true) }}
            style={{
              width: '100%',
              padding: '10px 0',
              borderRadius: 12,
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 600,
              color: '#E8621A',
              background: '#FFF4EE',
              border: '1.5px solid #E8621A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              minHeight: 48,
            }}
          >
            📜 Получить сертификат
          </button>
        )}
      </div>

      {showCert && certCode && (
        <Certificate
          company={company}
          certCode={certCode}
          onClose={() => setShowCert(false)}
        />
      )}
    </div>
  )
}
