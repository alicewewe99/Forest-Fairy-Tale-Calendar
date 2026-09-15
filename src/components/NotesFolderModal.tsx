import React, { useState, useMemo } from 'react';
import { X, Folder, Search, Calendar, Plus, FileText, Sparkles, Tag, ArrowUpDown } from 'lucide-react';
import { formatDateKey, getLunarText, getHolidayInfo } from '../data/calendarData';

interface NotesFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentYear: number;
  currentMonth: number;
  customNotes: Record<string, string>;
  customStamps: Record<string, string[]>;
  onOpenNote: (dateKey: string) => void;
}

export const NotesFolderModal: React.FC<NotesFolderModalProps> = ({
  isOpen,
  onClose,
  currentYear,
  currentMonth,
  customNotes,
  customStamps,
  onOpenNote,
}) => {
  const [filterScope, setFilterScope] = useState<'month' | 'all'>('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  if (!isOpen) return null;

  const weekDays = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
  const currentMonthPrefix = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;

  // Parse all notes
  const allNotesList = (Object.entries(customNotes) as [string, string][])
    .filter(([_, text]) => typeof text === 'string' && text.trim().length > 0)
    .map(([dateKey, text]) => {
      const [yStr, mStr, dStr] = dateKey.split('-');
      const y = parseInt(yStr, 10);
      const m = parseInt(mStr, 10) - 1;
      const d = parseInt(dStr, 10);
      const dateObj = new Date(y, m, d);
      const dayOfWeek = isNaN(dateObj.getTime()) ? 0 : dateObj.getDay();
      const { holiday, isOff } = getHolidayInfo(y, m, d, dayOfWeek);
      const lunarText = getLunarText(y, m, d);
      const stamps = customStamps[dateKey] || [];

      return {
        dateKey,
        year: y,
        month: m,
        day: d,
        weekDay: weekDays[dayOfWeek],
        holidayName: holiday?.name,
        isOff,
        lunarText,
        text,
        stamps,
      };
    });

  // Filter notes
  const filteredNotes = allNotesList.filter((item) => {
    // 1. Scope filter
    if (filterScope === 'month') {
      if (item.year !== currentYear || item.month !== currentMonth) {
        return false;
      }
    }
    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const matchText = item.text.toLowerCase().includes(q);
      const matchDate = item.dateKey.includes(q);
      const matchHoliday = item.holidayName?.toLowerCase().includes(q);
      const matchLunar = item.lunarText.toLowerCase().includes(q);
      const matchStamp = item.stamps.some((s) => s.includes(q));
      if (!matchText && !matchDate && !matchHoliday && !matchLunar && !matchStamp) {
        return false;
      }
    }
    return true;
  });

  // Sort notes
  filteredNotes.sort((a, b) => {
    const cmp = a.dateKey.localeCompare(b.dateKey);
    return sortOrder === 'asc' ? cmp : -cmp;
  });

  const monthCount = allNotesList.filter(
    (item) => item.year === currentYear && item.month === currentMonth
  ).length;
  const totalCount = allNotesList.length;

  const today = new Date();
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const handleCardClick = (dateKey: string) => {
    onClose();
    onOpenNote(dateKey);
  };

  const handleWriteToday = () => {
    onClose();
    onOpenNote(todayKey);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFDF9] rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border-2 border-[#D4A373] text-[#2D241E] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E9DAC1] pb-3 mb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF0CA] border border-[#E0A96D] flex items-center justify-center text-2xl shadow-xs">
              📁
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-base sm:text-lg text-[#582F0E] leading-tight">
                  童話備忘筆記資料夾
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#FAF0CA] text-[#856404] border border-[#FFEBAA]">
                  總計 {totalCount} 則筆記
                </span>
              </div>
              <p className="text-xs text-[#7F5539] mt-0.5">
                統一收納所有日期行程、公事看診與生活提醒
              </p>
            </div>
          </div>
          <button
            id="closeNotesFolderBtn"
            onClick={onClose}
            className="text-[#9C6644] hover:text-[#582F0E] p-1.5 rounded-xl hover:bg-[#FAF0CA]/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls & Search */}
        <div className="space-y-2 mb-3 flex-shrink-0">
          {/* Tabs and Add Button */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-[#FAF6F0] p-1 rounded-xl border border-[#E9DAC1]">
              <button
                type="button"
                id="notesFolderTabMonth"
                onClick={() => setFilterScope('month')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  filterScope === 'month'
                    ? 'bg-[#E76F51] text-white shadow-xs'
                    : 'text-[#6F441F] hover:bg-[#FAF0CA]'
                }`}
              >
                {currentYear}年{currentMonth + 1}月 ({monthCount})
              </button>
              <button
                type="button"
                id="notesFolderTabAll"
                onClick={() => setFilterScope('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  filterScope === 'all'
                    ? 'bg-[#E76F51] text-white shadow-xs'
                    : 'text-[#6F441F] hover:bg-[#FAF0CA]'
                }`}
              >
                所有筆記 ({totalCount})
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#FAF6F0] hover:bg-[#FAF0CA] border border-[#E9DAC1] text-[#6F441F] flex items-center gap-1 transition cursor-pointer"
                title="切換日期排序"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-[#E76F51]" />
                <span>{sortOrder === 'asc' ? '日期順序' : '最新在前'}</span>
              </button>
              <button
                type="button"
                id="notesFolderWriteTodayBtn"
                onClick={handleWriteToday}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FAF0CA] hover:bg-[#F4D35E] text-[#6F441F] border border-[#E0A96D] flex items-center gap-1 shadow-2xs transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#E76F51]" />
                <span>寫今日筆記</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#9C6644] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="notesFolderSearchInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋筆記內容、標籤、公事、看診、日期..."
              className="w-full bg-white border border-[#D4A373] focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#8B5A2B]/20 rounded-xl pl-9 pr-8 py-1.5 text-xs text-[#2D241E] placeholder:text-[#9C6644]/60 outline-none transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Notes List Content Area */}
        <div className="flex-grow overflow-y-auto pr-1 space-y-2">
          {filteredNotes.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#9C6644] bg-[#FAF6F0] rounded-2xl border border-[#E9DAC1]/60 flex flex-col items-center justify-center gap-2">
              <span className="text-3xl">📭</span>
              <p className="font-bold text-sm text-[#6F441F]">
                {searchQuery ? '沒有符合搜尋條件的筆記' : '此資料夾內目前尚無筆記'}
              </p>
              <p className="text-[11px] text-[#B08968] max-w-xs">
                💡 點擊「寫今日筆記」或直接點選日曆中的任意日期，即可記錄行程與公事看診！
              </p>
              <button
                type="button"
                onClick={handleWriteToday}
                className="mt-2 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-[#E76F51] hover:bg-[#D45A3C] transition shadow-xs cursor-pointer"
              >
                立即記錄第一則筆記
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredNotes.map((item) => (
                <div
                  key={item.dateKey}
                  id={`folderNoteCard-${item.dateKey}`}
                  onClick={() => handleCardClick(item.dateKey)}
                  className="bg-white hover:bg-[#FFFBF4] border border-[#E9DAC1] hover:border-[#D4A373] rounded-2xl p-3 transition shadow-2xs hover:shadow-xs cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Top: Date & Badges */}
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-[#582F0E]">
                          {item.year}年{item.month + 1}月{item.day}日
                        </span>
                        <span
                          className={`text-[11px] font-bold ${
                            item.isOff ? 'text-[#C2185B]' : 'text-[#6F441F]'
                          }`}
                        >
                          ({item.weekDay})
                        </span>
                        {item.holidayName && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-[#F8BBD0] text-[#C2185B]">
                            {item.holidayName}
                          </span>
                        )}
                      </div>

                      {item.stamps.length > 0 && (
                        <div className="flex items-center gap-0.5 text-xs bg-[#FAF6F0] px-1.5 py-0.5 rounded-md border border-[#E9DAC1]/50">
                          {item.stamps.map((st, sIdx) => (
                            <span key={sIdx}>{st}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Body: Note Text */}
                    <p className="text-xs text-[#2D241E] line-clamp-3 whitespace-pre-line leading-relaxed bg-[#FAF6F0]/40 p-2 rounded-xl border border-[#E9DAC1]/40">
                      {item.text}
                    </p>
                  </div>

                  {/* Card Bottom: Lunar Info & Edit Hint */}
                  <div className="mt-2.5 pt-1.5 border-t border-[#FAF0CA] flex items-center justify-between text-[11px] text-[#9C6644]">
                    <span>農曆 {item.lunarText}</span>
                    <span className="text-[#E76F51] font-bold group-hover:underline flex items-center gap-0.5">
                      <span>點擊編輯</span>
                      <span>📝</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-3 pt-2.5 border-t border-[#E9DAC1] flex items-center justify-between text-xs text-[#7F5539] flex-shrink-0">
          <span>
            目前顯示：<strong className="text-[#582F0E]">{filteredNotes.length}</strong> 則筆記
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-bold text-[#6F441F] bg-[#FAF6F0] hover:bg-[#E9DAC1] border border-[#D4A373] transition cursor-pointer"
          >
            關閉資料夾
          </button>
        </div>
      </div>
    </div>
  );
};
