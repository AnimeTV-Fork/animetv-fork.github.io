import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';

gsap.registerPlugin(ScrollTrigger);

interface Platform {
  id: string;
  name: string;
  icon: string;
  badge: string;
  features: string[];
  specs: string;
  screenshot: string;
  downloadUrl: string;
}

const PLATFORMS: Platform[] = [
  {
    id: 'android-tv',
    name: 'Android TV & Fire TV',
    icon: 'mdi:television-play',
    badge: '10-Foot Experience',
    features: [
      'D-pad native remote navigation',
      'System-level Picture-in-Picture (PiP)',
      'ExoPlayer / Jetpack Media3 engine',
      'Auto refresh-rate matching (Hz match)',
      'MediaSession background media controls'
    ],
    specs: 'Android 5.0+ (API 21) • FireOS 5+',
    screenshot: '/assets/Home_Lists.png',
    downloadUrl: 'https://github.com/k-nacion/rc-store/releases/download/5.14.6/5.14.6.apk'
  },
  {
    id: 'android-mobile',
    name: 'Android Mobile',
    icon: 'mdi:cellphone-play',
    badge: 'On-the-go Powerhouse',
    features: [
      'Gesture swiping for volume, brightness, seek',
      'Audio focus hook (pause on phone calls)',
      'Offline caching & list sync',
      'Optimized portrait & landscape player layouts',
      'Picture-in-Picture scaling controls'
    ],
    specs: 'Android 6.0+ (ARM64 & x86)',
    screenshot: '/assets/Source_Selector.png',
    downloadUrl: 'https://github.com/k-nacion/rc-store/releases/download/5.14.6/5.14.6.apk'
  },
  {
    id: 'windows-desktop',
    name: 'Windows Desktop',
    icon: 'mdi:microsoft-windows',
    badge: 'Electron Standalone',
    features: [
      'Headless NodeJS scraper task runner',
      'Game controller / Keyboard bindings mapping',
      'GPU accelerated Chromium media rendering',
      'Offline local watch statistics database',
      'Automatic self-updating application client'
    ],
    specs: 'Windows 10 / 11 (64-bit Edition)',
    screenshot: '/assets/Settings_Top.png',
    downloadUrl: 'https://github.com/AnimeTV-Fork/AnimeTV/releases'
  }
];

export const PlatformShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scroll trigger pinned showcase sequence
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const pinTrigger = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${PLATFORMS.length * 100}%`,
        pin: true,
        scrub: 1,
        // antialiasing fix
        invalidateOnRefresh: true,
      });

      PLATFORMS.forEach((_, index) => {
        if (index === 0) return;

        gsap.fromTo(
          panelsRef.current[index],
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: () => `top+=${index * (pinTrigger.end - pinTrigger.start) / PLATFORMS.length} top`,
              end: () => `top+=${(index + 1) * (pinTrigger.end - pinTrigger.start) / PLATFORMS.length} top`,
              scrub: true,
            }
          }
        );
      });

      return () => {
        pinTrigger.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="download" 
      className="relative min-h-screen bg-[#0d0717] py-24 md:py-0 md:flex md:items-center overflow-hidden border-y border-white/5"
    >
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-50" />

      {/* Main viewport */}
      <div className="max-w-7xl mx-auto px-4 w-full relative">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-center mb-16 md:absolute md:top-12 md:left-4 md:right-4 z-20">
          Multi-Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">Ecosystem</span>
        </h2>

        {/* Panels stack */}
        <div className="relative w-full h-full md:h-[70vh] flex flex-col md:block">
          {PLATFORMS.map((platform, index) => (
            <div
              key={platform.id}
              ref={(el) => {
                if (el) panelsRef.current[index] = el;
              }}
              className={`w-full md:absolute md:inset-0 md:flex items-center gap-12 py-8 md:py-0 ${
                index === 0 ? 'relative' : 'md:opacity-0'
              }`}
            >
              {/* Left Panel Content */}
              <div className="flex-1 space-y-6">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary-glow rounded-full text-xs font-semibold uppercase tracking-widest border border-primary/30">
                  {platform.badge}
                </span>
                
                <div className="flex items-center gap-3">
                  <Icon icon={platform.icon} className="text-4xl text-primary" />
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    {platform.name}
                  </h3>
                </div>

                <p className="text-xs text-muted font-mono tracking-wider uppercase">
                  REQUIREMENT: {platform.specs}
                </p>

                <ul className="space-y-3 pt-2">
                  {platform.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted text-sm md:text-base">
                      <span className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5 shrink-0">
                        <Icon icon="mdi:check" className="text-xs text-primary-glow" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6">
                  <a 
                    href={platform.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-6 py-3 bg-gradient-to-r from-primary to-primary-glow text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] items-center gap-2"
                  >
                    <Icon icon="mdi:download" />
                    Download client
                  </a>
                </div>
              </div>

              {/* Right Panel Visual Mockup */}
              <div className="flex-1 mt-8 md:mt-0">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl filter blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-[#170e26] border border-white/10 rounded-2xl p-3 shadow-2xl overflow-hidden aspect-video">
                    <img 
                      src={platform.screenshot} 
                      alt={platform.name}
                      className="w-full h-full object-cover rounded-lg filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                    />
                    {/* TV D-Pad highlight bracket simulator */}
                    <div className="absolute inset-4 border border-primary-glow/60 rounded pointer-events-none group-hover:scale-95 transition-transform duration-500">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary-glow" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary-glow" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary-glow" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary-glow" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};