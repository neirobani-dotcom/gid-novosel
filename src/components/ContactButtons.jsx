const WEB3FORMS_KEY = '2c502e1a-5b57-43a0-b56f-9ffa8c423793'

const MSG = encodeURIComponent(
  'Здравствуйте! Я новосёл, нашёл вас на сайте gidnovosela.ru. Хочу узнать подробнее о подарке для новосёлов.'
)

const trackClick = async (channel, phone, partnerName) => {
  try {
    const now = new Date()
    const timeStr = now.toLocaleString('ru-RU', {
      timeZone: 'Asia/Krasnoyarsk',
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
    const channelColor = channel === 'WhatsApp' ? '#25D366'
      : channel === 'Telegram' ? '#0088CC'
      : '#7B2FBE'

    const fd = new FormData()
    fd.append('access_key', WEB3FORMS_KEY)
    fd.append('subject', `📱 Новый контакт — ${partnerName} (${channel})`)
    fd.append('from_name', 'Гид Новосёла')
    fd.append('message', `Клик: ${channel}\nПартнёр: ${partnerName}\nНомер: ${phone}\nВремя: ${timeStr} (Красноярск)\nСтраница: ${window.location.href}`)
    await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
  } catch (e) {
    console.log('track:', channel, partnerName)
  }
}

const BtnStyles = {
  whatsapp: { background: '#25D366', hover: '#1da851' },
  telegram:  { background: '#0088CC', hover: '#006fa3' },
  max:       { background: '#7B2FBE', hover: '#5a1f8a' },
}

function MsgBtn({ href, color, hoverColor, label, onClick }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      onMouseEnter={e => { e.currentTarget.style.background = hoverColor }}
      onMouseLeave={e => { e.currentTarget.style.background = color }}
      style={{
        flex: 1, textAlign: 'center', padding: '9px 14px',
        background: color, color: 'white',
        borderRadius: 10, fontSize: 13, fontWeight: 600,
        textDecoration: 'none', display: 'block',
        transition: 'background 0.2s',
      }}
    >
      {label}
    </a>
  )
}

export default function ContactButtons({ phones, partnerName }) {
  if (!phones || phones.length === 0) return null

  return (
    <div style={{ marginTop: 16 }}>
      <p style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Написать партнёру:</p>
      {phones.map((p, i) => {
        const raw = p.number.replace(/\D/g, '')
        const intl = raw.startsWith('8') ? '7' + raw.slice(1) : raw
        return (
          <div key={i}>
            {phones.length > 1 && (
              <p style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>{p.friendly}:</p>
            )}
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <MsgBtn
                href={`https://wa.me/${intl}?text=${MSG}`}
                color={BtnStyles.whatsapp.background}
                hoverColor={BtnStyles.whatsapp.hover}
                label="💬 WA"
                onClick={() => trackClick('WhatsApp', p.friendly, partnerName)}
              />
              <MsgBtn
                href={`https://t.me/+${intl}`}
                color={BtnStyles.telegram.background}
                hoverColor={BtnStyles.telegram.hover}
                label="✈️ TG"
                onClick={() => trackClick('Telegram', p.friendly, partnerName)}
              />
              <MsgBtn
                href={`https://i.max.ru/phone/${intl}`}
                color={BtnStyles.max.background}
                hoverColor={BtnStyles.max.hover}
                label="⚡ MAX"
                onClick={() => trackClick('MAX', p.friendly, partnerName)}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
