import React from 'react';
import { Sparkles, Shield, Heart, ExternalLink } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const Footer = () => {
  const { categories, navigateTo, setIsSearchOpen, setIsBookmarksOpen } = useFandom();

  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/90 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => navigateTo('home')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400 group-hover:text-pink-400 transition-colors" />
                </div>
              </div>
              <span className="text-xl font-black text-white">
                FANDOM<span className="text-pink-400">VERSE</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier centralized portal uniting fan communities across Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga. Built as a high-performance Single Page Application (SPA).
            </p>
            <div className="pt-2 flex items-center space-x-2 text-[11px] text-indigo-400 font-semibold">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>TechWiz 7 • Web Innovation Unleashed • Aptech Limited</span>
            </div>
          </div>

          {/* Categories Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Category Hubs
            </h4>
            <ul className="space-y-2.5">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => navigateTo('category', c.id)}
                    className="hover:text-white transition-colors duration-150 flex items-center space-x-1"
                  >
                    <span>{c.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cross-Category Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Portal Features
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigateTo('characters')} className="hover:text-white transition-colors">
                  Character Dossiers (35+)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('media')} className="hover:text-white transition-colors">
                  Trailers & Audio Hub
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('articles')} className="hover:text-white transition-colors">
                  Featured Articles
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('events')} className="hover:text-white transition-colors">
                  Conventions & Events (21+)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('releases')} className="hover:text-white transition-colors">
                  Upcoming Release Radar
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('merchandise')} className="hover:text-white transition-colors">
                  Merchandise Showcase & Cart
                </button>
              </li>
            </ul>
          </div>

          {/* Information & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Project & Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  About Team & Tech Stack
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact Us & GPS Map
                </button>
              </li>
              <li>
                <button onClick={() => setIsBookmarksOpen(true)} className="hover:text-white transition-colors">
                  Saved Bookmarks & Notes
                </button>
              </li>
              <li>
                <button onClick={() => setIsSearchOpen(true)} className="hover:text-white transition-colors">
                  Global Search Discovery
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner & Aptech Limited Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© Aptech Limited. All rights reserved. Built for TechWiz 7 Championship.</p>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Fandom Enthusiasts Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
