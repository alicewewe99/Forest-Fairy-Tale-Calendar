import { HolidayInfo } from '../types';

// Exact holiday and day-off maps matching the uploaded official calendar images
// IMG_4563 (2026 / 115年)
// IMG_4564 (2027 / 116年)
// IMG_4565 (2028 / 117年)

export const HOLIDAY_MAP_2026: Record<string, HolidayInfo> = {
  // 元旦 1/1 (四) 放假
  "2026-01-01": { name: "中華民國開國紀念日(元旦)", isOff: true, label: "元旦", isNationalHoliday: true },

  // 春節 2/15~2/22 (8天)
  "2026-02-14": { name: "西洋情人節", isOff: true, label: "西洋情人節" },
  "2026-02-15": { name: "春節小年夜", isOff: true, label: "小年夜", isNationalHoliday: true },
  "2026-02-16": { name: "農曆除夕", isOff: true, label: "除夕", isNationalHoliday: true },
  "2026-02-17": { name: "春節初一(雨水)", isOff: true, label: "正月", isNationalHoliday: true },
  "2026-02-18": { name: "春節初二", isOff: true, label: "初二", isNationalHoliday: true },
  "2026-02-19": { name: "春節初三", isOff: true, label: "初三", isNationalHoliday: true },
  "2026-02-20": { name: "春節初四", isOff: true, label: "初四", isNationalHoliday: true },
  "2026-02-21": { name: "春節初五", isOff: true, label: "初五", isNationalHoliday: true },
  "2026-02-22": { name: "春節初六", isOff: true, label: "初六", isNationalHoliday: true },

  // 和平紀念日連假 2/27~3/1 (3天) - 2/27(五)調整放假(圖上農曆顯示十一)
  "2026-02-27": { name: "和平紀念日調整放假(連假)", isOff: true, label: "十一", isCompensatoryOff: true, isNationalHoliday: true },
  "2026-02-28": { name: "和平紀念日(228)", isOff: true, label: "和平紀念日", isNationalHoliday: true },

  // 兒童節與清明節連假 4/3~4/6 (4天)
  // 4/3(五)調整放假(圖上農曆顯示十六)
  "2026-04-03": { name: "兒童清明連假調整放假", isOff: true, label: "十六", isCompensatoryOff: true, isNationalHoliday: true },
  "2026-04-04": { name: "兒童節", isOff: true, label: "兒童節", isNationalHoliday: true },
  "2026-04-05": { name: "清明節", isOff: true, label: "清明", isNationalHoliday: true },
  "2026-04-06": { name: "清明節補假", isOff: true, label: "十九", isCompensatoryOff: true, isNationalHoliday: true },

  // 勞動節 5/1~5/3 (3天)
  "2026-05-01": { name: "勞動節", isOff: true, label: "勞動節", isNationalHoliday: true },

  // 端午節 6/19~6/21 (3天)
  "2026-06-19": { name: "端午節", isOff: true, label: "端午節", isNationalHoliday: true },

  // 中秋節及孔子誕辰紀念日(教師節) 9/25~9/28 (4天連假)
  "2026-09-25": { name: "中秋節", isOff: true, label: "中秋節", isNationalHoliday: true },
  "2026-09-28": { name: "孔子誕辰紀念日(教師節)", isOff: true, label: "教師節", isNationalHoliday: true },

  // 國慶日 10/9~10/11 (3天)
  // 10/9(五)調整放假(圖上農曆顯示廿九)
  "2026-10-09": { name: "國慶連假調整放假", isOff: true, label: "廿九", isCompensatoryOff: true, isNationalHoliday: true },
  "2026-10-10": { name: "國慶日", isOff: true, label: "國慶日", isNationalHoliday: true },

  // 臺灣光復節 10/24~10/26 (3天)
  // 10/25逢週日，10/26(一)補假(圖上農曆顯示十七)
  "2026-10-25": { name: "臺灣光復節", isOff: true, label: "光復節", isNationalHoliday: true },
  "2026-10-26": { name: "臺灣光復節補假", isOff: true, label: "十七", isCompensatoryOff: true, isNationalHoliday: true },

  // 聖誕節/行憲紀念日 12/25~12/27 (3天)
  "2026-12-25": { name: "聖誕節/行憲紀念日", isOff: true, label: "行憲紀念日", isNationalHoliday: true }
};

