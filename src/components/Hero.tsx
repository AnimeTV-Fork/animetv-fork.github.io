import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import SplitType from 'split-type';
import { Icon } from '@iconify/react';

export const Hero: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Logo fade + scale in
    if (logoRef.current) {
      anime({
        targets: logoRef.current,
        scale: [0.8, 1],
        opacity: [0, 1],
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        duration: 1200,
        delay: 200,
      });
    }

    // 2. Headline Split-Type stagger
    if (headlineRef.current) {
      const text = new SplitType(headlineRef.current, { types: 'chars,words' });
      anime({
        targets: text.chars,
        translateY: [40, 0],
        opacity: [0, 1],
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        duration: 1000,
        delay: anime.stagger(25, { start: 500 }),
      });
    }

    // 3. Subhead reveal
    if (subheadRef.current) {
      anime({
        targets: subheadRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        duration: 1000,
        delay: 900,
      });
    }

    // 4. CTA reveal
    if (ctaRef.current) {
      anime({
        targets: ctaRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        duration: 1000,
        delay: 1100,
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background: poster wall — subtle purple-tinted grid */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient overlay to fade poster wall */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0612]/60 via-[#0a0612]/80 to-[#0a0612]" />
        {/* Radial glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/8 rounded-full filter blur-[150px] z-10" />
        {/* Poster grid */}
        <div className="absolute inset-0 grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-3 p-6 opacity-[0.12] select-none pointer-events-none filter blur-[1px]">
          {Array.from({ length: 36 }).map((_, i) => {
            const hues = [260, 270, 280, 290, 300, 250, 240, 310];
            const hue = hues[i % hues.length];
            return (
              <div
                key={i}
                className="aspect-[2/3] rounded-md"
                style={{ background: `linear-gradient(145deg, hsl(${hue}, 50%, 18%) 0%, hsl(${hue + 20}, 40%, 6%) 100%)` }}
              />
            );
          })}
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-5xl mx-auto flex flex-col items-center z-10">
        {/* Logo */}
        <div ref={logoRef} className="mb-10 opacity-0 flex items-center gap-4">
          <img
            src="/assets/ic_launcher-playstore.png"
            alt="AnimeTV"
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl filter drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]"
          />
          <span className="text-3xl md:text-4xl font-black tracking-tight text-white glow-text">
            Anime<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">TV</span>
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-[0.9] max-w-4xl opacity-0"
        >
          Free Anime.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">
            No Ads.
          </span>{' '}
          Native TV Feel.
        </h1>

        {/* Subhead */}
        <p
          ref={subheadRef}
          className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mb-12 leading-relaxed opacity-0"
        >
          A Netflix-style 10-foot streaming experience for Android, Android TV, and Windows.
          Multi-source scraping, AniList sync, D-pad navigation — no ads, fully open source.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0"
        >
          <a
            href="#download"
            className="px-8 py-4 bg-gradient-to-r from-primary to-primary-glow text-white font-bold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(168,85,247,0.35)] flex items-center gap-2.5"
          >
            <Icon icon="mdi:download" className="text-xl" />
            Get AnimeTV
          </a>
          <a
            href="https://github.com/AmarullzDev/AnimeTV"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 glass-panel hover:bg-white/10 text-white font-bold rounded-xl transition-transform hover:scale-105 active:scale-95 flex items-center gap-2.5"
          >
            <Icon icon="mdi:github" className="text-xl" />
            Source Code
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted/60 animate-bounce">
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
        <Icon icon="mdi:chevron-down" className="text-lg text-primary/60" />
      </div>
    </section>
  );
};