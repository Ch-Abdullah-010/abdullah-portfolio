# Abdullah Asif — Cinematic Digital Intelligence Portfolio

A premium, single-page React portfolio with a cinematic architectural-doorway
intro, interactive particle background, and an offline "Ask About Abdullah"
chatbot. Built with **React 18 + Vite 6**, styled with a custom design system,
animated with **Framer Motion**, and ready to deploy on **Vercel**.

---

## Quick start

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

No environment variables are required to run the site — everything works
out of the box (the contact form uses a mailto fallback and the chatbot runs
fully offline).

---

## Project structure

```
public/
  favicon.svg                      AA monogram favicon
  images/
    profile/abdullah.png           your portrait (intro + hero)
    certificates/                  <- drop certificate images here (see below)
src/
  App.jsx                          composes intro + navbar + all sections
  components/
    CinematicIntro.jsx             5-stage doorway reveal
    Navbar.jsx                     scroll-spy navigation + mobile menu
    ParticleBackground.jsx         canvas particle network + cursor glow
    Chatbot.jsx                    "Ask About Abdullah" panel
    Footer.jsx
    Reveal.jsx                     scroll-reveal wrapper
    SectionHeading.jsx
  sections/
    Hero.jsx About.jsx Skills.jsx Services.jsx Projects.jsx
    Experience.jsx Certifications.jsx Education.jsx Contact.jsx
  data/                            ← EDIT CONTENT HERE, NOT IN COMPONENTS
    profile.js      name, bio, education, contact links
    skills.js       skill categories
    services.js     service cards
    projects.js     project cards
    experience.js   timeline entries
    certificates.js certificate gallery
    knowledge.js    chatbot knowledge base + FAQ matcher
  styles/
    base.css components.css sections.css intro.css
  utils/scroll.js                  shared smooth-scroll helper
```

**All editable content lives in `src/data/`.** You never need to touch a
component to update text, links, or add a project/certificate.

---

## Contact form

The form validates input, then opens the visitor's own email application with
the message pre-filled, addressed to you. It honestly tells the visitor that
their mail app was opened — it never claims a message was "sent".

### Optional upgrade — Web3Forms (real inbox delivery)

1. Get a free key at <https://web3forms.com> (it emails straight to your inbox).
2. Copy `.env.example` to `.env` and add:
   ```
   VITE_WEB3FORMS_ACCESS_KEY="your-key-here"
   ```
3. Then wire `src/sections/Contact.jsx` to POST to Web3Forms instead of the
   mailto fallback. (Ask your AI assistant to do this step once you have the key.)

`.env` is already git-ignored.

---

## Chatbot

"Ask About Abdullah" runs **fully offline** using the keyword-matched FAQ
engine in `src/data/knowledge.js`. It answers only from your real portfolio
information and falls back to "I don't know — contact Abdullah" for anything
else. **No API keys, no cost, no hallucinated answers.**

To improve its answers, edit the `faq` array in `src/data/knowledge.js`.

---

## Certifications — how to add your certificates

Right now all 6 certificate cards show an honest **"Details Pending"** badge
with no image and no link.

### Option A — you have image files (PNG/JPG)

1. Drop each file into `public/images/certificates/` using the exact filenames
   listed in `public/images/certificates/README.txt`, e.g.
   `bano-qabil-web-development.png`.
2. In `src/data/certificates.js`, set for that entry:
   ```js
   file: '/images/certificates/bano-qabil-web-development.png',
   status: 'ready',
   ```
   A "View Certificate" button with a lightbox appears automatically.

### Option B — the credential only exists on a website

Set `link: 'https://official-url…'` in the same file — a "Verify Credential"
button appears instead.

### Also worth filling in later (same file)

- The exact `title` for the two **PI & JR** entries and the **Anthropic /
  Claude** entry (currently marked "title to be confirmed").
- The `date` for every certificate (currently blank except Alkhidmat).

---

## Projects

The four projects currently display **title + detailed description only** —
no screenshots, no repo/demo buttons, no tech badges (by design).

If you later want tech badges, screenshots, or links, edit
`src/data/projects.js`:

```js
tech: ['HTML5', 'CSS3', 'JavaScript'],   // shows badge row
image: '/images/projects/mobile-store.png',
repo: 'https://github.com/Ch-Abdullah-010/…',
demo: 'https://…',
```

The cards support all of these fields already.

---

## Deploy to Vercel

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Portfolio v1.0"
   git branch -M main
   git remote add origin https://github.com/Ch-Abdullah-010/abdullah-portfolio.git
   git push -u origin main
   ```
2. Go to <https://vercel.com/new> → import the repository.
3. Vercel auto-detects Vite. Settings are:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. Done — no environment variables needed.

Every push to `main` redeploys automatically.

---

## Accessibility & performance notes

- Full keyboard navigation, visible focus states, labelled form fields.
- `prefers-reduced-motion` disables the intro, particles, tilt, and parallax.
- Intro plays once per browser session (`sessionStorage`), with a Skip button.
- Particle system pauses when the tab is hidden and scales down on mobile.
- All animation loops and event listeners are cleaned up on unmount.
