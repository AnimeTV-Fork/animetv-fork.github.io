# Follow-up Prompt — Design Polish Pass on the AnimeTV Website
> Use this AFTER the site from the master prompt has been scaffolded. Run it in the same Cline session/repo. Make sure the 21st.dev MCP server is connected and the UI/UX Pro Max skill is enabled before running this.

---

## ROLE

You are now doing a **design QA and polish pass** on the AnimeTV marketing website that was just built. The structure, content, and tech stack are already correct — your job now is to make it look and feel genuinely premium, fix anything that reads as generic/templated, and bring every screen up to the bar of animejs.com-level craft.

Use the **UI/UX Pro Max skill** for the audit methodology and design judgment. Use the **21st.dev MCP server** to search for and pull in better-crafted component implementations (hero sections, cards, buttons, nav bars, marketing blocks) wherever the current implementation looks generic, then adapt them to the AnimeTV purple theme — do not paste them in unstyled.

---

## STEP 1 — Audit

Go through the site section by section (Hero, Feature Bento Grid, Platform Showcase, See it in Action, Integrations, Open Source/Community, FAQ, Footer) and for each one, using the UI/UX Pro Max skill, evaluate against:

- **Visual hierarchy** — is the eye guided correctly? Is there one clear focal point per section?
- **Spacing/rhythm** — consistent vertical rhythm, no cramped or overly loose sections, consistent padding scale
- **Typography** — type scale actually varies with intent (not everything the same weight/size), line-length is readable, tracking/leading feels intentional
- **Color discipline** — purple accent is used with restraint (as a highlight, not a wash), enough contrast for accessibility, no muddy gradients
- **Component quality** — does any card/button/nav look like an unstyled shadcn default? Flag it.
- **Motion quality** — does anything animate for the sake of animating rather than adding meaning? Is anything janky, too fast, too slow, or missing easing?
- **Genericness check** — call out any section that could belong to literally any SaaS/app site, with no AnimeTV-specific personality (D-pad focus-ring motif, poster wall, tracker integrations, etc.)

Produce a short written audit (`DESIGN_AUDIT.md`) listing concrete issues per section before making changes.

---

## STEP 2 — Pull better components via 21st.dev MCP

For every section flagged as generic or under-crafted in the audit, use the **21st.dev MCP server** to search for stronger reference implementations. Specifically:

- Search 21st.dev for hero sections with animated gradient/particle backgrounds, dark glassy card grids, animated stat/counter components, pricing/feature bento layouts, and scroll-triggered reveal patterns
- Pull the closest match for each flagged section
- Adapt (don't just paste): recolor to the AnimeTV purple palette (`#0a0612` → `#120a1f` background, `#a855f7`→`#d946ef` accent gradient, `#6366f1` secondary), swap in real AnimeTV copy/icons, and wire the interaction to the existing anime.js/GSAP/Motion setup rather than introducing a conflicting animation approach
- Prefer components that are React + Tailwind + Motion-based so they integrate cleanly with the existing `kokonut-ui`/shadcn setup already in the project

Do this section by section, not all at once — after each section, verify visually in the running dev server before moving to the next.

---

## STEP 3 — Fix and tighten

While polishing, specifically check for and fix:

- Any section where spacing is inconsistent with the rest of the page's scale
- Buttons/CTAs that don't have a clear primary vs. secondary visual hierarchy
- Cards without proper hover/focus states (remember: this product is about D-pad/remote navigation — focus states should feel intentional, not an afterthought)
- Icon inconsistency — confirm everything is still coming from Iconify and nothing was pasted in as a mismatched icon set
- Mobile breakpoints — re-check every section pulled from 21st.dev actually collapses correctly on small viewports, since imported components are often desktop-first
- Reduced-motion fallback — confirm newly added animated components still respect `prefers-reduced-motion`

---

## STEP 4 — Final pass

- Re-run the full page top to bottom and check the animation choreography rules from the original brief still hold (nothing animates on load except hero, everything else triggers on scroll-into-view, one shared easing curve throughout)
- Update `NOTES.md` with what was changed and why
- Do NOT change the site's information architecture, copy content, or feature claims — this pass is visual/interaction craft only, not a content rewrite

---

## OUTPUT

When done, summarize in chat:
1. Which sections were rebuilt using 21st.dev components
2. Which issues from the audit were fixed vs. deferred (and why, if deferred)
3. Anything you'd still recommend doing manually (e.g. real screenshots, real GitHub star count, custom illustration) that's beyond what an automated pass can fix