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

const ANIME_POSTERS = [
  "assets/Attack_On_Titan.webp",
  "assets/Black_Clover_Season_2.webp",
  "assets/Demon_Slayer.webp",
  "assets/Jujutsu_Kaisen.webp",
  "assets/Mushoku_Tensei.webp",
  "assets/My_Hero_Academia.webp",
  "assets/One_Piece.webp"
];

const CAROUSEL_ITEMS: MockItem[] = [
  { id: 1, title: "Home", category: "Your starting screen", image: "assets/Home_Page.webp" },
  { id: 2, title: "Browse", category: "Trending and new shows", image: "assets/Home_Lists.webp" },
  { id: 3, title: "Sources", category: "Pick where the video streams from", image: "assets/Source_Selector.webp" },
  { id: 4, title: "Watchlist", category: "Your saved shows", image: "assets/My_List.webp" },
  { id: 5, title: "Schedule", category: "What airs this week", image: "assets/Airing_Schedule.webp" },
  { id: 6, title: "Settings", category: "Filters and subtitles", image: "assets/Settings_Top.webp" }
];

export const ActionCarousel: React.FC = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  // Global window listener for keyboard interaction so it works immediately upon scroll
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Avoid intercepting if user is in input/textarea/select
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.getAttribute('contenteditable') === 'true')) {
        return;
      }

      if (['ArrowRight', 'd', 'D'].includes(e.key)) {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = (prev + 1) % CAROUSEL_ITEMS.length;
          swiperInstance?.slideTo(next);
          return next;
        });
      } else if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const prevIdx = (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
          swiperInstance?.slideTo(prevIdx);
          return prevIdx;
        });
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [swiperInstance]);

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'var(--color-bg-start)' }}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">
            Press the arrows. <span className="gradient-text">Move around the app.</span>
          </h2>
          <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto">
            Use the left and right arrow keys on your keyboard. It works just like a TV remote.
          </p>
        </div>

        {/* Carousel + D-pad Simulator Frame */}
        <div className="relative max-w-4xl mx-auto focus:outline-none">
          {/* Simulated TV Frame */}
          <div className="relative bg-[#11091d] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">

            {/* TV Statusbar */}
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4 text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                <span>Player: ready</span>
              </div>
              <div className="flex gap-4">
                <span>Filters: on</span>
                <span>Subtitles: all languages</span>
              </div>
            </div>

            {/* Swiper wrapper */}
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              onSwiper={setSwiperInstance}
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
                        alt={`AnimeTV ${item.title} Screen`}
                        loading="lazy"
                        width="480"
                        height="270"
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

            {/* Interactive Remote D-Pad */}
            <div className="flex justify-center gap-4 mt-6">
              <div className="flex items-center gap-3 bg-black/40 rounded-full border border-white/5 p-1.5 px-4 shadow-inner">
                <button
                  onClick={() => swiperInstance?.slidePrev()}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/20 text-white flex items-center justify-center transition-all active:scale-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                  aria-label="Previous slide"
                >
                  <Icon icon="mdi:chevron-left" className="text-xl" />
                </button>
                <span className="text-[10px] text-muted font-mono uppercase tracking-wider select-none">App Remote</span>
                <button
                  onClick={() => swiperInstance?.slideNext()}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/20 text-white flex items-center justify-center transition-all active:scale-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                  aria-label="Next slide"
                >
                  <Icon icon="mdi:chevron-right" className="text-xl" />
                </button>
              </div>
            </div>

            {/* Keyboard Focus Help Cue */}
            <div className="flex justify-center items-center gap-2 mt-4 text-[10px] text-[var(--color-muted)] font-mono uppercase">
              <Icon icon="mdi:keyboard" className="text-base" />
              <span>Tip: arrow keys move the focus. Press Enter to open.</span>
            </div>
          </div>
        </div>

        {/* Horizontal Poster Rail */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--color-muted)] font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Trending right now
            </span>
            <span className="text-xs text-[var(--color-muted)] opacity-60">Updated every day</span>
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={'auto'}
            grabCursor={true}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 2.2 },
              480: { slidesPerView: 3.2 },
              768: { slidesPerView: 4.5 },
              1024: { slidesPerView: 6 }
            }}
            className="pb-4"
          >
            {ANIME_POSTERS.map((poster, index) => {
              const titles = [
                "Attack on Titan",
                "Black Clover",
                "Demon Slayer",
                "Jujutsu Kaisen",
                "Mushoku Tensei",
                "My Hero Academia",
                "One Piece"
              ];
              const title = titles[index % titles.length];
              return (
                <SwiperSlide key={index} className="max-w-[160px]">
                  <div className="relative group rounded-lg overflow-hidden aspect-[2/3] bg-black border border-white/5 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                    <img
                      src={poster}
                      alt={title}
                      className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                      <span className="text-[10px] font-mono text-primary-glow font-bold uppercase">Sub | Dub</span>
                      <h5 className="text-xs font-bold text-white leading-tight line-clamp-2">{title}</h5>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

      </div>
    </section>
  );
};
