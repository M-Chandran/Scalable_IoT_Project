"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Plus, Search, ThumbsUp } from "lucide-react"

interface ForumPost {
  id: string
  title: string
  author: {
    name: string
    avatar?: string
  }
  category: string
  replies: number
  views: number
  likes: number
  lastActivity: string
  solved: boolean
}

export function CommunityForum() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const forumPosts: ForumPost[] = [
    {
      id: "post-1",
      title: "How to set up MQTT connection with multiple devices?",
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg",
      },
      category: "connectivity",
      replies: 12,
      views: 234,
      likes: 8,
      lastActivity: "2 hours ago",
      solved: true,
    },
    {
      id: "post-2",
      title: "Data visualization not working on Firefox",
      author: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg",
      },
      category: "bugs",
      replies: 5,
      views: 87,
      likes: 2,
      lastActivity: "1 day ago",
      solved: false,
    },
    {
      id: "post-3",
      title: "Best practices for securing IoT devices",
      author: {
        name: "Michael Brown",
        avatar: "/placeholder.svg",
      },
      category: "security",
      replies: 24,
      views: 512,
      likes: 45,
      lastActivity: "3 days ago",
      solved: true,
    },
    {
      id: "post-4",
      title: "How to implement edge computing with our platform?",
      author: {
        name: "Emily Davis",
        avatar: "/placeholder.svg",
      },
      category: "architecture",
      replies: 8,
      views: 176,
      likes: 12,
      lastActivity: "1 week ago",
      solved: true,
    },
    {
      id: "post-5",
      title: "Integration with AWS IoT Core not working",
      author: {
        name: "David Wilson",
        avatar: "/placeholder.svg",
      },
      category: "integrations",
      replies: 3,
      views: 65,
      likes: 1,
      lastActivity: "2 days ago",
      solved: false,
    },
  ]

  const filteredPosts = forumPosts.filter(
    (post) =>
      (categoryFilter === "all" || post.category === categoryFilter) &&
      post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getCategoryBadge = (category: string) => {
    const categories: Record<string, { label: string; variant: "default" | "outline" | "secondary" | "destructive" }> =
      {
        connectivity: { label: "Connectivity", variant: "default" },
        bugs: { label: "Bugs", variant: "destructive" },
        security: { label: "Security", variant: "outline" },
        architecture: { label: "Architecture", variant: "secondary" },
        integrations: { label: "Integrations", variant: "outline" },
      }

    const categoryInfo = categories[category] || { label: category, variant: "default" }

    return <Badge variant={categoryInfo.variant}>{categoryInfo.label}</Badge>
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search forum..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="connectivity">Connectivity</SelectItem>
                <SelectItem value="bugs">Bugs</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="architecture">Architecture</SelectItem>
                <SelectItem value="integrations">Integrations</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </div>

        <ScrollArea className="h-[500px]">
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="p-4 border rounded-lg transition-all duration-200 hover:bg-accent/50">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        By {post.author.name} • {post.lastActivity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getCategoryBadge(post.category)}
                    {post.solved && (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500"
                      >
                        Solved
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.replies} replies</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{post.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.likes} likes</span>
                  </div>
                </div>
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No discussions found</h3>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any discussions matching your criteria. Try different keywords or start a new
                  discussion.
                </p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  New Discussion
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

