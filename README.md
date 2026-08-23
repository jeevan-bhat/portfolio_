# Jeevan G Bhat — Personal Portfolio

A clean, modern, fully responsive personal portfolio built with **HTML, CSS, and vanilla JavaScript** — no frameworks, no build step. Just open it in a browser.

> **Task 01 — Personal Portfolio Website:** showcase profile, skills, and projects with Home, About, Projects, and Contact sections, a modern design, JavaScript interactivity (smooth scrolling, animations, form validation), full responsiveness, and links to résumé, social profiles, and GitHub.

## ✨ Features

- **Responsive design** — mobile-first, works from 320px phones up to large desktops.
- **Light & dark themes** — toggle in the navbar, remembered via `localStorage`, and applied before paint (no flash).
- **Smooth scrolling** with a sticky navbar and **scroll-spy** active-link highlighting.
- **Animations** — scroll-reveal (IntersectionObserver), a hero typing effect, count-up stats, and animated skill bars.
- **Accessible form validation** — inline, styled error messages with real-time feedback and a success state.
- **Nice touches** — scroll-progress bar, back-to-top button, animated mobile hamburger menu.
- **Self-contained** — inline SVG icons (no icon-font CDN) so it works fully offline. Google Fonts degrade gracefully to system fonts.
- **Respects `prefers-reduced-motion`** and includes a skip link + focus styles.

## 📁 Structure

```
personal_portfolio/
├── index.html          # Markup & content
├── css/
│   └── style.css       # Design tokens, layout, components, responsive rules
├── js/
│   └── script.js       # Theme, nav, scroll effects, typing, counters, form validation
├── assets/
│   └── resume.pdf      # Résumé (linked from the hero & about sections)
└── README.md
```

## 🚀 Running it

No build tools required — just open `index.html` in your browser.

For the best experience (so relative paths and the theme script behave like production), serve it locally:

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500`.

## 🔗 Featured projects

Live, deployed projects linked in the Projects section:

- **SentinelScope** — cybersecurity threat platform · [live](https://sentinelscope-cybersecurity.onrender.com) · [code](https://github.com/jeevan-bhat/SentinelScope-Cybersecurity)
- **Stock Market Prediction & Analysis** — ML web app · [live](https://stock-market-prediction-analysis-web-z5k8.onrender.com) · [code](https://github.com/jeevan-bhat/Stock-Market-Prediction-Analysis-Web-Application)
- **AI Chatbot** · [live](https://ai-chatbot-rouz.onrender.com) · [code](https://github.com/jeevan-bhat/ai_chatbot)
- **AI Image Generator** · [live](https://ai-image-generator-225m.onrender.com) · [code](https://github.com/jeevan-bhat/ai_image_generator)
- **Hospital Management System** · [live](https://hospital-managment-system-e2c4.onrender.com) · [code](https://github.com/jeevan-bhat/hospital_managment_system)

More on GitHub: [github.com/jeevan-bhat](https://github.com/jeevan-bhat)

## 🛠️ Updating content

- **Bio, name & roles** — edit the hero, about, and footer text in `index.html`; the rotating job titles live in the `roles` array near the top of `js/script.js`.
- **Projects** — each is an `<article class="project">` in the Projects section; edit the title, description, tech `chips`, and the Code / Live Demo links. Swap the `project__thumb--a … --f` gradient class or the emoji.
- **Skills** — edit the `chips` lists and the `data-level` values on the `.bar__fill` elements.
- **Stats** — the count-up numbers use `data-count` (add `data-suffix=""` to hide the trailing `+`).
- **Résumé** — replace `assets/resume.pdf` with an updated PDF (keep the filename).
- **Colors** — tweak the brand palette at the top of `css/style.css` (`--brand`, `--brand-2`, `--accent`); everything else derives from those tokens.

## 📬 The contact form & email links

The form validates on the client, then **opens a Gmail compose window** pre-filled
with the visitor's name, email, subject, and message, addressed to
`jeevanbhat33@gmail.com` — so a single click actually starts a real email (no
backend required). The email icons/links in the hero, contact card, and footer
open the same Gmail compose view in a new tab.

- The Gmail compose URL is built in the submit handler in `js/script.js`
  (`https://mail.google.com/mail/?view=cm&fs=1&to=…`).
- Prefer the standard OS mail client instead? Swap those links/handler back to
  `mailto:jeevanbhat33@gmail.com`.
- Want messages delivered silently in the background (no compose window)?
  Replace the compose block with a `fetch()` POST to a service like
  [Formspree](https://formspree.io) / [Web3Forms](https://web3forms.com) or your
  own API.

## 🚀 Deploy to Render

This repo ships a [`render.yaml`](render.yaml) Blueprint, so Render deploys it as a
zero-build **static site**:

1. Push this repo to GitHub (it lives at `github.com/jeevan-bhat/portfolio_`).
2. In the [Render dashboard](https://dashboard.render.com) → **New +** → **Blueprint**.
3. Connect the `portfolio_` repo. Render reads `render.yaml` and creates a static
   site named `jeevan-portfolio` that publishes the repo root.
4. Click **Apply** — it goes live at `https://jeevan-portfolio.onrender.com`
   (name may vary).

Every push to `main` then auto-deploys. No build step or environment variables needed.
