import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Logo data - 12 logos split into 3 groups of 4
// Group 1: Cursor, Paper, Unicorn, Figma
// Group 2: Contra, Framer, MagicPath, Supabase
// Group 3: Perplexity, OpenAI, Anthropic, Grok
const logos = [
  // Group 1
  { id: 1,  name: 'Cursor',    src: `${import.meta.env.BASE_URL}logos/logo-1.svg`,  h: 20 },
  { id: 2,  name: 'Paper',     src: `${import.meta.env.BASE_URL}logos/logo-4.svg`,  h: 20 },
  { id: 3,  name: 'Unicorn',   src: `${import.meta.env.BASE_URL}logos/logo-12.svg`, h: 20 },
  { id: 4,  name: 'Figma',     src: `${import.meta.env.BASE_URL}logos/logo-9.svg`,  h: 20 },
  // Group 2
  { id: 5,  name: 'Claude',    src: `${import.meta.env.BASE_URL}logos/logo-2.svg`,  h: 20 },
  { id: 6,  name: 'Framer',    src: `${import.meta.env.BASE_URL}logos/logo-3.svg`,  h: 20 },
  { id: 7,  name: 'MagicPath', src: `${import.meta.env.BASE_URL}logos/logo-6.svg`,  h: 20 },
  { id: 8,  name: 'Supabase',  src: `${import.meta.env.BASE_URL}logos/logo-11.svg`, h: 20 },
  // Group 3
  { id: 9,  name: 'Perplexity',src: `${import.meta.env.BASE_URL}logos/logo-8.svg`,  h: 20 },
  { id: 10, name: 'OpenAI',    src: `${import.meta.env.BASE_URL}logos/logo-7.svg`,  h: 20 },
  { id: 11, name: 'Vercel',    src: `${import.meta.env.BASE_URL}logos/logo-5.svg`,  h: 9 },
  { id: 12, name: 'Grok',      src: `${import.meta.env.BASE_URL}logos/logo-10.svg`, h: 20 },
]

const LOGOS_PER_GROUP = 4
const NUM_GROUPS = 3
const DISPLAY_DURATION = 3000
const STAGGER_DELAY = 0.1

const logoGroups = Array.from({ length: NUM_GROUPS }, (_, groupIndex) =>
  logos.slice(groupIndex * LOGOS_PER_GROUP, (groupIndex + 1) * LOGOS_PER_GROUP)
)

function LogoCarousel({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const [currentGroup, setCurrentGroup] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % NUM_GROUPS)
    }, DISPLAY_DURATION)

    return () => clearInterval(interval)
  }, [])

  const currentLogos = logoGroups[currentGroup]

  return (
    <div className="relative w-full max-w-sm h-16 flex items-center justify-center overflow-visible">
      <AnimatePresence mode="sync">
        <motion.div
          key={currentGroup}
          className="absolute inset-0 flex items-center justify-center gap-4 overflow-visible px-6"
        >
          {currentLogos.map((logo, index) => (
            <motion.div
              key={logo.id}
              className="flex items-center justify-center h-10"
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
                className={`w-auto object-contain ${theme === 'dark' ? 'invert' : ''}`}
                style={{ height: `${logo.h}px` }}
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
