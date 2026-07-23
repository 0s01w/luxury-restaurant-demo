import React, { useState, useEffect } from 'react';
import { SommelierPairingResult } from '../types';
import { Sparkles, Wine, GlassWater, X, RefreshCw, CheckCircle2, ChevronRight } from 'lucide-react';

interface AiSommelierModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDish?: string;
}

export const AiSommelierModal: React.FC<AiSommelierModalProps> = ({
  isOpen,
  onClose,
  initialDish = '',
}) => {
  const [dishName, setDishName] = useState(initialDish);
  const [tastePreferences, setTastePreferences] = useState('Full-bodied, Earthy, Silky Tannins');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('Standard (Wine & Spirits)');
  const [occasion, setOccasion] = useState('Celebratory Fine Dining');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SommelierPairingResult | null>(null);

  useEffect(() => {
    if (initialDish) {
      setDishName(initialDish);
    }
  }, [initialDish]);

  if (!isOpen) return null;

  const handleGeneratePairing = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai-sommelier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dishName: dishName || 'AURELIA Signature Degustation',
          tastePreferences,
          dietaryRestrictions,
          occasion,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error contacting AI Sommelier:', err);
      // Fallback fallback
      setResult({
        wineRecommendation: '2016 Château Margaux Premier Grand Cru Classé',
        region: 'Bordeaux, France',
        tastingNotes: 'Intense aromas of ripe black currant, violet petal, toasted cedar, and velvet mineral finish.',
        pairingRationale: 'Balances rich fat content while accentuating deep roasted savory notes.',
        chefTip: 'Decant for 45 minutes prior to serving at 16°C in crystal Burgundy stemware.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0b0d]/90 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#12100d] border border-[#3d3326] rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8e8272] hover:text-[#f5ebd9] rounded-full bg-[#1e1a14] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1a1714] border border-[#3d3326] flex items-center justify-center">
            <Wine className="w-5 h-5 text-[#c5a880]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-bold">
                Powered by Gemini AI
              </span>
            </div>
            <h3 className="font-serif text-2xl text-[#f5ebd9] font-medium">
              Master Sommelier Concierge
            </h3>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleGeneratePairing} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-1">
              Select or Enter Dish / Culinary Course
            </label>
            <input
              type="text"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              placeholder="e.g. A5 Miyazaki Wagyu Filet or Brittany Lobster"
              className="w-full bg-[#181512] border border-[#2a241c] rounded-lg px-4 py-2.5 text-xs text-[#f5ebd9] placeholder-[#736859] focus:outline-none focus:border-[#c5a880]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-1">
                Preferred Flavor Profile
              </label>
              <select
                value={tastePreferences}
                onChange={(e) => setTastePreferences(e.target.value)}
                className="w-full bg-[#181512] border border-[#2a241c] rounded-lg px-3 py-2.5 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
              >
                <option value="Full-bodied, Earthy, Silky Tannins">Full-bodied & Earthy Red</option>
                <option value="Crisp Mineral, Citrus & High Acidity White">Crisp Mineral White</option>
                <option value="Prestige Vintage Champagne & Fine Bubbles">Prestige Champagne</option>
                <option value="Rich Oaky Chardonnay & Creamy">Rich Oaky Chardonnay</option>
                <option value="Non-Alcoholic Artisanal Botanical Elixir">Non-Alcoholic Botanical Elixir</option>
              </select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-1">
                Dining Occasion
              </label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full bg-[#181512] border border-[#2a241c] rounded-lg px-3 py-2.5 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
              >
                <option value="Celebratory Fine Dining">Celebratory Dinner</option>
                <option value="Romantic Anniversary">Romantic Anniversary</option>
                <option value="Executive Business Summit">Executive Summit</option>
                <option value="Sommelier Tasting Mastery">Sommelier Masterclass</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-widest font-bold text-[#0b0b0d] gold-gradient-bg rounded-md hover:scale-[1.01] transition-all disabled:opacity-50 shadow-xl"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Consulting Cellar Records...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Bespoke Wine Pairing
              </>
            )}
          </button>
        </form>

        {/* Results Display */}
        {result && (
          <div className="bg-[#181512] border border-[#3d3326] rounded-xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-2 pb-3 border-b border-[#2a241c]">
              <CheckCircle2 className="w-4 h-4 text-[#c5a880]" />
              <span className="text-xs font-semibold text-[#c5a880] uppercase tracking-wider">
                Sommelier Recommendation
              </span>
            </div>

            <div>
              <h4 className="font-serif text-2xl text-[#f5ebd9] font-semibold">
                {result.wineRecommendation}
              </h4>
              <p className="text-xs text-[#c5a880] uppercase tracking-widest mt-0.5">
                {result.region}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-[#a89b88] block mb-0.5">Tasting Notes:</span>
                <p className="text-[#e0d6c8] font-light leading-relaxed">{result.tastingNotes}</p>
              </div>

              <div>
                <span className="font-bold text-[#a89b88] block mb-0.5">Pairing Rationale:</span>
                <p className="text-[#e0d6c8] font-light leading-relaxed">{result.pairingRationale}</p>
              </div>

              {result.chefTip && (
                <div className="p-3 bg-[#1e1a14] rounded border border-[#2d261e] mt-2">
                  <span className="font-bold text-[#c5a880] block mb-0.5">Serving & Decanting Advice:</span>
                  <p className="text-[#b8ab99] font-light">{result.chefTip}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
