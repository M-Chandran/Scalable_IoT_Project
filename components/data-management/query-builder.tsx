"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, Play, Plus, Save, Trash } from "lucide-react"

export function QueryBuilder() {
  const [queryResult, setQueryResult] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const executeQuery = () => {
    setIsLoading(true)

    // Simulate query execution
    setTimeout(() => {
      setQueryResult([
        { id: 1, device_id: "temp-001", value: 24.5, timestamp: "2023-05-15T14:32:45Z", location: "Factory A" },
        { id: 2, device_id: "temp-002", value: 22.8, timestamp: "2023-05-15T14:32:46Z", location: "Factory A" },
        { id: 3, device_id: "temp-003", value: 25.1, timestamp: "2023-05-15T14:32:47Z", location: "Factory B" },
        { id: 4, device_id: "hum-001", value: 45.2, timestamp: "2023-05-15T14:32:48Z", location: "Factory A" },
        { id: 5, device_id: "hum-002", value: 48.7, timestamp: "2023-05-15T14:32:49Z", location: "Factory B" },
      ])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Query Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="builder">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="builder">Visual Builder</TabsTrigger>
            <TabsTrigger value="raw">Raw Query</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="mt-4 space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data Source</Label>
                  <Select defaultValue="iot_data">
                    <SelectTrigger>
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iot_data">IoT Data</SelectItem>
                      <SelectItem value="device_metadata">Device Metadata</SelectItem>
                      <SelectItem value="alerts">Alerts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Time Range</Label>
                  <Select defaultValue="last_24h">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last_1h">Last Hour</SelectItem>
                      <SelectItem value="last_24h">Last 24 Hours</SelectItem>
                      <SelectItem value="last_7d">Last 7 Days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Filters</Label>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Plus className="h-4 w-4 mr-1" /> Add Filter
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <Select defaultValue="device_id">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="device_id">Device ID</SelectItem>
                        <SelectItem value="value">Value</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="equals">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Operator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="greater_than">Greater Than</SelectItem>
                        <SelectItem value="less_than">Less Than</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input placeholder="Value" className="flex-1" defaultValue="temp-" />

                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <Select defaultValue="location">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="device_id">Device ID</SelectItem>
                        <SelectItem value="value">Value</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="equals">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Operator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="greater_than">Greater Than</SelectItem>
                        <SelectItem value="less_than">Less Than</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input placeholder="Value" className="flex-1" defaultValue="Factory A" />

                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Aggregation</Label>
                <Select defaultValue="none">
                  <SelectTrigger>
                    <SelectValue placeholder="Select aggregation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="avg">Average</SelectItem>
                    <SelectItem value="sum">Sum</SelectItem>
                    <SelectItem value="min">Minimum</SelectItem>
                    <SelectItem value="max">Maximum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-1" /> Save Query
                </Button>
                <Button onClick={executeQuery} disabled={isLoading}>
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1"></div>
                  ) : (
                    <Play className="h-4 w-4 mr-1" />
                  )}
                  Execute Query
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="raw" className="mt-4 space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Raw Query</Label>
                <div className="relative">
                  <pre className="p-4 bg-muted rounded-md overflow-auto text-sm h-[200px]">
                    {`SELECT device_id, value, timestamp, location
FROM iot_data
WHERE device_id LIKE 'temp-%'
  AND location = 'Factory A'
  AND timestamp >= NOW() - INTERVAL 1 DAY
ORDER BY timestamp DESC
LIMIT 100;`}
                  </pre>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-1" /> Save Query
                </Button>
                <Button onClick={executeQuery} disabled={isLoading}>
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1"></div>
                  ) : (
                    <Play className="h-4 w-4 mr-1" />
                  )}
                  Execute Query
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {queryResult && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Query Results</h3>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Export
              </Button>
            </div>

            <div className="border rounded-md">
              <div className="grid grid-cols-5 gap-4 p-2 font-medium bg-muted text-sm">
                <div>ID</div>
                <div>Device ID</div>
                <div>Value</div>
                <div>Timestamp</div>
                <div>Location</div>
              </div>

              <ScrollArea className="h-[200px]">
                {queryResult.map((row) => (
                  <div key={row.id} className="grid grid-cols-5 gap-4 p-2 text-sm border-t">
                    <div>{row.id}</div>
                    <div>{row.device_id}</div>
                    <div>{row.value}</div>
                    <div>{row.timestamp}</div>
                    <div>{row.location}</div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

