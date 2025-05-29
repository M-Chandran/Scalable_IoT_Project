"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, Cloud, HardDrive, X } from "lucide-react"

interface StorageNode {
  id: string
  name: string
  type: "edge" | "cloud"
  status: "online" | "offline"
  storage: {
    used: number
    total: number
  }
  location: string
  lastSync: string
}

export function EdgeCloudIntegration() {
  const [nodes, setNodes] = useState<StorageNode[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setNodes([
        {
          id: "edge-001",
          name: "Factory Edge Server",
          type: "edge",
          status: "online",
          storage: { used: 420, total: 1000 },
          location: "Factory Floor A",
          lastSync: "2 minutes ago",
        },
        {
          id: "edge-002",
          name: "Warehouse Edge Node",
          type: "edge",
          status: "online",
          storage: { used: 380, total: 500 },
          location: "Warehouse B",
          lastSync: "5 minutes ago",
        },
        {
          id: "edge-003",
          name: "Office Gateway",
          type: "edge",
          status: "offline",
          storage: { used: 120, total: 250 },
          location: "Main Office",
          lastSync: "3 hours ago",
        },
        {
          id: "cloud-001",
          name: "Primary Cloud Storage",
          type: "cloud",
          status: "online",
          storage: { used: 1800, total: 5000 },
          location: "AWS East",
          lastSync: "1 minute ago",
        },
        {
          id: "cloud-002",
          name: "Backup Cloud Storage",
          type: "cloud",
          status: "online",
          storage: { used: 1200, total: 3000 },
          location: "AWS West",
          lastSync: "10 minutes ago",
        },
      ])
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const getNodeIcon = (type: StorageNode["type"]) => {
    switch (type) {
      case "edge":
        return <HardDrive className="w-5 h-5" />
      case "cloud":
        return <Cloud className="w-5 h-5" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edge-Cloud Storage Integration</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Nodes</TabsTrigger>
              <TabsTrigger value="edge">Edge Nodes</TabsTrigger>
              <TabsTrigger value="cloud">Cloud Nodes</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {nodes.map((node) => (
                    <div key={node.id} className="p-4 border rounded-lg transition-all duration-200 hover:bg-accent/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-full text-primary">{getNodeIcon(node.type)}</div>
                          <div>
                            <h3 className="font-medium">{node.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {node.location} • {node.storage.used} GB / {node.storage.total} GB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={node.status === "online" ? "default" : "destructive"}
                            className="flex items-center gap-1"
                          >
                            {node.status === "online" ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            {node.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">Last sync: {node.lastSync}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="edge" className="mt-6">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {nodes
                    .filter((node) => node.type === "edge")
                    .map((node) => (
                      <div
                        key={node.id}
                        className="p-4 border rounded-lg transition-all duration-200 hover:bg-accent/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-full text-primary">
                              <HardDrive className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">{node.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {node.location} • {node.storage.used} GB / {node.storage.total} GB
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={node.status === "online" ? "default" : "destructive"}
                              className="flex items-center gap-1"
                            >
                              {node.status === "online" ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                              {node.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Last sync: {node.lastSync}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="cloud" className="mt-6">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {nodes
                    .filter((node) => node.type === "cloud")
                    .map((node) => (
                      <div
                        key={node.id}
                        className="p-4 border rounded-lg transition-all duration-200 hover:bg-accent/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-full text-primary">
                              <Cloud className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">{node.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {node.location} • {node.storage.used} GB / {node.storage.total} GB
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={node.status === "online" ? "default" : "destructive"}
                              className="flex items-center gap-1"
                            >
                              {node.status === "online" ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                              {node.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Last sync: {node.lastSync}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

