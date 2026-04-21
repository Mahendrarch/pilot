import { useState, useCallback } from 'react';

export default function Controls({ isMuted, onToggleMute, reducedMotion, onToggleReducedMotion, highContrast, onToggleHighContrast }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      fontFamily: 'Inter, sans-serif'
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Settings"
        aria-expanded={isOpen}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.2)',
          border: '1px solid rgba(99, 102, 241, 0.5)',
          color: '#e2e8f0',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.2s ease'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '54px',
            right: 0,
            background: 'rgba(26, 26, 46, 0.95)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '12px',
            padding: '16px',
            minWidth: '200px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div style={{ marginBottom: '12px' }}>
            <button
              onClick={onToggleMute}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                background: 'transparent',
                border: 'none',
                color: '#e2e8f0',
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              aria-pressed={isMuted}
            >
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Audio</span>
              <span style={{ 
                fontSize: '12px', 
                color: isMuted ? '#94a3b8' : '#6366f1',
                textTransform: 'uppercase'
              }}>
                {isMuted ? 'Off' : 'On'}
              </span>
            </button>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <button
              onClick={onToggleReducedMotion}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                background: 'transparent',
                border: 'none',
                color: '#e2e8f0',
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              aria-pressed={reducedMotion}
            >
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Reduced Motion</span>
              <span style={{ 
                fontSize: '12px', 
                color: reducedMotion ? '#6366f1' : '#94a3b8',
                textTransform: 'uppercase'
              }}>
                {reducedMotion ? 'On' : 'Off'}
              </span>
            </button>
          </div>

          <div>
            <button
              onClick={onToggleHighContrast}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                background: 'transparent',
                border: 'none',
                color: '#e2e8f0',
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              aria-pressed={highContrast}
            >
              <span style={{ fontSize: '14px', fontWeight: '500' }}>High Contrast</span>
              <span style={{ 
                fontSize: '12px', 
                color: highContrast ? '#6366f1' : '#94a3b8',
                textTransform: 'uppercase'
              }}>
                {highContrast ? 'On' : 'Off'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
