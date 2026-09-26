import React from 'react';
import { 
  Bookmark, 
  Play, 
  Headphones, 
  FileText, 
  User, 
  Calendar, 
  ShoppingBag, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const ContentCard = ({ item }) => {
  const { 
    isBookmarked, 
    toggleBookmark,
    setActiveCharacterModal,
    setActiveArticleModal,
    setActiveVideoModal,
    setActiveAudioTrack,
    setActiveProductModal,
    setActiveLightbox,
    galleries
  } = useFandom();

  const bookmarked = isBookmarked(item.id);

  // Type badge icon and styling
  const getTypeBadge = () => {
    switch (item.contentType) {
      case 'character':
        return { label: 'Character', icon: <User className="w-3 h-3" />, color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' };
      case 'video':
        return { label: 'Video Trailer', icon: <Play className="w-3 h-3" />, color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' };
      case 'audio':
        return { label: 'Audio Podcast', icon: <Headphones className="w-3 h-3" />, color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' };
      case 'article':
        return { label: 'Article', icon: <FileText className="w-3 h-3" />, color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' };
      case 'event':
        return { label: 'Event', icon: <Calendar className="w-3 h-3" />, color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'merchandise':
        return { label: 'Merchandise', icon: <ShoppingBag className="w-3 h-3" />, color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 'gallery':
        return { label: 'Gallery', icon: <Sparkles className="w-3 h-3" />, color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      default:
        return { label: 'Content', icon: <FileText className="w-3 h-3" />, color: 'bg-slate-500/20 text-slate-300 border-slate-500/30' };
    }
  };

  const badge = getTypeBadge();

  // Handle card click according to content type
  const handleCardClick = () => {
    if (item.contentType === 'character') {
      setActiveCharacterModal(item.rawData);
    } else if (item.contentType === 'article') {
      setActiveArticleModal(item.rawData);
    } else if (item.contentType === 'video') {
      setActiveVideoModal({
        title: item.title,
        videoUrl: item.rawData.videoUrl
      });
    } else if (item.contentType === 'audio') {
      setActiveAudioTrack(item.rawData);
    } else if (item.contentType === 'merchandise') {
      setActiveProductModal(item.rawData);
    } else if (item.contentType === 'gallery') {
      const catGalleries = galleries.filter(g => g.categoryId === item.categoryId);
      const index = catGalleries.findIndex(g => g.id === item.id);
      setActiveLightbox({
        items: catGalleries,
        currentIndex: index >= 0 ? index : 0
      });
    }
  };

  return (
    <div className="group relative rounded-2xl bg-slate-900/70 border border-white/10 hover:border-white/20 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 flex flex-col justify-between">
      
      {/* Thumbnail */}
      <div 
        onClick={handleCardClick}
        className="relative h-48 w-full overflow-hidden cursor-pointer bg-slate-950"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

        {/* Floating Content Type Badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-md">
          <span className={`flex items-center space-x-1 ${badge.color}`}>
            {badge.icon}
            <span>{badge.label}</span>
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(item.rawData || item);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
            bookmarked 
              ? 'bg-rose-500 text-white shadow-rose-500/30' 
              : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/10'
          }`}
          aria-label={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
          title={bookmarked ? "Bookmarked (Saved in LocalStorage)" : "Add to Bookmarks"}
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Action Overlay for Videos/Audio */}
        {item.contentType === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
          </div>
        )}

        {item.contentType === 'audio' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-cyan-600/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              <Headphones className="w-5 h-5 ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {item.subtitle && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 truncate">
              {item.subtitle}
            </p>
          )}

          <h4 
            onClick={handleCardClick}
            className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1 cursor-pointer"
          >
            {item.title}
          </h4>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Tags & Action Row */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 max-w-[70%]">
            {item.tags && item.tags.slice(0, 2).map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-white/5 truncate"
              >
                #{tag}
              </span>
            ))}
          </div>

          <button
            onClick={handleCardClick}
            className="text-xs font-semibold text-slate-300 hover:text-white flex items-center space-x-1 shrink-0 group-hover:translate-x-0.5 transition-transform"
          >
            <span>View</span>
            <ExternalLink className="w-3 h-3 text-indigo-400" />
          </button>
        </div>
      </div>

    </div>
  );
};
