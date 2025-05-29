import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Ready to Transform Your IoT Infrastructure?
        </h2>
        <p className="mt-4 text-xl max-w-2xl mx-auto opacity-90">
          Join thousands of companies that have revolutionized their IoT operations with our platform.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/support">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground hover:bg-primary-foreground/10"
            >
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

