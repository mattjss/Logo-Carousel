import { useRef, useEffect } from 'react'
import './LogoCarousel.css'

export interface Logo {
  id: number | string
  name: string
  url: string
}

interface LogoCarouselProps {
  logos: Logo[]
  logosPerRow?: number
  pauseDuration?: number // Pause duration in milliseconds
  transitionDuration?: number // Transition duration in milliseconds
  staggerDelay?: number // Stagger delay between logos in milliseconds
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({
  logos,
  logosPerRow = 4,
  pauseDuration = 4, // 4ms pause
  transitionDuration = 600, // Smooth transition
  staggerDelay = 30, // 30ms stagger between logos
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Group logos into rows
  const rows: Logo[][] = []
  for (let i = 0; i < logos.length; i += logosPerRow) {
    rows.push(logos.slice(i, i + logosPerRow))
  }

  useEffect(() => {
    if (!trackRef.current || rows.length === 0) return

    const track = trackRef.current
    // Calculate total animation duration per cycle
    // pauseDuration (4ms) + transitionDuration (600ms) per row
    const totalDuration = (pauseDuration + transitionDuration) * rows.length
    track.style.setProperty('--animation-duration', `${totalDuration}ms`)
    track.style.setProperty('--pause-percent', `${(pauseDuration / (pauseDuration + transitionDuration)) * 100}%`)
    track.style.setProperty('--row-height', '44px') // Container height
    track.style.setProperty('--transition-duration', `${transitionDuration}ms`)
    track.style.setProperty('--stagger-delay', `${staggerDelay}ms`)
  }, [rows.length, pauseDuration, transitionDuration, staggerDelay])

  if (logos.length === 0 || rows.length === 0) {
    return <div className="logo-carousel logo-carousel--empty">No logos to display</div>
  }

  // Duplicate rows for seamless infinite scroll
  const duplicatedRows = [...rows, rows[0]]

  return (
    <div 
      className="logo-carousel" 
      ref={containerRef}
    >
      <div className="logo-carousel__wrapper">
        <div className="logo-carousel__track" ref={trackRef}>
          {duplicatedRows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="logo-carousel__row"
            >
              {row.map((logo, logoIndex) => (
                <div
                  key={logo.id}
                  className="logo-carousel__item"
                  style={{
                    '--logo-index': logoIndex,
                  } as React.CSSProperties}
                >
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="logo-carousel__image"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LogoCarousel
