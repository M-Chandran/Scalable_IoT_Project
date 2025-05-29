"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface StorageData {
  name: string
  value: number
  color: string
}

export function DataStorageOverview() {
  const [loading, setLoading] = useState(true)
  const [storageData, setStorageData] = useState<StorageData[]>([])
  const [totalStorage, setTotalStorage] = useState({ used: 0, total: 0 })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStorageData([
        { name: "Time Series", value: 42, color: "hsl(var(--chart-1))" },
        { name: "Metadata", value: 28, color: "hsl(var(--chart-2))" },
        { name: "Logs", value: 18, color: "hsl(var(--chart-3))" },
        { name: "Other", value: 12, color: "hsl(var(--chart-4))" },
      ])

      setTotalStorage({
        used: 3.2,
        total: 5,
      })

      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Storage Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ChartContainer
              config={Object.fromEntries(
                storageData.map((item) => [
                  item.name.toLowerCase().replace(/\s+/g, "_"),
                  { label: item.name, color: item.color },
                ]),
              )}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={storageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {storageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Storage Capacity</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Storage</span>
                  <span className="font-medium">
                    {totalStorage.used} TB / {totalStorage.total} TB
                  </span>
                </div>
                <Progress value={(totalStorage.used / totalStorage.total) * 100} />
              </div>

              <Tabs defaultValue="edge">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edge">Edge Storage</TabsTrigger>
                  <TabsTrigger value="cloud">Cloud Storage</TabsTrigger>
                </TabsList>
                <TabsContent value="edge" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Raw Data</span>
                      <span className="font-medium">1.2 TB / 2.0 TB</span>
                    </div>
                    <Progress value={60} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processed Data</span>
                      <span className="font-medium">0.8 TB / 1.5 TB</span>
                    </div>
                    <Progress value={53} />
                  </div>
                </TabsContent>
                <TabsContent value="cloud" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Long-term Storage</span>
                      <span className="font-medium">2.5 TB / 4.0 TB</span>
                    </div>
                    <Progress value={62.5} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Backup Storage</span>
                      <span className="font-medium">1.8 TB / 3.0 TB</span>
                    </div>
                    <Progress value={60} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

