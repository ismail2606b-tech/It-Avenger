import React from 'react';
import { Users } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const VisitorCounter = ({ compact = false }) => {
  const { visitorCount } = useFandom();

  // Pad the counter to 6 digits like an odometer
  const digits = String(visitorCount).padStart(6, '0').split('');

  if (compact) {
    return (
      <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
        <Users className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-slate-400 text-[11px] hidden md:inline">VISITORS:</span>
        <div className="flex space-x-0.5">
          {digits.map((digit, i) => (
            <span
              key={i}
              className="w-4 h-5 flex items-center justify-center bg-slate-950 text-emerald-400 font-mono font-bold text-[11px] rounded border border-emerald-950/80 shadow-inner"
            >
              {digit}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 shadow-lg shadow-emerald-500/5">
      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
        <Users className="w-5 h-5" />
      </div>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Simulated Portal Visitors
        </div>
        <div className="flex items-center space-x-1 mt-1">
          {digits.map((digit, index) => (
            <span
              key={index}
              className="w-6 h-7 flex items-center justify-center bg-black text-emerald-400 font-mono text-sm font-bold rounded border border-emerald-500/40 shadow-inner"
            >
              {digit}
            </span>
          ))}
          <span className="ml-2 text-xs text-emerald-400 font-medium animate-pulse">● Live</span>
        </div>
      </div>
    </div>
  );
};
