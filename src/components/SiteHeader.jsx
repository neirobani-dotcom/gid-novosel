import { useState } from 'react'
import SiteLogo from './SiteLogo'
import PartnerModal from './PartnerModal'

export default function SiteHeader({ onPartnerClick }) {
  const [modalOpen, setModalOpen] = useState(false)

  const handlePartnerClick = () => {
    setModalOpen(true)
  }

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #EDE8E0',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: '0 16px',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <SiteLogo variant="header" />

          <button
            onClick={handlePartnerClick}
            className="btn-orange tap-target"
            style={{
              background: 'linear-gradient(90deg, #E8621A 0%, #FF9B2F 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '0 16px',
              fontSize: 13,
              fontWeight: 700,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              height: 40,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Получить предложение
          </button>
        </div>
      </header>

      <PartnerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
