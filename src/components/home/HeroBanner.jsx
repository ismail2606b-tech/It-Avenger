import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Compass, ArrowRight, ShieldCheck, Zap, Flame, Award } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';
import { VisitorCounter } from './VisitorCounter';

export const HeroBanner = () => {
  const { navigateTo, setActiveVideoModal } = useFandom();

  // Featured highlights slider
  const spotlights = [
    {
      title: "DEMON SLAYER",
      subtitle: "INFINITY CASTLE THEATRICAL TRILOGY",
      tag: "Anime Premiere",
      tagColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      description: "Tanjiro and the Hashira descend into Muzan's shifting fortress in a historic three-part cinema spectacle crafted by Ufotable.",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=85",
      category: "anime",
      embedId: "VQGCKyvzIM4"
    },
    {
      title: "ELDEN RING",
      subtitle: "SHADOW OF THE ERDTREE EXPANSION",
      tag: "GOTY Milestone",
      tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      description: "Follow the footsteps of Miquella the Kind into the Land of Shadow, battling legendary demigods and uncovering ancient mysteries.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=85",
      category: "gaming",
      embedId: "qLZenOn7WUo"
    },
    {
      title: "DUNE: PART TWO",
      subtitle: "THE PROPHET RISES ACROSS ARRAKIS",
      tag: "Sci-Fi Masterpiece",
      tagColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      description: "Denis Villeneuve's seismic cinematic vision unrolls in pristine IMAX 70mm, tracing Paul Atreides' path of holy galactic destiny.",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=85",
      category: "movies",
      embedId: "Way9Dexny3w"
    },
    {
      title: "STRANGER THINGS 5",
      subtitle: "THE FINAL CHAPTER IN HAWKINS",
      tag: "Prestige TV",
      tagColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
      description: "The Upside Down has cracked open into reality. Eleven and the party assemble for their heartbreaking final stand.",
      image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1600&q=85",
      category: "tv-shows",
      embedId: "b9EkMc79ZSU"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % spotlights.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [spotlights.length]);

  const activeSpotlight = spotlights[currentSlide];

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24">
      {/* Background Hero with dynamic cross-fade */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeSpotlight.image}
          alt={activeSpotlight.title}
          className="w-full h-full object-cover object-center filter brightness-[0.28] contrast-125 transition-all duration-1000 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Aptech TechWiz 7 World Tech Championship Showcase</span>
          </div>

          <VisitorCounter compact={false} />
        </div>

        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Animated Heading & Category Pill */}
            <div className="space-y-3">
              <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${activeSpotlight.tagColor}`}>
                {activeSpotlight.tag}
              </span>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none">
                {activeSpotlight.title}
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-400 mt-2">
                  {activeSpotlight.subtitle}
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {activeSpotlight.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('category', activeSpotlight.category)}
                className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 active:scale-95 transition-all group"
              >
                <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                <span>Explore {activeSpotlight.title} Hub</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveVideoModal({
                  title: `${activeSpotlight.title} - Official Spotlight Trailer`,
                  videoUrl: `https://www.youtube.com/embed/${activeSpotlight.embedId}`
                })}
                className="flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-white/15 backdrop-blur-md active:scale-95 transition-all group"
              >
                <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch 4K Trailer</span>
              </button>
            </div>

            {/* Slide Navigation Bullets */}
            <div className="flex items-center space-x-2 pt-4">
              {spotlights.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide 
                      ? 'w-8 bg-gradient-to-r from-indigo-500 to-pink-500 shadow-md' 
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
              <span className="text-xs text-slate-500 font-mono ml-2">
                0{currentSlide + 1} / 0{spotlights.length}
              </span>
            </div>

          </div>

          {/* Quick Stats Grid Sidecard */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Portal Telemetry</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  SPA Mode
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div 
                  onClick={() => navigateTo('category', 'anime')}
                  className="p-3 rounded-xl bg-slate-950/60 border border-white/5 hover:border-indigo-500/40 cursor-pointer transition-all group"
                >
                  <div className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">
                    7
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">Category Hubs</div>
                </div>

                <div 
                  onClick={() => navigateTo('characters')}
                  className="p-3 rounded-xl bg-slate-950/60 border border-white/5 hover:border-pink-500/40 cursor-pointer transition-all group"
                >
                  <div className="text-2xl font-black text-pink-400 group-hover:scale-105 transition-transform">
                    35+
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">Character Dossiers</div>
                </div>

                <div 
                  onClick={() => navigateTo('events')}
                  className="p-3 rounded-xl bg-slate-950/60 border border-white/5 hover:border-emerald-500/40 cursor-pointer transition-all group"
                >
                  <div className="text-2xl font-black text-emerald-400 group-hover:scale-105 transition-transform">
                    21+
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">Events & Cons</div>
                </div>

                <div 
                  onClick={() => navigateTo('media')}
                  className="p-3 rounded-xl bg-slate-950/60 border border-white/5 hover:border-amber-500/40 cursor-pointer transition-all group"
                >
                  <div className="text-2xl font-black text-amber-400 group-hover:scale-105 transition-transform">
                    4K
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">Trailers & Audio</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>No Backend Required</span>
                </span>
                <span className="text-indigo-400 font-semibold">100% Client-Side</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
