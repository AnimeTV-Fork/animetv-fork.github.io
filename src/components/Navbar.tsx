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
            className="flex items-center group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-lg p-1"
          >
            <img
              src="assets/logo.svg"
              alt="AnimeTV"
              className="h-10 md:h-12 w-auto drop-shadow-[0_0_8px_var(--color-primary)] group-hover:scale-105 transition-transform"
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="px-3.5 py-2 text-sm text-[var(--color-muted)] hover:text-white transition-colors rounded-lg hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
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
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-[var(--color-muted)] hover:text-white transition-colors rounded-lg hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Icon icon="mdi:github" className="text-base" />
              GitHub
            </a>
            <a
              href="https://discord.gg/ECazA5ZE6f"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-[var(--color-muted)] hover:text-white transition-colors rounded-lg hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Icon icon="ic:baseline-discord" className="text-base" />
              Discord
            </a>
            <a
              href="https://github.com/k-nacion/rc-store/releases/download/5.14.6/5.14.6.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic btn-primary text-sm px-4 py-2 focus-visible:ring-2 focus-visible:ring-primary-glow focus-visible:outline-none"
            >
              Download
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[var(--color-muted)] hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-lg"
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
                  className="px-4 py-3 text-left text-sm text-[var(--color-muted)] hover:text-white hover:bg-white/5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  {l.label}
                </button>
              ))}
              <hr className="border-white/10 my-2" />
              <div className="flex flex-col gap-1">
                <a
                  href="https://github.com/AnimeTV-Fork/AnimeTV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-[var(--color-muted)] hover:text-white hover:bg-white/5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <Icon icon="mdi:github" className="text-lg" />
                  GitHub
                </a>
                <a
                  href="https://discord.gg/ECazA5ZE6f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-[var(--color-muted)] hover:text-white hover:bg-white/5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <Icon icon="ic:baseline-discord" className="text-lg" />
                  Discord
                </a>
              </div>
              <hr className="border-white/10 my-2" />
              <a
                href="https://github.com/k-nacion/rc-store/releases/download/5.14.6/5.14.6.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-sm font-bold text-center bg-gradient-to-r from-primary to-primary-glow text-[var(--color-btn-primary-text)] rounded-lg focus-visible:ring-2 focus-visible:ring-primary-glow focus-visible:outline-none"
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