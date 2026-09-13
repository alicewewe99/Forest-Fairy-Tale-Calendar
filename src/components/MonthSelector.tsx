import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthSelectorProps {
  currentYear: number;
  currentMonth: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  currentYear,
  currentMonth,
  onYearChange,
  onMonthChange,
  onPrevMonth,
  onNextMonth,
}) => {
  // Years 2026 to 2033 (Republic Year 115 to 122)
  const years = [
    { y: 2026, label: "2026 年 (民國115)" },
    { y: 2027, label: "2027 年 (民國116)" },
    { y: 2028, label: "2028 年 (民國117)" },
    { y: 2029, label: "2029 年 (民國118)" },
    { y: 2030, label: "2030 年 (民國119)" },
    { y: 2031, label: "2031 年 (民國120)" },
    { y: 2032, label: "2032 年 (民國121)" },
    { y: 2033, label: "2033 年 (民國122)" },
  ];

  return (
    <div className="bg-[#FFFDF9] border-2 border-[#D4A373] rounded-2xl p-2.5 sm:p-3 shadow-sm">
      {/* All in ONE ROW: [上個月] [年/月下拉] [下個月] with complete text */}
      <div className="flex items-center justify-between gap-2">
        {/* Enlarge Prev Month Button with Full Clear Text */}
        <button
          id="prevMonthBtn"
          onClick={onPrevMonth}
          className="min-h-[44px] px-3 sm:px-4 py-2 bg-[#FAF0CA] hover:bg-[#F4D35E] active:scale-95 text-[#582F0E] rounded-xl flex items-center gap-1 font-extrabold text-sm sm:text-base shadow-sm border border-[#E0A96D] transition cursor-pointer flex-shrink-0"
          title="切換至上個月"
        >
          <ChevronLeft className="w-5 h-5 text-[#8B5A2B]" />
          <span className="inline">上個月</span>
        </button>

        {/* Year and Month Selectors in Center */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap">
          <select
            id="yearSelect"
            value={currentYear}
            onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
            className="bg-[#FAF0CA] text-[#43281C] font-extrabold text-base sm:text-lg rounded-xl px-2.5 sm:px-3 py-1.5 border border-[#D4A373] focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] cursor-pointer shadow-xs"
          >
            {years.map(({ y, label }) => (
              <option key={y} value={y}>
                {label}
              </option>
            ))}
          </select>

          <select
            id="monthSelect"
            value={currentMonth}
            onChange={(e) => onMonthChange(parseInt(e.target.value, 10))}
            className="bg-[#FAF0CA] text-[#43281C] font-extrabold text-base sm:text-lg rounded-xl px-2.5 sm:px-3 py-1.5 border border-[#D4A373] focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] cursor-pointer shadow-xs"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {i + 1} 月
              </option>
            ))}
          </select>
        </div>

        {/* Enlarge Next Month Button with Full Clear Text */}
        <button
          id="nextMonthBtn"
          onClick={onNextMonth}
          className="min-h-[44px] px-3 sm:px-4 py-2 bg-[#FAF0CA] hover:bg-[#F4D35E] active:scale-95 text-[#582F0E] rounded-xl flex items-center gap-1 font-extrabold text-sm sm:text-base shadow-sm border border-[#E0A96D] transition cursor-pointer flex-shrink-0"
          title="切換至下個月"
        >
          <span className="inline">下個月</span>
          <ChevronRight className="w-5 h-5 text-[#8B5A2B]" />
        </button>
      </div>

      {/* Quick year pills for 2026, 2027, 2028 per user reference */}
      <div className="flex items-center justify-center gap-1.5 mt-2 pt-2 border-t border-[#E9DAC1]/70 flex-wrap">
        <span className="text-[11px] text-[#7F5539] font-bold">快速切換：</span>
        {[2026, 2027, 2028].map((yr) => (
          <button
            key={yr}
            id={`quickYearBtn-${yr}`}
            onClick={() => onYearChange(yr)}
            className={`text-xs px-2.5 py-1 rounded-lg font-bold transition shadow-2xs cursor-pointer ${
              currentYear === yr
                ? 'bg-[#8B5A2B] text-white shadow-xs scale-105'
                : 'bg-[#FAF0CA] text-[#6F441F] hover:bg-[#F4D35E] border border-[#E0A96D]'
            }`}
          >
            {yr}年 (民國{yr - 1911})
          </button>
        ))}
      </div>

      <div className="text-center text-[11px] sm:text-xs text-[#7F5539] font-medium mt-1.5 flex items-center justify-center gap-2">
        <span>行政院人事行政總處最新標準</span>
        <span>•</span>
        <span className="text-[#C2185B] font-bold">休假日粉紅底紅字</span>
        <span>•</span>
        <span className="bg-[#C2185B] text-white px-1 rounded text-[10px]">國定假</span>
      </div>
    </div>
  );
};
