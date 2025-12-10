import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BitcoinData } from '@/types/stock';

interface BitcoinHeroProps {
  data: BitcoinData;
}

export const BitcoinHero = ({ data }: BitcoinHeroProps) => {
  const isPositive = data.changePercent24h >= 0;
  
  const getFearGreedLabel = (index: number) => {
    if (index <= 25) return { label: 'Extreme Fear', color: 'text-destructive' };
    if (index <= 45) return { label: 'Fear', color: 'text-warning' };
    if (index <= 55) return { label: 'Neutral', color: 'text-muted-foreground' };
    if (index <= 75) return { label: 'Greed', color: 'text-success' };
    return { label: 'Extreme Greed', color: 'text-success' };
  };

  const fearGreed = getFearGreedLabel(data.fearGreedIndex);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-primary/5 border border-border p-8 card-glow">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-slow">
              <span className="text-2xl font-bold text-primary">₿</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Bitcoin</h2>
              <p className="text-sm text-muted-foreground font-mono">BTC/USD</p>
            </div>
          </div>
          <Badge variant={data.recommendation}>{data.recommendation}</Badge>
        </div>

        {/* Price */}
        <div className="mb-8">
          <div className="flex items-baseline gap-4">
            <span className="text-5xl md:text-6xl font-bold font-mono text-glow text-primary">
              ${data.price.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
            </span>
            <div className={`flex items-center gap-1 ${isPositive ? 'text-success' : 'text-destructive'}`}>
              {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              <span className="font-mono font-semibold">
                {isPositive ? '+' : ''}{data.changePercent24h.toFixed(2)}%
              </span>
            </div>
          </div>
          <p className={`font-mono text-sm mt-2 ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? '+' : ''}${data.change24h.toLocaleString('de-DE', { minimumFractionDigits: 2 })} (24h)
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">24h Hoch</span>
            </div>
            <p className="font-mono font-semibold text-foreground">
              ${data.high24h.toLocaleString('de-DE')}
            </p>
          </div>
          
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingDown className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">24h Tief</span>
            </div>
            <p className="font-mono font-semibold text-foreground">
              ${data.low24h.toLocaleString('de-DE')}
            </p>
          </div>
          
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Volumen</span>
            </div>
            <p className="font-mono font-semibold text-foreground">
              ${(data.volume24h / 1000000000).toFixed(1)}B
            </p>
          </div>
          
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Activity className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Fear & Greed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-semibold text-foreground">{data.fearGreedIndex}</span>
              <span className={`text-xs ${fearGreed.color}`}>{fearGreed.label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
