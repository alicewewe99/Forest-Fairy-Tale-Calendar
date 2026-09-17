import React from 'react';
import { Sparkles, Eraser } from 'lucide-react';

export interface StampItem {
  id: string;
  emoji: string;
  name: string;
}

export const AVAILABLE_STAMPS: StampItem[] = [
  { id: '⭐', emoji: '⭐', name: '星星' },
  { id: '💼', emoji: '💼', name: '公事' },
  { id: '💉', emoji: '💉', name: '看診' },
  { id: '🎂', emoji: '🎂', name: '蛋糕' },
  { id: '☀️', emoji: '☀️', name: '太陽' },
  { id: '🍖', emoji: '🍖', name: '烤肉' },
  { id: '🌰', emoji: '🌰', name: '橡果' },
  { id: '🌱', emoji: '🌱', name: '幼苗' },
  { id: '❤️', emoji: '❤️', name: '愛心' },
  { id: '🌹', emoji: '🌹', name: '玫瑰' },
  { id: '☕️', emoji: '☕️', name: '咖啡' },
  { id: '🎈', emoji: '🎈', name: '聚會' },
  { id: '✈️', emoji: '✈️', name: '旅行' },
  { id: '🐿️', emoji: '🐿️', name: '松鼠' },
  { id: '🐼', emoji: '🐼', name: '貓熊' },
];

interface StampSelectorProps {
  selectedStamp: string;
  onSelectStamp: (stamp: string) => void;
  onOpenNotesFolder?: () => void;
  notesCount?: number;
}

export const StampSelector: React.FC<StampSelectorProps> = ({
  selectedStamp,
  onSelectStamp,
  onOpenNotesFolder,
  notesCount = 0,
}) => {
  return (
    <div className="bg-[#FAF0CA] border border-[#E0A96D] rounded-2xl p-2 sm:p-2.5 shadow-inner">
      <div className="flex items-center justify-between gap-2 mb-1.5 px-1">
        <div className="text-xs sm:text-sm font-extrabold text-[#6F441F] flex items-center gap-1.5">
          {selectedStamp === 'NOTE' ? (
            <>
              <span className="text-base leading-none">📝</span>
              <span className="text-[#C2185B]">已進入筆記模式：點擊月曆任意日期即可新增或編輯筆記</span>
            </>
          ) : selectedStamp === 'CLEAR' ? (
            <>
              <Eraser className="w-4 h-4 text-[#E76F51]" />
              <span className="text-[#E76F51]">已進入橡皮擦模式：點擊月曆日期即可擦除該日所有印章</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#E76F51]" />
              <span>特殊標記印章（點選印章後直接點擊月曆日期蓋印，亦可切換「📝 寫筆記」）</span>
            </>
          )}
        </div>
        <div className="text-[11px] text-[#8C5E35] hidden sm:block font-medium">
          可蓋印 💼公事、💉看診、📝筆記等多種標記
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar" id="stampSelectorList">
        {/* Clear / Eraser Button (Moved to the very front) */}
        <button
          id="stampBtn-CLEAR"
          onClick={() => onSelectStamp('CLEAR')}
          className={`min-h-[36px] px-3 py-1 rounded-xl text-xs sm:text-sm font-extrabold shadow-xs transition active:scale-90 flex items-center gap-1.5 whitespace-nowrap cursor-pointer flex-shrink-0 ${
            selectedStamp === 'CLEAR'
              ? 'bg-[#E76F51] border-2 border-[#B23B1E] ring-2 ring-[#E76F51]/40 text-white'
              : 'bg-[#E6CCB2] border border-[#9C6644] text-[#582F0E] hover:bg-[#DDB892]'
          }`}
          title="切換清除模式，點擊日期即可擦除該日所有印章"
        >
          <Eraser className="w-3.5 h-3.5" />
          <span>清除圖示</span>
        </button>

        {/* Date Note Button */}
        <button
          id="stampBtn-NOTE"
          onClick={() => onSelectStamp('NOTE')}
          className={`min-h-[36px] px-3 py-1 rounded-xl text-xs sm:text-sm font-extrabold shadow-xs transition active:scale-90 flex items-center gap-1.5 whitespace-nowrap cursor-pointer flex-shrink-0 ${
            selectedStamp === 'NOTE'
              ? 'bg-[#E76F51] border-2 border-[#B23B1E] ring-2 ring-[#E76F51]/40 text-white'
              : 'bg-[#FFF3CD] border border-[#FFEBAA] text-[#856404] hover:bg-[#FFE8A1]'
          }`}
          title="切換筆記模式，點擊月曆日期即可撰寫/查看備忘筆記"
        >
          <span className="text-base leading-none">📝</span>
          <span>寫筆記</span>
        </button>

        {/* Notes Folder Button */}
        {onOpenNotesFolder && (
          <button
            id="stampBtn-FOLDER"
            type="button"
            onClick={onOpenNotesFolder}
            className="min-h-[36px] px-3 py-1 rounded-xl text-xs sm:text-sm font-extrabold shadow-xs transition active:scale-90 flex items-center gap-1.5 whitespace-nowrap cursor-pointer flex-shrink-0 bg-white border-2 border-[#D4A373] text-[#582F0E] hover:bg-[#FAF0CA]"
            title="開啟備忘筆記資料夾，統一瀏覽所有筆記"
          >
            <span className="text-base leading-none">📁</span>
            <span>筆記資料夾</span>
            {notesCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#E76F51] text-white font-black leading-none ml-0.5">
                {notesCount}
              </span>
            )}
          </button>
        )}

        {AVAILABLE_STAMPS.map((s) => {
          const isActive = selectedStamp === s.id;
          return (
            <button
              key={s.id}
              id={`stampBtn-${s.name}`}
              onClick={() => onSelectStamp(s.id)}
              className={`min-h-[36px] px-2.5 py-1 rounded-xl text-xs sm:text-sm shadow-xs transition active:scale-90 flex items-center gap-1 font-bold whitespace-nowrap cursor-pointer flex-shrink-0 ${
                isActive
                  ? 'bg-[#FDE2BD] border-2 border-[#8B5A2B] ring-2 ring-[#8B5A2B]/40 text-[#43281C]'
                  : 'bg-white border border-[#D4A373] text-[#582F0E] hover:bg-[#FFFDF9]'
              }`}
            >
              <span className="text-base leading-none">{s.emoji}</span>
              <span>{s.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
