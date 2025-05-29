import type { Metadata } from "next"
import { DeviceHeader } from "@/app/devices/components/device-header"
import { DeviceGrid } from "@/app/devices/components/device-grid"
import { DeviceStats } from "@/app/devices/components/device-stats"
import { DeviceMap } from "@/app/devices/components/device-map"

export const metadata: Metadata = {
  title: "Devices - IoT Nexus",
  description: "Manage and monitor your IoT devices",
}

export default function DevicesPage() {
  return (
    <div className="container p-4 mx-auto space-y-6">
      <DeviceHeader />
      <DeviceStats />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <DeviceGrid />
        </div>
        <div>
          <DeviceMap />
        </div>
      </div>
    </div>
  )
}

