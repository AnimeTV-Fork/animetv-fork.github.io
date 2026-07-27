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
  { id: 1, title: "Frieren: Beyond Journey's End", category: "Fantasy • Adventure", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "Demon Slayer: Hashira Training", category: "Action • Fantasy", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400&auto=format&fit=crop" },
  { id: 3, title: "Kaiju No. 8", category: "Sci-Fi • Action", image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=400&auto=format&fit=crop" },
  { id: 4, title: "Solo Leveling", category: "Action • Fantasy", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop" },
  { id: 5, title: "Jujutsu Kaisen", category: "Dark Fantasy • Action", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop" },
  { id: 6, title: "Chainsaw Man", category: "Dark Fantasy • Gore", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400&auto=format&fit=crop" }
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
                rotate: 15,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              onSlideChange={(swiper) => setFocusedIndex(swiper.activeIndex)}
              navigation={true}
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 1.5, spaceBetween: 20 },
                640: { slidesPerView: 2.5, spaceBetween: 30 },
                1024: { slidesPerView: 3.5, spaceBetween: 40 }
              }}
              className="py-10"
            >
              {CAROUSEL_ITEMS.map((item, idx) => {
                const isFocused = idx === focusedIndex;
                return (
                  <SwiperSlide key={item.id} className="max-w-[240px]">
                    <div className="relative group rounded-xl overflow-hidden aspect-[2/3] bg-cover bg-center transition-all duration-300">
                      
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