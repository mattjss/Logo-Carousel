import { useState, useEffect, useCallback, useRef } from 'react'

// Logo data - 12 logos total
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

const NUM_SLOTS = 4
const LOGOS_PER_SLOT = 3 // Each slot cycles through 3 logos (12 / 4 = 3)

/**
 * Timing Model:
 * - Base cycle interval: 2000ms (time between full cascade cycles)
 * - Stagger delay: 100ms between each slot's swap
 * - Animation duration: 500ms per logo transition
 * 
 * Slot-to-Logo Mapping:
 * - Slot 0 cycles: logos 0, 4, 8  (indices 0, 4, 8)
 * - Slot 1 cycles: logos 1, 5, 9  (indices 1, 5, 9)
 * - Slot 2 cycles: logos 2, 6, 10 (indices 2, 6, 10)
 * - Slot 3 cycles: logos 3, 7, 11 (indices 3, 7, 11)
 * 
 * Each slot shows logo at index: slotIndex + (cycleStep * NUM_SLOTS)
 */
const CYCLE_INTERVAL = 2000
const STAGGER_DELAY = 100
const ANIMATION_DURATION = 500

// Get the logo index for a given slot and cycle step
function getLogoIndexForSlot(slotIndex: number, cycleStep: number): number {
  return slotIndex + (cycleStep % LOGOS_PER_SLOT) * NUM_SLOTS
}

interface SlotState {
  currentLogoIndex: number
  previousLogoIndex: number | null
  isAnimating: boolean
}

function LogoCarousel() {
  // Initialize slots: each slot starts showing its first logo
  const [slots, setSlots] = useState<SlotState[]>(() =>
    Array.from({ length: NUM_SLOTS }, (_, slotIndex) => ({
      currentLogoIndex: getLogoIndexForSlot(slotIndex, 0),
      previousLogoIndex: null,
      isAnimating: false,
    }))
  )
  
  const [cycleStep, setCycleStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timeoutsRef = useRef<number[]>([])

  // Clear all pending timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }, [])

  // Trigger a swap for a single slot
  const swapSlot = useCallback((slotIndex: number, newCycleStep: number) => {
    const newLogoIndex = getLogoIndexForSlot(slotIndex, newCycleStep)
    
    setSlots(prev => {
      const updated = [...prev]
      updated[slotIndex] = {
        currentLogoIndex: newLogoIndex,
        previousLogoIndex: updated[slotIndex].currentLogoIndex,
        isAnimating: true,
      }
      return updated
    })

    // Clear animating state after animation completes
    const timeoutId = window.setTimeout(() => {
      setSlots(prev => {
        const updated = [...prev]
        updated[slotIndex] = {
          ...updated[slotIndex],
          previousLogoIndex: null,
          isAnimating: false,
        }
        return updated
      })
    }, ANIMATION_DURATION)
    
    timeoutsRef.current.push(timeoutId)
  }, [])

  // Trigger a full cascade cycle with staggered delays
  const triggerCascade = useCallback(() => {
    const newCycleStep = cycleStep + 1
    setCycleStep(newCycleStep)

    // Stagger the swaps across slots
    for (let i = 0; i < NUM_SLOTS; i++) {
      const timeoutId = window.setTimeout(() => {
        swapSlot(i, newCycleStep)
      }, i * STAGGER_DELAY)
      timeoutsRef.current.push(timeoutId)
    }
  }, [cycleStep, swapSlot])

  // Auto-play effect
  useEffect(() => {
    if (isPaused) return

    const intervalId = setInterval(() => {
      triggerCascade()
    }, CYCLE_INTERVAL)

    return () => {
      clearInterval(intervalId)
      clearAllTimeouts()
    }
  }, [isPaused, triggerCascade, clearAllTimeouts])

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimeouts()
  }, [clearAllTimeouts])

  // Hover handlers
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <div
      className="w-[400px] h-[400px] bg-white border border-neutral-200 p-6 flex items-center justify-center shadow-sm select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo slots container */}
      <div className="w-full flex justify-between items-center gap-4">
          {slots.map((slot, slotIndex) => (
            <div
              key={slotIndex}
              className="logo-slot w-16 h-16 relative overflow-hidden flex items-center justify-center"
            >
              {/* Exiting logo (previous) */}
              {slot.previousLogoIndex !== null && slot.isAnimating && (
                <div className="logo-exit absolute inset-0 flex items-center justify-center">
                  <img
                    src={logos[slot.previousLogoIndex].src}
                    alt={logos[slot.previousLogoIndex].name}
                    className="max-w-full max-h-full object-contain"
                    draggable={false}
                  />
                </div>
              )}
              
              {/* Current logo (entering or at rest) */}
              <div
                className={`absolute inset-0 flex items-center justify-center ${
                  slot.isAnimating ? 'logo-enter' : ''
                }`}
              >
                <img
                  src={logos[slot.currentLogoIndex].src}
                  alt={logos[slot.currentLogoIndex].name}
                  className="max-w-full max-h-full object-contain"
                  draggable={false}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default LogoCarousel
