"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, Save } from "lucide-react"

export function DashboardPreferences() {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [showNotifications, setShowNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [refreshInterval, setRefreshInterval] = useState([30])
  const [dataRetentionPeriod, setDataRetentionPeriod] = useState("7")
  const [defaultView, setDefaultView] = useState("dashboard")
  const [chartType, setChartType] = useState("line")
  const [savedChanges, setSavedChanges] = useState(false)

  const saveChanges = () => {
    setSavedChanges(true)
    setTimeout(() => setSavedChanges(false), 2000)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Dashboard Preferences</h3>
          <Button onClick={saveChanges}>
            {savedChanges ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        <div className="space-y-6">
          <Accordion type="single" collapsible defaultValue="general">
            <AccordionItem value="general">
              <AccordionTrigger>General Settings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto-Refresh Data</Label>
                      <p className="text-sm text-muted-foreground">Automatically refresh dashboard data</p>
                    </div>
                    <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                  </div>

                  {autoRefresh && (
                    <div className="space-y-2">
                      <Label>Refresh Interval (seconds)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={refreshInterval}
                          onValueChange={setRefreshInterval}
                          min={5}
                          max={120}
                          step={5}
                          className="flex-1"
                        />
                        <span className="w-12 text-center">{refreshInterval[0]}s</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Show Notifications</Label>
                      <p className="text-sm text-muted-foreground">Display real-time notifications on dashboard</p>
                    </div>
                    <Switch checked={showNotifications} onCheckedChange={setShowNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Use dark theme for dashboard</p>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data">
              <AccordionTrigger>Data Settings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label>Default Data Retention Period</Label>
                    <Select value={dataRetentionPeriod} onValueChange={setDataRetentionPeriod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Default View</Label>
                    <Select value={defaultView} onValueChange={setDefaultView}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select default view" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                        <SelectItem value="devices">Devices</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="alerts">Alerts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Chart Type</Label>
                    <Select value={chartType} onValueChange={setChartType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select chart type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="area">Area Chart</SelectItem>
                        <SelectItem value="pie">Pie Chart</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="layout">
              <AccordionTrigger>Layout Customization</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label>Dashboard Layout</Label>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                        <div className="h-20 bg-muted rounded-md mb-2"></div>
                        <p className="text-sm text-center">Standard</p>
                      </div>
                      <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                        <div className="h-20 bg-muted rounded-md mb-2 grid grid-cols-2 gap-2 p-2">
                          <div className="bg-background rounded"></div>
                          <div className="bg-background rounded"></div>
                        </div>
                        <p className="text-sm text-center">Compact</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Widget Visibility</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Device Status</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Data Flow</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Recent Alerts</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Data Visualization</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">3D View</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  )
}

