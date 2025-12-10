export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  recommendation: 'buy' | 'sell' | 'hold';
  volume: number;
  marketCap: string;
  dayHigh: number;
  dayLow: number;
}

export interface BitcoinData {
  price: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: string;
  recommendation: 'buy' | 'sell' | 'hold';
  fearGreedIndex: number;
}
