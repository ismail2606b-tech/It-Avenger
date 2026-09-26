import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const RealTimeClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 shadow-inner">
      <Clock className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
      <span className="hidden sm:inline text-slate-400">{formattedDate}</span>
      <span className="hidden sm:inline text-slate-600">•</span>
      <span className="text-cyan-400 font-semibold">{formattedTime}</span>
    </div>
  );
};
