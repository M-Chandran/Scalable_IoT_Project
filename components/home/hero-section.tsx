"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      const elements = containerRef.current.querySelectorAll(".parallax")
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement
        const speed = Number.parseFloat(htmlEl.getAttribute("data-speed") || "1")
        const xOffset = x * 20 * speed
        const yOffset = y * 20 * speed
        htmlEl.style.transform = `translate(${xOffset}px, ${yOffset}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMobile])

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>

      <div ref={containerRef} className="container relative z-10 px-4 mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Next-Generation</span>
              <span className="block text-primary">IoT Data Management</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Seamlessly connect, process, and analyze your IoT ecosystem with our powerful, secure, and scalable
              platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/dashboard">
                <Button size="lg" className="group">
                  Explore Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/support">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative mt-16 w-full max-w-4xl h-[400px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass rounded-2xl p-8 w-full max-w-2xl">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="parallax neumorphic bg-card rounded-lg p-4 flex flex-col items-center justify-center aspect-square"
                      data-speed={i * 0.2}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 mb-2"></div>
                      <div className="h-2 w-16 bg-muted-foreground/20 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

