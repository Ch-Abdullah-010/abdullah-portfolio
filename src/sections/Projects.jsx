import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/projects'

export default function Projects({ onRequest }) {
  const [interact, setInteract] = useState(false)

  // 3D tilt + cursor spotlight are desktop-only and respect reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    setInteract(true)
    return undefined
  }, [])

  const onMove = (e) => {
    if (!interact) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    card.style.setProperty('--rx', `${((0.5 - py) * 7).toFixed(2)}deg`)
    card.style.setProperty('--ry', `${((px - 0.5) * 8).toFixed(2)}deg`)
    card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
    card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
  }

  const onLeave = (e) => {
    const card = e.currentTarget
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
    card.style.setProperty('--mx', '50%')
    card.style.setProperty('--my', '30%')
  }

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          label="Selected Work"
          title="Projects I've Built"
          sub="Real projects from my coursework and project-based learning — described honestly, exactly as they are."
        />

        <div className="projects__grid">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <article
                className={`project-card${project.status === 'soon' ? ' project-card--soon' : ''}`}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                style={{ '--rx': '0deg', '--ry': '0deg', '--mx': '50%', '--my': '30%' }}
              >
                <div className="project-card__thumb">
                  <span className="project-card__icon" aria-hidden="true">
                    <project.icon size={32} />
                  </span>
                  {project.status === 'soon' ? (
                    <span className="project-card__badge">Coming Soon</span>
                  ) : (
                    <span className="project-card__soon">Project {String(i + 1).padStart(2, '0')}</span>
                  )}
                </div>

                <div className="project-card__body">
                  <div className="sub">{project.subtitle}</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div style={{ marginTop: '38px', display: 'flex', justifyContent: 'center' }}>
            <button className="btn btn--primary" onClick={() => onRequest?.('General project inquiry')}>
              Discuss a Similar Project <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
