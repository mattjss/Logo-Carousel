import { useState, useEffect } from 'react'
import LogoCarousel from './components/LogoCarousel'

function App() {
  const isEmbed = new URLSearchParams(window.location.search).has('embed')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    if (!isEmbed) return
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'theme') setTheme(e.data.theme)
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [isEmbed])

  const isLight = theme === 'light'

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{ background: isLight ? '#FCFCFC' : '#101010' }}
    >
      <LogoCarousel theme={theme} />
      {!isEmbed && (
        <button
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          style={{
            position: 'fixed', bottom: 24, right: 24,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            color: isLight ? '#191919' : '#fafafa', opacity: 0.5,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            {isLight && <circle cx="8" cy="8" r="4" fill="currentColor"/>}
          </svg>
        </button>
      )}
    </div>
  )
}

export default App
