import React from 'react';
import { Package, Smartphone, RefreshCw, Sparkles, Folder } from 'lucide-react';

interface HeaderProps {
  onOpenGithub: () => void;
  onOpenPwa: () => void;
  onOpenSync: () => void;
  onOpenNotesFolder?: () => void;
  notesCount?: number;
  isInstallable?: boolean;
  onInstallApp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGithub,
  onOpenPwa,
  onOpenSync,
  onOpenNotesFolder,
  notesCount = 0,
  isInstallable,
  onInstallApp,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#7B4B27] text-[#FFF8EE] shadow-md border-b border-[#5E3211] px-2.5 py-1.5 sm:px-4 sm:py-1.5 transition-all select-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Logo & Mascot Title - Compact & Clean */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FFFBF4] border border-[#D4A373] flex items-center justify-center shadow-xs overflow-hidden flex-shrink-0 p-0.5">
            <img 
              src="/apple-touch-icon.png" 
              alt="花栗鼠與貓熊童話月曆" 
              className="w-full h-full object-cover rounded-md"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <h1 className="font-extrabold text-xs sm:text-sm md:text-base tracking-tight flex items-center gap-1.5 leading-none truncate">
              <span className="truncate">花栗鼠與貓熊童話月曆</span>
              <span className="text-[9px] sm:text-[10px] bg-[#E76F51] text-white px-1.5 py-0.5 rounded-full font-bold shadow-2xs flex-shrink-0 hidden xs:inline">
                童話版
              </span>
            </h1>
            <span className="text-[10px] text-[#F3D5B5] hidden lg:inline flex-shrink-0 leading-none">
              • 2026~2033年童話行事曆
            </span>
          </div>
        </div>

        {/* Action shortcuts - Compact */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 flex-shrink-0">
          {onOpenNotesFolder && (
            <button
              id="headerOpenNotesFolderBtn"
              onClick={onOpenNotesFolder}
              className="bg-[#FAF0CA] hover:bg-[#F4D35E] text-[#6F441F] text-[11px] sm:text-xs px-2 py-1 rounded-lg font-bold flex items-center gap-1 shadow-xs transition active:scale-95 cursor-pointer border border-[#E0A96D]"
              title="開啟筆記資料夾"
            >
              <Folder className="w-3 h-3 text-[#E76F51]" />
              <span className="hidden sm:inline">筆記</span>資料夾
              {notesCount > 0 && (
                <span className="text-[9px] px-1 rounded-full bg-[#E76F51] text-white font-black leading-none ml-0.5">
                  {notesCount}
                </span>
              )}
            </button>
          )}

          <button
            id="openSyncModalBtn"
            onClick={onOpenSync}
            className="bg-[#6B705C] hover:bg-[#585B4B] text-white text-[11px] sm:text-xs px-2 py-1 rounded-lg font-bold flex items-center gap-1 shadow-xs transition active:scale-95 cursor-pointer"
            title="行事曆匯出與匯入"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">行事曆</span>同步
          </button>

          {isInstallable && (
            <button
              id="installAppBtn"
              onClick={onInstallApp}
              className="bg-[#3A86FF] hover:bg-[#2667DF] text-white text-[11px] sm:text-xs px-2 py-1 rounded-lg font-bold flex items-center gap-1 shadow-xs transition active:scale-95 cursor-pointer"
              title="安裝至本機桌面"
            >
              <Sparkles className="w-3 h-3" />
              <span>App</span>
            </button>
          )}

          <button
            id="openPwaModalBtn"
            onClick={onOpenPwa}
            className="bg-[#E76F51] hover:bg-[#D45A3C] text-white text-[11px] sm:text-xs px-2 py-1 rounded-lg font-bold flex items-center gap-1 shadow-xs transition active:scale-95 cursor-pointer"
            title="手機桌面PWA"
          >
            <Smartphone className="w-3 h-3" />
            <span className="hidden md:inline">PWA</span>
          </button>

          <button
            id="openGithubModalBtn"
            onClick={onOpenGithub}
            className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-[11px] sm:text-xs px-2 py-1 rounded-lg font-bold flex items-center gap-1 shadow-xs transition active:scale-95 cursor-pointer"
            title="查看部署教學"
          >
            <Package className="w-3 h-3" />
            <span className="hidden md:inline">GitHub</span>
          </button>
        </div>
      </div>
    </header>
  );
};
