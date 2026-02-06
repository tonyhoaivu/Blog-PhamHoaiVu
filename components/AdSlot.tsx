
import React, { useEffect, useState } from 'react';

interface AdSlotProps {
  slot: string; // Vị trí quảng cáo (ID slot từ AdSense)
  className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ slot, className = "" }) => {
  const [adsenseId, setAdsenseId] = useState<string>("");

  useEffect(() => {
    // Lấy AdSense ID từ cấu hình đã lưu
    const savedId = localStorage.getItem('phv_adsense_id') || "ca-pub-XXXXXXXXXXXXXXXX";
    setAdsenseId(savedId);

    try {
      // Gọi lệnh hiển thị của Google
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.warn("AdSense push error (Normal if testing locally):", e);
    }
  }, []);

  return (
    <div className={`ad-container overflow-hidden flex justify-center bg-gray-50/50 dark:bg-gray-900/20 border border-dashed border-gray-200 dark:border-gray-700 p-2 rounded-2xl ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '250px', minHeight: '90px' }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSlot;
