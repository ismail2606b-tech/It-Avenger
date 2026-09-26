import React, { useState } from 'react';
import { X, Bookmark, Zap, Quote, Mic, Trophy, Shield, Sparkles, BookOpen } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const CharacterDetailModal = () => {
  const { 
    activeCharacterModal, 
    setActiveCharacterModal, 
    isBookmarked, 
    toggleBookmark,
    sessionNotes,
    saveSessionNote
  } = useFandom();

  const [noteInput, setNoteInput] = useState('');
  const [showNoteSaved, setShowNoteSaved] = useState(false);

  if (!activeCharacterModal) return null;

  const char = activeCharacterModal;
  const bookmarked = isBookmarked(char.id);
  const currentNote = sessionNotes[char.id] || '';

  const handleSaveNote = () => {
    saveSessionNote(char.id, noteInput);
    setShowNoteSaved(true);
    setTimeout(() => setShowNoteSaved(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setActiveCharacterModal(null)}
    >
      <div 
        className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-white/15 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-pink-500/20 text-pink-300 border border-pink-500/30">
              {char.categoryId.toUpperCase()} DOSSIER
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ID: {char.id}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleBookmark(char)}
              className={`p-2 rounded-xl border transition-all ${
                bookmarked
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30'
                  : 'bg-slate-800 text-slate-300 hover:text-white border-white/10'
              }`}
              title={bookmarked ? "Remove Bookmark" : "Add to Bookmarks"}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => setActiveCharacterModal(null)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-white/10"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 max-h-[75vh] overflow-y-auto">
          
          {/* Left Column: Portrait & Stats */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-slate-950 aspect-[3/4]">
              <img
                src={char.image}
                alt={char.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-pink-300">
                  {char.franchise}
                </span>
              </div>
            </div>

            {/* Power Level Meter */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1.5 text-slate-400 font-semibold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Influence / Combat Rating</span>
                </span>
                <span className="text-amber-400 font-mono font-bold">
                  {char.traits.powerLevel} / 100
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-1000"
                  style={{ width: `${char.traits.powerLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Detailed Traits */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1">
                {char.series}
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {char.name}
              </h2>
            </div>

            {/* Quote Callout */}
            {char.traits.quote && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 relative">
                <Quote className="w-6 h-6 text-indigo-400/40 absolute top-3 left-3 -scale-x-100" />
                <p className="text-sm italic text-indigo-200 pl-6 leading-relaxed">
                  "{char.traits.quote}"
                </p>
              </div>
            )}

            {/* Biography */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Character Dossier & Lore</span>
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {char.biography}
              </p>
            </div>

            {/* Traits Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Role / Affiliation
                </span>
                <span className="text-xs font-medium text-slate-200">
                  {char.traits.role}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Voice Actor / Creator
                </span>
                <span className="text-xs font-medium text-slate-200 flex items-center space-x-1">
                  <Mic className="w-3 h-3 text-pink-400 shrink-0" />
                  <span className="truncate">{char.traits.voiceActor}</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1 sm:col-span-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Key Abilities & Techniques
                </span>
                <span className="text-xs font-medium text-indigo-300">
                  {char.traits.abilities}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  First Debut
                </span>
                <span className="text-xs font-medium text-slate-300">
                  {char.traits.debut}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Universe Category
                </span>
                <span className="text-xs font-medium text-slate-300 capitalize">
                  {char.categoryId}
                </span>
              </div>
            </div>

            {/* Session Notes Feature (Stored in SessionStorage per SRS) */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>Attach Personal Note (Current Browser Session)</span>
                </label>
                {showNoteSaved && (
                  <span className="text-[10px] text-emerald-400 font-bold animate-pulse">
                    ✓ Saved to SessionStorage!
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  defaultValue={currentNote}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="e.g. Favorite fight, read chapter 45 next, or power level theory..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleSaveNote}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-md"
                >
                  Save Note
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
