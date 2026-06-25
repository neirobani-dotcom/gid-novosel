import { useState, useCallback, useRef } from 'react'

export default function PhotoSlider({
  images,
  height = 200,
  borderRadius = 16,
  onPhotoClick = null,
  objectFit = 'cover',
  background = '#EDE8E0',
  autoHeight = false,
  overflow = 'hidden',
  showDots = false,
}) {
  const [idx, setIdx] = useState(0)
  const touchStartX = useRef(null)

  const goPrev = useCallback((e) => {
    e.stopPropagation()
    setIdx(i => (i - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback((e) => {
    e.stopPropagation()
    setIdx(i => (i + 1) % images.length)
  }, [images.length])

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) setIdx(i => (i + 1) % images.length)
      else setIdx(i => (i - 1 + images.length) % images.length)
    }
    touchStartX.current = null
  }, [images.length])

  if (!images?.length) return null

  const multi = images.length > 1

  if (autoHeight) {
    return (
      <div
        style={{ position: 'relative', width: '100%', borderRadius, overflow: 'hidden', background }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[idx]}
          alt={`Фото ${idx + 1}`}
          loading="lazy"
          onClick={onPhotoClick ? (e) => { e.stopPropagation(); onPhotoClick(idx) } : undefined}
          style={{
            width: '100%', height: 'auto', objectFit: 'contain',
            display: 'block',
            cursor: onPhotoClick ? 'zoom-in' : 'default',
          }}
        />
        {multi && (
          <>
            <button onClick={goPrev} style={{ position:'absolute', left:8, top:'50%', transform:'translateY(-50%)', zIndex:3, width:32, height:32, borderRadius:'50%', background:'rgba(0,0,0,0.48)', border:'none', color:'#fff', fontSize:20, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>‹</button>
            <button onClick={goNext} style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', zIndex:3, width:32, height:32, borderRadius:'50%', background:'rgba(0,0,0,0.48)', border:'none', color:'#fff', fontSize:20, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>›</button>
            <div style={{ position:'absolute', bottom:8, right:8, zIndex:3, background:'rgba(0,0,0,0.5)', color:'#fff', fontSize:10, fontWeight:600, padding:'3px 8px', borderRadius:10 }}>{idx + 1} / {images.length}</div>
          </>
        )}
      </div>
    )
  }

  return (
    <div
      style={{ position: 'relative', width: '100%', height, borderRadius, overflow, background, flexShrink: 0, display: 'block' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Фото ${i + 1}`}
          loading="lazy"
          onClick={onPhotoClick && i === idx ? (e) => { e.stopPropagation(); onPhotoClick(i) } : undefined}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit, display: 'block',
            opacity: i === idx ? 1 : 0,
            transition: 'opacity 0.28s ease',
            cursor: onPhotoClick && i === idx ? 'zoom-in' : 'default',
            pointerEvents: i === idx ? 'auto' : 'none',
          }}
        />
      ))}

      {multi && (
        <>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
            background: 'linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 55%)',
          }} />

          <button onClick={goPrev} style={{
            position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
            zIndex: 3, width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(0,0,0,0.48)', border: 'none',
            color: '#fff', fontSize: 20, cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none',
          }}>‹</button>

          <button onClick={goNext} style={{
            position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
            zIndex: 3, width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(0,0,0,0.48)', border: 'none',
            color: '#fff', fontSize: 20, cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none',
          }}>›</button>

          {showDots ? (
            <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4, zIndex: 3 }}>
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setIdx(i) }}
                  style={{
                    width: i === idx ? 18 : 5, height: 5, borderRadius: 3, border: 'none', padding: 0, cursor: 'pointer',
                    background: i === idx ? '#E8621A' : 'rgba(255,255,255,0.5)',
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </div>
          ) : (
            <div style={{
              position: 'absolute', bottom: 8, right: 8, zIndex: 3,
              background: 'rgba(0,0,0,0.5)', color: '#fff',
              fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 10, lineHeight: 1.5,
            }}>
              {idx + 1} / {images.length}
            </div>
          )}
        </>
      )}
    </div>
  )
}
