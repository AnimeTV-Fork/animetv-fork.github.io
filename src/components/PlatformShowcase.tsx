import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

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
      'D-pad native remote navigation support',
      'System-level Picture-in-Picture (PiP) capability',
      'ExoPlayer / Jetpack Media3 high-performance engine',
      'Auto refresh-rate matching (Hz match) for smooth playback',
      'MediaSession background media controls integration'
    ],
    specs: 'Android 5.0+ (API 21) • FireOS 5+',
    screenshot: 'assets/Home_Lists.png',
    downloadUrl: 'https://github.com/k-nacion/rc-store/releases/download/5.14.6/5.14.6.apk'
  },
  {
    id: 'android-mobile',
    name: 'Android Mobile',
    icon: 'mdi:cellphone-play',
    badge: 'On-the-go Powerhouse',
    features: [
      'Intuitive gesture controls for volume, brightness, and seek',
      'Audio focus handling to pause playback during phone calls',
      'Offline watchlist caching & deep synchronization',
      'Optimized portrait & landscape video player layouts',
      'Customizable Picture-in-Picture scaling boundaries'
    ],
    specs: 'Android 6.0+ (ARM64 & x86)',
    screenshot: 'assets/Source_Selector.png',
    downloadUrl: 'https://github.com/k-nacion/rc-store/releases/download/5.14.6/5.14.6.apk'
  },
  {
    id: 'windows-desktop',
    name: 'Windows Desktop',
    icon: 'mdi:microsoft-windows',
    badge: 'Electron Standalone',
    features: [
      'Headless NodeJS scraper architecture runner',
      'Game controller and custom keyboard hotkey mapping',
      'GPU accelerated Chromium media rendering pipeline',
      'Offline local watch statistics database tracker',
      'Automatic self-updating application client updater'
    ],
    specs: 'Windows 10 / 11 (64-bit Edition)',
    screenshot: 'assets/Settings_Top.png',
    downloadUrl: 'https://github.com/AnimeTV-Fork/AnimeTV/releases'
  }
];

export const PlatformShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const current = PLATFORMS[activeTab];

  return (
    <section 
      id="platforms" 
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'var(--color-bg-end)' }}
    >
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-50" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge-glow mb-4 inline-flex">Platforms</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            Multi-Platform <span className="gradient-text">Ecosystem</span>
          </h2>
          <p className="text-[var(--color-muted)] text-sm max-w-md mx-auto mt-2">
            Tailored native engines optimized for the screen you watch on.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-2xl mx-auto">
          {PLATFORMS.map((platform, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={platform.id}
                onClick={() => setActiveTab(idx)}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'border-primary text-white bg-primary/10 shadow-[0_0_15px_rgba(0,150,166,0.15)]' 
                    : 'border-white/5 text-[var(--color-muted)] bg-white/5 hover:border-white/10 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePlatformTab"
                    className="absolute inset-0 rounded-xl border border-primary-glow pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon icon={platform.icon} className={`text-lg ${isActive ? 'text-primary-glow' : ''}`} />
                {platform.name}
              </button>
            );
          })}
        </div>

        {/* Content Container */}
        <div className="glass-panel rounded-2xl p-6 md:p-12 overflow-hidden shadow-2xl relative min-h-[500px] flex items-center">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 filter blur-3xl rounded-full -z-10 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              
              {/* Left Column: Feature List */}
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary-glow rounded-full text-xs font-semibold uppercase tracking-widest border border-primary/30">
                  {current.badge}
                </span>
                
                <div className="flex items-center gap-3">
                  <Icon icon={current.icon} className="text-4xl text-primary-glow" />
                  <h3 className="text-3xl font-extrabold text-white tracking-tight">
                    {current.name}
                  </h3>
                </div>

                <p className="text-xs text-[var(--color-muted)] font-mono tracking-wider uppercase">
                  REQUIREMENT: {current.specs}
                </p>

                <ul className="space-y-3.5 pt-2">
                  {current.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-[var(--color-muted)] text-sm md:text-base leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5 shrink-0">
                        <Icon icon="mdi:check" className="text-xs text-primary-glow" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6">
                  <a 
                    href={current.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-magnetic btn-primary inline-flex items-center gap-2 shine-sweep"
                  >
                    <Icon icon="mdi:download" className="text-lg" />
                    Download client APK / Executable
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Mockup */}
              <div className="lg:col-span-6 w-full">
                <div className="relative group w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                  {/* Subtle ambient light back-glow */}
                  <div className="absolute -inset-4 bg-primary/15 rounded-xl filter blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Outer Frame */}
                  <div className="relative h-full w-full bg-[#050b0e] border border-white/10 rounded-xl p-2.5 overflow-hidden">
                    {/* Screen glare reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-20" />
                    
                    {/* Image display */}
                    <img 
                      src={current.screenshot} 
                      alt={current.name}
                      className="w-full h-full object-cover rounded-lg filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                    />
                    
                    {/* TV Remote Focus Box corner indicator simulation */}
                    <div className="absolute inset-4 border border-primary-glow/60 rounded pointer-events-none group-hover:scale-[0.98] transition-transform duration-500">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary-glow" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary-glow" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary-glow" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary-glow" />
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};