"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AlertTriangle, Lock, ShieldCheck } from "lucide-react"

interface SecurityMetric {
  name: string
  value: number
  max: number
  status: "good" | "warning" | "critical"
}

interface ThreatData {
  time: string
  threats: number
}

export function SecurityDashboard() {
  const [metrics, setMetrics] = useState<SecurityMetric[]>([])
  const [threatData, setThreatData] = useState<ThreatData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setMetrics([
        {
          name: "Security Score",
          value: 87,
          max: 100,
          status: "good",
        },
        {
          name: "Encryption Status",
          value: 100,
          max: 100,
          status: "good",
        },
        {
          name: "Vulnerability Index",
          value: 12,
          max: 100,
          status: "good",
        },
        {
          name: "Unauthorized Access Attempts",
          value: 24,
          max: 100,
          status: "warning",
        },
      ])

      // Generate threat data for the past 24 hours
      const threatHistory: ThreatData[] = []
      for (let i = 0; i < 24; i++) {
        const hour = i.toString().padStart(2, "0")
        threatHistory.push({
          time: `${hour}:00`,
          threats: Math.floor(Math.random() * 10),
        })
      }
      setThreatData(threatHistory)

      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: SecurityMetric["status"]) => {
    switch (status) {
      case "good":
        return "text-green-500"
      case "warning":
        return "text-amber-500"
      case "critical":
        return "text-red-500"
    }
  }

  const getStatusIcon = (status: SecurityMetric["status"]) => {
    switch (status) {
      case "good":
        return <ShieldCheck className="w-5 h-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Security Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(metric.status)}
                      <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>{metric.value}</span>
                    </div>
                  </div>
                  <Progress
                    value={(metric.value / metric.max) * 100}
                    className={`h-2 ${
                      metric.status === "good"
                        ? "bg-muted"
                        : metric.status === "warning"
                          ? "bg-amber-100"
                          : "bg-red-100"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Threat Activity (24h)</h3>
              <ChartContainer
                config={{
                  threats: {
                    label: "Threats",
                    color: "hsl(var(--chart-5))",
                  },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={threatData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="threats"
                      stroke="var(--color-threats)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-md">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span className="font-medium">Security Alert</span>
              </div>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-500">
                Medium Risk
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

