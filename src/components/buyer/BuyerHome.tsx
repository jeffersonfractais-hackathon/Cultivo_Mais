/**
 * Dashboard do Comprador
 * Métricas, oportunidades e alertas
 */

import { Users, Package, AlertTriangle, TrendingUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetricCard from "@/components/common/MetricCard";
import { useAuth } from "@/contexts/AuthContext";

interface BuyerHomeProps {
  onNavigate: (tab: string) => void;
}

const BuyerHome = ({ onNavigate }: BuyerHomeProps) => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-muted-foreground">Bem-vindo,</p>
        <h1 className="text-2xl font-bold text-foreground">
          {user?.establishmentName || user?.name || "Comprador"} 👋
        </h1>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{user?.location || "Campinas - SP"}</span>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          icon={Users}
          label="Produtores próximos"
          value={12}
          variant="primary"
        />
        <MetricCard
          icon={Package}
          label="Produtos disponíveis"
          value={28}
          variant="success"
        />
      </div>

      {/* Alerta de oportunidade */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Oportunidade!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              <strong>3 produtores</strong> têm alimentos que precisam ser vendidos
              em até 3 dias
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => onNavigate("products")}
            >
              Ver produtos
            </Button>
          </div>
        </div>
      </div>

      {/* Produtos em destaque */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Produtos em destaque
          </h2>
          <button
            onClick={() => onNavigate("products")}
            className="text-sm text-primary font-medium"
          >
            Ver todos
          </button>
        </div>

        <div className="space-y-2">
          {[
            { product: "Alface", producer: "João Silva", quantity: "50kg", distance: "8km", urgent: true },
            { product: "Tomate", producer: "Maria Santos", quantity: "80kg", distance: "12km", urgent: false },
            { product: "Mandioca", producer: "José Oliveira", quantity: "200kg", distance: "15km", urgent: false },
          ].map((item, i) => (
            <div
              key={i}
              className={`card-elevated p-3 flex items-center justify-between ${
                item.urgent ? "border-l-4 border-l-amber-500" : ""
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{item.product}</p>
                  {item.urgent && (
                    <span className="text-xs bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">
                      Urgente
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.producer} • {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{item.distance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Produtores recomendados */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Produtores recomendados
          </h2>
          <button
            onClick={() => onNavigate("producers")}
            className="text-sm text-primary font-medium"
          >
            Ver todos
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {[
            { name: "João Silva", products: 3, rating: 4.8 },
            { name: "Maria Santos", products: 2, rating: 4.5 },
            { name: "José Oliveira", products: 4, rating: 4.9 },
          ].map((producer, i) => (
            <div
              key={i}
              className="card-elevated p-4 min-w-[160px] flex-shrink-0 text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-primary">
                  {producer.name.charAt(0)}
                </span>
              </div>
              <p className="font-medium text-foreground text-sm">{producer.name}</p>
              <p className="text-xs text-muted-foreground">
                {producer.products} produtos
              </p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-primary">
                  {producer.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerHome;
