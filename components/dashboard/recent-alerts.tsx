"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Info, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Alert {
  id: string
  type: "info" | "warning" | "error"
  message: string
  device: string
  time: string
}

export function RecentAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setAlerts([
        {
          id: "alert-001",
          type: "error",
          message: "Connection lost with device",
          device: "Gateway Device D4",
          time: "3 hours ago",
        },
        {
          id: "alert-002",
          type: "warning",
          message: "High temperature detected",
          device: "Temperature Sensor A1",
          time: "1 hour ago",
        },
        {
          id: "alert-003",
          type: "info",
          message: "System update completed",
          device: "System",
          time: "45 minutes ago",
        },
        {
          id: "alert-004",
          type: "warning",
          message: "Battery level low",
          device: "Pressure Monitor C3",
          time: "30 minutes ago",
        },
        {
          id: "alert-005",
          type: "info",
          message: "New device connected",
          device: "Motion Sensor E5",
          time: "15 minutes ago",
        },
      ])
      setLoading(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
    }
  }

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-xl">Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "p-4 border rounded-lg transition-all duration-200",
                    alert.type === "info" && "border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900",
                    alert.type === "warning" &&
                      "border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900",
                    alert.type === "error" && "border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900",
                  )}
                >
                  <div className="flex gap-3">
                    <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                    <div>
                      <h3 className="font-medium">{alert.message}</h3>
                      <p className="text-sm text-muted-foreground">
                        {alert.device} • {alert.time}
                      </p>
                    </div>
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

