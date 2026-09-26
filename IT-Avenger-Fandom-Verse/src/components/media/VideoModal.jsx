import React from 'react';
import { X, ExternalLink, Play } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const VideoModal = () => {
  const { activeVideoModal, setActiveVideoModal } = useFandom();

  if (!activeVideoModal) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={() => setActiveVideoModal(null)}
    >
      <div 
        className="relative w-full max-w-5xl rounded-3xl bg-slate-950 border border-white/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/90">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <h3 className="text-sm font-bold text-white truncate max-w-xl">
              {activeVideoModal.title}
            </h3>
          </div>

          <button
            onClick={() => setActiveVideoModal(null)}
            className="p-2 rounded-xl bg-slate-850 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 transition-colors"
            aria-label="Close Trailer Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Embed Frame */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`${activeVideoModal.videoUrl}?autoplay=1&rel=0`}
            title={activeVideoModal.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Description Footer */}
        {activeVideoModal.description && (
          <div className="p-4 bg-slate-950 text-xs text-slate-400 border-t border-white/5">
            <p>{activeVideoModal.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};
