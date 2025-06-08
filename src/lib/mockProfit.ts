// mockProfit.ts
// 模拟量化策略每日收益数据，年化约300%，胜率60%，含回撤

export interface ProfitPoint {
  date: string; // YYYY-MM-DD
  dailyReturn: number; // 当日收益率（%）
  cumulative: number; // 累计收益（%）
}

// 生成三年756个交易日的收益数据
const DAYS = 252 * 3;
const START_DATE = new Date("2022-01-01");
const WIN_RATE = 0.6;
const AVG_DAILY_RETURN = Math.pow(4, 1 / DAYS) - 1; // 300%年化
const STD_DAILY = 0.025; // 日波动率

const data: ProfitPoint[] = [];
let cumulative = 0;

for (let i = 0; i < DAYS; i++) {
  const date = new Date(START_DATE.getTime() + i * 24 * 3600 * 1000);
  // 胜率60%，正收益，否则负收益
  const isWin = Math.random() < WIN_RATE;
  // 日收益率，正负波动，偶尔有回撤
  let daily = (isWin ? 1 : -1) * (AVG_DAILY_RETURN + Math.random() * STD_DAILY);
  // 偶尔制造较大回撤
  if (Math.random() < 0.04) daily -= Math.random() * 0.05;
  // 控制最大回撤不超过-20%
  if (cumulative + daily < -0.2) daily = -0.2 - cumulative;
  cumulative += daily;
  data.push({
    date: date.toISOString().slice(0, 10),
    dailyReturn: +(daily * 100).toFixed(2),
    cumulative: +(cumulative * 100).toFixed(2),
  });
}

export default data; 