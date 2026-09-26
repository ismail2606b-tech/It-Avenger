import React, { useState, useMemo } from 'react';
import { FileText, Clock, User, Calendar, ArrowRight, Bookmark } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const ArticlesSection = () => {
  const { articles, categories, setActiveArticleModal, isBookmarked, toggleBookmark } = useFandom();

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchCat = categoryFilter === 'all' || art.categoryId === categoryFilter;
      const matchSearch = !searchTerm.trim() ||
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [articles, categoryFilter, searchTerm]);

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1.5">
            <FileText className="w-4 h-4" />
            <span>Long-Form Journalism & Retrospectives</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Featured Articles & Editorial
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Read comprehensive cultural dissections, industry box office analytics, aesthetic breakdowns, and creator tributes.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          {filteredArticles.length} Editorial Pieces
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Category Realm:
          </span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-60 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All 7 Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter articles by keyword or tag..."
          className="w-full sm:w-72 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(art => {
          const bookmarked = isBookmarked(art.id);
          return (
            <article
              key={art.id}
              onClick={() => setActiveArticleModal(art)}
              className="group relative rounded-2xl bg-slate-900/70 border border-white/10 hover:border-indigo-500/40 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                <img
                  src={art.heroImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                    {art.categoryId}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(art);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
                    bookmarked
                      ? 'bg-rose-500 text-white shadow-rose-500/30'
                      : 'bg-slate-950/70 text-slate-300 hover:text-white border border-white/10'
                  }`}
                  aria-label={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                </button>

                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-slate-300 text-[10px] font-mono border border-white/10">
                  {art.readTime}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3 bg-slate-950/90 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 mb-2">
                    <span className="truncate">{art.author}</span>
                    <span>•</span>
                    <span className="shrink-0">{art.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 mt-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {art.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-white/5">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 flex items-center space-x-1 shrink-0 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </article>
          );
        })}
      </div>
    </div>
  );
};
