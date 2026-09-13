import { HolidayInfo } from '../types';
import { HOLIDAY_MAP_2026, HOLIDAY_MAP_2027, HOLIDAY_MAP_2028 } from './holidays2026_2028';
import { SOLAR_TERMS_TABLE, getLunarFromSolar } from './lunarEngine';

export { HOLIDAY_MAP_2026, HOLIDAY_MAP_2027, HOLIDAY_MAP_2028 };

// 20 Explicit Memorial Days and Special Anniversaries specified by User
export const MEMORIAL_DAYS: Record<string, string> = {
  "01-01": "元旦",
  "02-28": "和平紀念日",
  "03-12": "國父逝世紀念日",
  "03-14": "反侵略日",
  "03-21": "民族平等日",
  "03-29": "青年節",
  "04-04": "兒童節",
  "04-05": "清明節",
  "04-07": "言論自由日",
  "05-01": "勞動節",
  "06-26": "原住民抵抗日",
  "07-15": "解嚴紀念日",
  "08-01": "原住民族日",
  "08-15": "終戰紀念日",
  "08-23": "八二三紀念日",
  "09-21": "國家防災日",
  "09-28": "孔子誕辰/教師節",
  "10-10": "國慶日",
  "10-24": "臺灣聯合國日",
  "10-25": "臺灣光復節",
  "11-12": "國父誕辰紀念日",
  "12-25": "行憲紀念日",
  "12-28": "全國客家日"
};

// Western & Cultural Holidays
export const WESTERN_HOLIDAYS: Record<string, string> = {
  "02-14": "西洋情人節",
  "03-14": "白色情人節",
  "04-01": "愚人節",
  "08-08": "父親節",
  "10-31": "萬聖夜",
  "12-24": "平安夜",
  "12-25": "聖誕節",
  "12-31": "跨年夜"
};

export function formatDateKey(y: number, m: number, d: number): string {
  const mm = String(m + 1).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
}

// Get Dynamic Holidays (Mother's Day, Thanksgiving)
export function getDynamicHoliday(y: number, m: number, d: number): string | null {
  // Mother's Day: 2nd Sunday in May (m === 4)
  if (m === 4) {
    const dayOfWeek = new Date(y, 4, d).getDay();
    if (dayOfWeek === 0 && d >= 8 && d <= 14) {
      return "母親節";
    }
  }
  // Thanksgiving: 4th Thursday in November (m === 10)
  if (m === 10) {
    const dayOfWeek = new Date(y, 10, d).getDay();
    if (dayOfWeek === 4 && d >= 22 && d <= 28) {
      return "感恩節";
    }
  }
  return null;
}

// Get Lunar Text / Festival display for date
export function getLunarText(y: number, m: number, d: number): string {
  const key = formatDateKey(y, m, d);

  // 1. Solar terms have highest priority in lunar spot
  if (SOLAR_TERMS_TABLE[key]) {
    return SOLAR_TERMS_TABLE[key];
  }

  // 2. Exact astronomical lunar calculation
  const lunar = getLunarFromSolar(y, m, d);
  if (!lunar) return "初一";

  // Lunar festival check
  const lm = lunar.lunarMonth;
  const ld = lunar.lunarDay;

  if (lm === 1 && ld === 1) return "春節";
  if (lm === 1 && ld === 15) return "元宵節";
  if (lm === 5 && ld === 5) return "端午節";
  if (lm === 7 && ld === 7) return "七夕情人節";
  if (lm === 7 && ld === 15) return "中元節";
  if (lm === 8 && ld === 15) return "中秋節";
  if (lm === 9 && ld === 9) return "重陽節";
  if (lm === 12 && (ld === 30 || (ld === 29 && !getLunarFromSolar(y, m, d + 1)?.lunarDay))) {
    return "除夕";
  }

  // First day of month display month name
  if (ld === 1) {
    return lunar.lunarMonthName;
  }

  return lunar.lunarDayName;
}

