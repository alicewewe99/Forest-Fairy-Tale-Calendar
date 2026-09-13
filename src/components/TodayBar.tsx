import React from 'react';
import { Copy, RotateCcw, CalendarDays } from 'lucide-react';
import { getFullLunarInfo } from '../data/calendarData';

interface TodayBarProps {
  onCopyToday: () => void;
  onGoToToday: () => void;
}

export const TodayBar: React.FC<TodayBarProps> = ({ onCopyToday, onGoToToday }) => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();
  const weekDays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const w = weekDays[now.getDay()];
  const lunarInfo = getFullLunarInfo(y, m, d);

  // Exact user requested format: 年月日農曆日期星期
  const todayFormattedString = `${y}年${m + 1}月${d}日 農曆${lunarInfo.monthName}${lunarInfo.dayName}${lunarInfo.jieQi ? ` (${lunarInfo.jieQi})` : ''} ${w}`;

  return (
    <div className="bg-[#FFFDF9] border border-[#E9DAC1] rounded-2xl p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-2.5 shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-[#FAF0CA] border border-[#D4A373] flex items-center justify-center text-xl shadow-inner select-none flex-shrink-0">
          🐿️
        </div>
        <div>
          <div className="text-[11px] text-[#7F5539] font-medium flex items-center gap-1">
            <CalendarDays className="w-3 h-3 text-[#E76F51]" />
            <span>當天日期特別標示（金色圓框）</span>
          </div>
          <div id="todayBannerText" className="text-sm sm:text-base font-extrabold text-[#43281C]">
            {todayFormattedString}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          id="copyTodayBtn"
          onClick={onCopyToday}
          className="min-h-[38px] bg-[#E6CCB2] hover:bg-[#DDB892] active:scale-95 text-[#43281C] text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition shadow-xs cursor-pointer border border-[#CDB498]"
          title="複製當天日期（格式：年月日農曆日期星期）"
        >
          <Copy className="w-3.5 h-3.5 text-[#6F441F]" />
          <span>複製當天日期</span>
        </button>

        <button
          id="goToTodayBtn"
          onClick={onGoToToday}
          className="min-h-[38px] bg-[#8B5A2B] hover:bg-[#6F441F] active:scale-95 text-[#FFFDF9] text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer border border-[#582F0E]"
          title="立即回到今天的月份與日曆"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#F4A261]" />
          <span>回到今天</span>
        </button>
      </div>
    </div>
  );
};
