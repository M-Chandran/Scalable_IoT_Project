"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, ArrowRight } from "lucide-react"

interface Pipeline {
  id: string
  name: string
  status: "running" | "paused" | "error"
  throughput: string
  latency: string
  lastUpdated: string
  steps: {
    name: string
    status: "completed" | "processing" | "waiting" | "error"
  }[]
}

export function DataProcessingPipelines() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setPipelines([
        {
          id: "pipeline-001",
          name: "Temperature Data Processing",
          status: "running",
          throughput: "1.2K events/sec",
          latency: "45ms",
          lastUpdated: "Just now",
          steps: [
            { name: "Data Ingestion", status: "completed" },
            { name: "Data Filtering", status: "completed" },
            { name: "Anomaly Detection", status: "processing" },
            { name: "Data Storage", status: "waiting" },
          ],
        },
        {
          id: "pipeline-002",
          name: "Humidity Analysis",
          status: "running",
          throughput: "850 events/sec",
          latency: "62ms",
          lastUpdated: "1 minute ago",
          steps: [
            { name: "Data Ingestion", status: "completed" },
            { name: "Data Filtering", status: "completed" },
            { name: "Trend Analysis", status: "completed" },
            { name: "Data Storage", status: "processing" },
          ],
        },
        {
          id: "pipeline-003",
          name: "Motion Sensor Processing",
          status: "paused",
          throughput: "0 events/sec",
          latency: "N/A",
          lastUpdated: "10 minutes ago",
          steps: [
            { name: "Data Ingestion", status: "completed" },
            { name: "Data Filtering", status: "completed" },
            { name: "Pattern Recognition", status: "waiting" },
            { name: "Data Storage", status: "waiting" },
          ],
        },
        {
          id: "pipeline-004",
          name: "Gateway Data Processing",
          status: "error",
          throughput: "0 events/sec",
          latency: "N/A",
          lastUpdated: "5 minutes ago",
          steps: [
            { name: "Data Ingestion", status: "completed" },
            { name: "Data Filtering", status: "error" },
            { name: "Data Aggregation", status: "waiting" },
            { name: "Data Storage", status: "waiting" },
          ],
        },
      ])
      setLoading(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  const getStatusBadge = (status: Pipeline["status"]) => {
    switch (status) {
      case "running":
        return <Badge className="bg-green-500">Running</Badge>
      case "paused":
        return <Badge variant="outline">Paused</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
    }
  }

  const getStepStatusIndicator = (status: Pipeline["steps"][0]["status"]) => {
    switch (status) {
      case "completed":
        return <div className="w-3 h-3 rounded-full bg-green-500"></div>
      case "processing":
        return <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
      case "waiting":
        return <div className="w-3 h-3 rounded-full bg-gray-300"></div>
      case "error":
        return <div className="w-3 h-3 rounded-full bg-red-500"></div>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Processing Pipelines</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ScrollArea className="h-[500px]">
            <div className="space-y-6">
              {pipelines.map((pipeline) => (
                <div key={pipeline.id} className="p-4 border rounded-lg transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{pipeline.name}</h3>
                        {getStatusBadge(pipeline.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Throughput: {pipeline.throughput} • Latency: {pipeline.latency} • Updated:{" "}
                        {pipeline.lastUpdated}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {pipeline.status === "running" ? (
                        <Button size="sm" variant="outline">
                          <Pause className="w-4 h-4 mr-1" /> Pause
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <Play className="w-4 h-4 mr-1" /> Start
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    {pipeline.steps.map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex flex-col items-center">
                          {getStepStatusIndicator(step.status)}
                          <span className="text-xs mt-1 text-center max-w-[80px]">{step.name}</span>
                        </div>
                        {index < pipeline.steps.length - 1 && <ArrowRight className="mx-2 text-muted-foreground" />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

