import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      id="toastMessage"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#2D241E]/95 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm transition-opacity duration-300 pointer-events-none flex items-center gap-2 border border-white/20"
    >
      <span>{message}</span>
    </div>
  );
};
