import React from "react";
import { useTranslations } from 'next-intl';

const Philosophy = () => {
  const t = useTranslations();
  return (
    <section className="my-6 sm:my-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">哲学理念 / 品牌介绍</h2>
      <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">{t('philosophy')}</p>
    </section>
  );
};

export default Philosophy; 