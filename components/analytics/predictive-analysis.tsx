"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Brain, RefreshCw } from "lucide-react"

interface DataPoint {
  time: string
  actual: number
  predicted: number
  lower: number
  upper: number
}

export function PredictiveAnalysis() {
  const [dataType, setDataType] = useState("temperature")
  const [timeframe, setTimeframe] = useState("24h")
  const [data, setData] = useState<DataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [accuracy, setAccuracy] = useState(0)

  useEffect(() => {
    setLoading(true)

    // Simulate loading data
    setTimeout(() => {
      const generateData = () => {
        const result: DataPoint[] = []
        const now = new Date()
        const hoursToGenerate = timeframe === "24h" ? 24 : timeframe === "7d" ? 7 * 24 : 30 * 24
        const interval = timeframe === "24h" ? 1 : timeframe === "7d" ? 6 : 24 // Hours between points

        const baseValue = dataType === "temperature" ? 22 : dataType === "humidity" ? 45 : 1000
        const trend = 0.1

        for (let i = hoursToGenerate; i >= 0; i -= interval) {
          const time = new Date(now.getTime() - i * 60 * 60 * 1000)
          const formattedTime =
            timeframe === "24h"
              ? `${time.getHours().toString().padStart(2, "0")}:00`
              : `${time.getMonth() + 1}/${time.getDate()}`

          // Add some randomness and trend
          const noise = Math.random() * 2 - 1
          const seasonality = Math.sin(i / 12) * 2

          const actualValue = baseValue + noise + seasonality + trend * (hoursToGenerate - i)

          // For future points, we only have predictions
          const isPast = i > interval * 3

          if (isPast) {
            // For past points, we have actual values and can show prediction accuracy
            const predictedValue = actualValue + (Math.random() * 2 - 1) * 0.5
            const margin = actualValue * 0.1

            result.push({
              time: formattedTime,
              actual: Number(actualValue.toFixed(1)),
              predicted: Number(predictedValue.toFixed(1)),
              lower: Number((predictedValue - margin).toFixed(1)),
              upper: Number((predictedValue + margin).toFixed(1)),
            })
          } else {
            // For future points, we only have predictions
            const predictedValue = actualValue
            const margin = actualValue * 0.15

            result.push({
              time: formattedTime,
              actual: isPast ? Number(actualValue.toFixed(1)) : 0,
              predicted: Number(predictedValue.toFixed(1)),
              lower: Number((predictedValue - margin).toFixed(1)),
              upper: Number((predictedValue + margin).toFixed(1)),
            })
          }
        }

        // Calculate prediction accuracy
        const pastPoints = result.filter((point) => point.actual > 0)
        if (pastPoints.length > 0) {
          const errors = pastPoints.map((point) => Math.abs(point.predicted - point.actual) / point.actual)
          const avgError = errors.reduce((sum, err) => sum + err, 0) / errors.length
          setAccuracy(Math.round((1 - avgError) * 100))
        }

        return result
      }

      setData(generateData())
      setLoading(false)
    }, 1500)
  }, [dataType, timeframe])

  const getDataTypeLabel = () => {
    switch (dataType) {
      case "temperature":
        return "Temperature (°C)"
      case "humidity":
        return "Humidity (%)"
      case "pressure":
        return "Pressure (hPa)"
      default:
        return "Value"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <CardTitle>Predictive Analysis</CardTitle>
        </div>
        <Badge variant="outline" className="bg-primary/10">
          {accuracy}% Accuracy
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            <Select value={dataType} onValueChange={setDataType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select data type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="temperature">Temperature</SelectItem>
                <SelectItem value="humidity">Humidity</SelectItem>
                <SelectItem value="pressure">Pressure</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm" className="h-8">
            <RefreshCw className="mr-2 h-3 w-3" />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute right-0 top-0 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium border">
              Prediction →
            </div>
            <ChartContainer
              config={{
                actual: {
                  label: "Actual",
                  color: "hsl(var(--chart-1))",
                },
                predicted: {
                  label: "Predicted",
                  color: "hsl(var(--chart-5))",
                },
                lower: {
                  label: "Lower Bound",
                  color: "hsl(var(--chart-5))",
                },
                upper: {
                  label: "Upper Bound",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" />
                  <YAxis label={{ value: getDataTypeLabel(), angle: -90, position: "insideLeft" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />

                  {/* Prediction interval (shaded area) */}
                  <defs>
                    <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-predicted)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--color-predicted)" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>

                  {/* Area between upper and lower bounds */}
                  <Line
                    type="monotone"
                    dataKey="upper"
                    stroke="transparent"
                    strokeWidth={0}
                    dot={false}
                    activeDot={false}
                    isAnimationActive={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="lower"
                    stroke="transparent"
                    strokeWidth={0}
                    dot={false}
                    activeDot={false}
                    isAnimationActive={false}
                    fill="url(#predictionGradient)"
                    fillOpacity={1}
                  />

                  {/* Predicted line */}
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="var(--color-predicted)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 1 }}
                  />

                  {/* Actual line */}
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="var(--color-actual)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 1 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}

        <div className="mt-4 p-3 border rounded-md bg-muted/50">
          <h4 className="text-sm font-medium mb-1">AI Insights</h4>
          <p className="text-sm text-muted-foreground">
            {dataType === "temperature"
              ? "Temperature is predicted to remain stable with slight variations. No anomalies detected in the forecast."
              : dataType === "humidity"
                ? "Humidity levels are expected to increase over the next 24 hours. Consider adjusting environmental controls."
                : "Pressure readings show a gradual decreasing trend. Monitor system performance closely."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

