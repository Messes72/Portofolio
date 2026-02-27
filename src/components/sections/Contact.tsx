"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Github, MapPin, Leaf, Flower, TreePine, CheckCircle, Send } from "lucide-react"
import emailjs from "@emailjs/browser"
import { PixelCard } from "@/components/pixel/PixelCard"
import { PixelButton } from "@/components/pixel/PixelButton"
import { PixelBadge } from "@/components/pixel/PixelBadge"
import { cn } from "@/lib/utils"

const contactInfo = {
  email: "marioclaudius10@gmail.com",
  github: "https://github.com/Messes72",
  location: "Surabaya, Indonesia",
}

// Nature themed contact card
function NatureContactCard({
  icon: Icon,
  label,
  value,
  href,
  delay = 0,
}: {
  icon: React.ElementType
  label: string
  value: string
  href?: string
  delay?: number
}) {
  const content = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      className={cn(
        "flex items-center gap-4 p-4",
        "bg-[#FFF8E7] border-2 border-[#8D6E63]/30",
        "hover:border-[#7CB342] hover:bg-[#FFF8E7]/90",
        "transition-colors duration-200"
      )}
      style={{
        boxShadow: "inset -2px -2px 0 0 rgba(0,0,0,0.05), inset 2px 2px 0 0 rgba(255,255,255,0.5)",
      }}
    >
      {/* Nature icon container */}
      <div className="relative flex-shrink-0">
        <div
          className="flex h-12 w-12 items-center justify-center bg-[#7CB342]"
          style={{
            boxShadow: "-2px 0 0 0 #558B2F, 2px 0 0 0 #558B2F, 0 -2px 0 0 #558B2F, 0 2px 0 0 #558B2F",
          }}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <PixelBadge variant="green" size="sm" animate={false}>
            {label}
          </PixelBadge>
        </div>
        <p className="mt-1 truncate font-vt323 text-lg text-[#3E2723]">{value}</p>
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }

  return content
}

// Nature input field
function NatureInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  isTextarea = false,
}: {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder: string
  required?: boolean
  isTextarea?: boolean
}) {
  const baseClasses = cn(
    "w-full bg-white border-2 border-[#8D6E63]/30",
    "text-[#3E2723] font-vt323 text-lg",
    "focus:border-[#7CB342] focus:outline-none",
    "placeholder:text-[#8D6E63]/50",
    "transition-colors duration-200"
  )

  return (
    <div className="space-y-2">
      <label className="flex items-center font-pixel text-xs text-[#7CB342] uppercase tracking-wider">
        <Leaf className="w-3 h-3 mr-2" />
        {label}:
      </label>

      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={5}
          className={cn(baseClasses, "p-3 resize-none")}
          style={{
            boxShadow: "inset -2px -2px 0 0 rgba(0,0,0,0.05), inset 2px 2px 0 0 rgba(255,255,255,0.5)",
          }}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={cn(baseClasses, "h-12 px-3")}
          style={{
            boxShadow: "inset -2px -2px 0 0 rgba(0,0,0,0.05), inset 2px 2px 0 0 rgba(255,255,255,0.5)",
          }}
        />
      )}
    </div>
  )
}

