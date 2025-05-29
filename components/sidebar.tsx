"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Cpu, Database, Home, LayoutDashboard, Menu, MessageSquare, Settings, Shield, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMobile } from "@/hooks/use-mobile"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "Devices",
    href: "/devices",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: "Data Streams",
    href: "/data-streams",
    icon: <Database className="w-5 h-5" />,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "Alerts",
    href: "/alerts",
    icon: <MessageSquare className="w-5 h-5" />,
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
]

export default function Sidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed z-50 top-4 left-4" onClick={toggleSidebar}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out",
          isMobile && !isOpen && "-translate-x-full",
        )}
      >
        <div className="flex items-center h-16 px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">IoT Platform</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                  pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
                )}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  )
}

