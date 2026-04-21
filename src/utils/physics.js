export class Thread {
  constructor(x, y, color, type = 'warp') {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.color = color;
    this.type = type;
    this.tension = 0.5;
    this.damping = 0.92;
    this.mass = 1;
    this.vx = 0;
    this.vy = 0;
    this.radius = type === 'warp' ? 1.5 : 2;
    this.connectedThreads = [];
    this.isHovered = false;
  }

  applyForce(fx, fy) {
    this.vx += fx / this.mass;
    this.vy += fy / this.mass;
  }

  update(mouseX, mouseY, mouseInfluence, reducedMotion = false) {
    if (reducedMotion) {
      this.x = this.originX;
      this.y = this.originY;
      this.vx = 0;
      this.vy = 0;
      return;
    }

    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const influenceRadius = 150;

    if (distance < influenceRadius) {
      const force = (1 - distance / influenceRadius) * mouseInfluence;
      const angle = Math.atan2(dy, dx);
      this.applyForce(Math.cos(angle) * force, Math.sin(angle) * force);
    }

    const springDx = this.originX - this.x;
    const springDy = this.originY - this.y;
    this.applyForce(springDx * this.tension * 0.1, springDy * this.tension * 0.1);

    this.vx *= this.damping;
    this.vy *= this.damping;

    this.x += this.vx;
    this.y += this.vy;

    const maxDisplacement = 50;
    const clampX = Math.max(this.originX - maxDisplacement, Math.min(this.originX + maxDisplacement, this.x));
    const clampY = Math.max(this.originY - maxDisplacement, Math.min(this.originY + maxDisplacement, this.y));
    this.x = clampX;
    this.y = clampY;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    if (this.isHovered) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 4, 0, Math.PI * 2);
      ctx.strokeStyle = this.color;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }
}

export class WeavePattern {
  constructor(width, height, config = {}) {
    this.width = width;
    this.height = height;
    this.threads = [];
    this.config = {
      warpCount: config.warpCount || 60,
      weftCount: config.weftCount || 40,
      colors: config.colors || ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6'],
      patternType: config.patternType || 'plain'
    };
    this.initialize();
  }

  initialize() {
    this.threads = [];
    const warpSpacing = this.width / this.config.warpCount;
    const weftSpacing = this.height / this.config.weftCount;

    for (let i = 0; i < this.config.warpCount; i++) {
      const x = (i + 0.5) * warpSpacing;
      const color = this.config.colors[i % this.config.colors.length];
      const thread = new Thread(x, this.height / 2, color, 'warp');
      thread.originY = Math.random() * this.height;
      this.threads.push(thread);
    }

    for (let j = 0; j < this.config.weftCount; j++) {
      const y = (j + 0.5) * weftSpacing;
      const color = this.config.colors[j % this.config.colors.length];
      for (let i = 0; i < this.config.warpCount; i += 3) {
        const x = (i + 0.5) * warpSpacing;
        const thread = new Thread(x, y, color, 'weft');
        thread.tension = 0.3 + Math.random() * 0.3;
        this.threads.push(thread);
      }
    }
  }

  update(mouseX, mouseY, mouseInfluence, reducedMotion = false) {
    this.threads.forEach(thread => {
      thread.update(mouseX, mouseY, mouseInfluence, reducedMotion);
    });
  }

