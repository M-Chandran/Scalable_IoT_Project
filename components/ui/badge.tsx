"use client"

import React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({ className = "", children, ...props }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-white ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
