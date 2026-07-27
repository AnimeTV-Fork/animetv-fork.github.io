import React from 'react';
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className={`glass-panel p-6 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-[var(--color-primary)]/40 hover:shadow-[0_0_30px_var(--glass-glow-shadow)] flex flex-col justify-between dpad-ring ${className}`}
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

export const BentoGrid: React.FC = () => {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative">
      {/* Ambient orb */}
      <div className="ambient-orb w-[500px] h-[500px] bg-[var(--color-primary)] top-[20%] right-[-10%]" style={{ opacity: 0.06 }} />
      
      <div className="text-center mb-16">
        <span className="badge-glow mb-4 inline-flex">Features</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase mb-4">
          Built for <span className="gradient-text">Power Users</span>
        </h2>
        <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto">
          No trackers, no redirects, no malware. Pure native features engineered for the ultimate streaming workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Multi-source Scraping (Large) — featured card with animated border */}
        <FeatureCard
          title="Headless Scraping & Mirror Bypass"
          description="Directly resolves and decodes video URLs (HLS .m3u8, MP4) from Miruro, Anikoto, Animepahe, and AnimeFlix using background sandboxed page parsing. Auto refresh-rate matching matches video frames to display Hz."
          icon="mdi:database-search-outline"
          className="md:col-span-2 gradient-border shine-sweep"
        >
          {/* Micro animation: active scraper status simulator */}
          <div className="flex flex-col gap-2 p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-xs text-primary-glow">
            <div className="flex justify-between items-center">
              <span className="text-muted">[Miruro.to] resolving...</span>
              <span className="text-green-400">SUCCESS</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                className="bg-primary h-full"
                initial={{ width: "10%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="text-[10px] text-muted truncate">
              URL: https://content.delivery/hls/stream_1080p.m3u8
            </div>
          </div>
        </FeatureCard>

        {/* Card 2: D-pad Android TV (Regular) */}
        <FeatureCard
          title="10-Foot UI Focus Engine"
          description="Built specifically for TV setups. Fully navigate via hardware D-pads or controllers. Focus ring brackets snap seamlessly between nodes."
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
          title="DNS-over-HTTPS (DoH)"
          description="Bypass ISP blocks and regional censors automatically. Integrated secure DNS resolving keeps your source streams loaded no matter the region."
          icon="mdi:dns-outline"
        />

        {/* Card 4: Tracker Sync (Large) */}
        <FeatureCard
          title="Deep Tracker Sync"
          description="Automatic OAuth progress mapping. Watch an episode on TV; it syncs instantly to AniList, MyAnimeList, and Trakt. Dynamic mapping matches source episodes with AniList database entries."
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
          title="ExoPlayer & Gestures"
          description="Native ExoPlayer/Media3 integration handles PIP, media session controls, audio focus interruptions, and swipe-to-seek gesture control overlays."
          icon="mdi:play-circle-outline"
        />
      </div>
    </section>
  );
};