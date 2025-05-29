"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Thermometer, Droplets, Gauge, RefreshCw } from "lucide-react"

export function HeatmapVisualization() {
  const [dataType, setDataType] = useState("temperature")
  const [view, setView] = useState("factory-a")
  const [loading, setLoading] = useState(true)
  const [heatmapData, setHeatmapData] = useState<number[][]>([])

  useEffect(() => {
    setLoading(true)

    // Simulate loading data
    setTimeout(() => {
      // Generate a 10x10 grid of data
      const generateHeatmapData = () => {
        const rows = 10
        const cols = 10
        const result: number[][] = []

        const baseValue = dataType === "temperature" ? 22 : dataType === "humidity" ? 45 : 1000
        const variance = dataType === "temperature" ? 5 : dataType === "humidity" ? 15 : 50

        // Create a hotspot or pattern based on the view
        const centerRow = view === "factory-a" ? 3 : 7
        const centerCol = view === "factory-a" ? 7 : 3

        for (let i = 0; i < rows; i++) {
          const row: number[] = []
          for (let j = 0; j < cols; j++) {
            // Distance from center creates a pattern
            const distanceFromCenter = Math.sqrt(Math.pow(i - centerRow, 2) + Math.pow(j - centerCol, 2))

            // Add some randomness
            const noise = Math.random() * 2 - 1

            // Value decreases as we move away from center
            const value = baseValue + variance * (1 - distanceFromCenter / 10) + noise

            row.push(Number(value.toFixed(1)))
          }
          result.push(row)
        }

        return result
      }

      setHeatmapData(generateHeatmapData())
      setLoading(false)
    }, 1500)
  }, [dataType, view])

  const getColorForValue = (value: number): string => {
    // Different color scales based on data type
    if (dataType === "temperature") {
      // Temperature: blue to red
      const normalized = (value - 15) / 20 // Assuming range 15-35°C
      const h = Math.max(0, Math.min(240 - normalized * 240, 240)) // 240 (blue) to 0 (red)
      return `hsl(${h}, 100%, 50%)`
    } else if (dataType === "humidity") {
      // Humidity: yellow to blue
      const normalized = value / 100 // 0-100%
      const h = 60 + normalized * 180 // 60 (yellow) to 240 (blue)
      return `hsl(${h}, 100%, 50%)`
    } else {
      // Pressure: green to purple
      const normalized = (value - 950) / 100 // Assuming range 950-1050 hPa
      const h = 120 + normalized * 180 // 120 (green) to 300 (purple)
      return `hsl(${h}, 100%, 50%)`
    }
  }

  const getDataTypeIcon = () => {
    switch (dataType) {
      case "temperature":
        return <Thermometer className="h-5 w-5" />
      case "humidity":
        return <Droplets className="h-5 w-5" />
      case "pressure":
        return <Gauge className="h-5 w-5" />
      default:
        return null
    }
  }

  const getDataTypeUnit = () => {
    switch (dataType) {
      case "temperature":
        return "°C"
      case "humidity":
        return "%"
      case "pressure":
        return "hPa"
      default:
        return ""
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          {getDataTypeIcon()}
          <CardTitle>Heatmap Visualization</CardTitle>
        </div>
        <Button variant="outline" size="sm" className="h-8">
          <RefreshCw className="mr-2 h-3 w-3" />
          Refresh
        </Button>
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

            <Tabs value={view} onValueChange={setView} className="w-auto">
              <TabsList>
                <TabsTrigger value="factory-a">Factory A</TabsTrigger>
                <TabsTrigger value="factory-b">Factory B</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-square w-full max-w-md mx-auto">
              <div className="grid grid-cols-10 gap-1 h-full">
                {heatmapData.map((row, rowIndex) =>
                  row.map((value, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="relative rounded-sm transition-colors hover:opacity-90 cursor-pointer"
                      style={{ backgroundColor: getColorForValue(value) }}
                      title={`${value}${getDataTypeUnit()}`}
                    >
                      {/* Show value on hover with a tooltip */}
                      <div className="opacity-0 hover:opacity-100 absolute inset-0 flex items-center justify-center text-white text-xs font-bold bg-black/30 rounded-sm transition-opacity">
                        {value}
                        {getDataTypeUnit()}
                      </div>
                    </div>
                  )),
                )}
              </div>

              {/* Legend */}
              <div className="absolute -right-8 top-0 bottom-0 w-6 flex flex-col">
                <div className="flex-1 relative">
                  <div
                    className="absolute inset-0 rounded-sm"
                    style={{
                      background:
                        dataType === "temperature"
                          ? "linear-gradient(to bottom, hsl(0, 100%, 50%), hsl(240, 100%, 50%))"
                          : dataType === "humidity"
                            ? "linear-gradient(to bottom, hsl(240, 100%, 50%), hsl(60, 100%, 50%))"
                            : "linear-gradient(to bottom, hsl(300, 100%, 50%), hsl(120, 100%, 50%))",
                    }}
                  ></div>
                  <div className="absolute -left-6 top-0 text-xs">
                    {dataType === "temperature" ? "35°C" : dataType === "humidity" ? "100%" : "1050hPa"}
                  </div>
                  <div className="absolute -left-6 bottom-0 text-xs">
                    {dataType === "temperature" ? "15°C" : dataType === "humidity" ? "0%" : "950hPa"}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 border rounded-md bg-muted/50">
              <h4 className="text-sm font-medium mb-1">Heatmap Analysis</h4>
              <p className="text-sm text-muted-foreground">
                {dataType === "temperature"
                  ? `The ${view === "factory-a" ? "Factory A" : "Factory B"} floor shows temperature variations with hotspots near the ${view === "factory-a" ? "northeast" : "southwest"} corner. This may indicate equipment generating excess heat.`
                  : dataType === "humidity"
                    ? `Humidity levels in ${view === "factory-a" ? "Factory A" : "Factory B"} are ${view === "factory-a" ? "higher" : "lower"} in the central area. This could indicate issues with the ventilation system or water leaks.`
                    : `Pressure distribution across ${view === "factory-a" ? "Factory A" : "Factory B"} shows a gradient from ${view === "factory-a" ? "high to low" : "low to high"}. Monitor the pressure differentials to ensure optimal system performance.`}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

