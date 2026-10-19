import { useEffect, useRef, useState } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const glowRef = useRef(null)
  const dotRef = useRef(null)
  const [allowCursor, setAllowCursor] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    setAllowCursor(!reduced && finePointer && window.innerWidth > 900)
    if (reduced) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let width = 0
    let height = 0
    let raf = 0
    let running = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }
    let particles = []

    const count = () => {
      if (window.innerWidth < 640) return 26
      if (window.innerWidth < 1100) return 52
      return 84
    }

    const spawn = () => {
      particles = Array.from({ length: count() }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.6 + 0.7,
      }))
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      spawn()
    }

    const onPointerMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onPointerLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const step = () => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      const linkDist = width < 640 ? 104 : 132

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const distSq = dx * dx + dy * dy
        if (distSq < 20000 && distSq > 1) {
          const dist = Math.sqrt(distSq)
          p.vx += (dx / dist) * 0.012
          p.vy += (dy / dist) * 0.012
        }

        p.vx *= 0.995
        p.vy *= 0.995
        p.x += p.vx
        p.y += p.vy

        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(130, 170, 255, 0.55)'
        ctx.fill()

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j]
          const ddx = p.x - q.x
          const ddy = p.y - q.y
          const d2 = ddx * ddx + ddy * ddy
          if (d2 < linkDist * linkDist) {
            const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.3
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(47, 107, 255, ${alpha.toFixed(3)})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      if (mouse.x > -999) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 230)
        glow.addColorStop(0, 'rgba(47, 107, 255, 0.13)')
        glow.addColorStop(1, 'rgba(47, 107, 255, 0)')
        ctx.fillStyle = glow
        ctx.fillRect(mouse.x - 230, mouse.y - 230, 460, 460)
      }

      raf = requestAnimationFrame(step)
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        raf = requestAnimationFrame(step)
      }
    }

    resize()
    raf = requestAnimationFrame(step)

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!allowCursor) return undefined
    const glow = glowRef.current
    const dot = dotRef.current
    if (!glow || !dot) return undefined

    let gx = -400
    let gy = -400
    let dx = -400
    let dy = -400
    let tx = -400
    let ty = -400
    let raf = 0

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
      const interactive = e.target.closest?.('a, button, input, textarea, select, [role="button"]')
      dot.classList.toggle('is-hover', Boolean(interactive))
    }

    const loop = () => {
      gx += (tx - gx) * 0.12
      gy += (ty - gy) * 0.12
      dx += (tx - dx) * 0.35
      dy += (ty - dy) * 0.35
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [allowCursor])

  return (
    <>
      <canvas ref={canvasRef} className="particles" aria-hidden="true" />
      {allowCursor && (
        <>
          <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
          <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
        </>
      )}
    </>
  )
}
