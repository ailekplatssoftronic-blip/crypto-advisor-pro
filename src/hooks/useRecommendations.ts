import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { StockData, BitcoinData } from '@/types/stock';

interface RecommendationRow {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  change_percent: number;
  recommendation: 'buy' | 'hold' | 'sell';
  volume: number | null;
  market_cap: string | null;
  day_high: number | null;
  day_low: number | null;
  asset_type: 'bitcoin' | 'stock' | 'crypto_related';
  created_at: string;
  updated_at: string;
}

export const useRecommendations = () => {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recommendations')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      const rows = data as RecommendationRow[];

      const bitcoinRow = rows.find(r => r.asset_type === 'bitcoin');
      const stockRows = rows.filter(r => r.asset_type === 'stock');
      const cryptoRelatedRows = rows.filter(r => r.asset_type === 'crypto_related');

      const bitcoinData: BitcoinData | null = bitcoinRow ? {
        price: Number(bitcoinRow.price),
        change24h: Number(bitcoinRow.change),
        changePercent24h: Number(bitcoinRow.change_percent),
        high24h: Number(bitcoinRow.day_high) || 0,
        low24h: Number(bitcoinRow.day_low) || 0,
        volume24h: bitcoinRow.volume || 0,
        marketCap: bitcoinRow.market_cap || '0',
        recommendation: bitcoinRow.recommendation,
        fearGreedIndex: 72, // Static for now
      } : null;

      const mapToStock = (row: RecommendationRow): StockData => ({
        symbol: row.symbol,
        name: row.name,
        price: Number(row.price),
        change: Number(row.change),
        changePercent: Number(row.change_percent),
        recommendation: row.recommendation,
        volume: row.volume || 0,
        marketCap: row.market_cap || '0',
        dayHigh: Number(row.day_high) || 0,
        dayLow: Number(row.day_low) || 0,
      });

      return {
        bitcoin: bitcoinData,
        stocks: stockRows.map(mapToStock),
        cryptoRelated: cryptoRelatedRows.map(mapToStock),
      };
    },
  });
};
