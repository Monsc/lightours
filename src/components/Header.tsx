import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from 'next-intl';

export type ModuleType = "philosophy" | "live" | "quant" | "subscription";

interface HeaderProps {
  current: ModuleType;
  onChange: (module: ModuleType) => void;
}

const navs = [
  { key: "philosophy", label: "关于我们" },
  { key: "live", label: "实盘直播" },
  { key: "quant", label: "量化策略" },
  { key: "subscription", label: "订阅系统" },
];

const Header: React.FC<HeaderProps> = ({ current, onChange }) => {
  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 点击菜单外关闭
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between py-4 px-6 border-b bg-black/80 backdrop-blur-md shadow-lg">
      <div className="text-2xl font-bold tracking-tight text-white">{t('brand')}</div>
      {/* 桌面端导航 */}
      <nav className="hidden md:flex gap-2">
        {navs.map((nav) => (
          <motion.button
            key={nav.key}
            className={`px-4 py-2 rounded transition-colors font-medium ${current === nav.key ? "bg-white text-black shadow" : "bg-transparent text-white hover:bg-white/20"}`}
            whileTap={{ scale: 0.92 }}
            onClick={() => onChange(nav.key as ModuleType)}
          >
            {t(`nav.${nav.key}`)}
            {current === nav.key && (
              <motion.div layoutId="nav-underline" className="h-1 bg-blue-400 rounded-full mt-1" style={{ width: '100%' }} />
            )}
          </motion.button>
        ))}
      </nav>
      {/* 移动端汉堡菜单 */}
      <button className="md:hidden text-white text-2xl flex items-center justify-center w-10 h-10" onClick={() => setMenuOpen(true)} aria-label="Open menu">
        {/* 汉堡图标SVG */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-black/95 z-50 flex flex-col p-6 gap-6 shadow-2xl md:hidden"
          >
            <button className="self-end text-white text-2xl mb-4 flex items-center justify-center w-10 h-10" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              {/* 关闭图标SVG */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            {navs.map((nav) => (
              <motion.button
                key={nav.key}
                className={`w-full text-left px-4 py-3 rounded transition-colors font-medium text-lg ${current === nav.key ? "bg-white text-black shadow" : "bg-transparent text-white hover:bg-white/20"}`}
                whileTap={{ scale: 0.96 }}
                onClick={() => { onChange(nav.key as ModuleType); setMenuOpen(false); }}
              >
                {t(`nav.${nav.key}`)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 