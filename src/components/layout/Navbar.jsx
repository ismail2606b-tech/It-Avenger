import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Bookmark, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  Compass,
  Film,
  Gamepad2,
  Tv,
  Music,
  BookOpen,
  Calendar,
  ShoppingBag,
  Flame,
  Info,
  Mail
} from 'lucide-react';
import { useFandom } from '../../context/FandomContext';
import { RealTimeClock } from './RealTimeClock';
import { VisitorCounter } from '../home/VisitorCounter';

export const Navbar = () => {
  const { 
    activeTab, 
    selectedCategory, 
    navigateTo, 
    categories, 
    bookmarks, 
    cartCalculations, 
    setIsBookmarksOpen, 
    setIsCartOpen, 
    setIsSearchOpen,
    user,
    setIsAuthModalOpen,
    logout
  } = useFandom();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4 text-rose-400" />;
      case 'Gamepad2': return <Gamepad2 className="w-4 h-4 text-emerald-400" />;
      case 'Film': return <Film className="w-4 h-4 text-amber-400" />;
      case 'Tv': return <Tv className="w-4 h-4 text-indigo-400" />;
      case 'Music': return <Music className="w-4 h-4 text-pink-400" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-yellow-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-purple-400" />;
      default: return <Compass className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-xl shadow-2xl transition-all">
      {/* Top Utility Bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-slate-900/60 border-b border-white/5 text-xs text-slate-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 text-indigo-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>TechWiz 7 Aptech World Tech Championship Edition</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Theme: Fandom Universe</span>
        </div>
        <div className="flex items-center space-x-4">
          <VisitorCounter compact={true} />
          <RealTimeClock />
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 transform group-hover:scale-105">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 group-hover:text-pink-400 transition-colors animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:via-purple-300 group-hover:to-pink-400 transition-all">
                  FANDOM<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">VERSE</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-extrabold text-cyan-400 bg-cyan-950/70 border border-cyan-500/40 rounded">
                 FDV
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                Portal for Fandom World
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'home' 
                  ? 'text-white bg-white/10 shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                onBlur={() => setTimeout(() => setCategoryDropdownOpen(false), 200)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'category' 
                    ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/20' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Category</span>
                <ChevronDown className="w-4 h-4 opacity-70 transition-transform duration-200" />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-slate-900/95 border border-white/15 p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-white/5">
                    The 7 Fandom Realms
                  </div>
                  <div className="grid grid-cols-1 gap-1 mt-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          navigateTo('category', cat.id);
                          setCategoryDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                          selectedCategory === cat.id && activeTab === 'category'
                            ? 'bg-indigo-600/30 text-white border border-indigo-500/40'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          {getCategoryIcon(cat.icon)}
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 group-hover:text-slate-400">
                          Hub →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('characters')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'characters' 
                  ? 'text-white bg-white/10' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Characters
            </button>

            <button
              onClick={() => navigateTo('media')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'media' 
                  ? 'text-white bg-white/10' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Trailers
            </button>

            <button
              onClick={() => navigateTo('articles')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'articles' 
                  ? 'text-white bg-white/10' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Articles
            </button>

            <button
              onClick={() => navigateTo('events')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'events' 
                  ? 'text-white bg-white/10' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Events
            </button>

            <button
              onClick={() => navigateTo('releases')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'releases' 
                  ? 'text-white bg-white/10' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Releases
            </button>

            <button
              onClick={() => navigateTo('merchandise')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'merchandise' 
                  ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30' 
                  : 'text-slate-300 hover:text-amber-300 hover:bg-amber-500/5'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Merch</span>
            </button>

            <button
              onClick={() => navigateTo('about')}
              className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'about' 
                  ? 'text-white bg-white/10' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              About
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'contact' 
                  ? 'text-white bg-white/10' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action Tools (Search, Bookmarks, Cart, Auth) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="flex items-center space-x-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white transition-all shadow-sm group"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              <span className="hidden md:inline text-xs text-slate-400 group-hover:text-slate-200">
                Search...
              </span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-950 rounded border border-slate-800">
                ⌘K
              </kbd>
            </button>

            {/* Bookmarks Toggle */}
            <button
              onClick={() => setIsBookmarksOpen(true)}
              aria-label="Bookmarks"
              className="relative p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-indigo-400 transition-all shadow-sm"
              title="View Bookmarks & Session Notes"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[10px] font-bold border-2 border-slate-950 shadow-md animate-bounce">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Toggle */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-amber-400 transition-all shadow-sm"
              title="Temporary Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCalculations.totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black border-2 border-slate-950 shadow-md">
                  {cartCalculations.totalItems}
                </span>
              )}
            </button>

            {/* Dummy Login / Sign Up UI per SRS Page 14 */}
            <div className="relative">
              {user.loggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    onBlur={() => setTimeout(() => setUserDropdownOpen(false), 200)}
                    className="flex items-center space-x-2 p-1 pl-2 pr-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-indigo-500/30 text-xs font-semibold text-white transition-all shadow-sm"
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.username} 
                      className="w-6 h-6 rounded-full object-cover border border-indigo-400"
                    />
                    <span className="hidden sm:inline max-w-[90px] truncate">{user.username}</span>
                  </button>
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-white/15 p-2 shadow-2xl backdrop-blur-xl z-50">
                      <div className="px-3 py-2 border-b border-white/10 text-xs">
                        <p className="font-semibold text-white">{user.username}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={logout}
                        className="w-full text-left px-3 py-2 mt-1 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        Sign Out (Guest)
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <RealTimeClock />
            <VisitorCounter compact={true} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left ${activeTab === 'home' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300'}`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => { navigateTo('characters'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left ${activeTab === 'characters' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300'}`}
            >
              🧑 Character Profiles
            </button>
            <button
              onClick={() => { navigateTo('media'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left ${activeTab === 'media' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300'}`}
            >
              🎬 Trailers & Audio
            </button>
            <button
              onClick={() => { navigateTo('articles'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left ${activeTab === 'articles' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300'}`}
            >
              📰 Featured Articles
            </button>
            <button
              onClick={() => { navigateTo('events'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left ${activeTab === 'events' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300'}`}
            >
              📅 Events Calendar
            </button>
            <button
              onClick={() => { navigateTo('releases'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left ${activeTab === 'releases' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300'}`}
            >
              🚀 Release Radar
            </button>
            <button
              onClick={() => { navigateTo('merchandise'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left ${activeTab === 'merchandise' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-amber-400'}`}
            >
              🛍 Fan Merchandise
            </button>
            <button
              onClick={() => { navigateTo('about'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left ${activeTab === 'about' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300'}`}
            >
              ℹ️ About TechWiz
            </button>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Explore 7 Fandom Categories
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    navigateTo('category', c.id);
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-xl bg-slate-900 border border-white/5 text-xs text-left text-slate-300 hover:text-white flex items-center space-x-2"
                >
                  {getCategoryIcon(c.icon)}
                  <span className="truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
