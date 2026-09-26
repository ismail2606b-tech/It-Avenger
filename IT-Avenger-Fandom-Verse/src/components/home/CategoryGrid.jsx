import React from 'react';
import { Flame, Gamepad2, Film, Tv, Music, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const CategoryGrid = () => {
  const { categories, navigateTo } = useFandom();

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-6 h-6 text-rose-400" />;
      case 'Gamepad2': return <Gamepad2 className="w-6 h-6 text-emerald-400" />;
      case 'Film': return <Film className="w-6 h-6 text-amber-400" />;
      case 'Tv': return <Tv className="w-6 h-6 text-indigo-400" />;
      case 'Music': return <Music className="w-6 h-6 text-pink-400" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-yellow-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-400" />;
      default: return <Sparkles className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span>Interactive Category Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Choose Your Fandom Realm
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Each realm features dedicated character dossiers, 4K video trailers, audio podcasts, curated image galleries, and event trackers.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          7 DIVERSE UNIVERSE HUBS
        </div>
      </div>

      {/* Grid of 7 Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat, index) => {
          const isLarge = index === 0; // Highlight the first (Anime) or provide dynamic layout
          return (
            <div
              key={cat.id}
              onClick={() => navigateTo('category', cat.id)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/25 bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 ${
                isLarge ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Background Thumbnail Image with Gradient overlay */}
              <div className="h-44 sm:h-52 w-full overflow-hidden relative">
                <img
                  src={cat.heroImage}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-75 group-hover:brightness-90"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent`} />
                <div className={`absolute inset-0 bg-gradient-to-r ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Floating Icon Badge */}
                <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-slate-950/80 border border-white/10 backdrop-blur-md shadow-lg group-hover:scale-110 transition-transform">
                  {getCategoryIcon(cat.icon)}
                </div>

                <div className="absolute top-4 right-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cat.badgeColor}`}>
                    Enter Realm
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 bg-slate-950/90 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {cat.name}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {cat.tagline}
                </p>

                {/* Subtags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.subtags.slice(0, 3).map((sub, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] bg-slate-900 border border-white/5 text-slate-400 font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                  {cat.subtags.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] text-slate-500 font-medium">
                      +{cat.subtags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
