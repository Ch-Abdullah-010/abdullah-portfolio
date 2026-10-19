import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { skillCategories } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading
          label="Skills"
          title="My Technical Toolkit"
          sub="Technologies and areas I genuinely work with in my coursework and projects — presented honestly, without invented proficiency percentages."
        />

        <div className="skills__grid">
          {skillCategories.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.07}>
              <article className="card skill-card">
                <div className="skill-card__head">
                  <span className="icon-box" aria-hidden="true">
                    <category.icon size={24} />
                  </span>
                  <h3>{category.title}</h3>
                </div>
                <div className="skill-card__items">
                  {category.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
