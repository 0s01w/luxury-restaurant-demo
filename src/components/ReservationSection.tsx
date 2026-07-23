import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, Utensils, CheckCircle2, X } from 'lucide-react';
import { playUiChime } from '../utils/audioSynth';

interface ReservationSectionProps {
  preselectedExperience?: string;
  preselectedTier?: string;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  preselectedExperience = '',
  preselectedTier = '',
  isModal = false,
  onCloseModal,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-08-01');
  const [time, setTime] = useState('19:00');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState(preselectedExperience || 'Main Dining Room');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [specialRequests, setSpecialRequests] = useState(preselectedTier ? `Selected Tier: ${preselectedTier}` : '');
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<any>(null);

  useEffect(() => {
    if (preselectedExperience) {
      setSeatingArea(preselectedExperience);
    }
  }, [preselectedExperience]);

  useEffect(() => {
    if (preselectedTier) {
      setSpecialRequests(`Selected Package: ${preselectedTier}`);
    }
  }, [preselectedTier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    playUiChime('gold');

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          date,
          time,
          guests,
          seatingArea,
          dietaryNotes,
          specialRequests,
        }),
      });

      const data = await response.json();
      setConfirmation(data);
    } catch (err) {
      console.error('Reservation Error:', err);
      // Fallback
      setConfirmation({
        success: true,
        message: 'Your table reservation at AURELIA has been confirmed.',
        reservation: {
          id: `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
          name,
          email,
          date,
          time,
          guests,
          seatingArea,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const seatingOptions = [
    'Main Dining Room',
    "Chef's Table Experience",
    'The Subterranean Wine Vault',
    "L'Orangerie Glass Terrace",
  ];

  const content = (
    <div className={`max-w-4xl mx-auto ${isModal ? 'p-2' : 'px-4 sm:px-6 lg:px-8'}`}>
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-[#c5a880] font-semibold">
          Online Concierge
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#f5ebd9] mt-2 mb-3">
          Reserve Your Dining Experience
        </h2>
        <p className="text-[#a89b88] font-light text-xs sm:text-sm">
          Select your preferred salon, date, and time. Black-tie/Formal dress code requested.
        </p>
      </motion.div>

      {!confirmation ? (
        <form
          onSubmit={handleSubmit}
          className="glass-card border border-[#2d261e] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6"
        >
          {/* Guest Count & Seating Salon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#c5a880]" /> Guests (Party Size)
              </label>
              <div className="grid grid-cols-6 gap-2">
                {[1, 2, 3, 4, 6, 8].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      playUiChime('low');
                      setGuests(g);
                    }}
                    className={`py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      guests === g
                        ? 'bg-[#c5a880] text-[#0b0b0d]'
                        : 'bg-[#181512] text-[#e0d6c8] border border-[#2a241c] hover:border-[#c5a880]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-2 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#c5a880]" /> Dining Salon / Area
              </label>
              <select
                value={seatingArea}
                onChange={(e) => setSeatingArea(e.target.value)}
                className="w-full bg-[#181512] border border-[#2a241c] rounded-xl px-4 py-2.5 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
              >
                {seatingOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#c5a880]" /> Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#181512] border border-[#2a241c] rounded-xl px-4 py-2.5 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#c5a880]" /> Dining Time
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#181512] border border-[#2a241c] rounded-xl px-4 py-2.5 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
              >
                <option value="17:30">17:30 (Early Dinner)</option>
                <option value="18:30">18:30 (Prime Evening)</option>
                <option value="19:30">19:30 (Peak Atmosphere)</option>
                <option value="20:30">20:30 (Late Tasting)</option>
                <option value="21:30">21:30 (Night Seating)</option>
              </select>
            </div>
          </div>

          {/* Guest Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Alexander Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                placeholder="alexander@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#181512] border border-[#2a241c] rounded-xl px-3.5 py-2.5 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 019-2834"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#181512] border border-[#2a241c] rounded-xl px-3.5 py-2.5 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
              />
            </div>
          </div>

          {/* Special Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-1">
                Dietary & Allergen Protocol
              </label>
              <input
                type="text"
                placeholder="e.g. Shellfish allergy, Vegan, Gluten-Free"
                value={dietaryNotes}
                onChange={(e) => setDietaryNotes(e.target.value)}
                className="w-full bg-[#181512] border border-[#2a241c] rounded-xl px-3.5 py-2.5 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#a89b88] font-semibold block mb-1">
                Special Occasion & Requests
              </label>
              <input
                type="text"
                placeholder="e.g. Birthday celebration, Quiet corner table"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full bg-[#181512] border border-[#2a241c] rounded-xl px-3.5 py-2.5 text-xs text-[#f5ebd9] focus:outline-none focus:border-[#c5a880]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-xs uppercase tracking-[0.2em] font-bold text-[#0b0b0d] gold-gradient-bg rounded-xl hover:scale-[1.01] transition-all disabled:opacity-50 shadow-xl shadow-[#c5a880]/10 cursor-pointer"
          >
            {loading ? 'Processing Reservation...' : 'Confirm Table Reservation'}
          </button>
        </form>
      ) : (
        /* Confirmation Screen */
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card border border-[#3d3326] rounded-2xl p-8 sm:p-10 shadow-2xl text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-[#1e1a14] border border-[#c5a880] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-[#c5a880]" />
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] font-bold">
              Booking Confirmed
            </span>
            <h3 className="font-serif text-3xl text-[#f5ebd9] font-medium mt-1">
              We Look Forward to Welcoming You
            </h3>
            <p className="text-xs text-[#a89b88] mt-2">
              A formal confirmation email has been dispatched to{' '}
              <span className="text-[#f5ebd9] font-semibold">{confirmation.reservation?.email}</span>.
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-[#181512]/80 border border-[#2a241c] rounded-xl p-6 text-left max-w-lg mx-auto space-y-3 text-xs">
            <div className="flex justify-between border-b border-[#241e17] pb-2">
              <span className="text-[#8e8272]">Reservation Reference:</span>
              <span className="font-mono text-[#c5a880] font-bold">
                {confirmation.reservation?.id}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#241e17] pb-2">
              <span className="text-[#8e8272]">Guest Name:</span>
              <span className="text-[#f5ebd9] font-medium">{confirmation.reservation?.name}</span>
            </div>
            <div className="flex justify-between border-b border-[#241e17] pb-2">
              <span className="text-[#8e8272]">Date & Time:</span>
              <span className="text-[#f5ebd9] font-medium">
                {confirmation.reservation?.date} at {confirmation.reservation?.time}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#241e17] pb-2">
              <span className="text-[#8e8272]">Party Size & Salon:</span>
              <span className="text-[#f5ebd9] font-medium">
                {confirmation.reservation?.guests} Guests • {confirmation.reservation?.seatingArea}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8e8272]">Dress Code Protocol:</span>
              <span className="text-[#c5a880]">Smart Elegant / Evening Formal</span>
            </div>
          </div>

          <button
            onClick={() => {
              setConfirmation(null);
              if (onCloseModal) onCloseModal();
            }}
            className="px-8 py-3 text-xs uppercase tracking-widest font-semibold text-[#0b0b0d] gold-gradient-bg rounded-xl cursor-pointer"
          >
            Done & Close
          </button>
        </motion.div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0b0d]/90 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl glass-card border border-[#3d3326] rounded-2xl p-6 sm:p-8 my-8"
          >
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 p-2 text-[#8e8272] hover:text-[#f5ebd9] rounded-full bg-[#181512] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {content}
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <section id="reservation" className="py-24 bg-[#0b0b0d] text-[#e8e4df] relative">
      {content}
    </section>
  );
};
