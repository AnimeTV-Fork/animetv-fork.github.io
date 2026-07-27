import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import SplitType from 'split-type';
import { Icon } from '@iconify/react';

export const Hero: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);

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

    // 5. Screenshot reveal + float animation loop
    if (screenshotRef.current) {
      anime({
        targets: screenshotRef.current,
        translateY: [100, 0],
        opacity: [0, 1], // Full opacity
        scale: [0.9, 1],
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        duration: 1500,
        delay: 600,
        complete: () => {
          // Infinite floating micro-animation
          anime({
            targets: screenshotRef.current,
            translateY: [-10, 10],
            rotateX: [8, 12],
            rotateY: [-12, -16],
            duration: 6000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutQuad',
          });
        },
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 lg:py-32 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-[#0a0612] to-black">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-glow/10 rounded-full filter blur-[120px] -z-10 pointer-events-none" />

      {/* Subtle Background Poster grid */}
      <div className="absolute inset-0 -z-20 grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-3 p-6 opacity-[0.04] select-none pointer-events-none filter blur-[1px]">
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

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left: Content */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Logo */}
          <div ref={logoRef} className="mb-6 opacity-0 flex items-center gap-3">
            <img
              src="/assets/ic_launcher-playstore.png"
              alt="AnimeTV"
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl filter drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
            />
            <span className="text-2xl md:text-3xl font-black tracking-tight text-white glow-text">
              Anime<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">TV</span>
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-[1.0] opacity-0"
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
            className="text-base sm:text-lg text-muted mb-10 leading-relaxed max-w-xl opacity-0"
          >
            A Netflix-style 10-foot streaming experience for Android, Android TV, and Windows.
            Multi-source scraping, AniList sync, D-pad navigation — no ads, fully open source.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start items-center opacity-0"
          >
            <a
              href="#download"
              className="px-8 py-4 bg-gradient-to-r from-primary to-primary-glow text-white font-bold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(168,85,247,0.35)] flex items-center gap-2.5 w-full sm:w-auto justify-center"
            >
              <Icon icon="mdi:download" className="text-xl" />
              Get AnimeTV
            </a>
            <a
              href="https://github.com/AmarullzDev/AnimeTV"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 glass-panel hover:bg-white/10 text-white font-bold rounded-xl transition-transform hover:scale-105 active:scale-95 flex items-center gap-2.5 w-full sm:w-auto justify-center"
            >
              <Icon icon="mdi:github" className="text-xl" />
              Source Code
            </a>
          </div>
        </div>

        {/* Right: Prominent Screen Mockup */}
        <div className="lg:col-span-6 flex justify-center items-center w-full mt-8 lg:mt-0">
          <div
            ref={screenshotRef}
            className="w-full max-w-[580px] sm:max-w-[650px] aspect-[16/9] opacity-0 select-none relative"
            style={{
              transform: 'perspective(1200px) rotateX(10deg) rotateY(-14deg) rotateZ(3deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Ambient Back Glow */}
            <div className="absolute -inset-4 bg-primary/20 rounded-2xl filter blur-2xl z-0" />
            
            {/* Screen Frame Container */}
            <div className="relative z-10 w-full h-full rounded-2xl border border-white/15 bg-black overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_60px_rgba(168,85,247,0.15)] group transition-all duration-500 hover:border-primary/45 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_80px_rgba(168,85,247,0.3)]">
              {/* Glass Reflection Accent */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-20" />
              
              {/* Actual Image */}
              <img
                src="/assets/app-screenshot.png"
                alt="AnimeTV App Dashboard"
                className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Purple-tint Blend layer */}
              <div className="absolute inset-0 bg-primary/5 mix-blend-color z-15 pointer-events-none" />
            </div>

            {/* Glowing D-pad Focus Ring motif overlay */}
            <div className="absolute -inset-1 border-2 border-primary rounded-3xl opacity-60 z-20 animate-pulse pointer-events-none" />
          </div>
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
