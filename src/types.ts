export interface HolidayInfo {
  name: string;
  isOff: boolean;
  label: string;
}

export interface DayData {
  year: number;
  month: number; // 0-11
  date: number;
  dateKey: string; // YYYY-MM-DD
  isCurrentMonth: boolean;
  dayOfWeek: number; // 0 (Sun) - 6 (Sat)
  isWeekend: boolean;
  holiday: HolidayInfo | null;
  isOff: boolean;
  lunarText: string;
  isToday: boolean;
  stamps: string[];
}

export interface RainbowCard {
  chakra: string;
  colorName: string;
  significance: string;
  imbalance: string;
  gradient: string;
  quotes: string[];
}

export interface TempleLot {
  no: string;
  gua: string;
  poem: string;
  exp: string;
  career?: string;
  marriage?: string;
  wealth?: string;
}

export interface AngelCard {
  zh: string;
  en: string;
  msg: string;
  guide: string;
}

export interface GoodGodCard {
  title: string;
  god: string;
  archetype: string;
  blessing: string;
  poem: string;
  guidance: string;
  color: string;
}

export interface MoonOracleCard {
  title: string;
  category: 'phase' | 'new_moon' | 'full_moon' | 'special';
  categoryLabel: string;
  phaseName: string;
  affirmation: string;
  wisdom: string;
  action: string;
}

export interface LoveBookAnswer {
  quote: string;
  meaning: string;
  actionAdvice: string;
}

export interface YesNoOracle {
  ans: string;
  verdict: 'YES' | 'NO' | 'WAIT' | 'MAYBE';
  desc: string;
  advice: string;
}
