import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_IMAGES } from '../data/restaurantData';
import { X, Eye } from 'lucide-react';
import { playUiChime } from '../utils/audioSynth';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ['All', 'Culinary Art', 'Ambience', 'Wine & Spirits', 'Chef Craft'];

  const filteredImages = GALLERY_IMAGES.filter(
    (img) => activeCategory === 'All' || img.category === activeCategory
  );

  return (
    <section id="gallery" className="py-24 bg-[#0b0b0d] text-[#e8e4df] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a880] font-semibold">
            Visual Harmony
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#f5ebd9] mt-2 mb-4">
            The Aurelia Gallery
          </h2>
          <p className="text-[#a89b88] font-light text-base">
            A glance into our culinary laboratory, vintage cellars, and intimate dining salons.
          </p>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playUiChime('low');
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#c5a880] text-[#0b0b0d] font-bold shadow-md shadow-[#c5a880]/20 scale-105'
                  : 'glass-card text-[#8e8272] hover:text-[#f5ebd9] border border-[#231e17]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => {
                  playUiChime('high');
                  setSelectedImage(img.url);
                }}
                className="group relative h-72 rounded-2xl overflow-hidden glass-card border border-[#231e17] cursor-pointer shadow-lg glass-card-hover"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-[#0b0b0d]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Hover overlay content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-bold">
                    {img.category}
                  </span>
                  <h3 className="font-serif text-xl text-[#f5ebd9] font-medium">{img.title}</h3>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#e0d6c8]">
                    <Eye className="w-3.5 h-3.5 text-[#c5a880]" /> Expand Image
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0b0d]/95 backdrop-blur-md">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 text-[#8e8272] hover:text-[#f5ebd9] bg-[#1a1714] rounded-full border border-[#3d3326] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-[#3d3326] shadow-2xl"
            >
              <img
                src={selectedImage}
                alt="Gallery Preview"
                className="w-full h-full object-contain max-h-[85vh]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
