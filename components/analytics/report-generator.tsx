"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, FileText, Loader2, Plus } from "lucide-react"

export function ReportGenerator() {
  const [reportType, setReportType] = useState("device-performance")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    to: new Date(),
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReports, setGeneratedReports] = useState<{ id: string; name: string; date: string; type: string }[]>([
    {
      id: "report-1",
      name: "Monthly Device Performance",
      date: "May 1, 2023",
      type: "PDF",
    },
    {
      id: "report-2",
      name: "Q1 Data Analysis",
      date: "Apr 15, 2023",
      type: "Excel",
    },
    {
      id: "report-3",
      name: "Security Audit Report",
      date: "Mar 22, 2023",
      type: "PDF",
    },
  ])

  const handleGenerateReport = () => {
    setIsGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      const newReport = {
        id: `report-${generatedReports.length + 1}`,
        name: `${
          reportType === "device-performance"
            ? "Device Performance"
            : reportType === "data-analysis"
              ? "Data Analysis"
              : reportType === "security-audit"
                ? "Security Audit"
                : "Custom"
        } Report`,
        date: format(new Date(), "MMM d, yyyy"),
        type: "PDF",
      }

      setGeneratedReports([newReport, ...generatedReports])
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Report Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generate">
          <TabsList className="mb-4">
            <TabsTrigger value="generate">Generate Report</TabsTrigger>
            <TabsTrigger value="history">Report History</TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="device-performance">Device Performance</SelectItem>
                    <SelectItem value="data-analysis">Data Analysis</SelectItem>
                    <SelectItem value="security-audit">Security Audit</SelectItem>
                    <SelectItem value="custom">Custom Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-[240px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="range" selected={dateRange} onSelect={setDateRange as any} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Data Sources</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="source-temperature" defaultChecked />
                    <label
                      htmlFor="source-temperature"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Temperature Sensors
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="source-humidity" defaultChecked />
                    <label
                      htmlFor="source-humidity"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Humidity Sensors
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="source-pressure" defaultChecked />
                    <label
                      htmlFor="source-pressure"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Pressure Sensors
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="source-motion" />
                    <label
                      htmlFor="source-motion"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Motion Sensors
                    </label>
                  </div>
                </div>
              </div>

              {reportType === "custom" && (
                <div className="space-y-2">
                  <Label htmlFor="report-name">Report Name</Label>
                  <Input id="report-name" placeholder="Enter custom report name" />
                </div>
              )}

              <div className="space-y-2">
                <Label>Report Format</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    PDF
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Excel
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    CSV
                  </Button>
                </div>
              </div>

              <Button className="w-full mt-4" onClick={handleGenerateReport} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  "Generate Report"
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Recent Reports</h3>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-3 w-3" />
                  New Report
                </Button>
              </div>

              <div className="space-y-2">
                {generatedReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">Generated on {report.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download {report.type}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

