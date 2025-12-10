import { useState } from 'react';
import { Header } from '@/components/Header';
import { BitcoinHero } from '@/components/BitcoinHero';
import { StockCard } from '@/components/StockCard';
import { RecommendationSummary } from '@/components/RecommendationSummary';
import { bitcoinData, stocksData, cryptoRelatedStocks } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    toast({
      title: "Daten werden aktualisiert...",
      description: "Die neuesten Marktdaten werden geladen.",
    });
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Daten aktualisiert",
        description: "Alle Kurse sind auf dem neuesten Stand.",
      });
    }, 1500);
  };

  const allStocks = [...stocksData, ...cryptoRelatedStocks];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 pb-12">
        <Header onRefresh={handleRefresh} isLoading={isLoading} />

        {/* Bitcoin Hero Section */}
        <section className="mb-10">
          <BitcoinHero data={bitcoinData} />
        </section>

        {/* Recommendation Summary */}
        <section className="mb-10">
          <RecommendationSummary stocks={allStocks} />
        </section>

        {/* Bitcoin-Related Stocks */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-xl font-bold text-foreground">Bitcoin Mining & Holdings</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stocksData.map((stock, index) => (
              <StockCard key={stock.symbol} stock={stock} index={index} />
            ))}
          </div>
        </section>

        {/* Crypto-Related Stocks */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-success rounded-full" />
            <h2 className="text-xl font-bold text-foreground">Krypto-bezogene Aktien</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cryptoRelatedStocks.map((stock, index) => (
              <StockCard key={stock.symbol} stock={stock} index={index + stocksData.length} />
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <footer className="text-center py-8 border-t border-border">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            <strong>Haftungsausschluss:</strong> Diese Anwendung dient nur zu Informationszwecken und stellt keine Anlageberatung dar. 
            Investitionen in Kryptowährungen und Aktien sind mit Risiken verbunden. Bitte konsultieren Sie einen Finanzberater vor Anlageentscheidungen.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Datenquelle: Demo-Daten • Letzte Aktualisierung: {new Date().toLocaleString('de-DE')}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
