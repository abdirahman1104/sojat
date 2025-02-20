'use client'

import { useEffect, useRef } from 'react'

export function AnimatedGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame: number
    let gradient: CanvasGradient
    let hue = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = () => {
      hue = (hue + 0.2) % 360
      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, 0.8)`)
      gradient.addColorStop(0.5, `hsla(${(hue + 60) % 360}, 70%, 60%, 0.8)`)
      gradient.addColorStop(1, `hsla(${(hue + 120) % 360}, 70%, 60%, 0.8)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      frame = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-screen w-screen opacity-30"
    />
  )
}
