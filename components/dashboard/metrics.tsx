"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, Cpu, Database, Server, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Metric {
  title: string
  value: string
  change: number
  icon: React.ReactNode
}

export function DashboardMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      title: "Active Devices",
      value: "0",
      change: 0,
      icon: <Cpu className="w-5 h-5" />,
    },
    {
      title: "Data Points",
      value: "0",
      change: 0,
      icon: <Database className="w-5 h-5" />,
    },
    {
      title: "Processing Rate",
      value: "0",
      change: 0,
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "Server Load",
      value: "0",
      change: 0,
      icon: <Server className="w-5 h-5" />,
    },
  ])

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setMetrics([
        {
          title: "Active Devices",
          value: "1,284",
          change: 12.5,
          icon: <Cpu className="w-5 h-5" />,
        },
        {
          title: "Data Points",
          value: "8.2M",
          change: 24.3,
          icon: <Database className="w-5 h-5" />,
        },
        {
          title: "Processing Rate",
          value: "2.4K/s",
          change: 18.2,
          icon: <Zap className="w-5 h-5" />,
        },
        {
          title: "Server Load",
          value: "42%",
          change: -8.4,
          icon: <Server className="w-5 h-5" />,
        },
      ])
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {metrics.map((metric, index) => (
        <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <div className="p-2 bg-primary/10 rounded-full text-primary">{metric.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="flex items-center mt-1 text-xs">
              {metric.change > 0 ? (
                <ArrowUp className="w-3 h-3 mr-1 text-green-500" />
              ) : (
                <ArrowDown className="w-3 h-3 mr-1 text-red-500" />
              )}
              <span className={cn("font-medium", metric.change > 0 ? "text-green-500" : "text-red-500")}>
                {Math.abs(metric.change)}%
              </span>
              <span className="ml-1 text-muted-foreground">from last week</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

