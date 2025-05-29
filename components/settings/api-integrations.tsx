"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check, Copy, Key, Plus, RefreshCw } from "lucide-react"

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
  status: "active" | "revoked"
}

interface Integration {
  id: string
  name: string
  type: string
  status: "connected" | "disconnected"
  lastSync: string
  enabled: boolean
}

export function ApiIntegrations() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "key-1",
      name: "Production API Key",
      key: "iot_pk_7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      created: "2023-04-15",
      lastUsed: "Just now",
      status: "active",
    },
    {
      id: "key-2",
      name: "Development API Key",
      key: "iot_pk_3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1",
      created: "2023-04-20",
      lastUsed: "2 hours ago",
      status: "active",
    },
    {
      id: "key-3",
      name: "Testing API Key",
      key: "iot_pk_2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3",
      created: "2023-05-01",
      lastUsed: "1 day ago",
      status: "active",
    },
  ])

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "int-1",
      name: "AWS IoT Core",
      type: "Cloud Provider",
      status: "connected",
      lastSync: "5 minutes ago",
      enabled: true,
    },
    {
      id: "int-2",
      name: "MongoDB Atlas",
      type: "Database",
      status: "connected",
      lastSync: "10 minutes ago",
      enabled: true,
    },
    {
      id: "int-3",
      name: "Kafka Streams",
      type: "Message Queue",
      status: "connected",
      lastSync: "15 minutes ago",
      enabled: true,
    },
    {
      id: "int-4",
      name: "Weather API",
      type: "External API",
      status: "disconnected",
      lastSync: "2 days ago",
      enabled: false,
    },
  ])

  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const toggleIntegration = (id: string) => {
    setIntegrations(
      integrations.map((integration) =>
        integration.id === id ? { ...integration, enabled: !integration.enabled } : integration,
      ),
    )
  }

  return (
    <Tabs defaultValue="api-keys">
      <TabsList className="mb-4">
        <TabsTrigger value="api-keys">API Keys</TabsTrigger>
        <TabsTrigger value="integrations">Third-Party Integrations</TabsTrigger>
      </TabsList>

      <TabsContent value="api-keys">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">API Keys</h3>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create API Key
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New API Key</DialogTitle>
                    <DialogDescription>Create a new API key for secure access to the IoT platform.</DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="key-name">Key Name</Label>
                      <Input id="key-name" placeholder="e.g., Production API Key" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="key-permissions">Permissions</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="read-permission" className="cursor-pointer">
                            Read Data
                          </Label>
                          <Switch id="read-permission" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="write-permission" className="cursor-pointer">
                            Write Data
                          </Label>
                          <Switch id="write-permission" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="admin-permission" className="cursor-pointer">
                            Admin Actions
                          </Label>
                          <Switch id="admin-permission" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Create Key</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-4 border rounded-lg transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{apiKey.name}</h4>
                          <Badge variant={apiKey.status === "active" ? "default" : "destructive"}>
                            {apiKey.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <RefreshCw className="mr-2 h-3 w-3" />
                          Rotate
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          Revoke
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                      <div className="flex items-center">
                        <Key className="h-4 w-4 mr-2 text-muted-foreground" />
                        <code className="text-xs font-mono">
                          {apiKey.key.substring(0, 10)}...{apiKey.key.substring(apiKey.key.length - 4)}
                        </code>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => copyApiKey(apiKey.key)}>
                        {copiedKey === apiKey.key ? (
                          <Check className="h-4 w-4 mr-1" />
                        ) : (
                          <Copy className="h-4 w-4 mr-1" />
                        )}
                        {copiedKey === apiKey.key ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="integrations">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Third-Party Integrations</h3>

              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Integration
              </Button>
            </div>

            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div key={integration.id} className="p-4 border rounded-lg transition-all duration-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{integration.name}</h4>
                          <Badge variant="outline">{integration.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Status: {integration.status} • Last sync: {integration.lastSync}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Switch
                          checked={integration.enabled}
                          onCheckedChange={() => toggleIntegration(integration.id)}
                        />
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

