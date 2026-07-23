import React from 'react';
import { motion } from 'motion/react';
import { HERO_IMAGE } from '../data/restaurantData';
import { Calendar, Sparkles, Star, ChevronDown, Clock, MapPin, Wine } from 'lucide-react';
import { playUiChime } from '../utils/audioSynth';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenSommelier: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onOpenSommelier }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-8 overflow-hidden bg-[#0b0b0d]">
      {/* Background Hero Image with Motion Parallax Scale & Ambient Lighting Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          src={HERO_IMAGE}
          alt="Aurelia Restaurant Ambiance"
          className="w-full h-full object-cover object-center filter brightness-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-[#0b0b0d]/50 to-[#0b0b0d]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0b0b0d]/30 to-[#0b0b0d]" />
        {/* Subtle Ambient Light Glow Accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#c5a880]/10 blur-[120px] pointer-events-none rounded-full" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto pt-12 pb-16 text-center flex flex-col items-center">
        {/* Michelin Badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-card border border-[#c5a880]/30 shadow-xl mb-8"
        >
          <div className="flex items-center gap-1 text-[#c5a880]">
            <Star className="w-3.5 h-3.5 fill-[#c5a880]" />
            <Star className="w-3.5 h-3.5 fill-[#c5a880]" />
            <Star className="w-3.5 h-3.5 fill-[#c5a880]" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#e0d6c8] font-semibold">
            3 Michelin Stars • 2026 Guide
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#f5ebd9] max-w-5xl leading-[0.95] mb-6 drop-shadow-2xl"
        >
          Culinary Artistry <br />
          <span className="italic font-normal gold-gradient-text">Meets Timeless</span> Elegance
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-base sm:text-lg text-[#b8ab99] font-light leading-relaxed mb-10 tracking-wide"
        >
          An exquisite haute cuisine destination by Executive Chef Julien Vance. Indulge in hyper-seasonal tasting journeys paired with rare subterranean cellars in an atmosphere of award-winning sophistication.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => {
              playUiChime('gold');
              onOpenReservation();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold text-[#0b0b0d] gold-gradient-bg rounded-xl hover:scale-[1.03] transition-all shadow-2xl shadow-[#c5a880]/25 gold-border-glow cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Reserve Your Experience
          </button>

          <a
            href="#menu"
            onClick={() => playUiChime('mid')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium text-[#f5ebd9] glass-card rounded-xl hover:border-[#c5a880] hover:text-[#c5a880] transition-all cursor-pointer"
          >
            View Tasting Menu
          </a>

          <button
            onClick={() => {
              playUiChime('high');
              onOpenSommelier();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 text-xs uppercase tracking-[0.2em] font-medium text-[#c5a880] glass-card rounded-xl hover:bg-[#1a1714] border border-[#c5a880]/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#c5a880] animate-pulse" />
            Ask AI Sommelier
          </button>
        </motion.div>
      </div>

      {/* Bottom Information Ticker Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="glass-card rounded-2xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#a89b88] shadow-2xl">
          <div className="flex items-center gap-3 justify-center md:justify-start border-b md:border-b-0 md:border-r border-[#262018] pb-3 md:pb-0">
            <Clock className="w-4 h-4 text-[#c5a880] shrink-0" />
            <div>
              <p className="font-semibold text-[#f5ebd9] uppercase tracking-wider">Operating Hours</p>
              <p className="text-[11px] text-[#8e8272]">Dinner: Tue – Sun | 17:30 – 23:00</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center border-b md:border-b-0 md:border-r border-[#262018] pb-3 md:pb-0">
            <MapPin className="w-4 h-4 text-[#c5a880] shrink-0" />
            <div>
              <p className="font-semibold text-[#f5ebd9] uppercase tracking-wider">Prime Location</p>
              <p className="text-[11px] text-[#8e8272]">450 Grand Avenue, Manhattan, NY</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-end">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <p className="font-semibold text-[#f5ebd9] uppercase tracking-wider">Tonight's Availability</p>
              <p className="text-[11px] text-[#8e8272]">3 Prime Tables Remaining for Dinner</p>
            </div>
          </div>
        </div>

        {/* Down Arrow */}
        <div className="flex justify-center mt-6">
          <a
            href="#story"
            onClick={() => playUiChime('low')}
            className="text-[#8e8272] hover:text-[#c5a880] transition-colors p-2.5 rounded-full glass-card hover:border-[#c5a880]"
            aria-label="Scroll to story section"
          >
            <ChevronDown className="w-5 h-5 animate-bounce text-[#c5a880]" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
