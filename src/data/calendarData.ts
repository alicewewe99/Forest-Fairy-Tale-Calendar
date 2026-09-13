import { Solar } from 'lunar-javascript';
import { HolidayInfo } from '../types';
import { HOLIDAY_MAP_2026, HOLIDAY_MAP_2027, HOLIDAY_MAP_2028 } from './holidays2026_2028';

// Date key helper YYYY-MM-DD
export function formatDateKey(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

// Convert simplified/engine lunar month text to traditional calendar format
export function formatLunarMonthName(mStr: string): string {
  let res = mStr.replace("腊", "臘").replace("闰", "閏");
  if (res === "冬") return "十一月";
  if (res === "臘") return "臘月";
  if (res === "正") return "正月";
  if (!res.endsWith("月")) return res + "月";
  return res;
}

// Fixed Western & Memorial days
export const MEMORIAL_DAYS: Record<string, string> = {
  "02-14": "西洋情人節",
  "03-08": "婦女節",
  "03-14": "白色情人節",
  "03-29": "青年節",
  "04-01": "愚人節",
  "08-08": "父親節",
  "09-03": "軍人節",
  "10-31": "萬聖節",
  "12-25": "行憲紀念日",
};

// Dynamic holidays: Mother's Day, Thanksgiving, Black Friday
export function getDynamicHoliday(y: number, m: number, d: number): string | null {
  // Mother's Day: 2nd Sunday in May (m === 4)
  if (m === 4) {
    const firstDay = new Date(y, 4, 1).getDay();
    const firstSunday = (7 - firstDay) % 7 + 1;
    const secondSunday = firstSunday + 7;
    if (d === secondSunday) return "母親節";
  }

  // Thanksgiving: 4th Thursday in November (m === 10)
  if (m === 10) {
    const firstDay = new Date(y, 10, 1).getDay();
    const firstThursday = (4 - firstDay + 7) % 7 + 1;
    const fourthThursday = firstThursday + 21;
    if (d === fourthThursday) return "感恩節";
    if (d === fourthThursday + 1) return "黑色星期五";
  }

  return null;
}

// Special combination labels observed in the uploaded official calendar images
const SPECIAL_IMAGE_LABELS: Record<string, string> = {
  "2026-10-10": "九月/國慶日",
  "2026-12-25": "聖誕節/行憲日",
  "2028-04-04": "清明/兒童節",
  "2028-07-22": "六月/大暑",
  "2028-09-03": "中元節/軍人節",
  "2028-12-25": "聖誕節/行憲日",
};

// Query holiday and day-off status for any given date (2026~2033)
export function getHolidayInfo(y: number, m: number, d: number, dayOfWeek: number): {
  holiday: HolidayInfo | null;
  isOff: boolean;
} {
  const key = formatDateKey(y, m, d);
  const mmdd = `${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  let holiday: HolidayInfo | null = null;

  // 1. Exact 2026, 2027, 2028 government calendar definitions
  if (y === 2026 && HOLIDAY_MAP_2026[key]) {
    holiday = HOLIDAY_MAP_2026[key];
  } else if (y === 2027 && HOLIDAY_MAP_2027[key]) {
    holiday = HOLIDAY_MAP_2027[key];
  } else if (y === 2028 && HOLIDAY_MAP_2028[key]) {
    holiday = HOLIDAY_MAP_2028[key];
  } else if (y >= 2029) {
    // 2. Algorithmic fallback for 2029-2033 based on statutory Taiwan holidays
    if (mmdd === "01-01") {
      holiday = { name: "中華民國開國紀念日(元旦)", isOff: true, label: "元旦", isNationalHoliday: true };
    } else if (mmdd === "02-28") {
      holiday = { name: "和平紀念日(228)", isOff: true, label: "和平紀念日", isNationalHoliday: true };
    } else if (mmdd === "04-04") {
      holiday = { name: "兒童節", isOff: true, label: "兒童節", isNationalHoliday: true };
    } else if (mmdd === "04-05") {
      holiday = { name: "清明節", isOff: true, label: "清明節", isNationalHoliday: true };
    } else if (mmdd === "05-01") {
      holiday = { name: "勞動節", isOff: true, label: "勞動節", isNationalHoliday: true };
    } else if (mmdd === "09-28") {
      holiday = { name: "孔子誕辰紀念日(教師節)", isOff: true, label: "教師節", isNationalHoliday: true };
    } else if (mmdd === "10-10") {
      holiday = { name: "國慶日", isOff: true, label: "國慶日", isNationalHoliday: true };
    } else if (mmdd === "10-25") {
      holiday = { name: "臺灣光復節", isOff: true, label: "光復節", isNationalHoliday: true };
    } else if (mmdd === "12-25") {
      holiday = { name: "行憲紀念日", isOff: true, label: "行憲紀念日", isNationalHoliday: true };
    } else {
      // Check Lunar holidays (Spring Festival, Dragon Boat, Mid-Autumn)
      const solar = Solar.fromYmd(y, m + 1, d);
      const lunar = solar.getLunar();
      const lm = lunar.getMonth();
      const ld = lunar.getDay();

      if (lm === 1 && ld >= 1 && ld <= 5) {
        const names = ["春節初一", "春節初二", "春節初三", "春節初四", "春節初五"];
        holiday = { name: names[ld - 1], isOff: true, label: names[ld - 1], isNationalHoliday: true };
      } else if (lm === 12 && (ld === 30 || (ld === 29 && lunar.getDaysInMonth() === 29))) {
        holiday = { name: "農曆除夕", isOff: true, label: "除夕", isNationalHoliday: true };
      } else if (lm === 5 && ld === 5) {
        holiday = { name: "端午節", isOff: true, label: "端午節", isNationalHoliday: true };
      } else if (lm === 8 && ld === 15) {
        holiday = { name: "中秋節", isOff: true, label: "中秋節", isNationalHoliday: true };
      }
    }
  }

  // Check memorial / western / dynamic holidays for labeling
  if (!holiday) {
    if (MEMORIAL_DAYS[mmdd]) {
      holiday = { name: MEMORIAL_DAYS[mmdd], isOff: false, label: MEMORIAL_DAYS[mmdd] };
    } else {
      const dynamic = getDynamicHoliday(y, m, d);
      if (dynamic) {
        holiday = { name: dynamic, isOff: false, label: dynamic };
      }
    }
  }

  // Weekends are off (pink), unless explicitly designated as workday
  const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
  const isOff = holiday ? (holiday.isOff || isWeekend) : isWeekend;

  return { holiday, isOff };
}

// Subtext rendered on the calendar cell (Lunar day, Solar term, or Festival name)
export function getLunarText(y: number, m: number, d: number): string {
  const key = formatDateKey(y, m, d);

  // 1. Check special combined image labels
  if (SPECIAL_IMAGE_LABELS[key]) {
    return SPECIAL_IMAGE_LABELS[key];
  }

  // 2. Check 2026~2028 predefined holiday definitions
  let holiday: HolidayInfo | null = null;
  if (y === 2026) holiday = HOLIDAY_MAP_2026[key];
  else if (y === 2027) holiday = HOLIDAY_MAP_2027[key];
  else if (y === 2028) holiday = HOLIDAY_MAP_2028[key];

  // If it's an official holiday with a dedicated festival label (not a compensatory off)
  if (holiday && !holiday.isCompensatoryOff) {
    return holiday.label;
  }

  // 3. Astronomical lunar calculation via lunar-javascript
  const solar = Solar.fromYmd(y, m + 1, d);
  const lunar = solar.getLunar();

  // Check 24 solar terms (24節氣)
  const jieQi = lunar.getJieQi();
  if (jieQi) {
    return jieQi;
  }

  // Check lunar festivals
  const lm = lunar.getMonth();
  const ld = lunar.getDay();
  if (lm === 1 && ld === 15) return "元宵節";
  if (lm === 7 && ld === 7) return "七夕情人節";
  if (lm === 7 && ld === 15) return "中元節";
  if (lm === 9 && ld === 9) return "重陽節";

  // Check memorial or dynamic holidays
  const mmdd = `${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  if (MEMORIAL_DAYS[mmdd]) {
    return MEMORIAL_DAYS[mmdd];
  }
  const dynamic = getDynamicHoliday(y, m, d);
  if (dynamic) {
    return dynamic;
  }

  // First day of month shows month name (e.g. 臘月, 正月, 二月, 閏五月)
  const dayInChinese = lunar.getDayInChinese();
  if (dayInChinese === "初一") {
    return formatLunarMonthName(lunar.getMonthInChinese());
  }

  // Standard lunar day
  return dayInChinese;
}

// Full detailed lunar information for display or copy
export function getFullLunarInfo(y: number, m: number, d: number) {
  const solar = Solar.fromYmd(y, m + 1, d);
  const lunar = solar.getLunar();
  const jieQi = lunar.getJieQi();

  const yearGanZhi = lunar.getYearInGanZhi();
  const shengXiao = lunar.getYearShengXiao();
  const monthName = formatLunarMonthName(lunar.getMonthInChinese());
  const dayName = lunar.getDayInChinese();

  const formattedStr = `${yearGanZhi}年 (${shengXiao}年) ${monthName}${dayName}${jieQi ? ` • 【${jieQi}】` : ''}`;

  return {
    yearGanZhi,
    shengXiao,
    monthName,
    dayName,
    jieQi,
    formattedStr,
  };
}
