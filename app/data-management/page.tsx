import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataStorageOverview } from "@/components/data-management/storage-overview"
import { DataProcessingPipelines } from "@/components/data-management/processing-pipelines"
import { BlockchainStorage } from "@/components/data-management/blockchain-storage"
import { QueryBuilder } from "@/components/data-management/query-builder"
import { EdgeCloudIntegration } from "@/components/data-management/edge-cloud-integration"

export const metadata: Metadata = {
  title: "Data Management - IoT Nexus",
  description: "Manage and process your IoT data efficiently",
}

export default function DataManagementPage() {
  return (
    <div className="container p-4 mx-auto space-y-6">
      <PageHeader title="Data Management" description="Manage your IoT data storage, processing, and retrieval" />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="query">Query Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <DataStorageOverview />
        </TabsContent>

        <TabsContent value="storage" className="mt-6">
          <EdgeCloudIntegration />
        </TabsContent>

        <TabsContent value="processing" className="mt-6">
          <DataProcessingPipelines />
        </TabsContent>

        <TabsContent value="blockchain" className="mt-6">
          <BlockchainStorage />
        </TabsContent>

        <TabsContent value="query" className="mt-6">
          <QueryBuilder />
        </TabsContent>
      </Tabs>
    </div>
  )
}

