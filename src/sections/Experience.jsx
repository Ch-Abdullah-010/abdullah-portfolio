import { Award } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { experience } from '../data/experience'
import { scrollToSection } from '../utils/scroll'

export default function Experience() {
  return (
    <section id="experience" className="section section--soft">
      <div className="container">
        <SectionHeading
          label="My Journey"
          title="Experience & Learning"
          sub="Internship, training, and practical communication experience — described accurately, without inflating any of it."
        />

        <div className="timeline">
          {experience.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.09}>
              <article className="timeline__item">
                <div className="timeline__meta">
                  <span className="timeline__period">{item.period}</span>
                  <span className="timeline__type">{item.type}</span>
                </div>
                <h3>{item.title}</h3>
                <div className="timeline__org">{item.org}</div>
                <p>{item.description}</p>

                {item.certificateId && (
                  <a
                    href="#certifications"
                    className="timeline__link"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('certifications')
                    }}
                  >
                    <Award size={15} aria-hidden="true" />
                    View Internship Certificate
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
