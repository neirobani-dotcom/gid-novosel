export default function Certificate({ company, certCode, onClose }) {
  const validUntil = '31 декабря 2025'

  const handleScreenshot = () => {
    alert('Сделайте скриншот экрана, чтобы сохранить сертификат 📸')
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 10000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 360,
          background: 'linear-gradient(145deg, #FFFEF5, #FFF8E7)',
          borderRadius: 20,
          border: '2px solid #E8621A',
          padding: '28px 24px 24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 6px rgba(232,98,26,0.1)',
          animation: 'cert-appear 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Шапка */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <img src="/site-logo.png" alt="Гид Новосёла" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          <span style={{ fontSize: 13, fontWeight: 800, color: '#E8621A', letterSpacing: '0.5px' }}>ГИД НОВОСЁЛА</span>
        </div>
        <div style={{ height: 1, background: '#E8621A', opacity: 0.3, marginBottom: 12 }} />

        {/* Заголовок */}
        <p style={{ fontSize: 11, letterSpacing: '3px', color: '#888', textAlign: 'center', margin: '0 0 14px' }}>
          ЭЛЕКТРОННЫЙ СЕРТИФИКАТ
        </p>

        {/* Лого партнёра */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 12,
            border: '2px solid #F0E8D8',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {company.logo
              ? <img src={company.logo} alt={company.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              : <span style={{ fontSize: 28, fontWeight: 800, color: company.color || '#E8621A' }}>
                  {company.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </span>
            }
          </div>
        </div>

        {/* Название и категория */}
        <p style={{ fontSize: 18, fontWeight: 800, color: '#1a1a1a', textAlign: 'center', margin: '0 0 4px' }}>
          {company.name}
        </p>
        <p style={{ fontSize: 12, color: '#888', textAlign: 'center', margin: 0 }}>{company.category}</p>

        {/* Разделитель */}
        <div style={{ borderTop: '2px dashed #E8D5B0', margin: '14px 0' }} />

        {/* Подарок */}
        <div style={{ textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            background: '#FFF0E8', color: '#E8621A',
            fontSize: 10, padding: '4px 10px',
            borderRadius: 20, fontWeight: 700,
            letterSpacing: '0.5px',
          }}>
            🎁 ВАШ ПОДАРОК
          </span>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#E8621A', textAlign: 'center', margin: '8px 0 6px' }}>
            {company.giftLabel}
          </p>
          <p style={{ fontSize: 12, color: '#666', textAlign: 'center', margin: 0 }}>
            Предъявите этот сертификат при визите в компанию
          </p>
        </div>

        {/* Разделитель */}
        <div style={{ borderTop: '2px dashed #E8D5B0', margin: '14px 0' }} />

        {/* Нижняя часть: код + дата */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
          <div>
            <p style={{ fontSize: 10, color: '#888', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Код сертификата</p>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#E8621A', margin: 0, letterSpacing: '1px' }}>{certCode}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 10, color: '#888', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Действует до</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#333', margin: 0 }}>{validUntil}</p>
          </div>
        </div>

        {/* Печать */}
        <div style={{
          position: 'absolute', right: 20, bottom: 90,
          width: 64, height: 64, borderRadius: '50%',
          border: '2.5px solid #E8621A',
          opacity: 0.35,
          transform: 'rotate(-15deg)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          <span style={{ fontSize: 16, fontWeight: 900, color: '#E8621A', lineHeight: 1 }}>ГН</span>
          <span style={{ fontSize: 5, color: '#E8621A', fontWeight: 700, textAlign: 'center', letterSpacing: '0.5px', marginTop: 2 }}>
            ГИД НОВОСЁЛА • КРК •
          </span>
        </div>

        {/* Кнопки */}
        <div style={{ marginTop: 18 }}>
          <button
            onClick={handleScreenshot}
            style={{
              width: '100%', padding: '12px', borderRadius: 12,
              background: '#E8621A', color: '#fff',
              border: 'none', fontSize: 14, fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            📸 Сохранить сертификат
          </button>
          <button
            onClick={onClose}
            style={{
              width: '100%', marginTop: 8, padding: '10px',
              background: 'transparent', border: 'none',
              color: '#888', fontSize: 13, cursor: 'pointer',
            }}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
