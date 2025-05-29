"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface AnomalyData {
  time: string
  value: number
  threshold: number
  anomaly: boolean
}

export function AnomalyDetection() {
  const [data, setData] = useState<AnomalyData[]>([])
  const [loading, setLoading] = useState(true)
  const [anomalyCount, setAnomalyCount] = useState(0)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const generateData = () => {
        const result: AnomalyData[] = []
        let anomalyCount = 0

        for (let i = 0; i < 24; i++) {
          const baseValue = 50 + Math.sin(i * 0.5) * 20
          const threshold = 80

          // Introduce anomalies at specific points
          let value = baseValue
          let anomaly = false

          if (i === 5 || i === 14 || i === 19) {
            value = baseValue + 40 + Math.random() * 10
            anomaly = true
            anomalyCount++
          }

          result.push({
            time: `${i}:00`,
            value,
            threshold,
            anomaly,
          })
        }

        setAnomalyCount(anomalyCount)
        return result
      }

      setData(generateData())
      setLoading(false)
    }, 2200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="h-[400px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Anomaly Detection</CardTitle>
          <p className="text-sm text-muted-foreground">AI-powered pattern analysis</p>
        </div>
        {anomalyCount > 0 && (
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500"
          >
            <AlertTriangle className="h-3 w-3" />
            {anomalyCount} Anomalies Detected
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ChartContainer
            config={{
              value: {
                label: "Sensor Value",
                color: "hsl(var(--chart-1))",
              },
              threshold: {
                label: "Threshold",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-value)"
                  strokeWidth={2}
                  dot={(props) => {
                    const { cx, cy, payload } = props
                    if (payload.anomaly) {
                      return <circle cx={cx} cy={cy} r={6} fill="#ef4444" stroke="white" strokeWidth={2} />
                    }
                    return null
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="threshold"
                  stroke="var(--color-threshold)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

