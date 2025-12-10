import { BarChart3, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

export const Header = ({ onRefresh, isLoading }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between py-6 border-b border-border mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">CryptoStock Analyzer</h1>
          <p className="text-xs text-muted-foreground">Bitcoin & Krypto-Aktien Empfehlungen</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>Live-Daten</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Aktualisieren</span>
        </Button>
      </div>
    </header>
  );
};
