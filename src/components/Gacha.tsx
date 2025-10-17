
import * as React from 'react';

type Prize = {
  id: number;
  name: string;
  rarity: 'SSR' | 'SR' | 'R';
  weight: number;
  color: string;
  glowColor: string;
  emoji: string;
  bgPattern: string;
};

const POOL: Prize[] = [
  { id: 1, name: '神秘水晶', rarity: 'SSR', weight: 1, color: '#f59e0b', glowColor: '#fbbf24', emoji: '💎', bgPattern: 'linear-gradient(135deg, #f59e0b, #fbbf24, #f59e0b)' },
  { id: 2, name: '苍穹碎片', rarity: 'SR', weight: 5, color: '#3b82f6', glowColor: '#60a5fa', emoji: '⭐', bgPattern: 'linear-gradient(135deg, #3b82f6, #60a5fa, #3b82f6)' },
  { id: 3, name: '银辉之羽', rarity: 'SR', weight: 5, color: '#3b82f6', glowColor: '#60a5fa', emoji: '🪶', bgPattern: 'linear-gradient(135deg, #3b82f6, #60a5fa, #3b82f6)' },
  { id: 4, name: '标准凭证', rarity: 'R', weight: 20, color: '#64748b', glowColor: '#94a3b8', emoji: '🎫', bgPattern: 'linear-gradient(135deg, #64748b, #94a3b8, #64748b)' },
  { id: 5, name: '合金碎屑', rarity: 'R', weight: 20, color: '#64748b', glowColor: '#94a3b8', emoji: '⚙️', bgPattern: 'linear-gradient(135deg, #64748b, #94a3b8, #64748b)' },
  { id: 6, name: '能源晶粒', rarity: 'R', weight: 20, color: '#64748b', glowColor: '#94a3b8', emoji: '🔋', bgPattern: 'linear-gradient(135deg, #64748b, #94a3b8, #64748b)' },
  { id: 7, name: '魔法宝石', rarity: 'SSR', weight: 1, color: '#ec4899', glowColor: '#f472b6', emoji: '💎', bgPattern: 'linear-gradient(135deg, #ec4899, #f472b6, #ec4899)' },
  { id: 8, name: '龙鳞片', rarity: 'SR', weight: 5, color: '#10b981', glowColor: '#34d399', emoji: '🐉', bgPattern: 'linear-gradient(135deg, #10b981, #34d399, #10b981)' },
  { id: 9, name: '凤凰羽毛', rarity: 'SR', weight: 5, color: '#f97316', glowColor: '#fb923c', emoji: '🔥', bgPattern: 'linear-gradient(135deg, #f97316, #fb923c, #f97316)' },
  { id: 10, name: '精灵粉末', rarity: 'R', weight: 20, color: '#8b5cf6', glowColor: '#a78bfa', emoji: '✨', bgPattern: 'linear-gradient(135deg, #8b5cf6, #a78bfa, #8b5cf6)' }
];

function draw(pool: Prize[]) {
  const sum = pool.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * sum;
  for (const p of pool) {
    if ((r -= p.weight) <= 0) return p;
  }
  return pool[pool.length - 1];
}