export const HOLIDAY_MAP_2027: Record<string, HolidayInfo> = {
  // 元旦連假 1/1~1/3 (3天)
  "2027-01-01": { name: "中華民國開國紀念日(元旦)", isOff: true, label: "元旦", isNationalHoliday: true },

  // 春節 2/5(五)~2/10(三) (6天) - 2/4(四)立春為上班日(白底)
  "2027-02-05": { name: "農曆除夕", isOff: true, label: "除夕", isNationalHoliday: true },
  "2027-02-06": { name: "春節正月初一", isOff: true, label: "正月初一", isNationalHoliday: true },
  "2027-02-07": { name: "春節初二", isOff: true, label: "初二", isNationalHoliday: true },
  "2027-02-08": { name: "春節初三", isOff: true, label: "初三", isNationalHoliday: true },
  "2027-02-09": { name: "春節初四(補假)", isOff: true, label: "初四", isNationalHoliday: true },
  "2027-02-10": { name: "春節初五(補假)", isOff: true, label: "初五", isNationalHoliday: true },

  // 和平紀念日 2/27~3/1 (3天) - 2/28逢週日，3/1(一)補假(圖上農曆顯示廿四)
  "2027-02-28": { name: "和平紀念日(228)", isOff: true, label: "和平紀念日", isNationalHoliday: true },
  "2027-03-01": { name: "和平紀念日補假", isOff: true, label: "廿四", isCompensatoryOff: true, isNationalHoliday: true },

  // 兒童節與清明節 4/3~4/6 (4天)
  // 4/4兒童節逢週日，4/5清明節(一)，4/6(二)補假(圖上農曆顯示三十)
  "2027-04-04": { name: "兒童節", isOff: true, label: "兒童節", isNationalHoliday: true },
  "2027-04-05": { name: "清明節", isOff: true, label: "清明節", isNationalHoliday: true },
  "2027-04-06": { name: "兒童節補假", isOff: true, label: "三十", isCompensatoryOff: true, isNationalHoliday: true },

  // 勞動節 4/30~5/2 (3天) - 5/1逢週六，4/30(五)補假(圖上農曆顯示廿四)
  "2027-04-30": { name: "勞動節補假", isOff: true, label: "廿四", isCompensatoryOff: true, isNationalHoliday: true },
  "2027-05-01": { name: "勞動節", isOff: true, label: "勞動節", isNationalHoliday: true },

  // 端午節 6/9(三)
  "2027-06-09": { name: "端午節", isOff: true, label: "端午節", isNationalHoliday: true },

  // 中秋節 9/15(三)
  "2027-09-15": { name: "中秋節", isOff: true, label: "中秋節", isNationalHoliday: true },

  // 孔子誕辰紀念日(教師節) 9/28(二) - 圖中為粉紅底放假日
  "2027-09-28": { name: "孔子誕辰紀念日(教師節)", isOff: true, label: "教師節", isNationalHoliday: true },

  // 雙十國慶 10/9~10/11 (3天) - 10/10逢週日，10/11(一)補假(圖上農曆顯示十二)
  "2027-10-10": { name: "國慶日", isOff: true, label: "國慶日", isNationalHoliday: true },
  "2027-10-11": { name: "國慶日補假", isOff: true, label: "十二", isCompensatoryOff: true, isNationalHoliday: true },

  // 臺灣光復節 10/23~10/25 (3天) - 10/25(一)光復節放假
  "2027-10-25": { name: "臺灣光復節", isOff: true, label: "光復節", isNationalHoliday: true },

  // 行憲紀念日 12/24~12/26 (3天) - 12/25逢週六，12/24(五)補假(圖上農曆顯示廿七)
  "2027-12-24": { name: "行憲紀念日補假", isOff: true, label: "廿七", isCompensatoryOff: true, isNationalHoliday: true },
  "2027-12-25": { name: "行憲紀念日", isOff: true, label: "行憲紀念日", isNationalHoliday: true },

  // 2028跨年/元旦連假 12/31(五)調整放假(圖上農曆顯示初四)
  "2027-12-31": { name: "跨年調整放假", isOff: true, label: "初四", isCompensatoryOff: true, isNationalHoliday: true }
};

