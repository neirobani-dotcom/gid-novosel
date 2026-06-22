import { useState } from 'react'

export default function PhotoSlider({
  images,
  height = 200,
  borderRadius = 16,
  onPhotoClick = null,
}) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState('right')

  if (!images?.length) return null

  const single = images.length === 1

  function goPrev(e) {
    e.stopPropagation()
    setDir('left')
    setIdx(i => (i - 1 + images.length) % images.length)
  }

  function goNext(e) {
    e.stopPropagation()
    setDir('right')
    setIdx(i => (i + 1) % images.length)
  }

  function handlePhotoClick(e) {
    e.stopPropagation()
    onPhotoClick?.(idx)
  }

  return (
    <div
      style={{
        position: 'relative',
        height,
        borderRadius,
        overflow: 'hidden',
        background: '#F0EBE3',
        flexShrink: 0,
      }}
    >
      {/* Единственная видимая фотография */}
      <img
        key={`${idx}-${dir}`}
        src={images[idx]}
        alt={`Фото ${idx + 1}`}
        className={dir === 'right' ? 'slide-from-right' : 'slide-from-left'}
        onClick={onPhotoClick ? handlePhotoClick : undefined}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          cursor: onPhotoClick ? 'zoom-in' : 'default',
        }}
      />

      {/* Стрелки и счётчик — только если фото больше одного */}
      {!single && (
        <>
          {/* Затемнение снизу для читаемости счётчика */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)',
          }} />

          {/* Стрелка влево */}
          <button
            onClick={goPrev}
            style={{
              position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)',
              width: 30, height: 30, borderRadius: '50%',
              background: 'rgba(0,0,0,0.42)', color: '#fff',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, lineHeight: 1, zIndex: 2,
              WebkitTapHighlightColor: 'transparent',
            }}
          >‹</button>

          {/* Стрелка вправо */}
          <button
            onClick={goNext}
            style={{
              position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
              width: 30, height: 30, borderRadius: '50%',
              background: 'rgba(0,0,0,0.42)', color: '#fff',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, lineHeight: 1, zIndex: 2,
              WebkitTapHighlightColor: 'transparent',
            }}
          >›</button>

          {/* Счётчик */}
          <div style={{
            position: 'absolute', bottom: 7, right: 8, zIndex: 2,
            background: 'rgba(0,0,0,0.42)',
            color: '#fff', fontSize: 10, fontWeight: 600,
            padding: '2px 8px', borderRadius: 10, lineHeight: 1.6,
          }}>
            {idx + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  )
}
