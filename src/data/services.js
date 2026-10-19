import { MonitorSmartphone, Layers, Bot, PenTool, Clapperboard } from 'lucide-react'

// Each service card. "Discuss a Project" preselects this service in the contact form.
export const services = [
  {
    id: 'frontend',
    icon: MonitorSmartphone,
    title: 'Frontend Web Development',
    description:
      'Modern, responsive, visually polished websites built with clean, maintainable code and careful attention to usability and accessibility.',
    highlights: [
      'Personal portfolios & business websites',
      'Landing pages & interactive React applications',
      'Website redesign and UI improvements',
      'Mobile-friendly, accessible layouts',
    ],
  },
  {
    id: 'fullstack',
    icon: Layers,
    title: 'Full-Stack Web Development',
    description:
      'Complete web applications spanning frontend interfaces, backend logic, and deployment — with an honest scope agreed for every project.',
    highlights: [
      'Frontend interfaces & application logic',
      'Backend APIs and form processing',
      'Database integration & authentication basics',
      'Deployment and release support',
    ],
  },
  {
    id: 'ai',
    icon: Bot,
    title: 'AI-Powered Application Development',
    description:
      'Applications that use AI to solve practical problems. Capabilities depend on the selected AI model, API, data access, and project requirements.',
    highlights: [
      'AI chatbots & intelligent information interfaces',
      'AI-powered productivity tools',
      'API-based AI integrations (keys stay server-side)',
      'Automation of selected workflows',
    ],
  },
  {
    id: 'design',
    icon: PenTool,
    title: 'Graphic Design',
    description:
      'Professional digital visual assets that give your brand or project a consistent, confident visual identity.',
    highlights: [
      'Social media posts & promotional graphics',
      'Branding concepts & digital banners',
      'Creative marketing visuals',
      'Consistent visual identity systems',
    ],
  },
  {
    id: 'video',
    icon: Clapperboard,
    title: 'AI Video Creation & Editing',
    description:
      'Engaging AI-assisted visual content — from concept to cut — built for social media, promotion, and motion-focused storytelling.',
    highlights: [
      'AI-generated video concepts & creation',
      'Short-form social media videos',
      'Video editing & promotional video concepts',
      'Motion-focused visual storytelling',
    ],
  },
]
