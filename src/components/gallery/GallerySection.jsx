import React from 'react';
import { Sparkles, Maximize2 } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const GallerySection = ({ categoryFilter =  null, title = "Curated High-Res Image Gallery" }) => {
  const { galleries, setActiveLightbox } = useFandom();

  const items = categoryFilter 
    ? galleries.filter(g => g.categoryId === categoryFilter)
    : galleries;

  if (items.length === 0) return null;

  const handleOpenLightbox = (index) => {
    setActiveLightbox({
      items,
      currentIndex: index
    });
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              {title}
            </h3>
            <p className="text-xs text-slate-400">
              Interactive 4K Lightbox • Click any image to browse in full viewport
            </p>
          </div>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          {items.length} Images
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => handleOpenLightbox(idx)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
          >
            <div className="h-60 w-full overflow-hidden relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

              <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/70 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-950/80 text-purple-300 border border-purple-500/30">
                  {item.franchise}
                </span>
                <h4 className="text-sm font-bold text-white mt-1 group-hover:text-purple-300 transition-colors truncate">
                  {item.title}
                </h4>
              </div>
            </div>

            <div className="p-3 bg-slate-950/90 flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate">{item.artist}</span>
              <span className="font-mono text-slate-500 shrink-0 ml-2">{item.resolution}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
