import { useState, useEffect } from 'react';
import WeaveCanvas from './components/WeaveCanvas';
import Controls from './components/Controls';
import SectionIndicator from './components/SectionIndicator';
import ContactForm from './components/ContactForm';
import { useReducedMotion, useMousePosition, useScrollProgress, useLocalStorage, useAudioContext } from './hooks/useHooks';

const SECTIONS = ['landing', 'about', 'skills', 'projects', 'contact'];

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [reducedMotion, setReducedMotion] = useLocalStorage('reduced-motion', prefersReducedMotion);
  const [isMuted, setIsMuted] = useLocalStorage('audio-muted', false);
  const [highContrast, setHighContrast] = useLocalStorage('high-contrast', false);
  const mousePosition = useMousePosition();
  const { progress, currentSection } = useScrollProgress();
  const { audioContext, masterGain, toggleMute, initAudio } = useAudioContext();
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = reducedMotion ? 'auto' : 'smooth';
  }, [reducedMotion]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    if (reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }, [reducedMotion]);

  const handleFirstInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      initAudio();
    }
  };

  const handleNavigate = (sectionIndex) => {
    const sectionHeight = window.innerHeight;
    window.scrollTo({
      top: sectionIndex * sectionHeight,
      behavior: reducedMotion ? 'auto' : 'smooth'
    });
  };

  const handleToggleMute = () => {
    handleFirstInteraction();
    toggleMute();
    setIsMuted(!isMuted);
  };

  return (
    <main 
      className="app"
      onClick={handleFirstInteraction}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'var(--color-bg)'
      }}
      role="application"
      aria-label="Living Loom Portfolio Experience"
    >
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: `${SECTIONS.length * 100}vh`,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <WeaveCanvas
        mousePosition={mousePosition.position}
        velocity={mousePosition.velocity}
        reducedMotion={reducedMotion}
        audioContext={audioContext}
        masterGain={masterGain}
        currentSection={currentSection}
        onSectionChange={() => {}}
      />

      <SectionIndicator
        currentSection={currentSection}
        totalSections={SECTIONS.length}
        onNavigate={handleNavigate}
      />

      <Controls
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
      />

      {currentSection === 4 && (
        <ContactForm audioContext={audioContext} masterGain={masterGain} />
      )}

      {!hasInteracted && !reducedMotion && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(99, 102, 241, 0.2)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            borderRadius: '24px',
            padding: '10px 20px',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={handleFirstInteraction}
          role="button"
          tabIndex={0}
          aria-label="Click to enable audio and full interaction"
        >
          <span style={{
            fontSize: '13px',
            color: '#e2e8f0',
            fontWeight: '500'
          }}>
            Click anywhere to enable audio ✦
          </span>
        </div>
      )}

      <div 
        className="visually-hidden"
        role="region"
        aria-label="Page sections"
        aria-live="polite"
      >
        <h1>Mahendrarch - Creative Technical Craftsman</h1>
        <nav aria-label="Main navigation">
          <ul>
            {SECTIONS.map((section, index) => (
              <li key={section}>
                <a href={`#section-${index}`}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  {currentSection === index ? ' (current)' : ''}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p>Navigate by scrolling or using the section indicators on the left.</p>
      </div>

      <style>{`
        .app {
          scroll-snap-type: y mandatory;
          overflow-y: auto;
          height: 100vh;
        }
        
        @media (max-width: 768px) {
          .controls-container {
            right: 10px !important;
            top: 10px !important;
          }
          
          .section-indicator {
            left: 10px !important;
          }
          
          .contact-form {
            right: 10px !important;
            bottom: 10px !important;
            width: calc(100vw - 20px) !important;
          }
        }
      `}</style>
    </main>
  );
}
