import Reveal from './Reveal'

export default function SectionHeading({ label, title, sub, center = false }) {
  return (
    <Reveal className={`section-head${center ? ' section-head--center' : ''}`}>
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </Reveal>
  )
}
