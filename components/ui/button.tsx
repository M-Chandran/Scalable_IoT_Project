"use client"

import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "outline" | "default"
  size?: "sm" | "md" | "lg" | "icon"
  className?: string
  children: React.ReactNode
}

export const buttonVariants = ({ variant = "default", size = "md" }: { variant?: "ghost" | "outline" | "default"; size?: "sm" | "md" | "lg" | "icon" }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  const variantStyles = {
    default: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
    ghost: "bg-transparent hover:bg-primary/10 focus:ring-primary",
    outline: "border border-primary hover:bg-primary/10 focus:ring-primary",
  }
  const sizeStyles = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
    icon: "h-10 w-10 p-0",
  }
  return `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "md", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${buttonVariants({ variant, size })} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
