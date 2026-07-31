import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Is it legal and safe?",
    answer: "Yes. AnimeTV doesn't host, upload, or store any video. It just finds public streams from other sites for you. Use a VPN if your country blocks those sites."
  },
  {
    question: "How do I sync my AniList or MAL?",
    answer: "Open the app, go to Settings, pick Trackers, and tap Connect. Sign in once. Your progress updates from there."
  },
  {
    question: "Will it run on my TV box or Firestick?",
    answer: "Yes. Android TV, Google TV, and Fire TV all work. Download the APK with the 'Downloader' app and install it."
  },
  {
    question: "Can I change subtitles or use a different video player?",
    answer: "Yes. You can load .SRT or .VTT subtitle files, switch audio tracks, and pick an external player from the settings."
  }
];

export const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'var(--color-bg-end)' }}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-4xl mx-auto px-4 relative z-10">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">
            Quick <span className="gradient-text">answers.</span>
          </h2>
          <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto">
            The stuff people ask before they install.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = activeIndex === index;
            const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            };

            return (
              <div
                key={index}
                onMouseMove={handleMouseMove}
                className="glass-card overflow-hidden spotlight-card"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left text-white font-bold text-lg hover:text-primary-glow transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span>{faq.question}</span>
                  <Icon 
                    icon={isOpen ? "mdi:minus" : "mdi:plus"} 
                    className={`text-xl text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-[var(--color-muted)] text-sm leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};