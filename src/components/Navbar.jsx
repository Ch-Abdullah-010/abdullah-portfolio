import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-38% 0px -55% 0px', threshold: 0 },
    )
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <>
      <header className={`nav${scrolled || open ? ' is-scrolled' : ''}`}>
        <div className="nav__progress" aria-hidden="true">
          <span style={{ width: `${progress.toFixed(2)}%` }} />
        </div>
        <div className="container nav__inner">
          <a href="#home" className="nav__logo" onClick={(e) => go(e, 'home')} aria-label="Abdullah Asif — home">
            <span className="nav__logo-mark" aria-hidden="true">
              AA
            </span>
            <span className="nav__logo-text">
              Abdullah Asif <span>/ Portfolio</span>
            </span>
          </a>

          <nav aria-label="Main navigation">
            <ul className="nav__links">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`nav__link${active === link.id ? ' is-active' : ''}`}
                    onClick={(e) => go(e, link.id)}
                    aria-current={active === link.id ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#contact" className="btn btn--primary btn--sm nav__cta" onClick={(e) => go(e, 'contact')}>
            Hire Me <ArrowUpRight size={15} />
          </a>

          <button
            className="nav__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <div className={`nav__mobile${open ? ' is-open' : ''}`} aria-hidden={!open}>
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={active === link.id ? 'is-active' : ''}
            onClick={(e) => go(e, link.id)}
            tabIndex={open ? 0 : -1}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}
