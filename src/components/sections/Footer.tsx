"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, Leaf, Sparkles } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function Footer() {
  const [showThankYou, setShowThankYou] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  }, [prefersReducedMotion])

  // Thank you message cycle
  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setShowThankYou((prev) => !prev)
    }, 4000)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  // Floating firefly component
  const Firefly = ({ delay = 0, className = "" }: { delay?: number; className?: string }) => (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -40, -20, 0],
        opacity: [0.2, 1, 0.5, 0.2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <div className="w-2 h-2 bg-[#FFD54F] rounded-full shadow-[0_0_8px_#FFD54F]" />
    </motion.div>
  )

  // Pixel campfire component
  const PixelCampfire = () => {
    return (
      <div className="relative w-24 h-24">
        {/* Fire glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 179, 0, 0.3) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Fire logs */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="w-8 h-3 bg-[#8D6E63]" />
          <div className="w-8 h-3 bg-[#6D4C41]" />
        </div>

        {/* Animated flames */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          {/* Base flame */}
          <motion.div
            className="w-6 h-10 bg-[#FF6B35]"
            style={{
              boxShadow: "0 0 10px rgba(255, 107, 53, 0.8)",
            }}
            animate={{
              scaleY: [1, 1.1, 0.9, 1],
              scaleX: [1, 0.9, 1.05, 1],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Middle flame */}
          <motion.div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-8 bg-[#FFD54F]"
            animate={{
              scaleY: [1, 1.15, 0.85, 1],
              scaleX: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 0.25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1,
            }}
          />

          {/* Top flame */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-4 bg-[#FFF8E7]"
            animate={{
              scaleY: [1, 0.8, 1.2, 1],
              opacity: [1, 0.8, 1, 0.9, 1],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.15,
            }}
          />
        </div>

        {/* Sparks */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FFD54F]"
            initial={{ bottom: 20, left: "50%", opacity: 1 }}
            animate={{
              bottom: [20, 40, 60],
              left: ["50%", `${50 + (i - 1) * 20}%`, `${50 + (i - 1) * 30}%`],
              opacity: [1, 0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    )
  }

  // Sitting character sprite
  const SittingCharacter = () => (
    <motion.div
      className="relative w-16 h-16"
      animate={{
        y: [0, -2, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Character sitting by fire - pixel style */}
      <svg viewBox="0 0 32 32" className="w-full h-full">
        {/* Body */}
        <rect x="8" y="14" width="16" height="12" fill="#7CB342" />
        {/* Head */}
        <rect x="10" y="6" width="12" height="10" fill="#F5CBA7" />
        {/* Hair/Leaf crown */}
        <rect x="8" y="4" width="4" height="4" fill="#66BB6A" />
        <rect x="14" y="2" width="4" height="4" fill="#7CB342" />
        <rect x="20" y="4" width="4" height="4" fill="#66BB6A" />
        {/* Arms */}
        <rect x="4" y="16" width="4" height="8" fill="#F5CBA7" />
        <rect x="24" y="16" width="4" height="8" fill="#F5CBA7" />
        {/* Legs (sitting) */}
        <rect x="8" y="26" width="6" height="4" fill="#5D4037" />
        <rect x="18" y="26" width="6" height="4" fill="#5D4037" />
      </svg>
    </motion.div>
  )

  // Wood sign component
  const WoodSign = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div
      className={`relative ${className}`}
      style={{
        backgroundColor: "#8D6E63",
        boxShadow: `
          -2px 0 0 0 #6D4C41,
          2px 0 0 0 #6D4C41,
          0 -2px 0 0 #6D4C41,
          0 2px 0 0 #6D4C41,
          inset -2px -2px 0 0 rgba(0,0,0,0.1),
          inset 2px 2px 0 0 rgba(255,255,255,0.2)
        `,
      }}
    >
      <div className="px-4 py-2">{children}</div>
    </div>
  )

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #87CEEB 0%, #FFB74D 30%, #FF8A65 60%, #5D4037 100%)",
      }}
    >
      {/* Stars appearing at top */}
      <div className="absolute top-4 left-0 right-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 30}px`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles
              className="w-2 h-2"
              style={{
                color: ["#FFD54F", "#FFF8E7", "#FFECB3"][i % 3],
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Floating fireflies */}
      <Firefly delay={0} className="top-20 left-[10%]" />
      <Firefly delay={2} className="top-40 right-[15%]" />
      <Firefly delay={4} className="top-32 left-[30%]" />
      <Firefly delay={1.5} className="top-60 right-[25%]" />
      <Firefly delay={3} className="top-24 right-[40%]" />
      <Firefly delay={5} className="top-48 left-[20%]" />

      {/* Ground/Grass silhouette at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, transparent 0%, rgba(93, 64, 55, 0.3) 50%, rgba(46, 125, 50, 0.4) 100%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto">
          {/* Section Header - Wood sign style */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-center"
          >
            <WoodSign>
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-[#FFF8E7]"
                style={{
                  fontFamily: "var(--font-pixel), 'Press Start 2P', monospace",
                  textShadow: "2px 2px 0px #6D4C41",
                }}
              >
                REST AREA
              </h2>
            </WoodSign>
          </motion.div>

          {/* Campfire Scene */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative flex items-end justify-center gap-8 py-8"
          >
            {/* Character on left */}
            <SittingCharacter />

            {/* Campfire in center */}
            <PixelCampfire />

            {/* Character on right (reflected) */}
            <motion.div
              className="scale-x-[-1]"
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <SittingCharacter />
            </motion.div>
          </motion.div>

          {/* Message Area */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            {/* Alternating messages */}
            <AnimatePresence mode="wait">
              {showThankYou ? (
                <motion.p
                  key="thanks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg sm:text-xl text-[#FFF8E7] font-vt323"
                  style={{
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  Thanks for visiting my portfolio!
                </motion.p>
              ) : (
                <motion.div
                  key="camping"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Leaf className="w-5 h-5 text-[#7CB342]" />
                  <p
                    className="text-lg sm:text-xl text-[#FFF8E7] font-vt323"
                    style={{
                      textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    }}
                  >
                    Take a moment to rest by the fire
                  </p>
                  <Leaf className="w-5 h-5 text-[#7CB342]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Back to Top Button - Wood style */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              {/* Button shadow */}
              <div
                className="absolute inset-0 translate-x-1 translate-y-1 rounded-none"
                style={{ backgroundColor: "#6D4C41" }}
              />
              {/* Button face */}
              <div
                className="relative flex items-center gap-2 px-6 py-3 border-2"
                style={{
                  background: "linear-gradient(to bottom, #A1887F, #8D6E63)",
                  borderColor: "#6D4C41",
                }}
              >
                <ArrowUp className="w-4 h-4 text-[#FFF8E7]" />
                <span
                  className="text-sm text-[#FFF8E7] uppercase tracking-wider font-pixel"
                  style={{
                    textShadow: "1px 1px 0px rgba(0,0,0,0.3)",
                  }}
                >
                  Back to Top
                </span>
              </div>
            </motion.button>
          </motion.div>

          {/* Credits Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 pt-6 border-t border-[#8D6E63]/30 w-full"
          >
            <div className="text-center space-y-3">
              {/* Year */}
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-8 text-sm">
                <span
                  className="text-[#FFD54F] font-pixel text-xs"
                  style={{
                    textShadow: "1px 1px 0px rgba(0,0,0,0.3)",
                  }}
                >
                  <span className="text-[#FFF8E7]/70">YEAR:</span> 2025
                </span>
              </div>

              {/* Developer Name */}
              <p
                className="text-[#FFF8E7]/70 text-xs tracking-wider font-vt323"
              >
                Crafted by
              </p>
              <p
                className="text-[#FFF8E7] text-sm sm:text-base tracking-wider font-pixel"
                style={{
                  textShadow: "2px 2px 0px rgba(0,0,0,0.3)",
                }}
              >
                MARIO CLAUDIUS HADINATA
              </p>

              {/* Tools used */}
              <motion.div
                className="flex items-center justify-center gap-3 mt-4"
                animate={prefersReducedMotion ? {} : {
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <span className="text-[#FFF8E7]/50 text-xs font-vt323">
                  Built with
                </span>
                <span className="text-[#4FC3F7] text-xs font-pixel">
                  NEXT.JS
                </span>
                <span className="text-[#FFF8E7]/50 text-xs">+</span>
                <span className="text-[#7CB342] text-xs font-pixel">
                  TAILWIND
                </span>
                <span className="text-[#FFF8E7]/50 text-xs">+</span>
                <span className="text-[#F48FB1] text-xs font-pixel">
                  LOVE
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative pixels at bottom */}
          <div className="w-full max-w-md mx-auto mt-4">
            <div className="flex justify-center gap-1">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2"
                  style={{
                    backgroundColor: ["#7CB342", "#4FC3F7", "#FFD54F", "#F48FB1"][i % 4],
                  }}
                  animate={prefersReducedMotion ? {} : {
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom grass decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
        <svg
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {[...Array(20)].map((_, i) => (
            <rect
              key={i}
              x={i * 5}
              y={20 - Math.random() * 10}
              width="4"
              height="20"
              fill="#2E7D32"
              opacity={0.3 + Math.random() * 0.3}
            />
          ))}
        </svg>
      </div>
    </footer>
  )
}

export default Footer
