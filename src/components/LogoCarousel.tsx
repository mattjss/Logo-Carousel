import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Logo data - 12 logos split into 3 groups of 4
const logos = [
  { id: 1, name: 'Cursor', src: '/logos/logo-1.svg' },
  { id: 2, name: 'Contra', src: '/logos/logo-2.svg' },
  { id: 3, name: 'Framer', src: '/logos/logo-3.svg' },
  { id: 4, name: 'Paper', src: '/logos/logo-4.svg' },
  { id: 5, name: 'Anthropic', src: '/logos/logo-5.svg' },
  { id: 6, name: 'MagicPath', src: '/logos/logo-6.svg' },
  { id: 7, name: 'OpenAI', src: '/logos/logo-7.svg' },
  { id: 8, name: 'Perplexity', src: '/logos/logo-8.svg' },
  { id: 9, name: 'Figma', src: '/logos/logo-9.svg' },
  { id: 10, name: 'Grok', src: '/logos/logo-10.svg' },
  { id: 11, name: 'Supabase', src: '/logos/logo-11.svg' },
  { id: 12, name: 'Unicorn', src: '/logos/logo-12.svg' },
]

/**
 * Animation Timing:
 * - 3 groups of 4 logos, cycling infinitely
 * - Display duration: 3 seconds per group
 * - Transition duration: 0.6 seconds
 * - Stagger delay: 60ms per logo (index * 0.06)
 * 
 * Animation Effects:
 * - Opacity: 0 → 1 (enter), 1 → 0 (exit)
 * - Vertical: y: -10 → 0 (enter), y: 0 → 10 (exit)
 * - Left-to-right stagger creates wave effect
 */

const LOGOS_PER_GROUP = 4
const NUM_GROUPS = 3
const DISPLAY_DURATION = 3000 // 3 seconds per group
const STAGGER_DELAY = 0.06 // 60ms between each logo

// Split logos into groups
const logoGroups = Array.from({ length: NUM_GROUPS }, (_, groupIndex) =>
  logos.slice(groupIndex * LOGOS_PER_GROUP, (groupIndex + 1) * LOGOS_PER_GROUP)
)

function LogoCarousel() {
  const [currentGroup, setCurrentGroup] = useState(0)

  // Auto-advance through groups
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % NUM_GROUPS)
    }, DISPLAY_DURATION)

    return () => clearInterval(interval)
  }, [])

  const currentLogos = logoGroups[currentGroup]

  return (
    <div className="relative w-full max-w-xl h-24 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGroup}
          className="absolute inset-0 flex items-center justify-center gap-5"
        >
          {currentLogos.map((logo, index) => (
            <motion.div
              key={logo.id}
              className="flex items-center justify-center h-20"
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{
                duration: 0.7,
                delay: index * STAGGER_DELAY,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-6 w-auto object-contain"
                draggable={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default LogoCarousel
