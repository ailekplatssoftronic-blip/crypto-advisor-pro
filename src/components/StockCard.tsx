import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { StockData } from '@/types/stock';

interface StockCardProps {
  stock: StockData;
  index: number;
}

export const StockCard = ({ stock, index }: StockCardProps) => {
  const isPositive = stock.change >= 0;

  return (
    <div 
      className="group relative bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:card-glow animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold font-mono text-primary">{stock.symbol}</h3>
              <Badge variant={stock.recommendation} className="text-[10px]">
                {stock.recommendation}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate max-w-[150px]">{stock.name}</p>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="font-mono text-xs font-semibold">
              {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold font-mono text-foreground">
            ${stock.price.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
          </span>
          <span className={`block text-sm font-mono ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? '+' : ''}${stock.change.toFixed(2)}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-secondary/50 rounded-lg p-2">
            <span className="text-muted-foreground block">Hoch</span>
            <span className="font-mono text-foreground">${stock.dayHigh.toFixed(2)}</span>
          </div>
          <div className="bg-secondary/50 rounded-lg p-2">
            <span className="text-muted-foreground block">Tief</span>
            <span className="font-mono text-foreground">${stock.dayLow.toFixed(2)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <BarChart2 className="w-3 h-3" />
          <span>Vol: {(stock.volume / 1000000).toFixed(1)}M</span>
          <span className="ml-auto">MCap: {stock.marketCap}</span>
        </div>
      </div>
    </div>
  );
};
