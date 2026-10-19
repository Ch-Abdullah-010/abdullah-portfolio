import { ArrowUpRight, Check } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { services } from '../data/services'

export default function Services({ onSelect }) {
  return (
    <section id="services" className="section section--soft">
      <div className="container">
        <SectionHeading
          label="What I Offer"
          title="What I Can Build For You"
          sub="Focused, honestly scoped services — each one backed by real coursework, real projects, and real creative work."
        />

        <div className="services__grid">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.07}>
              <article className="card service-card">
                <span className="icon-box" aria-hidden="true">
                  <service.icon size={24} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <ul className="service-card__list">
                  {service.highlights.map((highlight) => (
                    <li key={highlight}>
                      <Check size={15} aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <button className="btn btn--ghost" onClick={() => onSelect?.(service.title)}>
                  Discuss a Project <ArrowUpRight size={15} aria-hidden="true" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
