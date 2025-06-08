import React from "react";
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations();
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 py-4 sm:py-6 px-2 sm:px-6 border-t text-center text-xs sm:text-sm text-muted-foreground bg-black/80 backdrop-blur-md shadow-lg">
      <div className="font-bold text-lg sm:text-2xl text-white mb-1 sm:mb-2">{t('footer.slogan')}</div>
      <div>{t('footer.copyright', { year: new Date().getFullYear() })}</div>
      {/* 这里可以放置社群/联系方式等 */}
    </footer>
  );
};

export default Footer; 