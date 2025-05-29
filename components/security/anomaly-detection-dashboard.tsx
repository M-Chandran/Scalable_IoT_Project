"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Eye, RefreshCw } from "lucide-react"

interface Anomaly {
  id: string
  deviceId: string
  metric: string
  value: number
  expectedRange: string
  confidence: number
  timestamp: string
  status: "new" | "investigating" | "resolved"
}

export function AnomalyDetectionDashboard() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setAnomalies([
        {
          id: "anom-001",
          deviceId: "temp-sensor-12",
          metric: "Temperature",
          value: 85.2,
          expectedRange: "20-30°C",
          confidence: 98.5,
          timestamp: "10 minutes ago",
          status: "new",
        },
        {
          id: "anom-002",
          deviceId: "pressure-valve-05",
          metric: "Pressure",
          value: 142.7,
          expectedRange: "90-120 psi",
          confidence: 92.3,
          timestamp: "25 minutes ago",
          status: "investigating",
        },
        {
          id: "anom-003",
          deviceId: "gateway-east-2",
          metric: "Packet Loss",
          value: 28.4,
          expectedRange: "0-5%",
          confidence: 95.8,
          timestamp: "1 hour ago",
          status: "investigating",
        },
        {
          id: "anom-004",
          deviceId: "motion-sensor-22",
          metric: "Battery Level",
          value: 12.3,
          expectedRange: "40-100%",
          confidence: 89.7,
          timestamp: "2 hours ago",
          status: "resolved",
        },
        {
          id: "anom-005",
          deviceId: "humidity-sensor-08",
          metric: "Data Transmission",
          value: 0,
          expectedRange: ">0 packets/min",
          confidence: 99.2,
          timestamp: "3 hours ago",
          status: "resolved",
        },
      ])
      setLoading(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  const getStatusBadge = (status: Anomaly["status"]) => {
    switch (status) {
      case "new":
        return <Badge variant="destructive">New</Badge>
      case "investigating":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-500">
            Investigating
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-500">
            Resolved
          </Badge>
        )
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          AI Anomaly Detection
        </CardTitle>
        <Button variant="outline" size="sm" className="h-8">
          <RefreshCw className="w-4 h-4 mr-1" /> Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {anomalies.map((anomaly) => (
                    <div
                      key={anomaly.id}
                      className="p-4 border rounded-lg transition-all duration-200 hover:bg-accent/50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{anomaly.metric} Anomaly</h3>
                            {getStatusBadge(anomaly.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Device: {anomaly.deviceId} • {anomaly.timestamp}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8">
                          <Eye className="w-4 h-4 mr-1" /> View
                        </Button>
                      </div>

                      <div className="mt-3 p-2 bg-muted/50 rounded-md">
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Value:</span>
                            <span className="ml-1 font-medium">{anomaly.value}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Expected:</span>
                            <span className="ml-1 font-medium">{anomaly.expectedRange}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Confidence:</span>
                            <span className="ml-1 font-medium">{anomaly.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="active" className="mt-4">
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {anomalies
                    .filter((a) => a.status === "new" || a.status === "investigating")
                    .map((anomaly) => (
                      <div
                        key={anomaly.id}
                        className="p-4 border rounded-lg transition-all duration-200 hover:bg-accent/50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{anomaly.metric} Anomaly</h3>
                              {getStatusBadge(anomaly.status)}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Device: {anomaly.deviceId} • {anomaly.timestamp}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8">
                            <Eye className="w-4 h-4 mr-1" /> View
                          </Button>
                        </div>

                        <div className="mt-3 p-2 bg-muted/50 rounded-md">
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Value:</span>
                              <span className="ml-1 font-medium">{anomaly.value}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Expected:</span>
                              <span className="ml-1 font-medium">{anomaly.expectedRange}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Confidence:</span>
                              <span className="ml-1 font-medium">{anomaly.confidence}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="resolved" className="mt-4">
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {anomalies
                    .filter((a) => a.status === "resolved")
                    .map((anomaly) => (
                      <div
                        key={anomaly.id}
                        className="p-4 border rounded-lg transition-all duration-200 hover:bg-accent/50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{anomaly.metric} Anomaly</h3>
                              {getStatusBadge(anomaly.status)}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Device: {anomaly.deviceId} • {anomaly.timestamp}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8">
                            <Eye className="w-4 h-4 mr-1" /> View
                          </Button>
                        </div>

                        <div className="mt-3 p-2 bg-muted/50 rounded-md">
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Value:</span>
                              <span className="ml-1 font-medium">{anomaly.value}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Expected:</span>
                              <span className="ml-1 font-medium">{anomaly.expectedRange}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Confidence:</span>
                              <span className="ml-1 font-medium">{anomaly.confidence}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

