/**
 * Lista de Produtos Disponíveis
 * Filtros por tipo, perecibilidade e distância
 */

import { useState } from "react";
import { Package, MapPin, Clock, Filter, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

type FilterType = "all" | "vegetables" | "fruits" | "grains";
type UrgencyFilter = "all" | "urgent" | "normal";

const products = [
  {
    id: "1",
    name: "Alface",
    category: "vegetables",
    producer: "João Silva",
    producerId: "1",
    quantity: 50,
    unit: "kg",
    distance: 8,
    daysLeft: 2,
    perishability: "high" as const,
  },
  {
    id: "2",
    name: "Tomate",
    category: "vegetables",
    producer: "Maria Santos",
    producerId: "2",
    quantity: 80,
    unit: "kg",
    distance: 12,
    daysLeft: 5,
    perishability: "high" as const,
  },
  {
    id: "3",
    name: "Banana",
    category: "fruits",
    producer: "José Oliveira",
    producerId: "3",
    quantity: 100,
    unit: "kg",
    distance: 15,
    daysLeft: 7,
    perishability: "medium" as const,
  },
  {
    id: "4",
    name: "Mandioca",
    category: "grains",
    producer: "João Silva",
    producerId: "1",
    quantity: 200,
    unit: "kg",
    distance: 8,
    daysLeft: 30,
    perishability: "low" as const,
  },
];

const filterLabels = {
  all: "Todos",
  vegetables: "Hortaliças",
  fruits: "Frutas",
  grains: "Grãos/Raízes",
};

const BuyerProducts = () => {
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyFilter>("all");

  const filteredProducts = products.filter((p) => {
    if (typeFilter !== "all" && p.category !== typeFilter) return false;
    if (urgencyFilter === "urgent" && p.daysLeft > 3) return false;
    if (urgencyFilter === "normal" && p.daysLeft <= 3) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Produtos Disponíveis</h1>
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} produtos na sua região
        </p>
      </div>

      {/* Filtros por tipo */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {(Object.keys(filterLabels) as FilterType[]).map((key) => (
          <button
            key={key}
            onClick={() => setTypeFilter(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              typeFilter === key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {filterLabels[key]}
          </button>
        ))}
      </div>

      {/* Filtro de urgência */}
      <div className="flex gap-2">
        <button
          onClick={() => setUrgencyFilter("all")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            urgencyFilter === "all"
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setUrgencyFilter("urgent")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            urgencyFilter === "urgent"
              ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
              : "bg-muted text-muted-foreground"
          }`}
        >
          🔥 Urgentes
        </button>
      </div>

      {/* Lista de produtos */}
      <div className="space-y-3">
        {filteredProducts.map((product) => {
          const isUrgent = product.daysLeft <= 3;

          return (
            <div
              key={product.id}
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
                    <Leaf className={`w-6 h-6 ${isUrgent ? "text-amber-600" : "text-primary"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      {isUrgent && (
                        <span className="text-xs bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">
                          Urgente
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {product.quantity} {product.unit}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
                <span>{product.producer}</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{product.distance} km</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{product.daysLeft} dias</span>
                </div>
              </div>

              <Button size="sm" className="w-full mt-3">
                Entrar em contato
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuyerProducts;
