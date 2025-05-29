import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { SecurityDashboard } from "@/components/security/security-dashboard"
import { AnomalyDetectionDashboard } from "@/components/security/anomaly-detection-dashboard"
import { BlockchainAuditLogs } from "@/components/security/blockchain-audit-logs"
import { SecuritySettings } from "@/components/security/security-settings"

export const metadata: Metadata = {
  title: "Security & Anomaly Detection - IoT Nexus",
  description: "Monitor and secure your IoT infrastructure",
}

export default function SecurityPage() {
  return (
    <div className="container p-4 mx-auto space-y-6">
      <PageHeader
        title="Security & Anomaly Detection"
        description="Monitor threats and detect unusual patterns in your IoT data"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <SecurityDashboard />
        <AnomalyDetectionDashboard />
      </div>

      <BlockchainAuditLogs />
      <SecuritySettings />
    </div>
  )
}

