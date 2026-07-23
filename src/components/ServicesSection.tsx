import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_EXPERIENCES } from '../data/restaurantData';
import { ServiceExperience } from '../types';
import { Utensils, Wine, Sun, Sparkles, Users, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { playUiChime } from '../utils/audioSynth';

interface ServicesSectionProps {
  onOpenReservationWithExperience: (experienceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenReservationWithExperience }) => {
  const [selectedExperience, setSelectedExperience] = useState<ServiceExperience | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#c5a880]" />;
      case 'Wine':
        return <Wine className="w-5 h-5 text-[#c5a880]" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-[#c5a880]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#c5a880]" />;
    }
  };

  return (
    <section id="experiences" className="py-24 bg-[#0b0b0d] text-[#e8e4df] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a880] font-semibold">
            Bespoke Dining Salons
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#f5ebd9] mt-2 mb-4">
            Curated Culinary Experiences
          </h2>
          <p className="text-[#a89b88] font-light text-base">
            From intimate subterranean wine cellars to front-row kitchen views, choose your sanctuary for the evening.
          </p>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              className="group relative rounded-2xl glass-card border border-[#231e17] overflow-hidden glass-card-hover flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12100d] via-[#12100d]/40 to-transparent" />

                {/* Badge Icon */}
                <div className="absolute top-4 left-4 p-3 rounded-full glass-card border border-[#3d3326]">
                  {getIcon(exp.iconName)}
                </div>

                {/* Capacity Tag */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full glass-card border border-[#3d3326] text-[11px] text-[#e0d6c8]">
                  <Users className="w-3 h-3 text-[#c5a880]" />
                  {exp.capacity}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-bold block mb-1">
                    {exp.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl text-[#f5ebd9] font-medium mb-2 group-hover:text-[#c5a880] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-[#a89b88] leading-relaxed line-clamp-3 font-light">
                    {exp.description}
                  </p>
                </div>

                {/* Price & Features Preview */}
                <div className="pt-4 border-t border-[#1f1b15] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-[#8e8272] block">Pricing</span>
                    <span className="text-sm font-semibold text-[#f5ebd9]">{exp.priceRange}</span>
                  </div>

                  <button
                    onClick={() => {
                      playUiChime('mid');
                      setSelectedExperience(exp);
                    }}
                    className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#c5a880] hover:text-[#f5ebd9] font-medium transition-colors cursor-pointer"
                  >
                    Explore Salon <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience Details Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0b0d]/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl glass-card border border-[#3d3326] rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8"
            >
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 right-4 p-2 text-[#8e8272] hover:text-[#f5ebd9] rounded-full bg-[#1e1a15] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-bold">
                  {selectedExperience.subtitle}
                </span>
              </div>

              <h3 className="font-serif text-3xl text-[#f5ebd9] font-medium mb-4">
                {selectedExperience.title}
              </h3>

              <div className="rounded-xl overflow-hidden mb-6 h-56 border border-[#2a241c]">
                <img
                  src={selectedExperience.image}
                  alt={selectedExperience.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-sm text-[#b8ab99] leading-relaxed font-light mb-6">
                {selectedExperience.description}
              </p>

              <div className="space-y-2 mb-6 bg-[#1a1713]/80 p-4 rounded-xl border border-[#262018]">
                <p className="text-xs font-semibold text-[#f5ebd9] uppercase tracking-wider mb-2">
                  Included Highlights:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedExperience.features.map((ft, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#a89b88]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                      <span>{ft}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#262018]">
                <div>
                  <span className="text-[10px] uppercase text-[#8e8272] block">Capacity & Rates</span>
                  <span className="text-sm font-semibold text-[#f5ebd9]">
                    {selectedExperience.capacity} • {selectedExperience.priceRange}
                  </span>
                </div>

                <button
                  onClick={() => {
                    playUiChime('gold');
                    const title = selectedExperience.title;
                    setSelectedExperience(null);
                    onOpenReservationWithExperience(title);
                  }}
                  className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-widest font-semibold text-[#0b0b0d] gold-gradient-bg rounded-xl hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Book This Salon
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
