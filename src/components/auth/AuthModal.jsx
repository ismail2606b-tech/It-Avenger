import React, { useState } from 'react';
import { X, User, Lock, Mail, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useFandom();

  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [username, setUsername] = useState('CosmicFan');
  const [email, setEmail] = useState('fan@fandomverse.org');
  const [password, setPassword] = useState('password123');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, email);
  };

  const handleQuickLogin = (name, mail) => {
    login(name, mail);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div 
        className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-white/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <User className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-white">
              {activeTab === 'login' ? 'Fan Traveler Sign In' : 'Create Fan Profile'}
            </span>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            aria-label="Close Auth Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SRS Constraint Notice */}
        <div className="mx-6 mt-4 p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs flex items-start space-x-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Fandon Auth Portal</strong></p>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4 flex space-x-2">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'login'
                ? 'bg-pink-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'signup'
                ? 'bg-pink-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            Register UI
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {activeTab === 'signup' && (
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Fandom Nickname:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. TanjiroFan99"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Email Address:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@universe.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Password:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-black-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-pink-600/30 active:scale-95 transition-all mt-2"
          >
            {activeTab === 'login' ? 'Sign In as Guest Fan' : 'Create Simulated Account'}
          </button>

          {/* Quick 1-click test profiles */}
          <div className="pt-2 text-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2">
              Or Try One-Click Preset Profiles:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('GojoSensei', 'gojo@jjk.fandom')}
                className="flex-1 py-1.5 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-[11px] font-medium text-slate-300 border border-white/5"
              >
                Gojo Fan
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('BlinkArmy', 'kpop@fandomverse.org')}
                className="flex-1 py-1.5 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-[11px] font-medium text-pink-300 border border-white/5"
              >
                K-Pop Stan
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('TarnishedLord', 'elden@landsbetween.com')}
                className="flex-1 py-1.5 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-[11px] font-medium text-emerald-300 border border-white/5"
              >
                Gamer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
