import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const MOCK_TOKEN = "api_demo_xxx123456";

const plans = [
  { key: "month", name: "月付套餐", price: 500, desc: "适合体验/短期跟单" },
  { key: "quarter", name: "季付套餐", price: 1200, desc: "性价比高/长期持有" },
  { key: "year", name: "年付套餐", price: 4000, desc: "年度VIP/专属服务" },
];

const Subscription = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("month");

  // mock 支付流程
  const handleSubscribe = () => {
    setLoading(true);
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <section className="my-8">
      <h2 className="text-xl font-semibold mb-4">订阅系统</h2>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>选择订阅套餐</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-sm text-muted-foreground">
            订阅后可自动绑定 Telegram 通道，获取实时信号推送，并获得 API Token 用于自动跟单。
          </div>
          <div className="flex flex-col gap-2 mb-4">
            {plans.map(p => (
              <motion.button
                key={p.key}
                className={`justify-between w-full px-4 py-3 rounded-lg font-medium border transition-all ${plan === p.key ? "scale-105 border-blue-400 shadow-lg bg-blue-950/60 text-white" : "bg-background text-white/80 hover:bg-white/10"}`}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPlan(p.key)}
                style={{ outline: plan === p.key ? '2px solid #60a5fa' : undefined }}
              >
                <span>{p.name}</span>
                <span className="text-lg font-bold">¥{p.price}</span>
                <span className="text-xs text-muted-foreground ml-2">{p.desc}</span>
              </motion.button>
            ))}
          </div>
          {!subscribed ? (
            <motion.button
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold text-lg shadow-lg mt-2 flex items-center justify-center gap-2"
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              onClick={handleSubscribe}
            >
              {loading && <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>}
              使用 Stripe 支付订阅
            </motion.button>
          ) : (
            <div className="space-y-4">
              <div className="text-green-600 font-semibold">已订阅（{plans.find(p => p.key === plan)?.name}）</div>
              <div>
                <div className="font-medium mb-1">API Token：</div>
                <Input value={MOCK_TOKEN} readOnly className="font-mono" />
                <div className="text-xs text-muted-foreground mt-1">请妥善保存，勿泄露。</div>
              </div>
              <div>
                <div className="font-medium mb-1">Telegram 通道绑定：</div>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://t.me/your_channel" target="_blank" rel="noopener noreferrer">一键绑定 Telegram</a>
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2">如需取消订阅，请联系客服。</div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">本功能为演示，支付与绑定流程为 mock，后续可无缝对接 Stripe 与 Telegram API。</div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Subscription; 