"use client"

import { useState } from "react"
import { Mail, Github, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = {
  email: "marioclaudius10@gmail.com",
  github: "https://github.com/Messes72",
  location: "Surabaya, Indonesia",
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", message: "" })

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="w-full py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-muted-foreground">
            Have a project in mind? Let&apos;s work together to bring your ideas to life.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Contact Info Card */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Feel free to reach out through any of these channels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email */}
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <span>{contactInfo.email}</span>
              </a>

              {/* GitHub */}
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Github className="h-5 w-5 text-primary" />
                </div>
                <span>github.com/Messes72</span>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <span>{contactInfo.location}</span>
              </div>

              {/* Social Links */}
              <div className="border-t pt-6">
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  Follow me on
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="h-10 w-10 rounded-full"
                  >
                    <a
                      href={contactInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="h-10 w-10 rounded-full"
                  >
                    <a
                      href={`mailto:${contactInfo.email}`}
                      aria-label="Send Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below and I&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>

                {isSubmitted && (
                  <p className="text-center text-sm text-green-600 dark:text-green-400">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Contact
