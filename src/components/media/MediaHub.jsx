import React, { useState, useMemo } from 'react';
import { Video, Play, Headphones, Film, Eye, Sparkles, Filter, Bookmark } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const MediaHub = () => {
  const { 
    media, 
    categories, 
    setActiveVideoModal, 
    setActiveAudioTrack, 
    isBookmarked, 
    toggleBookmark 
  } = useFandom();

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'trailer', 'interview', 'podcast', 'fan content'
  const [releaseStatusFilter, setReleaseStatusFilter] = useState('all'); // 'all', 'upcoming', 'recently-released'

  const filteredMedia = useMemo(() => {
    return media.filter(item => {
      const matchCat = categoryFilter === 'all' || item.categoryId === categoryFilter;
      const matchType = typeFilter === 'all' || item.type === typeFilter;
      const matchRelease = releaseStatusFilter === 'all' || item.releaseStatus === releaseStatusFilter;
      return matchCat && matchType && matchRelease;
    });
  }, [media, categoryFilter, typeFilter, releaseStatusFilter]);

  const handleItemClick = (item) => {
    if (item.type === 'podcast') {
      setActiveAudioTrack(item);
    } else {
      setActiveVideoModal({
        title: item.title,
        videoUrl: item.videoUrl,
        description: item.description
      });
    }
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-widest mb-1.5">
            <Film className="w-4 h-4" />
            <span>Trailers, Interviews & Podcast Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Media & Trailer Pavilion
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Stream official 4K theatrical trailers, developer and director interviews, fan tributes, and podcast-style deep dives.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          {filteredMedia.length} Media Artifacts Available
        </div>
      </div>

      {/* Filter Matrix Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
        
        {/* Category Realm */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Universe Category:
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-rose-500"
          >
            <option value="all">All 7 Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Media Type */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Content Classification:
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-rose-500"
          >
            <option value="all">All Types (Trailers, Audio, Interviews)</option>
            <option value="trailer">Official Trailers Only</option>
            <option value="interview">Creator & Director Interviews</option>
            <option value="podcast">Podcast Audio Clips</option>
            <option value="fan content">Fan Tributes & Breakdowns</option>
          </select>
        </div>

        {/* Release Status */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Release Status:
          </label>
          <select
            value={releaseStatusFilter}
            onChange={(e) => setReleaseStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-rose-500"
          >
            <option value="all">All Release Timelines</option>
            <option value="upcoming">Upcoming Anticipated Premieres</option>
            <option value="recently-released">Recently Released Drops</option>
          </select>
        </div>

      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map(item => {
          const isPodcast = item.type === 'podcast';
          const bookmarked = isBookmarked(item.id);

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="group relative rounded-2xl bg-slate-900/70 border border-white/10 hover:border-rose-500/40 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-rose-500/10 flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${
                    isPodcast 
                      ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30' 
                      : 'bg-rose-950/80 text-rose-300 border-rose-500/30'
                  }`}>
                    {item.type}
                  </span>
                  
                  {item.releaseStatus === 'upcoming' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Upcoming
                    </span>
                  )}
                </div>

                {/* Bookmark Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(item);
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

                {/* Play Button Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 transition-transform ${
                    isPodcast 
                      ? 'bg-cyan-600/90 shadow-cyan-500/30' 
                      : 'bg-rose-600/90 shadow-rose-500/30'
                  }`}>
                    {isPodcast ? (
                      <Headphones className="w-6 h-6 animate-pulse" />
                    ) : (
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    )}
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[10px] font-bold border border-white/10">
                  {item.duration}
                </div>
              </div>

              {/* Information Body */}
              <div className="p-4 space-y-3 bg-slate-950/90 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 mb-1">
                    <span className="uppercase font-semibold text-indigo-400">{item.categoryId}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3 h-3 text-slate-500" />
                      <span>{item.views} views</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">
                    {isPodcast ? `Host: ${item.host}` : '4K Ultra HD'}
                  </span>
                  <span className={`font-semibold ${isPodcast ? 'text-cyan-400' : 'text-rose-400'} flex items-center space-x-1`}>
                    <span>{isPodcast ? 'Listen Podcast' : 'Watch Trailer'}</span>
                    <span>→</span>
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
