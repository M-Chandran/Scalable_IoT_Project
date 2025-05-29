"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Loader2, Share2 } from "lucide-react"

export function ExportOptions() {
  const [exportFormat, setExportFormat] = useState("csv")
  const [timeRange, setTimeRange] = useState("last-7-days")
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
    }, 2000)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Export & Share</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="export">
          <TabsList className="mb-4">
            <TabsTrigger value="export">Export Data</TabsTrigger>
            <TabsTrigger value="schedule">Scheduled Exports</TabsTrigger>
          </TabsList>

          <TabsContent value="export">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Export Format</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={exportFormat === "csv" ? "default" : "outline"}
                    onClick={() => setExportFormat("csv")}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    CSV
                  </Button>
                  <Button
                    variant={exportFormat === "json" ? "default" : "outline"}
                    onClick={() => setExportFormat("json")}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    JSON
                  </Button>
                  <Button
                    variant={exportFormat === "excel" ? "default" : "outline"}
                    onClick={() => setExportFormat("excel")}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Excel
                  </Button>
                  <Button
                    variant={exportFormat === "pdf" ? "default" : "outline"}
                    onClick={() => setExportFormat("pdf")}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    PDF
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Time Range</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Data to Include</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-device-data" defaultChecked />
                    <label
                      htmlFor="include-device-data"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Device Data
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-alerts" defaultChecked />
                    <label
                      htmlFor="include-alerts"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Alerts
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-analytics" defaultChecked />
                    <label
                      htmlFor="include-analytics"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Analytics
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-system-logs" />
                    <label
                      htmlFor="include-system-logs"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      System Logs
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Export Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="compress-data" />
                    <label
                      htmlFor="compress-data"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Compress data (ZIP format)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-metadata" defaultChecked />
                    <label
                      htmlFor="include-metadata"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Include metadata
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-2">
                <Button className="flex-1" onClick={handleExport} disabled={isExporting}>
                  {isExporting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Scheduled Exports</h3>
                <Button variant="outline" size="sm">
                  New Schedule
                </Button>
              </div>

              <div className="space-y-3">
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Daily Device Report</h4>
                      <p className="text-xs text-muted-foreground">CSV format • Runs daily at 00:00 UTC</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-muted-foreground">Next run: Tomorrow, 00:00 UTC</span>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Weekly Analytics Summary</h4>
                      <p className="text-xs text-muted-foreground">Excel format • Runs every Monday at 08:00 UTC</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-muted-foreground">Next run: Monday, 08:00 UTC</span>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Monthly Performance Report</h4>
                      <p className="text-xs text-muted-foreground">PDF format • Runs on the 1st of each month</p>
                    </div>
                    <Badge variant="outline">Paused</Badge>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-muted-foreground">Paused</span>
                    <Button variant="ghost" size="sm">
                      Resume
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

