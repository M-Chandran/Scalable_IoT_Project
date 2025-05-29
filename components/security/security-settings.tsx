"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [autoLockEnabled, setAutoLockEnabled] = useState(true)
  const [anomalyDetectionEnabled, setAnomalyDetectionEnabled] = useState(true)
  const [blockchainVerificationEnabled, setBlockchainVerificationEnabled] = useState(true)
  const [sensitivityLevel, setSensitivityLevel] = useState([75])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          Security Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="access">Access Control</TabsTrigger>
            <TabsTrigger value="detection">Anomaly Detection</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for all administrative actions</p>
                </div>
                <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-Lock Inactive Sessions</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically lock sessions after period of inactivity
                  </p>
                </div>
                <Switch checked={autoLockEnabled} onCheckedChange={setAutoLockEnabled} />
              </div>

              <div className="space-y-2">
                <Label>Inactivity Timeout</Label>
                <Select defaultValue="15">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="access" className="mt-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">IP Restriction</Label>
                  <p className="text-sm text-muted-foreground">Limit access to specific IP addresses or ranges</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Default User Role</Label>
                <Select defaultValue="viewer">
                  <SelectTrigger>
                    <SelectValue placeholder="Select default role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enforce Password Rotation</Label>
                  <p className="text-sm text-muted-foreground">Require password changes every 90 days</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="detection" className="mt-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">AI Anomaly Detection</Label>
                  <p className="text-sm text-muted-foreground">Use machine learning to detect unusual patterns</p>
                </div>
                <Switch checked={anomalyDetectionEnabled} onCheckedChange={setAnomalyDetectionEnabled} />
              </div>

              <div className="space-y-2">
                <Label>Detection Sensitivity</Label>
                <div className="pt-2">
                  <Slider value={sensitivityLevel} onValueChange={setSensitivityLevel} min={0} max={100} step={1} />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">Low</span>
                    <span className="text-xs font-medium">{sensitivityLevel}%</span>
                    <span className="text-xs text-muted-foreground">High</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Alert Threshold</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select threshold" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (More Alerts)</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High (Fewer Alerts)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="blockchain" className="mt-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Blockchain Verification</Label>
                  <p className="text-sm text-muted-foreground">Use blockchain to verify data integrity</p>
                </div>
                <Switch checked={blockchainVerificationEnabled} onCheckedChange={setBlockchainVerificationEnabled} />
              </div>

              <div className="space-y-2">
                <Label>Verification Frequency</Label>
                <Select defaultValue="hourly">
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Blockchain Network</Label>
                <Select defaultValue="ethereum">
                  <SelectTrigger>
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="solana">Solana</SelectItem>
                    <SelectItem value="hyperledger">Hyperledger</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button>Apply Security Settings</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

