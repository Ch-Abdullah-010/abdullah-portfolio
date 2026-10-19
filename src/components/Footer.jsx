import { profile } from '../data/profile'
import { scrollToSection } from '../utils/scroll'

const YEAR = new Date().getFullYear()

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

export default function Footer() {
  const { contact } = profile

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <span className="footer__mark" aria-hidden="true">
              AA
            </span>
            <p className="footer__tag">
              Building modern web experiences, AI-powered applications, and creative digital content — one honest
              project at a time.
            </p>
          </div>

          <ul className="footer__links">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.id)
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={contact.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`}>Email</a>
            </li>
          </ul>
        </div>

        <div className="footer__bottom">
          <span>
            © {YEAR} {profile.name}. All rights reserved.
          </span>
          <span>Designed &amp; built by {profile.name} • SYSTEM ONLINE v1.0</span>
        </div>
      </div>
    </footer>
  )
}
