import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Sparkles } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const LightboxModal = () => {
  const { activeLightbox, setActiveLightbox } = useFandom();
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeLightbox) return;
      if (e.key === 'Escape') setActiveLightbox(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightbox]);

  if (!activeLightbox) return null;

  const { items, currentIndex } = activeLightbox;
  const currentItem = items[currentIndex];

  const handleNext = () => {
    setIsZoomed(false);
    setActiveLightbox({
      items,
      currentIndex: (currentIndex + 1) % items.length
    });
  };

  const handlePrev = () => {
    setIsZoomed(false);
    setActiveLightbox({
      items,
      currentIndex: (currentIndex - 1 + items.length) % items.length
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between animate-in fade-in duration-200"
      onClick={() => setActiveLightbox(null)}
    >
      {/* Top Controls Bar */}
      <div 
        className="w-full flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3">
          <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-white truncate max-w-md">
              {currentItem.title}
            </h3>
            <p className="text-[11px] text-slate-400">
              {currentItem.franchise} • {currentItem.resolution}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs text-slate-400 font-mono">
            {currentIndex + 1} / {items.length}
          </span>
          
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10"
            title={isZoomed ? "Zoom Out" : "Zoom In"}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setActiveLightbox(null)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-white/10"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div 
        className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/15 backdrop-blur-md shadow-2xl transition-all hover:scale-110 active:scale-95"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/15 backdrop-blur-md shadow-2xl transition-all hover:scale-110 active:scale-95"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Current Image */}
        <div className="relative max-h-full max-w-full flex items-center justify-center transition-all duration-300">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className={`rounded-xl shadow-2xl object-contain transition-all duration-300 ${
              isZoomed 
                ? 'scale-150 cursor-grab max-h-[85vh] max-w-[85vw]' 
                : 'max-h-[75vh] max-w-[90vw] cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div 
        className="w-full px-6 py-4 border-t border-white/10 bg-slate-950/80 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-2xl">
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentItem.description}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Source / Artist: {currentItem.artist}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 justify-center sm:justify-end">
          {currentItem.tags && currentItem.tags.map((t, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-md text-[10px] bg-slate-900 border border-white/10 text-slate-300">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
