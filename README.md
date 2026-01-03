# Logo Carousel

A smooth, animated logo carousel component built with React and TypeScript. Inspired by Rauno Freiberg's design work.

## Features

- ✨ Smooth infinite scroll animation with staggered transitions
- 🎯 Pause on hover interaction
- 🎨 Clean, minimal design with 312×44px container
- 📱 Responsive layout
- ⚡ Built with Vite for fast development
- 🔧 Fully customizable (speed, gap, logos, stagger delay)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

Or open `preview.html` directly in your browser.

## Usage

```tsx
import LogoCarousel from './components/LogoCarousel'

const logos = [
  { id: 1, name: 'Company 1', url: '/path/to/logo1.svg' },
  { id: 2, name: 'Company 2', url: '/path/to/logo2.svg' },
  // ... more logos
]

<LogoCarousel 
  logos={logos}
  logosPerRow={4}
  pauseDuration={4}        // Pause in milliseconds
  transitionDuration={600}  // Transition duration in milliseconds
  staggerDelay={30}        // Stagger delay between logos in milliseconds
/>
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── LogoCarousel.tsx
│   │   └── LogoCarousel.css
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── public/
│   └── assets/          # SVG logo files
├── index.html
├── preview.html         # Standalone preview
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Customization

The carousel uses CSS custom properties for easy customization. You can adjust:

- Animation speed via the `pauseDuration` and `transitionDuration` props
- Stagger delay via the `staggerDelay` prop
- Container size and styling via CSS
- Logo colors via CSS filters

## Specifications

- **Container**: 312×44px with `#1a1a1a` background
- **Logo spacing**: 24px between logos
- **Logo color**: `#AFAFAF`
- **Animation**: 4ms pause, then smooth upward cycling with staggered transitions
- **Layout**: 4 logos per row, cycling through 3 rows

## License

MIT
