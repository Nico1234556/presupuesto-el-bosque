import React from 'react';

export default function Toast({ message, visible }) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm pointer-events-none transition-all duration-300 transform translate-y-0 opacity-100">
      <div className="bg-ink text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-white/10 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
        <span className="font-sans leading-tight">{message}</span>
      </div>
    </div>
  );
}
