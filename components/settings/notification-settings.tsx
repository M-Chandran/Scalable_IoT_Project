"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Check, Plus, Save, Trash } from "lucide-react"

interface NotificationChannel {
  id: string
  type: "email" | "sms" | "slack" | "webhook"
  destination: string
  enabled: boolean
}

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [slackNotifications, setSlackNotifications] = useState(true)
  const [criticalAlerts, setCriticalAlerts] = useState(true)
  const [warningAlerts, setWarningAlerts] = useState(true)
  const [infoAlerts, setInfoAlerts] = useState(false)
  const [savedChanges, setSavedChanges] = useState(false)

  const [channels, setChannels] = useState<NotificationChannel[]>([
    {
      id: "channel-1",
      type: "email",
      destination: "admin@example.com",
      enabled: true,
    },
    {
      id: "channel-2",
      type: "email",
      destination: "alerts@example.com",
      enabled: true,
    },
    {
      id: "channel-3",
      type: "slack",
      destination: "#iot-alerts",
      enabled: true,
    },
    {
      id: "channel-4",
      type: "webhook",
      destination: "https://api.example.com/webhooks/iot",
      enabled: false,
    },
  ])

  const saveChanges = () => {
    setSavedChanges(true)
    setTimeout(() => setSavedChanges(false), 2000)
  }

  const toggleChannel = (id: string) => {
    setChannels(channels.map((channel) => (channel.id === id ? { ...channel, enabled: !channel.enabled } : channel)))
  }

  const removeChannel = (id: string) => {
    setChannels(channels.filter((channel) => channel.id !== id))
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Notification Settings</h3>
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
          <Accordion type="single" collapsible defaultValue="channels">
            <AccordionItem value="channels">
              <AccordionTrigger>Notification Channels</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">Delivery Channels</h4>
                    <Button size="sm">
                      <Plus className="mr-2 h-3 w-3" />
                      Add Channel
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {channels.map((channel) => (
                      <div key={channel.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{channel.type.toUpperCase()}</Badge>
                          <span>{channel.destination}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={channel.enabled} onCheckedChange={() => toggleChannel(channel.id)} />
                          <Button variant="ghost" size="icon" onClick={() => removeChannel(channel.id)}>
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="types">
              <AccordionTrigger>Notification Types</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via browser notifications</p>
                    </div>
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via SMS</p>
                    </div>
                    <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Slack Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via Slack</p>
                    </div>
                    <Switch checked={slackNotifications} onCheckedChange={setSlackNotifications} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="alerts">
              <AccordionTrigger>Alert Preferences</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Critical Alerts</Label>
                      <p className="text-sm text-muted-foreground">High priority notifications for critical issues</p>
                    </div>
                    <Switch checked={criticalAlerts} onCheckedChange={setCriticalAlerts} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Warning Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Medium priority notifications for potential issues
                      </p>
                    </div>
                    <Switch checked={warningAlerts} onCheckedChange={setWarningAlerts} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Informational Alerts</Label>
                      <p className="text-sm text-muted-foreground">Low priority notifications for general updates</p>
                    </div>
                    <Switch checked={infoAlerts} onCheckedChange={setInfoAlerts} />
                  </div>

                  <div className="space-y-2">
                    <Label>Quiet Hours</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Start Time</Label>
                        <Select defaultValue="22">
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }).map((_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i.toString().padStart(2, "0")}:00
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">End Time</Label>
                        <Select defaultValue="7">
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }).map((_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i.toString().padStart(2, "0")}:00
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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

