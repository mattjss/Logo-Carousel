# Logo Carousel

A smooth, animated logo carousel component built with React and TypeScript. Inspired by Rauno Freiberg's design work.

## Features

- ✨ Smooth infinite scroll animation
- 🎯 Pause on hover interaction
- 🎨 Clean, minimal design
- 📱 Responsive layout
- ⚡ Built with Vite for fast development
- 🔧 Fully customizable (speed, gap, logos)

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

## Usage

```tsx
import LogoCarousel from './components/LogoCarousel'

const logos = [
  { id: 1, name: 'Company 1', url: '/path/to/logo1.png' },
  { id: 2, name: 'Company 2', url: '/path/to/logo2.png' },
  // ... more logos
]

<LogoCarousel 
  logos={logos}
  speed={30}           // Animation speed (lower = faster)
  gap={48}             // Gap between logos in pixels
  pauseOnHover={true}  // Pause animation on hover
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
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Customization

The carousel uses CSS custom properties for easy customization. You can adjust:

- Animation speed via the `speed` prop
- Gap between logos via the `gap` prop
- Styling via CSS variables and the component's CSS file

## License

MIT


