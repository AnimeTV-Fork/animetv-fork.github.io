import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Icon } from '@iconify/react';

const ANIME_POSTERS = [
  "assets/Attack_On_Titan.jpg",
  "assets/Black_Clover_Season_2.jpg",
  "assets/Demon_Slayer.jpg",
  "assets/Jujutsu_Kaisen.jpg",
  "assets/Mushoku_Tensei.jpg",
  "assets/My_Hero_Academia.jpg",
  "assets/One_Piece.jpg"
];

export const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Headline stagger
    anime({
      targets: '.hero-char',
      translateY: [40, 0],
      opacity: [0, 1],
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      duration: 1000,
      delay: anime.stagger(15, { start: 200 }),
    });

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
    <section className="relative min-h-screen flex items-center justify-center py-20 lg:py-32 px-4 md:px-8 overflow-hidden" style={{ background: `linear-gradient(to bottom, var(--color-bg-start), var(--color-bg-end))` }}>
      {/* Ambient orbs */}
      <div className="ambient-orb w-[600px] h-[600px] bg-[var(--color-primary)] top-[10%] left-[15%]" />
      <div className="ambient-orb w-[500px] h-[500px] bg-[var(--color-primary-glow)] bottom-[15%] right-[10%]" style={{ animationDelay: '-7s' }} />
      <div className="ambient-orb w-[300px] h-[300px] bg-[var(--color-secondary)] top-[60%] left-[50%]" style={{ animationDelay: '-13s', opacity: 0.08 }} />

      {/* Subtle Background Poster grid */}
      <div className="absolute inset-0 -z-20 grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-3 p-6 opacity-[0.08] select-none pointer-events-none filter blur-[1.5px]">
        {Array.from({ length: 36 }).map((_, i) => {
          const poster = ANIME_POSTERS[i % ANIME_POSTERS.length];
          return (
            <div
              key={i}
              className="aspect-[2/3] rounded-md overflow-hidden relative bg-black/40"
            >
              <img
                src={poster}
                alt=""
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-primary-glow/10 mix-blend-color-burn" />
            </div>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left: Content */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase mb-6 leading-[0.95] flex flex-col items-center lg:items-start"
          >
            <span className="block overflow-hidden">
              {"NATIVE UI".split("").map((char, i) => (
                <span key={i} className="hero-char inline-block opacity-0">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden text-[var(--color-secondary)]">
              {"NO ADS".split("").map((char, i) => (
                <span key={i} className="hero-char inline-block opacity-0">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>

          {/* Subhead */}
          <p
            ref={subheadRef}
            className="text-base sm:text-lg text-muted mb-10 leading-relaxed max-w-xl opacity-0"
          >
            A high-performance media aggregator for Android, Android TV, and Windows.
            Aggregates content with native D-pad navigation, tracking sync, DNS-over-HTTPS, and zero ads.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start items-center opacity-0"
          >
            <a href="#download" className="btn-magnetic btn-primary shine-sweep">
              <Icon icon="mdi:download" className="text-xl" />
              Get AnimeTV
            </a>
            <a
              href="https://github.com/AnimeTV-Fork/AnimeTV"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic btn-secondary"
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
                src="assets/Home_Page.png"
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
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center gap-2 pointer-events-none z-20">
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[var(--color-muted)]" style={{ opacity: 0.5 }}>Scroll</span>
        <div className="w-5 h-8 rounded-full border border-[var(--color-muted)]/30 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
