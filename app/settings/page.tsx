import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/settings/user-management"
import { ApiIntegrations } from "@/components/settings/api-integrations"
import { DashboardPreferences } from "@/components/settings/dashboard-preferences"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { AccountSettings } from "@/components/settings/account-settings"

export const metadata: Metadata = {
  title: "Settings - IoT Nexus",
  description: "Configure your IoT platform settings",
}

export default function SettingsPage() {
  return (
    <div className="container p-4 mx-auto space-y-6">
      <PageHeader title="Settings" description="Configure your account, users, and platform settings" />

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-6">
          <AccountSettings />
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <UserManagement />
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <ApiIntegrations />
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <DashboardPreferences />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

