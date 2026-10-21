import React from 'react';
import { History } from 'lucide-react';
import { useCounter } from '../context/CounterContext';

export default function HistoryView() {
  const { history, setHistory, showNotification } = useCounter();

  return (
    <div className="bg-[#18181B] backdrop-blur-md rounded-2xl border border-[#27272A] shadow-xl p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">Activity History</h2>
          <p className="text-xs text-[#A1A1AA]">Automatically preserved (Max 20 latest events)</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={() => { setHistory([]); showNotification('History cleared'); }}
            className="text-xs font-medium text-rose-400 hover:bg-rose-950/40 px-2.5 py-1 rounded-lg transition-all"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-10 space-y-2">
          <History className="w-8 h-8 text-[#3F3F46] mx-auto" />
          <p className="text-white text-sm font-medium">No activity recorded yet</p>
          <p className="text-[#A1A1AA] text-xs">Actions like updating groups or resetting will log snapshots here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item, idx) => (
            <div key={item.id} className="bg-[#09090B] border border-[#27272A] rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-black bg-[#EAB308] px-1.5 py-0.2 rounded text-[10px]">
                    #{history.length - idx}
                  </span>
                  <h4 className="font-semibold text-white">{item.description}</h4>
                </div>
                <p className="text-[10px] text-[#A1A1AA]">{item.timestamp}</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                {item.snapshot.map(group => (
                  <div key={group.id} className="bg-[#18181B] border border-[#27272A] rounded-lg px-2.5 py-1.5 shrink-0">
                    <span className="font-bold text-white block mb-0.5">{group.title || 'Untitled'}</span>
                    <div className="flex items-center gap-2">
                      {group.buttons.map(b => (
                        <span key={b.id} className="text-[#A1A1AA]">
                          {b.label || 'Opt'}: <strong className="text-[#EAB308]">{b.count}</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
