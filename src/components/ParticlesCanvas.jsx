import { useEffect, useRef } from 'react'

const COLORS = ['#E8621A', '#F5A623', '#E8621A', '#E8621A', '#F5A623', '#FF8C42']
const COUNT = 72
const MAX_DIST = 130
const MAX_SPEED = 0.28

function rand(min, max) {
  return Math.random() * (max - min) + min
}

export default function ParticlesCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animId
    let w = 0
    let h = 0

    const particles = []

    const init = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h

      if (particles.length === 0) {
        for (let i = 0; i < COUNT; i++) {
          let vx = rand(-MAX_SPEED, MAX_SPEED)
          let vy = rand(-MAX_SPEED, MAX_SPEED)
          // ensure minimum movement
          if (Math.abs(vx) < 0.05) vx = vx < 0 ? -0.05 : 0.05
          if (Math.abs(vy) < 0.05) vy = vy < 0 ? -0.05 : 0.05
          particles.push({
            x: rand(0, w),
            y: rand(0, h),
            vx,
            vy,
            r: rand(1, 2.5),
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: rand(0.35, 0.9),
          })
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // Draw connecting lines first (under particles)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.18
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(232, 98, 26, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw and move particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.fill()
        ctx.globalAlpha = 1

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -8) p.x = w + 8
        else if (p.x > w + 8) p.x = -8
        if (p.y < -8) p.y = h + 8
        else if (p.y > h + 8) p.y = -8
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()

    const onResize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  )
}
