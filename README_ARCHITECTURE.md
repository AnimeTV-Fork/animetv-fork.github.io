# AnimeTV Architecture and Platform Specifications

AnimeTV is a specialized open-source streaming application designed for Android, Android TV, and Windows (via Electron). It aggregates and scrapes anime and movie streaming content directly from various third-party web providers using a headless extraction architecture, bypassing the need for dedicated APIs. By combining a native platform wrapper (Java/C#) with an embedded Web View SPA (Single Page Application) written in TypeScript and Preact, AnimeTV provides a highly optimized, responsive, remote-control-friendly, Netflix-like interface on low-spec hardware such as TV boxes.

---

## 1. Project Overview

### Concept and Target Audience
AnimeTV targets anime enthusiasts and general cord-cutters who consume content on televisions or desktop setups. It is specifically designed to run on remote-control-operated devices (Android TV / Fire TV) and desktop systems, addressing the absence of native, high-quality, ad-free, and keyboard/controller-driven streaming applications for anime.

### The Problem It Solves
Most third-party anime streaming websites are heavily infested with malicious redirects, popups, and complex JavaScript layers that are impossible to navigate with an Android TV remote control or a game controller. Furthermore, Android TV boxes frequently suffer from constrained system resources (low RAM, slow CPUs). AnimeTV resolves this by handling heavy web scraping, decryption, and sandboxed page loading in background native webviews or worker-like sandboxes, extracting raw video streams, and rendering them in a highly optimized, uniform, hardware-accelerated user interface designed for native D-pad navigation.

---

## 2. Core Features

### Exhaustive Feature Checklist
*   **Anime & Movie Scraping & Source Aggregation**: Scrapes multiple independent sources including Miruro, Anikoto, Animepahe, and AnimeFlix. Extracts subtitle files (WebVTT/SRT), stream links (HLS `.m3u8` and MP4 `.mp4`), and mirrors.
*   **Multi-Platform Support**:
    *   **Android / Android TV (Primary)**: Java wrapper hosting a hardware-accelerated Android `WebView`. Bridges D-pad and hardware keys (remote control buttons) to the SPA UI. Features native Android MediaSession integration (play, pause, skip, background controls) and system-level PiP (Picture-in-Picture) mode. Uses a customized ExoPlayer or native HTML5 player with Media3 APIs depending on device profiles. Handles auto-refresh rate switching to match display Hz to video frames.
    *   **Windows (Electron)**: C# / Electron wrapper. Uses Node.js capabilities to run headless scraping tasks, manages local window chrome, handles keyboard and gamepad input mapping, and leverages local storage / Chromium hardware rendering.
*   **Netflix-Like UI/UX**:
    *   Designed for 10-foot interfaces (televisions viewed from a distance).
    *   Categorized content sections (Trending, Schedule, Related, Genres, Continue Watching, Watchlist).
    *   Rich backdrops, high-definition tiles, grid views, detailed media information modals, and immersive slide-out settings menus.
    *   Optimized layout adjustments for portrait vs. landscape orientations.
*   **Tracker Integrations (Sync & Authentication)**:
    *   **AniList**: Full GraphQL API integration for user authorization (OAuth), tracking progress, reading/syncing watch lists, and detailed metadata retrieval (genres, release year, airing status, seasonal data).
    *   **MyAnimeList (MAL)**: Progress tracking, sync, and secondary metadata provider.
    *   **Trakt**: Used for sync and history tracking across movie/show categories.
*   **DNS-over-HTTPS (DoH) & Domain Validation**:
    *   Integrated DoH client support to resolve blocked domains and bypass ISP/regional censors.
    *   Dynamic domain checker that tests alternative mirrors/domains for source providers when their primary domains are blocked or taken offline.
*   **Advanced Player Options & Gestures**:
    *   Custom swipe gesture overlay on touch-supported devices for brightness/volume controls and seek dragging.
    *   Audio focus management (pausing playback on incoming phone calls or when other media apps gain focus).
    *   Auto-selector system that automatically maps AniList episodes to scraped source episodes, with episode locking to prevent mismatches.

---

## 3. Tech Stack

### Languages & Frameworks
*   **Frontend SPA**: TypeScript, Preact (for low memory footprint and high performance), Preact Signals (for efficient state updates), Sass/CSS.
*   **Bundler**: Rollup / Vite config producing an ESM SPA bundle loaded into the WebView.
*   **Android App**: Java, Android SDK, AndroidX, Jetpack Media3 (ExoPlayer), WebView API.
*   **Windows App**: Electron, JavaScript/TypeScript, Node.js.
*   **Test Suite**: Vitest and Playwright/Puppeteer for integration scraping checks.

### Key Libraries & Dependencies
*   **`fpdart`**: Used in TypeScript/JS layers to implement functional programming patterns (e.g., `Either` for error handling) to prevent throwing exceptions across boundaries.
*   **`preact-router`**: Lightweight routing inside the Web View SPA.
*   **`puppeteer-core`**: Used in external scrapers and automated test verification suites to simulate browser engines, bypass Cloudflare challenges (e.g., Animepahe, Miruro), and intercept media streams.
*   **`ExoPlayer` / `Media3`**: Low-level Android media player framework handling adaptive HLS streaming, subtitle decoding, DRM, and hardware acceleration on Android TV.
*   **`SharedPreferences` / `localStorage`**: Used via bridging for caching cache-keys, AniList auth tokens, user settings, and scraping mappings with predefined Time-To-Live (TTL) expiries.

---

## 4. Architecture

### Module/Folder Structure
```
AnimeTV/
├── app/                      # Android Native Application Project (Java)
│   └── src/main/
│       ├── java/.../animetvjmto/    # Main activity, ExoPlayer wrapper, JS Bridge
│       └── assets/view/             # Packaged assets and legacy Web UI (m.js modules)
├── electron/                 # Windows/Desktop Electron wrapper configuration
├── src/                      # Modern WebView Single Page Application (TypeScript)
│   ├── core/                 # Shared domain rules, constants, and utilities
│   ├── data/                 # Repositories, mappers, DTOs, and local/remote DataSources
│   │   ├── cache/            # TTL-based localStorage caching adapters
│   │   └── datasources/      # Implementations for scraping sources (Gojo, Kaas, Wave)
│   ├── di/                   # Dependency injection container wiring
│   ├── domain/               # Core Entities, UseCases, and Repository Interfaces
│   ├── presentation/         # Preact hooks, components, state management
│   └── webview/              # WebView bridge layers mapping window.AnimeTV APIs
├── docs/                     # Architectural documents, investigations, test matrices
└── tools/                    # Web-scraping verification and debug scripts
```

### Data Flow Model (Source Scraping to Playback)
1.  **Media Discovery & Metadata Query**: The user searches or browse categories. The UI queries the **AniList GraphQL API** via the Bridge's HTTP client to fetch titles, synopsis, images, and episode count.
2.  **Source Identification & Matching**: The UI requests streams. The system passes the AniList ID and title through the **Auto-Selector Mapping** logic to identify corresponding anime IDs on the target scraper's database.
3.  **Headless Parsing (Scraping)**:
    *   The app invokes the source provider (e.g., Miruro scraper).
    *   The scraper performs network requests, intercepting dynamic iframe scripts, parsing HTML DOM structures, decrypting ciphertexts (like Kiwi or Vidcloud tokens), and resolving media mirrors.
4.  **Serialization & Normalization**: Extracted streaming details are mapped to unified `StreamSourceResult` structures containing stream URLs (`.m3u8` or `.mp4`), stream types, and text subtitle objects.
5.  **ExoPlayer / WebView Injection**: The stream URL and subtitle file paths are piped via the `_JSAPI` Bridge back to the Android Java wrapper. The native app receives the JSON payload and configures ExoPlayer or triggers the HTML5 media player for immediate hardware-accelerated playback.

### Source Isolation Principle
To maintain codebase durability, all scraping engines are strictly decoupled. Miruro, Anikoto, and other providers maintain their independent directories. Sharing scraping utility functions, common network interceptors, or encryption resolvers between sources is prohibited. If two sources use the same CDN host, they duplicate the resolution logic inside their respective directories to ensure changes to one do not break playback on the other.

---

## 5. Project History & Team

*   **Original Creator**: Amarullz
*   **Current Maintainers**: jitendhull, voltorb, and tay
*   **License**: Open Source. Managed under a custom GPLv3 / MIT-compatible arrangement (refer to the `LICENSE` file for legal specifics).

---

## 6. Visual Identity & UI Style Guide

*   **Color Palette**: Dark theme optimized for TV displays (preventing eye strain in low-light environments). Deep blacks (`#000000`), dark gray card backgrounds (`#121212`), high contrast white text for subtitles/titles, and vibrant accent colors (e.g., brand-specific red or AniList blue) for focus borders.
*   **Layout & Focus Engine**: High-visibility yellow/white bounding borders highlight the currently selected item on D-pad navigation. Carousel sliders, grid listings, and vertical details cards mimic premium services like Netflix or Apple TV.
*   **Device Responsive Scale**: Visual elements scale using DP-equivalent sizing calculated from pixel-density parameters shared through the WebView bridge.

---

## 7. Roadmap & Active Development

*   **Planned Features & Active Focus**:
    *   Adding robust streaming source engines and optimizing video players.
    *   Eliminating Exoplayer audio-video sync glitches during playback.
    *   Enhancing player swipe gestures and resolving lock conditions.
    *   Refactoring auto-selectors to minimize AniList episode matching mismatches.
    *   Regular domain checks and updates to bypass provider bans.