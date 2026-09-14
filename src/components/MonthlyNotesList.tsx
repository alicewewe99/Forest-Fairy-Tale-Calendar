import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Plus, Calendar, Sparkles } from 'lucide-react';
import { formatDateKey, getLunarText, getHolidayInfo } from '../data/calendarData';

interface MonthlyNotesListProps {
  currentYear: number;
  currentMonth: number;
  customNotes: Record<string, string>;
  customStamps: Record<string, string[]>;
  onOpenNote: (dateKey: string) => void;
}

export const MonthlyNotesList: React.FC<MonthlyNotesListProps> = ({
  currentYear,
  currentMonth,
  customNotes,
  customStamps,
  onOpenNote,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const weekDays = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];

  // Collect notes in the current month
  const monthlyNotes: {
    dateKey: string;
    day: number;
    weekDay: string;
    isOff: boolean;
    holidayName?: string;
    lunarText: string;
    note: string;
    stamps: string[];
  }[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const key = formatDateKey(currentYear, currentMonth, d);
    const note = customNotes[key];
    if (note && note.trim()) {
      const dateObj = new Date(currentYear, currentMonth, d);
      const dayOfWeek = dateObj.getDay();
      const { holiday, isOff } = getHolidayInfo(currentYear, currentMonth, d, dayOfWeek);
      const lunarText = getLunarText(currentYear, currentMonth, d);
      const stamps = customStamps[key] || [];

      monthlyNotes.push({
        dateKey: key,
        day: d,
        weekDay: weekDays[dayOfWeek],
        isOff,
        holidayName: holiday?.name,
        lunarText,
        note,
        stamps,
      });
    }
  }

  const today = new Date();
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div className="bg-[#FFFDF9] border border-[#E9DAC1] rounded-2xl p-3 sm:p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#FAF0CA] border border-[#E0A96D] flex items-center justify-center text-base">
            📝
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-[#582F0E] flex items-center gap-1.5">
              <span>{currentYear}年{currentMonth + 1}月 日期筆記備忘</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF0CA] text-[#856404] font-bold border border-[#FFEBAA]">
                {monthlyNotes.length} 則
              </span>
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            id="quickAddTodayNoteBtn"
            onClick={() => onOpenNote(todayKey)}
            className="text-xs px-2.5 py-1 rounded-xl bg-[#FAF0CA] hover:bg-[#F4D35E] text-[#6F441F] font-bold border border-[#E0A96D] flex items-center gap-1 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>寫今日筆記</span>
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="p-1.5 rounded-xl text-[#7F5539] hover:bg-[#FAF6F0] transition cursor-pointer"
            title={isExpanded ? '收合筆記' : '展開筆記'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-2.5 border-t border-[#E9DAC1]/60">
          {monthlyNotes.length === 0 ? (
            <div className="py-3 text-center text-xs text-[#9C6644] bg-[#FAF6F0] rounded-xl border border-[#E9DAC1]/50 flex flex-col items-center justify-center gap-1.5">
              <p>本月尚未記錄任何筆記。</p>
              <p className="text-[11px] text-[#B08968]">
                💡 點擊上方的「📝 寫筆記」按鈕或直接點選月曆日期，即可記錄行程與公事看診！
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
              {monthlyNotes.map((item) => (
                <div
                  key={item.dateKey}
                  id={`noteCard-${item.dateKey}`}
                  onClick={() => onOpenNote(item.dateKey)}
                  className="bg-white hover:bg-[#FFFBF4] border border-[#E9DAC1] hover:border-[#D4A373] rounded-xl p-2.5 transition shadow-2xs hover:shadow-xs cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-[#582F0E]">
                          {currentMonth + 1}月{item.day}日
                        </span>
                        <span
                          className={`text-[11px] font-bold ${
                            item.isOff ? 'text-[#C2185B]' : 'text-[#6F441F]'
                          }`}
                        >
                          ({item.weekDay})
                        </span>
                        {item.holidayName && (
                          <span className="text-[9px] px-1 py-0.2 rounded font-bold bg-[#F8BBD0] text-[#C2185B]">
                            {item.holidayName}
                          </span>
                        )}
                      </div>
                      {item.stamps.length > 0 && (
                        <div className="flex items-center gap-0.5 text-xs">
                          {item.stamps.map((st, sIdx) => (
                            <span key={sIdx}>{st}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-[#2D241E] line-clamp-2 whitespace-pre-line leading-relaxed">
                      {item.note}
                    </p>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-[#FAF0CA] flex items-center justify-between text-[10px] text-[#9C6644]">
                    <span>農曆 {item.lunarText}</span>
                    <span className="text-[#E76F51] font-bold group-hover:underline">
                      點擊編輯 📝
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
