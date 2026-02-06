
import React, { useState, useEffect } from 'react';

const FloatingButtons: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
      <button 
        onClick={scrollToTop}
        className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-primary-500 text-primary-600 shadow-xl flex items-center justify-center hover:bg-primary-50 transition-all hover:scale-110 active:scale-95 group"
        title="Cuộn lên đầu trang"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <button 
        onClick={scrollToBottom}
        className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-primary-500 text-primary-600 shadow-xl flex items-center justify-center hover:bg-primary-50 transition-all hover:scale-110 active:scale-95 group"
        title="Cuộn xuống cuối trang"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default FloatingButtons;