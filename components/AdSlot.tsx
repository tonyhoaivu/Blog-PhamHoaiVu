
import React, { useEffect } from 'react';

interface AdSlotProps {
  slot?: string; 
  className?: string;
  rawHtml?: string; // Dùng để chèn script tùy chỉnh từ admin
}

const AdSlot: React.FC<AdSlotProps> = ({ slot, className = "", rawHtml }) => {
  useEffect(() => {
    if (!rawHtml) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        // Suppress adsense errors on local
      }
    }
  }, [rawHtml]);

  if (rawHtml) {
    return (
      <div 
        className={`ad-container-raw overflow-hidden flex justify-center ${className}`}
        dangerouslySetInnerHTML={{ __html: rawHtml }}
      />
    );
  }

  return (
    <div className={`ad-container overflow-hidden flex justify-center bg-gray-50/50 dark:bg-gray-900/20 border border-dashed border-gray-200 dark:border-gray-700 p-2 rounded-2xl ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '250px', minHeight: '90px' }}
        data-ad-client={localStorage.getItem('phv_adsense_id') || "ca-pub-config"}
        data-ad-slot={slot || "auto"}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSlot;
