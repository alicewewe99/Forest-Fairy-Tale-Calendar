import React, { useRef } from 'react';
import { Download, Upload, Calendar, X, FileText, CheckCircle2 } from 'lucide-react';
import { HOLIDAY_MAP_2026, HOLIDAY_MAP_2027, HOLIDAY_MAP_2028 } from '../data/holidays2026_2028';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  customStamps: Record<string, string[]>;
  onImportStamps: (imported: Record<string, string[]>) => void;
  onShowToast: (msg: string) => void;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  isOpen,
  onClose,
  customStamps,
  onImportStamps,
  onShowToast,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // 1. Generate standard .ics (iCalendar) file compatible with iPhone / Android / Google Calendar
  const handleExportICS = () => {
    let icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Squirrel and Panda Fairy Calendar//TW//ZH",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:花栗鼠與貓熊童話月曆行事曆",
      "X-WR-TIMEZONE:Asia/Taipei",
    ];

    // Export Official Taiwan Holidays
    const allHolidays = { ...HOLIDAY_MAP_2026, ...HOLIDAY_MAP_2027, ...HOLIDAY_MAP_2028 };
    Object.entries(allHolidays).forEach(([dateStr, h]) => {
      const cleanDate = dateStr.replace(/-/g, "");
      icsContent.push(
        "BEGIN:VEVENT",
        `UID:holiday-${cleanDate}@fairycalendar.app`,
        `DTSTAMP:${cleanDate}T000000Z`,
        `DTSTART;VALUE=DATE:${cleanDate}`,
        `SUMMARY:🇹🇼 ${h.name}${h.isOff ? '【國定假】' : ''}`,
        `DESCRIPTION:${h.name} - 花栗鼠與貓熊童話月曆法定休假日`,
        "STATUS:CONFIRMED",
        "TRANSP:TRANSPARENT",
        "END:VEVENT"
      );
    });

    // Export User Custom Stamped Events
    (Object.entries(customStamps) as [string, string[]][]).forEach(([dateStr, stamps]) => {
      if (!stamps || stamps.length === 0) return;
      const cleanDate = dateStr.replace(/-/g, "");
      const stampEmojis = stamps.join(" ");
      icsContent.push(
        "BEGIN:VEVENT",
        `UID:stamp-${cleanDate}-${Date.now()}@fairycalendar.app`,
        `DTSTAMP:${cleanDate}T000000Z`,
        `DTSTART;VALUE=DATE:${cleanDate}`,
        `SUMMARY:🐿️ 特殊標記 [${stampEmojis}]`,
        `DESCRIPTION:童話月曆行程標記：${stampEmojis} (日期: ${dateStr})`,
        "STATUS:CONFIRMED",
        "TRANSP:OPAQUE",
        "END:VEVENT"
      );
    });

    icsContent.push("END:VCALENDAR");

    const blob = new Blob([icsContent.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fairy-calendar-events.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast("已匯出 iCalendar (.ics) 行事曆檔案！");
  };

  // 2. Export JSON backup
  const handleExportJSON = () => {
    const data = {
      app: "squirrel-panda-fairy-calendar",
      version: "2.0",
      exportTime: new Date().toISOString(),
      customStamps,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fairy-calendar-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast("已匯出個人標記備份 JSON 檔案！");
  };

  // 3. Import JSON backup
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed.customStamps && typeof parsed.customStamps === 'object') {
          onImportStamps(parsed.customStamps);
          onShowToast("成功匯入個人行事曆標記！");
          onClose();
        } else {
          onShowToast("檔案格式不符合，請確認為正確的童話月曆備份檔");
        }
      } catch (err) {
        console.error(err);
        onShowToast("讀取檔案失敗，請檢查檔案格式");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border-2 border-[#D4A373] text-[#2D241E] max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#FAF0CA] flex items-center justify-center text-xl">
              🔄
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#8B5A2B] leading-tight">
                手機行事曆匯出與匯入同步
              </h3>
              <p className="text-xs text-gray-500">支援 iPhone、Android、Google 日曆與 Outlook</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Cards */}
        <div className="space-y-3.5">
          {/* Export ICS */}
          <div className="bg-[#FFFBF4] border border-[#E9DAC1] rounded-2xl p-3.5 sm:p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-[#6F441F] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#E76F51]" />
                  <span>匯出標準 .ics 行事曆檔案 (推薦)</span>
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  包含台灣國定假期與你蓋印的個人特殊標記。下載後點擊即可直接加入 iPhone 日曆、Google 日曆或提醒事項中！
                </p>
              </div>
            </div>
            <button
              id="exportIcsBtn"
              onClick={handleExportICS}
              className="mt-3 w-full bg-[#E76F51] hover:bg-[#D45A3C] active:scale-98 text-white font-extrabold text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>立即下載 .ics 行事曆檔案</span>
            </button>
          </div>

          {/* Export / Import JSON Backup */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 sm:p-4">
            <h4 className="font-extrabold text-sm sm:text-base text-gray-800 flex items-center gap-1.5 mb-1">
              <FileText className="w-4 h-4 text-[#8B5A2B]" />
              <span>個人標記備份與還原 (JSON 格式)</span>
            </h4>
            <p className="text-xs text-gray-500 mb-3">
              換手機或跨裝置時，可將蓋印的圖示標記備份至本機，並隨時匯入還原。
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                id="exportJsonBtn"
                onClick={handleExportJSON}
                className="bg-[#6B705C] hover:bg-[#585B4B] active:scale-98 text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>匯出 JSON 備份</span>
              </button>

              <button
                id="importJsonTriggerBtn"
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#2D6A4F] hover:bg-[#1B4332] active:scale-98 text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>匯入 JSON 還原</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Quick Guide for Phone Integration */}
          <div className="bg-[#FAF0CA]/50 border border-[#E0A96D] rounded-2xl p-3 text-xs text-[#582F0E]">
            <div className="font-bold mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E76F51]" />
              <span>手機匯入指引：</span>
            </div>
            <ul className="space-y-1 list-disc pl-4 text-[11px] text-gray-700">
              <li><b>iPhone:</b> 下載 .ics 檔案後點擊開啟，系統會詢問「加入全部行程到行事曆」，點選加入即可。</li>
              <li><b>Android / Google Calendar:</b> 打開 calendar.google.com 網頁版，至設定 ➔ 匯入與匯出 ➔ 選擇此 .ics 檔案即可全自動同步至手機！</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
