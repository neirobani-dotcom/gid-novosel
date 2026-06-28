import { createPortal } from 'react-dom'
import { companies } from '../data/companies'

const AUTO_PARTNER_IDS = ['irbis', 'krasnoyarsk-rassrochka-avto']
const PARTNER_LIST = companies.filter(c => !AUTO_PARTNER_IDS.includes(c.id))

export default function PartnerNavArrows({ currentId, onNavigate }) {
  const idx = PARTNER_LIST.findIndex(c => c.id === currentId)
  if (idx === -1) return null

  const prev = idx > 0 ? PARTNER_LIST[idx - 1] : null
  const next = idx < PARTNER_LIST.length - 1 ? PARTNER_LIST[idx + 1] : null

  return createPortal(
    <>
      {prev && (
        <button
          className="partner-nav-arrow"
          onClick={() => { window.scrollTo(0, 0); onNavigate(prev) }}
          title={prev.name}
        >
          ←
        </button>
      )}
      {next && (
        <button
          className="partner-nav-arrow partner-nav-arrow--right"
          onClick={() => { window.scrollTo(0, 0); onNavigate(next) }}
          title={next.name}
        >
          →
        </button>
      )}
    </>,
    document.body
  )
}
