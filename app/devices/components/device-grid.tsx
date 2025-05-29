"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Battery,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  Cpu,
  Edit,
  Laptop,
  MoreHorizontal,
  Router,
  Smartphone,
  Tablet,
  Thermometer,
  Trash,
  WifiOff,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

interface Device {
  id: string
  name: string
  type: "sensor" | "gateway" | "laptop" | "smartphone" | "tablet" | "controller"
  status: "online" | "offline" | "warning"
  battery?: number
  temperature?: number
  lastActive: string
  location: string
}

export function DeviceGrid() {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setDevices([
        {
          id: "dev-001",
          name: "Temperature Sensor A1",
          type: "sensor",
          status: "online",
          battery: 78,
          temperature: 24.5,
          lastActive: "Just now",
          location: "Factory Floor A",
        },
        {
          id: "dev-002",
          name: "Humidity Controller B2",
          type: "controller",
          status: "online",
          battery: 92,
          temperature: 22.3,
          lastActive: "2 minutes ago",
          location: "Factory Floor A",
        },
        {
          id: "dev-003",
          name: "Pressure Monitor C3",
          type: "sensor",
          status: "warning",
          battery: 45,
          temperature: 28.7,
          lastActive: "5 minutes ago",
          location: "Factory Floor B",
        },
        {
          id: "dev-004",
          name: "Gateway Device D4",
          type: "gateway",
          status: "offline",
          lastActive: "3 hours ago",
          location: "Server Room",
        },
        {
          id: "dev-005",
          name: "Motion Sensor E5",
          type: "sensor",
          status: "online",
          battery: 88,
          temperature: 21.2,
          lastActive: "Just now",
          location: "Warehouse",
        },
        {
          id: "dev-006",
          name: "Office Laptop",
          type: "laptop",
          status: "online",
          battery: 65,
          lastActive: "10 minutes ago",
          location: "Main Office",
        },
        {
          id: "dev-007",
          name: "Field Tablet",
          type: "tablet",
          status: "warning",
          battery: 22,
          lastActive: "15 minutes ago",
          location: "Field Site",
        },
        {
          id: "dev-008",
          name: "Supervisor Phone",
          type: "smartphone",
          status: "online",
          battery: 54,
          lastActive: "7 minutes ago",
          location: "Factory Floor A",
        },
      ])
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const getDeviceIcon = (type: Device["type"]) => {
    switch (type) {
      case "sensor":
        return <Thermometer className="h-6 w-6" />
      case "gateway":
        return <Router className="h-6 w-6" />
      case "controller":
        return <Cpu className="h-6 w-6" />
      case "laptop":
        return <Laptop className="h-6 w-6" />
      case "smartphone":
        return <Smartphone className="h-6 w-6" />
      case "tablet":
        return <Tablet className="h-6 w-6" />
    }
  }

  const getStatusBadge = (status: Device["status"]) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-500">Online</Badge>
      case "offline":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Offline
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Warning
          </Badge>
        )
    }
  }

  const getBatteryIcon = (level?: number) => {
    if (level === undefined) return null

    if (level <= 20) return <BatteryLow className="h-4 w-4 text-red-500" />
    if (level <= 50) return <BatteryMedium className="h-4 w-4 text-amber-500" />
    if (level <= 80) return <Battery className="h-4 w-4 text-green-500" />
    return <BatteryFull className="h-4 w-4 text-green-500" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Devices</TabsTrigger>
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="gateways">Gateways</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Devices</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="h-32 bg-muted/50 animate-pulse rounded-md"></div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {devices.map((device, index) => (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card
                      className={`overflow-hidden transition-all duration-200 hover:shadow-md ${device.status === "warning" ? "border-amber-500/50" : device.status === "offline" ? "border-muted" : ""}`}
                    >
                      <CardHeader className="pb-2 flex flex-row items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-md ${device.status === "online" ? "bg-green-500/10" : device.status === "warning" ? "bg-amber-500/10" : "bg-muted"}`}
                          >
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <h3 className="font-medium">{device.name}</h3>
                            <p className="text-xs text-muted-foreground">{device.location}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Device
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Cpu className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Remove Device
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex justify-between items-center mb-3">
                          {getStatusBadge(device.status)}
                          <span className="text-xs text-muted-foreground">{device.lastActive}</span>
                        </div>

                        {device.status === "offline" ? (
                          <div className="flex items-center justify-center h-16 bg-muted/30 rounded-md">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <WifiOff className="h-5 w-5" />
                              <span>Device Offline</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {device.battery !== undefined && (
                              <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs flex items-center gap-1">
                                    {getBatteryIcon(device.battery)}
                                    Battery
                                  </span>
                                  <span className="text-xs font-medium">{device.battery}%</span>
                                </div>
                                <Progress
                                  value={device.battery}
                                  className={`h-1 ${device.battery <= 20 ? "bg-red-200" : device.battery <= 50 ? "bg-amber-200" : "bg-green-200"}`}
                                />
                              </div>
                            )}

                            {device.temperature !== undefined && (
                              <div className="flex justify-between items-center text-xs">
                                <span className="flex items-center gap-1">
                                  <Thermometer className="h-3 w-3" />
                                  Temperature
                                </span>
                                <span
                                  className={`font-medium ${device.temperature > 28 ? "text-red-500" : device.temperature > 26 ? "text-amber-500" : "text-muted-foreground"}`}
                                >
                                  {device.temperature}°C
                                </span>
                              </div>
                            )}

                            {device.status === "warning" && (
                              <div className="flex items-center gap-1 text-xs text-amber-500 mt-2">
                                <AlertTriangle className="h-3 w-3" />
                                <span>Requires attention</span>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Manage Device
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sensors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {devices
                .filter((device) => device.type === "sensor")
                .map((device, index) => (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {/* Same card content as above */}
                    <Card
                      className={`overflow-hidden transition-all duration-200 hover:shadow-md ${device.status === "warning" ? "border-amber-500/50" : device.status === "offline" ? "border-muted" : ""}`}
                    >
                      <CardHeader className="pb-2 flex flex-row items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-md ${device.status === "online" ? "bg-green-500/10" : device.status === "warning" ? "bg-amber-500/10" : "bg-muted"}`}
                          >
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <h3 className="font-medium">{device.name}</h3>
                            <p className="text-xs text-muted-foreground">{device.location}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Device
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Cpu className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Remove Device
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex justify-between items-center mb-3">
                          {getStatusBadge(device.status)}
                          <span className="text-xs text-muted-foreground">{device.lastActive}</span>
                        </div>

                        {device.status === "offline" ? (
                          <div className="flex items-center justify-center h-16 bg-muted/30 rounded-md">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <WifiOff className="h-5 w-5" />
                              <span>Device Offline</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {device.battery !== undefined && (
                              <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs flex items-center gap-1">
                                    {getBatteryIcon(device.battery)}
                                    Battery
                                  </span>
                                  <span className="text-xs font-medium">{device.battery}%</span>
                                </div>
                                <Progress
                                  value={device.battery}
                                  className={`h-1 ${device.battery <= 20 ? "bg-red-200" : device.battery <= 50 ? "bg-amber-200" : "bg-green-200"}`}
                                />
                              </div>
                            )}

                            {device.temperature !== undefined && (
                              <div className="flex justify-between items-center text-xs">
                                <span className="flex items-center gap-1">
                                  <Thermometer className="h-3 w-3" />
                                  Temperature
                                </span>
                                <span
                                  className={`font-medium ${device.temperature > 28 ? "text-red-500" : device.temperature > 26 ? "text-amber-500" : "text-muted-foreground"}`}
                                >
                                  {device.temperature}°C
                                </span>
                              </div>
                            )}

                            {device.status === "warning" && (
                              <div className="flex items-center gap-1 text-xs text-amber-500 mt-2">
                                <AlertTriangle className="h-3 w-3" />
                                <span>Requires attention</span>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Manage Device
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="gateways">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {devices
                .filter((device) => device.type === "gateway")
                .map((device, index) => (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {/* Same card content as above */}
                    <Card
                      className={`overflow-hidden transition-all duration-200 hover:shadow-md ${device.status === "warning" ? "border-amber-500/50" : device.status === "offline" ? "border-muted" : ""}`}
                    >
                      <CardHeader className="pb-2 flex flex-row items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-md ${device.status === "online" ? "bg-green-500/10" : device.status === "warning" ? "bg-amber-500/10" : "bg-muted"}`}
                          >
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <h3 className="font-medium">{device.name}</h3>
                            <p className="text-xs text-muted-foreground">{device.location}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Device
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Cpu className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Remove Device
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex justify-between items-center mb-3">
                          {getStatusBadge(device.status)}
                          <span className="text-xs text-muted-foreground">{device.lastActive}</span>
                        </div>

                        {device.status === "offline" ? (
                          <div className="flex items-center justify-center h-16 bg-muted/30 rounded-md">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <WifiOff className="h-5 w-5" />
                              <span>Device Offline</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {device.battery !== undefined && (
                              <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs flex items-center gap-1">
                                    {getBatteryIcon(device.battery)}
                                    Battery
                                  </span>
                                  <span className="text-xs font-medium">{device.battery}%</span>
                                </div>
                                <Progress
                                  value={device.battery}
                                  className={`h-1 ${device.battery <= 20 ? "bg-red-200" : device.battery <= 50 ? "bg-amber-200" : "bg-green-200"}`}
                                />
                              </div>
                            )}

                            {device.temperature !== undefined && (
                              <div className="flex justify-between items-center text-xs">
                                <span className="flex items-center gap-1">
                                  <Thermometer className="h-3 w-3" />
                                  Temperature
                                </span>
                                <span
                                  className={`font-medium ${device.temperature > 28 ? "text-red-500" : device.temperature > 26 ? "text-amber-500" : "text-muted-foreground"}`}
                                >
                                  {device.temperature}°C
                                </span>
                              </div>
                            )}

                            {device.status === "warning" && (
                              <div className="flex items-center gap-1 text-xs text-amber-500 mt-2">
                                <AlertTriangle className="h-3 w-3" />
                                <span>Requires attention</span>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Manage Device
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="mobile">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {devices
                .filter((device) => ["laptop", "smartphone", "tablet"].includes(device.type))
                .map((device, index) => (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {/* Same card content as above */}
                    <Card
                      className={`overflow-hidden transition-all duration-200 hover:shadow-md ${device.status === "warning" ? "border-amber-500/50" : device.status === "offline" ? "border-muted" : ""}`}
                    >
                      <CardHeader className="pb-2 flex flex-row items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-md ${device.status === "online" ? "bg-green-500/10" : device.status === "warning" ? "bg-amber-500/10" : "bg-muted"}`}
                          >
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <h3 className="font-medium">{device.name}</h3>
                            <p className="text-xs text-muted-foreground">{device.location}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Device
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Cpu className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Remove Device
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex justify-between items-center mb-3">
                          {getStatusBadge(device.status)}
                          <span className="text-xs text-muted-foreground">{device.lastActive}</span>
                        </div>

                        {device.status === "offline" ? (
                          <div className="flex items-center justify-center h-16 bg-muted/30 rounded-md">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <WifiOff className="h-5 w-5" />
                              <span>Device Offline</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {device.battery !== undefined && (
                              <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs flex items-center gap-1">
                                    {getBatteryIcon(device.battery)}
                                    Battery
                                  </span>
                                  <span className="text-xs font-medium">{device.battery}%</span>
                                </div>
                                <Progress
                                  value={device.battery}
                                  className={`h-1 ${device.battery <= 20 ? "bg-red-200" : device.battery <= 50 ? "bg-amber-200" : "bg-green-200"}`}
                                />
                              </div>
                            )}

                            {device.temperature !== undefined && (
                              <div className="flex justify-between items-center text-xs">
                                <span className="flex items-center gap-1">
                                  <Thermometer className="h-3 w-3" />
                                  Temperature
                                </span>
                                <span
                                  className={`font-medium ${device.temperature > 28 ? "text-red-500" : device.temperature > 26 ? "text-amber-500" : "text-muted-foreground"}`}
                                >
                                  {device.temperature}°C
                                </span>
                              </div>
                            )}

                            {device.status === "warning" && (
                              <div className="flex items-center gap-1 text-xs text-amber-500 mt-2">
                                <AlertTriangle className="h-3 w-3" />
                                <span>Requires attention</span>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Manage Device
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

