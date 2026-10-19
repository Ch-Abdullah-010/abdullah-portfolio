// Shared smooth-scroll helper used by the hero, footer, projects CTA,
// experience timeline and contact section. Keeps behaviour consistent
// with the Navbar (smooth scroll + hash update, reduced-motion aware).
export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  window.history.replaceState(null, '', `#${id}`)
}
