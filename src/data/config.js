export const profile = {
  name: "Mahendrarch",
  title: "Creative Technical Craftsman",
  bio: "I weave code into experiences, transforming abstract ideas into tangible digital tapestries. With a foundation in both artistic vision and technical precision, I craft immersive web experiences that leave lasting impressions.",
  philosophy: "Every line of code is a thread. Every interaction, a pattern. I believe in building digital experiences that honor the craftsmanship of traditional arts while embracing the infinite possibilities of modern technology."
};

export const skills = [
  {
    id: "frontend",
    name: "Frontend Architecture",
    type: "twill",
    color: "#6366f1",
    years: 8,
    technologies: ["React", "Vue", "TypeScript", "WebGL", "Canvas API"],
    projects: ["living-loom", "interactive-dashboard", "design-system"]
  },
  {
    id: "backend",
    name: "Backend Systems",
    type: "jacquard",
    color: "#8b5cf6",
    years: 6,
    technologies: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
    projects: ["api-gateway", "realtime-collab", "data-pipeline"]
  },
  {
    id: "creative",
    name: "Creative Development",
    type: "silk",
    color: "#ec4899",
    years: 5,
    technologies: ["Three.js", "GSAP", "Shader Programming", "Generative Art"],
    projects: ["art-installation", "brand-experience", "motion-studies"]
  },
  {
    id: "devops",
    name: "DevOps & Infrastructure",
    type: "canvas",
    color: "#14b8a6",
    years: 4,
    technologies: ["Docker", "Kubernetes", "AWS", "CI/CD", "Monitoring"],
    projects: ["cloud-migration", "deployment-automation", "observability"]
  }
];

export const projects = [
  {
    id: "living-loom",
    title: "Living Loom",
    summary: "An immersive portfolio experience using textile-weaving metaphors",
    description: "A groundbreaking personal branding platform that replaces conventional navigation with an interactive fabric simulation. Users explore content through tactile interactions, with threads responding to cursor movement and scroll gestures.",
    technologies: ["React", "Canvas API", "Web Audio API", "Physics Simulation"],
    liveUrl: "https://mahendrarch.dev",
    repoUrl: "https://github.com/mahendrarch/living-loom",
    media: { type: "image", url: "/projects/living-loom.png" },
    featured: true,
    date: "2024-01"
  },
  {
    id: "neural-tapestry",
    title: "Neural Tapestry",
    summary: "AI-powered generative art installation",
    description: "An interactive installation that translates visitor movements into evolving woven patterns using machine learning models trained on historical textile designs.",
    technologies: ["TensorFlow.js", "Three.js", "Pose Detection", "WebGL"],
    liveUrl: "https://neuraltapestry.art",
    repoUrl: "https://github.com/mahendrarch/neural-tapestry",
    media: { type: "video", url: "/projects/neural-tapestry.mp4" },
    featured: true,
    date: "2023-11"
  },
  {
    id: "sonic-weave",
    title: "Sonic Weave",
    summary: "Audio-visual performance tool for musicians",
    description: "A real-time visualization system that transforms audio input into dynamic woven patterns, allowing performers to see their music as evolving textiles.",
    technologies: ["Web Audio API", "Canvas 2D", "FFT Analysis", "MIDI"],
    liveUrl: "https://sonicweave.io",
    repoUrl: "https://github.com/mahendrarch/sonic-weave",
    media: { type: "image", url: "/projects/sonic-weave.png" },
    featured: false,
    date: "2023-08"
  },
  {
    id: "thread-count",
    title: "Thread Count",
    summary: "Collaborative design system for development teams",
    description: "A comprehensive component library and documentation platform featuring real-time collaboration, version control integration, and automated accessibility testing.",
    technologies: ["Storybook", "TypeScript", "Playwright", "Figma API"],
    liveUrl: "https://threadcount.design",
    repoUrl: "https://github.com/mahendrarch/thread-count",
    media: { type: "image", url: "/projects/thread-count.png" },
    featured: false,
    date: "2023-05"
  }
];

export const brandColors = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  accent: "#ec4899",
  background: "#1a1a2e",
  text: "#e2e8f0",
  muted: "#94a3b8"
};

export const contactConfig = {
  email: "hello@mahendrarch.dev",
  social: {
    github: "https://github.com/mahendrarch",
    linkedin: "https://linkedin.com/in/mahendrarch",
    twitter: "https://twitter.com/mahendrarch"
  }
};
