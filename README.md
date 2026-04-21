# Living Loom - Personal Branding Experience

An immersive, interactive personal branding portfolio that replaces conventional web navigation with a textile-weaving metaphor.

## Features

### Core Experience
- **Interactive Canvas**: Real-time thread physics simulation responding to cursor/touch movement
- **Scroll-Based Navigation**: Vertical scroll advances through sections (Landing → About → Skills → Projects → Contact)
- **Dynamic Brand Mark**: Mathematical knot logo that morphs based on interaction and state
- **Generative Audio**: Interaction-mapped sound design (loom clicks, tension hums, harmonic resonances)

### Sections
1. **Landing**: Name weaves into view with pulsing competency colors
2. **About**: Bio and philosophy statement displayed over fabric backdrop
3. **Skills**: Technologies represented as distinct weave patterns (twill, jacquard, silk, canvas)
4. **Projects**: Dense glowing motifs that unravel on hover to reveal details
5. **Contact**: Message form where typed characters spin into threads

### Accessibility & Preferences
- Respects `prefers-reduced-motion` system preference
- Toggle controls for:
  - Audio on/off
  - Reduced motion mode
  - High contrast mode
- Full keyboard navigation support
- Screen reader compatible content overlay
- WCAG 2.2 AA compliance targets

### Performance
- Initial meaningful interaction under 2 seconds
- Sustained 60fps on modern hardware
- Graceful degradation on constrained devices
- Optimized asset delivery

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Rendering**: HTML5 Canvas API
- **Audio**: Web Audio API
- **State Management**: React Hooks + localStorage persistence
- **Styling**: CSS Custom Properties + Inline Styles

## Project Structure

```
living-loom/
├── src/
│   ├── components/
│   │   ├── WeaveCanvas.jsx      # Main canvas rendering component
│   │   ├── Controls.jsx          # Settings toggle panel
│   │   ├── SectionIndicator.jsx  # Navigation dots
│   │   └── ContactForm.jsx       # Contact interface
│   ├── hooks/
│   │   └── useHooks.js           # Custom React hooks
│   ├── utils/
│   │   └── physics.js            # Thread physics & audio utilities
│   ├── data/
│   │   └── config.js             # Profile, skills, projects configuration
│   ├── styles/
│   │   └── global.css            # Base styles & CSS variables
│   ├── App.jsx                   # Main application component
│   └── main.jsx                  # Entry point
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The development server will start at `http://localhost:3000`.

### Production Build

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Configuration

Edit `src/data/config.js` to customize:

- Profile information (name, title, bio, philosophy)
- Skills (technology name, years, weave pattern type, color)
- Projects (title, description, technologies, URLs, media)
- Brand colors
- Contact information

## Accessibility

The application implements:

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation (Tab, Enter, Arrow keys)
- Focus indicators
- Screen reader announcements via `aria-live` regions
- Reduced motion support
- High contrast mode
- Minimum 4.5:1 contrast ratios

## Browser Support

- Chrome (last 3 versions)
- Firefox (last 3 versions)
- Safari (last 3 versions)
- Edge (last 3 versions)

## License

MIT

---

Built with ❤️ by Mahendrarch
