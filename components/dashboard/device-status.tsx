"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Device {
  id: string
  name: string
  type: string
  status: "online" | "offline" | "warning"
  lastSeen: string
}

export function DeviceStatus() {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setDevices([
        {
          id: "dev-001",
          name: "Temperature Sensor A1",
          type: "Sensor",
          status: "online",
          lastSeen: "Just now",
        },
        {
          id: "dev-002",
          name: "Humidity Controller B2",
          type: "Controller",
          status: "online",
          lastSeen: "2 minutes ago",
        },
        {
          id: "dev-003",
          name: "Pressure Monitor C3",
          type: "Monitor",
          status: "warning",
          lastSeen: "5 minutes ago",
        },
        {
          id: "dev-004",
          name: "Gateway Device D4",
          type: "Gateway",
          status: "offline",
          lastSeen: "3 hours ago",
        },
        {
          id: "dev-005",
          name: "Motion Sensor E5",
          type: "Sensor",
          status: "online",
          lastSeen: "Just now",
        },
      ])
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-xl">Device Status</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="p-4 transition-all duration-200 border rounded-lg hover:bg-accent/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{device.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {device.type} • {device.lastSeen}
                      </p>
                    </div>
                    <Badge
                      variant={
                        device.status === "online" ? "default" : device.status === "warning" ? "outline" : "destructive"
                      }
                    >
                      {device.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

