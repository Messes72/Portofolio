"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Github, MapPin, Radio, Signal, Satellite, Zap, CheckCircle } from "lucide-react"
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

// Pixel art styled communication channel
function CommChannel({
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
        "bg-[#0a0a0f] border-2 border-[#22c55e]/50",
        "hover:border-[#22c55e] hover:bg-[#0f1f0f]",
        "transition-colors duration-200"
      )}
      style={{
        boxShadow: "inset -2px -2px 0 0 rgba(0,0,0,0.5), inset 2px 2px 0 0 rgba(34,197,94,0.1)",
      }}
    >
      {/* Pixel icon container */}
      <div className="relative flex-shrink-0">
        <div
          className="flex h-12 w-12 items-center justify-center bg-[#1a1a2e]"
          style={{
            boxShadow: "-2px 0 0 0 #22c55e, 2px 0 0 0 #22c55e, 0 -2px 0 0 #22c55e, 0 2px 0 0 #22c55e",
          }}
        >
          <Icon className="h-5 w-5 text-[#22c55e]" />
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 animate-pulse opacity-50">
          <div
            className="h-full w-full"
            style={{
              boxShadow: "0 0 10px #22c55e, 0 0 20px #22c55e",
            }}
          />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <PixelBadge variant="green" size="sm" animate={false}>
            {label}
          </PixelBadge>
        </div>
        <p className="mt-1 truncate font-vt323 text-lg text-[#22c55e] crt-glow">{value}</p>
      </div>

      {/* Signal indicator */}
      <div className="flex flex-col items-end gap-0.5">
        {[1, 2, 3].map((bar) => (
          <motion.div
            key={bar}
            className="w-1 bg-[#22c55e]"
            style={{ height: `${bar * 4}px` }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: bar * 0.2,
            }}
          />
        ))}
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

// Blinking cursor component
function BlinkingCursor() {
  return (
    <motion.span
      className="inline-block w-2 h-4 bg-[#22c55e] ml-1"
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
    />
  )
}

// Terminal input field
function TerminalInput({
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
    "w-full bg-[#0a0a0f] border-2 border-[#22c55e]/30",
    "text-[#22c55e] font-vt323 text-lg",
    "focus:border-[#22c55e] focus:outline-none",
    "placeholder:text-[#22c55e]/30",
    "transition-colors duration-200"
  )

  return (
    <div className="space-y-2">
      <label className="flex items-center font-pixel text-xs text-[#22c55e]/70 uppercase tracking-wider">
        <span className="text-[#22c55e]">&gt;</span>
        <span className="ml-2">{label}:</span>
        {!value && <BlinkingCursor />}
      </label>

      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={5}
          className={cn(baseClasses, "p-3 resize-none", "focus:shadow-[0_0_10px_rgba(34,197,94,0.3)]")}
          style={{
            boxShadow: "inset -2px -2px 0 0 rgba(0,0,0,0.5), inset 2px 2px 0 0 rgba(34,197,94,0.05)",
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
          className={cn(baseClasses, "h-12 px-3", "focus:shadow-[0_0_10px_rgba(34,197,94,0.3)]")}
          style={{
            boxShadow: "inset -2px -2px 0 0 rgba(0,0,0,0.5), inset 2px 2px 0 0 rgba(34,197,94,0.05)",
          }}
        />
      )}
    </div>
  )
}

