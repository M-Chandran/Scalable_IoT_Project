import Link from "next/link"
import { ArrowRight, Database, Lock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/home/hero-section"
import { FeatureCard } from "@/components/home/feature-card"
import { DataFlowAnimation } from "@/components/home/data-flow-animation"
import { TestimonialSection } from "@/components/home/testimonial-section"
import { StatsSection } from "@/components/home/stats-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />

      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Powerful IoT Management Features
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform provides everything you need to manage your IoT ecosystem efficiently and securely.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Zap className="w-10 h-10 text-primary" />}
              title="Real-Time Processing"
              description="Process millions of data points per second with our high-performance architecture."
            />
            <FeatureCard
              icon={<Database className="w-10 h-10 text-primary" />}
              title="Scalable Storage"
              description="Hybrid edge-cloud storage solution that scales with your IoT infrastructure."
            />
            <FeatureCard
              icon={<Lock className="w-10 h-10 text-primary" />}
              title="Blockchain Security"
              description="Immutable audit trails and tamper-proof data storage for maximum security."
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Visualize Your IoT Data Flow</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Watch your data move in real-time from edge devices through processing pipelines to storage and
                analytics.
              </p>
              <div className="mt-8">
                <Link href="/dashboard">
                  <Button className="group">
                    Explore Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 h-[400px]">
              <DataFlowAnimation />
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <TestimonialSection />
      <CTASection />
    </div>
  )
}

