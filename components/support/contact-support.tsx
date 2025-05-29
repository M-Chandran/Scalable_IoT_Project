"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Mail, MessageSquare, Phone, Send } from "lucide-react"

export function ContactSupport() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Contact Support</h3>
          <p className="text-muted-foreground">
            Get in touch with our support team for assistance with your IoT platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                <p className="text-muted-foreground max-w-md">
                  Thank you for contacting us. We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input id="contact-name" placeholder="Your name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="Your email address" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Subject</Label>
                    <Select defaultValue="technical">
                      <SelectTrigger id="contact-subject">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Inquiry</SelectItem>
                        <SelectItem value="account">Account Management</SelectItem>
                        <SelectItem value="sales">Sales Question</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="How can we help you?"
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Other Ways to Reach Us</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-medium">Phone Support</h5>
                    <p className="text-sm text-muted-foreground mb-1">Available Monday-Friday, 9am-5pm PT</p>
                    <p className="font-medium">+1 (800) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-medium">Email Support</h5>
                    <p className="text-sm text-muted-foreground mb-1">We'll respond within 24 hours</p>
                    <p className="font-medium">support@iotnexus.example.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-medium">Live Chat</h5>
                    <p className="text-sm text-muted-foreground mb-1">Available 24/7 for urgent issues</p>
                    <Button variant="outline" size="sm" className="mt-1">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-md bg-muted/50">
              <h4 className="font-medium mb-2">Support SLAs</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Critical Issues:</span>
                  <span className="font-medium">2 hour response</span>
                </li>
                <li className="flex justify-between">
                  <span>High Priority:</span>
                  <span className="font-medium">4 hour response</span>
                </li>
                <li className="flex justify-between">
                  <span>Medium Priority:</span>
                  <span className="font-medium">8 hour response</span>
                </li>
                <li className="flex justify-between">
                  <span>Low Priority:</span>
                  <span className="font-medium">24 hour response</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

