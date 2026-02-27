"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Gamepad2, ArrowUp, RotateCcw } from "lucide-react"
import { PixelButton } from "@/components/pixel/PixelButton"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const COUNTDOWN_NUMBERS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

type MenuOption = "continue" | "retry" | "credits"

export function Footer() {
  const [countdownIndex, setCountdownIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<MenuOption>("continue")
  const [showGameOver, setShowGameOver] = useState(true)
  const [showContinuePrompt, setShowContinuePrompt] = useState(true)
  const [showHighScoreEasterEgg, setShowHighScoreEasterEgg] = useState(false)
  const [hasContinued, setHasContinued] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Countdown timer effect
  useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setCountdownIndex((prev) => (prev + 1) % COUNTDOWN_NUMBERS.length)
    }, 800)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  // Blinking "CONTINUE?" effect
  useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setShowContinuePrompt((prev) => !prev)
    }, 600)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  const scrollToTop = useCallback(() => {
    setHasContinued(true)
    setShowGameOver(false)
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
    // Reset after animation
    setTimeout(() => {
      setHasContinued(false)
      setShowGameOver(true)
    }, 2000)
  }, [prefersReducedMotion])

  const handleRetry = useCallback(() => {
    window.location.reload()
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, option: MenuOption) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        if (option === "continue") scrollToTop()
        else if (option === "retry") handleRetry()
      }
    },
    [scrollToTop, handleRetry]
  )

  const menuOptions: { id: MenuOption; label: string; action: () => void; icon: React.ReactNode }[] = [
    { id: "continue", label: "CONTINUE", action: scrollToTop, icon: <ArrowUp className="w-4 h-4" /> },
    { id: "retry", label: "RETRY", action: handleRetry, icon: <RotateCcw className="w-4 h-4" /> },
    {
      id: "credits",
      label: "CREDITS",
      action: () => window.open("https://github.com/Messes72", "_blank"),
      icon: <Github className="w-4 h-4" />,
    },
  ]

  // Scanlines overlay component
  const Scanlines = () => (
    <div
      className="absolute inset-0 pointer-events-none z-10 opacity-[0.08]"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.15),
          rgba(0, 0, 0, 0.15) 1px,
          transparent 1px,
          transparent 2px
        )`,
      }}
    />
  )

  // Pixel decorations
  const PixelDecoration = ({ className }: { className?: string }) => (
    <div className={className}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex gap-1">
          {[...Array(4)].map((_, j) => (
            <motion.div
              key={j}
              className="w-2 h-2 bg-current"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2 + j * 0.1,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <footer className="relative w-full bg-[#0D0221] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0221] via-[#1a0b2e] to-[#0D0221]" />

      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <Scanlines />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto">
          {/* Pixel Decorations - Top Left */}
          <PixelDecoration className="absolute top-8 left-8 text-cyan-400 hidden sm:block" />

          {/* Pixel Decorations - Top Right */}
          <PixelDecoration className="absolute top-8 right-8 text-pink-400 hidden sm:block" />

          {/* GAME OVER Header */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-center"
          >
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-wider"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                color: hasContinued ? "#39FF14" : "#FF4444",
                textShadow: hasContinued
                  ? `4px 4px 0px #1a6b0e, -2px -2px 0px #7fff7f, 0 0 20px rgba(57, 255, 20, 0.5)`
                  : `4px 4px 0px #8B0000, -2px -2px 0px #FF8888, 0 0 20px rgba(255, 68, 68, 0.5)`,
              }}
            >
              {hasContinued ? "CONTINUED!" : "GAME OVER"}
            </h2>
          </motion.div>

          {/* Controller Icon */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cyan-400"
          >
            <Gamepad2 className="w-12 h-12 sm:w-16 sm:h-16" strokeWidth={1.5} />
          </motion.div>

          {/* CONTINUE? Text with blinking effect */}
          <AnimatePresence>
            {showGameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showContinuePrompt || prefersReducedMotion ? 1 : 0.3 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p
                  className="text-xl sm:text-2xl font-bold tracking-widest text-cyan-400"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    textShadow: "0 0 10px rgba(34, 211, 238, 0.8)",
                  }}
                >
                  CONTINUE?
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Countdown Numbers */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {COUNTDOWN_NUMBERS.map((num, index) => (
              <motion.span
                key={num}
                className={`text-lg sm:text-xl font-bold ${
                  index === countdownIndex ? "text-green-400" : "text-white/30"
                }`}
                style={{ fontFamily: "var(--font-pixel), 'Press Start 2P', monospace" }}
                animate={{
                  scale: index === countdownIndex ? 1.3 : 1,
                  opacity: index === countdownIndex ? 1 : 0.3,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {num}
              </motion.span>
            ))}
          </div>

          {/* Menu Options */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
            role="menu"
            aria-label="Game menu options"
          >
            {menuOptions.map((option, index) => (
              <motion.div
                key={option.id}
                role="menuitem"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, option.id)}
                onMouseEnter={() => setSelectedOption(option.id)}
                onFocus={() => setSelectedOption(option.id)}
                className="relative"
              >
                {/* Selection indicator */}
                {selectedOption === option.id && (
                  <motion.span
                    layoutId="selection"
                    className="absolute -left-6 top-1/2 -translate-y-1/2 text-yellow-400"
                    style={{ fontFamily: "var(--font-pixel), 'Press Start 2P', monospace" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    ▶
                  </motion.span>
                )}

                <PixelButton
                  variant={option.id === "continue" ? "green" : option.id === "retry" ? "yellow" : "cyan"}
                  size="md"
                  onClick={option.action}
                  className="flex items-center gap-2"
                >
                  {option.icon}
                  {option.label}
                </PixelButton>
              </motion.div>
            ))}
          </motion.div>

          {/* Menu Selection Indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-white/40 mt-2"
            style={{ fontFamily: "var(--font-vt323)" }}
            aria-live="polite"
          >
            Selected: {selectedOption.toUpperCase()}
          </motion.p>

          {/* Insert Coin Reference */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-xs sm:text-sm text-yellow-400/70 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-pixel), 'Press Start 2P', monospace" }}
          >
            INSERT COIN TO CONTINUE
          </motion.p>

          {/* Credits Section - Arcade Style */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 pt-8 border-t border-white/10 w-full"
          >
            <div className="text-center space-y-3">
              {/* Credits Display */}
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-8 text-sm">
                <span
                  className="text-cyan-400"
                  style={{ fontFamily: "var(--font-pixel), 'Press Start 2P', monospace" }}
                >
                  <span className="text-white/60">CREDITS:</span> 2025
                </span>
              </div>

              {/* Developer Name */}
              <p
                className="text-white/80 text-xs sm:text-sm tracking-wider"
                style={{ fontFamily: "var(--font-pixel), 'Press Start 2P', monospace" }}
              >
                <span className="text-white/50">DEVELOPED BY:</span>
              </p>
              <p
                className="text-green-400 text-sm sm:text-base tracking-wider"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  textShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
                }}
              >
                MARIO CLAUDIUS HADINATA
              </p>

              {/* Thank You Message */}
              <motion.p
                className="text-pink-400 text-xs sm:text-sm mt-4"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  textShadow: "0 0 10px rgba(236, 72, 153, 0.5)",
                }}
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        opacity: [0.5, 1, 0.5],
                      }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                THANKS FOR PLAYING
              </motion.p>

              {/* High Score Easter Egg */}
              <div className="mt-4">
                <motion.button
                  onClick={() => setShowHighScoreEasterEgg(!showHighScoreEasterEgg)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400/50 rounded px-2 py-1"
                  aria-label="Click to reveal easter egg"
                >
                  <p
                    className="text-white/30 text-[10px] hover:text-yellow-400/50 transition-colors"
                    style={{ fontFamily: "var(--font-pixel), 'Press Start 2P', monospace" }}
                  >
                    HIGH SCORE: 999999
                  </p>
                </motion.button>

                {/* Easter Egg Reveal */}
                <AnimatePresence>
                  {showHighScoreEasterEgg && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded border border-purple-500/30"
                    >
                      <p
                        className="text-yellow-400 text-xs mb-2"
                        style={{ fontFamily: "var(--font-pixel), 'Press Start 2P', monospace" }}
                      >
                        🎉 SECRET UNLOCKED! 🎉
                      </p>
                      <p
                        className="text-cyan-400 text-xs"
                        style={{ fontFamily: "var(--font-vt323)", fontSize: "14px" }}
                      >
                        You found the hidden easter egg!<br/>
                        Thanks for exploring my portfolio.<br/>
                        <span className="text-pink-400">Made with ❤️ and lots of ☕</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Decorative Bottom Border */}
          <div className="w-full max-w-md mx-auto">
            <div className="flex justify-center gap-1">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3"
                  style={{
                    backgroundColor:
                      i % 2 === 0 ? "#FF6B9D" : i % 3 === 0 ? "#00D9FF" : "#FFD93D",
                  }}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          opacity: [0.4, 1, 0.4],
                          scale: [1, 1.1, 1],
                        }
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
