import React from 'react';
import { motion } from 'motion/react';
import { Check, Calendar } from 'lucide-react';
import { playUiChime } from '../utils/audioSynth';

interface PricingSectionProps {
  onOpenReservationWithTier: (tierName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenReservationWithTier }) => {
  const plans = [
    {
      name: "The Season's Journey",
      price: "195",
      unit: "per guest",
      badge: "Classic Fine Dining",
      highlight: false,
      description: "A 5-course exploration of local biodynamic harvests and coastal Atlantic catches.",
      features: [
        "5-Course Seasonal Tasting Menu",
        "Amuse-Bouche & House Artisanal Breads",
        "Pre-Dessert Refreshment",
        "Sommelier Wine Pairing available (+ $125)",
        "Main Dining Salon Seating",
      ],
    },
    {
      name: "The Grand Michelin Tasting",
      price: "275",
      unit: "per guest",
      badge: "Most Popular",
      highlight: true,
      description: "Our hallmark 9-course culinary Odyssey featuring Miyazaki A5 Wagyu & Royal Oscietra Caviar.",
      features: [
        "9-Course Signature Gastronomic Menu",
        "Miyazaki A5 Wagyu & Brittany Lobster",
        "Oscietra Caviar & Belon Oysters",
        "Pre-Dessert & Valrhona Gold Sphere",
        "Prestige Sommelier Pairing available (+ $175)",
        "Chef's Counter or Main Dining Seating",
      ],
    },
    {
      name: "The Imperial Cellar Reserve",
      price: "420",
      unit: "per guest",
      badge: "Ultra Luxury",
      highlight: false,
      description: "The ultimate 10-course master experience accompanied by Premier Grand Cru vintage pairings.",
      features: [
        "10-Course Bespoke Master Tasting",
        "Full Premier Grand Cru Sommelier Pairing Included",
        "Dom Pérignon Welcome Champagne Toast",
        "Subterranean Wine Vault or Chef's Table",
        "Keepsake Engraved Menu signed by Chef Vance",
        "Complementary White-Glove Valet Parking",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-[#0b0b0d] text-[#e8e4df] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a880] font-semibold">
            Gastronomy Packages
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#f5ebd9] mt-2 mb-4">
            Tasting Menu Tiers & Rates
          </h2>
          <p className="text-[#a89b88] font-light text-base">
            Transparent, uncompromised excellence. Dietary restrictions tailored seamlessly across all tiers.
          </p>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 ${
                plan.highlight
                  ? 'glass-card border-2 border-[#c5a880] shadow-2xl shadow-[#c5a880]/20 gold-border-glow scale-102'
                  : 'glass-card border border-[#231e17] glass-card-hover'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-[#0b0b0d] gold-gradient-bg shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-2xl text-[#f5ebd9] font-medium">{plan.name}</h3>
                  {!plan.highlight && (
                    <span className="text-[10px] uppercase tracking-wider text-[#c5a880] bg-[#1a1714] px-2.5 py-1 rounded border border-[#2d261e]">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#8e8272] mb-6 font-light leading-relaxed">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8 pb-6 border-b border-[#221d17]">
                  <span className="font-serif text-5xl font-bold text-[#f5ebd9]">${plan.price}</span>
                  <span className="text-xs text-[#8e8272] ml-2">{plan.unit}</span>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs text-[#a89b88]">
                      <Check className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  playUiChime('gold');
                  onOpenReservationWithTier(plan.name);
                }}
                className={`w-full py-3.5 text-xs uppercase tracking-widest font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  plan.highlight
                    ? 'text-[#0b0b0d] gold-gradient-bg hover:scale-[1.02] shadow-lg'
                    : 'text-[#f5ebd9] bg-[#1a1714] border border-[#3d3326] hover:border-[#c5a880] hover:text-[#c5a880]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                Reserve {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
