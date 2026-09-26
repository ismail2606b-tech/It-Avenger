import React, { useState, useMemo } from 'react';
import { Users, Filter, Zap, ChevronRight, Bookmark } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const CharacterProfiles = () => {
  const { characters, categories, setActiveCharacterModal, isBookmarked, toggleBookmark } = useFandom();

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [franchiseFilter, setFranchiseFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Extract unique franchises
  const availableFranchises = useMemo(() => {
    const list = categoryFilter === 'all'
      ? characters
      : characters.filter(c => c.categoryId === categoryFilter);
    const unique = [...new Set(list.map(c => c.franchise))];
    return unique.sort();
  }, [characters, categoryFilter]);

  // Filtered characters
  const filteredCharacters = useMemo(() => {
    return characters.filter(c => {
      const matchCat = categoryFilter === 'all' || c.categoryId === categoryFilter;
      const matchFranchise = franchiseFilter === 'all' || c.franchise === franchiseFilter;
      const matchSearch = !searchFilter.trim() || 
        c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        c.series.toLowerCase().includes(searchFilter.toLowerCase()) ||
        c.traits.role.toLowerCase().includes(searchFilter.toLowerCase());
      return matchCat && matchFranchise && matchSearch;
    });
  }, [characters, categoryFilter, franchiseFilter, searchFilter]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-pink-400 text-xs font-bold uppercase tracking-widest mb-1.5">
            <Users className="w-4 h-4" />
            <span>Legendary Characters Archive (35+ Profiles)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Character Dossiers
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Explore deep biographies, power scaling, abilities, signature quotes, and creator credits across all 7 universe categories.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Showing {filteredCharacters.length} of {characters.length} Champions
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
        
        {/* Category Selector */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Category Realm:
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setFranchiseFilter('all'); // Reset franchise when category changes
            }}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-pink-500"
          >
            <option value="all">All 7 Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Franchise Selector */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Franchise / Series:
          </label>
          <select
            value={franchiseFilter}
            onChange={(e) => setFranchiseFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-pink-500"
          >
            <option value="all">All Franchises ({availableFranchises.length})</option>
            {availableFranchises.map((f, i) => (
              <option key={i} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Quick Character Search:
          </label>
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search by name, role or abilities..."
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
          />
        </div>

      </div>

      {/* Characters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCharacters.map(char => {
          const bookmarked = isBookmarked(char.id);
          return (
            <div
              key={char.id}
              onClick={() => setActiveCharacterModal(char)}
              className="group relative rounded-2xl bg-slate-900/70 border border-white/10 hover:border-pink-500/40 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-pink-500/10 flex flex-col justify-between"
            >
              {/* Image & Overlay */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/30" />

                {/* Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-pink-300 border border-pink-500/30 backdrop-blur-md">
                    {char.categoryId}
                  </span>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(char);
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

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-pink-300">
                    {char.franchise}
                  </p>
                  <h3 className="text-lg font-bold text-white group-hover:text-pink-200 transition-colors truncate">
                    {char.name}
                  </h3>
                </div>
              </div>

              {/* Bio & Abilities Preview */}
              <div className="p-4 space-y-3 bg-slate-950/80 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {char.biography}
                  </p>

                  <div className="mt-2 text-[11px] text-slate-300">
                    <span className="text-slate-500 font-semibold">Role: </span>
                    <span className="truncate">{char.traits.role}</span>
                  </div>
                </div>

                {/* Power Bar & CTA */}
                <div className="pt-2 border-t border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span>Power Rating</span>
                    </span>
                    <span className="text-amber-400 font-mono font-bold">
                      {char.traits.powerLevel}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-pink-500"
                      style={{ width: `${char.traits.powerLevel}%` }}
                    />
                  </div>

                  <div className="pt-1 flex items-center justify-end text-xs font-semibold text-pink-400 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Profile</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
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
