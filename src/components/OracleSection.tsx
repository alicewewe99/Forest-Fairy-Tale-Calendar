import React, { useState } from 'react';
import { Sparkles, Shuffle, Heart, Compass, Moon, HelpCircle, BookOpen, Sun, ChevronDown, ChevronUp } from 'lucide-react';
import {
  RAINBOW_CARDS,
  TEMPLE_LOTS,
  ANGEL_CARDS,
  GOOD_GOD_CARDS,
  MOON_ORACLE_CARDS,
  LOVE_BOOK_ANSWERS,
  YES_NO_ORACLES
} from '../data/oracleData';
import { RainbowCard, TempleLot, AngelCard, GoodGodCard, MoonOracleCard, LoveBookAnswer, YesNoOracle } from '../types';
import { LovePoemSection } from './LovePoemSection';

type OracleTab = 'lovePoem' | 'rainbow' | 'temple' | 'angel' | 'goodGod' | 'moon' | 'loveBook' | 'yesNo';

export const OracleSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OracleTab>('rainbow');


  // State for each deck
  const [rainbowResult, setRainbowResult] = useState<{ card: RainbowCard; quote: string } | null>(null);
  const [templeResult, setTempleResult] = useState<TempleLot | null>(null);
  const [angelResult, setAngelResult] = useState<AngelCard | null>(null);
  const [goodGodResult, setGoodGodResult] = useState<GoodGodCard | null>(null);
  const [moonResult, setMoonResult] = useState<MoonOracleCard | null>(null);
  const [loveBookResult, setLoveBookResult] = useState<LoveBookAnswer | null>(null);
  const [yesNoResult, setYesNoResult] = useState<YesNoOracle | null>(null);

  // Rainbow Chakra explanation accordion
  const [showChakraGuide, setShowChakraGuide] = useState(false);

  // 1. Draw Rainbow Card
  const drawRainbow = () => {
    const keys = Object.keys(RAINBOW_CARDS);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const card = RAINBOW_CARDS[randomKey];
    const quote = card.quotes[Math.floor(Math.random() * card.quotes.length)];
    setRainbowResult({ card, quote });
  };

  // 2. Draw Temple Lot
  const drawTemple = () => {
    const lot = TEMPLE_LOTS[Math.floor(Math.random() * TEMPLE_LOTS.length)];
    setTempleResult(lot);
  };

  // 3. Draw Angel Card
  const drawAngel = () => {
    const card = ANGEL_CARDS[Math.floor(Math.random() * ANGEL_CARDS.length)];
    setAngelResult(card);
  };

  // 4. Draw Good God Card
  const drawGoodGod = () => {
    const card = GOOD_GOD_CARDS[Math.floor(Math.random() * GOOD_GOD_CARDS.length)];
    setGoodGodResult(card);
  };

  // 5. Draw Moon Oracle Card
  const drawMoon = () => {
    const card = MOON_ORACLE_CARDS[Math.floor(Math.random() * MOON_ORACLE_CARDS.length)];
    setMoonResult(card);
  };

  // 6. Draw Love Book Answer
  const drawLoveBook = () => {
    const ans = LOVE_BOOK_ANSWERS[Math.floor(Math.random() * LOVE_BOOK_ANSWERS.length)];
    setLoveBookResult(ans);
  };

  // 7. Draw YES / NO Oracle
  const drawYesNo = () => {
    const item = YES_NO_ORACLES[Math.floor(Math.random() * YES_NO_ORACLES.length)];
    setYesNoResult(item);
  };

  return (
    <div className="bg-[#FFFDF9] border-2 border-[#D4A373] rounded-3xl p-3.5 sm:p-5 shadow-md">
      {/* Title */}
      <div className="flex items-center justify-between gap-2 border-b border-[#E9DAC1] pb-3 mb-3.5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔮</span>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#43281C] flex items-center gap-1.5 flex-wrap">
              <span>每日心靈占卜與神諭殿堂</span>
              <span className="text-xs bg-[#E76F51] text-white px-2 py-0.5 rounded-full font-bold">
                8大指引體系
              </span>
              <span className="text-xs bg-[#D8577B] text-white px-2 py-0.5 rounded-full font-bold">
                含佛化人生愛情籤詩卡
              </span>
            </h2>
            <p className="text-[11px] text-[#7F5539]">
              誠心默念心中的疑惑或祈請，點選抽牌即可接收當下的神聖訊息
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation (Distinctly separates Love Book and Yes/No per request) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar" id="oracleTabsBar">
        <button
          id="tabBtn-lovePoem"
          onClick={() => setActiveTab('lovePoem')}
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
            activeTab === 'lovePoem'
              ? 'bg-[#E76F51] text-white shadow-xs ring-2 ring-[#E76F51]/30'
              : 'bg-[#FFF0F3] border border-[#F4ACB7] text-[#800F2F] hover:bg-[#FFE5EC]'
          }`}
        >
          <span>💖 【佛化人生】愛情籤詩卡</span>
        </button>

        <button
          id="tabBtn-rainbow"
          onClick={() => setActiveTab('rainbow')}
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
            activeTab === 'rainbow'
              ? 'bg-[#E76F51] text-white shadow-xs'
              : 'bg-[#FAF0CA] text-[#6F441F] hover:bg-[#F4D35E]'
          }`}
        >
          <span>🌈 彩虹卡</span>
        </button>


        <button
          id="tabBtn-temple"
          onClick={() => setActiveTab('temple')}
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
            activeTab === 'temple'
              ? 'bg-[#E76F51] text-white shadow-xs'
              : 'bg-[#FAF0CA] text-[#6F441F] hover:bg-[#F4D35E]'
          }`}
        >
          <span>🏮 鎮海宮靈籤</span>
        </button>

        <button
          id="tabBtn-angel"
          onClick={() => setActiveTab('angel')}
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
            activeTab === 'angel'
              ? 'bg-[#E76F51] text-white shadow-xs'
              : 'bg-[#FAF0CA] text-[#6F441F] hover:bg-[#F4D35E]'
          }`}
        >
          <span>👼 浪漫天使卡</span>
        </button>

        <button
          id="tabBtn-goodGod"
          onClick={() => setActiveTab('goodGod')}
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
            activeTab === 'goodGod'
              ? 'bg-[#E76F51] text-white shadow-xs'
              : 'bg-[#FAF0CA] text-[#6F441F] hover:bg-[#F4D35E]'
          }`}
        >
          <span>🏮 台灣好神卡</span>
        </button>

        <button
          id="tabBtn-moon"
          onClick={() => setActiveTab('moon')}
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
            activeTab === 'moon'
              ? 'bg-[#E76F51] text-white shadow-xs'
              : 'bg-[#FAF0CA] text-[#6F441F] hover:bg-[#F4D35E]'
          }`}
        >
          <span>🌙 月相神諭卡</span>
        </button>

        <button
          id="tabBtn-loveBook"
          onClick={() => setActiveTab('loveBook')}
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
            activeTab === 'loveBook'
              ? 'bg-[#E76F51] text-white shadow-xs'
              : 'bg-[#FAF0CA] text-[#6F441F] hover:bg-[#F4D35E]'
          }`}
        >
          <span>📖 愛的解答之書</span>
        </button>

        <button
          id="tabBtn-yesNo"
          onClick={() => setActiveTab('yesNo')}
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
            activeTab === 'yesNo'
              ? 'bg-[#E76F51] text-white shadow-xs'
              : 'bg-[#FAF0CA] text-[#6F441F] hover:bg-[#F4D35E]'
          }`}
        >
          <span>⚖️ YES / NO 指引</span>
        </button>
      </div>

      {/* Tab Content 0: 【佛化人生】 愛情籤詩卡 (Love Poem & Story Cards) */}
      {activeTab === 'lovePoem' && <LovePoemSection />}

      {/* Tab Content 1: 彩虹卡 (Rainbow Cards) */}
      {activeTab === 'rainbow' && (
        <div className="space-y-3 pt-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-[#7F5539]">
              Doris Wenzel 原作 • 彭瑛瑛老師翻譯 • 245 張七脈輪肯定話語與能量平衡
            </p>
            <button
              onClick={() => setShowChakraGuide(!showChakraGuide)}
              className="text-xs text-[#8B5A2B] font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>{showChakraGuide ? '收起' : '查看'} 7大脈輪色彩與失衡對照</span>
              {showChakraGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Chakra Guide Accordion */}
          {showChakraGuide && (
            <div className="bg-[#FAF0CA]/60 border border-[#E0A96D] rounded-2xl p-3 text-xs text-[#43281C] space-y-2">
              <div className="font-extrabold text-[#8B5A2B]">七大脈輪色彩與身心失衡症狀對照：</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div>🔴 <b>海底輪 (紅色)</b>: 活力、安全感。失衡時焦慮恐懼、缺乏安全感、難以落實。</div>
                <div>🟠 <b>臍輪 (橙色)</b>: 喜悅、創造力。失衡時情緒壓抑、索然無味、缺乏熱情。</div>
                <div>🟡 <b>太陽神經叢 (黃色)</b>: 智慧、自信。失衡時自我懷疑、缺乏魄力、猶豫不決。</div>
                <div>🟢 <b>心輪 (綠色)</b>: 愛、和諧、寬恕。失衡時防備心重、難以感受愛與溫暖。</div>
                <div>🔵 <b>喉輪 (藍色)</b>: 真誠溝通、自我表達。失衡時言不由衷、溝通障礙。</div>
                <div>🟣 <b>眉心輪 (靛色)</b>: 直覺、洞察力。失衡時迷惘困頓、思緒紛擾。</div>
                <div>🟪 <b>頂輪 (紫色)</b>: 靈性信念、神聖連結。失衡時感到孤立無援、失去希望。</div>
              </div>
            </div>
          )}

          {rainbowResult ? (
            <div
              className="rounded-2xl p-4 sm:p-6 text-white shadow-lg relative overflow-hidden transition-all duration-300"
              style={{ background: rainbowResult.card.gradient }}
            >
              <div className="text-xs uppercase tracking-wider font-bold opacity-80 mb-1">
                {rainbowResult.card.chakra}
              </div>
              <div className="text-base sm:text-lg font-black mb-3">
                {rainbowResult.card.colorName}
              </div>
              <div className="text-sm sm:text-base font-bold leading-relaxed bg-black/15 p-3.5 rounded-xl mb-3 backdrop-blur-2xs">
                「{rainbowResult.quote}」
              </div>
              <div className="text-xs opacity-90 leading-normal border-t border-white/20 pt-2.5">
                <div><b>能量涵義：</b>{rainbowResult.card.significance}</div>
                <div className="mt-1 text-white/80"><b>{rainbowResult.card.imbalance}</b></div>
              </div>
            </div>
          ) : (
            <div className="h-36 bg-[#FAF0CA]/40 border-2 border-dashed border-[#D4A373] rounded-2xl flex flex-col items-center justify-center text-[#7F5539] text-xs">
              <span className="text-3xl mb-1">🌈</span>
              <span>深呼吸，靜心祈請彩虹卡為你帶來當下的肯定語</span>
            </div>
          )}

          <button
            id="drawRainbowBtn"
            onClick={drawRainbow}
            className="w-full bg-[#E76F51] hover:bg-[#D45A3C] active:scale-98 text-white font-extrabold text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
            <span>{rainbowResult ? '再次抽取彩虹卡' : '抽一張彩虹卡'}</span>
          </button>
        </div>
      )}

      {/* Tab Content 2: 東港鎮海宮靈籤 */}
      {activeTab === 'temple' && (
        <div className="space-y-3 pt-1">
          <p className="text-xs text-[#7F5539]">
            東港鎮海宮七府千歲六十甲子靈籤 • 詩文、卦象、聖意解曰
          </p>

          {templeResult ? (
            <div className="bg-[#FFFBF4] border-2 border-[#D4A373] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[#E9DAC1] pb-2">
                <span className="text-sm sm:text-base font-black text-[#8B5A2B]">
                  {templeResult.no}
                </span>
                <span className="text-xs bg-[#FAF0CA] text-[#6F441F] font-bold px-2.5 py-0.5 rounded-full">
                  {templeResult.gua}
                </span>
              </div>

              {/* Poem */}
              <div className="text-center py-2 bg-[#FAF0CA]/50 rounded-xl">
                <p className="font-serif font-black text-sm sm:text-base text-[#43281C] whitespace-pre-line leading-relaxed tracking-wider">
                  {templeResult.poem}
                </p>
              </div>

              {/* Explanation & Fortune */}
              <div className="text-xs space-y-2 text-[#43281C]">
                <div>
                  <b className="text-[#8B5A2B]">【籤意白話解說】</b>
                  <p className="text-gray-700 mt-0.5 leading-relaxed">{templeResult.exp}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="bg-white p-2 rounded-lg border border-[#E9DAC1]">
                    <span className="font-bold text-[#E76F51]">【功名事業】</span>
                    <p className="text-gray-600 mt-0.5">{templeResult.career}</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-[#E9DAC1]">
                    <span className="font-bold text-[#D62828]">【婚姻良緣】</span>
                    <p className="text-gray-600 mt-0.5">{templeResult.marriage}</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-[#E9DAC1]">
                    <span className="font-bold text-[#2D6A4F]">【求財運勢】</span>
                    <p className="text-gray-600 mt-0.5">{templeResult.wealth}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-36 bg-[#FAF0CA]/40 border-2 border-dashed border-[#D4A373] rounded-2xl flex flex-col items-center justify-center text-[#7F5539] text-xs">
              <span className="text-3xl mb-1">🏮</span>
              <span>心中默念求問事項與生辰，誠心抽求鎮海宮靈籤</span>
            </div>
          )}

          <button
            id="drawTempleBtn"
            onClick={drawTemple}
            className="w-full bg-[#8B5A2B] hover:bg-[#6F441F] active:scale-98 text-white font-extrabold text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
            <span>{templeResult ? '再次求籤' : '虔誠抽籤'}</span>
          </button>
        </div>
      )}

      {/* Tab Content 3: 浪漫天使指引卡 */}
      {activeTab === 'angel' && (
        <div className="space-y-3 pt-1">
          <p className="text-xs text-[#7F5539]">
            朵琳．芙秋 (Doreen Virtue) 44 張浪漫天使指引卡 (Romance Angels Oracle Cards)
          </p>

          {angelResult ? (
            <div className="bg-gradient-to-br from-[#FFF0F5] to-[#FFE4E1] border-2 border-[#FFB6C1] rounded-2xl p-4 sm:p-5 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#C2185B]">
                    {angelResult.zh}
                  </h3>
                  <span className="text-xs font-serif italic text-[#880E4F]">
                    {angelResult.en}
                  </span>
                </div>
                <span className="text-2xl">👼</span>
              </div>

              <div className="bg-white/80 backdrop-blur-2xs p-3.5 rounded-xl border border-[#FFCCD5] text-xs sm:text-sm text-[#4A154B] font-bold leading-relaxed">
                「{angelResult.msg}」
              </div>

              <div className="text-xs text-gray-700 leading-relaxed bg-white/50 p-2.5 rounded-xl">
                <b className="text-[#C2185B]">天使的深層叮嚀：</b>
                <span className="block mt-0.5">{angelResult.guide}</span>
              </div>
            </div>
          ) : (
            <div className="h-36 bg-[#FFF0F5]/50 border-2 border-dashed border-[#FFB6C1] rounded-2xl flex flex-col items-center justify-center text-[#C2185B] text-xs">
              <span className="text-3xl mb-1">👼</span>
              <span>向浪漫天使祈請，為你的感情旅程帶來溫柔的指引</span>
            </div>
          )}

          <button
            id="drawAngelBtn"
            onClick={drawAngel}
            className="w-full bg-[#E64980] hover:bg-[#D6336C] active:scale-98 text-white font-extrabold text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Heart className="w-4 h-4" />
            <span>{angelResult ? '再次抽取天使卡' : '抽取浪漫天使指引卡'}</span>
          </button>
        </div>
      )}

      {/* Tab Content 4: 台灣好神卡 */}
      {activeTab === 'goodGod' && (
        <div className="space-y-3 pt-1">
          <p className="text-xs text-[#7F5539]">
            《台灣好神卡操作BOOK：點亮你的人生方向》44張神明與星象卡
          </p>

          {goodGodResult ? (
            <div className="bg-[#FFFDF9] border-2 border-[#D4A373] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[#E9DAC1] pb-2">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#43281C]" style={{ color: goodGodResult.color }}>
                    {goodGodResult.title}
                  </h3>
                  <span className="text-xs text-gray-500 font-bold">
                    原型：{goodGodResult.archetype}
                  </span>
                </div>
                <span className="text-xs bg-[#FAF0CA] text-[#6F441F] font-black px-2.5 py-1 rounded-lg">
                  {goodGodResult.god}
                </span>
              </div>

              <div className="bg-[#FAF0CA]/50 p-3 rounded-xl border border-[#E0A96D] text-xs sm:text-sm font-extrabold text-[#582F0E] leading-relaxed">
                🌟 神明賜福：{goodGodResult.blessing}
              </div>

              <div className="text-center py-2 bg-white rounded-xl border border-gray-100">
                <p className="font-serif font-black text-xs sm:text-sm text-[#43281C] whitespace-pre-line leading-relaxed">
                  {goodGodResult.poem}
                </p>
              </div>

              <div className="text-xs text-gray-700 bg-[#F7F3EE] p-2.5 rounded-xl">
                <b className="text-[#8B5A2B]">【好神指路建言】：</b>
                <span className="block mt-0.5">{goodGodResult.guidance}</span>
              </div>
            </div>
          ) : (
            <div className="h-36 bg-[#FAF0CA]/40 border-2 border-dashed border-[#D4A373] rounded-2xl flex flex-col items-center justify-center text-[#7F5539] text-xs">
              <span className="text-3xl mb-1">🏮</span>
              <span>虔敬祈求台灣眾神仙佛，為你指點迷津、點亮人生方向</span>
            </div>
          )}

          <button
            id="drawGoodGodBtn"
            onClick={drawGoodGod}
            className="w-full bg-[#D62828] hover:bg-[#BA181B] active:scale-98 text-white font-extrabold text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{goodGodResult ? '再次恭請好神卡' : '恭請一張台灣好神卡'}</span>
          </button>
        </div>
      )}

      {/* Tab Content 5: 月相神諭卡 */}
      {activeTab === 'moon' && (
        <div className="space-y-3 pt-1">
          <p className="text-xs text-[#7F5539]">
            月相神諭卡 (Moonology Oracle) • 44 張月相、新月滿月星座與特別月相卡
          </p>

          {moonResult ? (
            <div className="bg-[#1A1A2E] text-[#E0E1DD] rounded-2xl p-4 sm:p-5 shadow-lg space-y-3 border border-[#415A77]">
              <div className="flex items-center justify-between border-b border-white/15 pb-2">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#E0AAFF]">
                    {moonResult.title}
                  </h3>
                  <span className="text-xs text-[#9D4EDD] font-bold">
                    【{moonResult.phaseName}】
                  </span>
                </div>
                <span className="text-xs bg-[#3A0CA3] text-white px-2 py-0.5 rounded-full font-bold">
                  {moonResult.categoryLabel}
                </span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-xs sm:text-sm font-bold text-white leading-relaxed">
                ✨ 月相肯定語：「{moonResult.affirmation}」
              </div>

              <div className="text-xs space-y-1.5 text-gray-300">
                <div>
                  <b className="text-[#C77DFF]">月亮古老智慧：</b>
                  <p className="mt-0.5 leading-relaxed">{moonResult.wisdom}</p>
                </div>
                <div className="bg-[#0F3460] p-2 rounded-lg text-[11px] text-[#A9D6E5]">
                  <b>行動指引：</b> {moonResult.action}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-36 bg-[#1A1A2E]/90 border-2 border-dashed border-[#415A77] rounded-2xl flex flex-col items-center justify-center text-[#E0E1DD] text-xs">
              <span className="text-3xl mb-1">🌙</span>
              <span>感受月亮的潮汐引力，抽取一張專屬你的月相神諭卡</span>
            </div>
          )}

          <button
            id="drawMoonBtn"
            onClick={drawMoon}
            className="w-full bg-[#480CA8] hover:bg-[#3A0CA3] active:scale-98 text-white font-extrabold text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Moon className="w-4 h-4" />
            <span>{moonResult ? '再次抽取月相卡' : '抽取月相神諭卡'}</span>
          </button>
        </div>
      )}

      {/* Tab Content 6: 愛的解答之書 (The Book of Love Answers) - Independent */}
      {activeTab === 'loveBook' && (
        <div className="space-y-3 pt-1">
          <p className="text-xs text-[#7F5539]">
            《愛的解答之書》（The Book of Love Answers）• 專屬愛情的深邃啟示與陪伴心語
          </p>

          {loveBookResult ? (
            <div className="bg-[#FFF8F0] border-2 border-[#E76F51] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[#F4A261]/30 pb-2">
                <span className="text-xs sm:text-sm font-extrabold text-[#E76F51] flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>愛的解答之書 • 翻頁啟示</span>
                </span>
                <span className="text-xl">📖</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E9DAC1] text-center shadow-xs">
                <p className="font-serif font-black text-base sm:text-lg text-[#6F441F] leading-relaxed">
                  「{loveBookResult.quote}」
                </p>
              </div>

              <div className="text-xs text-gray-700 space-y-1.5">
                <div>
                  <b className="text-[#8B5A2B]">【啟示深意】：</b>
                  <p className="mt-0.5 leading-relaxed">{loveBookResult.meaning}</p>
                </div>
                <div className="bg-[#FAF0CA] p-2.5 rounded-xl border border-[#E0A96D] text-[11px] text-[#582F0E]">
                  <b>【行動小建議】：</b> {loveBookResult.actionAdvice}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-36 bg-[#FFF8F0] border-2 border-dashed border-[#E76F51] rounded-2xl flex flex-col items-center justify-center text-[#8B5A2B] text-xs">
              <span className="text-3xl mb-1">📖</span>
              <span>心中想著感情上的困擾或對象，翻開《愛的解答之書》</span>
            </div>
          )}

          <button
            id="drawLoveBookBtn"
            onClick={drawLoveBook}
            className="w-full bg-[#E76F51] hover:bg-[#D45A3C] active:scale-98 text-white font-extrabold text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>{loveBookResult ? '再翻一頁愛的解答之書' : '翻開愛的解答之書'}</span>
          </button>
        </div>
      )}

      {/* Tab Content 7: YES / NO 愛情指引 - Independent */}
      {activeTab === 'yesNo' && (
        <div className="space-y-3 pt-1">
          <p className="text-xs text-[#7F5539]">
            YES / NO 愛情專屬直覺裁決 • 清晰決斷的當下能量反饋
          </p>

          {yesNoResult ? (
            <div className="bg-white border-2 border-[#D4A373] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-xs font-bold text-gray-500">
                  直覺裁決結果
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-black text-white ${
                  yesNoResult.verdict === 'YES'
                    ? 'bg-[#2D6A4F]'
                    : yesNoResult.verdict === 'NO'
                    ? 'bg-[#D62828]'
                    : 'bg-[#F77F00]'
                }`}>
                  {yesNoResult.verdict}
                </span>
              </div>

              <div className="text-center py-3 bg-[#FAF0CA]/40 rounded-xl">
                <div className="text-lg sm:text-xl font-black text-[#43281C]">
                  {yesNoResult.ans}
                </div>
                <p className="text-xs text-gray-600 mt-1.5 font-medium">
                  {yesNoResult.desc}
                </p>
              </div>

              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-xs text-gray-700">
                <b className="text-[#8B5A2B]">【此刻建言】：</b>
                <span className="block mt-0.5">{yesNoResult.advice}</span>
              </div>
            </div>
          ) : (
            <div className="h-36 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-500 text-xs">
              <span className="text-3xl mb-1">⚖️</span>
              <span>心中默想一個是非問題（例如：他是否合適我？我該主動嗎？）</span>
            </div>
          )}

          <button
            id="drawYesNoBtn"
            onClick={drawYesNo}
            className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] active:scale-98 text-white font-extrabold text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{yesNoResult ? '再次詢問 YES / NO' : '獲取 YES / NO 裁決'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
