import React from 'react';
import { Plus, RotateCcw, AlertCircle } from 'lucide-react';
import { CounterProvider, useCounter } from './context/CounterContext';
import Header from './components/Header';
import Toast from './components/Toast';
import CounterField from './components/CounterField';
import HistoryView from './components/HistoryView';

function MainContent() {
  const { fields, activeTab, addField, resetAllCounts } = useCounter();

  return (
    <div className="min-h-screen bg-[#09090B] text-white pb-16 font-sans selection:bg-[#EAB308] selection:text-black">
      <Toast />
      <Header />

      <main className="max-w-5xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
        {activeTab === 'counters' ? (
          <div className="space-y-4 sm:space-y-6">
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#18181B] backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl border border-[#27272A] shadow-lg">
              <div className="flex items-center gap-2">
                <button
                  onClick={addField}
                  className="flex-1 sm:flex-none bg-[#EAB308] hover:bg-[#CA8A04] text-black font-bold px-4 py-2 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Counter Field</span>
                </button>
                <button
                  onClick={resetAllCounts}
                  className="flex-1 sm:flex-none bg-[#27272A] hover:bg-[#3F3F46] text-[#A1A1AA] font-medium px-4 py-2 rounded-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm border border-[#3F3F46]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              </div>
              <div className="text-[11px] text-[#A1A1AA] flex items-center gap-1.5 justify-center sm:justify-end">
                <AlertCircle className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
                <span>Drag grip icon to reorder. Max 20 history logs saved.</span>
              </div>
            </div>

            {/* Empty State */}
            {fields.length === 0 && (
              <div className="bg-[#18181B]/80 backdrop-blur-sm rounded-2xl border border-dashed border-[#27272A] p-10 text-center space-y-3">
                <div className="w-10 h-10 bg-[#27272A] text-[#EAB308] rounded-xl flex items-center justify-center mx-auto">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="text-white font-semibold text-sm sm:text-base">No counter fields active</h3>
                <p className="text-[#A1A1AA] text-xs max-w-xs mx-auto">Add your first counter field to start tracking scenarios.</p>
                <button
                  onClick={addField}
                  className="bg-[#EAB308] text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#CA8A04] transition-all"
                >
                  Create First Field
                </button>
              </div>
            )}

            {/* Fields List */}
            <div className="space-y-4 sm:space-y-6">
              {fields.map((field) => (
                <CounterField key={field.id} field={field} />
              ))}
            </div>
          </div>
        ) : (
          <HistoryView />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <CounterProvider>
      <MainContent />
    </CounterProvider>
  );
}