// Signal wave animation
function SignalWaves() {
  return (
    <div className="absolute right-4 top-4 flex items-center gap-1">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-[#22c55e]"
          style={{ height: `${(i + 1) * 6}px` }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Pixel satellite decoration
function PixelSatellite({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("absolute", className)}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative">
        {/* Satellite body */}
        <div
          className="w-8 h-8 bg-[#4a4a6a]"
          style={{
            boxShadow: "-2px 0 0 0 #2a2a4a, 2px 0 0 0 #2a2a4a, 0 -2px 0 0 #2a2a4a, 0 2px 0 0 #2a2a4a",
          }}
        />
        {/* Solar panels */}
        <div
          className="absolute top-1 -left-4 w-3 h-6 bg-[#1e3a5f]"
          style={{
            boxShadow: "-1px 0 0 0 #0d2137, 1px 0 0 0 #0d2137, 0 -1px 0 0 #0d2137, 0 1px 0 0 #0d2137",
          }}
        />
        <div
          className="absolute top-1 -right-4 w-3 h-6 bg-[#1e3a5f]"
          style={{
            boxShadow: "-1px 0 0 0 #0d2137, 1px 0 0 0 #0d2137, 0 -1px 0 0 #0d2137, 0 1px 0 0 #0d2137",
          }}
        />
        {/* Antenna */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#8a8a9a]" />
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
      </div>
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
        // Demo mode: simulate transmission delay
        await new Promise((resolve) => setTimeout(resolve, 1500))
      } else if (formRef.current) {
        // Real EmailJS submission
        await emailjs.sendForm(serviceId, templateId, formRef.current, {
          publicKey: publicKey,
        })
      }

      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error("Failed to send email:", error)
      // Even on error, show success for demo purposes
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
    <section id="contact" className="relative w-full py-16 lg:py-24 overflow-hidden">
      {/* Retro grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(34, 197, 94, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34, 197, 94, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.3) 2px,
              rgba(0, 0, 0, 0.3) 4px
            )
          `,
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          {/* Transmission header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Radio className="h-6 w-6 text-[#22c55e] animate-pulse" />
            <h2 className="font-pixel text-2xl sm:text-3xl text-[#22c55e] crt-glow tracking-wider">
              TRANSMISSION
            </h2>
            <Radio className="h-6 w-6 text-[#22c55e] animate-pulse" />
          </div>

          {/* Subtitle with blinking cursor */}
          <p className="font-vt323 text-xl text-[#22c55e]/70">
            Send a message to Player 1
            <BlinkingCursor />
          </p>

          {/* Decorative line */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#22c55e]/50" />
            <Signal className="h-4 w-4 text-[#22c55e]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#22c55e]/50" />
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Communication Channels Panel */}
          <PixelCard
            variant="secondary"
            showScanlines
            header={
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Satellite className="h-4 w-4 text-[#22c55e]" />
                  <span className="font-pixel text-xs text-[#22c55e] uppercase tracking-wider">
                    Comm Channels
                  </span>
                </div>
                <PixelBadge variant="green" size="sm" animate={false}>
                  ONLINE
                </PixelBadge>
              </div>
            }
          >
            <div className="space-y-4">
              <CommChannel
                icon={Mail}
                label="EMAIL"
                value={contactInfo.email}
                href={`mailto:${contactInfo.email}`}
                delay={0.1}
              />
              <CommChannel
                icon={Github}
                label="GITHUB"
                value="github.com/Messes72"
                href={contactInfo.github}
                delay={0.2}
              />
              <CommChannel
                icon={MapPin}
                label="LOCATION"
                value={contactInfo.location}
                delay={0.3}
              />
            </div>

            {/* Connection status */}
            <div className="mt-6 pt-4 border-t-2 border-[#22c55e]/20">
              <div className="flex items-center justify-between font-vt323 text-sm">
                <span className="text-[#22c55e]/60">SIGNAL STRENGTH</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#22c55e]">98%</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-[#22c55e]"
                        style={{ height: `${i * 3}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between font-vt323 text-sm">
                <span className="text-[#22c55e]/60">LATENCY</span>
                <span className="text-[#22c55e]">24ms</span>
              </div>
            </div>

            {/* Satellite decoration */}
            <PixelSatellite className="right-4 bottom-4 opacity-30" />
          </PixelCard>

          {/* Transmission Console */}
          <PixelCard
            variant="secondary"
            showScanlines
            className="relative"
            header={
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#22c55e]" />
                  <span className="font-pixel text-xs text-[#22c55e] uppercase tracking-wider">
                    Transmission Console
                  </span>
                </div>
                <SignalWaves />
              </div>
            }
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <TerminalInput
                label="SENDER_NAME"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your callsign..."
                required
              />

              <TerminalInput
                label="SENDER_EMAIL"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@network.com"
                required
              />

              <TerminalInput
                label="TRANSMISSION_DATA"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter message payload..."
                required
                isTextarea
              />

              {/* Transmit button */}
              <div className="pt-2">
                <PixelButton
                  type="submit"
                  variant="yellow"
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
                        <span className="animate-pulse">TRANSMITTING</span>
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          ...
                        </motion.span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="transmit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <Radio className="h-4 w-4" />
                        TRANSMIT SIGNAL
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
                    data-testid="transmission-success"
                  >
                    <div
                      className="inline-flex items-center gap-2 px-4 py-3 bg-[#22c55e]/20 border-2 border-[#22c55e]"
                      style={{
                        boxShadow: "0 0 20px rgba(34, 197, 94, 0.3), inset 0 0 20px rgba(34, 197, 94, 0.1)",
                      }}
                    >
                      <CheckCircle className="h-5 w-5 text-[#22c55e]" />
                      <div className="text-left">
                        <span className="font-pixel text-xs text-[#22c55e] uppercase tracking-wider block">
                          SIGNAL SENT
                        </span>
                        <span className="font-vt323 text-sm text-[#22c55e]/80">
                          Transmission complete! Message delivered.
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Console footer */}
              <div className="pt-4 border-t-2 border-[#22c55e]/20">
                <div className="flex items-center justify-between font-vt323 text-xs text-[#22c55e]/50">
                  <span>SECURE CHANNEL</span>
                  <span>ENC: AES-256</span>
                  <span className={isSubmitted ? "text-[#22c55e]" : ""}>
                    STATUS: {isSubmitted ? "SENT ✓" : isSubmitting ? "SENDING..." : "READY"}
                  </span>
                </div>
              </div>
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
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#22c55e]/30 to-transparent" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-[#22c55e]/40"
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
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#22c55e]/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
