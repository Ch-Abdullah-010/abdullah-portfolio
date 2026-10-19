import { useEffect, useMemo, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { profile } from '../data/profile'

/*
 * Cinematic doorway intro.
 * Every visual element is mounted once; the entire sequence is choreographed
 * through the `data-stage` attribute (0 -> 4) using the pre-written
 * transitions in src/styles/intro.css. This keeps the component tiny and
 * guarantees the JS and CSS never drift apart.
 *
 * Timeline (~5.5s total, well inside the 3-6s window):
 *   0.0s  stage 0  darkness, grid, "INITIALIZING DIGITAL SPACE"
 *   0.85s stage 1  doorframe + hinge appear, terminal status comes online
 *   1.95s stage 2  panels swing open, electric-blue light blooms
 *   2.85s stage 3  portrait revealed with a cinematic light sweep
 *   3.85s stage 4  name rises character-by-character, title + tagline fade in
 *   5.6s  exit fade begins -> onDone() at ~6.4s
 */

const STAGE_TIMERS = [
  { stage: 1, at: 850 },
  { stage: 2, at: 1950 },
  { stage: 3, at: 2850 },
  { stage: 4, at: 3850 },
]

const STATUS_TEXT = {
  1: 'DOORWAY ONLINE',
  2: 'APERTURE OPEN',
  3: 'IDENTITY LOCKED',
  4: 'WELCOME',
}

const NAME = 'ABDULLAH ASIF'
const ASIF_START = NAME.indexOf('A', 9) // first letter of "ASIF"

export default function CinematicIntro({ onDone }) {
  const [stage, setStage] = useState(0)
  const [exiting, setExiting] = useState(false)
  const timers = useRef([])

  // Deterministic decorative particles — cheap and stable across renders.
  const dots = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        left: `${(i * 37) % 95 + 2}%`,
        top: `${(i * 53) % 88 + 5}%`,
        delay: `${(i % 7) * 0.9}s`,
      })),
    [],
  )

  useEffect(() => {
    const timersRef = timers
    STAGE_TIMERS.forEach(({ stage: s, at }) => {
      timersRef.current.push(setTimeout(() => setStage(s), at))
    })
    timersRef.current.push(setTimeout(() => setExiting(true), 5600))
    timersRef.current.push(setTimeout(() => onDone?.(), 6450))
    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [onDone])

  const skip = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setStage(4)
    setExiting(true)
    timers.current.push(setTimeout(() => onDone?.(), 420))
  }

  return (
    <div className={`intro${exiting ? ' is-exiting' : ''}`} data-stage={stage}>
      {/* Scene A: digital darkness */}
      <div className="intro__grid" aria-hidden="true" />
      <div className="intro__ambient" aria-hidden="true" />
      <div className="intro__dots" aria-hidden="true">
        {dots.map((d, i) => (
          <span key={i} className="intro__dot" style={{ left: d.left, top: d.top, animationDelay: d.delay }} />
        ))}
      </div>

      <div className="intro__label">
        Initializing Digital Space
        <span className="intro__blink" />
      </div>

      {/* Scenes B + C: the architectural doorway and portrait */}
      <div className="intro__stage">
        <div className="door">
          <div className="door__frame" />
          <div className="door__inner">
            <div className="door__light" />
            <div className="door__portrait">
              <img src={profile.photo} alt={profile.photoAlt} />
            </div>
          </div>
          <div className="door__panel door__panel--left" />
          <div className="door__panel door__panel--right" />
          <div className="door__hinge" />
        </div>
      </div>

      {/* Scene D: name reveal (decorative duplicate of the hero heading) */}
      <div className="intro__reveal" aria-hidden="true">
        <div className="intro__name">
          {NAME.split('').map((ch, i) => (
            <span
              key={i}
              className={`char${ch === ' ' ? ' space' : ''}${i >= ASIF_START ? ' accent' : ''}`}
              style={{ '--i': i }}
            >
              {ch}
            </span>
          ))}
        </div>
        <div className="intro__title">{profile.title}</div>
        <div className="intro__tagline">{profile.tagline}</div>
      </div>

      {/* Chrome: skip control, terminal status, audio-style bars */}
      <button className="intro__skip" onClick={skip}>
        Skip Intro <X size={14} aria-hidden="true" />
      </button>

      <div className="intro__status">{STATUS_TEXT[stage] || STATUS_TEXT[1]}</div>

      <div className="intro__bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  )
}
