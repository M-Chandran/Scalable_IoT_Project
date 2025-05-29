import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { ReportGenerator } from "@/components/analytics/report-generator"
import { PredictiveAnalysis } from "@/components/analytics/predictive-analysis"
import { HeatmapVisualization } from "@/components/analytics/heatmap-visualization"
import { ExportOptions } from "@/components/analytics/export-options"

export const metadata: Metadata = {
  title: "Reports & Analytics - IoT Nexus",
  description: "Generate insights and reports from your IoT data",
}

export default function AnalyticsPage() {
  return (
    <div className="container p-4 mx-auto space-y-6">
      <PageHeader title="Reports & Analytics" description="Generate insights and custom reports from your IoT data" />

      <div className="grid gap-6 md:grid-cols-2">
        <ReportGenerator />
        <ExportOptions />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PredictiveAnalysis />
        <HeatmapVisualization />
      </div>
    </div>
  )
}

