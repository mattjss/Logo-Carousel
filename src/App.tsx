import { useState } from 'react'
import LogoCarousel from './components/LogoCarousel'
import './App.css'

// Logo data - 12 logos organized in rows of 4
const defaultLogos = [
  // Row 1: Perplexity, OpenAI, Grok, Anthropic
  { id: 1, name: 'Perplexity', url: '/assets/Perplexity.svg' },
  { id: 2, name: 'OpenAI', url: '/assets/OpenAI.svg' },
  { id: 3, name: 'Grok', url: '/assets/Grok.svg' },
  { id: 4, name: 'Anthropic', url: '/assets/Anthropic.svg' },
  // Row 2: Cursor, Framer, Unicorn, Supabase
  { id: 5, name: 'Cursor', url: '/assets/Cursor.svg' },
  { id: 6, name: 'Framer', url: '/assets/Framer.svg' },
  { id: 7, name: 'Unicorn', url: '/assets/Unicorn.svg' },
  { id: 8, name: 'Supabase', url: '/assets/Supabase.svg' },
  // Row 3: The rest (MagicPath, Figma, Paper, Contra)
  { id: 9, name: 'MagicPath', url: '/assets/MagicPath.svg' },
  { id: 10, name: 'Figma', url: '/assets/Figma.svg' },
  { id: 11, name: 'Paper', url: '/assets/Paper.svg' },
  { id: 12, name: 'Contra', url: '/assets/Contra.svg' },
]

function App() {
  const [logos] = useState(defaultLogos)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Logo Carousel</h1>
        <p>Smooth animated logo rotation</p>
      </header>
      <main className="app-main">
        <LogoCarousel logos={logos} />
      </main>
    </div>
  )
}

export default App