// Holiday info query for any year from 2026 to 2033
export function getHolidayInfo(y: number, m: number, d: number, dayOfWeek: number): {
  holiday: HolidayInfo | null;
  isOff: boolean;
} {
  const key = formatDateKey(y, m, d);
  const mmdd = `${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  let holiday: HolidayInfo | null = null;

  // 1. Predefined 2026, 2027, 2028 official government calendar maps
  if (y === 2026 && HOLIDAY_MAP_2026[key]) {
    holiday = HOLIDAY_MAP_2026[key];
  } else if (y === 2027 && HOLIDAY_MAP_2027[key]) {
    holiday = HOLIDAY_MAP_2027[key];
  } else if (y === 2028 && HOLIDAY_MAP_2028[key]) {
    holiday = HOLIDAY_MAP_2028[key];
  } else {
    // 2. For 2029 - 2033: calculate statutory holidays according to Taiwan National Holidays Law
    // New Year
    if (mmdd === "01-01") {
      holiday = { name: "中華民國開國紀念日(元旦)", isOff: true, label: "元旦" };
    }
    // 228 Peace Memorial Day
    else if (mmdd === "02-28") {
      holiday = { name: "和平紀念日(228)", isOff: true, label: "和平紀念日" };
    }
    // Children's Day & Qingming
    else if (mmdd === "04-04") {
      holiday = { name: "兒童節", isOff: true, label: "兒童節" };
    } else if (mmdd === "04-05") {
      holiday = { name: "清明節", isOff: true, label: "清明節" };
    }
    // Labor Day
    else if (mmdd === "05-01") {
      holiday = { name: "勞動節", isOff: true, label: "勞動節" };
    }
    // Teacher's Day
    else if (mmdd === "09-28") {
      holiday = { name: "孔子誕辰紀念日(教師節)", isOff: false, label: "教師節" };
    }
    // National Day
    else if (mmdd === "10-10") {
      holiday = { name: "國慶日", isOff: true, label: "國慶日" };
    }
    // Taiwan Retrocession Day
    else if (mmdd === "10-25") {
      holiday = { name: "臺灣光復節", isOff: true, label: "光復節" };
    }
    // Constitution Day
    else if (mmdd === "12-25") {
      holiday = { name: "行憲紀念日", isOff: true, label: "行憲紀念日" };
    } else {
      // Check Lunar Holidays (Spring Festival, Dragon Boat, Mid-Autumn)
      const lunar = getLunarFromSolar(y, m, d);
      if (lunar) {
        if (lunar.lunarMonth === 1 && lunar.lunarDay >= 1 && lunar.lunarDay <= 5) {
          const names = ["春節初一", "初二", "初三", "初四", "初五"];
          holiday = { name: `春節(${names[lunar.lunarDay - 1]})`, isOff: true, label: names[lunar.lunarDay - 1] };
        } else if (lunar.lunarMonth === 12 && lunar.lunarDay >= 29) {
          holiday = { name: "農曆除夕", isOff: true, label: "除夕" };
        } else if (lunar.lunarMonth === 5 && lunar.lunarDay === 5) {
          holiday = { name: "端午節", isOff: true, label: "端午節" };
        } else if (lunar.lunarMonth === 8 && lunar.lunarDay === 15) {
          holiday = { name: "中秋節", isOff: true, label: "中秋節" };
        }
      }
    }

    // Check memorial days (not off if not national holiday)
    if (!holiday && MEMORIAL_DAYS[mmdd]) {
      holiday = { name: MEMORIAL_DAYS[mmdd], isOff: false, label: MEMORIAL_DAYS[mmdd] };
    }

    // Check dynamic holidays (Mother's Day, Thanksgiving)
    if (!holiday) {
      const dynamic = getDynamicHoliday(y, m, d);
      if (dynamic) {
        holiday = { name: dynamic, isOff: false, label: dynamic };
      }
    }

    // Check Western holidays
    if (!holiday && WESTERN_HOLIDAYS[mmdd]) {
      holiday = { name: WESTERN_HOLIDAYS[mmdd], isOff: false, label: WESTERN_HOLIDAYS[mmdd] };
    }
  }

  const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
  const isOff = holiday ? holiday.isOff : isWeekend;

  return { holiday, isOff };
}
