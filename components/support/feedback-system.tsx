"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Send, ThumbsDown, ThumbsUp } from "lucide-react"

export function FeedbackSystem() {
  const [feedbackType, setFeedbackType] = useState("feature")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [quickRating, setQuickRating] = useState<"positive" | "negative" | null>(null)

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    setFeedbackSubmitted(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setFeedbackSubmitted(false)
    }, 3000)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="detailed">
          <TabsList className="mb-6">
            <TabsTrigger value="quick">Quick Rating</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="quick">
            <div className="flex flex-col items-center justify-center py-12">
              <h3 className="text-lg font-medium mb-6">How would you rate your experience?</h3>

              <div className="flex gap-8">
                <Button
                  variant={quickRating === "positive" ? "default" : "outline"}
                  size="lg"
                  className="flex flex-col gap-2 h-auto py-6 px-8"
                  onClick={() => setQuickRating("positive")}
                >
                  <ThumbsUp
                    className={`h-12 w-12 ${quickRating === "positive" ? "text-primary-foreground" : "text-primary"}`}
                  />
                  <span>Positive</span>
                </Button>

                <Button
                  variant={quickRating === "negative" ? "default" : "outline"}
                  size="lg"
                  className="flex flex-col gap-2 h-auto py-6 px-8"
                  onClick={() => setQuickRating("negative")}
                >
                  <ThumbsDown
                    className={`h-12 w-12 ${quickRating === "negative" ? "text-primary-foreground" : "text-primary"}`}
                  />
                  <span>Negative</span>
                </Button>
              </div>

              {quickRating && (
                <div className="mt-8 w-full max-w-md">
                  <Textarea placeholder={`Tell us more about your ${quickRating} experience...`} className="mb-4" />
                  <Button className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="detailed">
            {feedbackSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Thank You for Your Feedback!</h3>
                <p className="text-muted-foreground max-w-md">
                  Your feedback has been submitted successfully. We appreciate your input and will use it to improve our
                  platform.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="feedback-type">Feedback Type</Label>
                    <Select value={feedbackType} onValueChange={setFeedbackType}>
                      <SelectTrigger id="feedback-type">
                        <SelectValue placeholder="Select feedback type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="improvement">Improvement Suggestion</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback-title">Title</Label>
                    <Input id="feedback-title" placeholder="Brief summary of your feedback" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback-description">Description</Label>
                    <Textarea
                      id="feedback-description"
                      placeholder="Please provide detailed information about your feedback..."
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  {feedbackType === "bug" && (
                    <div className="space-y-2">
                      <Label htmlFor="steps-to-reproduce">Steps to Reproduce</Label>
                      <Textarea
                        id="steps-to-reproduce"
                        placeholder="Please list the steps to reproduce this issue..."
                        className="min-h-[100px]"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="feedback-email">Your Email (optional)</Label>
                    <Input
                      id="feedback-email"
                      type="email"
                      placeholder="Enter your email if you'd like us to follow up"
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full sm:w-auto">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

