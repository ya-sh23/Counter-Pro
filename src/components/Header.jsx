import React from 'react';
import { Sparkles, History } from 'lucide-react';
import { useCounter } from '../context/CounterContext';

export default function Header() {
  const { activeTab, setActiveTab, history } = useCounter();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#09090B]/90 border-b border-[#27272A] shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-[#EAB308] p-2 rounded-xl text-black shadow-md">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm sm:text-base leading-tight tracking-wide">Counter Pro</h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveTab('counters')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'counters'
                ? 'bg-[#EAB308] text-black font-bold shadow-md'
                : 'text-[#A1A1AA] hover:bg-[#18181B]'
            }`}
          >
            Counters
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 relative ${
              activeTab === 'history'
                ? 'bg-[#EAB308] text-black font-bold shadow-md'
                : 'text-[#A1A1AA] hover:bg-[#18181B]'
            }`}
          >
            <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>History</span>
            {history.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === 'history' ? 'bg-black text-[#EAB308]' : 'bg-[#27272A] text-[#EAB308]'}`}>
                {history.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
