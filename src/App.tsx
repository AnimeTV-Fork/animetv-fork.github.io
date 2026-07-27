import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import Lenis from 'lenis';
import { ParticleBackground } from './components/ParticleBackground';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { PlatformShowcase } from './components/PlatformShowcase';
import { ActionCarousel } from './components/ActionCarousel';
import { Integrations } from './components/Integrations';
import { Community } from './components/Community';
import { Faq } from './components/Faq';

function App() {
  // Initialize smooth scroll wrapper
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white font-sans overflow-x-hidden">
      {/* Global Background Layer */}
      <ParticleBackground />

      {/* Main Content Layout */}
      <main className="relative z-10 w-full flex flex-col">
        <Hero />
        <BentoGrid />
        <PlatformShowcase />
        <ActionCarousel />
        <Integrations />
        <Community />
        <Faq />
      </main>

      {/* Download CTA Banner */}
      <section id="download" className="relative z-10 py-20 px-4 bg-gradient-to-b from-[#0a0612] to-black overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-primary/10 rounded-full filter blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 tracking-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">Stream?</span>
          </h2>
          <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
            Grab AnimeTV for your platform. Free, open source, no account required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://github.com/k-nacion/rc-store/releases/download/5.14.6/5.14.6.apk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 bg-gradient-to-r from-primary to-primary-glow text-white font-bold rounded-lg hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(168,85,247,0.3)] flex items-center gap-3"
            >
              <Icon icon="mdi:android" className="text-2xl" />
              Android / TV APK
            </a>
            <a 
              href="https://github.com/AnimeTV-Fork/AnimeTV/releases" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 glass-panel hover:bg-white/10 text-white font-bold rounded-lg hover:scale-105 active:scale-95 transition-transform border border-white/15 flex items-center gap-3"
            >
              <Icon icon="mdi:microsoft-windows" className="text-2xl" />
              Windows Releases
            </a>
            <a 
              href="https://github.com/AnimeTV-Fork/AnimeTV" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 glass-panel hover:bg-white/10 text-white font-bold rounded-lg hover:scale-105 active:scale-95 transition-transform border border-white/15 flex items-center gap-3"
            >
              <Icon icon="mdi:github" className="text-2xl" />
              Source Code
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-10 px-4 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/assets/ic_launcher-playstore.png" alt="AnimeTV Logo" className="w-8 h-8 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <span className="font-black tracking-tight text-lg">AnimeTV</span>
          </div>
          
          <p className="text-muted text-xs text-center font-mono uppercase tracking-wider">
            Open Source GPLv3 • Not affiliated with any content providers
          </p>

          <div className="flex gap-5 text-sm">
            <a href="https://github.com/AnimeTV-Fork/AnimeTV" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors flex items-center gap-1.5">
              <Icon icon="mdi:github" className="text-base" />
              GitHub
            </a>
            <a href="#download" className="text-primary-glow font-semibold hover:text-white transition-colors">
              Download
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;