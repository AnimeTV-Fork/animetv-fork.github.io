import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'Platforms', href: '#platforms' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'FAQ', href: '#faq' },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-primary/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group"
          >
            <img
              src="/assets/ic_launcher-playstore.png"
              alt="AnimeTV"
              className="w-8 h-8 drop-shadow-[0_0_8px_var(--color-primary)] group-hover:scale-110 transition-transform"
            />
            <span className="font-black text-lg tracking-tight hidden sm:inline">AnimeTV</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="px-3.5 py-2 text-sm text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/AnimeTV-Fork/AnimeTV"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <Icon icon="mdi:github" className="text-base" />
              GitHub
            </a>
            <a
              href="https://github.com/k-nacion/rc-store/releases/download/5.14.6/5.14.6.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-primary to-primary-glow text-white rounded-lg hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-primary/20"
            >
              Download
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <Icon icon={mobileOpen ? 'mdi:close' : 'mdi:menu'} className="text-2xl" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="px-4 py-3 text-left text-sm text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <hr className="border-white/10 my-2" />
              <a
                href="https://github.com/k-nacion/rc-store/releases/download/5.14.6/5.14.6.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-sm font-bold text-center bg-gradient-to-r from-primary to-primary-glow text-white rounded-lg"
              >
                Download APK
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}