export default function PerfectGacha() {
  const [spinning, setSpinning] = React.useState(false);
  const [result, setResult] = React.useState<Prize | null>(null);
  const [history, setHistory] = React.useState<Prize[]>([]);
  const [balls, setBalls] = React.useState<Array<{ id: number; color: string; glowColor: string; rarity: Prize['rarity']; emoji: string; bgPattern: string; prize: Prize }>>([]);
  const [exitBall, setExitBall] = React.useState<Prize | null>(null);
  const [showResult, setShowResult] = React.useState(false);
  const [confetti, setConfetti] = React.useState(false);

  React.useEffect(() => {
    // 生成所有可能的奖品球，确保结果球在初始状态中
    const allBalls: Array<{ id: number; color: string; glowColor: string; rarity: Prize['rarity']; emoji: string; bgPattern: string; prize: Prize }> = [];
    
    // 为每个奖品生成多个球
    POOL.forEach(prize => {
      const count = prize.rarity === 'SSR' ? 3 : prize.rarity === 'SR' ? 8 : 15;
      for (let i = 0; i < count; i++) {
        allBalls.push({
          id: allBalls.length + 1000,
          color: prize.color,
          glowColor: prize.glowColor,
          rarity: prize.rarity,
          emoji: prize.emoji,
          bgPattern: prize.bgPattern,
          prize: prize
        });
      }
    });
    
    setBalls(allBalls);
  }, []);

  const start = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    setExitBall(null);
    setShowResult(false);
    setConfetti(false);

    // 从现有的球中随机选择一个
    const selectedBall = balls[Math.floor(Math.random() * balls.length)];
    const prize = selectedBall.prize;
    
    // 2.5s 旋转
    setTimeout(() => {
      setExitBall(prize);
      // 1s 出球动画
      setTimeout(() => {
        setResult(prize);
        setHistory((h) => [prize, ...h].slice(0, 30));
        setShowResult(true);
        setConfetti(true);
        setSpinning(false);
        setExitBall(null);
        
        // 3秒后停止彩带
        setTimeout(() => setConfetti(false), 3000);
      }, 1000);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            🎰 扭蛋机 🎰
          </h1>
          <p className="text-white/70 text-xl">点击开始，体验炫酷抽奖！</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 扭蛋机主体 */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            {/* 扭蛋机机身 */}
            <div className="relative mx-auto w-[32rem] h-[32rem] mb-8">
              {/* 机身外壳 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-200 to-gray-300 shadow-2xl border-8 border-gray-400">
                {/* 玻璃窗 */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-b from-blue-100/80 to-blue-200/60 border-4 border-white/50 overflow-hidden">
                  {/* 玻璃高光 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent" />
                  <div className={`absolute inset-0 ${spinning ? 'animate-spin-slow' : ''}`}>
                    {balls.map((b, i) => {
                      const angle = (i / balls.length) * Math.PI * 2;
                      const radius = 120 + (i % 6) * 20;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      const size = 8 + (i % 3) * 4;
                      return (
                        <div
                          key={b.id}
                          className="absolute rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg ball-glow"
                          style={{
                            left: '50%',
                            top: '50%',
                            width: `${size}px`,
                            height: `${size}px`,
                            transform: `translate(${x}px, ${y}px)`,
                            background: b.bgPattern,
                            boxShadow: `0 0 20px ${b.glowColor}50, inset 0 2px 4px rgba(255,255,255,0.3)`,
                            animationDelay: `${(i % 8) * 0.1}s`,
                            border: `2px solid ${b.glowColor}30`
                          }}
                        >
                          <span className="text-[10px]">{b.emoji}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 出球口 */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full shadow-lg">
                <div className="absolute inset-1 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full" />
                <div className="absolute inset-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full" />
              </div>

              {/* 出球动画 */}
              {exitBall && (
                <div
                  className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full exit-ball shadow-2xl flex items-center justify-center text-lg font-bold text-white"
                  style={{
                    background: exitBall.bgPattern,
                    boxShadow: `0 0 30px ${exitBall.glowColor}80, 0 0 60px ${exitBall.glowColor}40`
                  }}
                >
                  {exitBall.emoji}
                </div>
              )}
            </div>

            {/* 开始按钮 */}
            <div className="text-center">
              <button
                onClick={start}
                disabled={spinning}
                className="px-16 py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-2xl rounded-full shadow-2xl hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {spinning ? '🎰 抽取中...' : '🎯 开始抽取'}
              </button>
            </div>
          </div>

          {/* 结果展示区 */}
          <div className="space-y-6">
            {/* 当前结果 - 使用第二张图片的样式 */}
            {showResult && result && (
              <div className="bg-gradient-to-br from-purple-900/80 to-blue-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden">
                {/* 彩带效果 */}
                {confetti && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute confetti-piece"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          background: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'][i % 7],
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${2 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                )}

                <div className="relative z-10 text-center">
                  {/* 恭喜获得标题 */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="text-4xl">🎉</div>
                    <h3 className="text-3xl font-bold text-white">恭喜获得!</h3>
                    <div className="text-4xl">🎉</div>
                  </div>
                  
                  {/* 奖品卡片 */}
                  <div className="inline-flex flex-col items-center gap-6 bg-white/10 rounded-2xl p-8 border border-white/20">
                    {/* 圆形图标 - 3D效果 */}
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-2xl ball-result relative"
                      style={{
                        background: result.bgPattern,
                        boxShadow: `0 0 40px ${result.glowColor}80, 0 0 80px ${result.glowColor}40, inset 0 4px 8px rgba(255,255,255,0.3)`
                      }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                      <span className="relative z-10">{result.emoji}</span>
                    </div>
                    
                    {/* 奖品信息 */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">{result.name}</div>
                      <div className="text-lg text-white/70">{result.rarity} 稀有度</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 历史记录 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4">📜 抽奖历史</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.length === 0 ? (
                  <div className="text-white/50 text-center py-8">暂无记录</div>
                ) : (
                  history.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg"
                        style={{
                          background: item.bgPattern,
                          boxShadow: `0 0 15px ${item.glowColor}50`
                        }}
                      >
                        {item.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white text-lg">{item.name}</div>
                        <div className="text-sm text-white/60">{item.rarity}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 样式 */}
      <style >{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        .ball-glow {
          animation: ball-float 2s ease-in-out infinite alternate;
        }
        
        .exit-ball {
          animation: exit-animation 1s ease-out forwards;
        }
        
        .ball-result {
          animation: result-bounce 0.6s ease-out;
        }
        
        .confetti-piece {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          animation: confetti-fall linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes ball-float {
          from { transform: translate(var(--x, 0), var(--y, 0)) scale(0.9); }
          to { transform: translate(var(--x, 0), var(--y, 0)) scale(1.1); }
        }
        
        @keyframes exit-animation {
          0% { transform: translate(-50%, 0) scale(0.8); opacity: 0.8; }
          50% { transform: translate(-50%, -30px) scale(1.2); opacity: 1; }
          100% { transform: translate(-50%, 60px) scale(1); opacity: 1; }
        }
        
        @keyframes result-bounce {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
