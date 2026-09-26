import React, { useState, useMemo } from 'react';
import { Rocket, Calendar, Sparkles, Trophy, Bookmark, Clock, CheckCircle } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const ReleaseRadar = () => {
  const { releases, categories, isBookmarked, toggleBookmark } = useFandom();

  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredReleases = useMemo(() => {
    const list = categoryFilter === 'all'
      ? releases
      : releases.filter(r => r.categoryId === categoryFilter);
    return [...list].sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
  }, [releases, categoryFilter]);

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1.5">
            <Rocket className="w-4 h-4" />
            <span>Upcoming Releases Radar & Timeline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Release Radar & Calendar
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Never miss a major cinema premiere, seasonal anime launch, AAA game drop, K-Pop comeback album, or comic solicitations.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          {filteredReleases.length} Upcoming Milestones
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap scrollbar-none pb-2">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            categoryFilter === 'all'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          All Universes
        </button>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setCategoryFilter(c.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              categoryFilter === c.id
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Release Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReleases.map(rel => {
          const bookmarked = isBookmarked(rel.id);
          return (
            <div
              key={rel.id}
              className="group relative rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between"
            >
              {/* Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={rel.image}
                  alt={rel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                    {rel.categoryId}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {rel.status}
                  </span>
                </div>

                <button
                  onClick={() => toggleBookmark(rel)}
                  className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
                    bookmarked
                      ? 'bg-rose-500 text-white shadow-rose-500/30'
                      : 'bg-slate-950/70 text-slate-300 hover:text-white border border-white/10'
                  }`}
                  aria-label={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                </button>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center space-x-1.5 bg-black/80 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10 font-mono text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{rel.releaseDate}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 bg-slate-950/90 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 block mb-1 truncate">
                    {rel.studioOrPublisher}
                  </span>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors line-clamp-1">
                    {rel.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 mt-1.5 leading-relaxed">
                    {rel.description}
                  </p>
                </div>

                {/* Hype Meter & Platform */}
                <div className="pt-3 border-t border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 truncate max-w-[60%]">
                      Platform: <span className="text-slate-200 font-semibold">{rel.format}</span>
                    </span>
                    <span className="text-cyan-400 font-mono font-bold">
                      Hype: {rel.hypeScore}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                      style={{ width: `${rel.hypeScore}%` }}
                    />
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
