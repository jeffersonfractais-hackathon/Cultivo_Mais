import { Sprout, TrendingUp, AlertCircle, ArrowRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

const HomeTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-primary-foreground">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium">Olá,</p>
            <h1 className="text-2xl font-bold mt-1">João Silva</h1>
            <p className="text-primary-foreground/80 text-sm mt-1">
              Agricultor Familiar • Jataí, GO
            </p>
          </div>
          <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Sprout className="w-7 h-7" />
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <StatusBadge status="valid" label="Pode Vender" />
          <StatusBadge status="warning" label="CAF vence em 30 dias" size="sm" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card-elevated p-4 animate-slide-up stagger-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Produções ativas</p>
            </div>
          </div>
        </div>
        
        <div className="card-elevated p-4 animate-slide-up stagger-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">5</p>
              <p className="text-xs text-muted-foreground">Matches disponíveis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Alert */}
      <div className="card-elevated p-4 border-l-4 border-l-warning animate-slide-up stagger-3">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-warning" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Ação Recomendada</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Sua alface será colhida em <strong>3 dias</strong>. Recomendamos vender para a <strong>Escola Municipal Centro</strong>.
            </p>
            <button className="mt-3 flex items-center gap-2 text-sm font-semibold text-primary">
              Ver detalhes
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Matches Preview */}
      <div className="animate-slide-up stagger-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Compradores Próximos</h2>
          <button className="text-sm font-semibold text-primary">Ver todos</button>
        </div>
        
        <div className="space-y-3">
          {[
            { name: "Escola Municipal Centro", type: "PNAE", distance: "12 km", match: 95 },
            { name: "ONG Alimenta Jataí", type: "ONG", distance: "8 km", match: 88 },
          ].map((buyer, index) => (
            <div key={index} className="card-interactive p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{buyer.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {buyer.type} • {buyer.distance}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{buyer.match}%</div>
                  <p className="text-xs text-muted-foreground">compatível</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
