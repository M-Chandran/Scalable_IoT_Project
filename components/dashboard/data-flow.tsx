"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DataFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = 300
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle system
    const particles: Particle[] = []
    const connections: Connection[] = []

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 2
        this.speedY = (Math.random() - 0.5) * 2
        this.color = `hsl(${Math.random() * 60 + 200}, 100%, 50%)`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    class Connection {
      from: Particle
      to: Particle
      life: number
      maxLife: number

      constructor(from: Particle, to: Particle) {
        this.from = from
        this.to = to
        this.maxLife = 100 + Math.random() * 150
        this.life = this.maxLife
      }

      update() {
        this.life--
      }

      draw() {
        if (!ctx) return
        const alpha = this.life / this.maxLife
        ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`
        ctx.lineWidth = alpha * 2
        ctx.beginPath()
        ctx.moveTo(this.from.x, this.from.y)
        ctx.lineTo(this.to.x, this.to.y)
        ctx.stroke()
      }
    }

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Create new connections randomly
      if (Math.random() < 0.1 && particles.length >= 2) {
        const from = particles[Math.floor(Math.random() * particles.length)]
        const to = particles[Math.floor(Math.random() * particles.length)]
        if (from !== to) {
          connections.push(new Connection(from, to))
        }
      }

      // Update and draw connections
      for (let i = connections.length - 1; i >= 0; i--) {
        connections[i].update()
        connections[i].draw()

        // Remove dead connections
        if (connections[i].life <= 0) {
          connections.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-xl">Data Flow</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <canvas ref={canvasRef} className="w-full h-[300px]" />
      </CardContent>
    </Card>
  )
}

