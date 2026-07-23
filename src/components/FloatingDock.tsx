import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, Music, Calendar, Sparkles, ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { toggleAmbientSoundscape, isAmbientActive } from '../utils/audioSynth';

interface FloatingDockProps {
  onOpenReservation: () => void;
  onOpenSommelier: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  onOpenReservation,
  onOpenSommelier,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isPlayingAudio, setIsPlayingAudio] = useState(isAmbientActive());

  const handleToggleAudio = () => {
    const active = toggleAmbientSoundscape();
    setIsPlayingAudio(active);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6, type: 'spring', stiffness: 120 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-fit px-4 py-2.5 rounded-full glass-dock flex items-center gap-2 sm:gap-3 text-xs"
    >
      {/* Dark / Light Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-[#c5a880] hover:bg-[#c5a880]/15 transition-colors relative group"
        title={theme === 'dark' ? 'Switch to Ivory Light Theme' : 'Switch to Obsidian Dark Theme'}
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-[#c5a880]" />
        ) : (
          <Moon className="w-4 h-4 text-[#a4855a]" />
        )}
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[#12100d] text-[#f5ebd9] text-[10px] px-2.5 py-1 rounded border border-[#3d3326] whitespace-nowrap shadow-lg">
          {theme === 'dark' ? 'Light Ivory Mode' : 'Dark Obsidian Mode'}
        </span>
      </button>

      <div className="w-[1px] h-4 bg-[#2f281e]" />

      {/* Audio Ambient Soundscape Toggle */}
      <button
        onClick={handleToggleAudio}
        className={`p-2 rounded-full transition-colors relative group flex items-center gap-1.5 ${
          isPlayingAudio
            ? 'bg-[#c5a880] text-[#0b0b0d] font-bold shadow-md shadow-[#c5a880]/30 animate-pulse'
            : 'text-[#c2b7a7] hover:bg-[#c5a880]/15'
        }`}
        title="Toggle Ambient Lounge Soundscape"
      >
        <Music className="w-4 h-4" />
        <span className="hidden md:inline text-[10px] uppercase tracking-wider font-semibold">
          {isPlayingAudio ? 'Soundscape On' : 'Lounge Audio'}
        </span>
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[#12100d] text-[#f5ebd9] text-[10px] px-2.5 py-1 rounded border border-[#3d3326] whitespace-nowrap shadow-lg">
          {isPlayingAudio ? 'Mute Ambient Audio' : 'Play Fine Dining Ambience'}
        </span>
      </button>

      <div className="w-[1px] h-4 bg-[#2f281e]" />

      {/* AI Sommelier Button */}
      <button
        onClick={onOpenSommelier}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e1a14] border border-[#3d3326] text-[#c5a880] hover:border-[#c5a880] transition-all font-medium text-[11px] uppercase tracking-wider"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
        <span className="hidden sm:inline">AI Sommelier</span>
      </button>

      {/* Reserve Table Button */}
      <button
        onClick={onOpenReservation}
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full gold-gradient-bg text-[#0b0b0d] font-bold text-[11px] uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Reserve</span>
      </button>

      <div className="w-[1px] h-4 bg-[#2f281e]" />

      {/* Scroll To Top */}
      <button
        onClick={scrollToTop}
        className="p-2 rounded-full text-[#c2b7a7] hover:text-[#f5ebd9] hover:bg-[#c5a880]/15 transition-colors"
        title="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
