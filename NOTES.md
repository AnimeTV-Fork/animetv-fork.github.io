# NOTES — AnimeTV Marketing Website

## Assumptions Made

1. **Real Download URLs** — download buttons link to `https://github.com/k-nacion/rc-store/releases/download/5.14.6/5.14.6.apk` (Android/TV) and `https://github.com/AnimeTV-Fork/AnimeTV/releases` (Windows).
2. **GitHub repo URL** — canonical fork URL `https://github.com/AnimeTV-Fork/AnimeTV` is configured for the repository and source links.
3. **No Discord link found** — omitted Discord from footer. Add when available.
4. **Real screenshots** — The Hero screen, PlatformShowcase, and "See it in Action" D-pad Carousel use real 16:9 screenshots of the AnimeTV application, copied to `/public/assets/`.
5. **Logo treated elegantly** — `ic_launcher-playstore.png` rendered with a dynamic theme glow treatment (glow matches the current theme, either blue or purple).
6. **AniList OAuth / MAL / Trakt logos** — represented via Iconify glyphs (`simple-icons` set) rather than official brand SVGs. Swap for official assets if licensing permits.
7. **GitHub stats** — star/contributor counts are hardcoded placeholders. Wire up GitHub API or use a build-time fetch to pull real numbers.
8. **WebGL particle background** — fully implemented using lightweight WebGL (OGL) for smooth, high-performance fluid gradient blobs that interactively transition colors on theme changes.
9. **Sticky Navbar** — glassmorphism navbar with scroll-aware background transition, smooth-scroll nav links to section IDs, mobile hamburger menu with AnimatePresence.
10. **Scroll-to-top button** — appears after 600px scroll, purple accent, smooth scroll back to top.
11. **SEO meta tags** — OpenGraph, Twitter Card, theme-color, and description meta tags in index.html.
12. **Inter font** — loaded via Google Fonts CDN for brand-consistent typography.

## Architecture

- **React + Vite + TypeScript + Tailwind CSS** — standard SPA
- **Lenis** — smooth scroll wrapper on entire page
- **Motion (Framer Motion)** — React component transitions, hover states, scroll-triggered reveals via `whileInView`
- **GSAP + ScrollTrigger** — scroll-pinned platform showcase section
- **anime.js** — hero logo SVG draw-in, staggered text reveals
- **split-type** — headline character splitting for stagger animations
- **Swiper** — horizontal poster carousel in "See it in Action"
- **Iconify** — all icons via `@iconify/react` (lucide, mdi, simple-icons sets)
- **OGL** — lightweight WebGL rendering engine for the fluid shader background

## Component Map

| Component | Section | Key Libraries |
|---|---|---|
| `Hero` | Hero + logo + headline + CTAs | anime.js, split-type, Motion |
| `ParticleBackground` | Fullscreen WebGL fluid gradient canvas | OGL |
| `BentoGrid` | Feature cards (6 items) | Motion (whileInView) |
| `PlatformShowcase` | Scroll-pinned platform panels | GSAP ScrollTrigger |
| `ActionCarousel` | Netflix-style poster rows | Swiper |
| `Integrations` | AniList / MAL / Trakt cards | Motion, Iconify |
| `Community` | Open source / team / GitHub stats | Motion |
| `Faq` | Accordion FAQ | Motion (AnimatePresence) |
| `Navbar` | Sticky nav, mobile menu, smooth scroll links | Motion (AnimatePresence), Iconify |
| `ScrollToTop` | Floating scroll-to-top button | Iconify |
| `App` | Layout, footer + download CTA | Lenis, Iconify |

## If You Want to Extend This

1. **Live GitHub stats** — add a `useEffect` fetch to `https://api.github.com/repos/AnimeTV-Fork/AnimeTV` at build time or runtime. Display real stars/forks/contributors.
2. **Real screenshots** — replace poster placeholder cards with actual app screenshots. The Swiper setup already handles responsive image cards.
3. **D-pad focus-ring demo** — the spec mentions an interactive arrow-key demo. Add a small `onKeyDown` handler to the ActionCarousel section that moves a glowing border between cards. ~30 lines of code.
4. **Custom cursor** — add a magnetic cursor follower component (a small purple glow circle that follows the mouse with spring physics via Motion). ~50 lines.
5. **i18n** — all copy is in component files. Extract to a JSON locale file if multi-language support is needed.
6. **Analytics** — add Plausible or Umami script tag to `index.html` for privacy-respecting analytics.
7. **SEO** — OpenGraph/Twitter meta tags already in index.html. Add `react-helmet-async` for dynamic per-page meta if routing is added.

## Design System (Polish Pass)

A unified CSS design system was added to `index.css` using CSS custom properties:

- **Color tokens** — `--color-bg-start`, `--color-bg-end`, `--color-primary`, `--color-glow`, `--color-text`, `--color-muted` etc.
- **Reusable classes** — `.glass-card`, `.badge-glow`, `.gradient-text`, `.btn-primary`, `.btn-magnetic`, `.section-padding`, `.section-divider`, `.noise-overlay`
- **Consistent glow effects** — standardized `box-shadow` glow on hover across all interactive elements
- **Noise texture** — inline SVG data URI applied via `.noise-overlay` pseudo-element, no network request
- **prefers-reduced-motion** — disables all CSS animations/transitions globally

All components reference these shared tokens/classes instead of inline Tailwind color values, making future theme changes a single-file edit.

## Performance Notes

- Build output: ~673 KB JS (gzipped ~209 KB) across 4 chunks + 49 KB CSS
- Swiper and animation libs are code-split into separate chunks
- `prefers-reduced-motion` disables all CSS animations and transitions
- Inter font loaded via Google Fonts CDN with `display=swap` for fast rendering
- Noise texture is inline SVG data URI — no extra network request
