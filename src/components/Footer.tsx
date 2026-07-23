import React, { useState } from 'react';
import { UtensilsCrossed, ArrowUp, CheckCircle2, Star } from 'lucide-react';
import { playUiChime } from '../utils/audioSynth';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playUiChime('gold');

    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
    } catch (err) {
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    playUiChime('mid');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080a] text-[#a89b88] border-t border-[#1c1813] pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#1a1713]">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d8bc93] via-[#c5a880] to-[#9e7f55] p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#0b0b0d] rounded-full flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4 text-[#c5a880]" />
                </div>
              </div>
              <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-[#f5ebd9]">
                AURELIA
              </span>
            </div>

            <p className="text-xs text-[#8e8272] leading-relaxed font-light">
              An institution of haute gastronomy. Orchestrating hyper-seasonal tasting journeys and subterranean wine cellars in Manhattan.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[#c5a880]">
              <Star className="w-3.5 h-3.5 fill-[#c5a880]" />
              <Star className="w-3.5 h-3.5 fill-[#c5a880]" />
              <Star className="w-3.5 h-3.5 fill-[#c5a880]" />
              <span className="text-[10px] uppercase tracking-widest text-[#e0d6c8] font-medium ml-1">
                Michelin Guide 2026
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#f5ebd9] font-semibold mb-4">
              Explore Aurelia
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <a href="#story" className="hover:text-[#c5a880] transition-colors">
                  Our Story & Philosophy
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-[#c5a880] transition-colors">
                  Dining Salons & Experiences
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#c5a880] transition-colors">
                  Autumn 2026 Tasting Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#c5a880] transition-colors">
                  Culinary Gallery
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#c5a880] transition-colors">
                  Degustation Tiers & Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Accolades & Press */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#f5ebd9] font-semibold mb-4">
              Accolades
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8e8272] font-light">
              <li>• 3 Michelin Stars (2022–2026)</li>
              <li>• Wine Spectator Grand Award (1,400+ Labels)</li>
              <li>• James Beard Outstanding Chef Finalist</li>
              <li>• World’s 50 Best Restaurants Top 10</li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#f5ebd9] font-semibold">
              The Private Cellar Gazette
            </h4>
            <p className="text-xs text-[#8e8272] font-light leading-relaxed">
              Receive private invitations to seasonal menu debuts and rare vintage bottle releases.
            </p>

            {subscribed ? (
              <div className="p-3 glass-card border border-[#3d3326] rounded-xl text-xs text-[#c5a880] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Added to Aurelia guest list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full bg-[#12100d] border border-[#2a241c] rounded-xl px-3 py-2 text-xs text-[#f5ebd9] placeholder-[#6e6354] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 text-xs uppercase tracking-widest font-bold text-[#0b0b0d] gold-gradient-bg rounded-xl cursor-pointer hover:scale-[1.01] transition-transform"
                >
                  Join Guest List
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6e6354] gap-4">
          <p>© 2026 AURELIA Fine Dining & Culinary Art. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#faq" className="hover:text-[#c5a880] transition-colors">
              Privacy & Dress Code
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#c5a880] hover:text-[#f5ebd9] transition-colors cursor-pointer"
            >
              Back to Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
