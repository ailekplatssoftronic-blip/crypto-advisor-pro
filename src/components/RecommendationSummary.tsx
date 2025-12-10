import { TrendingUp, Minus, TrendingDown, Info } from 'lucide-react';
import { StockData } from '@/types/stock';

interface RecommendationSummaryProps {
  stocks: StockData[];
}

export const RecommendationSummary = ({ stocks }: RecommendationSummaryProps) => {
  const buyCount = stocks.filter(s => s.recommendation === 'buy').length;
  const holdCount = stocks.filter(s => s.recommendation === 'hold').length;
  const sellCount = stocks.filter(s => s.recommendation === 'sell').length;
  const total = stocks.length;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Empfehlungs-Übersicht</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-success/10 rounded-xl border border-success/20">
          <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
          <p className="text-3xl font-bold font-mono text-success">{buyCount}</p>
          <p className="text-xs uppercase tracking-wider text-success/80 mt-1">Kaufen</p>
          <p className="text-xs text-muted-foreground mt-1">
            {((buyCount / total) * 100).toFixed(0)}%
          </p>
        </div>

        <div className="text-center p-4 bg-warning/10 rounded-xl border border-warning/20">
          <Minus className="w-8 h-8 text-warning mx-auto mb-2" />
          <p className="text-3xl font-bold font-mono text-warning">{holdCount}</p>
          <p className="text-xs uppercase tracking-wider text-warning/80 mt-1">Halten</p>
          <p className="text-xs text-muted-foreground mt-1">
            {((holdCount / total) * 100).toFixed(0)}%
          </p>
        </div>

        <div className="text-center p-4 bg-destructive/10 rounded-xl border border-destructive/20">
          <TrendingDown className="w-8 h-8 text-destructive mx-auto mb-2" />
          <p className="text-3xl font-bold font-mono text-destructive">{sellCount}</p>
          <p className="text-xs uppercase tracking-wider text-destructive/80 mt-1">Verkaufen</p>
          <p className="text-xs text-muted-foreground mt-1">
            {((sellCount / total) * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Basierend auf technischer Analyse und Markttrends
      </p>
    </div>
  );
};
