import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Github, Linkedin, Mail, Phone, Send } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { profile } from '../data/profile'
import { services } from '../data/services'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const METHODS = (c) => [
  {
    id: 'email',
    label: 'Email',
    value: c.email,
    // Open a Gmail compose window in a new tab instead of relying on a
    // desktop mail client being installed (mailto: does nothing without one).
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(c.email)}`,
    Icon: Mail,
    external: true,
    copy: c.email,
  },
  { id: 'phone', label: 'Phone', value: c.phoneDisplay, href: `tel:${c.phoneHref}`, Icon: Phone, external: false },
  { id: 'linkedin', label: 'LinkedIn', value: c.linkedinDisplay, href: c.linkedin, Icon: Linkedin, external: true },
  { id: 'github', label: 'GitHub', value: c.githubDisplay, href: c.github, Icon: Github, external: true },
]

export default function Contact({ selectedService = '' }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  // A service chosen in the Services (or Projects) section preselects here.
  useEffect(() => {
    if (selectedService) {
      setForm((f) => ({ ...f, service: selectedService }))
    }
  }, [selectedService])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const showToast = (text) => {
    clearTimeout(toastTimer.current)
    setToast(text)
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }

  const copyEmail = async (email) => {
    let ok = false
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email)
        ok = true
      }
    } catch {
      ok = false
    }

    if (!ok) {
      // Fallback for non-secure contexts where the async clipboard API is blocked.
      try {
        const ta = document.createElement('textarea')
        ta.value = email
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        ok = document.execCommand('copy')
        document.body.removeChild(ta)
      } catch {
        ok = false
      }
    }

    if (ok) {
      setCopied(true)
      showToast('Email Copied!')
      setTimeout(() => setCopied(false), 2000)
    } else {
      showToast(`Couldn't copy — email: ${email}`)
    }
  }

  const update = (key) => (e) => {
    const { value } = e.target
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email address.'
    else if (!EMAIL_RE.test(form.email.trim())) next.email = "That email address doesn't look right."
    if (!form.message.trim()) next.message = 'Please write a short message.'

    setErrors(next)
    if (Object.keys(next).length > 0) {
      setStatus(null)
      return
    }

    // No backend is configured, so we never pretend a message was "sent".
    // Instead we open the visitor's own email app with everything prefilled.
    const subject = `Portfolio inquiry — ${form.service || 'General project'}`
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      form.phone.trim() ? `Phone: ${form.phone.trim()}` : null,
      `Interested in: ${form.service || 'General inquiry'}`,
      '',
      form.message.trim(),
    ]
      .filter(Boolean)
      .join('\n')

    const href = `mailto:${profile.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    try {
      window.location.href = href
      setStatus({
        type: 'warn',
        text: `Your email application should now open with this message ready to send. If it didn't open, copy your details and email directly at ${profile.contact.email}.`,
      })
    } catch {
      setStatus({
        type: 'err',
        text: `We couldn't open your email application. Please send your message directly to ${profile.contact.email}.`,
      })
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading
          label="Contact"
          title="Let's Build Something Meaningful"
          sub="Have a project, an opportunity, or an idea in mind? I'd be happy to connect."
        />

        <div className="contact__grid">
          <Reveal>
            <p className="contact__lead" style={{ marginTop: 0 }}>
              The fastest way to reach me is directly — pick whichever channel suits you. Every message gets a
              personal reply from me, not an automated one.
            </p>

            <div className="contact__methods">
              {METHODS(profile.contact).map(({ id, label, value, href, Icon, external, copy }) =>
                copy ? (
                  <div key={id} className="contact-method contact-method--action">
                    <a className="contact-method__link" href={href} target="_blank" rel="noopener noreferrer">
                      <span className="icon-box" aria-hidden="true">
                        <Icon size={22} />
                      </span>
                      <span>
                        <span className="contact-method__label" style={{ display: 'block' }}>
                          {label}
                        </span>
                        <span className="contact-method__value" style={{ display: 'block' }}>
                          {value}
                        </span>
                      </span>
                    </a>
                    <button
                      type="button"
                      className="contact-method__copy"
                      onClick={() => copyEmail(copy)}
                      aria-label={`Copy email address ${copy}`}
                    >
                      {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                      {copied ? 'Copied!' : 'Copy Email'}
                    </button>
                  </div>
                ) : external ? (
                  <a key={id} className="contact-method" href={href} target="_blank" rel="noopener noreferrer">
                    <span className="icon-box" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <span>
                      <span className="contact-method__label" style={{ display: 'block' }}>
                        {label}
                      </span>
                      <span className="contact-method__value" style={{ display: 'block' }}>
                        {value}
                      </span>
                    </span>
                  </a>
                ) : (
                  <a key={id} className="contact-method" href={href}>
                    <span className="icon-box" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <span>
                      <span className="contact-method__label" style={{ display: 'block' }}>
                        {label}
                      </span>
                      <span className="contact-method__value" style={{ display: 'block' }}>
                        {value}
                      </span>
                    </span>
                  </a>
                ),
              )}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <form className="card contact-form" onSubmit={onSubmit} noValidate>
              <div className="contact-form__row">
                <div className="field">
                  <label htmlFor="cf-name">Full Name</label>
                  <input
                    id="cf-name"
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Your name"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'cf-name-err' : undefined}
                  />
                  {errors.name && (
                    <span className="err" id="cf-name-err">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="cf-email">Email Address</label>
                  <input
                    id="cf-email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@example.com"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'cf-email-err' : undefined}
                  />
                  {errors.email && (
                    <span className="err" id="cf-email-err">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="contact-form__row">
                <div className="field">
                  <label htmlFor="cf-phone">
                    Phone <span className="opt">(optional)</span>
                  </label>
                  <input
                    id="cf-phone"
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="+92 …"
                  />
                </div>

                <div className="field">
                  <label htmlFor="cf-service">I'm Interested In</label>
                  <select id="cf-service" value={form.service} onChange={update('service')}>
                    <option value="">General inquiry</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="cf-message">Message</label>
                <textarea
                  id="cf-message"
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell me about your project, opportunity, or idea…"
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'cf-message-err' : undefined}
                />
                {errors.message && (
                  <span className="err" id="cf-message-err">
                    {errors.message}
                  </span>
                )}
              </div>

              <button type="submit" className="btn btn--primary btn--block">
                Send Message <Send size={16} aria-hidden="true" />
              </button>

              {status && <div className={`form-status form-status--${status.type}`}>{status.text}</div>}
            </form>
          </Reveal>
        </div>
      </div>

      {toast && (
        <div className="contact-toast" role="status" aria-live="polite">
          {toast === 'Email Copied!' && <Check size={15} aria-hidden="true" />}
          {toast}
        </div>
      )}
    </section>
  )
}
