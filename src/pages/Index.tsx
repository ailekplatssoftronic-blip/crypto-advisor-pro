import { Header } from '@/components/Header';
import { BitcoinHero } from '@/components/BitcoinHero';
import { StockCard } from '@/components/StockCard';
import { RecommendationSummary } from '@/components/RecommendationSummary';
import { useRecommendations } from '@/hooks/useRecommendations';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const { data, isLoading, refetch, isFetching } = useRecommendations();

  const handleRefresh = async () => {
    toast({
      title: "Refreshing data...",
      description: "Loading latest market data.",
    });
    
    await refetch();
    
    toast({
      title: "Data updated",
      description: "All prices are up to date.",
    });
  };

  const allStocks = [...(data?.stocks || []), ...(data?.cryptoRelated || [])];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 pb-12">
        <Header onRefresh={handleRefresh} isLoading={isFetching} />

        {/* Bitcoin Hero Section */}
        <section className="mb-10">
          {isLoading ? (
            <Skeleton className="h-64 w-full rounded-xl" />
          ) : data?.bitcoin ? (
            <BitcoinHero data={data.bitcoin} />
          ) : null}
        </section>

        {/* Recommendation Summary */}
        <section className="mb-10">
          {isLoading ? (
            <Skeleton className="h-32 w-full rounded-xl" />
          ) : (
            <RecommendationSummary stocks={allStocks} />
          )}
        </section>

        {/* Bitcoin-Related Stocks */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-xl font-bold text-foreground">Bitcoin Mining & Holdings</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))
            ) : (
              data?.stocks.map((stock, index) => (
                <StockCard key={stock.symbol} stock={stock} index={index} />
              ))
            )}
          </div>
        </section>

        {/* Crypto-Related Stocks */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-success rounded-full" />
            <h2 className="text-xl font-bold text-foreground">Crypto-Related Stocks</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))
            ) : (
              data?.cryptoRelated.map((stock, index) => (
                <StockCard key={stock.symbol} stock={stock} index={index + (data?.stocks.length || 0)} />
              ))
            )}
          </div>
        </section>

        {/* Disclaimer */}
        <footer className="text-center py-8 border-t border-border">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            <strong>Disclaimer:</strong> This application is for informational purposes only and does not constitute investment advice. 
            Investments in cryptocurrencies and stocks involve risks. Please consult a financial advisor before making investment decisions.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Data source: Database • Last updated: {new Date().toLocaleString('en-US')}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
