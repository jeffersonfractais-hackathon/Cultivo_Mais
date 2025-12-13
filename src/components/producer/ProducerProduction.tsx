/**
 * Gestão de Produção do Agricultor
 * Lista produções, permite adicionar e editar
 */

import { Plus, Clock, AlertTriangle, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/StatusBadge";

// Dados mock de produções
const productions = [
  {
    id: "1",
    type: "Alface",
    quantity: 50,
    unit: "kg",
    harvestDate: "2024-01-20",
    perishability: "high" as const,
    daysUntil: 2,
  },
  {
    id: "2",
    type: "Tomate",
    quantity: 80,
    unit: "kg",
    harvestDate: "2024-01-25",
    perishability: "high" as const,
    daysUntil: 7,
  },
  {
    id: "3",
    type: "Mandioca",
    quantity: 200,
    unit: "kg",
    harvestDate: "2024-02-10",
    perishability: "low" as const,
    daysUntil: 23,
  },
];

const perishabilityConfig = {
  high: { label: "Alta", status: "invalid" as const },
  medium: { label: "Média", status: "warning" as const },
  low: { label: "Baixa", status: "valid" as const },
};

const ProducerProduction = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Minhas Produções</h1>
          <p className="text-sm text-muted-foreground">
            {productions.length} itens cadastrados
          </p>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-primary/10 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-primary">3</p>
          <p className="text-xs text-muted-foreground">Ativas</p>
        </div>
        <div className="bg-amber-500/10 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-amber-600">1</p>
          <p className="text-xs text-muted-foreground">Urgentes</p>
        </div>
        <div className="bg-muted rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-foreground">330</p>
          <p className="text-xs text-muted-foreground">kg total</p>
        </div>
      </div>

      {/* Lista de produções */}
      <div className="space-y-3">
        {productions.map((prod) => {
          const isUrgent = prod.daysUntil <= 3 && prod.perishability === "high";
          const perishConfig = perishabilityConfig[prod.perishability];

          return (
            <div
              key={prod.id}
              className={`card-elevated p-4 ${
                isUrgent ? "border-l-4 border-l-amber-500" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isUrgent ? "bg-amber-500/10" : "bg-primary/10"
                    }`}
                  >
                    {isUrgent ? (
                      <AlertTriangle className="w-6 h-6 text-amber-600" />
                    ) : (
                      <Leaf className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{prod.type}</h3>
                    <p className="text-sm text-muted-foreground">
                      {prod.quantity} {prod.unit}
                    </p>
                  </div>
                </div>
                <StatusBadge
                  status={perishConfig.status}
                  label={perishConfig.label}
                />
              </div>

              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>
                    Colheita em <strong>{prod.daysUntil} dias</strong>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAB para adicionar */}
      <Button className="floating-action" size="icon">
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default ProducerProduction;
