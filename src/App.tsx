import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Lenis from 'lenis';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { PlatformShowcase } from './components/PlatformShowcase';
import { ActionCarousel } from './components/ActionCarousel';
import { Integrations } from './components/Integrations';
import { Community } from './components/Community';
import { Faq } from './components/Faq';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 p-3 bg-primary/80 backdrop-blur-md text-white rounded-full shadow-lg shadow-primary/30 hover:bg-primary hover:scale-110 active:scale-95 transition-all"
      aria-label="Scroll to top"
    >
      <Icon icon="mdi:chevron-up" className="text-xl" />
    </button>
  );
}

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
      {/* Sticky Navbar */}
      <Navbar />

      {/* Global Background Layer */}
      <ParticleBackground theme="ocean" />

      {/* Main Content Layout */}
      <main className="relative z-10 w-full flex flex-col">
        <Hero />
        <section id="features">
          <BentoGrid />
        </section>
        <section id="platforms">
          <PlatformShowcase />
        </section>
        <ActionCarousel />
        <section id="integrations">
          <Integrations />
        </section>
        <Community />
        <section id="faq">
          <Faq />
        </section>
      </main>

      {/* Download CTA Banner */}
      <section id="download" className="relative z-10 py-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(to bottom, var(--color-bg-start), #000)' }}>
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="ambient-orb w-[600px] h-[600px] bg-[var(--color-primary)] top-[30%] left-[50%] -translate-x-1/2" style={{ opacity: 0.08 }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="badge-glow mb-4 inline-flex">Download</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 tracking-tight">
            Ready to <span className="gradient-text">Stream?</span>
          </h2>
          <p className="text-[var(--color-muted)] text-lg mb-10 max-w-xl mx-auto">
            Grab AnimeTV for your platform. Free, open source, no account required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/k-nacion/rc-store/releases/download/5.14.6/5.14.6.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic btn-primary shine-sweep text-base px-8 py-4"
            >
              <Icon icon="mdi:android" className="text-2xl" />
              Android / TV APK
            </a>
            <a
              href="https://github.com/AnimeTV-Fork/AnimeTV/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic btn-secondary text-base px-8 py-4"
            >
              <Icon icon="mdi:microsoft-windows" className="text-2xl" />
              Windows Releases
            </a>
            <a
              href="https://github.com/AnimeTV-Fork/AnimeTV"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic btn-secondary text-base px-8 py-4"
            >
              <Icon icon="mdi:github" className="text-2xl" />
              Source Code
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-10 px-4" style={{ background: 'var(--color-bg-start)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <img src="assets/logo.svg" alt="AnimeTV Logo" className="h-10 md:h-12 w-auto filter drop-shadow-[0_0_10px_var(--color-primary)]" />
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

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}

export default App;