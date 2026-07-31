import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface Tracker {
  name: string;
  icon: string;
  color: string;
  desc: string;
  features: string[];
}

const TRACKERS: Tracker[] = [
  {
    name: 'AniList',
    icon: 'simple-icons:anilist',
    color: '#3db4f2',
    desc: 'Connects straight to your AniList account.',
    features: ['One-tap sign in', 'Shows you watch update your list', 'Fast refresh as you finish episodes']
  },
  {
    name: 'MyAnimeList',
    icon: 'simple-icons:myanimelist',
    color: '#2e51a2',
    desc: 'Pushes your progress to your MAL account.',
    features: ['Anime and manga in one place', 'Status moves to "Watching" or "Completed"', 'Queues changes if you\'re offline']
  },
  {
    name: 'Trakt',
    icon: 'simple-icons:trakt',
    color: '#ed1c24',
    desc: 'Tracks shows and movies across all your apps.',
    features: ['Marks what you watch, everywhere', 'Calendar of your upcoming episodes', 'Syncs across phones, TVs, and PCs']
  }
];

export const Integrations: React.FC = () => {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'var(--color-bg-start)' }}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">
            Your watchlist, <span className="gradient-text">in sync.</span>
          </h2>
          <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto">
            Pick a tracker. We update it for you as you watch.
          </p>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRACKERS.map((tracker) => {
            const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            };

            return (
              <motion.div
                key={tracker.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                onMouseMove={handleMouseMove}
                className="glass-card p-8 flex flex-col justify-between spotlight-card"
              >
              <div>
                {/* Brand Logo & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center border border-white/10"
                    style={{ backgroundColor: `${tracker.color}15` }}
                  >
                    <Icon icon={tracker.icon} className="text-3xl" style={{ color: tracker.color }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">{tracker.name}</h3>
                  </div>
                </div>

                <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-6">{tracker.desc}</p>

                {/* Sub Features list */}
                <ul className="space-y-3 font-mono text-xs text-[var(--color-muted)]">
                  {tracker.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs font-mono">
                <span className="text-[var(--color-muted)]">Status</span>
                <span className="text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  ONLINE
                </span>
              </div>
            </motion.div>
          );})}
        </div>
      </div>
    </section>
  );
};