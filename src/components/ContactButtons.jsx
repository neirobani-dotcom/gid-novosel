import { useState } from 'react'

const WEB3FORMS_KEY = '2c502e1a-5b57-43a0-b56f-9ffa8c423793'

const MSG = encodeURIComponent(
  'Здравствуйте! Я новосёл, нашёл вас на сайте gidnovosela.ru. Хочу узнать подробнее о подарке для новосёлов.'
)

const formatPhone = (input) => {
  const raw = input.replace(/\D/g, '')
  if (!raw) return ''
  let d = raw.startsWith('7') ? raw : raw.startsWith('8') ? '7' + raw.slice(1) : '7' + raw
  d = d.substring(0, 11)
  if (d.length <= 1) return '+7'
  if (d.length <= 4) return '+7 (' + d.substring(1)
  if (d.length <= 7) return '+7 (' + d.substring(1,4) + ') ' + d.substring(4)
  if (d.length <= 9) return '+7 (' + d.substring(1,4) + ') ' + d.substring(4,7) + '-' + d.substring(7)
  return '+7 (' + d.substring(1,4) + ') ' + d.substring(4,7) + '-' + d.substring(7,9) + '-' + d.substring(9,11)
}

const sendReport = async (userName, userPhone, partnerName, messenger) => {
  try {
    const now = new Date()
    const timeStr = now.toLocaleString('ru-RU', {
      timeZone: 'Asia/Krasnoyarsk',
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
    const fd = new FormData()
    fd.append('access_key', WEB3FORMS_KEY)
    fd.append('subject', `💬 ${userName} хочет написать — ${partnerName}`)
    fd.append('from_name', 'Гид Новосёла')
    fd.append('message', [
      `Клиент: ${userName}`,
      `Телефон: ${userPhone}`,
      `Партнёр: ${partnerName}`,
      `Мессенджер: ${messenger}`,
      `Время: ${timeStr} (Красноярск)`,
      `Страница: ${window.location.href}`,
    ].join('\n'))
    await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
  } catch (e) {
    console.log('track:', messenger, partnerName)
  }
}

const IconChat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#E8621A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)

const IconUser = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const IconChatWhite = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)

const IconWA = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

const IconTG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

export default function ContactButtons({ phones, partnerName, messengers }) {
  const [open, setOpen]           = useState(false)
  const [step, setStep]           = useState('A')
  const [name, setName]           = useState('')
  const [phone, setPhone]         = useState('')
  const [nameTouched, setNT]      = useState(false)
  const [phoneTouched, setPT]     = useState(false)
  const [btnHover, setBtnHover]   = useState(false)
  const [subHover, setSubHover]   = useState(null)

  if (!phones?.length || !messengers?.length) return null

  const firstNum = phones[0].number.replace(/\D/g, '')
  const intl = firstNum.startsWith('8') ? '7' + firstNum.slice(1) : firstNum

  const links = {
    whatsapp: `https://wa.me/${intl}?text=${MSG}`,
    telegram: `https://t.me/+${intl}`,
    max: `https://i.max.ru/phone/${intl}`,
  }

  const nameValid  = name.trim().length >= 2
  const phoneValid = phone.replace(/\D/g, '').length === 11
  const canContinue = nameValid && phoneValid

  const openPopup = () => { setOpen(true); setStep('A') }
  const closePopup = () => {
    setOpen(false)
    setTimeout(() => {
      setStep('A'); setName(''); setPhone('')
      setNT(false); setPT(false)
    }, 300)
  }

  const handleContinue = () => {
    setNT(true); setPT(true)
    if (canContinue) setStep('B')
  }

  const handleMessenger = (channel) => {
    sendReport(name, phone, partnerName, channel)
  }

  const messengerConfig = [
    {
      key: 'whatsapp',
      label: 'Написать в WhatsApp',
      icon: <IconWA />,
      bg: 'linear-gradient(135deg,#25D366,#128C7E)',
      shadow: 'rgba(37,211,102,0.3)',
      shadowHover: 'rgba(37,211,102,0.4)',
    },
    {
      key: 'telegram',
      label: 'Написать в Telegram',
      icon: <IconTG />,
      bg: 'linear-gradient(135deg,#2AABEE,#0088CC)',
      shadow: 'rgba(0,136,204,0.3)',
      shadowHover: 'rgba(0,136,204,0.4)',
    },
    {
      key: 'max',
      label: 'Написать в MAX',
      icon: <span style={{ fontSize: 22, lineHeight: 1 }}>⚡</span>,
      bg: 'linear-gradient(135deg,#9B59B6,#7B2FBE)',
      shadow: 'rgba(123,47,190,0.3)',
      shadowHover: 'rgba(123,47,190,0.4)',
    },
  ].filter(m => messengers.includes(m.key))

  const nameBorder = nameTouched
    ? (nameValid ? '1.5px solid #22C55E' : '1.5px solid #EF4444')
    : '1.5px solid #E8E8E8'
  const phoneBorder = phoneTouched
    ? (phoneValid ? '1.5px solid #22C55E' : '1.5px solid #EF4444')
    : '1.5px solid #E8E8E8'

  return (
    <>
      {/* ── Триггер-кнопка ── */}
      <button
        onClick={openPopup}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        style={{
          width: '100%', height: 48,
          borderRadius: 14,
          background: 'linear-gradient(135deg,#ffffff 0%,#fff8f4 100%)',
          border: `1.5px solid ${btnHover ? 'rgba(232,98,26,0.6)' : 'rgba(232,98,26,0.25)'}`,
          boxShadow: btnHover
            ? '0 4px 20px rgba(232,98,26,0.15)'
            : '0 2px 12px rgba(232,98,26,0.08)',
          cursor: 'pointer',
          transform: btnHover ? 'translateY(-1px)' : 'none',
          transition: 'all 0.25s ease',
          display: 'flex', alignItems: 'center',
          padding: '0 14px', gap: 12,
          animation: 'chat-pulse 4s ease-in-out infinite',
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(232,98,26,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <IconChat />
        </div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.2 }}>
            Написать партнёру
          </div>
          <div style={{ fontSize: 11, color: btnHover ? '#E8621A' : '#999', marginTop: 2, transition: 'color 0.25s' }}>
            WhatsApp · Telegram · MAX
          </div>
        </div>
        <span style={{ color: '#E8621A', fontSize: 18, fontWeight: 600 }}>›</span>
      </button>

      {/* ── Попап ── */}
      {open && (
        <div
          onClick={closePopup}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16,
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 360,
              background: 'white',
              borderRadius: 24,
              padding: '32px 28px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
              animation: 'slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {step === 'A' ? (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                {/* Иконка */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#FF8C42,#E8621A)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <IconUser />
                  </div>
                </div>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#1a1a1a', textAlign: 'center', margin: 0 }}>
                  Представьтесь, пожалуйста
                </p>
                <p style={{ fontSize: 13, color: '#999', textAlign: 'center', marginTop: 6, marginBottom: 24 }}>
                  Чтобы открыть контакт партнёра
                </p>

                {/* Поле имени */}
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={e => {
                    setName(e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z\s]/g, ''))
                    setNT(true)
                  }}
                  onFocus={e => { e.target.style.borderColor = '#E8621A' }}
                  onBlur={e => {
                    setNT(true)
                    e.target.style.borderColor = nameTouched
                      ? (nameValid ? '#22C55E' : '#EF4444')
                      : '#E8E8E8'
                  }}
                  style={{
                    width: '100%', height: 52, borderRadius: 14,
                    border: nameBorder,
                    padding: '0 16px', fontSize: 15,
                    outline: 'none', boxSizing: 'border-box',
                    fontFamily: 'inherit', marginBottom: 12,
                    transition: 'border-color 0.2s',
                  }}
                />

                {/* Поле телефона */}
                <input
                  type="tel"
                  placeholder="+7 (_) _-_-_"
                  value={phone}
                  onChange={e => {
                    setPhone(formatPhone(e.target.value))
                    setPT(true)
                  }}
                  onFocus={e => { e.target.style.borderColor = '#E8621A' }}
                  onBlur={e => {
                    setPT(true)
                    e.target.style.borderColor = phoneTouched
                      ? (phoneValid ? '#22C55E' : '#EF4444')
                      : '#E8E8E8'
                  }}
                  style={{
                    width: '100%', height: 52, borderRadius: 14,
                    border: phoneBorder,
                    padding: '0 16px', fontSize: 15,
                    outline: 'none', boxSizing: 'border-box',
                    fontFamily: 'inherit', marginBottom: 20,
                    transition: 'border-color 0.2s',
                  }}
                />

                {/* Кнопка продолжить */}
                <button
                  onClick={handleContinue}
                  disabled={!canContinue}
                  onMouseEnter={e => {
                    if (canContinue) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,98,26,0.4)'
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  style={{
                    width: '100%', height: 52, borderRadius: 14,
                    background: canContinue
                      ? 'linear-gradient(135deg,#FF8C42,#E8621A)'
                      : '#E0E0E0',
                    color: canContinue ? 'white' : '#999',
                    border: 'none', fontSize: 16, fontWeight: 700,
                    cursor: canContinue ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Продолжить →
                </button>

                <p
                  onClick={closePopup}
                  style={{
                    textAlign: 'center', fontSize: 13, color: '#999',
                    marginTop: 14, cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#666' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#999' }}
                >
                  Отмена
                </p>
              </div>
            ) : (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                {/* Иконка */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#25D366,#128C7E)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <IconChatWhite />
                  </div>
                </div>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#1a1a1a', textAlign: 'center', margin: 0 }}>
                  Выберите мессенджер
                </p>
                <p style={{ fontSize: 13, color: '#999', textAlign: 'center', marginTop: 6, marginBottom: 24 }}>
                  {partnerName}
                </p>

                {messengerConfig.map((m, i) => (
                  <a
                    key={m.key}
                    href={links[m.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleMessenger(m.key)}
                    onMouseEnter={e => {
                      setSubHover(m.key)
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = `0 8px 24px ${m.shadowHover}`
                    }}
                    onMouseLeave={e => {
                      setSubHover(null)
                      e.currentTarget.style.transform = 'none'
                      e.currentTarget.style.boxShadow = `0 4px 16px ${m.shadow}`
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: 12,
                      height: 58, borderRadius: 16, width: '100%',
                      background: m.bg,
                      color: 'white', fontSize: 16, fontWeight: 700,
                      boxShadow: `0 4px 16px ${m.shadow}`,
                      textDecoration: 'none',
                      marginBottom: i < messengerConfig.length - 1 ? 12 : 0,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                  >
                    {m.icon}
                    {m.label}
                  </a>
                ))}

                <p style={{ fontSize: 11, color: '#ccc', textAlign: 'center', marginTop: 16 }}>
                  Нажимая кнопку, вы соглашаетесь на обработку данных
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
