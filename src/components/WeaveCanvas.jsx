import { useRef, useEffect, useState, useCallback } from 'react';
import { WeavePattern, BrandKnot, playWeaveSound, playTransitionSound } from '../utils/physics';
import { profile, brandColors, skills, projects } from '../data/config';

const SECTIONS = ['landing', 'about', 'skills', 'projects', 'contact'];

export default function WeaveCanvas({ 
  mousePosition, 
  velocity, 
  reducedMotion, 
  audioContext, 
  masterGain,
  currentSection,
  onSectionChange 
}) {
  const canvasRef = useRef(null);
  const weavePatternRef = useRef(null);
  const brandKnotRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = rect.width * dpr;
        canvasRef.current.height = rect.height * dpr;
        canvasRef.current.style.width = `${rect.width}px`;
        canvasRef.current.style.height = `${rect.height}px`;
        
        const ctx = canvasRef.current.getContext('2d');
        ctx.scale(dpr, dpr);
        
        setDimensions({ width: rect.width, height: rect.height });
        
        if (!weavePatternRef.current) {
          weavePatternRef.current = new WeavePattern(rect.width, rect.height, {
            warpCount: 60,
            weftCount: 40,
            colors: [brandColors.primary, brandColors.secondary, brandColors.accent, '#14b8a6']
          });
        } else {
          weavePatternRef.current.resize(rect.width, rect.height);
        }
        
        brandKnotRef.current = new BrandKnot(rect.width / 2, rect.height / 2, 80);
        setIsInitialized(true);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const drawLanding = useCallback((ctx, time) => {
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    
    if (brandKnotRef.current) {
      brandKnotRef.current.x = centerX;
      brandKnotRef.current.y = centerY;
      brandKnotRef.current.update(time, Math.abs(velocity.x) + Math.abs(velocity.y));
      brandKnotRef.current.draw(ctx);
    }
    
    ctx.font = 'bold 48px Cormorant Garamond';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const nameGradient = ctx.createLinearGradient(centerX - 200, centerY, centerX + 200, centerY);
    nameGradient.addColorStop(0, brandColors.primary);
    nameGradient.addColorStop(0.5, brandColors.secondary);
    nameGradient.addColorStop(1, brandColors.accent);
    
    ctx.fillStyle = nameGradient;
    ctx.globalAlpha = 0.9;
    ctx.fillText(profile.name, centerX, centerY);
    ctx.globalAlpha = 1;
    
    ctx.font = '300 20px Inter';
    ctx.fillStyle = brandColors.muted;
    ctx.fillText(profile.title, centerX, centerY + 50);
    
    ctx.font = '16px Inter';
    ctx.fillStyle = brandColors.muted;
    ctx.globalAlpha = 0.7;
    ctx.fillText('Scroll to explore ↓', centerX, centerY + 150);
    ctx.globalAlpha = 1;
  }, [dimensions, velocity]);

  const drawAbout = useCallback((ctx) => {
    const centerX = dimensions.width / 2;
    const maxWidth = Math.min(dimensions.width - 100, 700);
    
    ctx.font = '600 36px Cormorant Garamond';
    ctx.fillStyle = brandColors.text;
    ctx.textAlign = 'center';
    ctx.fillText('The Weaver', centerX, 120);
    
    ctx.font = '300 18px Inter';
    ctx.fillStyle = brandColors.muted;
    ctx.textAlign = 'center';
    
    const bioLines = wrapText(ctx, profile.bio, maxWidth);
    bioLines.forEach((line, index) => {
      ctx.fillText(line, centerX, 180 + index * 32);
    });
    
    ctx.font = 'italic 20px Cormorant Garamond';
    ctx.fillStyle = brandColors.primary;
    const philosophyLines = wrapText(ctx, `"${profile.philosophy}"`, maxWidth);
    philosophyLines.forEach((line, index) => {
      ctx.fillText(line, centerX, 180 + (bioLines.length + 1) * 32 + index * 28);
    });
  }, [dimensions]);

  const drawSkills = useCallback((ctx) => {
    const sectionHeight = dimensions.height;
    const skillWidth = dimensions.width / skills.length;
    
    skills.forEach((skill, index) => {
      const x = index * skillWidth + skillWidth / 2;
      const y = sectionHeight / 2;
      
      const isHovered = hoveredSkill === skill.id;
      
      ctx.beginPath();
      ctx.arc(x, y, isHovered ? 70 : 60, 0, Math.PI * 2);
      ctx.fillStyle = `${skill.color}20`;
      ctx.fill();
      ctx.strokeStyle = skill.color;
      ctx.lineWidth = isHovered ? 3 : 2;
      ctx.stroke();
      
      ctx.font = isHovered ? '600 16px Inter' : '400 14px Inter';
      ctx.fillStyle = isHovered ? brandColors.text : brandColors.muted;
      ctx.textAlign = 'center';
      ctx.fillText(skill.name.split(' ')[0], x, y - 10);
      
      if (isHovered) {
        ctx.font = '300 14px Inter';
        ctx.fillStyle = brandColors.muted;
        ctx.fillText(`${skill.years} years`, x, y + 15);
        
        ctx.font = '12px Inter';
        skill.technologies.slice(0, 3).forEach((tech, techIndex) => {
          ctx.fillText(tech, x, y + 45 + techIndex * 18);
        });
      }
    });
  }, [dimensions, hoveredSkill]);

  const drawProjects = useCallback((ctx) => {
    const sectionHeight = dimensions.height;
    const projectWidth = Math.min(280, dimensions.width / 2 - 40);
    const cols = Math.floor(dimensions.width / (projectWidth + 40)) || 1;
    const rows = Math.ceil(projects.length / cols);
    const startX = (dimensions.width - (cols * projectWidth + (cols - 1) * 40)) / 2;
    
    ctx.font = '600 36px Cormorant Garamond';
    ctx.fillStyle = brandColors.text;
    ctx.textAlign = 'center';
    ctx.fillText('Woven Works', dimensions.width / 2, 100);
    
    projects.forEach((project, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = startX + col * (projectWidth + 40);
      const y = 180 + row * (projectWidth * 0.75 + 40);
      
      const isHovered = hoveredProject === project.id;
      const height = projectWidth * 0.65;
      
      ctx.beginPath();
      ctx.roundRect(x, y, projectWidth, height, 8);
      ctx.fillStyle = isHovered ? `${brandColors.primary}30` : `${brandColors.background}80`;
      ctx.fill();
      ctx.strokeStyle = isHovered ? brandColors.primary : brandColors.muted;
      ctx.lineWidth = isHovered ? 2 : 1;
      ctx.globalAlpha = isHovered ? 1 : 0.7;
      ctx.stroke();
      ctx.globalAlpha = 1;
      
      ctx.font = isHovered ? '600 16px Inter' : '500 14px Inter';
      ctx.fillStyle = brandColors.text;
      ctx.textAlign = 'left';
      ctx.fillText(project.title, x + 15, y + 30);
      
      ctx.font = '12px Inter';
      ctx.fillStyle = brandColors.muted;
      const summary = project.summary.length > 50 ? project.summary.substring(0, 50) + '...' : project.summary;
      ctx.fillText(summary, x + 15, y + 55);
      
      if (isHovered) {
        ctx.font = '11px Inter';
        ctx.fillStyle = brandColors.primary;
        ctx.fillText('Click to view details →', x + 15, y + height - 15);
      }
      
      if (project.featured) {
        ctx.beginPath();
        ctx.arc(x + projectWidth - 20, y + 20, 6, 0, Math.PI * 2);
        ctx.fillStyle = brandColors.accent;
        ctx.fill();
      }
    });
  }, [dimensions, hoveredProject]);

  const drawContact = useCallback((ctx) => {
    const centerX = dimensions.width / 2;
    
    ctx.font = '600 36px Cormorant Garamond';
    ctx.fillStyle = brandColors.text;
    ctx.textAlign = 'center';
    ctx.fillText('Start a Thread', centerX, 120);
    
    ctx.font = '300 18px Inter';
    ctx.fillStyle = brandColors.muted;
    ctx.fillText('Have a project in mind? Let\'s weave something together.', centerX, 170);
    
    ctx.font = '16px Inter';
    ctx.fillStyle = brandColors.primary;
    ctx.fillText(profile.contact?.email || 'hello@mahendrarch.dev', centerX, 240);
    
    const socialY = 300;
    const socialSpacing = 80;
    const socials = ['GitHub', 'LinkedIn', 'Twitter'];
    
    socials.forEach((social, index) => {
      const x = centerX - socialSpacing + index * socialSpacing;
      ctx.font = '14px Inter';
      ctx.fillStyle = brandColors.muted;
      ctx.fillText(social, x, socialY);
    });
  }, [dimensions]);

  const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines;
  };

  useEffect(() => {
    if (!isInitialized || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    
    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      const sectionHeight = dimensions.height;
      const scrollOffset = currentSection * sectionHeight;
      
      ctx.save();
      ctx.translate(0, -scrollOffset);
      
      if (weavePatternRef.current) {
        const mouseX = mousePosition.x;
        const mouseY = mousePosition.y + scrollOffset;
        const mouseInfluence = Math.min(Math.sqrt(velocity.x ** 2 + velocity.y ** 2) * 50, 200);
        
        weavePatternRef.current.update(mouseX, mouseY, mouseInfluence, reducedMotion);
        weavePatternRef.current.draw(ctx);
        
        if (!reducedMotion && (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1)) {
          playWeaveSound(audioContext, masterGain, Math.sqrt(velocity.x ** 2 + velocity.y ** 2));
        }
      }
      
      ctx.save();
      ctx.translate(0, currentSection * sectionHeight);
      
      if (currentSection === 0) {
        drawLanding(ctx, deltaTime);
      } else if (currentSection === 1) {
        drawAbout(ctx);
      } else if (currentSection === 2) {
        drawSkills(ctx);
      } else if (currentSection === 3) {
        drawProjects(ctx);
      } else if (currentSection === 4) {
        drawContact(ctx);
      }
      
      ctx.restore();
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInitialized, dimensions, mousePosition, velocity, reducedMotion, currentSection, audioContext, masterGain, drawLanding, drawAbout, drawSkills, drawProjects, drawContact]);

  const handleCanvasClick = useCallback((e) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (currentSection === 2) {
      const skillWidth = dimensions.width / skills.length;
      const clickedSkillIndex = Math.floor(x / skillWidth);
      if (clickedSkillIndex >= 0 && clickedSkillIndex < skills.length) {
        console.log('Navigate to skill projects:', skills[clickedSkillIndex].name);
      }
    } else if (currentSection === 3) {
      const projectWidth = Math.min(280, dimensions.width / 2 - 40);
      const cols = Math.floor(dimensions.width / (projectWidth + 40)) || 1;
      const startX = (dimensions.width - (cols * projectWidth + (cols - 1) * 40)) / 2;
      
      projects.forEach((project, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const projX = startX + col * (projectWidth + 40);
        const projY = 180 + row * (projectWidth * 0.75 + 40);
        const projHeight = projectWidth * 0.65;
        
        if (x >= projX && x <= projX + projectWidth && y >= projY && y <= projY + projHeight) {
          console.log('Open project:', project.title);
          playTransitionSound(audioContext, masterGain);
        }
      });
    }
  }, [currentSection, dimensions, audioContext, masterGain]);

  const handleMouseMove = useCallback((e) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (currentSection === 2) {
      const skillWidth = dimensions.width / skills.length;
      const hoveredIndex = Math.floor(x / skillWidth);
      if (hoveredIndex >= 0 && hoveredIndex < skills.length) {
        setHoveredSkill(skills[hoveredIndex].id);
      } else {
        setHoveredSkill(null);
      }
    } else if (currentSection === 3) {
      const projectWidth = Math.min(280, dimensions.width / 2 - 40);
      const cols = Math.floor(dimensions.width / (projectWidth + 40)) || 1;
      const startX = (dimensions.width - (cols * projectWidth + (cols - 1) * 40)) / 2;
      
      let foundProject = null;
      projects.forEach((project, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const projX = startX + col * (projectWidth + 40);
        const projY = 180 + row * (projectWidth * 0.75 + 40);
        const projHeight = projectWidth * 0.65;
        
        if (x >= projX && x <= projX + projectWidth && y >= projY && y <= projY + projHeight) {
          foundProject = project.id;
        }
      });
      
      setHoveredProject(foundProject);
    }
  }, [currentSection, dimensions]);

  const handleMouseLeave = useCallback(() => {
    setHoveredSkill(null);
    setHoveredProject(null);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: `${SECTIONS.length * 100}vh`,
        display: 'block',
        cursor: 'crosshair'
      }}
      aria-label="Interactive weaving canvas - Navigate by scrolling"
      role="img"
    />
  );
}
