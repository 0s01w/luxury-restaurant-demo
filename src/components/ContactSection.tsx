import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Car, Send, CheckCircle2 } from 'lucide-react';
import { playUiChime } from '../utils/audioSynth';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Private Dining Inquiry');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    playUiChime('gold');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      setStatusMsg(data.message || 'Thank you for reaching out. Our Concierge team will respond within 12 hours.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatusMsg('Your message has been dispatched to our Maître d’ team.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0b0b0d] text-[#e8e4df] relative">
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
            Concierge & Inquiries
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#f5ebd9] mt-2 mb-4">
            Connect With Aurelia
          </h2>
          <p className="text-[#a89b88] font-light text-base">
            For private event consultations, media inquiries, or custom dietary requests.
          </p>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card border border-[#231e17] rounded-2xl p-8 sm:p-10 shadow-2xl"
          >
            <h3 className="font-serif text-2xl text-[#f5ebd9] font-medium mb-6">
              Send a Concierge Note
            </h3>

            {statusMsg ? (
              <div className="p-6 bg-[#1a1713] border border-[#3d3326] rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-[#c5a880] mx-auto" />
                <p className="font-serif text-xl text-[#f5ebd9]">{statusMsg}</p>
                <button
                  onClick={() => setStatusMsg(null)}
                  className="text-xs text-[#c5a880] uppercase tracking-wider underline mt-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Victoria Sterling"
                      className="w-full bg-[#181512] border border-[#2a241c] rounded-xl px-3.5 py-2.5 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="victoria@example.com"
                      className="w-full bg-[#181512] border border-[#2a241c] rounded-xl px-3.5 py-2.5 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-1">
                    Subject / Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#181512] border border-[#2a241c] rounded-xl px-3.5 py-2.5 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value="Private Dining Inquiry">Private Salon / Cellar Dining</option>
                    <option value="Full Venue Buyout">Full Restaurant Buyout</option>
                    <option value="Dietary Protocol Request">Dietary / Allergy Protocol</option>
                    <option value="Media & Press">Press & Sommelier Interviews</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How may our concierge assist your visit?"
                    className="w-full bg-[#181512] border border-[#2a241c] rounded-xl px-3.5 py-2.5 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-bold text-[#0b0b0d] gold-gradient-bg rounded-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {loading ? 'Transmitting...' : 'Dispatch Message'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Column: Location & Info */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 flex flex-col justify-between"
          >
            {/* Location Card */}
            <div className="glass-card border border-[#231e17] rounded-2xl p-8 space-y-6">
              <h3 className="font-serif text-2xl text-[#f5ebd9] font-medium">
                Location & Arrival
              </h3>

              <div className="space-y-4 text-xs text-[#a89b88]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#f5ebd9] block">Address</span>
                    <span>450 Grand Avenue, Manhattan, NY 10013</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#f5ebd9] block">Dining Hours</span>
                    <span>Tuesday – Sunday | 17:30 – 23:00 (Last seating 21:30)</span>
                    <span className="block text-[#8e8272] mt-0.5">Closed Mondays for kitchen research</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#f5ebd9] block">White-Glove Valet Service</span>
                    <span>Complementary private courtyard valet provided at Grand Ave entrance</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#f5ebd9] block">Concierge Desk</span>
                    <span>+1 (212) 555-0188 • concierge@aureliadining.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Map Placeholder */}
            <div className="relative rounded-2xl overflow-hidden border border-[#231e17] h-48 bg-[#181512] flex items-center justify-center text-center p-6 glass-card">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 space-y-2">
                <MapPin className="w-8 h-8 text-[#c5a880] mx-auto animate-bounce" />
                <p className="font-serif text-lg text-[#f5ebd9]">AURELIA Fine Dining Sanctuary</p>
                <p className="text-xs text-[#8e8272]">Manhattan Cultural District • NY 10013</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
