import { useEffect, useState } from 'react'
import CinematicIntro from './components/CinematicIntro'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Certifications from './sections/Certifications'
import Education from './sections/Education'
import Contact from './sections/Contact'

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
      if (sessionStorage.getItem('aa-intro-seen') === '1') return false
      return true
    } catch {
      return false
    }
  })
  const [selectedService, setSelectedService] = useState('')

  useEffect(() => {
    document.body.classList.toggle('intro-lock', showIntro)
    return () => document.body.classList.remove('intro-lock')
  }, [showIntro])

  const finishIntro = () => {
    try {
      sessionStorage.setItem('aa-intro-seen', '1')
    } catch {
      /* storage unavailable — intro still closes */
    }
    setShowIntro(false)
  }

  const requestService = (title) => {
    setSelectedService(title)
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {showIntro && <CinematicIntro onDone={finishIntro} />}
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services onSelect={requestService} />
        <Projects onRequest={requestService} />
        <Experience />
        <Certifications />
        <Education />
        <Contact selectedService={selectedService} />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
