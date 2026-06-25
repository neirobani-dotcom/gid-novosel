import { companies } from '../data/companies'

// ── 3D-коробка: координаты ──────────────────────────────────────
const OX = 46, OY = -28  // смещение правой/верхней граней

const FTL = [10,  108]   // front top-left
const FTR = [200, 108]   // front top-right
const FBL = [10,  268]   // front bottom-left
const FBR = [200, 268]   // front bottom-right
const TTL = [FTL[0]+OX, FTL[1]+OY]  // [56, 80]  — крышка, зад-лево
const TTR = [FTR[0]+OX, FTR[1]+OY]  // [246, 80] — крышка, зад-право
const RBR = [FBR[0]+OX, FBR[1]+OY]  // [246, 240] — правая грань, низ-право

const frontPts = p(FTL, FTR, FBR, FBL)
const rightPts = p(FTR, TTR, RBR, FBR)
const topPts   = p(FTL, FTR, TTR, TTL)

// Центр передней грани
const FC_X = (FTL[0] + FTR[0]) / 2  // 105
const FC_Y = (FTL[1] + FBL[1]) / 2  // 188

// Центр банта — на крышке над передней гранью
const BC = [FC_X, 84]  // [105, 84]

// Логотип: 85% передней грани
const LOGO_W = Math.round(190 * 0.85)  // 161
const LOGO_H = Math.round(160 * 0.85)  // 136
const LOGO_X = FTL[0] + Math.round((190 - LOGO_W) / 2)  // 24
const LOGO_Y = FTL[1] + Math.round((160 - LOGO_H) / 2)  // 120

