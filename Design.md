# AnimeTV — Design System & Application Specification

This specification details the visual identity, user experience paradigms, and technical architecture of the **AnimeTV** marketing platform and core streaming clients.

---

## 1. Visual Identity & Brand System

AnimeTV occupies a unique position: a high-performance, developer-focused media scraper with a sleek, premium consumer-facing finish. The brand language is **Design System Inspired by GitHub**, emphasizing code-forward aesthetics, functional density, and Primer foundations.

### Typography
- **Display Headlines**: `SFMono` / `JetBrains Mono` (Monospaced, highly readable, signals extraction mechanics).
- **Body & Interface**: `SFMono` / `JetBrains Mono` (Monospaced, clean rhythm, developer-focused precision).
- **Captions & Metadata**: `JetBrains Mono` (Monospaced, high density).

### Spacing & Grid System
- **Base Grid**: 8px grid system. Margins, padding, and gaps scale systematically: `8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`.
- **Layout Margins**: Max width of `1280px` (`max-w-7xl`) for page content containers with `px-4 md:px-8` side padding.
- **Section Breaks**: Vertical rhythm locked to `py-16 md:py-24` to avoid magic layout numbers.
- **Borders & Radii**: Sharp 8px corner-radius (`rounded-lg`) and hairline gray borders (`1px solid`) on panels and cards.

---

## 2. CSS Custom Property Theme Matrix

To ensure accessibility, stability, and zero-JS system theme synchronization, the site operates on a root CSS custom property system:

| Custom Property | Light Theme (Default) | Dark Theme (Auto/Override) | Semantic Purpose |
|:---|:---|:---|:---|
| `--color-bg-start` | `#ffffff` | `#0d1117` | Page canvas gradient start |
| `--color-bg-end` | `#f6f8fa` | `#161b22` | Page canvas gradient end |
| `--color-primary` | `#0969da` (Primer Blue) | `#58a6ff` (Blue Link) | Primary links, cards, icons |
| `--color-primary-glow` | `#e6f5ff` | `#1f6feb` | Active focus outline tint |
| `--color-secondary` | `#1a7f37` (GitHub Green) | `#3fb950` (Green) | Secondary action controls |
| `--color-foreground` | `#24292f` | `#c9d1d9` | Dominant text color (Contrast > 10:1) |
| `--color-muted` | `#57606a` | `#8b949e` | Descriptive copy, border strokes |
| `--color-btn-primary-text` | `#ffffff` | `#0d1117` | Primary button text (Contrast > 4.5:1) |

---

## 3. Interaction Paradigms

AI tools default to static mocks; AnimeTV uses custom-engineered micro-physics to build immersion and trust.

### A. Dynamic Spotlight Borders (`.spotlight-card`)
- **Behavior**: Cursor motion coordinates (`--mouse-x`, `--mouse-y`) are tracked in real-time using lightweight event listeners without triggering React component re-renders. 
- **Style**: Radial gradient mask lights up the 1px card borders within a `250px` radius on hover.

### B. Simulated D-Pad Navigation
- **TV Demo Mode**: Found in the `ActionCarousel` section. Allows users to simulate hardware 10-foot remote inputs using:
  - Keyboard: `Left` / `Right` arrow keys.
  - UI Touch Controller: Visual Chevron D-pad button deck.
- **Focus Rings**: Focused card gains a fuchsia/blue highlight ring with snapping spring physics.

### C. Live Scraper Status Console
- **Console Feed**: Found in the Bento Feature grid. A background hook streams live-resolved extraction logs from Miruro, Anikoto, and AniList, reinforcing the application's underlying utility in real time.

---

## 4. Page Architecture & Components

The application is structured as a single-page marketing suite built for conversion:

1. **Header (Navbar)**:
   - Sticky, frosted-glass container with backdrop-blur.
   - Smooth navigation anchor links + high-contrast Download CTA.
2. **Hero Section**:
   - Single focused visual anchor (16:9 app interface mockup) with perspective tilt.
   - Core value proposition + direct download pathways (Source Code button removed).
3. **Feature Bento Grid**:
   - 5 asymmetric visual cells mapping scraper, remote navigation, DNS bypass, AniList sync, and gesture configurations.
4. **Platform Showcase**:
   - Tab-based switch layout highlighting TV, Phone, and Windows configurations.
   - Custom requirements block + platform-specific execution packages.
5. **D-Pad Simulator (Action Carousel)**:
   - High-fidelity Swiper mockup simulating the in-app dashboard experience.
6. **Integrations**:
   - Detailed sync capability matrices for AniList, MyAnimeList, and Trakt.
7. **Community**:
   - Monospace commit cadences, contributor heatmap grid, and stars counters.
8. **FAQ Accordion**:
   - Collapsible panel queries answering safety, sync, and hardware compatibility.
9. **Footer**:
   - Simple utility columns + licensing details (GPLv3).

---

## 5. Under-the-Hood Client Architecture

The website represents a cross-platform client with three standalone engines:

```
                  ┌──────────────────────┐
                  │   AnimeTV Scraper    │
                  └──────────┬───────────┘
                             │
            ┌────────────────┼────────────────┐
            ▼                ▼                ▼
     ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
     │  Android TV  │ │   Android    │ │   Windows    │
     │  (API 21+)   │ │  (Mobile)    │ │ (Electron)   │
     └──────────────┘ └──────────────┘ └──────────────┘
```

### A. The Extraction Engine
- **Sandboxed Scraping**: Bypasses browser fingerprint blocks by rendering headless background scripts.
- **Mirror Resolver**: Dynamically pulls `.m3u8` playlists and parses index formats from Miruro, Anikoto, Animepahe, and AnimeFlix.

### B. TV Focus Handler (D-Pad)
- **Node-Snapping**: Overrides standard touch focusing to snap visible highlight blocks between grids using hardware TV controller inputs.

### C. Database Synchronization
- **OAuth Tracker Handlers**: Connects directly via GraphQL / REST APIs to update tracking entries instantly as the media player matches playback thresholds (e.g. 85% completion).
