import { brandColors } from '../data/config';

export default function SectionIndicator({ currentSection, totalSections, onNavigate }) {
  const sections = ['Home', 'About', 'Skills', 'Projects', 'Contact'];
  
  return (
    <nav 
      style={{
        position: 'fixed',
        left: '30px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        fontFamily: 'Inter, sans-serif'
      }}
      aria-label="Section navigation"
    >
      {sections.map((section, index) => {
        const isActive = index === currentSection;
        const isVisited = index < currentSection;
        
        return (
          <button
            key={section}
            onClick={() => onNavigate(index)}
            aria-label={`Navigate to ${section} section`}
            aria-current={isActive ? 'true' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 0',
              transition: 'all 0.3s ease'
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '2px',
                background: isActive 
                  ? brandColors.primary 
                  : isVisited 
                    ? `${brandColors.primary}60` 
                    : `${brandColors.muted}40`,
                transition: 'all 0.3s ease',
                transform: isActive ? 'scale(1.3)' : 'scale(1)',
                boxShadow: isActive ? `0 0 12px ${brandColors.primary}` : 'none'
              }}
            />
            <span
              style={{
                fontSize: '12px',
                fontWeight: isActive ? '600' : '400',
                color: isActive 
                  ? brandColors.text 
                  : isVisited 
                    ? brandColors.muted 
                    : `${brandColors.muted}60`,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                transition: 'all 0.3s ease'
              }}
            >
              {section}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
