import { GraduationCap, Award, CalendarDays, BookOpen } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { profile } from '../data/profile'

export default function Education() {
  const { education, trainings } = profile

  return (
    <section id="education" className="section section--soft">
      <div className="container">
        <SectionHeading
          label="Education & Training"
          title="Academic Background"
          sub="My university degree program and structured training — the foundations behind everything on this site."
        />

        {/* ---------- University degree ---------- */}
        <Reveal>
          <article className="card edu-card">
            <span className="edu-card__logo" aria-hidden="true">
              <GraduationCap size={34} />
            </span>

            <div>
              <div className="edu-card__kind">
                <span className="badge">University Degree</span>
                <span className="edu-card__status">
                  <span className="edu-card__pulse" aria-hidden="true" />
                  {education.status}
                </span>
              </div>

              <div className="edu-card__uni">{education.university}</div>
              <div className="edu-card__degree">Bachelor&apos;s in {education.degree}</div>

              <div className="edu-card__meta">
                <span className="chip">
                  <BookOpen size={13} aria-hidden="true" /> {education.campus}
                </span>
                <span className="chip">
                  <CalendarDays size={13} aria-hidden="true" /> Batch: {education.batch}
                </span>
                <span className="chip chip--done">
                  <Award size={13} aria-hidden="true" /> {education.progress}
                </span>
              </div>

              {education.description && <p className="edu-card__desc">{education.description}</p>}

              <div className="edu-card__focus">
                <h4>Academic Focus</h4>
                <ul>
                  {education.focus.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </Reveal>

        {/* ---------- Training programs (visually distinct from the degree) ---------- */}
        {trainings?.map((training, i) => (
          <Reveal key={training.id} delay={0.08 * (i + 1)}>
            <article className="card edu-card edu-card--training">
              <span className="edu-card__logo edu-card__logo--training" aria-hidden="true">
                <Award size={34} />
              </span>

              <div>
                <div className="edu-card__kind">
                  <span className="badge badge--training">{training.kind}</span>
                </div>

                <div className="edu-card__uni">{training.program}</div>
                <div className="edu-card__degree">{training.track}</div>

                <div className="edu-card__meta">
                  <span className="chip">
                    <CalendarDays size={13} aria-hidden="true" /> {training.batch}
                  </span>
                  <span className="chip">
                    <BookOpen size={13} aria-hidden="true" /> Duration: {training.duration}
                  </span>
                </div>

                <p className="edu-card__desc">{training.description}</p>

                <div className="edu-card__focus">
                  <h4>Technologies & Learning Areas</h4>
                  <div className="edu-card__areas">
                    {training.areas.map((area) => (
                      <span key={area} className="chip">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
