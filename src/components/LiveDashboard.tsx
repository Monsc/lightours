import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ReferenceLine } from "recharts";
import profitData from "@/lib/mockProfit";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from 'next-intl';

const strategies = [
  { key: "main", name: "主策略", data: profitData }
  // 可扩展更多策略
];

// 定义 CustomTooltipProps 类型
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#222] text-white p-3 rounded shadow-lg text-base">
        <div>{label}</div>
        <div>累计收益(%): <span className="text-blue-400">{payload[0]?.value}</span></div>
        <div>每日收益率(%): <span className="text-yellow-400">{payload[1]?.value}</span></div>
      </div>
    );
  }
  return null;
};

const LiveDashboard = () => {
  const t = useTranslations();
  const [selected] = useState("main");
  const current = strategies.find(s => s.key === selected)!;

  return (
    <section className="flex flex-col items-center justify-center w-full flex-1 pt-[88px] pb-12 sm:pt-[104px] sm:pb-20">
      <h2 className="text-4xl font-extrabold mb-8 text-white tracking-wide drop-shadow-lg"></h2>
      <div className="relative w-full flex flex-col items-center justify-center h-[40vh] sm:h-[60vh]">
        <div className="w-full h-full overflow-x-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="min-w-[800px] sm:min-w-0 w-[1200px] sm:w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={current.data} margin={{ top: 32, right: 0, left: 0, bottom: 16 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="date" minTickGap={20} tick={{ fontSize: 14, fill: '#bbb' }} />
                    <YAxis id="left" yAxisId="left" domain={['auto', 'auto']} tick={{ fontSize: 14, fill: '#bbb' }} tickFormatter={v => `${v}%`} />
                    <YAxis id="right" yAxisId="right" orientation="right" hide />
                    <ReferenceLine y={0} yAxisId="left" stroke="#888" strokeDasharray="4 2" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#fff', fontSize: 16, paddingBottom: 8 }} />
                    <Line yAxisId="left" type="monotone" dataKey="cumulative" stroke="#4f8cff" strokeWidth={4} dot={false} name="累计收益(%)" />
                    <Line yAxisId="right" type="monotone" dataKey="dailyReturn" stroke="#ffb347" strokeWidth={2.5} dot={false} name="每日收益率(%)" opacity={0.7} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="w-[90vw] max-w-md sm:max-w-lg px-4 py-4 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold shadow-xl hover:scale-105 transition animate-pulse mt-4 mb-4 sm:mb-8 flex flex-col items-center"
          onClick={() => {/* 预留弹窗逻辑 */}}
        >
          <span className="text-lg sm:text-xl font-bold">{t('cta.main')}</span>
          <span className="text-xs sm:text-sm font-normal mt-1 opacity-80">{t('cta.sub')}</span>
        </motion.button>
      </div>
      <div className="mt-10 flex flex-col items-center gap-4 text-base sm:text-lg">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-lg">
          <div>{t('dashboard.profit')}<span className="font-bold text-blue-400">+138%</span></div>
          <div>{t('dashboard.drawdown')}<span className="font-bold text-red-400">-12%</span></div>
          <div>{t('dashboard.sharpe')}<span className="font-bold text-green-400">2.1</span></div>
        </div>
        <div className="italic text-muted-foreground">“策略很稳，信号很准，体验极佳！” —— 光子量化</div>
        <span className="block sm:hidden"></span>
      </div>
      <div className="text-base text-muted-foreground mt-4">{t('dashboard.note')}</div>
    </section>
  );
};

export default LiveDashboard; 