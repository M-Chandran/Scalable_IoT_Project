"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Maximize2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import { motion } from "framer-motion"

interface DeviceLocation {
  id: string
  name: string
  type: string
  status: "online" | "offline" | "warning"
  x: number
  y: number
}

export function DeviceMap() {
  const [locations, setLocations] = useState<DeviceLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [view, setView] = useState<"factory-a" | "factory-b" | "warehouse">("factory-a")
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLocations([
        // Factory A devices
        { id: "dev-001", name: "Temperature Sensor A1", type: "sensor", status: "online", x: 20, y: 30 },
        { id: "dev-002", name: "Humidity Controller B2", type: "controller", status: "online", x: 60, y: 40 },
        { id: "dev-003", name: "Gateway Device D4", type: "gateway", status: "offline", x: 80, y: 70 },
        { id: "dev-008", name: "Supervisor Phone", type: "smartphone", status: "online", x: 50, y: 20 },

        // Factory B devices
        { id: "dev-004", name: "Pressure Monitor C3", type: "sensor", status: "warning", x: 30, y: 50 },
        { id: "dev-007", name: "Field Tablet", type: "tablet", status: "warning", x: 70, y: 30 },

        // Warehouse devices
        { id: "dev-005", name: "Motion Sensor E5", type: "sensor", status: "online", x: 40, y: 60 },
        { id: "dev-006", name: "Office Laptop", type: "laptop", status: "online", x: 10, y: 80 },
      ])
      setLoading(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5))
  }

  const resetView = () => {
    setZoom(1)
  }

  const getStatusColor = (status: DeviceLocation["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-gray-400"
      case "warning":
        return "bg-amber-500"
    }
  }

  const filteredLocations = locations.filter((location) => {
    if (view === "factory-a") return ["dev-001", "dev-002", "dev-003", "dev-008"].includes(location.id)
    if (view === "factory-b") return ["dev-004", "dev-007"].includes(location.id)
    if (view === "warehouse") return ["dev-005", "dev-006"].includes(location.id)
    return true
  })

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Device Location Map</CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={zoomIn} className="h-8 w-8">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={zoomOut} className="h-8 w-8">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={resetView} className="h-8 w-8">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="factory-a" onValueChange={(value) => setView(value as any)}>
          <TabsList className="mb-4">
            <TabsTrigger value="factory-a">Factory A</TabsTrigger>
            <TabsTrigger value="factory-b">Factory B</TabsTrigger>
            <TabsTrigger value="warehouse">Warehouse</TabsTrigger>
          </TabsList>

          <div className="relative overflow-hidden border rounded-md h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div
                ref={mapRef}
                className="relative w-full h-full bg-muted/20"
                style={{
                  backgroundImage: "url('/placeholder.svg?height=400&width=400')",
                  backgroundSize: "cover",
                  transform: `scale(${zoom})`,
                  transition: "transform 0.3s ease",
                }}
              >
                {/* Floor plan grid */}
                <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>

                {/* Device markers */}
                {filteredLocations.map((device) => (
                  <motion.div
                    key={device.id}
                    className="absolute"
                    style={{
                      left: `${device.x}%`,
                      top: `${device.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="relative group">
                      <div
                        className={`w-4 h-4 rounded-full ${getStatusColor(device.status)} cursor-pointer`}
                        style={{
                          boxShadow: `0 0 0 4px rgba(255,255,255,0.4), 0 0 0 ${device.status === "warning" ? "8px rgba(245,158,11,0.2)" : "0"}`,
                        }}
                      >
                        {device.status === "warning" && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-amber-500/40"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}
                      </div>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="bg-popover text-popover-foreground p-2 rounded-md shadow-lg text-xs">
                          <div className="font-medium">{device.name}</div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-muted-foreground">{device.type}</span>
                            <Badge
                              variant={device.status === "online" ? "default" : "outline"}
                              className={device.status === "warning" ? "text-amber-500" : ""}
                            >
                              {device.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Zoom indicator */}
            <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs">
              {Math.round(zoom * 100)}%
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Online</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span>Warning</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span>Offline</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Maximize2 className="h-3 w-3" />
              Full Screen
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

