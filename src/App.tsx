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
      className={`min-h-screen flex items-center justify-center relative${isLight ? ' light' : ''}`}
      style={{ background: isLight ? '#FCFCFC' : '#101010' }}
    >
      <LogoCarousel theme={theme} />
      {!isEmbed && (
        <label className="toggle" aria-label="Toggle theme">
          <input type="checkbox" checked={isLight} onChange={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
          <span className="knob"></span>
        </label>
      )}
    </div>
  )
}

export default App
