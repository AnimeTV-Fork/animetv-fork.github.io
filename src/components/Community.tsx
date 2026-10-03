import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

export const Community: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'var(--color-bg-start)' }}>
      {/* Section divider top */}
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left panel: text details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="badge-glow">Open source</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight leading-none">
              Built by fans. <br />
              <span className="gradient-text">Owned by you.</span>
            </h2>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              AnimeTV is free and open source under the GPLv3 license. Anyone can read the code, fix bugs, or suggest a feature. The project started with Amarullz. Today, jitendhull, voltorb, tay, and hundreds of others keep it moving.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-3xl font-black text-white glow-text">1,500+</span>
                <p className="text-xs text-muted font-mono uppercase tracking-wider mt-1">GitHub Stars</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-3xl font-black text-white glow-text">500+</span>
                <p className="text-xs text-muted font-mono uppercase tracking-wider mt-1">Updates a year</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://github.com/AnimeTV-Fork/AnimeTV"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic btn-primary shine-sweep focus-visible:ring-2 focus-visible:ring-primary-glow focus-visible:outline-none"
              >
                <Icon icon="mdi:github" className="text-xl" />
                Star us on GitHub
              </a>
              <a
                href="https://discord.gg/ECazA5ZE6f"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic btn-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <Icon icon="ic:baseline-discord" className="text-xl" />
                Chat on Discord
              </a>
            </div>
          </motion.div>

          {/* Right panel: Static activity visual tracker mimicking Git commits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="relative glass-panel p-6 rounded-2xl border border-white/5 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Icon icon="mdi:git-commit" className="text-primary" />
                  Code Contributions
                </span>
                <span className="text-xs font-mono text-muted uppercase">Updates Tracked</span>
              </div>

              {/* Grid block representing commit heat map */}
              <div className="grid grid-cols-7 gap-1.5 p-3 bg-black/40 rounded-xl border border-white/5">
                {Array.from({ length: 49 }).map((_, i) => {
                  const opacity = (i % 3 === 0) ? 'bg-primary' : (i % 5 === 0) ? 'bg-primary-glow' : (i % 2 === 0) ? 'bg-secondary' : 'bg-white/10';
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-[2px] transition-transform duration-200 hover:scale-125 ${opacity}`}
                    />
                  );
                })}
              </div>

              <div className="flex justify-between text-[10px] text-muted font-mono mt-4 uppercase">
                <span>Less Active</span>
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-secondary" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-primary" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-primary-glow" />
                </div>
                <span>Highly Active</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};