"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  ExternalLink,
  Filter,
  Search,
  Shield,
} from "lucide-react"

interface AuditLog {
  id: string
  action: string
  user: string
  timestamp: string
  blockHash: string
  details: string
  verified: boolean
}

export function BlockchainAuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedLog, setExpandedLog] = useState<string | null>(null)
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLogs([
        {
          id: "log-001",
          action: "Device Configuration Changed",
          user: "admin@example.com",
          timestamp: "2023-05-15 14:32:45",
          blockHash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
          details: "Temperature threshold updated from 30°C to 35°C for device temp-sensor-12",
          verified: true,
        },
        {
          id: "log-002",
          action: "User Login",
          user: "operator@example.com",
          timestamp: "2023-05-15 14:28:12",
          blockHash: "0x3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1",
          details: "User logged in from IP 192.168.1.105",
          verified: true,
        },
        {
          id: "log-003",
          action: "Data Access",
          user: "analyst@example.com",
          timestamp: "2023-05-15 14:15:33",
          blockHash: "0x2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3",
          details: "Accessed historical temperature data for Factory A",
          verified: true,
        },
        {
          id: "log-004",
          action: "Device Added",
          user: "admin@example.com",
          timestamp: "2023-05-15 13:45:21",
          blockHash: "0x19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c3017bb5b7",
          details: "New humidity sensor (hum-sensor-15) added to Factory B",
          verified: true,
        },
        {
          id: "log-005",
          action: "Alert Configuration",
          user: "manager@example.com",
          timestamp: "2023-05-15 13:22:08",
          blockHash: "0x4a44dc15364204a80fe80e9039455cc1608281820fe2b24f1e5233ade6af1dd5",
          details: "New alert rule created for pressure exceeding 150 psi",
          verified: true,
        },
      ])
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const toggleExpand = (id: string) => {
    if (expandedLog === id) {
      setExpandedLog(null)
    } else {
      setExpandedLog(id)
    }
  }

  const copyToClipboard = (hash: string) => {
    navigator.clipboard.writeText(hash)
    setCopiedHash(hash)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Blockchain Audit Logs
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search audit logs..." className="pl-8" />
              </div>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" className="gap-1">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
            </div>

            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="border rounded-lg transition-all duration-200">
                    <div
                      className="p-4 flex justify-between items-start cursor-pointer hover:bg-accent/50"
                      onClick={() => toggleExpand(log.id)}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{log.action}</h3>
                          {log.verified && (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-500"
                            >
                              <Check className="w-3 h-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {log.user} • {log.timestamp}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {expandedLog === log.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {expandedLog === log.id && (
                      <div className="px-4 pb-4 pt-0 border-t">
                        <div className="mt-3 space-y-3">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Details</h4>
                            <p className="text-sm text-muted-foreground">{log.details}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">Blockchain Record</h4>
                            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                              <code className="text-xs">{truncateHash(log.blockHash)}</code>
                              <div className="flex gap-2">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    copyToClipboard(log.blockHash)
                                  }}
                                >
                                  {copiedHash === log.blockHash ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>Recorded on blockchain at {log.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

