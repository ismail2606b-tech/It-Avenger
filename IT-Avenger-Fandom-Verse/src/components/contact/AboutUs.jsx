import React from 'react';
import { Shield, Sparkles, Code2, Users, Cpu, Trophy, CheckCircle2, Award, Zap } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const AboutUs = () => {
  const { teamInfo } = useFandom();
  const { project, teamMembers, techStack } = teamInfo;

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header & Mission */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>{project.competition}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          About FandomVerse
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {project.mission}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
            Theme: {project.theme}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-950/80 text-pink-300 border border-pink-500/30">
            Category: {project.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
            Version: {project.version}
          </span>
        </div>
      </div>

      {/* Engineering Philosophy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Client-Side Architecture</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Engineered strictly without server-side databases or backend APIs as required by the SRS constraints. All datasets are loaded instantly via optimized pre-populated JSON files.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Single Page Application (SPA)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Zero-latency transitions across category hubs, character profiles, 4K media trailers, and event calendars, maintaining fluid state without browser reloads.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Dual Storage Persistence</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Permanent user bookmarks and simulated visitor telemetry persist in browser <em>LocalStorage</em>, while personal notes remain exclusively in <em>SessionStorage</em>.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-widest">
            <Users className="w-4 h-4" />
            <span>Development Roster</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            The Minds Behind FandomVerse
          </h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            A multidisciplinary development collective dedicated to delivering world-class web innovation for the Aptech TechWiz 7 championship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4 text-center group hover:border-indigo-500/40 transition-all hover:-translate-y-1.5"
            >
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden mx-auto border-2 border-indigo-500/40 shadow-xl group-hover:scale-105 transition-transform">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {member.name}
                </h4>
                <p className="text-[11px] font-semibold text-indigo-400 mt-0.5">
                  {member.role}
                </p>
              </div>

              {/* <p className="text-xs text-slate-400 leading-relaxed">
                {member.bio}
              </p> */}
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack Specifications */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-bold text-white">{tech.name}</h5>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {tech.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {tech.role}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
