import React from 'react';
import { Sparkles } from 'lucide-react';
import { useCounter } from '../context/CounterContext';

export default function Toast() {
  const { notification } = useCounter();

  if (!notification) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-[#18181B] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 border border-[#3F3F46] text-xs sm:text-sm animate-fade-in">
      <Sparkles className="w-4 h-4 text-[#EAB308]" />
      <span className="font-medium">{notification}</span>
    </div>
  );
}
