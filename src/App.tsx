import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { FloatingDock } from './components/FloatingDock';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { InteractiveMenu } from './components/InteractiveMenu';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { ReservationSection } from './components/ReservationSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AiSommelierModal } from './components/AiSommelierModal';

export default function App() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [reservationExperience, setReservationExperience] = useState('');
  const [reservationTier, setReservationTier] = useState('');

  const [isSommelierModalOpen, setIsSommelierModalOpen] = useState(false);
  const [sommelierDishName, setSommelierDishName] = useState('');

  const handleOpenReservation = () => {
    setReservationExperience('');
    setReservationTier('');
    setIsReservationModalOpen(true);
  };

  const handleOpenReservationWithExperience = (expTitle: string) => {
    setReservationExperience(expTitle);
    setReservationTier('');
    setIsReservationModalOpen(true);
  };

  const handleOpenReservationWithTier = (tierName: string) => {
    setReservationTier(tierName);
    setReservationExperience('');
    setIsReservationModalOpen(true);
  };

  const handleOpenSommelier = () => {
    setSommelierDishName('');
    setIsSommelierModalOpen(true);
  };

  const handleOpenSommelierForDish = (dishName: string) => {
    setSommelierDishName(dishName);
    setIsSommelierModalOpen(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#0b0b0d] text-[#e8e4df] font-sans antialiased selection:bg-[#c5a880] selection:text-[#0b0b0d] transition-colors duration-500">
        {/* Sticky Navigation Bar */}
        <Navbar
          onOpenReservation={handleOpenReservation}
          onOpenSommelier={handleOpenSommelier}
        />

        {/* Main Page Sections */}
        <main>
          {/* 1. Hero Section */}
          <Hero
            onOpenReservation={handleOpenReservation}
            onOpenSommelier={handleOpenSommelier}
          />

          {/* 2. About & Philosophy Section */}
          <AboutSection />

          {/* 3. Salons & Experiences Section */}
          <ServicesSection
            onOpenReservationWithExperience={handleOpenReservationWithExperience}
          />

          {/* 4. Interactive Tasting Menu */}
          <InteractiveMenu
            onOpenSommelierForDish={handleOpenSommelierForDish}
          />

          {/* 5. Culinary & Ambience Gallery */}
          <GallerySection />

          {/* 6. Reviews & Michelin Accolades */}
          <TestimonialsSection />

          {/* 7. Degustation Menu Tiers & Rates */}
          <PricingSection
            onOpenReservationWithTier={handleOpenReservationWithTier}
          />

          {/* 8. Online Table Reservation Section */}
          <ReservationSection />

          {/* 9. Concierge FAQ Accordion */}
          <FaqSection />

          {/* 10. Contact & Location Information */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* 2026 Award-Winning Glassmorphic Floating Dock */}
        <FloatingDock
          onOpenReservation={handleOpenReservation}
          onOpenSommelier={handleOpenSommelier}
        />

        {/* AI Sommelier Concierge Modal */}
        <AiSommelierModal
          isOpen={isSommelierModalOpen}
          onClose={() => setIsSommelierModalOpen(false)}
          initialDish={sommelierDishName}
        />

        {/* Quick Table Reservation Modal */}
        {isReservationModalOpen && (
          <ReservationSection
            isModal={true}
            preselectedExperience={reservationExperience}
            preselectedTier={reservationTier}
            onCloseModal={() => setIsReservationModalOpen(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
