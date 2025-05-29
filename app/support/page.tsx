import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SupportChatbot } from "@/components/support/support-chatbot"
import { Documentation } from "@/components/support/documentation"
import { CommunityForum } from "@/components/support/community-forum"
import { FeedbackSystem } from "@/components/support/feedback-system"
import { ContactSupport } from "@/components/support/contact-support"

export const metadata: Metadata = {
  title: "Help & Support - IoT Nexus",
  description: "Get help and support for your IoT platform",
}

export default function SupportPage() {
  return (
    <div className="container p-4 mx-auto space-y-6">
      <PageHeader title="Help & Support" description="Get assistance, documentation, and community support" />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="docs" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="docs">Documentation</TabsTrigger>
              <TabsTrigger value="forum">Community</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="docs" className="mt-6">
              <Documentation />
            </TabsContent>

            <TabsContent value="forum" className="mt-6">
              <CommunityForum />
            </TabsContent>

            <TabsContent value="feedback" className="mt-6">
              <FeedbackSystem />
            </TabsContent>

            <TabsContent value="contact" className="mt-6">
              <ContactSupport />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <SupportChatbot />
        </div>
      </div>
    </div>
  )
}

