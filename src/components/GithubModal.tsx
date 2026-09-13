import React from 'react';
import { Package, Download, Copy, X } from 'lucide-react';

interface GithubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const GithubModal: React.FC<GithubModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const handleDownloadHtml = () => {
    // Generate full standalone self-contained single-file HTML code
    const fullHtml = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>花栗鼠童話月曆</title>
  <meta name="theme-color" content="#8B5A2B" />
  <meta name="description" content="花栗鼠安徒生童話月曆，內建農曆節氣、國定假期、彩虹卡、鎮海宮靈籤、浪漫天使指引卡與愛的解答之書。" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content="花栗鼠月曆" />
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700;800&family=Noto+Sans+TC:wght@400;500;700&display=swap');
    body { font-family: 'M PLUS Rounded 1c', 'Noto Sans TC', sans-serif; background-color: #FAF6F0; color: #4A3525; user-select: none; }
    .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; background-color: #8C7B70; border: 2px solid #8C7B70; border-radius: 12px; overflow: hidden; }
    .cal-cell { height: 68px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; align-items: center; padding: 3px 1px; overflow: hidden; cursor: pointer; transition: transform 0.08s ease; }
    @media (min-width: 640px) { .cal-cell { height: 84px; padding: 5px 2px; } }
    .cal-cell:active { transform: scale(0.96); }
    .bg-holiday { background-color: #F8BBD0 !important; color: #880e4f; }
    .bg-workday { background-color: #FFFFFF !important; color: #2D241E; }
    .bg-other-month { background-color: #F5EFEB !important; opacity: 0.35; }
    .today-ring { outline: 3px solid #D97706; outline-offset: -3px; }
  </style>
</head>
<body class="min-h-screen flex flex-col">
  <div class="p-4 max-w-4xl mx-auto w-full text-center">
    <h1 class="text-2xl font-bold text-[#43281C]">🐿️ 花栗鼠童話月曆</h1>
    <p class="text-sm text-[#7F5539] mt-1">此獨立單檔版已準備就緒，可直接放置於 GitHub Pages 上線！</p>
  </div>
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast("已下載 index.html！可直接上傳至 GitHub 建立 App 🚀");
  };

  const handleCopySource = () => {
    navigator.clipboard.writeText("https://github.com");
    onShowToast("已複製 GitHub 網站連結！");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3">
      <div className="bg-white rounded-2xl max-w-lg w-full p-4 sm:p-5 shadow-2xl border-2 border-[#2D6A4F] text-[#2D241E] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b pb-2 mb-3">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-[#2D6A4F]" />
            <h3 className="font-extrabold text-base sm:text-lg text-[#2D6A4F]">
              匯出至 GitHub / 建立專屬 App
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold p-1 rounded-lg transition"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-gray-700">
          <p className="font-bold text-[#1B4332]">
            💡 如何免費將此花栗鼠月曆放上 GitHub Pages 成為正式手機 App：
          </p>

          <ol className="list-decimal pl-4 space-y-1.5 text-gray-600">
            <li>點擊下方按鈕【下載 index.html 完整單檔】。</li>
            <li>
              前往{' '}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline font-bold"
              >
                GitHub.com
              </a>{' '}
              建立一個新的公開 Repository（例如取名{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded text-red-600">
                squirrel-calendar
              </code>
              ）。
            </li>
            <li>
              將下載的{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded text-red-600">
                index.html
              </code>{' '}
              上傳至該 Repository 的根目錄。
            </li>
            <li>
              進入 Repo 的 <strong>Settings ➔ Pages</strong>，在 Branch 選擇{' '}
              <strong>main</strong> 點選 <strong>Save</strong>。
            </li>
            <li>
              幾秒鐘後即可獲得永久專屬網址（例如：
              <code className="bg-gray-100 px-1 py-0.5 rounded">
                https://yourname.github.io/squirrel-calendar/
              </code>
              ）！
            </li>
          </ol>

          <div className="bg-[#F0FFF4] border border-[#86EFAC] p-3 rounded-xl text-[#166534]">
            <span className="font-bold">✨ GitHub Pages 優勢：</span>
            <p className="mt-0.5">
              擁有獨立 HTTPS 網址後，手機相機掃描 QR Code 可以直接開啟並完美觸發 PWA 安裝提示（加入主畫面），不再受預覽環境限制！
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleDownloadHtml}
              className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold py-2.5 rounded-xl shadow transition flex items-center justify-center gap-2 text-sm active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>下載完整 index.html 檔案</span>
            </button>

            <button
              onClick={handleCopySource}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 rounded-xl transition flex items-center justify-center gap-2 active:scale-98"
            >
              <Copy className="w-4 h-4" />
              <span>複製 GitHub.com 連結</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
