import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Logo data - 12 logos split into 3 groups of 4
// Group 1: Cursor, Paper, Unicorn, Figma
// Group 2: Contra, Framer, MagicPath, Supabase
// Group 3: Perplexity, OpenAI, Anthropic, Grok
const logos = [
  // Group 1
  { id: 1, name: 'Cursor', src: '/logos/logo-1.svg' },
  { id: 2, name: 'Paper', src: '/logos/logo-4.svg' },
  { id: 3, name: 'Unicorn', src: '/logos/logo-12.svg' },
  { id: 4, name: 'Figma', src: '/logos/logo-9.svg' },
  // Group 2
  { id: 5, name: 'Contra', src: '/logos/logo-2.svg' },
  { id: 6, name: 'Framer', src: '/logos/logo-3.svg' },
  { id: 7, name: 'MagicPath', src: '/logos/logo-6.svg' },
  { id: 8, name: 'Supabase', src: '/logos/logo-11.svg' },
  // Group 3
  { id: 9, name: 'Perplexity', src: '/logos/logo-8.svg' },
  { id: 10, name: 'OpenAI', src: '/logos/logo-7.svg' },
  { id: 11, name: 'Anthropic', src: '/logos/logo-5.svg' },
  { id: 12, name: 'Grok', src: '/logos/logo-10.svg' },
]

/**
 * Animation Timing:
 * - 3 groups of 4 logos, cycling infinitely
 * - Display duration: 3 seconds per group
 * - Transition duration: 1.0 seconds (slower for smooth blur)
 * - Stagger delay: 100ms per logo (visible wave effect)
 * 
 * Animation Effects:
 * - Opacity: 0 → 1 (enter), 1 → 0 (exit)
 * - Vertical: y: 20 → 0 (enter from below), y: 0 → -20 (exit upward)
 * - Symmetric blur: 6px on BOTH incoming and outgoing, 0px at rest
 * - Left-to-right stagger creates visible wave effect
 * 
 * CRITICAL: mode="sync" allows incoming/outgoing logos to overlap!
 */

const LOGOS_PER_GROUP = 4
const NUM_GROUPS = 3
const DISPLAY_DURATION = 3000 // 3 seconds per group
const STAGGER_DELAY = 0.1 // 100ms between each logo for visible wave

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
    <div className="relative w-full max-w-4xl h-28 flex items-center justify-center overflow-visible">
      <AnimatePresence mode="sync">
        <motion.div
          key={currentGroup}
          className="absolute inset-0 flex items-center justify-center gap-5 overflow-visible"
        >
          {currentLogos.map((logo, index) => (
            <motion.div
              key={logo.id}
              className="flex items-center justify-center h-20"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{
                duration: 1.0,
                delay: index * STAGGER_DELAY,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-16 w-auto object-contain"
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
