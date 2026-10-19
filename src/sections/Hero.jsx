import { useEffect, useRef } from 'react'
import { Briefcase, Layers, Send } from 'lucide-react'
import Reveal from '../components/Reveal'
import { profile } from '../data/profile'
import { scrollToSection } from '../utils/scroll'

const ROLE = ['Software Engineering Student', 'Frontend Developer', 'Creative Technologist']

export default function Hero() {
  const portraitRef = useRef(null)
  const visualRef = useRef(null)

  // Restrained desktop parallax — the portrait drifts a few pixels with the
  // pointer. Disabled on touch devices and for reduced-motion users.
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const onMove = (e) => {
      const cx = e.clientX / window.innerWidth - 0.5
      const cy = e.clientY / window.innerHeight - 0.5
      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate3d(${(cx * 12).toFixed(1)}px, ${(cy * 10).toFixed(1)}px, 0)`
      }
      if (visualRef.current) {
        visualRef.current.style.transform = `translate3d(${(cx * -16).toFixed(1)}px, ${(cy * -12).toFixed(1)}px, 0)`
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div>
          <Reveal>
            <span className="hero__status">System Online</span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="hero__title">
              ABDULLAH
              <span className="line-2">ASIF</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="hero__role">
              {ROLE.map((r, i) => (
                <span key={r} style={i > 0 ? { color: 'var(--text)' } : undefined}>
                  {i > 0 && <span style={{ color: 'var(--accent-2)', margin: '0 10px' }}>|</span>}
                  {r}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="hero__desc">{profile.intro}</p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="hero__actions">
              <a
                href="#projects"
                className="btn btn--primary"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('projects')
                }}
              >
                View My Work <Briefcase size={16} aria-hidden="true" />
              </a>
              <a
                href="#services"
                className="btn btn--ghost"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('services')
                }}
              >
                Explore My Services <Layers size={16} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="btn btn--ghost"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('contact')
                }}
              >
                Let&apos;s Connect <Send size={16} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="hero__visual">
          <div className="hero__glow" aria-hidden="true" ref={visualRef} />
          <div className="hero__ring hero__ring--1" aria-hidden="true" />
          <div className="hero__ring hero__ring--2" aria-hidden="true" />
          <div
            className={`hero__portrait${profile.photoCutout ? ' hero__portrait--cutout' : ''}`}
            ref={portraitRef}
          >
            <img src={profile.photoCutout || profile.photo} alt={profile.photoAlt} loading="eager" />
          </div>
          <div className="hero__code" aria-hidden="true">
            {'{ portfolio: "v1.0" }'}
          </div>
          <div className="hero__code hero__code--2" aria-hidden="true">
            &gt; system.online
          </div>
        </Reveal>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-hint__line" />
      </div>
    </section>
  )
}
