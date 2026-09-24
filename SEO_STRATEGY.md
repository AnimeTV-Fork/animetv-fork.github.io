# AnimeTV SEO Strategy & Optimization Blueprint

Website: `https://animetv-fork.github.io/`  
Niche: Open-Source Anime Streaming Application (Android, Android TV, Fire TV, Windows)  
Target Audience: International anime viewers seeking free, ad-free, high-quality streaming across TV and desktop devices.

---

## 1. High-Intent & Long-Tail Keyword Map

### Primary Keywords (High Intent / Core App Terms)
| Keyword | Target Intent | Primary Placement |
| :--- | :--- | :--- |
| `free anime app for android tv no ads` | Commercial / Download | Title, H1, Meta Description, Hero |
| `best anime streaming app for firestick` | Download / Guide | Platform Showcase, FAQ, Guides |
| `open source anime streaming app android` | Informational / FOSS | Meta Keywords, About, Schema |
| `animetv apk download` | Direct Download | CTA Buttons, Fallback, Release Notes |
| `animetv windows download arm64` | Direct Download | Windows Platform Card, Setup docs |

### Long-Tail & Problem-Solving Queries (Low Competition, High CTR)
* `how to watch anime on android tv without ads`
* `install animetv on fire tv downloader code`
* `anime app with anilist mal sync android tv`
* `ad free anime player for windows 11 arm64`
* `free open source anime app dpad remote control`
* `animetv vs cloudstream vs aniyomi vs stremio`

---

## 2. On-Page SEO Checklist & Implementation

### Meta & Title Tags
* **Title:** `AnimeTV — Free Anime App for Android TV, Firestick & Windows (Ad-Free)` (Target length: 55–65 characters).
* **Meta Description:** `Watch 1080p anime free on Android, Android TV, Fire TV stick, and Windows. No ads, no tracking, no sign-up. Open-source APK with AniList/MAL sync & D-pad remote support.` (Target length: 155–160 characters).
* **Canonical URL:** `https://animetv-fork.github.io/`

### Semantic Heading Hierarchy
* `H1`: Single page heading targeting core brand + primary platform terms (`AnimeTV — Free Anime App for Android TV, Firestick & Windows (No Ads)`).
* `H2`: `Key Features`, `Download AnimeTV Releases`, `Supported Platforms`, `Frequently Asked Questions`.
* `H3`: Specific feature cards (`Multi-Source Scraping`, `AniList & MAL Tracker Sync`, `TV Remote D-Pad Navigation`).

### Structured Data (JSON-LD Schema)
* `WebSite` Schema with URL, brand name, language declaration.
* `SoftwareApplication` Schema with `softwareVersion`, `operatingSystem`, `applicationCategory`, `downloadUrl`, `offers` ($0 free), and `sameAs` links to GitHub and Discord.
* `FAQPage` Schema mapping exact on-page accordion questions/answers for Google Search rich dropdown results.

---

## 3. Technical SEO & Core Web Vitals Optimization

### Image Compression & Modern Formats
* **Status:** Converted heavy 6MB+ PNG screenshots to optimized `.webp` (<250KB each).
* **Favicon:** Reduced 114KB `favicon.png` to optimized 4KB icon.
* **Social Sharing:** Dedicated 1200x630 `assets/og-image.jpg` (<200KB) to ensure Open Graph previews load reliably on Twitter/X, Discord, and Telegram.
* **Lazy Loading:** `loading="lazy"` with explicit `width` and `height` attributes on all below-fold platform mockups to prevent Cumulative Layout Shift (CLS).

### Crawlability & Static Fallbacks (SPA Support)
* Maintained rich static HTML fallback inside `<div id="root">` and `<noscript>` within `index.html` to guarantee instant indexing by non-JS and search engine bots (Googlebot, Bingbot, DuckDuckGo, Yandex).
* Verified `public/robots.txt` (`Allow: /`, pointing to `sitemap.xml`).
* Verified `public/sitemap.xml` with canonical location and update frequency.

---

## 4. Content Strategy & Page Roadmap

To rank for competitive queries beyond the root domain, expand with dedicated static pages or sub-routes:

1. **/guide/firestick**:
   * "How to install AnimeTV on Amazon Firestick via Downloader App".
   * Include step-by-step instructions, screenshots, and 5-digit Downloader shortcode.
2. **/guide/windows**:
   * "AnimeTV Windows x64 / ARM64 Setup & Controller Mapping Guide".
   * Detail DirectX/Vulkan acceleration, keyboard hotkeys, and multi-monitor setups.
3. **/features/tracker-sync**:
   * "How to Sync AniList, MyAnimeList & Trakt Watchlists on Android TV".
4. **/releases**:
   * Dedicated changelog pages per major update (`/releases/v5.15.0`) to capture version-specific download searches.

---

## 5. Off-Page SEO & Backlink Blueprint

High-domain-authority links in the open-source and media streaming ecosystem:

### Open Source Directories & App Repositories
* **IzzyOnDroid F-Droid Repo:** Submit AnimeTV APK to the official IzzyOnDroid repository (authoritative `.org` do-follow backlink and automated update discovery).
* **AlternativeTo.net:** Create a comprehensive listing tagged as an alternative to *Crunchyroll*, *Funimation*, *Cloudstream*, *Aniyomi*, and *Stremio*.
* **FossHub & Softpedia:** Submit Windows setup binaries and Android APK for software indexing.

### GitHub Ecosystem Authority
* Add topics on the main repository: `android-tv`, `firetv`, `anime`, `anime-streaming`, `open-source`, `anilist`, `dpad-navigation`.
* Submit PRs to curated lists:
  * `awesome-android-tv`
  * `awesome-anime`
  * `awesome-foss-apps`

### Community Distribution
* Announce major updates on Reddit (`r/AndroidTV`, `r/firetvstick`, `r/Sideloaded`, `r/animepiracy`).
* Announce on Lemmy (`c/animepiracy`, `c/fossdroid`).
* Maintain Discord community link across all footers and metadata.

---

## 6. Action Plan & Implementation Phases

```
[Phase 1: Immediate On-Page & Technical Wins] -> COMPLETED
├── Converted 30MB+ raw PNGs to WebP (<250KB each) across all components
├── Compressed favicon.png from 114KB to 4KB
├── Created 1200x630 og-image.jpg for social snippet cards
├── Updated Title tag, Meta description, and Open Graph tags
├── Implemented FAQPage + SoftwareApplication JSON-LD schema in index.html
└── Enriched static crawler fallback HTML in index.html

[Phase 2: Search Engine Submission & Verification]
├── Upload googlee3a7707fdc0caadb.html to Google Search Console
├── Submit https://animetv-fork.github.io/sitemap.xml to GSC & Bing Webmaster Tools
└── Run PageSpeed Insights / Lighthouse test to verify green Core Web Vitals

[Phase 3: Directory Submissions & Backlink Building]
├── Submit to AlternativeTo.net
├── Submit APK to IzzyOnDroid repository
└── Open PRs to GitHub Awesome lists
```
