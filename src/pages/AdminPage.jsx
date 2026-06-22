import { useState, useEffect } from 'react'
import logoSrc from '/site-logo.jpg'
import { companies } from '../data/companies'

export default function AdminPage({ onBack }) {
  const [activations, setActivations] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('gid_activations') || '[]')
    setActivations(data)
  }, [])

  const totalGifts = activations.reduce((s, a) => s + (a.giftAmount || 0), 0)

  const byCompany = companies.map(c => ({
    ...c,
    count: activations.filter(a => a.companyId === c.id).length,
  }))

  function clearAll() {
    if (confirm('Удалить все заявки?')) {
      localStorage.removeItem('gid_activations')
      setActivations([])
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#F7F4F0' }}>

      {/* Шапка */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3"
        style={{ background: 'rgba(247,244,240,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #EDE8E0' }}>
        <div className="flex items-center gap-3">
          <button onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
            style={{ background: '#FFF', border: '1px solid #EDE8E0', color: '#6B6560' }}>
            ←
          </button>
          <img src={logoSrc} alt="Гид Новосёла" style={{ height: 30, width: 'auto' }} className="flex-shrink-0 logo-neon" />
          <p className="text-sm font-bold" style={{ color: '#1A1816' }}>Статистика</p>
        </div>
        {activations.length > 0 && (
          <button onClick={clearAll}
            className="text-xs font-medium transition-colors hover:text-red-500"
            style={{ color: '#A09890' }}>
            Очистить
          </button>
        )}
      </div>

      <div className="max-w-md mx-auto px-4 py-6">

        {/* Итого */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-2xl p-4"
            style={{ background: '#FFF', border: '1px solid #EDE8E0', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#A09890' }}>
              Заявок
            </p>
            <p className="text-3xl font-extrabold" style={{ color: '#1A1816' }}>{activations.length}</p>
          </div>
          <div className="rounded-2xl p-4"
            style={{ background: '#FFF', border: '1px solid #EDE8E0', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#A09890' }}>
              Подарков
            </p>
            <p className="text-2xl font-extrabold" style={{ color: '#E8621A', letterSpacing: '-0.02em' }}>
              {totalGifts.toLocaleString('ru-RU')} ₽
            </p>
          </div>
        </div>

        {/* По компаниям */}
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#A09890' }}>
          По компаниям
        </p>
        <div className="flex flex-col gap-2 mb-6">
          {byCompany.map(c => {
            const initials = c.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
            return (
              <div key={c.id}
                className="flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{ background: '#FFF', border: '1px solid #EDE8E0', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: c.color || '#E8621A' }}>
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: '#1A1816' }}>{c.name}</p>
                  <p className="text-[10px] truncate" style={{ color: '#A09890' }}>{c.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xl font-extrabold" style={{ color: '#E8621A' }}>{c.count}</p>
                  <p className="text-[10px]" style={{ color: '#A09890' }}>заявок</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Последние заявки / пустое состояние */}
        {activations.length > 0 ? (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#A09890' }}>
              Последние заявки
            </p>
            <div className="flex flex-col gap-3">
              {activations.map(a => (
                <div key={a.id}
                  className="rounded-2xl p-4"
                  style={{ background: '#FFF', border: '1px solid #EDE8E0', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#1A1816' }}>{a.name}</p>
                      <p className="text-xs" style={{ color: '#6B6560' }}>{a.phone}</p>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0 ml-2"
                      style={{ background: '#FFF3E8', color: '#C25820' }}>
                      {a.giftLabel}
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: '#A09890' }}>📍 {a.address}</p>
                  <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid #F0EBE3' }}>
                    <p className="text-[10px]" style={{ color: '#A09890' }}>{a.companyName}</p>
                    <p className="text-[10px]" style={{ color: '#A09890' }}>
                      {new Date(a.createdAt).toLocaleString('ru-RU', {
                        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-3"
              style={{ background: '#FFF3E8' }}>
              📊
            </div>
            <p className="text-sm" style={{ color: '#A09890' }}>Заявок пока нет</p>
          </div>
        )}
      </div>
    </div>
  )
}
