import React from 'react';
import { Package, Smartphone, RefreshCw, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenGithub: () => void;
  onOpenPwa: () => void;
  onOpenSync: () => void;
  isInstallable?: boolean;
  onInstallApp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGithub,
  onOpenPwa,
  onOpenSync,
  isInstallable,
  onInstallApp,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#8B5A2B] text-[#FFF8EE] shadow-md border-b-2 border-[#6F441F] px-3 py-2 sm:px-6 transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo & Mascot (Chipmunk & Panda together holding calendar matching IMG_4566) */}
        <div className="flex items-center space-x-2.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#FFFBF4] border-2 border-[#D4A373] flex items-center justify-center shadow-inner overflow-hidden flex-shrink-0 p-0.5">
            <img 
              src="/icon.svg" 
              alt="花栗鼠與貓熊童話月曆" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg tracking-wide flex items-center gap-1.5 leading-tight">
              <span>花栗鼠與貓熊童話月曆</span>
              <span className="text-[10px] sm:text-xs bg-[#E76F51] text-white px-2 py-0.5 rounded-full font-bold shadow-xs">
                童話旗艦版
              </span>
            </h1>
            <p className="text-[11px] text-[#F3D5B5] leading-none mt-0.5">
              2026~2033年 • 正確農曆節氣 • 國定假期 • 心靈神諭
            </p>
          </div>
        </div>

        {/* Action shortcuts */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {isInstallable && (
            <button
              id="installAppBtn"
              onClick={onInstallApp}
              className="bg-[#3A86FF] hover:bg-[#2667DF] text-white text-xs px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm transition active:scale-95 cursor-pointer"
              title="安裝至本機桌面"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">安裝</span>App
            </button>
          )}

          <button
            id="openGithubModalBtn"
            onClick={onOpenGithub}
            className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm transition active:scale-95 cursor-pointer"
            title="查看部署教學"
          >
            <Package className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">匯出</span>GitHub
          </button>

          <button
            id="openPwaModalBtn"
            onClick={onOpenPwa}
            className="bg-[#E76F51] hover:bg-[#D45A3C] text-white text-xs px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm transition active:scale-95 cursor-pointer"
            title="手機掃碼安裝"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">下載</span>桌面PWA
          </button>

          <button
            id="openSyncModalBtn"
            onClick={onOpenSync}
            className="bg-[#6B705C] hover:bg-[#585B4B] text-white text-xs px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm transition active:scale-95 cursor-pointer"
            title="行事曆匯出與匯入"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">行事曆</span>同步
          </button>
        </div>
      </div>
    </header>
  );
};
