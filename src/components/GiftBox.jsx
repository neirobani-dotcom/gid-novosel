import { companies } from '../data/companies'

// Координаты 3D-коробки
// Передняя грань: (10,108)→(200,108)→(200,268)→(10,268)
// Смещение правой/верхней граней: OX=46, OY=-28
const OX = 46, OY = -28

// Передняя грань
const FTL = [10,  108]
const FTR = [200, 108]
const FBL = [10,  268]
const FBR = [200, 268]

// Верхняя крышка (топ)
const TTL = [FTL[0]+OX, FTL[1]+OY]  // [56, 80]
const TTR = [FTR[0]+OX, FTR[1]+OY]  // [246, 80]

// Правая грань (нижний правый угол)
const RBR = [FBR[0]+OX, FBR[1]+OY]  // [246, 240]

const frontPts = pts(FTL, FTR, FBR, FBL)
const rightPts = pts(FTR, TTR, RBR, FBR)
const topPts   = pts(FTL, FTR, TTR, TTL)

// Лента: по центру передней грани
const RIB_CX = (FTL[0] + FTR[0]) / 2  // 105
const RIB_W  = 13

// Бант: центр немного в глубь крышки (выступает ~62px вверх)
const BC = [105, 86]

export default function GiftBox({ partner, count, onClick, delay = 0 }) {
  const company  = companies.find(c => c.id === partner.partnerId)
  const logo     = company?.logo
  const initials = partner.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const uid      = partner.partnerId

  // Логотип вписывается в переднюю грань (80%)
  const logoW = 152, logoH = 126
  const logoX = FTL[0] + (190 - logoW) / 2   // 29
  const logoY = FTL[1] + (160 - logoH) / 2   // 125

  return (
    <div
      onClick={onClick}
      className="gift-box-card"
      style={{ animationDelay: `${delay}s`, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div
        className="gift-box-inner"
        style={{ width: '100%', filter: 'drop-shadow(6px 10px 16px rgba(0,0,0,0.35))' }}
      >
        <svg viewBox="0 0 262 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            {/* Градиент передней грани */}
            <linearGradient id={`fg-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#F07A35" />
              <stop offset="100%" stopColor="#D4561A" />
            </linearGradient>
            {/* Градиент крышки */}
            <linearGradient id={`lg-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#F5894A" />
              <stop offset="100%" stopColor="#E07030" />
            </linearGradient>
            {/* Градиент петли банта */}
            <radialGradient id={`bg-${uid}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0E0E0" />
            </radialGradient>
            {/* Градиент узла банта */}
            <radialGradient id={`kg-${uid}`} cx="38%" cy="35%" r="62%">
              <stop offset="0%"   stopColor="#FFE566" />
              <stop offset="100%" stopColor="#C8960C" />
            </radialGradient>
            {/* Клип передней грани для логотипа */}
            <clipPath id={`fc-${uid}`}>
              <polygon points={frontPts} />
            </clipPath>
          </defs>

          {/* ── ПРАВАЯ ГРАНЬ (тёмная — тень) ── */}
          <polygon points={rightPts} fill="#B8461A" stroke="#9E3A12" strokeWidth="1" />

          {/* ── ВЕРХНЯЯ КРЫШКА (светлая — свет сверху) ── */}
          <polygon points={topPts} fill={`url(#lg-${uid})`} stroke="#9E3A12" strokeWidth="1" />

          {/* ── ПЕРЕДНЯЯ ГРАНЬ ── */}
          <polygon points={frontPts} fill={`url(#fg-${uid})`} stroke="#9E3A12" strokeWidth="1.5" />

          {/* ── ЛОГОТИП на передней грани ── */}
          {logo ? (
            <image
              href={logo}
              x={logoX} y={logoY}
              width={logoW} height={logoH}
              preserveAspectRatio="xMidYMid meet"
              clipPath={`url(#fc-${uid})`}
            />
          ) : (
            <text
              x={RIB_CX} y="190"
              textAnchor="middle" dominantBaseline="middle"
              fill="white" fontSize="32" fontWeight="900"
              fontFamily="Inter, system-ui, sans-serif"
              clipPath={`url(#fc-${uid})`}
            >
              {initials}
            </text>
          )}

          {/* ── ВЕРТИКАЛЬНАЯ ЛЕНТА на передней грани ── */}
          <rect
            x={RIB_CX - RIB_W/2} y={FTL[1]}
            width={RIB_W} height={FBL[1] - FTL[1]}
            fill="white" opacity="0.82"
            clipPath={`url(#fc-${uid})`}
          />
          <line x1={RIB_CX - RIB_W/2} y1={FTL[1]} x2={RIB_CX - RIB_W/2} y2={FBL[1]} stroke="#D4AF37" strokeWidth="1.5" />
          <line x1={RIB_CX + RIB_W/2} y1={FTL[1]} x2={RIB_CX + RIB_W/2} y2={FBL[1]} stroke="#D4AF37" strokeWidth="1.5" />

          {/* ── ГОРИЗОНТАЛЬНАЯ ЛЕНТА на крышке ── */}
          {/* Полоска поперёк крышки на уровне d≈0.5 */}
          <polygon
            points={`${24},${100} ${214},${100} ${232},${88} ${42},${88}`}
            fill="white" opacity="0.72"
          />
          <line x1={24} y1={100} x2={214} y2={100} stroke="#D4AF37" strokeWidth="1.5" />
          <line x1={42} y1={88}  x2={232} y2={88}  stroke="#D4AF37" strokeWidth="1.5" />

          {/* ── ЛЕНТЫ от банта до ленты на крышке ── */}
          <path d={`M ${BC[0]-5},${BC[1]} C ${BC[0]-16},${BC[1]+14} ${RIB_CX - RIB_W/2 - 4},${FTL[1]-8} ${RIB_CX - RIB_W/2},${FTL[1]}`}
            stroke="white" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d={`M ${BC[0]+5},${BC[1]} C ${BC[0]+16},${BC[1]+14} ${RIB_CX + RIB_W/2 + 4},${FTL[1]-8} ${RIB_CX + RIB_W/2},${FTL[1]}`}
            stroke="white" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d={`M ${BC[0]-5},${BC[1]} C ${BC[0]-16},${BC[1]+14} ${RIB_CX - RIB_W/2 - 4},${FTL[1]-8} ${RIB_CX - RIB_W/2},${FTL[1]}`}
            stroke="#D4AF37" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d={`M ${BC[0]+5},${BC[1]} C ${BC[0]+16},${BC[1]+14} ${RIB_CX + RIB_W/2 + 4},${FTL[1]-8} ${RIB_CX + RIB_W/2},${FTL[1]}`}
            stroke="#D4AF37" strokeWidth="1.2" fill="none" strokeLinecap="round" />

          {/* ── ПЕТЛИ БАНТА (6 штук, по 3 с каждой стороны) ── */}
          {[-90, -60, -30, 30, 60, 90].map(angle => (
            <ellipse
              key={angle}
              cx={BC[0]} cy={BC[1]}
              rx="42" ry="20"
              fill={`url(#bg-${uid})`}
              stroke="#FFD700" strokeWidth="2"
              transform={`rotate(${angle}, ${BC[0]}, ${BC[1]})`}
            />
          ))}

          {/* ── УЗЕЛ БАНТА ── */}
          <circle
            cx={BC[0]} cy={BC[1]} r="11"
            fill={`url(#kg-${uid})`}
            stroke="#C8960C" strokeWidth="1.5"
          />
        </svg>
      </div>

      <p style={{ marginTop: 8, fontSize: 14, fontWeight: 700, color: '#1A1816', textAlign: 'center', lineHeight: 1.3 }}>
        {partner.name}
      </p>
      <p style={{ fontSize: 12, color: '#A09890', marginTop: 2 }}>
        {count} {plural(count)}
      </p>
    </div>
  )
}

function pts(...coords) {
  return coords.map(([x, y]) => `${x},${y}`).join(' ')
}

function plural(n) {
  const m10 = n % 10, m100 = n % 100
  if (m100 >= 11 && m100 <= 19) return 'подарков'
  if (m10 === 1) return 'подарок'
  if (m10 >= 2 && m10 <= 4) return 'подарка'
  return 'подарков'
}
