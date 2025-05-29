import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TestimonialSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from the companies that have transformed their IoT operations with our platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <TestimonialCard
            quote="This platform revolutionized how we manage our smart city infrastructure. Real-time insights have improved our operational efficiency by 40%."
            name="Sarah Johnson"
            role="CTO, Smart City Solutions"
            avatar="/placeholder.svg"
          />
          <TestimonialCard
            quote="The security features and blockchain integration give us peace of mind when dealing with sensitive industrial IoT data."
            name="Michael Chen"
            role="Head of IoT, Industrial Innovations"
            avatar="/placeholder.svg"
          />
          <TestimonialCard
            quote="We've been able to scale our IoT network from hundreds to thousands of devices without any performance issues. Impressive platform!"
            name="Elena Rodriguez"
            role="IoT Architect, Connected Health"
            avatar="/placeholder.svg"
          />
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ quote, name, role, avatar }: { quote: string; name: string; role: string; avatar: string }) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6 flex flex-col h-full">
        <blockquote className="flex-1 text-lg italic mb-6">"{quote}"</blockquote>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

