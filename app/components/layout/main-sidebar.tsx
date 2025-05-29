"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Cpu,
  Database,
  HelpCircle,
  Home,
  LayoutDashboard,
  Settings,
  Shield,
  Zap,
  PlusCircle,
  ChevronRight,
  Laptop,
  Smartphone,
  Tablet,
  Router,
  Thermometer,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  badge?: string
}

interface DeviceItem {
  id: string
  name: string
  type: "laptop" | "smartphone" | "tablet" | "router" | "sensor"
  status: "online" | "offline" | "warning"
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <Home className="w-5 h-5" />,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "Devices",
    href: "/devices",
    icon: <Cpu className="w-5 h-5" />,
    badge: "12",
  },
  {
    title: "Data Management",
    href: "/data-management",
    icon: <Database className="w-5 h-5" />,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "Security",
    href: "/security",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="w-5 h-5" />,
  },
  {
    title: "Help & Support",
    href: "/support",
    icon: <HelpCircle className="w-5 h-5" />,
  },
  {
    title: "Real-time Monitoring",
    href: "/real-time-monitoring",
    icon: <Zap className="w-5 h-5" />,
  },
]

const deviceItems: DeviceItem[] = [
  { id: "dev-1", name: "Office Laptop", type: "laptop", status: "online" },
  { id: "dev-2", name: "Mobile Phone", type: "smartphone", status: "online" },
  { id: "dev-3", name: "Factory Tablet", type: "tablet", status: "warning" },
  { id: "dev-4", name: "Gateway Router", type: "router", status: "offline" },
  { id: "dev-5", name: "Temp Sensor A1", type: "sensor", status: "online" },
]

export default function MainSidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [isDevicesOpen, setIsDevicesOpen] = useState(false)
  const [mouseInside, setMouseInside] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Handle mouse movement to show sidebar
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= 20) {
        setIsOpen(true)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
      } else if (!mouseInside && e.clientX > 250) {
        if (!timeoutRef.current) {
          timeoutRef.current = setTimeout(() => {
            setIsOpen(false)
            timeoutRef.current = null
          }, 1000)
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isMobile, mouseInside])

  const getDeviceIcon = (type: DeviceItem["type"]) => {
    switch (type) {
      case "laptop":
        return <Laptop className="w-4 h-4" />
      case "smartphone":
        return <Smartphone className="w-4 h-4" />
      case "tablet":
        return <Tablet className="w-4 h-4" />
      case "router":
        return <Router className="w-4 h-4" />
      case "sensor":
        return <Thermometer className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: DeviceItem["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-gray-400"
      case "warning":
        return "bg-amber-500"
    }
  }

  return (
    <>
      <AnimatePresence>
        {(isOpen || isMobile) && (
          <motion.aside
            ref={sidebarRef}
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-gradient-to-b from-primary/10 to-background backdrop-blur-sm border-r border-border/50",
              "shadow-xl shadow-primary/5",
            )}
            onMouseEnter={() => setMouseInside(true)}
            onMouseLeave={() => setMouseInside(false)}
          >
            <div className="flex items-center h-16 px-6 border-b border-border/50">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative">
                  <Zap className="w-6 h-6 text-primary" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
                <motion.span
                  className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  IoT Nexus
                </motion.span>
              </Link>
            </div>

            <div className="flex-1 py-4 overflow-y-auto scrollbar-thin">
              <nav className="px-2 space-y-1">
                <TooltipProvider>
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Tooltip>
                        <TooltipTrigger>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200",
                              pathname === item.href
                                ? "bg-primary/10 text-primary shadow-sm"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                          >
                            <div className="relative">
                              {item.icon}
                              {item.badge && (
                                <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <span className="ml-3">{item.title}</span>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  ))}
                </TooltipProvider>
              </nav>

              <div className="px-4 mt-6">
                <Collapsible
                  open={isDevicesOpen}
                  onOpenChange={setIsDevicesOpen}
                  className="border rounded-lg overflow-hidden transition-all duration-200 hover:border-primary/50"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium">
                    <div className="flex items-center">
                      <Cpu className="w-4 h-4 mr-2" />
                      <span>My Devices</span>
                    </div>
                    <ChevronRight
                      className={cn("w-4 h-4 transition-transform duration-200", isDevicesOpen && "rotate-90")}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-2 space-y-1">
                      {deviceItems.map((device) => (
                        <motion.div
                          key={device.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center justify-between px-3 py-2 text-xs rounded-md hover:bg-muted/50"
                        >
                          <div className="flex items-center">
                            {getDeviceIcon(device.type)}
                            <span className="ml-2">{device.name}</span>
                          </div>
                          <div className={cn("w-2 h-2 rounded-full", getStatusColor(device.status))} />
                        </motion.div>
                      ))}
                      <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
                        <PlusCircle className="w-3 h-3 mr-1" />
                        Add Device
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            <motion.div
              className="p-4 border-t border-border/50 bg-gradient-to-r from-primary/5 to-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm">System Status: Online</span>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Invisible trigger area for mouse detection */}
      {!isMobile && !isOpen && <div className="fixed inset-y-0 left-0 z-30 w-5" onMouseEnter={() => setIsOpen(true)} />}
    </>
  )
}
