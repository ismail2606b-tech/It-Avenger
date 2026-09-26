import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const Breadcrumbs = () => {
  const { breadcrumbs, navigateTo } = useFandom();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
      <ol className="flex items-center space-x-2 text-xs text-slate-400 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <li key={idx} className="flex items-center space-x-2">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />}
              {isLast ? (
                <span className="font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                  {crumb.label}
                </span>
              ) : (
                <button
                  onClick={() => navigateTo(crumb.tab, crumb.categoryId)}
                  className="flex items-center space-x-1.5 hover:text-white transition-colors duration-150 group"
                >
                  {idx === 0 && <Home className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />}
                  <span>{crumb.label}</span>
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