export default function GiftBox({ partner, count, onClick, delay = 0 }) {
  const company  = companies.find(c => c.id === partner.partnerId)
  const logo     = company?.logo
  const initials = partner.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const u        = partner.partnerId  // уникальный префикс для gradient id

  return (
    <div
      onClick={onClick}
      className="gift-box-card"
      style={{ animationDelay: `${delay}s`, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div
        className="gift-box-inner"
        style={{ width: '100%', filter: 'drop-shadow(6px 10px 16px rgba(0,0,0,0.32))' }}
      >
        <svg viewBox="0 0 262 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            {/* Передняя грань */}
            <linearGradient id={`fg-${u}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#F07A35" />
              <stop offset="100%" stopColor="#D4561A" />
            </linearGradient>
            {/* Верхняя крышка */}
            <linearGradient id={`lg-${u}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#F5894A" />
              <stop offset="100%" stopColor="#E07030" />
            </linearGradient>
            {/* Петля банта — оранжевый градиент */}
            <linearGradient id={`petal-${u}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#FF9A4A" />
              <stop offset="100%" stopColor="#E8621A" />
            </linearGradient>
            {/* Узел банта — золотой */}
            <radialGradient id={`knot-${u}`} cx="38%" cy="35%" r="62%">
              <stop offset="0%"   stopColor="#FFE566" />
              <stop offset="100%" stopColor="#B8860B" />
            </radialGradient>
            {/* Клип: передняя грань (для логотипа) */}
            <clipPath id={`fc-${u}`}>
              <polygon points={frontPts} />
            </clipPath>
          </defs>

          {/* ══ СЛОЙ 1: ГРАНИ КОРОБКИ ══ */}

          {/* Правая грань (тёмная — тень) */}
          <polygon points={rightPts} fill="#B8461A" stroke="#9E3A12" strokeWidth="1" />

          {/* Верхняя крышка (светлая — свет) */}
          <polygon points={topPts} fill={`url(#lg-${u})`} stroke="#9E3A12" strokeWidth="1" />

          {/* Передняя грань */}
          <polygon points={frontPts} fill={`url(#fg-${u})`} stroke="#9E3A12" strokeWidth="1.5" />

          {/* ══ СЛОЙ 2: ЛЕНТЫ И УКРАШЕНИЯ ══ */}

          {/* Горизонтальная лента на крышке */}
          <polygon
            points="24,100 214,100 232,88 42,88"
            fill="white" opacity="0.70"
          />
          <line x1={24} y1={100} x2={214} y2={100} stroke="#D4AF37" strokeWidth="1.5" />
          <line x1={42} y1={88}  x2={232} y2={88}  stroke="#D4AF37" strokeWidth="1.5" />

          {/* Вертикальная лента на передней грани (под логотипом) */}
          <rect
            x={FC_X - 6} y={FTL[1]}
            width={12} height={FBL[1] - FTL[1]}
            fill="white" opacity="0.75"
            clipPath={`url(#fc-${u})`}
          />
          <line x1={FC_X-6} y1={FTL[1]} x2={FC_X-6} y2={FBL[1]} stroke="#D4AF37" strokeWidth="1.2" />
          <line x1={FC_X+6} y1={FTL[1]} x2={FC_X+6} y2={FBL[1]} stroke="#D4AF37" strokeWidth="1.2" />

          {/* ══ СЛОЙ 3: БАНТ — ЛЕНТЫ ОТ УЗЛА ВНИЗ ══ */}

          {/* Левая лента */}
          <path
            d={`M ${BC[0]-5},${BC[1]+10} C ${BC[0]-22},${BC[1]+38} ${FC_X-18},${FTL[1]+30} ${FC_X-6},${FTL[1]+80}`}
            stroke="#E8621A" strokeWidth="7" fill="none" strokeLinecap="round"
          />
          <path
            d={`M ${BC[0]-5},${BC[1]+10} C ${BC[0]-22},${BC[1]+38} ${FC_X-18},${FTL[1]+30} ${FC_X-6},${FTL[1]+80}`}
            stroke="#FFD700" strokeWidth="1.5" fill="none" strokeLinecap="round"
          />

          {/* Правая лента */}
          <path
            d={`M ${BC[0]+5},${BC[1]+10} C ${BC[0]+22},${BC[1]+38} ${FC_X+18},${FTL[1]+30} ${FC_X+6},${FTL[1]+80}`}
            stroke="#E8621A" strokeWidth="7" fill="none" strokeLinecap="round"
          />
          <path
            d={`M ${BC[0]+5},${BC[1]+10} C ${BC[0]+22},${BC[1]+38} ${FC_X+18},${FTL[1]+30} ${FC_X+6},${FTL[1]+80}`}
            stroke="#FFD700" strokeWidth="1.5" fill="none" strokeLinecap="round"
          />

          {/* ══ СЛОЙ 4: БАНТ — 8 ПЕТЕЛЬ ══ */}

          {/* Левые петли: -20, -45, -70, -95 */}
          {/* Правые петли: 20, 45, 70, 95 */}
          {[-95, -70, -45, -20, 20, 45, 70, 95].map(angle => (
            <ellipse
              key={angle}
              cx={BC[0]} cy={BC[1]}
              rx="46" ry="22"
              fill={`url(#petal-${u})`}
              stroke="#FFD700" strokeWidth="2.5"
              transform={`rotate(${angle}, ${BC[0]}, ${BC[1]})`}
              style={{ filter: 'drop-shadow(3px 4px 6px rgba(0,0,0,0.28))' }}
            />
          ))}

          {/* ══ СЛОЙ 5: УЗЕЛ БАНТА ══ */}
          <circle
            cx={BC[0]} cy={BC[1]} r="14"
            fill={`url(#knot-${u})`}
            stroke="#FFD700" strokeWidth="2"
            style={{ filter: 'drop-shadow(2px 3px 5px rgba(0,0,0,0.3))' }}
          />

          {/* ══ СЛОЙ 6: ЛОГОТИП — САМЫЙ ВЕРХНИЙ ══ */}
          {logo ? (
            <image
              href={logo}
              x={LOGO_X} y={LOGO_Y}
              width={LOGO_W} height={LOGO_H}
              preserveAspectRatio="xMidYMid meet"
              clipPath={`url(#fc-${u})`}
            />
          ) : (
            <text
              x={FC_X} y={FC_Y}
              textAnchor="middle" dominantBaseline="middle"
              fill="white" fontSize="34" fontWeight="900"
              fontFamily="Inter, system-ui, sans-serif"
              clipPath={`url(#fc-${u})`}
            >
              {initials}
            </text>
          )}
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

function p(...coords) {
  return coords.map(([x, y]) => `${x},${y}`).join(' ')
}

function plural(n) {
  const m10 = n % 10, m100 = n % 100
  if (m100 >= 11 && m100 <= 19) return 'подарков'
  if (m10 === 1) return 'подарок'
  if (m10 >= 2 && m10 <= 4) return 'подарка'
  return 'подарков'
}
