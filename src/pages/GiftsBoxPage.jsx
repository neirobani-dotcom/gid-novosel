import SiteHeader from '../components/SiteHeader'
import GiftBox from '../components/GiftBox'
import { gifts } from '../data/gifts'

export default function GiftsBoxPage({ onBack, onSelect }) {
  return (
    <div className="min-h-screen" style={{ background: '#F7F4F0' }}>
      <SiteHeader onPartnerClick={onBack} />

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 16px' }}>
        {/* Назад */}
        <div style={{ padding: '16px 0 0' }}>
          <button onClick={onBack}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', fontSize: 13, color: '#6B6560',
              cursor: 'pointer', padding: '6px 0', fontWeight: 600 }}>
            ← На главную
          </button>
        </div>

        {/* Заголовок */}
        <div style={{ padding: '16px 0 24px' }}>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#1A1816', marginBottom: 6 }}>
            Подарки для новосёлов
          </h1>
          <p style={{ fontSize: 14, color: '#8A8480', lineHeight: 1.5 }}>
            Нажмите на коробочку и получите подарок от компании-партнёра
          </p>
        </div>

        {/* Сетка коробочек — строго 2 в ряд */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          paddingBottom: 48,
        }}>
          {gifts.map((partner, i) => (
            <GiftBox
              key={partner.partnerId}
              partner={partner}
              count={partner.items.length}
              delay={i * 0.08}
              onClick={() => onSelect(partner.partnerId)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
