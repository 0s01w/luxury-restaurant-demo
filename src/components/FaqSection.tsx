import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS } from '../data/restaurantData';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { playUiChime } from '../utils/audioSynth';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="faq" className="py-24 bg-[#0e0d10] text-[#e8e4df] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a880] font-semibold">
            Concierge Information
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-[#f5ebd9] mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#a89b88] font-light text-base">
            Everything you need to know prior to arriving at Aurelia.
          </p>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-[#8e8272] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reservation, dress code, or dietary policies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#12100d] border border-[#262019] rounded-xl pl-11 pr-4 py-3.5 text-xs text-[#f5ebd9] placeholder-[#6e6354] focus:outline-none focus:border-[#c5a880] glass-card"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-card border border-[#231e17] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#3d3326]"
              >
                <button
                  onClick={() => {
                    playUiChime('low');
                    setOpenId(isOpen ? null : faq.id);
                  }}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg text-[#f5ebd9] hover:text-[#c5a880] transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#c5a880] shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8e8272] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#c5a880]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 text-xs text-[#a89b88] font-light leading-relaxed border-t border-[#1a1713] pt-3 overflow-hidden"
                    >
                      {faq.answer}
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
