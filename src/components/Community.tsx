import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

export const Community: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0612] relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left panel: text details */}
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary-glow rounded-full text-xs font-semibold uppercase tracking-widest border border-primary/30">
              Community Driven
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight leading-none">
              Open Source. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">No Big Brother.</span>
            </h2>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              AnimeTV is actively developed under the GPLv3 license. Originally created by <strong className="text-white">Amarullz</strong>, the codebase is currently maintained by <strong className="text-white">jitendhull</strong>, <strong className="text-white">voltorb</strong>, and <strong className="text-white">tay</strong> with hundreds of community contributors.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-3xl font-black text-white glow-text">10k+</span>
                <p className="text-xs text-muted font-mono uppercase tracking-wider mt-1">GitHub Stars</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-3xl font-black text-white glow-text">500+</span>
                <p className="text-xs text-muted font-mono uppercase tracking-wider mt-1">Commits/Year</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://github.com/AnimeTV-Fork/website"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-primary to-primary-glow text-white font-bold rounded-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Icon icon="mdi:github" className="text-xl" />
                Join the Fork
              </a>
            </div>
          </div>

          {/* Right panel: Static activity visual tracker mimicking Git commits */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl filter blur-xl opacity-30" />
            <div className="relative glass-panel p-6 rounded-2xl border border-white/5">
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
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.005 }}
                      className={`aspect-square rounded-[2px] ${opacity}`}
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
          </div>

        </div>
      </div>
    </section>
  );
};