import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Smartphone, Copy, Download, ExternalLink, X, Check, Share2, Sparkles } from 'lucide-react';

interface PwaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  isInstallable?: boolean;
  onInstallApp?: () => void;
}

export const PwaModal: React.FC<PwaModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  isInstallable,
  onInstallApp,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [appUrl, setAppUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Compute clean accessible public URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let cleanUrl = window.location.origin + window.location.pathname;
      
      // Clean trailing slashes or sandbox frames
      try {
        if (window.top && window.top !== window && window.top.location.href) {
          // If top frame accessible
          cleanUrl = window.top.location.origin + window.top.location.pathname;
        }
      } catch {
        // Cross-origin iframe expected in sandbox; origin is correct
      }

      setAppUrl(cleanUrl);
    }
  }, [isOpen]);

  // Generate QR code whenever appUrl or isOpen changes
  useEffect(() => {
    if (isOpen && canvasRef.current && appUrl) {
      QRCode.toCanvas(canvasRef.current, appUrl, {
        width: 190,
        margin: 1,
        color: {
          dark: '#3A1E06',
          light: '#FFFFFF',
        },
      }).catch((err) => {
        console.error("QR Code generation error:", err);
      });
    }
  }, [isOpen, appUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!appUrl) return;
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    onShowToast("已複製 PWA 網址！");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQrImage = () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = canvasRef.current.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "squirrel-calendar-pwa-qrcode.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      onShowToast("已下載 QR Code 圖片到本機！");
    } catch (e) {
      console.error(e);
      onShowToast("下載圖片失敗，請長按 QR Code 儲存圖片");
    }
  };

  const handleOpenNewTab = () => {
    if (appUrl) {
      window.open(appUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white rounded-3xl max-w-md w-full p-4 sm:p-5 shadow-2xl border-2 border-[#E76F51] text-[#2D241E] text-center max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-2.5 mb-3">
          <div className="flex items-center gap-2.5 text-left">
            <img 
              src="/apple-touch-icon.png" 
              alt="桌面圖示預覽" 
              className="w-10 h-10 rounded-2xl shadow-sm border border-[#A2D2FF] object-cover flex-shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#8B5A2B] leading-tight">
                安裝至手機與電腦桌面
              </h3>
              <p className="text-[11px] text-[#9C6644] leading-tight">
                花栗鼠與貓熊童話月曆 App 圖示
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold p-1 rounded-xl transition cursor-pointer"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code Canvas */}
        <div className="flex flex-col items-center justify-center">
          <div className="p-3 bg-[#FFFBF4] border-2 border-dashed border-[#E76F51] rounded-2xl shadow-inner my-1 flex flex-col items-center">
            <canvas ref={canvasRef} className="w-[190px] h-[190px] rounded-lg" />
            <span className="text-[11px] text-[#7F5539] font-bold mt-1">
              手機相機直接掃碼開啟
            </span>
          </div>

          {/* Download QR Code Image Button (Requested by User) */}
          <div className="flex items-center gap-2 mt-2 w-full">
            <button
              id="downloadQrBtn"
              onClick={handleDownloadQrImage}
              className="flex-1 bg-[#2D6A4F] hover:bg-[#1B4332] active:scale-95 text-white text-xs sm:text-sm font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>下載 QR Code 圖片</span>
            </button>

            <button
              id="openInNewTabBtn"
              onClick={handleOpenNewTab}
              className="bg-[#E6CCB2] hover:bg-[#DDB892] active:scale-95 text-[#43281C] text-xs sm:text-sm font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
              title="在新分頁開啟"
            >
              <ExternalLink className="w-4 h-4" />
              <span>新分頁</span>
            </button>
          </div>

          {/* Editable URL Input */}
          <div className="w-full mt-3 text-left">
            <label className="text-xs font-bold text-[#6F441F] block mb-1">
              PWA 獨立網址（可自訂修正為您的 GitHub Pages 網址）：
            </label>
            <div className="flex items-center gap-1.5">
              <input
                id="pwaUrlInput"
                type="text"
                value={appUrl}
                onChange={(e) => setAppUrl(e.target.value)}
                className="w-full text-xs bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-2 font-mono text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]"
              />
              <button
                id="copyPwaUrlBtn"
                onClick={handleCopy}
                className="bg-[#8B5A2B] hover:bg-[#6F441F] active:scale-95 text-white px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 flex-shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '已複製' : '複製'}</span>
              </button>
            </div>
          </div>

          {/* Direct Install PWA Button if supported */}
          {isInstallable && (
            <div className="w-full mt-3">
              <button
                id="modalInstallAppBtn"
                onClick={onInstallApp}
                className="w-full bg-[#3A86FF] hover:bg-[#2563EB] active:scale-95 text-white py-2.5 px-4 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>立即一鍵安裝到本機桌面 / 手機</span>
              </button>
            </div>
          )}

          {/* Mobile Install Guide Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-left">
            {/* iOS Guide */}
            <div className="bg-[#FFF8F0] border border-[#E9DAC1] rounded-xl p-2.5">
              <div className="flex items-center gap-1 font-bold text-xs text-[#8B5A2B] mb-1">
                <span>🍎 iPhone / iPad (Safari)</span>
              </div>
              <ol className="text-[11px] text-gray-600 space-y-1 pl-3.5 list-decimal">
                <li>用 Safari 瀏覽器打開網址</li>
                <li>點擊底部中央的 <Share2 className="w-3 h-3 inline text-[#007AFF]" /> <b>分享</b> 圖示</li>
                <li>下滑點選 <b>「加入主畫面」</b></li>
                <li>右上角按 <b>「新增」</b> 即完成！</li>
              </ol>
            </div>

            {/* Android Guide */}
            <div className="bg-[#F0F7F4] border border-[#B7E4C7] rounded-xl p-2.5">
              <div className="flex items-center gap-1 font-bold text-xs text-[#2D6A4F] mb-1">
                <span>🤖 Android (Chrome)</span>
              </div>
              <ol className="text-[11px] text-gray-600 space-y-1 pl-3.5 list-decimal">
                <li>用 Chrome 瀏覽器打開網址</li>
                <li>點擊右上角 <b>「⋮」</b> 功能選單</li>
                <li>點選 <b>「加到主畫面」</b> 或 <b>「安裝應用程式」</b></li>
                <li>點擊確認，桌面立即出現童話圖示！</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
