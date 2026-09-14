import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Calendar, FileText, Sparkles, Tag } from 'lucide-react';
import { getFullLunarInfo, getHolidayInfo, getLunarText } from '../data/calendarData';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  dateKey: string | null; // "YYYY-MM-DD"
  initialNote: string;
  onSaveNote: (dateKey: string, noteText: string) => void;
  onDeleteNote: (dateKey: string) => void;
  stamps?: string[];
  onToggleStamp?: (dateKey: string, stamp: string) => void;
}

const QUICK_TAGS = [
  { label: '💼 工作公事', text: '【工作公事】' },
  { label: '💉 醫院看診', text: '【醫院看診】' },
  { label: '🎂 聚餐慶生', text: '【聚餐慶生】' },
  { label: '✈️ 旅遊出發', text: '【旅遊出發】' },
  { label: '⚠️ 重要待辦', text: '【重要待辦】' },
  { label: '💊 體檢用藥', text: '【健康提醒】' },
];

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  dateKey,
  initialNote,
  onSaveNote,
  onDeleteNote,
  stamps = [],
  onToggleStamp,
}) => {
  const [noteText, setNoteText] = useState(initialNote);

  useEffect(() => {
    setNoteText(initialNote);
  }, [initialNote, dateKey, isOpen]);

  if (!isOpen || !dateKey) return null;

  const [yStr, mStr, dStr] = dateKey.split('-');
  const y = parseInt(yStr, 10);
  const m = parseInt(mStr, 10) - 1;
  const d = parseInt(dStr, 10);
  const dateObj = new Date(y, m, d);
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekDayName = weekDays[dateObj.getDay()];

  const lunarInfo = getFullLunarInfo(y, m, d);
  const { holiday, isOff } = getHolidayInfo(y, m, d, dateObj.getDay());
  const cellSubtext = getLunarText(y, m, d);

  const handleSave = () => {
    onSaveNote(dateKey, noteText.trim());
    onClose();
  };

  const handleDelete = () => {
    onDeleteNote(dateKey);
    onClose();
  };

  const handleAddTag = (tagText: string) => {
    if (!noteText.includes(tagText)) {
      setNoteText((prev) => (prev ? `${tagText} ${prev}` : `${tagText} `));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFDF9] rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border-2 border-[#D4A373] text-[#2D241E] max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E9DAC1] pb-3 mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF0CA] border border-[#E0A96D] flex items-center justify-center text-2xl shadow-xs">
              📝
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-base sm:text-lg text-[#582F0E] leading-tight">
                  {y}年{m + 1}月{d}日 {weekDayName}
                </h3>
                {isOff && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#F8BBD0] text-[#C2185B] border border-[#F48FB1]">
                    {holiday?.name || '休假日'}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#7F5539] mt-0.5">
                農曆 {lunarInfo.monthName}{lunarInfo.dayName}
                {lunarInfo.jieQi ? ` • 【${lunarInfo.jieQi}】` : ''}
                {cellSubtext && cellSubtext !== lunarInfo.dayName && cellSubtext !== lunarInfo.jieQi ? ` • ${cellSubtext}` : ''}
              </p>
            </div>
          </div>
          <button
            id="closeNoteModalBtn"
            onClick={onClose}
            className="text-[#9C6644] hover:text-[#582F0E] p-1.5 rounded-xl hover:bg-[#FAF0CA]/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Existing Stamps Display & Quick Stamping */}
        <div className="mb-3.5 bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E9DAC1] flex items-center justify-between gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1.5 text-[#6F441F] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#E76F51]" />
            <span>此日印章：</span>
            {stamps && stamps.length > 0 ? (
              <span className="text-sm tracking-wider">{stamps.join(' ')}</span>
            ) : (
              <span className="text-[#9C6644] font-normal">尚無印章</span>
            )}
          </div>
          {onToggleStamp && (
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-[#8C5E35]">快速印章:</span>
              {['💼', '💉', '⭐', '🎈'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => onToggleStamp(dateKey, emoji)}
                  className={`px-1.5 py-0.5 rounded text-xs border transition cursor-pointer ${
                    stamps.includes(emoji)
                      ? 'bg-[#E76F51] text-white border-[#B23B1E]'
                      : 'bg-white border-[#D4A373] hover:bg-[#FAF0CA]'
                  }`}
                  title={`切換 ${emoji} 印章`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Tag Templates */}
        <div className="mb-2">
          <div className="flex items-center gap-1 text-xs text-[#7F5539] font-bold mb-1.5">
            <Tag className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>快捷標籤範本：</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {QUICK_TAGS.map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddTag(t.text)}
                className="text-xs px-2.5 py-1 rounded-lg bg-white border border-[#D4A373] text-[#582F0E] hover:bg-[#FAF0CA] transition cursor-pointer font-medium shadow-2xs active:scale-95"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className="mt-2.5">
          <label className="block text-xs font-bold text-[#6F441F] mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#E76F51]" />
              <span>筆記內容（儲存後日曆將自動以 📝 標示）：</span>
            </span>
            <span className="text-[11px] text-[#9C6644]">{noteText.length} 字</span>
          </label>
          <textarea
            id="noteContentTextarea"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            rows={5}
            placeholder="請輸入此日的重要待辦事項、出差地點、醫院看診、疫苗提醒、聚會或心情小記..."
            className="w-full bg-white border-2 border-[#D4A373] focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#8B5A2B]/20 rounded-2xl p-3 text-sm text-[#2D241E] placeholder:text-[#9C6644]/60 outline-none transition resize-none leading-relaxed"
            autoFocus
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-[#E9DAC1] flex items-center justify-between gap-2">
          <div>
            {initialNote && (
              <button
                id="deleteNoteBtn"
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 rounded-xl text-xs font-bold text-[#C2185B] bg-[#FDE2E4]/60 hover:bg-[#FDE2E4] border border-[#F48FB1] transition flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>刪除筆記</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              id="cancelNoteBtn"
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#6F441F] bg-[#FAF6F0] hover:bg-[#E9DAC1] border border-[#D4A373] transition cursor-pointer"
            >
              取消
            </button>
            <button
              id="saveNoteBtn"
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-[#E76F51] hover:bg-[#D45A3C] active:scale-95 shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>儲存筆記 📝</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
