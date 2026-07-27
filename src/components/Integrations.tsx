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
    desc: 'Dynamic GraphQL interactive synchronization.',
    features: ['OAuth 2.0 flow direct integration', 'Automatic list entry sync', 'GraphQL micro-queries optimization']
  },
  {
    name: 'MyAnimeList',
    icon: 'simple-icons:myanimelist',
    color: '#2e51a2',
    desc: 'Official REST API watch status updates.',
    features: ['Manga & Anime item checks', 'Watch status updates (Plan/Completed)', 'Offline sync buffer']
  },
  {
    name: 'Trakt',
    icon: 'simple-icons:trakt',
    color: '#ed1c24',
    desc: 'System-wide movie and show scrobbling.',
    features: ['Universal scrobbler status check', 'Watch history calendar mapping', 'Multi-device status sync']
  }
];

export const Integrations: React.FC = () => {
  return (
    <section className="py-24 bg-[#0d0717] relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">
            Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">Tracker Sync</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Sync your watchlist across databases instantly. Media tracking that respects your time.
          </p>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRACKERS.map((tracker) => (
            <motion.div
              key={tracker.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col justify-between"
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
                    <span className="text-xs font-mono text-muted uppercase tracking-wider">Sync API Support</span>
                  </div>
                </div>

                <p className="text-muted text-sm leading-relaxed mb-6">{tracker.desc}</p>

                {/* Sub Features list */}
                <ul className="space-y-3 font-mono text-xs text-muted">
                  {tracker.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs font-mono">
                <span className="text-muted">Status</span>
                <span className="text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  ONLINE
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};