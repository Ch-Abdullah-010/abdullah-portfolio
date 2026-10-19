import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { profile } from '../data/profile'

export default function About() {
  return (
    <section id="about" className="section section--soft">
      <div className="container">
        <SectionHeading
          label="About Me"
          title="Turning Ideas Into Digital Experiences"
          sub={profile.positioning}
        />

        <div className="about__grid">
          <Reveal className="about__text">
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}

            <ul className="about__facts">
              {profile.quickFacts.map((fact) => (
                <li key={fact.label}>
                  <span className="k">{fact.label}</span>
                  <span className="v">{fact.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="card about__card">
              <div className="about__monogram" aria-hidden="true">
                {profile.monogram}
              </div>
              <h3>{profile.name}</h3>
              <div className="role">{profile.title}</div>
              <p className="about__quote">“{profile.positioning}”</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
