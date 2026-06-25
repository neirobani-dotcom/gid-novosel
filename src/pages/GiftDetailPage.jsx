import { useState } from 'react'
import SiteHeader from '../components/SiteHeader'
import CouponCard from '../components/CouponCard'
import ActivateModal from '../components/ActivateModal'
import { gifts } from '../data/gifts'
import { companies } from '../data/companies'

export default function GiftDetailPage({ partnerId, onBack, onPartnerBack }) {
  const [activeGift, setActiveGift] = useState(null)

  const partner = gifts.find(g => g.partnerId === partnerId)
  const company = companies.find(c => c.id === partnerId)

  if (!partner) return null

  const bg = hexToRgba(partner.color, 0.08)

  return (
    <div className="min-h-screen" style={{ background: '#F7F4F0' }}>
      <SiteHeader />

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 16px' }}>
        {/* Назад */}
        <div style={{ padding: '16px 0 0' }}>
          <button onClick={onBack}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', fontSize: 13, color: '#6B6560',
              cursor: 'pointer', padding: '6px 0', fontWeight: 600 }}>
            ← Назад к подаркам
          </button>
        </div>

        {/* Шапка партнёра */}
        <div style={{
          background: bg,
          border: `1px solid ${hexToRgba(partner.color, 0.18)}`,
          borderRadius: 20, padding: '18px 18px',
          marginTop: 12, marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          {company?.logo ? (
            <img src={company.logo} alt={partner.name}
              style={{ width: 56, height: 56, objectFit: 'contain', borderRadius: 12,
                background: '#fff', padding: 4, flexShrink: 0 }} />
          ) : (
            <div style={{
              width: 56, height: 56, borderRadius: 14, flexShrink: 0,
              background: partner.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: 18,
            }}>
              {partner.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <p style={{ fontSize: 11, color: '#A09890', marginBottom: 3 }}>
              Подарки для новосёлов от
            </p>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1A1816', lineHeight: 1.2 }}>
              {partner.name}
            </h2>
          </div>
        </div>

        {/* Заголовок */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: '#A09890', fontWeight: 600 }}>
            {partner.items.length} {plural(partner.items.length)} · выберите и активируйте
          </p>
        </div>

        {/* Купоны */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 48 }}>
          {partner.items.map((gift, i) => (
            <CouponCard
              key={gift.id}
              gift={gift}
              partnerColor={partner.color}
              delay={i * 0.1}
              onActivate={() => setActiveGift(gift)}
            />
          ))}
        </div>
      </div>

      <ActivateModal
        isOpen={!!activeGift}
        onClose={() => setActiveGift(null)}
        giftTitle={activeGift?.title || ''}
        partnerName={partner.name}
        partnerColor={partner.color}
      />
    </div>
  )
}

function plural(n) {
  const mod10  = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 19) return 'подарков'
  if (mod10 === 1) return 'подарок'
  if (mod10 >= 2 && mod10 <= 4) return 'подарка'
  return 'подарков'
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}
