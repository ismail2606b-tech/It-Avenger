import React, { useEffect, useRef } from 'react';
import { Search, X, Layers, Filter, Sparkles, ArrowRight, User, Video, FileText, Calendar, ShoppingBag, Rocket } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const GlobalSearchModal = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    searchQuery, 
    setSearchQuery, 
    searchCategoryFilter, 
    setSearchCategoryFilter, 
    searchTypeFilter, 
    setSearchTypeFilter, 
    globalSearchResults,
    categories,
    setActiveCharacterModal,
    setActiveArticleModal,
    setActiveVideoModal,
    setActiveProductModal,
    navigateTo
  } = useFandom();

  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const handleResultClick = (result) => {
    setIsSearchOpen(false);

    if (result.searchResultType === 'Character Profile') {
      setActiveCharacterModal(result);
    } else if (result.searchResultType === 'Featured Article') {
      setActiveArticleModal(result);
    } else if (result.searchResultType.includes('Video') || result.searchResultType.includes('Trailer')) {
      setActiveVideoModal({ title: result.title, videoUrl: result.videoUrl });
    } else if (result.searchResultType === 'Fan Merchandise') {
      setActiveProductModal(result);
    } else if (result.searchResultType === 'Event Highlight') {
      navigateTo('events');
    } else if (result.searchResultType === 'Upcoming Release') {
      navigateTo('releases');
    }
  };

  const getResultIcon = (type) => {
    if (type.includes('Character')) return <User className="w-3.5 h-3.5 text-pink-400" />;
    if (type.includes('Video') || type.includes('Trailer')) return <Video className="w-3.5 h-3.5 text-rose-400" />;
    if (type.includes('Article')) return <FileText className="w-3.5 h-3.5 text-indigo-400" />;
    if (type.includes('Event')) return <Calendar className="w-3.5 h-3.5 text-emerald-400" />;
    if (type.includes('Merchandise')) return <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />;
    return <Rocket className="w-3.5 h-3.5 text-cyan-400" />;
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-200"
      onClick={() => setIsSearchOpen(false)}
    >
      <div 
        className="w-full max-w-3xl rounded-3xl bg-slate-900 border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-slate-950/90 flex items-center space-x-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across all 7 categories: characters, trailers, articles, merch..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-500 hover:text-white px-2 py-1 rounded bg-slate-800"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            aria-label="Close Search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Toolbar (Per SRS Page 9: Filter by category and content type) */}
        <div className="p-3 bg-slate-950/60 border-b border-white/5 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Category:</span>
            <select
              value={searchCategoryFilter}
              onChange={(e) => setSearchCategoryFilter(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300 focus:outline-none"
            >
              <option value="all">All Realms</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Type:</span>
            <select
              value={searchTypeFilter}
              onChange={(e) => setSearchTypeFilter(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300 focus:outline-none"
            >
              <option value="all">All Content Types</option>
              <option value="character">Characters</option>
              <option value="article">Articles</option>
              <option value="trailer">Trailers</option>
              <option value="event">Events</option>
              <option value="merchandise">Merchandise</option>
              <option value="release">Releases</option>
            </select>
          </div>

          <span className="ml-auto text-[11px] text-slate-500 font-mono">
            {globalSearchResults.length} matches
          </span>
        </div>

        {/* Results Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          {!searchQuery.trim() ? (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-700 mx-auto" />
              <p className="text-sm font-semibold text-slate-400">Search the Fandom Universe</p>
              <p className="text-xs text-slate-500">
                Type character names (Tanjiro, Gojo, Batman), series (Berserk, Elden Ring), or keywords like "trailer", "expo", "t-shirt".
              </p>
            </div>
          ) : globalSearchResults.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-300">No results found for "{searchQuery}"</p>
              <p className="text-xs text-slate-500">
                Try loosening your category or type filters above.
              </p>
            </div>
          ) : (
            globalSearchResults.map((res, idx) => (
              <div
                key={`${res.id}-${idx}`}
                onClick={() => handleResultClick(res)}
                className="p-3 rounded-2xl bg-slate-950/70 hover:bg-slate-800/80 border border-white/5 hover:border-indigo-500/40 cursor-pointer transition-all flex items-center space-x-3.5 group"
              >
                <img
                  src={res.image || res.thumbnail || res.heroImage}
                  alt={res.name || res.title}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-900"
                />

                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {getResultIcon(res.searchResultType)}
                      <span>{res.searchResultType}</span>
                    </span>
                    <span className="text-[10px] text-indigo-400 uppercase font-semibold">
                      • {res.resultCategory}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate mt-0.5">
                    {res.name || res.title}
                  </h4>

                  <p className="text-[11px] text-slate-400 truncate">
                    {res.series || res.franchise || res.excerpt || res.description}
                  </p>
                </div>

                <div className="text-xs font-semibold text-slate-500 group-hover:text-indigo-400 flex items-center space-x-1 shrink-0">
                  <span className="hidden sm:inline">Open</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/5 bg-slate-950 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Client-Side Fast Search • Zero Backend Required</span>
          <div className="flex items-center space-x-2">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/10 text-[10px]">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
