import React from 'react';
import { formatDateKey, getHolidayInfo, getLunarText } from '../data/calendarData';

interface CalendarGridProps {
  currentYear: number;
  currentMonth: number;
  customStamps: Record<string, string[]>;
  customNotes?: Record<string, string>;
  selectedStamp?: string;
  onCellClick: (dateKey: string) => void;
  onOpenNote: (dateKey: string) => void;
  onOpenNotesFolder?: () => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentYear,
  currentMonth,
  customStamps,
  customNotes = {},
  selectedStamp = '⭐',
  onCellClick,
  onOpenNote,
  onOpenNotesFolder,
}) => {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  const today = new Date();
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  // Week header labels (Sunday to Saturday)
  const weekDays = [
    { label: "週日", isSun: true },
    { label: "週一", isSun: false },
    { label: "週二", isSun: false },
    { label: "週三", isSun: false },
    { label: "週四", isSun: false },
    { label: "週五", isSun: false },
    { label: "週六", isSat: true }
  ];

  // 1. Previous month trailing cells
  const prevCells = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    prevCells.push(
      <div
        key={`prev-${d}`}
        className="h-[76px] sm:h-[88px] bg-[#F7F3EE] border border-[#E9DAC1]/50 rounded-xl p-1 sm:p-1.5 flex flex-col justify-between opacity-50 select-none"
      >
        <div className="w-full text-left leading-none">
          <span className="text-xs font-bold text-gray-400">{d}</span>
        </div>
        <div className="h-4 flex items-center justify-center text-[10px] text-gray-400">上月</div>
        <div className="w-full text-center text-[9px] text-gray-400">•••</div>
      </div>
    );
  }

  // 2. Current month active cells
  const currentCells = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = formatDateKey(currentYear, currentMonth, d);
    const dayOfWeek = (firstDay + d - 1) % 7;
    const { holiday, isOff } = getHolidayInfo(currentYear, currentMonth, d, dayOfWeek);
    const lunar = getLunarText(currentYear, currentMonth, d);
    const stamps = customStamps[dateKey] || [];
    const isToday = (dateKey === todayKey);
    const noteText = customNotes[dateKey] || '';
    const hasNote = Boolean(noteText.trim());

    // Explicit colors per requirement:
    // "休假日粉紅色底色和紅色字體明顯標註"
    // "加入台灣國定假日並加註國定假"
    const bgClass = isOff 
      ? "bg-[#F8BBD0] border-[#F48FB1] hover:bg-[#F48FB1]/70" 
      : "bg-white border-[#E9DAC1] hover:bg-[#FFFBF4]";
    
    const textNumClass = isOff 
      ? "text-[#C2185B] font-black" 
      : (dayOfWeek === 0 || dayOfWeek === 6 ? "text-[#C2185B] font-extrabold" : "text-[#2D241E] font-extrabold");

    const textLunarClass = isOff
      ? "text-[#880E4F] font-bold"
      : "text-[#6F441F] font-medium";

    const todayRing = isToday 
      ? "ring-3 ring-[#F4A261] ring-offset-2 border-2 border-[#E76F51] shadow-md z-10 scale-[1.02]" 
      : "shadow-xs";

    const handleCellClick = () => {
      if (selectedStamp === 'NOTE') {
        onOpenNote(dateKey);
      } else {
        onCellClick(dateKey);
      }
    };

    currentCells.push(
      <div
        key={dateKey}
        id={`calCell-${dateKey}`}
        onClick={handleCellClick}
        className={`group relative h-[76px] sm:h-[88px] rounded-xl p-1 sm:p-1.5 flex flex-col justify-between transition-all duration-150 cursor-pointer border ${bgClass} ${todayRing}`}
        title={`${dateKey} 農曆：${lunar}${holiday ? ` • ${holiday.name}` : ''}${hasNote ? ` • 【筆記】${noteText}` : ''}`}
      >
        {/* Top: Day number + Badges */}
        <div className="w-full flex items-center justify-between leading-none pointer-events-none">
          <div className="flex items-center gap-1">
            <span className={`text-xs sm:text-sm ${textNumClass}`}>
              {d}
            </span>
            {hasNote && (
              <button
                type="button"
                id={`noteBadge-${dateKey}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenNote(dateKey);
                }}
                className="pointer-events-auto text-xs leading-none hover:scale-130 transition-transform active:scale-95 cursor-pointer"
                title={`📝 筆記：${noteText}`}
              >
                📝
              </button>
            )}
          </div>
          <div className="flex items-center gap-0.5">
            {isToday && (
              <span className="text-[9px] px-1 py-0.5 rounded font-black bg-[#E76F51] text-white leading-none shadow-2xs">
                今日
              </span>
            )}
            {holiday && holiday.isNationalHoliday && (
              <span className="text-[9px] px-1 py-0.5 rounded font-black bg-[#C2185B] text-white leading-none shadow-2xs">
                國定假
              </span>
            )}
          </div>
        </div>

        {/* Middle: Stamp markers row */}
        <div className="h-5 flex items-center justify-center gap-0.5 text-xs sm:text-sm pointer-events-none overflow-hidden leading-none">
          {stamps.length > 0 ? (
            stamps.map((s, idx) => (
              <span key={idx} className="scale-110 select-none animate-pulse">
                {s}
              </span>
            ))
          ) : (
            <span className="opacity-0 text-[10px]">•</span>
          )}
        </div>

        {/* Bottom: Subtext (Festival, Solar term, Lunar month/day) */}
        <div className="w-full text-center px-0.5 pointer-events-none leading-none">
          <span className={`text-[9px] sm:text-[10px] font-bold truncate block ${textLunarClass}`}>
            {lunar}
          </span>
        </div>
      </div>
    );
  }

  // 3. Next month cells to strictly maintain 42 cells (6 rows x 7 columns)
  // "修正月曆格式固定一樣大小"
  const totalRenderedSoFar = firstDay + daysInMonth;
  const targetTotal = 42; // exactly 6 rows
  const remaining = targetTotal - totalRenderedSoFar;
  const nextCells = [];
  for (let i = 1; i <= remaining; i++) {
    nextCells.push(
      <div
        key={`next-${i}`}
        className="h-[76px] sm:h-[88px] bg-[#F7F3EE] border border-[#E9DAC1]/50 rounded-xl p-1 sm:p-1.5 flex flex-col justify-between opacity-50 select-none"
      >
        <div className="w-full text-left leading-none">
          <span className="text-xs font-bold text-gray-400">{i}</span>
        </div>
        <div className="h-4 flex items-center justify-center text-[10px] text-gray-400">下月</div>
        <div className="w-full text-center text-[9px] text-gray-400">•••</div>
      </div>
    );
  }

  // Count total off days and notes this month
  let totalOffDays = 0;
  let totalNotesThisMonth = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const dayOfWeek = (firstDay + d - 1) % 7;
    const { isOff } = getHolidayInfo(currentYear, currentMonth, d, dayOfWeek);
    if (isOff) totalOffDays++;
    const key = formatDateKey(currentYear, currentMonth, d);
    if (customNotes[key] && customNotes[key].trim()) {
      totalNotesThisMonth++;
    }
  }

  return (
    <div className="bg-[#FFFDF9] border-2 border-[#D4A373] rounded-2xl p-2 sm:p-3 shadow-md">
      {/* Week Headers */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1.5 text-center">
        {weekDays.map((w, idx) => (
          <div
            key={idx}
            className={`py-1 rounded-lg text-xs sm:text-sm font-black ${
              w.isSun || w.isSat 
                ? 'bg-[#FDE2E4] text-[#C2185B]' 
                : 'bg-[#FAF0CA] text-[#582F0E]'
            }`}
          >
            {w.label}
          </div>
        ))}
      </div>

      {/* Invariant 42 Cells Fixed Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5" id="calendarFixedGrid">
        {prevCells}
        {currentCells}
        {nextCells}
      </div>

      {/* Official Calendar Legend & Monthly Day-Off Summary */}
      <div className="mt-3 pt-2.5 border-t border-[#E9DAC1] flex flex-wrap items-center justify-between gap-2.5 text-xs text-[#6F441F]">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-bold text-[#582F0E]">日曆圖例：</span>
          <span className="inline-flex items-center gap-1.5 bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-[#E9DAC1]">
            <span className="w-3.5 h-3.5 border border-[#D4A373] bg-white rounded"></span>
            <span className="font-medium text-[#4A3525]">上班日</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#FDE2E4]/40 px-2 py-0.5 rounded-md border border-[#F48FB1]/60">
            <span className="w-3.5 h-3.5 border border-[#F48FB1] bg-[#F8BBD0] rounded"></span>
            <span className="text-[#C2185B] font-bold">放假日</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-[#E9DAC1]">
            <span className="text-[9px] px-1 py-0.5 rounded font-black bg-[#C2185B] text-white leading-none">國定假</span>
            <span className="font-medium text-[#4A3525]">國定假日</span>
          </span>
          {onOpenNotesFolder ? (
            <button
              type="button"
              id="legendOpenNotesFolderBtn"
              onClick={onOpenNotesFolder}
              className="inline-flex items-center gap-1.5 bg-[#FAF6F0] hover:bg-[#FAF0CA] px-2 py-0.5 rounded-md border border-[#E9DAC1] transition cursor-pointer"
              title="開啟筆記資料夾"
            >
              <span className="text-xs">📁</span>
              <span className="font-bold text-[#582F0E]">筆記資料夾</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-[#E9DAC1]">
              <span className="text-xs">📝</span>
              <span className="font-medium text-[#4A3525]">日期筆記</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-xs text-[#6F441F] font-bold bg-[#FAF0CA] px-2.5 py-1 rounded-lg border border-[#E0A96D]">
            本月放假天數：<span className="text-[#C2185B] font-black text-sm">{totalOffDays}</span> 天
          </div>
          {totalNotesThisMonth > 0 && (
            <button
              type="button"
              id="summaryOpenNotesFolderBtn"
              onClick={onOpenNotesFolder}
              className="text-xs text-[#582F0E] font-bold bg-[#FFF3CD] hover:bg-[#FFE8A1] px-2.5 py-1 rounded-lg border border-[#FFEBAA] transition cursor-pointer flex items-center gap-1"
              title="點擊開啟筆記資料夾"
            >
              <span>📁 筆記：</span>
              <span className="text-[#856404] font-black text-sm">{totalNotesThisMonth}</span>
              <span>則</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
