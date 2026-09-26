import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Headphones, Radio, Sparkles } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const AudioPlayer = () => {
  const { activeAudioTrack, setActiveAudioTrack, isPlayingAudio, setIsPlayingAudio } = useFandom();
  const audioRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (activeAudioTrack && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        setIsPlayingAudio(false);
      });
    }
  }, [activeAudioTrack]);

  if (!activeAudioTrack) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-slate-950/95 backdrop-blur-2xl border-t border-indigo-500/30 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <audio
        ref={audioRef}
        src={activeAudioTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlayingAudio(false)}
      />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Track Info */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-white/10 shrink-0">
            <img
              src={activeAudioTrack.thumbnail}
              alt={activeAudioTrack.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>

          <div className="truncate flex-1">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                Fandom Podcast Live
              </span>
            </div>
            <h4 className="text-xs font-bold text-white truncate max-w-xs sm:max-w-sm">
              {activeAudioTrack.title}
            </h4>
            <p className="text-[11px] text-slate-400 truncate">
              Hosted by {activeAudioTrack.host || 'Fandom Radio'}
            </p>
          </div>
        </div>

        {/* Center Controls & Progress Bar */}
        <div className="flex-1 max-w-xl w-full flex flex-col items-center space-y-1.5">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
              aria-label={isPlayingAudio ? "Pause" : "Play"}
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
          </div>

          <div className="w-full flex items-center space-x-3 text-[11px] text-slate-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Tools (Mute & Close) */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <button
            onClick={toggleMute}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-white/10"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              setActiveAudioTrack(null);
            }}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-rose-400 border border-white/10"
            title="Close Audio Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