export const HOLIDAY_MAP_2028: Record<string, HolidayInfo> = {
  // 元旦 1/1(六)~1/2(日)
  "2028-01-01": { name: "中華民國開國紀念日(元旦)", isOff: true, label: "元旦", isNationalHoliday: true },

  // 春節 1/24(一)~1/30(日) (7天連假)
  "2028-01-24": { name: "春節小年夜", isOff: true, label: "小年夜", isNationalHoliday: true },
  "2028-01-25": { name: "農曆除夕", isOff: true, label: "除夕", isNationalHoliday: true },
  "2028-01-26": { name: "春節初一", isOff: true, label: "正月", isNationalHoliday: true },
  "2028-01-27": { name: "春節初二", isOff: true, label: "初二", isNationalHoliday: true },
  "2028-01-28": { name: "春節初三", isOff: true, label: "初三", isNationalHoliday: true },
  "2028-01-29": { name: "春節初四", isOff: true, label: "初四", isNationalHoliday: true },
  "2028-01-30": { name: "春節初五", isOff: true, label: "初五", isNationalHoliday: true },

  // 和平紀念日 2/26~2/28 (3天) - 2/28(一)
  "2028-02-28": { name: "和平紀念日(228)", isOff: true, label: "和平紀念日", isNationalHoliday: true },

  // 兒童清明 4/1~4/5 (5天連假)
  // 4/3(一)調整放假(圖上農曆顯示初九)
  // 4/4(二)清明/兒童節
  // 4/5(三)放假/補假(圖上農曆顯示十一)
  "2028-04-03": { name: "兒童清明連假調整放假", isOff: true, label: "初九", isCompensatoryOff: true, isNationalHoliday: true },
  "2028-04-04": { name: "清明節與兒童節", isOff: true, label: "清明/兒童節", isNationalHoliday: true },
  "2028-04-05": { name: "清明兒童節補假", isOff: true, label: "十一", isCompensatoryOff: true, isNationalHoliday: true },

  // 勞動節 4/29~5/1 (3天) - 5/1(一)
  "2028-05-01": { name: "勞動節", isOff: true, label: "勞動節", isNationalHoliday: true },

  // 端午節 5/27~5/29 (3天) - 5/28逢週日，5/29(一)補假(圖上農曆顯示初六)
  "2028-05-28": { name: "端午節", isOff: true, label: "端午節", isNationalHoliday: true },
  "2028-05-29": { name: "端午節補假", isOff: true, label: "初六", isCompensatoryOff: true, isNationalHoliday: true },

  // 孔子誕辰紀念日(教師節) 9/28(四) - 圖中為粉紅底放假日
  "2028-09-28": { name: "孔子誕辰紀念日(教師節)", isOff: true, label: "教師節", isNationalHoliday: true },

  // 中秋節 10/3(二) - 圖中為粉紅底放假日
  "2028-10-03": { name: "中秋節", isOff: true, label: "中秋節", isNationalHoliday: true },

  // 雙十國慶 10/10(二) - 圖中為粉紅底放假日
  "2028-10-10": { name: "國慶日", isOff: true, label: "國慶日", isNationalHoliday: true },

  // 臺灣光復節 10/25(三) - 圖中為粉紅底放假日
  "2028-10-25": { name: "臺灣光復節", isOff: true, label: "光復節", isNationalHoliday: true },

  // 聖誕節/行憲紀念日 12/23~12/25 (3天) - 12/25(一)放假日
  "2028-12-25": { name: "聖誕節/行憲紀念日", isOff: true, label: "聖誕節/行憲日", isNationalHoliday: true }
};
