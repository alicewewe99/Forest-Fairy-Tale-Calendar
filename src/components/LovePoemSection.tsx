import React, { useState } from 'react';
import { Sparkles, Scroll, Heart, BookOpen, Flame, ShieldCheck, Check, Copy } from 'lucide-react';
import { LOVE_POEM_CARDS, LOVE_STORY_CARDS, NUWA_BLESSING_INFO } from '../data/loveOraclePoemData';
import { LovePoemCard, LoveStoryCard } from '../types';

type StageType = 'all' | 'single' | 'ambiguous' | 'dating' | 'married' | 'reunion';

export const LovePoemSection: React.FC = () => {
  const [poemResult, setPoemResult] = useState<LovePoemCard | null>(null);
  const [storyResult, setStoryResult] = useState<LoveStoryCard | null>(null);
  const [stage, setStage] = useState<StageType>('all');
  const [showTalismanModal, setShowTalismanModal] = useState<boolean>(false);
  const [copiedTalisman, setCopiedTalisman] = useState<boolean>(false);

  // Draw random poem (32 poems)
  const drawPoem = () => {
    const randomPoem = LOVE_POEM_CARDS[Math.floor(Math.random() * LOVE_POEM_CARDS.length)];
    setPoemResult(randomPoem);
  };

  // Draw random story card (30 cards)
  const drawStory = () => {
    const randomStory = LOVE_STORY_CARDS[Math.floor(Math.random() * LOVE_STORY_CARDS.length)];
    setStoryResult(randomStory);
  };

  // Draw both together
  const drawCombo = () => {
    const randomPoem = LOVE_POEM_CARDS[Math.floor(Math.random() * LOVE_POEM_CARDS.length)];
    const randomStory = LOVE_STORY_CARDS[Math.floor(Math.random() * LOVE_STORY_CARDS.length)];
    setPoemResult(randomPoem);
    setStoryResult(randomStory);
  };

  // Copy talisman blessing text
  const handleCopyTalisman = () => {
    const text = `【秦芸殿 女媧娘娘 愛情加持符】\n天作之合 • 永結同心 • 遇見正緣 • 琴瑟和鳴\n拜請女媧娘娘護佑，為所有遇見愛情課題的人賜福消災，隨身攜帶吸引好愛情能量接近！`;
    navigator.clipboard?.writeText(text);
    setCopiedTalisman(true);
    setTimeout(() => setCopiedTalisman(false), 2500);
  };

  return (
    <div className="space-y-3.5 pt-1" id="lovePoemOracleSanctuary">
      {/* Introduction Card */}
      <div className="bg-gradient-to-r from-[#FFF0F3] via-[#FFE5EC] to-[#FFF5EB] border-2 border-[#F4ACB7] rounded-2xl p-3 sm:p-4 shadow-xs">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xl">💖</span>
              <h3 className="text-sm sm:text-base font-black text-[#590D22]">
                【佛化人生】 愛情籤詩卡
              </h3>
              <span className="text-[10px] bg-[#E76F51] text-white px-2 py-0.5 rounded-full font-extrabold">
                全台首副愛情專屬籤詩
              </span>
              <span className="text-[10px] bg-[#D8577B] text-white px-2 py-0.5 rounded-full font-extrabold">
                拜請 女媧娘娘 護佑加持
              </span>
            </div>
            <p className="text-xs text-[#800F2F] mt-1 leading-relaxed">
              全台第一副專為愛情難題所設計的籤詩牌卡，精選 <b>32 首經典古詩</b> 與 <b>30 張愛情故事牌卡</b>，為單身、曖昧、交往、結婚或復合等不同階段的感情疑惑提供明確指引。
            </p>
          </div>
          <button
            onClick={() => setShowTalismanModal(true)}
            className="flex-shrink-0 bg-[#E01E37] hover:bg-[#C71F37] text-white text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-xs transition active:scale-95 flex items-center gap-1 cursor-pointer"
            title="查看女媧娘娘愛情加持符"
          >
            <span>📜</span>
            <span className="hidden sm:inline">愛情加持符</span>
          </button>
        </div>

        {/* Deity & Temple Note */}
        <div className="mt-2 pt-2 border-t border-[#F8B7C4] flex items-center justify-between text-[11px] text-[#A4133C] flex-wrap gap-1">
          <span>🏛️ <b>秦芸殿 奉祀 女媧娘娘</b> 慈悲護持，誠心祈求必獲一段天作之合姻緣</span>
          <span className="text-[#C9184A] font-semibold">隨身配戴愛情加持符 • 吸引正緣正桃花</span>
        </div>
      </div>

      {/* Stage Selector */}
      <div className="bg-[#FFFDF9] border border-[#E9DAC1] rounded-2xl p-2.5">
        <div className="text-xs font-extrabold text-[#7F5539] mb-1.5 flex items-center gap-1">
          <Heart className="w-3.5 h-3.5 text-[#E76F51]" />
          <span>選擇你目前面臨的感情課題階段（指引將自動加強標示）：</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: '全部階段', icon: '🌟' },
            { id: 'single', label: '單身祈緣', icon: '💖' },
            { id: 'ambiguous', label: '曖昧心意', icon: '🌸' },
            { id: 'dating', label: '戀愛交往', icon: '💑' },
            { id: 'married', label: '婚姻白首', icon: '💍' },
            { id: 'reunion', label: '復合重圓', icon: '🕊️' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStage(st.id as StageType)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1 ${
                stage === st.id
                  ? 'bg-[#590D22] text-white shadow-xs'
                  : 'bg-[#FFF0F3] border border-[#F4ACB7] text-[#800F2F] hover:bg-[#FFE5EC]'
              }`}
            >
              <span>{st.icon}</span>
              <span>{st.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          onClick={drawPoem}
          className="bg-[#D8577B] hover:bg-[#C24166] active:scale-98 text-white font-extrabold text-xs sm:text-sm py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
        >
          <span>🌸</span>
          <span>抽愛情古詩籤 (32首)</span>
        </button>

        <button
          onClick={drawStory}
          className="bg-[#8B5A2B] hover:bg-[#6F441F] active:scale-98 text-white font-extrabold text-xs sm:text-sm py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
        >
          <span>💌</span>
          <span>抽愛情故事牌 (30張)</span>
        </button>

        <button
          onClick={drawCombo}
          className="bg-[#E76F51] hover:bg-[#D45A3C] active:scale-98 text-white font-extrabold text-xs sm:text-sm py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>籤詩＋故事 綜合求指引</span>
        </button>
      </div>

      {/* Display Results */}
      {!poemResult && !storyResult ? (
        <div className="h-44 bg-[#FFF8F0] border-2 border-dashed border-[#F4ACB7] rounded-2xl flex flex-col items-center justify-center text-[#8B5A2B] text-xs p-4 text-center">
          <span className="text-4xl mb-2">🏮</span>
          <p className="font-extrabold text-sm text-[#590D22]">心中默念心儀對象姓名或您目前的感情疑惑</p>
          <p className="text-[11px] text-[#A4133C] mt-1 max-w-md">
            點選上方按鈕，恭請女媧娘娘賜福，為您抽取專屬的經典愛情古詩籤或情境故事指引牌卡
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* 1. Poem Card Result */}
          {poemResult && (
            <div className="bg-gradient-to-b from-[#FFFDF9] to-[#FFF5EB] border-2 border-[#D4A373] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#E9DAC1] pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📜</span>
                  <span className="text-xs font-black text-[#B23B1E]">
                    第 {poemResult.id} 籤 • {poemResult.dynasty}
                  </span>
                  <span className="text-xs font-bold text-[#8B5A2B]">
                    {poemResult.author}
                  </span>
                </div>
                <div className="text-xs bg-[#FAF0CA] border border-[#E0A96D] text-[#582F0E] px-2 py-0.5 rounded-full font-bold">
                  寓意：{poemResult.coreMeaning}
                </div>
              </div>

              {/* Title & Poem verses */}
              <div className="text-center py-3 bg-[#FFF0F3]/60 border border-[#F4ACB7]/50 rounded-xl">
                <h4 className="text-base sm:text-lg font-black text-[#590D22] tracking-wider mb-2">
                  {poemResult.title}
                </h4>
                <div className="space-y-1 font-serif text-sm sm:text-base text-[#43281C] font-bold">
                  {poemResult.poem.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              </div>

              {/* Allusion */}
              <div className="bg-[#FAF0CA]/50 p-3 rounded-xl border border-[#E0A96D]/60 text-xs text-[#582F0E] space-y-1">
                <b className="text-[#8B5A2B] flex items-center gap-1">
                  <span>📖</span>
                  <span>【經典詩韻與典故】：</span>
                </b>
                <p className="leading-relaxed">{poemResult.allusion}</p>
              </div>

              {/* Stage Advice Grid */}
              <div className="space-y-2">
                <div className="text-xs font-black text-[#43281C] flex items-center gap-1">
                  <span>🧭</span>
                  <span>【各階段感情指引】：</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {/* Single */}
                  <div className={`p-2.5 rounded-xl border transition ${
                    stage === 'single'
                      ? 'bg-[#FFF0F3] border-[#E01E37] ring-2 ring-[#E01E37]/30'
                      : 'bg-white border-[#E9DAC1]'
                  }`}>
                    <div className="font-extrabold text-[#A4133C] flex items-center justify-between mb-0.5">
                      <span>💖 單身階段</span>
                      {stage === 'single' && <span className="text-[10px] bg-[#E01E37] text-white px-1.5 py-0.2 rounded-full">當前焦點</span>}
                    </div>
                    <p className="text-[#43281C] text-[11px] leading-relaxed">{poemResult.stageAdvice.single}</p>
                  </div>

                  {/* Ambiguous */}
                  <div className={`p-2.5 rounded-xl border transition ${
                    stage === 'ambiguous'
                      ? 'bg-[#FFF0F3] border-[#E01E37] ring-2 ring-[#E01E37]/30'
                      : 'bg-white border-[#E9DAC1]'
                  }`}>
                    <div className="font-extrabold text-[#C9184A] flex items-center justify-between mb-0.5">
                      <span>🌸 曖昧階段</span>
                      {stage === 'ambiguous' && <span className="text-[10px] bg-[#E01E37] text-white px-1.5 py-0.2 rounded-full">當前焦點</span>}
                    </div>
                    <p className="text-[#43281C] text-[11px] leading-relaxed">{poemResult.stageAdvice.ambiguous}</p>
                  </div>

                  {/* Dating */}
                  <div className={`p-2.5 rounded-xl border transition ${
                    stage === 'dating'
                      ? 'bg-[#FFF0F3] border-[#E01E37] ring-2 ring-[#E01E37]/30'
                      : 'bg-white border-[#E9DAC1]'
                  }`}>
                    <div className="font-extrabold text-[#7209B7] flex items-center justify-between mb-0.5">
                      <span>💑 交往階段</span>
                      {stage === 'dating' && <span className="text-[10px] bg-[#E01E37] text-white px-1.5 py-0.2 rounded-full">當前焦點</span>}
                    </div>
                    <p className="text-[#43281C] text-[11px] leading-relaxed">{poemResult.stageAdvice.dating}</p>
                  </div>

                  {/* Married */}
                  <div className={`p-2.5 rounded-xl border transition ${
                    stage === 'married'
                      ? 'bg-[#FFF0F3] border-[#E01E37] ring-2 ring-[#E01E37]/30'
                      : 'bg-white border-[#E9DAC1]'
                  }`}>
                    <div className="font-extrabold text-[#2A9D8F] flex items-center justify-between mb-0.5">
                      <span>💍 結婚白首</span>
                      {stage === 'married' && <span className="text-[10px] bg-[#E01E37] text-white px-1.5 py-0.2 rounded-full">當前焦點</span>}
                    </div>
                    <p className="text-[#43281C] text-[11px] leading-relaxed">{poemResult.stageAdvice.married}</p>
                  </div>

                  {/* Reunion */}
                  <div className={`sm:col-span-2 p-2.5 rounded-xl border transition ${
                    stage === 'reunion'
                      ? 'bg-[#FFF0F3] border-[#E01E37] ring-2 ring-[#E01E37]/30'
                      : 'bg-white border-[#E9DAC1]'
                  }`}>
                    <div className="font-extrabold text-[#457B9D] flex items-center justify-between mb-0.5">
                      <span>🕊️ 復合重圓</span>
                      {stage === 'reunion' && <span className="text-[10px] bg-[#E01E37] text-white px-1.5 py-0.2 rounded-full">當前焦點</span>}
                    </div>
                    <p className="text-[#43281C] text-[11px] leading-relaxed">{poemResult.stageAdvice.reunion}</p>
                  </div>
                </div>
              </div>

              {/* Divine Blessing */}
              <div className="bg-[#E01E37]/10 border border-[#E01E37]/30 rounded-xl p-2.5 text-xs text-[#800F2F] flex items-center gap-2">
                <span className="text-xl">✨</span>
                <div>
                  <b className="text-[#A4133C]">【女媧娘娘神聖加持】：</b>
                  <span>{poemResult.blessing}</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. Story Card Result */}
          {storyResult && (
            <div className="bg-[#FFFDF9] border-2 border-[#F4ACB7] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[#F8B7C4] pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💌</span>
                  <span className="text-xs font-black text-[#590D22]">
                    愛情故事牌卡 • 第 {storyResult.id} 張
                  </span>
                </div>
                <div className="text-xs bg-[#FFE5EC] text-[#800F2F] font-bold px-2 py-0.5 rounded-full">
                  主題：{storyResult.theme}
                </div>
              </div>

              <div className="text-center py-2">
                <h4 className="text-base font-black text-[#800F2F]">
                  {storyResult.title}
                </h4>
              </div>

              {/* Story scene */}
              <div className="bg-[#FFF0F3] p-3 rounded-xl border border-[#F4ACB7] text-xs text-[#590D22] leading-relaxed">
                <b className="text-[#A4133C] block mb-1">【情境情結】：</b>
                <p>{storyResult.story}</p>
              </div>

              {/* Insight & Advice */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-[#FAF0CA]/60 p-2.5 rounded-xl border border-[#E0A96D] text-[#582F0E]">
                  <b className="text-[#8B5A2B] block mb-1">💡【愛情心靈啟發】：</b>
                  <p>{storyResult.insight}</p>
                </div>
                <div className="bg-[#E9F5ED] p-2.5 rounded-xl border border-[#A7C957] text-[#2D6A4F]">
                  <b className="text-[#1B4332] block mb-1">🎁【戀愛錦囊建言】：</b>
                  <p>{storyResult.advice}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Nuwa Talisman Card Preview & Prayer Guide */}
      <div className="bg-gradient-to-br from-[#85182A] via-[#9B2226] to-[#670E1A] text-white rounded-2xl p-4 shadow-md border-2 border-[#D4A373]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE5EC]/20 border border-[#F4ACB7] flex items-center justify-center text-2xl flex-shrink-0">
              🏮
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black tracking-wide flex items-center justify-center sm:justify-start gap-1.5">
                <span>女媧娘娘 愛情加持符</span>
                <span className="text-[10px] bg-[#E76F51] text-white px-2 py-0.2 rounded-full font-bold">
                  秦芸殿良緣正契
                </span>
              </h4>
              <p className="text-[11px] text-[#FFE5EC] opacity-90 mt-0.5 leading-relaxed">
                隨身攜帶吸引好愛情能量，拜請女媧娘娘護佑，誠心祈求必獲天作之合。
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setShowTalismanModal(true)}
              className="bg-[#FAF0CA] hover:bg-[#F4D35E] text-[#582F0E] text-xs font-black px-3 py-2 rounded-xl transition shadow-xs active:scale-95 cursor-pointer"
            >
              檢視加持符
            </button>
            <button
              onClick={handleCopyTalisman}
              className="bg-[#E76F51] hover:bg-[#D45A3C] text-white text-xs font-black px-3 py-2 rounded-xl transition shadow-xs active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              {copiedTalisman ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTalisman ? '已隨身加持' : '隨身加持'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal: 女媧娘娘 愛情加持符詳細圖面 */}
      {showTalismanModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#FFFDF9] border-4 border-[#B23B1E] rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowTalismanModal(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-3">
              <span className="text-3xl">🏮</span>
              <h3 className="text-lg font-black text-[#590D22]">
                秦芸殿 恭請 女媧娘娘
              </h3>
              <div className="text-xs bg-[#E76F51] text-white font-extrabold px-3 py-0.5 rounded-full inline-block">
                【 愛情加持符 】
              </div>

              {/* Graphic Talisman Box */}
              <div className="bg-gradient-to-b from-[#B23B1E] via-[#85182A] to-[#670E1A] border-4 border-[#FFD166] text-[#FFF8EE] rounded-2xl p-5 shadow-inner space-y-3 font-serif relative">
                <div className="border border-[#FFD166]/60 rounded-xl p-3 text-center space-y-2">
                  <div className="text-[11px] tracking-widest text-[#FFD166] font-sans font-bold">
                    ★ 敕 令 天 作 之 合 ★
                  </div>
                  <div className="text-xl sm:text-2xl font-black tracking-widest text-[#FFE5EC]">
                    有情人終成眷屬
                  </div>
                  <div className="text-sm tracking-wider text-[#FFD166]">
                    琴瑟和鳴 • 永結同心
                  </div>
                  <div className="text-[11px] text-[#FFF8EE] opacity-90 leading-relaxed font-sans">
                    拜請 女媧娘娘 聖真 普降甘露<br />
                    護佑善信男女 破除情障 吸引真愛<br />
                    得遇宿世良緣 白首不相離
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#FFD166]/40 flex items-center justify-center gap-1.5 text-[10px] text-[#FFD166] font-sans">
                    <span>印：</span>
                    <span className="border border-[#FFD166] px-1.5 py-0.2 rounded-xs bg-[#B23B1E] font-bold">
                      女媧娘娘姻緣真印
                    </span>
                  </div>
                </div>
              </div>

              {/* Guide text */}
              <p className="text-xs text-[#582F0E] text-left leading-relaxed bg-[#FAF0CA] p-3 rounded-xl border border-[#E0A96D]">
                <b>【隨身配戴與祈福引導】：</b><br />
                {NUWA_BLESSING_INFO.prayerGuide}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleCopyTalisman}
                  className="flex-1 bg-[#E01E37] hover:bg-[#C71F37] text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl shadow-xs transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedTalisman ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedTalisman ? '已複製符令與祝福' : '隨身請領加持祝福'}</span>
                </button>
                <button
                  onClick={() => setShowTalismanModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl transition cursor-pointer"
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
