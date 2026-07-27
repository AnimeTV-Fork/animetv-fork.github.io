import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface MockItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

const CAROUSEL_ITEMS: MockItem[] = [
  { id: 1, title: "Main Dashboard", category: "Netflix-style 10-foot UI", image: "/assets/Home_Page.png" },
  { id: 2, title: "Browsing & Rails", category: "Trending Recommendations", image: "/assets/Home_Lists.png" },
  { id: 3, title: "Headless Scraper Selectors", category: "Independent Multi-Sources", image: "/assets/Source_Selector.png" },
  { id: 4, title: "AniList & MAL Tracking", category: "Watchlist OAuth Sync", image: "/assets/My_List.png" },
  { id: 5, title: "Weekly Releases", category: "Airing Schedule", image: "/assets/Airing_Schedule.png" },
  { id: 6, title: "DNS-over-HTTPS Settings", category: "Bypass Filters & Bans", image: "/assets/Settings_Top.png" }
];

export const ActionCarousel: React.FC = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  // D-Pad simulator keyboard handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
      setFocusedIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
      setFocusedIndex((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
    }
  };

  return (
    <section className="py-24 bg-[#0a0612] relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">
            See it in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow animate-pulse">Action</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Experience the remote control focus-ring mapping engine below. Use your <strong className="text-white">keyboard Left/Right arrows</strong> or click buttons to navigate!
          </p>
        </div>

        {/* Carousel + D-pad Simulator Frame */}
        <div 
          className="relative max-w-4xl mx-auto focus:outline-none"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {/* Simulated TV Frame */}
          <div className="relative bg-[#11091d] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
            
            {/* TV Statusbar */}
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4 text-xs font-mono text-muted uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                <span>ExoPlayer Engine: READY</span>
              </div>
              <div className="flex gap-4">
                <span>DOH: ACTIVE</span>
                <span>SUB: EN/ES/FR</span>
              </div>
            </div>

            {/* Swiper wrapper */}
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 10,
                stretch: 0,
                depth: 80,
                modifier: 1,
                slideShadows: false,
              }}
              onSlideChange={(swiper) => setFocusedIndex(swiper.activeIndex)}
              navigation={true}
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 1.1, spaceBetween: 16 },
                640: { slidesPerView: 1.4, spaceBetween: 24 },
                1024: { slidesPerView: 1.6, spaceBetween: 32 }
              }}
              className="py-10"
            >
              {CAROUSEL_ITEMS.map((item, idx) => {
                const isFocused = idx === focusedIndex;
                return (
                  <SwiperSlide key={item.id} className="max-w-[480px]">
                    <div className="relative group rounded-xl overflow-hidden aspect-video bg-cover bg-center transition-all duration-300">
                      
                      {/* Image */}
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover rounded-xl"
                      />

                      {/* Info Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[10px] uppercase font-bold text-primary-glow">{item.category}</span>
                        <h4 className="text-sm font-extrabold text-white line-clamp-1">{item.title}</h4>
                      </div>

                      {/* TV Highlight Bracket / Focus Ring */}
                      {isFocused && (
                        <motion.div 
                          layoutId="focusRing"
                          className="absolute inset-0 border-4 border-primary-glow rounded-xl z-20 pointer-events-none shadow-[0_0_25px_rgba(217,70,239,0.5)]"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <div className="absolute -top-[4px] -left-[4px] w-4 h-4 border-t-4 border-l-4 border-primary" />
                          <div className="absolute -top-[4px] -right-[4px] w-4 h-4 border-t-4 border-r-4 border-primary" />
                          <div className="absolute -bottom-[4px] -left-[4px] w-4 h-4 border-b-4 border-l-4 border-primary" />
                          <div className="absolute -bottom-[4px] -right-[4px] w-4 h-4 border-b-4 border-r-4 border-primary" />
                        </motion.div>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Keyboard Focus Help Cue */}
            <div className="flex justify-center items-center gap-2 mt-6 text-xs text-muted font-mono uppercase">
              <Icon icon="mdi:keyboard" className="text-lg" />
              <span>Simulating D-Pad input. Press Left/Right Arrows on keyboard.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};