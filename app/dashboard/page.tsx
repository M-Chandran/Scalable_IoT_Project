import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardMetrics } from "@/components/dashboard/metrics"
import { DeviceStatus } from "@/components/dashboard/device-status"
import { DataFlow } from "@/components/dashboard/data-flow"
import { RecentAlerts } from "@/components/dashboard/recent-alerts"
import { DataVisualization } from "@/components/dashboard/data-visualization"
import { ThreeDimensionalView } from "@/components/dashboard/3d-view"
import { AnomalyDetection } from "@/components/dashboard/anomaly-detection"

export const metadata: Metadata = {
  title: "Dashboard - IoT Nexus",
  description: "Real-time IoT data insights and monitoring",
}

export default function DashboardPage() {
  return (
    <div className="container p-4 mx-auto space-y-6">
      <DashboardHeader />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardMetrics />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DeviceStatus />
        <DataFlow />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <DataVisualization />
        </div>
        <RecentAlerts />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ThreeDimensionalView />
        <AnomalyDetection />
      </div>
    </div>
  )
}