  draw(ctx) {
    ctx.save();
    
    this.threads.forEach((thread, index) => {
      if (index % 3 === 0 && thread.type === 'weft') {
        ctx.beginPath();
        ctx.moveTo(0, thread.y);
        
        for (let i = 0; i < this.config.warpCount; i += 3) {
          const weaveThread = this.threads.find(t => 
            t.type === 'warp' && Math.abs(t.originX - (i + 0.5) * (this.width / this.config.warpCount)) < 1
          );
          
          if (weaveThread) {
            const overUnder = ((index / 3 + i / 3) % 2 === 0) ? 3 : -3;
            ctx.lineTo(weaveThread.x, thread.y + overUnder);
          }
        }
        
        ctx.lineTo(this.width, thread.y);
        ctx.strokeStyle = thread.color;
        ctx.lineWidth = thread.radius;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });

    this.threads.forEach(thread => {
      if (thread.type === 'warp') {
        ctx.beginPath();
        ctx.moveTo(thread.x, 0);
        ctx.lineTo(thread.x, this.height);
        ctx.strokeStyle = thread.color;
        ctx.lineWidth = thread.radius * 0.5;
        ctx.globalAlpha = 0.4;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });

    this.threads.forEach(thread => thread.draw(ctx));
    
    ctx.restore();
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.initialize();
  }
}

export class BrandKnot {
  constructor(x, y, size = 100) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.phase = 0;
    this.points = [];
    this.initialize();
  }

  initialize() {
    this.points = [];
    const numPoints = 8;
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      this.points.push({
        angle,
        radius: this.size * 0.4,
        offset: Math.random() * Math.PI * 2
      });
    }
  }

  update(deltaTime, intensity = 0) {
    this.phase += deltaTime * 0.001 * (1 + intensity);
    this.points.forEach(point => {
      point.radius = this.size * 0.4 + Math.sin(this.phase + point.offset) * this.size * 0.1;
    });
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    
    ctx.beginPath();
    this.points.forEach((point, index) => {
      const x = Math.cos(point.angle) * point.radius;
      const y = Math.sin(point.angle) * point.radius;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        const prevPoint = this.points[index - 1];
        const cp1x = Math.cos(prevPoint.angle + Math.PI / 8) * prevPoint.radius * 1.1;
        const cp1y = Math.sin(prevPoint.angle + Math.PI / 8) * prevPoint.radius * 1.1;
        const cp2x = Math.cos(point.angle - Math.PI / 8) * point.radius * 1.1;
        const cp2y = Math.sin(point.angle - Math.PI / 8) * point.radius * 1.1;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      }
    });
    
    const lastPoint = this.points[this.points.length - 1];
    const firstPoint = this.points[0];
    const cp1x = Math.cos(lastPoint.angle + Math.PI / 8) * lastPoint.radius * 1.1;
    const cp1y = Math.sin(lastPoint.angle + Math.PI / 8) * lastPoint.radius * 1.1;
    const cp2x = Math.cos(firstPoint.angle - Math.PI / 8) * firstPoint.radius * 1.1;
    const cp2y = Math.sin(firstPoint.angle - Math.PI / 8) * firstPoint.radius * 1.1;
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, firstPoint.x, firstPoint.y);
    
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.8;
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    ctx.restore();
  }
}

export function createAudioOscillator(audioContext, masterGain, frequency = 440, type = 'sine', duration = 0.1) {
  if (!audioContext || !masterGain) return null;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(masterGain);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  const now = audioContext.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, now + duration);
  
  oscillator.start(now);
  oscillator.stop(now + duration);
  
  return oscillator;
}

export function playWeaveSound(audioContext, masterGain, velocity) {
  if (!audioContext || !masterGain) return;
  
  const baseFreq = 220 + Math.min(velocity * 100, 440);
  const harmonic = Math.random() > 0.5 ? 1.5 : 2;
  createAudioOscillator(audioContext, masterGain, baseFreq * harmonic, 'sine', 0.15);
  
  if (Math.random() > 0.7) {
    createAudioOscillator(audioContext, masterGain, baseFreq, 'triangle', 0.1);
  }
}

export function playTransitionSound(audioContext, masterGain) {
  if (!audioContext || !masterGain) return;
  
  [330, 440, 550, 660].forEach((freq, index) => {
    setTimeout(() => {
      createAudioOscillator(audioContext, masterGain, freq, 'sine', 0.3);
    }, index * 100);
  });
}

export function generateSkillPattern(skillType, width, height) {
  const patterns = {
    twill: { warpCount: 50, weftCount: 35, patternType: 'diagonal' },
    jacquard: { warpCount: 70, weftCount: 50, patternType: 'complex' },
    silk: { warpCount: 40, weftCount: 30, patternType: 'smooth' },
    canvas: { warpCount: 45, weftCount: 35, patternType: 'plain' }
  };
  
  return patterns[skillType] || patterns.twill;
}
