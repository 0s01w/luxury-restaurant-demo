import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem, MenuCategory } from '../types';
import { Sparkles, Search, Info, Filter, UtensilsCrossed, Wine, X } from 'lucide-react';
import { playUiChime } from '../utils/audioSynth';

interface InteractiveMenuProps {
  onOpenSommelierForDish: (dishName: string) => void;
}

export const InteractiveMenu: React.FC<InteractiveMenuProps> = ({ onOpenSommelierForDish }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('mains');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('All');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const categories: { key: MenuCategory; label: string; sub: string }[] = [
    { key: 'tasting', label: 'Degustation Journey', sub: 'Multi-Course Tasting' },
    { key: 'starters', label: 'Les Entrées', sub: 'Starters & Raw Bar' },
    { key: 'mains', label: 'Plats Principaux', sub: 'Artisanal Mains' },
    { key: 'desserts', label: 'Pâtisserie & Desserts', sub: 'Sweet Finale' },
    { key: 'cellar', label: 'Private Cellar Reserve', sub: 'Vintage Wines' },
    { key: 'cocktails', label: 'Craft Mixology', sub: 'Signature Elixirs' },
  ];

  const tags = ['All', "Chef's Special", 'Gluten-Free', 'Vegetarian', 'Organic'];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = activeTag === 'All' || item.tags.includes(activeTag);
    return matchesCategory && matchesSearch && matchesTag;
  });

  return (
    <section id="menu" className="py-24 bg-[#0e0d10] text-[#e8e4df] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a880] font-semibold">
            Gastronomic Selections
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#f5ebd9] mt-2 mb-4">
            The Autumn 2026 Tasting Menu
          </h2>
          <p className="text-[#a89b88] font-light text-base">
            Crafted daily with hyper-seasonal ingredients sourced from our biodynamic estate partners.
          </p>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                playUiChime('mid');
                setActiveCategory(cat.key);
              }}
              className={`px-5 py-3 rounded-xl border text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-300 flex flex-col items-center cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#1e1a14] border-[#c5a880] text-[#f5ebd9] shadow-lg shadow-[#c5a880]/10 gold-border-glow scale-105'
                  : 'glass-card border-[#231e17] text-[#9c8f7d] hover:border-[#3d3326] hover:text-[#e0d6c8]'
              }`}
            >
              <span className="font-bold">{cat.label}</span>
              <span className="text-[9px] text-[#8e8272] tracking-normal lowercase capitalize mt-0.5 font-normal">
                {cat.sub}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-4 rounded-2xl glass-card border border-[#231e17]">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8e8272] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#181512] border border-[#2d261f] rounded-xl pl-10 pr-4 py-2 text-xs text-[#f5ebd9] placeholder-[#736859] focus:outline-none focus:border-[#c5a880] transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            <Filter className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mr-1" />
            {tags.map((tg) => (
              <button
                key={tg}
                onClick={() => {
                  playUiChime('low');
                  setActiveTag(tg);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTag === tg
                    ? 'bg-[#c5a880] text-[#0b0b0d] font-semibold shadow-md'
                    : 'bg-[#181512] text-[#a89b88] hover:text-[#f5ebd9] border border-[#262019]'
                }`}
              >
                {tg}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative rounded-2xl glass-card border border-[#231e17] p-5 sm:p-6 glass-card-hover flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                {/* Dish Image */}
                <div className="relative w-full sm:w-28 h-28 rounded-xl overflow-hidden shrink-0 border border-[#2a241c]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {item.isChefSpecial && (
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#c5a880] text-[#0b0b0d] text-[9px] font-bold uppercase shadow-sm">
                      Chef Star
                    </div>
                  )}
                </div>

                {/* Dish Details */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-xl text-[#f5ebd9] font-medium group-hover:text-[#c5a880] transition-colors">
                        {item.name}
                      </h3>
                      {item.subtitle && (
                        <span className="text-[11px] italic font-serif text-[#a89b88] block">
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                    <span className="font-serif text-2xl text-[#c5a880] font-semibold shrink-0">
                      ${item.price}
                    </span>
                  </div>

                  <p className="text-xs text-[#8e8272] leading-relaxed font-light line-clamp-2">
                    {item.description}
                  </p>

                  {/* Dietary Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {item.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-[9px] uppercase tracking-wider rounded-md bg-[#1c1813] text-[#b8ab99] border border-[#2d261e]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Row */}
                  <div className="pt-2 flex items-center justify-between text-[11px]">
                    <button
                      onClick={() => {
                        playUiChime('mid');
                        setSelectedDish(item);
                      }}
                      className="flex items-center gap-1 text-[#8e8272] hover:text-[#f5ebd9] transition-colors cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-[#c5a880]" />
                      Ingredients & Pairing
                    </button>

                    <button
                      onClick={() => {
                        playUiChime('gold');
                        onOpenSommelierForDish(item.name);
                      }}
                      className="flex items-center gap-1 text-[#c5a880] hover:text-[#f5ebd9] font-medium transition-colors cursor-pointer"
                    >
                      <Wine className="w-3.5 h-3.5" />
                      Wine Pairing
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl border border-[#231e17]">
            <UtensilsCrossed className="w-8 h-8 text-[#8e8272] mx-auto mb-3" />
            <p className="font-serif text-xl text-[#f5ebd9]">No culinary creations found matching your filter.</p>
            <p className="text-xs text-[#8e8272] mt-1">Try resetting your search or selection category.</p>
          </div>
        )}
      </div>

      {/* Dish Detailed Info Modal */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0b0d]/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg glass-card border border-[#3d3326] rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 right-4 text-[#8e8272] hover:text-[#f5ebd9] p-1.5 rounded-full bg-[#1d1914] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-xl overflow-hidden h-48 border border-[#2a241c]">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <span className="text-[10px] uppercase text-[#c5a880] tracking-widest font-bold">
                  {selectedDish.category.toUpperCase()}
                </span>
                <h3 className="font-serif text-2xl text-[#f5ebd9] font-medium">{selectedDish.name}</h3>
                {selectedDish.subtitle && (
                  <p className="text-xs italic text-[#a89b88] font-serif">{selectedDish.subtitle}</p>
                )}
              </div>

              <p className="text-xs text-[#b8ab99] leading-relaxed font-light">{selectedDish.description}</p>

              {selectedDish.winePairingSuggestion && (
                <div className="p-3 bg-[#1c1813]/80 border border-[#2d261e] rounded-lg text-xs">
                  <span className="font-bold text-[#c5a880] block mb-1">Sommelier Recommended Pairing:</span>
                  <p className="text-[#f5ebd9]">{selectedDish.winePairingSuggestion}</p>
                </div>
              )}

              {selectedDish.allergens && (
                <div className="text-xs text-[#8e8272]">
                  <span className="font-semibold text-[#a89b88]">Allergen Info: </span>
                  {selectedDish.allergens.join(', ')}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between border-t border-[#231e17]">
                <span className="font-serif text-2xl text-[#c5a880] font-bold">${selectedDish.price}</span>
                <button
                  onClick={() => {
                    playUiChime('gold');
                    const dishName = selectedDish.name;
                    setSelectedDish(null);
                    onOpenSommelierForDish(dishName);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#0b0b0d] gold-gradient-bg rounded-lg cursor-pointer hover:scale-105 transition-transform"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Ask AI Pairing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
