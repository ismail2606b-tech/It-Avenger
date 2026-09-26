import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';


let countedThisPage = false;

export const VisitorCounter = ({ compact = false }) => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    if (countedThisPage) {
      const current = Number(
        localStorage.getItem('fandomverse_visitors') || '0'
      );

      setVisitorCount(current);
      return;
    }

    countedThisPage = true;

    let count = Number(
      localStorage.getItem('fandomverse_visitors') || '0'
    );

    count += 1;

    localStorage.setItem(
      'fandomverse_visitors',
      String(count)
    );

    setVisitorCount(count);
  }, []);

  const digits = String(visitorCount)
    .padStart(6, '0')
    .split('');

  return (
    <div
      className={
        compact
          ? "flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs"
          : "inline-flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-pink-500/30"
      }
    >
      <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
        <Users className={compact ? "w-3.5 h-3.5" : "w-5 h-5"} />
      </div>

      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Portal Visitors
        </div>

        <div className="flex items-center space-x-1 mt-1">
          {digits.map((digit, index) => (
            <span
              key={index}
              className={
                compact
                  ? "w-4 h-5 flex items-center justify-center bg-slate-950 text-pink-400 font-mono font-bold text-[11px] rounded border border-pink-950/80"
                  : "w-6 h-7 flex items-center justify-center bg-black text-pink-400 font-mono text-sm font-bold rounded border border-pink-500/40"
              }
            >
              {digit}
            </span>
          ))}

          {!compact && (
            <span className="ml-2 text-xs text-pink-400 font-medium">
              ● Live
            </span>
          )}
        </div>
      </div>
    </div>
  );
};