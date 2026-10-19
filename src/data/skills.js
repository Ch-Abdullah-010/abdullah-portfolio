import { Terminal, Layout, Cpu, Wrench, Sparkles } from 'lucide-react'

// Edit freely: add or remove skills you genuinely know.
// Grouped as: Programming Languages → Frontend Web Development →
// Computer Science Foundations → Tools & Technologies → Creative & AI Tools.
export const skillCategories = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: Terminal,
    items: ['C++', 'Java', 'Python', 'JavaScript'],
  },
  {
    id: 'web',
    title: 'Frontend Web Development',
    icon: Layout,
    items: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'React.js',
      'Responsive Web Design',
      'Mobile-First Design',
      'UI Implementation',
      'Website Layout and Styling',
      'Component-Based Development',
      'Basic DOM Manipulation',
      'Cross-Browser Layout Considerations',
      'Accessibility Fundamentals',
      'SEO Fundamentals',
    ],
  },
  {
    id: 'cs',
    title: 'Computer Science Foundations',
    icon: Cpu,
    items: [
      'Object-Oriented Programming',
      'Data Structures',
      'Algorithms Fundamentals',
      'Problem Solving',
      'Database Systems',
      'Programming Fundamentals',
      'Software Engineering Fundamentals',
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Technologies',
    icon: Wrench,
    items: [
      'Visual Studio Code',
      'Git',
      'GitHub',
      'Netlify',
      'Vercel',
      'npm',
      'Canva',
      'ChatGPT',
      'Kling AI',
    ],
  },
  {
    id: 'creative',
    title: 'Creative & AI Tools',
    icon: Sparkles,
    items: [
      'Graphic Design',
      'Social Media Design',
      'AI Video Creation',
      'AI Video Editing',
      'Short-Form Video Content',
      'Visual Storytelling',
      'Creative Content Development',
    ],
  },
]
