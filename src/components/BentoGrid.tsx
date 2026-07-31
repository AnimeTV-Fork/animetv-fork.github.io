import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
  children?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, className = "", children }) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      onMouseMove={handleMouseMove}
      className={`glass-panel p-6 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-[var(--color-primary)]/40 hover:shadow-[0_0_30px_var(--glass-glow-shadow)] spotlight-card flex flex-col justify-between dpad-ring ${className}`}
    >
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon icon={icon} className="text-2xl text-primary-glow" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-white mb-2">{title}</h3>
        <p className="text-muted text-sm leading-relaxed">{description}</p>
      </div>

      {children && <div className="mt-6">{children}</div>}
    </motion.div>
  );
};

const ScraperConsole: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    'Initializing background sandbox...',
    '[Miruro] resolving manifest... SUCCESS',
  ]);

  useEffect(() => {
    const list = [
      '[Anikoto] bypassing Cloudflare challenge... SUCCESS',
      '[Animepahe] extracted stream: 1080p.m3u8',
      '[DoH] query routed via secure DNS-over-HTTPS',
      '[AniList] sync progress: Episode 10 -> WATCHING',
      '[Miruro] found 4 backup mirrors',
      '[AnimeFlix] decoding stream manifest... OK',
    ];
    let idx = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, list[idx]];
        if (next.length > 3) next.shift();
        return next;
      });
      idx = (idx + 1) % list.length;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-[10.5px] text-primary-glow min-h-[90px] justify-end">
      {logs.map((log, i) => (
        <div key={i} className="flex justify-between items-center transition-all duration-300">
          <span className={i === logs.length - 1 ? "text-primary-glow" : "text-muted"}>{log}</span>
          {log.includes('SUCCESS') || log.includes('OK') ? (
            <span className="text-green-400 font-bold shrink-0 ml-2">✓</span>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export const BentoGrid: React.FC = () => {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative">
      {/* Ambient orb */}
      <div className="ambient-orb w-[500px] h-[500px] bg-[var(--color-primary)] top-[20%] right-[-10%]" style={{ opacity: 0.06 }} />

      <div className="text-center mb-16">
        <span className="badge-glow mb-4 inline-flex">Features</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase mb-4">
          Everything you need. <span className="gradient-text">Nothing you don't.</span>
        </h2>
        <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto">
          No trackers. No ads. No "subscribe to keep watching."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1: Multi-source Scraping (Large) */}
        <FeatureCard
          title="Find shows from many sources"
          description="We pull from Miruro, Anikoto, Animepahe, AnimeFlix, and more. A show is rarely 'unavailable.'"
          icon="mdi:database-search-outline"
          className="md:col-span-2 gradient-border shine-sweep"
        >
          <ScraperConsole />
        </FeatureCard>

        {/* Card 2: D-pad Android TV (Regular) */}
        <FeatureCard
          title="Use your TV remote"
          description="The whole app works with the arrows on your remote. No mouse needed."
          icon="mdi:remote"
        >
          <div className="flex justify-center gap-2 py-4">
            <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-muted"><Icon icon="mdi:arrow-up" /></div>
            <div className="w-8 h-8 rounded bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-glow glow-text"><Icon icon="mdi:arrow-down" /></div>
            <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-muted"><Icon icon="mdi:arrow-left" /></div>
            <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-muted"><Icon icon="mdi:arrow-right" /></div>
          </div>
        </FeatureCard>

        {/* Card 3: DNS-over-HTTPS (Regular) */}
        <FeatureCard
          title="Bypass blocks and filters"
          description="The app routes around regional blocks so streams load."
          icon="mdi:dns-outline"
        />

        {/* Card 4: Tracker Sync (Large) */}
        <FeatureCard
          title="Track what you watch"
          description="Your progress syncs to AniList, MyAnimeList, and Trakt."
          icon="mdi:sync"
          className="md:col-span-2"
        >
          <div className="flex gap-4 items-center justify-around py-2 border-t border-white/5 pt-4">
            <div className="flex items-center gap-2">
              <Icon icon="simple-icons:anilist" className="text-2xl text-[#3db4f2]" />
              <span className="text-sm font-semibold text-white/90">AniList</span>
            </div>
            <Icon icon="mdi:swap-horizontal" className="text-xl text-muted animate-pulse" />
            <div className="flex items-center gap-2">
              <Icon icon="simple-icons:myanimelist" className="text-2xl text-[#2e51a2]" />
              <span className="text-sm font-semibold text-white/90">MAL</span>
            </div>
            <Icon icon="mdi:swap-horizontal" className="text-xl text-muted animate-pulse" />
            <div className="flex items-center gap-2">
              <Icon icon="simple-icons:trakt" className="text-2xl text-[#ed1c24]" />
              <span className="text-sm font-semibold text-white/90">Trakt</span>
            </div>
          </div>
        </FeatureCard>

        {/* Card 5: Gesture Player (Regular) */}
        <FeatureCard
          title="Swipe to skip ahead"
          description="Drag your finger on the screen to jump forward or back."
          icon="mdi:play-circle-outline"
        />
      </div>
    </section>
  );
};