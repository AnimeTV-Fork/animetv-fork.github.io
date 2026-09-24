import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Icon } from '@iconify/react';

const ANIME_POSTERS = [
  "assets/Attack_On_Titan.webp",
  "assets/Black_Clover_Season_2.webp",
  "assets/Demon_Slayer.webp",
  "assets/Jujutsu_Kaisen.webp",
  "assets/Mushoku_Tensei.webp",
  "assets/My_Hero_Academia.webp",
  "assets/One_Piece.webp"
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
    <section className="relative min-h-[100dvh] flex items-center justify-center py-16 lg:py-24 px-4 md:px-8 overflow-hidden" style={{ background: `linear-gradient(to bottom, var(--color-bg-start), var(--color-bg-end))` }}>
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] uppercase mb-6 leading-[0.95] flex flex-col items-center lg:items-start"
          >
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-primary-glow uppercase mb-3 font-mono">
              AnimeTV App
            </span>
            <span className="block overflow-hidden">
              {"Watch anime.".split("").map((char, i) => (
                <span key={i} className="hero-char inline-block opacity-0">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden text-[var(--color-secondary)]">
              {"Skip the ads.".split("").map((char, i) => (
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
            Free app for Android, Android TV, Fire TV, and Windows.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start items-center opacity-0"
          >
            <a href="#download" className="btn-magnetic btn-primary shine-sweep focus-visible:ring-2 focus-visible:ring-primary-glow focus-visible:outline-none">
              <Icon icon="mdi:download" className="text-xl" />
              Download for Android
            </a>
            <a
              href="#download"
              className="btn-magnetic btn-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Icon icon="mdi:microsoft-windows" className="text-xl" />
              Get the Windows app
            </a>
            <a
              href="https://discord.gg/ECazA5ZE6f"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic btn-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Icon icon="ic:baseline-discord" className="text-xl" />
              Join Discord
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
                src="assets/Home_Page.webp"
                alt="AnimeTV App Dashboard - Free Anime Streaming on Android TV and Windows"
                width="650"
                height="365"
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

    </section>
  );
};
