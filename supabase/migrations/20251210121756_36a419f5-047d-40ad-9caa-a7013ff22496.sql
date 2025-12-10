-- Create recommendations table
CREATE TABLE public.recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  price DECIMAL(18, 2) NOT NULL,
  change DECIMAL(18, 2) NOT NULL,
  change_percent DECIMAL(8, 4) NOT NULL,
  recommendation TEXT NOT NULL CHECK (recommendation IN ('buy', 'hold', 'sell')),
  volume BIGINT,
  market_cap TEXT,
  day_high DECIMAL(18, 2),
  day_low DECIMAL(18, 2),
  asset_type TEXT NOT NULL DEFAULT 'stock' CHECK (asset_type IN ('bitcoin', 'stock', 'crypto_related')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- Allow public read access (financial data is public)
CREATE POLICY "Anyone can view recommendations" 
ON public.recommendations 
FOR SELECT 
USING (true);

-- Create index for faster queries
CREATE INDEX idx_recommendations_symbol ON public.recommendations(symbol);
CREATE INDEX idx_recommendations_asset_type ON public.recommendations(asset_type);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_recommendations_updated_at
BEFORE UPDATE ON public.recommendations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();