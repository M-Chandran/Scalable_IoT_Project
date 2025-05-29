import { Card, CardContent } from "@/components/ui/card"

export function StatsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by Industry Leaders</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our platform processes billions of data points daily for companies worldwide.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          <StatCard value="10M+" label="IoT Devices" />
          <StatCard value="5B+" label="Data Points Daily" />
          <StatCard value="99.99%" label="Uptime" />
          <StatCard value="500+" label="Enterprise Clients" />
        </div>
      </div>
    </section>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <p className="text-4xl font-bold text-primary">{value}</p>
        <p className="mt-2 text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  )
}

