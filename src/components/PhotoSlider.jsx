import { useState, useCallback } from 'react'

export default function PhotoSlider({
  images,
  height = 200,
  borderRadius = 16,
  onPhotoClick = null,
  objectFit = 'cover',
  background = '#EDE8E0',
  autoHeight = false,
  overflow = 'hidden',
}) {
  const [idx, setIdx] = useState(0)

  const goPrev = useCallback((e) => {
    e.stopPropagation()
    setIdx(i => (i - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback((e) => {
    e.stopPropagation()
    setIdx(i => (i + 1) % images.length)
  }, [images.length])

  if (!images?.length) return null

  const multi = images.length > 1

  // Режим autoHeight: высота определяется самим фото, без обрезки
  if (autoHeight) {
    return (
      <div style={{ position: 'relative', width: '100%', borderRadius, overflow: 'hidden', background }}>
        <img
          src={images[idx]}
          alt={`Фото ${idx + 1}`}
          onClick={onPhotoClick ? (e) => { e.stopPropagation(); onPhotoClick(idx) } : undefined}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
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
      style={{
        position: 'relative',
        width: '100%',
        height,
        borderRadius,
        overflow,
        background,
        flexShrink: 0,
        display: 'block',
      }}
    >
      {/* Все фото абсолютные — виден только текущий */}
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Фото ${i + 1}`}
          onClick={onPhotoClick && i === idx ? (e) => { e.stopPropagation(); onPhotoClick(i) } : undefined}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit,
            display: 'block',
            opacity: i === idx ? 1 : 0,
            transition: 'opacity 0.28s ease',
            cursor: onPhotoClick && i === idx ? 'zoom-in' : 'default',
            pointerEvents: i === idx ? 'auto' : 'none',
          }}
        />
      ))}

      {/* Навигация — только если фото больше одного */}
      {multi && (
        <>
          {/* Затемнение снизу */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
            background: 'linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 55%)',
          }} />

          {/* Стрелка влево */}
          <button
            onClick={goPrev}
            style={{
              position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
              zIndex: 3, width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(0,0,0,0.48)', border: 'none',
              color: '#fff', fontSize: 20, lineHeight: '32px', textAlign: 'center',
              cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              userSelect: 'none',
            }}
          >‹</button>

          {/* Стрелка вправо */}
          <button
            onClick={goNext}
            style={{
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
              zIndex: 3, width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(0,0,0,0.48)', border: 'none',
              color: '#fff', fontSize: 20, lineHeight: '32px', textAlign: 'center',
              cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              userSelect: 'none',
            }}
          >›</button>

          {/* Счётчик */}
          <div style={{
            position: 'absolute', bottom: 8, right: 8, zIndex: 3,
            background: 'rgba(0,0,0,0.5)', color: '#fff',
            fontSize: 10, fontWeight: 600,
            padding: '3px 8px', borderRadius: 10, lineHeight: 1.5,
          }}>
            {idx + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  )
}
