import React from 'react';
import { motion } from 'motion/react';
import { CHEF_DISH_IMAGE, WINE_CELLAR_IMAGE } from '../data/restaurantData';
import { Leaf, Flame, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const stats = [
    { label: 'Michelin Stars', value: '3', sub: 'Awarded 2026' },
    { label: 'Rare Wine Labels', value: '1,400+', sub: 'Private Subterranean Cellar' },
    { label: 'Years of Mastery', value: '22', sub: 'Chef Julien Vance' },
    { label: 'Local Organic Farms', value: '100%', sub: 'Heirloom & Foraged' },
  ];

  return (
    <section id="story" className="py-24 bg-[#0e0d10] text-[#e8e4df] relative overflow-hidden">
      {/* Decorative Ambient Radial Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c5a880]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#722f37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a880] font-semibold">
            Our Heritage & Vision
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#f5ebd9] mt-2 mb-4">
            The Art of Pure Culinary Passion
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent mx-auto" />
        </motion.div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story Text & Philosophy */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="font-serif text-3xl sm:text-4xl text-[#f5ebd9] font-light leading-snug">
              "We do not merely cook; we orchestrate sensory memories forged in fire, soil, and spirit."
            </h3>

            <p className="text-[#a89b88] leading-relaxed font-light text-base">
              Founded in 2004 by Master Chef Julien Vance after two decades leading three-star kitchens in Paris and Tokyo, Aurelia was born as a sanctuary for gastronomy without compromise.
            </p>

            <p className="text-[#a89b88] leading-relaxed font-light text-base">
              Every morning, our kitchen receives wild-foraged botanicals from upstate woods, day-boat seafood from Atlantic tides, and heirloom grains harvested exclusively for our bakery. We pair centuries-old French technique with modern minimalist presentation.
            </p>

            {/* Philosophy Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-xl glass-card border border-[#28221b]">
                <Leaf className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#f5ebd9]">Hyper-Seasonal Foraging</h4>
                  <p className="text-xs text-[#8e8272] mt-1">Menus evolve weekly based on soil temperature and ocean tides.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl glass-card border border-[#28221b]">
                <Flame className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#f5ebd9]">Open Hearth Cooking</h4>
                  <p className="text-xs text-[#8e8272] mt-1">Applewood embers and charcoal smoke impart deep organic aromas.</p>
                </div>
              </div>
            </div>

            {/* Chef Signature */}
            <div className="pt-4 flex items-center gap-4 border-t border-[#221d17]">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#3d3326]">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80"
                  alt="Chef Julien Vance"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="font-serif text-lg text-[#f5ebd9]">Julien Vance</p>
                <p className="text-xs text-[#c5a880] uppercase tracking-wider">Chef Patron & Founder</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Layered Visual Cards */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Primary Main Image */}
            <div className="relative rounded-2xl overflow-hidden border border-[#2d261e] shadow-2xl group">
              <img
                src={CHEF_DISH_IMAGE}
                alt="Signature Dish Crafting"
                className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d10] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] font-bold">
                  Chef's Signature
                </span>
                <p className="font-serif text-2xl text-[#f5ebd9]">A5 Miyazaki Wagyu & Black Winter Truffle</p>
              </div>
            </div>

            {/* Floating Inset Secondary Image */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden sm:block absolute -bottom-10 -left-10 w-60 rounded-2xl overflow-hidden border-2 border-[#3d3326] shadow-2xl bg-[#0e0d10] glass-card"
            >
              <img
                src={WINE_CELLAR_IMAGE}
                alt="Sommelier Wine Cellar"
                className="w-full h-36 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 text-center bg-[#151310]">
                <p className="text-xs font-serif text-[#f5ebd9]">1,400+ Cellar Vintage</p>
                <p className="text-[10px] text-[#c5a880] uppercase tracking-wider">Private Sommelier Reserve</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Statistics Bar */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((st, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-6 rounded-2xl glass-card glass-card-hover text-center"
            >
              <span className="font-serif text-4xl sm:text-5xl gold-gradient-text font-bold block mb-1">
                {st.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#f5ebd9] font-semibold block mb-1">
                {st.label}
              </span>
              <span className="text-[11px] text-[#8e8272] block font-light">
                {st.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
