import React, { useState } from 'react';
import { Bookmark, X, Download, Trash2, Edit3, Check, FileText, Sparkles, User, Video, Calendar, ShoppingBag } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const BookmarksDrawer = () => {
  const { 
    bookmarks, 
    isBookmarksOpen, 
    setIsBookmarksOpen, 
    toggleBookmark, 
    sessionNotes, 
    saveSessionNote, 
    exportBookmarks,
    setActiveCharacterModal,
    setActiveArticleModal,
    setActiveVideoModal,
    characters,
    articles,
    media
  } = useFandom();

  const [activeTab, setActiveTab] = useState('all');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState('');

  if (!isBookmarksOpen) return null;

  const filteredBookmarks = activeTab === 'all'
    ? bookmarks
    : bookmarks.filter(b => b.type === activeTab);

  const startEditNote = (id) => {
    setEditingNoteId(id);
    setNoteText(sessionNotes[id] || '');
  };

  const saveNote = (id) => {
    saveSessionNote(id, noteText);
    setEditingNoteId(null);
  };

  const handleItemClick = (item) => {
    if (item.type === 'character') {
      const found = characters.find(c => c.id === item.id);
      if (found) {
        setActiveCharacterModal(found);
        setIsBookmarksOpen(false);
      }
    } else if (item.type === 'article') {
      const found = articles.find(a => a.id === item.id);
      if (found) {
        setActiveArticleModal(found);
        setIsBookmarksOpen(false);
      }
    } else if (item.type === 'video' || item.type === 'trailer') {
      const found = media.find(m => m.id === item.id);
      if (found) {
        setActiveVideoModal({ title: found.title, videoUrl: found.videoUrl });
        setIsBookmarksOpen(false);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsBookmarksOpen(false)}
    >
      <div 
        className="w-full max-w-md h-full bg-slate-950 border-l border-white/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-slate-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Saved Bookmarks & Notes
              </h3>
              <p className="text-[11px] text-slate-400">
                {bookmarks.length} favorites saved in LocalStorage
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsBookmarksOpen(false)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 transition-colors"
            aria-label="Close Bookmarks"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SRS Specification Alert */}
        <div className="mx-5 mt-4 p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-1">
          <p className="text-[11px] text-slate-300">
            • <strong>Bookmarks:</strong> Stored permanently in browser <em>LocalStorage</em>.<br/>
            • <strong>Personal Notes:</strong> Kept safely for current browser session via <em>SessionStorage</em>.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="px-5 pt-3 flex items-center space-x-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
          {['all', 'character', 'article', 'video', 'event'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'all' ? 'All' : tab}
            </button>
          ))}
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {filteredBookmarks.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-slate-600 mx-auto flex items-center justify-center">
                <Bookmark className="w-7 h-7" />
              </div>
              <p className="text-sm font-semibold text-slate-300">No bookmarks saved yet</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the bookmark icon on any character, trailer, article, or event to save it here!
              </p>
            </div>
          ) : (
            filteredBookmarks.map(b => {
              const note = sessionNotes[b.id];
              const isEditing = editingNoteId === b.id;

              return (
                <div 
                  key={b.id}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-3"
                >
                  <div className="flex space-x-3 items-center">
                    <img
                      src={b.image}
                      alt={b.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-950 cursor-pointer"
                      onClick={() => handleItemClick(b)}
                    />

                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-1.5">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-950 text-indigo-300 border border-white/10">
                          {b.type}
                        </span>
                        <span className="text-[10px] text-slate-500 capitalize">{b.categoryId}</span>
                      </div>

                      <h4 
                        onClick={() => handleItemClick(b)}
                        className="text-xs font-bold text-white truncate cursor-pointer hover:text-indigo-300 transition-colors mt-0.5"
                      >
                        {b.title}
                      </h4>

                      {b.subtitle && (
                        <p className="text-[10px] text-slate-400 truncate">
                          {b.subtitle}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => toggleBookmark(b)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Personal Session Note Section */}
                  <div className="pt-2 border-t border-white/5">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Write session note..."
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          onClick={() => saveNote(b.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] bg-slate-950/60 p-2 rounded-xl border border-white/5">
                        <span className="text-slate-400 truncate italic max-w-[260px]">
                          {note ? `"${note}"` : 'No personal note attached'}
                        </span>
                        <button
                          onClick={() => startEditNote(b.id)}
                          className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{note ? 'Edit' : '+ Note'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Export Formatted List Button */}
        {bookmarks.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-slate-900/90 space-y-2">
            <button
              onClick={exportBookmarks}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-br from-[#030303] via-[#160812] to-[#db2777] text-white font-bold text-xs shadow-lg shadow-rose-600/20 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Bookmarks as Formatted List (.md)</span>
            </button>
            <p className="text-[10px] text-center text-slate-500">
              Generates a Markdown file with titles, categories, dates, and session notes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
