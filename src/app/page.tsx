'use client';
import { useState } from "react";
import Header, { ModuleType } from "@/components/Header";
import LiveDashboard from "@/components/LiveDashboard";
import Subscription from "@/components/Subscription";
import QuantCore from "@/components/QuantCore";
import Philosophy from "@/components/Philosophy";
import Footer from "@/components/Footer";

export default function Home() {
  const [current, setCurrent] = useState<ModuleType>("live");

  let content = null;
  if (current === "live") content = <LiveDashboard />;
  else if (current === "subscription") content = <Subscription />;
  else if (current === "quant") content = <QuantCore />;
  else if (current === "philosophy") content = <Philosophy />;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header current={current} onChange={setCurrent} />
      <main className="flex-1 w-full">
        {content}
      </main>
      <Footer />
      {/* 招募模块 */}
      <section className="w-full bg-black/80 py-8 px-2 sm:py-12 sm:px-4 flex flex-col items-center gap-4 sm:gap-6 border-t border-[#222]">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">加入光子量化 · 共创未来</h3>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-4xl justify-center">
          <div className="bg-gradient-to-br from-blue-500/80 to-purple-500/80 rounded-xl p-4 sm:p-6 flex-1 min-w-0 shadow-lg text-white">
            <div className="text-base sm:text-lg font-semibold mb-2">策略研究室高级研究员</div>
            <div className="text-xs sm:text-sm opacity-80">负责量化策略研发、回测与实盘优化，需有金融/数学/编程背景。</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/80 to-purple-500/80 rounded-xl p-4 sm:p-6 flex-1 min-w-0 shadow-lg text-white">
            <div className="text-base sm:text-lg font-semibold mb-2">全栈开发工程师</div>
            <div className="text-xs sm:text-sm opacity-80">负责平台前后端开发、自动化部署与数据可视化，需熟悉 React/Node.js。</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/80 to-purple-500/80 rounded-xl p-4 sm:p-6 flex-1 min-w-0 shadow-lg text-white">
            <div className="text-base sm:text-lg font-semibold mb-2">合规负责人</div>
            <div className="text-xs sm:text-sm opacity-80">负责合规风控、政策解读与合规体系建设，需有相关经验。</div>
          </div>
        </div>
        <div className="mt-2 sm:mt-4 text-xs sm:text-base text-white/80">欢迎投递简历至 <a href="mailto:hr@guangziquant.com" className="underline hover:text-blue-300">hr@guangziquant.com</a></div>
      </section>
    </div>
  );
}
