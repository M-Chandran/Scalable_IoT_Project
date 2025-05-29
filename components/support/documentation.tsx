"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Book, BookOpen, FileText, Search } from "lucide-react"

interface DocSection {
  id: string
  title: string
  items: DocItem[]
}

interface DocItem {
  id: string
  title: string
  description: string
  tags: string[]
  updated: string
}

export function Documentation() {
  const [searchQuery, setSearchQuery] = useState("")

  const docSections: DocSection[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      items: [
        {
          id: "doc-1",
          title: "Platform Overview",
          description: "An introduction to the IoT Nexus platform and its capabilities.",
          tags: ["beginner", "overview"],
          updated: "2 days ago",
        },
        {
          id: "doc-2",
          title: "Quick Start Guide",
          description: "Get up and running with your first IoT device in minutes.",
          tags: ["beginner", "setup"],
          updated: "1 week ago",
        },
        {
          id: "doc-3",
          title: "Dashboard Navigation",
          description: "Learn how to navigate the platform dashboard and access key features.",
          tags: ["beginner", "ui"],
          updated: "3 days ago",
        },
      ],
    },
    {
      id: "device-management",
      title: "Device Management",
      items: [
        {
          id: "doc-4",
          title: "Adding New Devices",
          description: "Step-by-step guide to adding and configuring new IoT devices.",
          tags: ["devices", "setup"],
          updated: "5 days ago",
        },
        {
          id: "doc-5",
          title: "Device Groups & Tagging",
          description: "Organize your devices with groups and tags for easier management.",
          tags: ["devices", "organization"],
          updated: "1 month ago",
        },
        {
          id: "doc-6",
          title: "Firmware Updates",
          description: "How to manage and deploy firmware updates to your devices.",
          tags: ["devices", "maintenance"],
          updated: "2 weeks ago",
        },
      ],
    },
    {
      id: "data-processing",
      title: "Data Processing & Storage",
      items: [
        {
          id: "doc-7",
          title: "Data Ingestion Pipelines",
          description: "Configure data ingestion pipelines for your IoT data streams.",
          tags: ["data", "advanced"],
          updated: "3 weeks ago",
        },
        {
          id: "doc-8",
          title: "Edge Computing Setup",
          description: "Leverage edge computing for faster data processing and reduced latency.",
          tags: ["data", "edge", "advanced"],
          updated: "1 month ago",
        },
        {
          id: "doc-9",
          title: "Blockchain Data Verification",
          description: "Implement blockchain-based verification for your critical IoT data.",
          tags: ["data", "security", "blockchain"],
          updated: "2 months ago",
        },
      ],
    },
  ]

  const filteredSections = docSections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    }))
    .filter((section) => section.items.length > 0)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documentation..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <BookOpen className="mr-2 h-4 w-4" />
            Browse All
          </Button>
        </div>

        <ScrollArea className="h-[500px] pr-4">
          {filteredSections.length > 0 ? (
            <Accordion type="multiple" defaultValue={["getting-started"]}>
              {filteredSections.map((section) => (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger className="text-lg">{section.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      {section.items.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 border rounded-lg transition-all duration-200 hover:bg-accent/50"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-primary" />
                              <h3 className="font-medium">{item.title}</h3>
                            </div>
                            <span className="text-xs text-muted-foreground">Updated {item.updated}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <Book className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any documentation matching your search. Try different keywords or browse all
                documentation.
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