// Floating nature decoration
function FloatingNature({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("absolute pointer-events-none", className)}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Flower className="w-6 h-6 text-[#F48FB1]/60" />
    </motion.div>
  )
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const isDemoMode = process.env.NEXT_PUBLIC_CONTACT_DEMO_MODE === "true"
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (isDemoMode || !serviceId || !templateId || !publicKey) {
        await new Promise((resolve) => setTimeout(resolve, 1500))
      } else if (formRef.current) {
        await emailjs.sendForm(serviceId, templateId, formRef.current, {
          publicKey: publicKey,
        })
      }

      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })

      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error("Failed to send email:", error)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setIsSubmitted(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="relative w-full py-16 lg:py-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #87CEEB 0%, #B0E0E6 30%, #FFF8E7 70%, #9CCC65 100%)",
      }}
    >
      {/* Decorative grass foreground */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(124, 179, 66, 0.3) 100%)",
        }}
      />

      {/* Floating nature elements */}
      <FloatingNature className="top-20 left-[10%]" />
      <FloatingNature className="top-40 right-[15%]" />
      <FloatingNature className="bottom-40 left-[20%]" />

      {/* Floating leaves */}
      <motion.div
        className="absolute top-32 left-[25%] text-[#7CB342]/40"
        animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Leaf className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute bottom-60 right-[20%] text-[#66BB6A]/40"
        animate={{ y: [0, -12, 0], rotate: [0, -8, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Leaf className="w-6 h-6" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          {/* Nature header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <TreePine className="h-6 w-6 text-[#7CB342]" />
            <h2 className="font-pixel text-2xl sm:text-3xl text-[#3E2723] tracking-wider">
              SEND A MESSAGE
            </h2>
            <TreePine className="h-6 w-6 text-[#7CB342]" />
          </div>

          {/* Subtitle */}
          <p className="font-vt323 text-xl text-[#6D4C41]">
            Get in touch for adventures and collaborations
          </p>

          {/* Decorative line */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#7CB342]/50" />
            <Leaf className="h-4 w-4 text-[#7CB342]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#7CB342]/50" />
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Contact Info Panel */}
          <PixelCard
            variant="highlight"
            className="bg-[#FFF8E7] border-[#7CB342]"
            header={
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#7CB342]" />
                  <span className="font-pixel text-xs text-[#3E2723] uppercase tracking-wider">
                    Contact Info
                  </span>
                </div>
                <PixelBadge variant="green" size="sm" animate={false}>
                  AVAILABLE
                </PixelBadge>
              </div>
            }
          >
            <div className="space-y-4">
              <NatureContactCard
                icon={Mail}
                label="EMAIL"
                value={contactInfo.email}
                href={`mailto:${contactInfo.email}`}
                delay={0.1}
              />
              <NatureContactCard
                icon={Github}
                label="GITHUB"
                value="github.com/Messes72"
                href={contactInfo.github}
                delay={0.2}
              />
              <NatureContactCard
                icon={MapPin}
                label="LOCATION"
                value={contactInfo.location}
                delay={0.3}
              />
            </div>

            {/* Status */}
            <div className="mt-6 pt-4 border-t-2 border-[#8D6E63]/20">
              <div className="flex items-center justify-between font-vt323 text-sm">
                <span className="text-[#6D4C41]">AVAILABILITY</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#7CB342]">Open to work</span>
                  <div className="w-2 h-2 bg-[#7CB342] rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </PixelCard>

          {/* Message Form */}
          <PixelCard
            variant="highlight"
            className="bg-[#FFF8E7] relative border-[#7CB342]"
            header={
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4 text-[#7CB342]" />
                  <span className="font-pixel text-xs text-[#3E2723] uppercase tracking-wider">
                    Message Form
                  </span>
                </div>
              </div>
            }
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <NatureInput
                label="YOUR NAME"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name..."
                required
              />

              <NatureInput
                label="YOUR EMAIL"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />

              <NatureInput
                label="YOUR MESSAGE"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
                isTextarea
              />

              {/* Submit button */}
              <div className="pt-2">
                <PixelButton
                  type="submit"
                  variant="green"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <span className="animate-pulse">SENDING</span>
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          ...
                        </motion.span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="send"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <Send className="h-4 w-4" />
                        SEND MESSAGE
                      </motion.span>
                    )}
                  </AnimatePresence>
                </PixelButton>
              </div>

              {/* Success message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                  >
                    <div
                      className="inline-flex items-center gap-2 px-4 py-3 bg-[#7CB342]/20 border-2 border-[#7CB342]"
                      style={{
                        boxShadow: "0 0 20px rgba(124, 179, 66, 0.3)",
                      }}
                    >
                      <CheckCircle className="h-5 w-5 text-[#7CB342]" />
                      <div className="text-left">
                        <span className="font-pixel text-xs text-[#7CB342] uppercase tracking-wider block">
                          MESSAGE SENT
                        </span>
                        <span className="font-vt323 text-sm text-[#6D4C41]">
                          Thanks for reaching out! I&apos;ll reply soon.
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </PixelCard>
        </div>

        {/* Bottom decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#7CB342]/30 to-transparent" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-[#7CB342]/40"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#7CB342]/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
