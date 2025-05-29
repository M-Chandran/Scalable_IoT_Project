"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Check, Copy, ExternalLink, Lock } from "lucide-react"

interface BlockchainRecord {
  id: string
  timestamp: string
  dataHash: string
  blockNumber: number
  confirmations: number
  dataType: string
  size: string
}

export function BlockchainStorage() {
  const [records, setRecords] = useState<BlockchainRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setRecords([
        {
          id: "block-001",
          timestamp: "2023-05-15 14:32:45",
          dataHash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
          blockNumber: 15482934,
          confirmations: 243,
          dataType: "Temperature Readings",
          size: "2.4 MB",
        },
        {
          id: "block-002",
          timestamp: "2023-05-15 14:30:12",
          dataHash: "0x3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1",
          blockNumber: 15482933,
          confirmations: 245,
          dataType: "Humidity Readings",
          size: "1.8 MB",
        },
        {
          id: "block-003",
          timestamp: "2023-05-15 14:28:05",
          dataHash: "0x2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3",
          blockNumber: 15482932,
          confirmations: 247,
          dataType: "Pressure Readings",
          size: "3.1 MB",
        },
        {
          id: "block-004",
          timestamp: "2023-05-15 14:25:33",
          dataHash: "0x19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c3017bb5b7",
          blockNumber: 15482931,
          confirmations: 250,
          dataType: "Motion Sensor Data",
          size: "1.2 MB",
        },
        {
          id: "block-005",
          timestamp: "2023-05-15 14:22:18",
          dataHash: "0x4a44dc15364204a80fe80e9039455cc1608281820fe2b24f1e5233ade6af1dd5",
          blockNumber: 15482930,
          confirmations: 253,
          dataType: "Gateway Status",
          size: "0.8 MB",
        },
      ])
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

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
          <Lock className="w-5 h-5" />
          Blockchain Secure Storage
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Immutable Data Records</h3>
                <p className="text-sm text-muted-foreground">Tamper-proof storage with blockchain verification</p>
              </div>
              <Button>Verify All Records</Button>
            </div>

            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {records.map((record) => (
                  <div key={record.id} className="p-4 border rounded-lg transition-all duration-200 hover:bg-accent/50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{record.dataType}</h4>
                        <p className="text-sm text-muted-foreground">
                          {record.timestamp} • Block #{record.blockNumber}
                        </p>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {record.confirmations} confirmations
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mt-3 bg-muted/50 p-2 rounded-md">
                      <code className="text-xs">{truncateHash(record.dataHash)}</code>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(record.dataHash)}
                        >
                          {copiedHash === record.dataHash ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                        <Button size="icon" variant="ghost" className="h-6 w-6">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                      <span>Size: {record.size}</span>
                      <span>Verified ✓</span>
                    </div>
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

