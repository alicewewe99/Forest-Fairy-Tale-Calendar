export interface HolidayInfo {
  name: string;
  isOff: boolean;
  label: string;
  isNationalHoliday?: boolean;
  isCompensatoryOff?: boolean;
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

export interface LovePoemCard {
  id: number;
  title: string;
  author: string;
  dynasty: string;
  poem: string[];
  allusion: string;
  coreMeaning: string;
  stageAdvice: {
    single: string;
    ambiguous: string;
    dating: string;
    married: string;
    reunion: string;
  };
  blessing: string;
}

export interface LoveStoryCard {
  id: number;
  title: string;
  theme: string;
  story: string;
  insight: string;
  advice: string;
}

