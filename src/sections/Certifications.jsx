import { useEffect, useState } from 'react'
import { ExternalLink, Eye, X, FileBadge } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { certificates } from '../data/certificates'

// Flatten every certificate image (single `file` or multi-image `files`)
// into the list of preview buttons rendered on a card.
function certImages(cert) {
  if (Array.isArray(cert.files) && cert.files.length > 0) {
    return cert.files
      .filter((f) => f && f.src)
      .map((f) => ({ label: f.label || 'View Certificate', src: f.src }))
  }
  if (cert.file) return [{ label: 'View Certificate', src: cert.file }]
  return []
}

export default function Certifications() {
  const [preview, setPreview] = useState(null)

  // Escape closes the lightbox.
  useEffect(() => {
    if (!preview) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setPreview(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [preview])

  return (
    <section id="certifications" className="section">
      <div className="container">
        <SectionHeading
          label="Certifications"
          title="Credentials & Certificates"
          sub="Training credentials and certificates earned through real programs — presented exactly as issued, with previews added as the files become available."
        />

        <div className="certs__grid">
          {certificates.map((cert, i) => {
            const images = certImages(cert)
            return (
              <Reveal key={cert.id} delay={i * 0.07}>
                <article className="card cert-card">
                  <div className="cert-card__top">
                    <span className="icon-box icon-box--sm" aria-hidden="true">
                      <FileBadge size={20} />
                    </span>
                    {cert.count > 1 && <span className="badge">{cert.count} Certificates</span>}
                  </div>

                  <h3>{cert.title}</h3>
                  <div className="cert-card__issuer">{cert.issuer}</div>
                  {cert.date && <div className="cert-card__date">Issued {cert.date}</div>}

                  {cert.description && <p className="cert-card__desc">{cert.description}</p>}

                  {(images.length > 0 || cert.link) && (
                    <div className="cert-card__actions">
                      {images.map((img) => (
                        <button
                          key={img.src}
                          className="btn btn--ghost btn--sm"
                          onClick={() => setPreview({ title: `${cert.title} — ${img.label}`, src: img.src })}
                        >
                          <Eye size={14} aria-hidden="true" /> {img.label}
                        </button>
                      ))}
                      {cert.link && (
                        <a className="btn btn--ghost btn--sm" href={cert.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} aria-hidden="true" /> Verify Credential
                        </a>
                      )}
                    </div>
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>

      {preview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={preview.title}
          onClick={() => setPreview(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
            background: 'rgba(2, 4, 10, 0.9)',
            display: 'grid',
            placeItems: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(920px, 100%)',
              maxHeight: '86dvh',
              overflow: 'auto',
              background: '#0b1327',
              border: '1px solid rgba(47, 107, 255, 0.4)',
              borderRadius: '16px',
              padding: '18px',
              boxShadow: '0 30px 70px rgba(0,0,0,0.6)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: '14px',
              }}
            >
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: '16px' }}>{preview.title}</strong>
              <button className="btn btn--ghost btn--sm" onClick={() => setPreview(null)} aria-label="Close preview">
                <X size={14} aria-hidden="true" /> Close
              </button>
            </div>
            <img
              src={preview.src}
              alt={`Certificate — ${preview.title}`}
              style={{ width: '100%', display: 'block', borderRadius: '10px' }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
