"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface DataPoint {
  time: string
  temperature: number
  humidity: number
  pressure: number
}

export function DataVisualization() {
  const [data, setData] = useState<DataPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const generateData = () => {
        const now = new Date()
        const result: DataPoint[] = []

        for (let i = 24; i >= 0; i--) {
          const time = new Date(now.getTime() - i * 60 * 60 * 1000)
          const hours = time.getHours().toString().padStart(2, "0")

          result.push({
            time: `${hours}:00`,
            temperature: 20 + Math.random() * 10,
            humidity: 40 + Math.random() * 30,
            pressure: 990 + Math.random() * 30,
          })
        }

        return result
      }

      setData(generateData())
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-xl">Data Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Tabs defaultValue="line">
            <TabsList className="mb-4">
              <TabsTrigger value="line">Line Chart</TabsTrigger>
              <TabsTrigger value="area">Area Chart</TabsTrigger>
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            </TabsList>
            <TabsContent value="line" className="h-[280px]">
              <ChartContainer
                config={{
                  temperature: {
                    label: "Temperature",
                    color: "hsl(var(--chart-1))",
                  },
                  humidity: {
                    label: "Humidity",
                    color: "hsl(var(--chart-2))",
                  },
                  pressure: {
                    label: "Pressure",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="var(--color-temperature)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="var(--color-humidity)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="pressure"
                      stroke="var(--color-pressure)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="area" className="h-[280px]">
              <ChartContainer
                config={{
                  temperature: {
                    label: "Temperature",
                    color: "hsl(var(--chart-1))",
                  },
                  humidity: {
                    label: "Humidity",
                    color: "hsl(var(--chart-2))",
                  },
                  pressure: {
                    label: "Pressure",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="temperature"
                      stroke="var(--color-temperature)"
                      fill="var(--color-temperature)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="humidity"
                      stroke="var(--color-humidity)"
                      fill="var(--color-humidity)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="pressure"
                      stroke="var(--color-pressure)"
                      fill="var(--color-pressure)"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="bar" className="h-[280px]">
              <ChartContainer
                config={{
                  temperature: {
                    label: "Temperature",
                    color: "hsl(var(--chart-1))",
                  },
                  humidity: {
                    label: "Humidity",
                    color: "hsl(var(--chart-2))",
                  },
                  pressure: {
                    label: "Pressure",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="temperature" fill="var(--color-temperature)" />
                    <Bar dataKey="humidity" fill="var(--color-humidity)" />
                    <Bar dataKey="pressure" fill="var(--color-pressure)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

