"use client"

import { useState, useEffect } from "react"
import { Moon, Search, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { NotificationsPopover } from "./notifications-popover"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 border-b bg-gradient-to-r from-cyan-900 via-blue-900 to-purple-900/90 backdrop-blur-lg border-cyan-600 shadow-lg shadow-cyan-500/50">
      <div className="flex items-center gap-4 md:w-1/3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-cyan-300" />
          <Input
            type="search"
            placeholder="Search devices, data, or settings..."
            className="w-full pl-10 bg-cyan-900/30 text-cyan-300 placeholder-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none backdrop-blur-md rounded-lg border border-cyan-600"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <NotificationsPopover />

        {mounted && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-cyan-300 hover:text-white">
                {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-cyan-900 border border-cyan-600 text-cyan-300">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full text-cyan-300 hover:text-white">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-cyan-900 border border-cyan-600 text-cyan-300">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
