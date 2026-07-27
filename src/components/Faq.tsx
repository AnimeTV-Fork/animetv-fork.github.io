import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Is AnimeTV legal and safe to use?",
    answer: "AnimeTV is an open-source media player. It does not host, upload, or store any media. It operates as a scraping browser engine that resolves public third-party streams via dynamic layout analysis. We recommend using a VPN or DNS-over-HTTPS (DoH) where applicable."
  },
  {
    question: "How do I sync my AniList or MAL watch progress?",
    answer: "Go to settings on the application client, choose trackers, and click connect. Authorize using OAuth2. Your watch progress automatically syncs every time an episode matches the database mappings."
  },
  {
    question: "Can I run this on my Android TV box or Firestick?",
    answer: "Yes, AnimeTV is fully compatible with Android TV, Google TV, and Amazon Fire TV devices. Download the Android APK, transfer it to your TV box using an app like 'Downloader', and install it."
  },
  {
    question: "Does the app support external players or subtitles?",
    answer: "Yes. AnimeTV embeds ExoPlayer and Media3 with fully adjustable media options, including support for embedded subtitle rendering (WebVTT/SRT), audio track switching, auto refresh-rate matching, and external player options."
  }
];

export const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#0d0717] relative overflow-hidden border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">Questions</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Everything you need to know about the client configuration.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                className="glass-panel rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left text-white font-bold text-lg hover:text-primary-glow transition-colors focus:outline-none"
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
                      <div className="px-6 pb-6 pt-2 text-muted text-sm leading-relaxed border-t border-white/5">
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