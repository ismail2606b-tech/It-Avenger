import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Ticket, Clock, CheckCircle2, Bookmark, ExternalLink, Navigation } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const EventHighlights = () => {
  const { events, categories, isBookmarked, toggleBookmark, navigateTo } = useFandom();

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'upcoming', 'past'

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchCat = categoryFilter === 'all' || e.categoryId === categoryFilter;
      const matchStatus = statusFilter === 'all' || e.status === statusFilter;
      return matchCat && matchStatus;
    });
  }, [events, categoryFilter, statusFilter]);

  // Calculate days remaining for upcoming events
  const getDaysRemaining = (eventDate) => {
    const today = new Date('2026-09-25');
    const target = new Date(eventDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1.5">
            <Calendar className="w-4 h-4" />
            <span>Worldwide Conventions & Meetups (21+ Events)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Event Highlights & Fandom Calendar
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Track major global anime expos, gaming showcases, San Diego Comic-Con, K-Pop stadium tours, and midnight watch parties.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          {filteredEvents.length} Events Listed
        </div>
      </div>

      {/* Filter Matrix */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
        
        {/* Status Toggle Pills */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setStatusFilter('upcoming')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === 'upcoming'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setStatusFilter('past')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === 'past'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            Past Archives
          </button>
        </div>

        {/* Category Realm Dropdown */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Category:
          </span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-60 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All 7 Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => {
          const bookmarked = isBookmarked(event.id);
          const isUpcoming = event.status === 'upcoming';
          const days = getDaysRemaining(event.date);

          return (
            <div
              key={event.id}
              className="group relative rounded-2xl bg-slate-900/70 border border-white/10 hover:border-emerald-500/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${
                    isUpcoming
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                      : 'bg-slate-900/80 text-slate-400 border-white/10'
                  }`}>
                    {isUpcoming ? 'Upcoming Event' : 'Archived Event'}
                  </span>
                  
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-slate-300 border border-white/10">
                    {event.categoryId}
                  </span>
                </div>

                {/* Bookmark Toggle */}
                <button
                  onClick={() => toggleBookmark(event)}
                  className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
                    bookmarked
                      ? 'bg-rose-500 text-white shadow-rose-500/30'
                      : 'bg-slate-950/70 text-slate-300 hover:text-white border border-white/10'
                  }`}
                  aria-label={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                </button>

                {/* Date Tag */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-semibold">
                  <div className="flex items-center space-x-1.5 bg-black/70 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{event.date}</span>
                  </div>

                  {isUpcoming && days > 0 && (
                    <div className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono">
                      In {days} Days
                    </div>
                  )}
                </div>
              </div>

              {/* Information Body */}
              <div className="p-5 space-y-3 bg-slate-950/90 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {event.title}
                  </h3>

                  <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-3 mt-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center space-x-1 text-slate-400">
                      <Ticket className="w-3.5 h-3.5 text-amber-400" />
                      <span>{event.admission}</span>
                    </span>

                    <span className="text-[10px] text-slate-500 font-mono">
                      GPS: {event.venueCoords.lat.toFixed(2)}, {event.venueCoords.lng.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-wrap gap-1">
                      {event.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => navigateTo('contact')}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
                      title="View on Map in Contact Us"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Map Location</span>
                    </button>
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
