import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Icon } from '@iconify/react';

export const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Headline stagger
    anime({
      targets: '.hero-char',
      translateY: [30, 0],
      opacity: [0, 1],
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      duration: 800,
      delay: anime.stagger(12, { start: 100 }),
    });

    // 2. Subhead reveal
    if (subheadRef.current) {
      anime({
        targets: subheadRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        duration: 800,
        delay: 500,
      });
    }

    // 3. CTA reveal
    if (ctaRef.current) {
      anime({
        targets: ctaRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        duration: 800,
        delay: 650,
      });
    }

    // 4. Screenshot reveal
    if (screenshotRef.current) {
      anime({
        targets: screenshotRef.current,
        translateY: [60, 0],
        opacity: [0, 1],
        scale: [0.95, 1],
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        duration: 1000,
        delay: 400,
      });
    }
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center py-16 lg:py-24 px-4 md:px-8 overflow-hidden" style={{ background: `linear-gradient(to bottom, var(--color-bg-start), var(--color-bg-end))` }}>
      {/* Ambient orbs */}
      <div className="ambient-orb w-[500px] h-[500px] top-[10%] left-[15%]" />
      <div className="ambient-orb w-[400px] h-[400px] bottom-[15%] right-[10%]" />

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
            className="w-full max-w-[580px] sm:max-w-[650px] aspect-[16/9] opacity-0 select-none relative animate-hero-float"
          >
            {/* Ambient Back Glow */}
            <div
              className="absolute -inset-4 rounded-3xl pointer-events-none opacity-40 z-0"
              style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)' }}
            />

            {/* Screen Frame Container */}
            <div className="relative z-10 w-full h-full rounded-2xl border border-white/15 bg-black overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_var(--glass-glow-shadow)] group transition-all duration-500 hover:border-primary/45">
              {/* Actual Image */}
              <img
                src="assets/Home_Page.webp"
                alt="AnimeTV App Dashboard - Free Anime Streaming on Android TV and Windows"
                width="650"
                height="365"
                decoding="async"
                className="w-full h-full object-cover relative z-10"
              />
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
