import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  Sparkles, 
  Layers, 
  Users, 
  Video, 
  FileText, 
  Calendar, 
  ShoppingBag, 
  Image as ImageIcon,
  Rocket
} from 'lucide-react';
import { useFandom } from '../../context/FandomContext';
import { ContentCard } from './ContentCard';
import { GallerySection } from '../gallery/GallerySection';

export const CategoryHub = () => {
  const { 
    selectedCategory, 
    categories, 
    characters, 
    events, 
    articles, 
    media, 
    merchandise, 
    releases, 
    galleries,
    navigateTo 
  } = useFandom();

  const currentCategory = useMemo(() => {
    return categories.find(c => c.id === selectedCategory) || categories[0];
  }, [categories, selectedCategory]);

  const [activeTypeFilter, setActiveTypeFilter] = useState('all');
  const [activeSubtagFilter, setActiveSubtagFilter] = useState('all');
  const [sortOption, setSortOption] = useState('featured'); // 'featured', 'alpha-asc', 'alpha-desc', 'newest'

  // Aggregate all items belonging to this category
  const allCategoryItems = useMemo(() => {
    const catId = currentCategory.id;
    const items = [];

    // 1. Characters
    characters
      .filter(c => c.categoryId === catId)
      .forEach(c => {
        items.push({
          id: c.id,
          title: c.name,
          subtitle: c.series,
          description: c.biography,
          image: c.image,
          contentType: 'character',
          categoryId: catId,
          tags: [c.franchise, c.traits.role],
          popularity: c.traits.powerLevel || 90,
          date: '2026-01-01',
          rawData: c
        });
      });

    // 2. Articles
    articles
      .filter(a => a.categoryId === catId)
      .forEach(a => {
        items.push({
          id: a.id,
          title: a.title,
          subtitle: `${a.author} • ${a.readTime}`,
          description: a.excerpt,
          image: a.heroImage,
          contentType: 'article',
          categoryId: catId,
          tags: a.tags,
          popularity: 92,
          date: a.date,
          rawData: a
        });
      });

    // 3. Media (Trailers, Interviews, Podcasts)
    media
      .filter(m => m.categoryId === catId)
      .forEach(m => {
        items.push({
          id: m.id,
          title: m.title,
          subtitle: `${m.type.toUpperCase()} • ${m.duration}`,
          description: m.description,
          image: m.thumbnail,
          contentType: m.type === 'podcast' ? 'audio' : 'video',
          categoryId: catId,
          tags: [m.type, m.releaseStatus],
          popularity: parseInt(m.views, 10) || 88,
          date: '2026-02-01',
          rawData: m
        });
      });

    // 4. Events
    events
      .filter(e => e.categoryId === catId)
      .forEach(e => {
        items.push({
          id: e.id,
          title: e.title,
          subtitle: `${e.date} • ${e.location}`,
          description: e.description,
          image: e.image,
          contentType: 'event',
          categoryId: catId,
          tags: e.tags,
          popularity: 85,
          date: e.date,
          rawData: e
        });
      });

    // 5. Merchandise
    merchandise
      .filter(m => m.categoryId === catId)
      .forEach(m => {
        items.push({
          id: m.id,
          title: m.name,
          subtitle: `${m.franchise} • ${m.priceDisplay}`,
          description: m.description,
          image: m.image,
          contentType: 'merchandise',
          categoryId: catId,
          tags: [m.itemType, m.inStock ? 'In Stock' : 'Sold Out'],
          popularity: Math.round(m.rating * 20),
          date: '2026-01-15',
          rawData: m
        });
      });

    // 6. Releases
    releases
      .filter(r => r.categoryId === catId)
      .forEach(r => {
        items.push({
          id: r.id,
          title: r.title,
          subtitle: `${r.format} • ${r.releaseDate}`,
          description: r.description,
          image: r.image,
          contentType: 'release',
          categoryId: catId,
          tags: [r.format, r.status],
          popularity: r.hypeScore || 90,
          date: r.releaseDate,
          rawData: r
        });
      });

    return items;
  }, [currentCategory, characters, articles, media, events, merchandise, releases]);

  // Filter items by content type and sub-tags
  const filteredItems = useMemo(() => {
    return allCategoryItems.filter(item => {
      // Content type filter
      if (activeTypeFilter !== 'all' && item.contentType !== activeTypeFilter) {
        return false;
      }

      // Subtag filter
      if (activeSubtagFilter !== 'all') {
        const matchesTag = item.tags.some(t => t.toLowerCase() === activeSubtagFilter.toLowerCase());
        const matchesSubtitle = item.subtitle?.toLowerCase().includes(activeSubtagFilter.toLowerCase());
        if (!matchesTag && !matchesSubtitle) {
          return false;
        }
      }

      return true;
    });
  }, [allCategoryItems, activeTypeFilter, activeSubtagFilter]);

  // Sort items according to sortOption
  const sortedItems = useMemo(() => {
    const list = [...filteredItems];
    if (sortOption === 'alpha-asc') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'alpha-desc') {
      list.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === 'newest') {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      // 'featured' / popularity
      list.sort((a, b) => b.popularity - a.popularity);
    }
    return list;
  }, [filteredItems, sortOption]);

  const typeFilterTabs = [
    { id: 'all', label: 'All Content', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'character', label: 'Characters', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'video', label: 'Videos', icon: <Video className="w-3.5 h-3.5" /> },
    { id: 'article', label: 'Articles', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'event', label: 'Events', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'merchandise', label: 'Merch', icon: <ShoppingBag className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="space-y-12 pb-20">
      
      {/* Category Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src={currentCategory.heroImage}
            alt={currentCategory.name}
            className="w-full h-full object-cover filter brightness-[0.25] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-t ${currentCategory.gradient}`} />
        </div>

        <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${currentCategory.badgeColor}`}>
              Fandom Realm #{categories.findIndex(c => c.id === currentCategory.id) + 1}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {allCategoryItems.length} Curated Artifacts
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            {currentCategory.name} Universe
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {currentCategory.description}
          </p>

          {/* Quick Sub-tag buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sub-Genres:</span>
            </span>
            <button
              onClick={() => setActiveSubtagFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                activeSubtagFilter === 'all'
                  ? 'bg-white text-slate-950 font-bold shadow'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              All Sub-Tags
            </button>
            {currentCategory.subtags.map((sub, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSubtagFilter(sub)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeSubtagFilter.toLowerCase() === sub.toLowerCase()
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter & Sorting Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-xl">
        
        {/* Type Filter Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto whitespace-nowrap scrollbar-none pb-1 lg:pb-0">
          {typeFilterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTypeFilter(tab.id)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTypeFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center space-x-2 shrink-0">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Sort By:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="featured">Featured / Popularity</option>
            <option value="alpha-asc">Alphabetical (A - Z)</option>
            <option value="alpha-desc">Alphabetical (Z - A)</option>
            <option value="newest">Newest Releases</option>
          </select>
        </div>
      </div>

      {/* Catalog Grid */}
      {sortedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedItems.map(item => (
            <ContentCard key={`${item.contentType}-${item.id}`} item={item} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl bg-slate-900/40 border border-white/5">
          <p className="text-slate-400 text-sm">No items found matching the selected filters.</p>
          <button
            onClick={() => { setActiveTypeFilter('all'); setActiveSubtagFilter('all'); }}
            className="mt-3 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Category Dedicated Image Gallery Section with Lightbox */}
      <div className="pt-8">
        <GallerySection categoryFilter={currentCategory.id} title={`${currentCategory.name} Image Gallery`} />
      </div>

    </div>
  );
};
