import React, { useState } from 'react';
import { X, Bookmark, Clock, User, Calendar, Share2, Sparkles, ArrowRight } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const ArticleDetailModal = () => {
  const { 
    activeArticleModal, 
    setActiveArticleModal, 
    articles,
    isBookmarked, 
    toggleBookmark,
    sessionNotes,
    saveSessionNote
  } = useFandom();

  const [noteInput, setNoteInput] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  if (!activeArticleModal) return null;

  const article = activeArticleModal;
  const bookmarked = isBookmarked(article.id);
  const currentNote = sessionNotes[article.id] || '';

  // Related suggestions: other articles in the same category
  const relatedArticles = articles
    .filter(a => a.categoryId === article.categoryId && a.id !== article.id)
    .slice(0, 2);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setActiveArticleModal(null)}
    >
      <div 
        className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-white/15 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {article.categoryId.toUpperCase()} FEATURE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10"
              title="Copy Article Link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleBookmark(article)}
              className={`p-2 rounded-xl border transition-all ${
                bookmarked
                  ? 'bg-rose-500 text-white border-rose-400'
                  : 'bg-slate-800 text-slate-300 hover:text-white border-white/10'
              }`}
              title={bookmarked ? "Remove Bookmark" : "Add to Bookmarks"}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => setActiveArticleModal(null)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-white/10"
              aria-label="Close Article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="max-h-[75vh] overflow-y-auto">
          {/* Hero Banner */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <span className="flex items-center space-x-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{article.author}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{article.date}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{article.readTime}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="p-6 sm:p-10 space-y-8">
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-sm leading-relaxed italic">
              "{article.excerpt}"
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 text-base leading-relaxed space-y-4 whitespace-pre-line">
              {article.content}
            </div>

            {/* Tags */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Tags:
              </span>
              {article.tags.map((t, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-indigo-300 border border-white/5 font-medium">
                  #{t}
                </span>
              ))}
            </div>

            {/* Session Notes attachment */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Article Reading Notes (Session Only)</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  defaultValue={currentNote}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Note down favorite quotes or research points..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => saveSessionNote(article.id, noteInput)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
                >
                  Save Note
                </button>
              </div>
            </div>

            {/* Related Content Suggestions (Mandated by SRS Page 10) */}
            {relatedArticles.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                    Related Content Suggestions
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedArticles.map(rel => (
                    <div
                      key={rel.id}
                      onClick={() => setActiveArticleModal(rel)}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 hover:border-indigo-500/40 cursor-pointer transition-all hover:-translate-y-1 flex space-x-3 items-center group"
                    >
                      <img
                        src={rel.heroImage}
                        alt={rel.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="truncate flex-1">
                        <h5 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                          {rel.title}
                        </h5>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {rel.excerpt}
                        </p>
                        <span className="text-[10px] text-indigo-400 font-semibold flex items-center space-x-1 mt-1">
                          <span>Read Story</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
