import { profile } from './profile.js'
import { skillCategories } from './skills.js'
import { services } from './services.js'
import { projects } from './projects.js'
import { experience } from './experience.js'
import { certificates } from './certificates.js'

const skillsFlat = skillCategories.flatMap((c) => c.items)

export const knowledge = {
  identity: {
    name: profile.name,
    title: profile.title,
    positioning: profile.positioning,
    heroTitle: profile.heroTitle,
  },
  education: profile.education,
  skills: skillsFlat,
  skillCategories: skillCategories.map((c) => ({ title: c.title, items: c.items })),
  services: services.map((s) => ({ title: s.title, description: s.description })),
  projects: projects.map((p) => ({
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
  })),
  experience: experience.map((e) => ({
    title: e.title,
    org: e.org,
    period: e.period,
    description: e.description,
  })),
  certificates: certificates.map((c) => ({
    title: c.title,
    issuer: c.issuer,
  })),
  contact: profile.contact,
}

const fallback = `I don't have that information in my knowledge base, so I won't guess. The best next step is to ask Abdullah directly — use the contact section on this page (email, phone, LinkedIn, or GitHub).`

export const faq = [
  {
    id: 'who',
    keywords: ['who', 'abdullah', 'asif', 'about', 'introduce', 'yourself', 'him', 'he'],
    answer: `${profile.name} is a Software Engineering student at COMSATS University Islamabad (Sahiwal Campus, Fall 2025 batch). He works as a frontend developer, web developer, AI application developer, graphic designer, and AI video creator/editor. His focus: ${profile.positioning}`,
  },
  {
    id: 'skills',
    keywords: ['technolog', 'tech', 'skill', 'stack', 'language', 'know', 'programming', 'tools'],
    answer: `His skill areas are: ${skillsFlat.join(', ')}. He genuinely uses these in his coursework and projects — he does not claim professional mastery of every tool. Category breakdown is in the Skills section of this site.`,
  },
  {
    id: 'projects',
    keywords: ['project', 'built', 'built', 'work', 'portfolio', 'app', 'website', 'made'],
    answer: `His featured projects are: ${projects
      .map((p) => `${p.title} — ${p.description}`)
      .join(' ')} All project details live in the Projects section of this site.`,
  },
  {
    id: 'services',
    keywords: ['service', 'offer', 'hire', 'freelance', 'build for', 'can he', 'provide', 'do for'],
    answer: `He offers: ${services
      .map((s) => s.title)
      .join(', ')}. Each service card in the Services section has a "Discuss a Project" button that jumps straight to the contact form.`,
  },
  {
    id: 'education',
    keywords: ['education', 'university', 'degree', 'school', 'study', 'studies', 'studying', 'semester', 'batch', 'campus', 'comsats', 'sahiwal'],
    answer: `He is pursuing a Software Engineering degree at COMSATS University Islamabad, Sahiwal Campus — Fall 2025 batch. He has completed his 2nd semester and is currently in his 3rd semester. Academic focus areas: ${profile.education.focus.join(', ')}.`,
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'reach', 'phone', 'call', 'whatsapp', 'linkedin', 'github', 'talk', 'message'],
    answer: `You can reach Abdullah at:
• Email: ${profile.contact.email}
• Phone: ${profile.contact.phoneDisplay}
• LinkedIn: ${profile.contact.linkedinDisplay}
• GitHub: ${profile.contact.githubDisplay}
There is also a contact form in the Contact section of this page.`,
  },
  {
    id: 'discuss',
    keywords: ['discuss', 'project with', 'work with', 'collaborat', 'hire him', 'start a project', 'hire'],
    answer: `Great — scroll to the Contact section, choose what you need in the form, and send a message. Abdullah reviews every inquiry personally at ${profile.contact.email}.`,
  },
  {
    id: 'experience',
    keywords: ['experience', 'intern', 'internship', 'employment', 'job', 'alkhidmat', 'bano qabil', 'career', 'training'],
    answer: `His experience includes: ${experience
      .map((e) => `${e.title} at ${e.org} (${e.period})`)
      .join('; ')}. He also completed a four-month Web Development training program with Bano Qabil Sahiwal (Second Batch). Full honest descriptions are in the Experience section.`,
  },
  {
    id: 'certificates',
    keywords: ['certificate', 'certification', 'credential', 'course', 'diploma', 'verified', 'pjri', 'piaic', 'unithena', 'athena', 'anthropic', 'claude', 'webinar'],
    answer: `His certification gallery includes: a Web Development certificate from Bano Qabil Sahiwal, a Basic Python credential from UniAthena, two webinar participation certificates from Pakistan Justice and Right Initiative (PJRI), an Anthropic learning credential, and a Volunteer Internship certificate from Alkhidmat Pakistan. See the Certifications section — certificate previews are added there as the files become available.`,
  },
  {
    id: 'services-ai',
    keywords: ['ai', 'chatbot', 'artificial', 'machine learning', 'model', 'gemini', 'openai'],
    answer: `AI work is one of his service areas: AI chatbots, AI assistants, intelligent information interfaces, productivity tools, and API-based AI integrations (with keys kept server-side, never in browser code). Actual capabilities depend on the AI model, API, data access, and project requirements.`,
  },
  {
    id: 'location',
    keywords: ['where', 'location', 'city', 'country', 'based', 'live'],
    answer: `He studies at COMSATS University Islamabad — Sahiwal Campus, Pakistan. For remote work and online projects, use the contact options and he will reply personally.`,
  },
]

export function getAnswer(question) {
  const q = (question || '').toLowerCase().trim()
  if (!q) return fallback

  let best = null
  let bestScore = 0

  for (const item of faq) {
    let score = 0
    for (const kw of item.keywords) {
      if (q.includes(kw)) score += kw.length > 4 ? 2 : 1
    }
    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }

  if (best && bestScore >= 2) return best.answer
  if (best && bestScore === 1 && q.length < 30) return best.answer
  return fallback
}

export const suggestedQuestions = [
  'Who is Abdullah Asif?',
  'What is he studying?',
  'What are his technical skills?',
  'Which projects has he built?',
  'What services does he provide?',
  'What certificates does he have?',
  'How can I contact him?',
  'How can I discuss a project with him?',
]
