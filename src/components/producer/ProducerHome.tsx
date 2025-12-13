/**
 * Dashboard do Produtor
 * Visão geral de produções, matches e alertas
 */

import { Sprout, Handshake, AlertTriangle, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetricCard from "@/components/common/MetricCard";
import { useAuth } from "@/contexts/AuthContext";

interface ProducerHomeProps {
  onNavigate: (tab: string) => void;
}

const ProducerHome = ({ onNavigate }: ProducerHomeProps) => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header de boas-vindas */}
      <div className="space-y-1">
        <p className="text-muted-foreground">Olá,</p>
        <h1 className="text-2xl font-bold text-foreground">
          {user?.name?.split(" ")[0] || "Produtor"} 👋
        </h1>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{user?.municipality || "Campinas - SP"}</span>
        </div>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          icon={Sprout}
          label="Produções ativas"
          value={3}
          variant="primary"
        />
        <MetricCard
          icon={Handshake}
          label="Matches disponíveis"
          value={5}
          variant="success"
        />
      </div>

      {/* Alerta de urgência */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Venda urgente!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              <strong>50kg de Alface</strong> precisam ser vendidos em até 2 dias
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => onNavigate("matches")}
            >
              Ver compradores
            </Button>
          </div>
        </div>
      </div>

      {/* Compradores próximos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Compradores próximos
          </h2>
          <button
            onClick={() => onNavigate("matches")}
            className="text-sm text-primary font-medium"
          >
            Ver todos
          </button>
        </div>

        <div className="space-y-2">
          {[
            { name: "Escola Municipal Centro", distance: "8km", match: 95 },
            { name: "Mercado São Jorge", distance: "12km", match: 88 },
            { name: "Banco de Alimentos", distance: "15km", match: 82 },
          ].map((buyer, i) => (
            <div
              key={i}
              className="card-elevated p-3 flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-foreground">{buyer.name}</p>
                <p className="text-sm text-muted-foreground">{buyer.distance}</p>
              </div>
              <div className="flex items-center gap-1 text-primary">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">{buyer.match}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProducerHome;
