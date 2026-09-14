import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TodayBar } from './components/TodayBar';
import { MonthSelector } from './components/MonthSelector';
import { StampSelector } from './components/StampSelector';
import { CalendarGrid } from './components/CalendarGrid';
import { MonthlyNotesList } from './components/MonthlyNotesList';
import { NoteModal } from './components/NoteModal';
import { OracleSection } from './components/OracleSection';
import { GithubModal } from './components/GithubModal';
import { PwaModal } from './components/PwaModal';
import { SyncModal } from './components/SyncModal';
import { Toast } from './components/Toast';
import { getLunarText, getFullLunarInfo } from './data/calendarData';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function App() {
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [selectedStamp, setSelectedStamp] = useState<string>("⭐");
  const [customStamps, setCustomStamps] = useState<Record<string, string[]>>({});
  const [customNotes, setCustomNotes] = useState<Record<string, string>>({});
  const [noteModalDate, setNoteModalDate] = useState<string | null>(null);

  // Modals
  const [isGithubOpen, setIsGithubOpen] = useState(false);
  const [isPwaOpen, setIsPwaOpen] = useState(false);
  const [isSyncOpen, setIsSyncOpen] = useState(false);

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // PWA Prompt
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  // Show Toast helper
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  // Initial load: "打開即是當天日期的月份"
  useEffect(() => {
    // 1. Load stamps & notes from localStorage
    try {
      const storedStamps = localStorage.getItem("squirrel_cal_stamps");
      if (storedStamps) {
        setCustomStamps(JSON.parse(storedStamps));
      }
    } catch {
      // ignore
    }

    try {
      const storedNotes = localStorage.getItem("squirrel_cal_notes");
      if (storedNotes) {
        setCustomNotes(JSON.parse(storedNotes));
      }
    } catch {
      // ignore
    }

    // 2. Set to today's month (bounded within 2026-2033)
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    if (y >= 2026 && y <= 2033) {
      setCurrentYear(y);
      setCurrentMonth(m);
    } else {
      setCurrentYear(2026);
      setCurrentMonth(m);
    }

    // 3. PWA install prompt listener
    const handlePrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handlePrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handlePrompt);
    };
  }, []);

  // Save stamps to localStorage
  const saveStamps = (newStamps: Record<string, string[]>) => {
    setCustomStamps(newStamps);
    try {
      localStorage.setItem("squirrel_cal_stamps", JSON.stringify(newStamps));
    } catch {
      // storage quota or private browsing
    }
  };

  // Save notes to localStorage
  const saveNotes = (newNotes: Record<string, string>) => {
    setCustomNotes(newNotes);
    try {
      localStorage.setItem("squirrel_cal_notes", JSON.stringify(newNotes));
    } catch {
      // storage quota or private browsing
    }
  };

  // Handle cell click (stamp toggle, clear, or open note if note mode)
  const handleCellClick = (dateKey: string) => {
    if (selectedStamp === "NOTE") {
      setNoteModalDate(dateKey);
      return;
    }

    const updated = { ...customStamps };
    const currentList = updated[dateKey] ? [...updated[dateKey]] : [];

    if (selectedStamp === "CLEAR") {
      delete updated[dateKey];
      saveStamps(updated);
      showToast(`已清除 ${dateKey} 印章`);
      return;
    }

    // If stamp already exists on date, toggle off
    if (currentList.includes(selectedStamp)) {
      const filtered = currentList.filter((s) => s !== selectedStamp);
      if (filtered.length > 0) {
        updated[dateKey] = filtered;
      } else {
        delete updated[dateKey];
      }
      saveStamps(updated);
      showToast(`已取消 ${dateKey} 的 ${selectedStamp} 印章`);
    } else {
      // Limit to 3 stamps
      if (currentList.length >= 3) {
        currentList.shift();
      }
      currentList.push(selectedStamp);
      updated[dateKey] = currentList;
      saveStamps(updated);
      showToast(`已標記 ${selectedStamp} 至 ${dateKey}`);
    }
  };

  // Note actions
  const handleOpenNote = (dateKey: string) => {
    setNoteModalDate(dateKey);
  };

  const handleSaveNote = (dateKey: string, noteText: string) => {
    const updated = { ...customNotes };
    if (noteText.trim()) {
      updated[dateKey] = noteText.trim();
      showToast(`已儲存 ${dateKey} 筆記 📝`);
    } else {
      delete updated[dateKey];
      showToast(`已清空 ${dateKey} 筆記`);
    }
    saveNotes(updated);
  };

  const handleDeleteNote = (dateKey: string) => {
    const updated = { ...customNotes };
    delete updated[dateKey];
    saveNotes(updated);
    showToast(`已刪除 ${dateKey} 筆記`);
  };

  const handleToggleStampForDate = (dateKey: string, stamp: string) => {
    const updated = { ...customStamps };
    const currentList = updated[dateKey] ? [...updated[dateKey]] : [];
    if (currentList.includes(stamp)) {
      const filtered = currentList.filter((s) => s !== stamp);
      if (filtered.length > 0) updated[dateKey] = filtered;
      else delete updated[dateKey];
      saveStamps(updated);
      showToast(`已取消 ${dateKey} 的 ${stamp} 印章`);
    } else {
      if (currentList.length >= 3) currentList.shift();
      currentList.push(stamp);
      updated[dateKey] = currentList;
      saveStamps(updated);
      showToast(`已為 ${dateKey} 蓋上 ${stamp} 印章`);
    }
  };

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      if (currentYear > 2026) {
        setCurrentMonth(11);
        setCurrentYear((y) => y - 1);
      }
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      if (currentYear < 2033) {
        setCurrentMonth(0);
        setCurrentYear((y) => y + 1);
      }
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Return to today: "回到今天的按鍵"
  const handleGoToToday = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    if (y >= 2026 && y <= 2033) {
      setCurrentYear(y);
      setCurrentMonth(m);
    } else {
      setCurrentYear(2026);
      setCurrentMonth(m);
    }
    showToast("已為您翻至當前月份 🌰🐼");
  };

  // Copy today: "格式：年月日農曆日期星期"
  const handleCopyToday = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const d = now.getDate();
    const weekDays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const w = weekDays[now.getDay()];
    const lunarInfo = getFullLunarInfo(y, m, d);

    const str = `${y}年${m + 1}月${d}日 農曆${lunarInfo.monthName}${lunarInfo.dayName}${lunarInfo.jieQi ? ` (${lunarInfo.jieQi})` : ''} ${w}`;
    navigator.clipboard.writeText(str);
    showToast(`已成功複製今日：${str}`);
  };

  // In-app PWA install trigger
  const handleInstallApp = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast("感謝安裝花栗鼠與貓熊童話月曆！");
      setInstallPrompt(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#4A3525]">
      {/* Top Header */}
      <Header
        onOpenGithub={() => setIsGithubOpen(true)}
        onOpenPwa={() => setIsPwaOpen(true)}
        onOpenSync={() => setIsSyncOpen(true)}
        isInstallable={!!installPrompt}
        onInstallApp={handleInstallApp}
      />

      {/* Main Container */}
      <main className="max-w-4xl w-full mx-auto p-2.5 sm:p-4 flex-grow flex flex-col space-y-3 sm:space-y-4">
        {/* Today Preview & One-click copy Bar */}
        <TodayBar
          onCopyToday={handleCopyToday}
          onGoToToday={handleGoToToday}
        />

        {/* Month Selector Bar (Big touch-friendly buttons, Year/Month/Prev/Next on same row) */}
        <MonthSelector
          currentYear={currentYear}
          currentMonth={currentMonth}
          onYearChange={setCurrentYear}
          onMonthChange={setCurrentMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        {/* Quick Stamp Marker Bar */}
        <StampSelector
          selectedStamp={selectedStamp}
          onSelectStamp={setSelectedStamp}
        />

        {/* Calendar Grid (Strict fixed 42 cells size & pink holiday markers & 📝 note icons) */}
        <CalendarGrid
          currentYear={currentYear}
          currentMonth={currentMonth}
          customStamps={customStamps}
          customNotes={customNotes}
          selectedStamp={selectedStamp}
          onCellClick={handleCellClick}
          onOpenNote={handleOpenNote}
        />

        {/* Monthly Notes List (Collapsible with count badge & quick editing) */}
        <MonthlyNotesList
          currentYear={currentYear}
          currentMonth={currentMonth}
          customNotes={customNotes}
          customStamps={customStamps}
          onOpenNote={handleOpenNote}
        />

        {/* 7 Great Oracle Sanctuaries */}
        <OracleSection />
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-[#9C6644] border-t border-[#E6CCB2] mt-6 bg-[#F5EBE0]">
        <p className="font-bold">🐿️🐼 花栗鼠與貓熊童話月曆 • 2026~2033年童話行事曆</p>
        <p className="text-[11px] text-[#B08968] mt-0.5">
          休假日粉紅底紅字標記 • 國定假期參照行政院人事行政總處最新標準 • 祝福您天天平安祥和
        </p>
      </footer>

      {/* Modals */}
      <GithubModal
        isOpen={isGithubOpen}
        onClose={() => setIsGithubOpen(false)}
        onShowToast={showToast}
      />

      <PwaModal
        isOpen={isPwaOpen}
        onClose={() => setIsPwaOpen(false)}
        onShowToast={showToast}
        isInstallable={!!installPrompt}
        onInstallApp={handleInstallApp}
      />

      <SyncModal
        isOpen={isSyncOpen}
        onClose={() => setIsSyncOpen(false)}
        customStamps={customStamps}
        customNotes={customNotes}
        onImportStamps={saveStamps}
        onImportNotes={saveNotes}
        onShowToast={showToast}
      />

      {/* Date Note Modal */}
      <NoteModal
        isOpen={noteModalDate !== null}
        onClose={() => setNoteModalDate(null)}
        dateKey={noteModalDate}
        initialNote={noteModalDate ? customNotes[noteModalDate] || "" : ""}
        onSaveNote={handleSaveNote}
        onDeleteNote={handleDeleteNote}
        stamps={noteModalDate ? customStamps[noteModalDate] || [] : []}
        onToggleStamp={handleToggleStampForDate}
      />

      {/* Floating Toast Notification */}
      <Toast message={toastMsg} />
    </div>
  );
}
