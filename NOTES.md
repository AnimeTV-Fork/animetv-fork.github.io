# NOTES — AnimeTV Marketing Website

## Assumptions Made

1. **Real Download URLs** — download buttons link to `https://github.com/k-nacion/rc-store/releases/download/5.14.6/5.14.6.apk` (Android/TV) and `https://github.com/AnimeTV-Fork/AnimeTV/releases` (Windows).
2. **GitHub repo URL** — canonical fork URL `https://github.com/AnimeTV-Fork/AnimeTV` is configured for the repository and source links.
3. **No Discord link found** — omitted Discord from footer. Add when available.
4. **Real screenshots** — The Hero screen, PlatformShowcase, and "See it in Action" D-pad Carousel use real 16:9 screenshots of the AnimeTV application, copied to `/public/assets/`.
5. **Logo used as-is** — `ic_launcher-playstore.png` rendered without recoloring; purple glow applied around it via CSS `drop-shadow` and radial gradients.
6. **AniList OAuth / MAL / Trakt logos** — represented via Iconify glyphs (`simple-icons` set) rather than official brand SVGs. Swap for official assets if licensing permits.
7. **GitHub stats** — star/contributor counts are hardcoded placeholders. Wire up GitHub API or use a build-time fetch to pull real numbers.
8. **WebGL particle background** — implemented as pure CSS animated gradient blobs (no OGL/Three.js) to keep bundle size small and avoid mobile perf issues. Upgrade path noted below.

## Architecture

- **React + Vite + TypeScript + Tailwind CSS** — standard SPA
- **Lenis** — smooth scroll wrapper on entire page
- **Motion (Framer Motion)** — React component transitions, hover states, scroll-triggered reveals via `whileInView`
- **GSAP + ScrollTrigger** — scroll-pinned platform showcase section
- **anime.js** — hero logo SVG draw-in, staggered text reveals
- **split-type** — headline character splitting for stagger animations
- **Swiper** — horizontal poster carousel in "See it in Action"
- **Iconify** — all icons via `@iconify/react` (lucide, mdi, simple-icons sets)

## Component Map

| Component | Section | Key Libraries |
|---|---|---|
| `Hero` | Hero + logo + headline + CTAs | anime.js, split-type, Motion |
| `ParticleBackground` | Fullscreen animated gradient blobs | Pure CSS |
| `BentoGrid` | Feature cards (6 items) | Motion (whileInView) |
| `PlatformShowcase` | Scroll-pinned platform panels | GSAP ScrollTrigger |
| `ActionCarousel` | Netflix-style poster rows | Swiper |
| `Integrations` | AniList / MAL / Trakt cards | Motion, Iconify |
| `Community` | Open source / team / GitHub stats | Motion |
| `Faq` | Accordion FAQ | Motion (AnimatePresence) |
| `App` | Layout + footer + download CTA | Lenis, Iconify |

## If You Want to Extend This

1. **Real WebGL background** — swap `ParticleBackground` CSS blobs for an OGL particle field. Keep the component interface identical; just replace the inner implementation. The CSS fallback stays for `prefers-reduced-motion`.
2. **Live GitHub stats** — add a `useEffect` fetch to `https://api.github.com/repos/AmarullzDev/AnimeTV` at build time or runtime. Display real stars/forks/contributors.
3. **Real screenshots** — replace poster placeholder cards with actual app screenshots. The Swiper setup already handles responsive image cards.
4. **D-pad focus-ring demo** — the spec mentions an interactive arrow-key demo. Add a small `onKeyDown` handler to the ActionCarousel section that moves a glowing border between cards. ~30 lines of code.
5. **Custom cursor** — add a magnetic cursor follower component (a small purple glow circle that follows the mouse with spring physics via Motion). ~50 lines.
6. **i18n** — all copy is in component files. Extract to a JSON locale file if multi-language support is needed.
7. **Analytics** — add Plausible or Umami script tag to `index.html` for privacy-respecting analytics.
8. **SEO** — add `react-helmet-async` for dynamic meta tags, or use Vite SSG plugin for static pre-rendering.

## Performance Notes

- Build output: ~663 KB JS (gzipped ~208 KB) across 4 chunks + 43 KB CSS
- Swiper and animation libs are code-split into separate chunks
- `prefers-reduced-motion` disables all CSS animations and transitions
- No external font loading (uses system font stack via Tailwind defaults) — add Inter/custom font if brand requires it
- Noise texture is inline SVG data URI — no extra network request