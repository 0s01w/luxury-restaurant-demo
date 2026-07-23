import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, UtensilsCrossed, Sparkles } from 'lucide-react';
import { playUiChime } from '../utils/audioSynth';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenSommelier: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation, onOpenSommelier }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Story', href: '#story' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Tasting Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-dock py-3 shadow-2xl border-b border-[#2a2620]'
          : 'bg-gradient-to-b from-[#0b0b0d]/90 via-[#0b0b0d]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d8bc93] via-[#c5a880] to-[#9e7f55] p-[1px] flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#0b0b0d] rounded-full flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-[#c5a880]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-[#f5ebd9] group-hover:text-[#c5a880] transition-colors">
              AURELIA
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#a49885]">
              Haute Cuisine
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => playUiChime('low')}
              className="text-xs uppercase tracking-[0.2em] text-[#c2b7a7] hover:text-[#c5a880] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a880] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => {
              playUiChime('high');
              onOpenSommelier();
            }}
            className="flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-wider font-medium text-[#c5a880] glass-card border border-[#3d3326] rounded-xl hover:bg-[#28221a] hover:border-[#c5a880] transition-all gold-border-glow cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880] animate-pulse" />
            AI Sommelier
          </button>

          <button
            onClick={() => {
              playUiChime('gold');
              onOpenReservation();
            }}
            className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-semibold text-[#0b0b0d] gold-gradient-bg rounded-xl hover:scale-[1.03] transition-all shadow-lg shadow-[#c5a880]/10 hover:shadow-[#c5a880]/20 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            Reserve Table
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={() => {
              playUiChime('gold');
              onOpenReservation();
            }}
            className="sm:hidden px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold text-[#0b0b0d] gold-gradient-bg rounded-lg cursor-pointer"
          >
            Book
          </button>

          <button
            onClick={() => {
              playUiChime('mid');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 text-[#c2b7a7] hover:text-[#c5a880] transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden glass-dock border-b border-[#2a2620] px-6 py-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    playUiChime('low');
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm uppercase tracking-[0.2em] text-[#c2b7a7] hover:text-[#c5a880] transition-colors py-1 border-b border-[#1c1915]"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    playUiChime('high');
                    setMobileMenuOpen(false);
                    onOpenSommelier();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-widest font-medium text-[#c5a880] glass-card border border-[#3d3326] rounded-xl cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#c5a880]" />
                  AI Sommelier Assistant
                </button>

                <button
                  onClick={() => {
                    playUiChime('gold');
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-widest font-semibold text-[#0b0b0d] gold-gradient-bg rounded-xl cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Reserve Table
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
