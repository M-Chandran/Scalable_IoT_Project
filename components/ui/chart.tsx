"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | undefined>(undefined)

function useChartContext() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChartContext must be used within a ChartContainer")
  }
  return context
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

function ChartContainer({ config, className, children, ...props }: ChartContainerProps) {
  // Create CSS variables for each color
  const style = React.useMemo(() => {
    return Object.entries(config).reduce(
      (acc, [key, { color }]) => {
        acc[`--color-${key}`] = color
        return acc
      },
      {} as Record<string, string>,
    )
  }, [config])

  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("recharts-wrapper", className)} style={style} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content?: React.ReactNode
}

function ChartTooltip({ content, ...props }: ChartTooltipProps) {
  return content
}

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    dataKey: string
    payload: Record<string, any>
  }>
  label?: string
}

function ChartTooltipContent({ active, payload, label, className, ...props }: ChartTooltipContentProps) {
  const { config } = useChartContext()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className={cn("rounded-lg border bg-background p-2 shadow-md", className)} {...props}>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2 font-medium">{label}</div>
        {payload.map(({ name, value, dataKey }) => {
          const { label, color } = config[dataKey] || {
            label: name,
            color: "currentColor",
          }

          return (
            <React.Fragment key={name}>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <div className="text-right text-xs font-medium">{value}</div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent }

