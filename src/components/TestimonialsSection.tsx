import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data/restaurantData';
import { Star, Quote, CheckCircle, Plus } from 'lucide-react';
import { playUiChime } from '../utils/audioSynth';

export const TestimonialsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState(TESTIMONIALS);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newSource, setNewSource] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newQuote) return;

    playUiChime('gold');
    const added = {
      id: `t-${Date.now()}`,
      author: newAuthor,
      title: 'Verified Guest',
      source: newSource || 'Guest Guestbook 2026',
      quote: newQuote,
      rating: 5,
      year: '2026',
    };

    setReviewsList([added, ...reviewsList]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowAddReview(false);
      setNewAuthor('');
      setNewSource('');
      setNewQuote('');
    }, 2000);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#0e0d10] text-[#e8e4df] relative">
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
            Critical Acclaim
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#f5ebd9] mt-2 mb-4">
            Words From Critics & Guests
          </h2>
          <p className="text-[#a89b88] font-light text-base">
            Honored with 3 Michelin Stars and acclaimed by leading international gastronomy critics.
          </p>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsList.map((tm, idx) => (
            <motion.div
              key={tm.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative glass-card border border-[#231e17] rounded-2xl p-8 flex flex-col justify-between glass-card-hover"
            >
              <Quote className="w-8 h-8 text-[#3d3326] absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(tm.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#c5a880] text-[#c5a880]" />
                  ))}
                </div>

                <p className="font-serif italic text-lg text-[#f5ebd9] leading-relaxed mb-6 font-light">
                  "{tm.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1f1b15]">
                <p className="font-serif text-base text-[#f5ebd9] font-medium">{tm.author}</p>
                <div className="flex items-center justify-between text-xs text-[#8e8272] mt-0.5">
                  <span>{tm.source}</span>
                  <span className="text-[#c5a880]">{tm.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action button to leave guest note */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              playUiChime('mid');
              setShowAddReview(true);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-medium text-[#c5a880] glass-card rounded-xl hover:border-[#c5a880] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Share Your Guestbook Note
          </button>
        </div>
      </div>

      {/* Guest Note Modal */}
      <AnimatePresence>
        {showAddReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0b0d]/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md glass-card border border-[#3d3326] rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <button
                onClick={() => setShowAddReview(false)}
                className="absolute top-4 right-4 text-[#8e8272] hover:text-[#f5ebd9] p-1 cursor-pointer"
              >
                ✕
              </button>

              <h3 className="font-serif text-2xl text-[#f5ebd9]">Aurelia Guestbook</h3>
              <p className="text-xs text-[#8e8272]">Leave a reflection on your evening dining experience.</p>

              {submittedMessage ? (
                <div className="p-6 text-center text-[#c5a880] font-serif text-lg">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-[#c5a880]" />
                  Thank you. Your guest note has been logged.
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-3">
                  <div>
                    <label className="text-[11px] uppercase text-[#a89b88] font-semibold block mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Lord Harrington"
                      className="w-full bg-[#181512] border border-[#2a241c] rounded-lg px-3 py-2 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase text-[#a89b88] font-semibold block mb-1">Affiliation / City</label>
                    <input
                      type="text"
                      value={newSource}
                      onChange={(e) => setNewSource(e.target.value)}
                      placeholder="e.g. London / Gourmet Club"
                      className="w-full bg-[#181512] border border-[#2a241c] rounded-lg px-3 py-2 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase text-[#a89b88] font-semibold block mb-1">Reflection / Experience</label>
                    <textarea
                      required
                      rows={3}
                      value={newQuote}
                      onChange={(e) => setNewQuote(e.target.value)}
                      placeholder="Describe your dining journey..."
                      className="w-full bg-[#181512] border border-[#2a241c] rounded-lg px-3 py-2 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs uppercase tracking-widest font-bold text-[#0b0b0d] gold-gradient-bg rounded-lg cursor-pointer hover:scale-[1.01] transition-transform"
                  >
                    Submit Note
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
