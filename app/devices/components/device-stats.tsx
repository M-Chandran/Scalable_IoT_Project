"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Battery, Cpu, Signal, Thermometer, WifiOff } from "lucide-react"
import { motion } from "framer-motion"

interface DeviceStat {
  title: string
  value: string
  icon: React.ReactNode
  color: string
}

export function DeviceStats() {
  const [stats, setStats] = useState<DeviceStat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats([
        {
          title: "Total Devices",
          value: "128",
          icon: <Cpu className="h-5 w-5" />,
          color: "bg-blue-500/10 text-blue-500",
        },
        {
          title: "Online",
          value: "112",
          icon: <Signal className="h-5 w-5" />,
          color: "bg-green-500/10 text-green-500",
        },
        {
          title: "Offline",
          value: "16",
          icon: <WifiOff className="h-5 w-5" />,
          color: "bg-red-500/10 text-red-500",
        },
        {
          title: "Low Battery",
          value: "8",
          icon: <Battery className="h-5 w-5" />,
          color: "bg-amber-500/10 text-amber-500",
        },
        {
          title: "Temperature Alert",
          value: "3",
          icon: <Thermometer className="h-5 w-5" />,
          color: "bg-purple-500/10 text-purple-500",
        },
      ])
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {loading
        ? Array(5)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="h-16 bg-muted/50 animate-pulse rounded-md"></div>
                </CardContent>
              </Card>
            ))
        : stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-3 rounded-full mb-3 ${stat.color}`}>{stat.icon}</div>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
    </div>
  )
}

