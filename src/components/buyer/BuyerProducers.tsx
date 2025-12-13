/**
 * Lista de Produtores
 * Exibe produtores na região com métricas
 */

import { useState } from "react";
import { MapPin, Package, Star, ChevronRight, CheckCircle2 } from "lucide-react";
import ProducerDetail from "./ProducerDetail";
import { ProducerProfile } from "@/types";

const producers: ProducerProfile[] = [
  {
    id: "1",
    name: "João Silva",
    location: "Campinas - SP",
    distance: 8,
    rating: 4.8,
    activeProductions: 3,
    documentsValid: true,
    phone: "(11) 99999-1234",
    productions: [
      { id: "1", producerId: "1", type: "Alface", quantity: 50, unit: "kg", harvestDate: "2024-01-20", perishability: "high", status: "active", daysUntilHarvest: 2 },
      { id: "2", producerId: "1", type: "Tomate", quantity: 80, unit: "kg", harvestDate: "2024-01-25", perishability: "high", status: "active", daysUntilHarvest: 7 },
      { id: "3", producerId: "1", type: "Mandioca", quantity: 200, unit: "kg", harvestDate: "2024-02-10", perishability: "low", status: "active", daysUntilHarvest: 23 },
    ],
  },
  {
    id: "2",
    name: "Maria Santos",
    location: "Sumaré - SP",
    distance: 12,
    rating: 4.5,
    activeProductions: 2,
    documentsValid: true,
    phone: "(11) 99999-5678",
    productions: [
      { id: "4", producerId: "2", type: "Tomate", quantity: 60, unit: "kg", harvestDate: "2024-01-22", perishability: "high", status: "active", daysUntilHarvest: 4 },
      { id: "5", producerId: "2", type: "Pimentão", quantity: 40, unit: "kg", harvestDate: "2024-01-28", perishability: "medium", status: "active", daysUntilHarvest: 10 },
    ],
  },
  {
    id: "3",
    name: "José Oliveira",
    location: "Paulínia - SP",
    distance: 15,
    rating: 4.9,
    activeProductions: 4,
    documentsValid: true,
    phone: "(11) 99999-9012",
    productions: [
      { id: "6", producerId: "3", type: "Banana", quantity: 100, unit: "kg", harvestDate: "2024-01-25", perishability: "medium", status: "active", daysUntilHarvest: 7 },
      { id: "7", producerId: "3", type: "Laranja", quantity: 150, unit: "kg", harvestDate: "2024-02-01", perishability: "low", status: "active", daysUntilHarvest: 14 },
      { id: "8", producerId: "3", type: "Limão", quantity: 80, unit: "kg", harvestDate: "2024-01-30", perishability: "low", status: "active", daysUntilHarvest: 12 },
      { id: "9", producerId: "3", type: "Abacate", quantity: 50, unit: "kg", harvestDate: "2024-02-05", perishability: "medium", status: "active", daysUntilHarvest: 18 },
    ],
  },
];

const BuyerProducers = () => {
  const [selectedProducer, setSelectedProducer] = useState<ProducerProfile | null>(null);

  if (selectedProducer) {
    return (
      <ProducerDetail
        producer={selectedProducer}
        onBack={() => setSelectedProducer(null)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Produtores</h1>
        <p className="text-sm text-muted-foreground">
          {producers.length} produtores na sua região
        </p>
      </div>

      {/* Lista de produtores */}
      <div className="space-y-3">
        {producers.map((producer) => (
          <button
            key={producer.id}
            onClick={() => setSelectedProducer(producer)}
            className="w-full card-elevated p-4 text-left"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-primary">
                  {producer.name.charAt(0)}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {producer.name}
                  </h3>
                  {producer.documentsValid && (
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </div>

                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{producer.distance} km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    <span>{producer.activeProductions} produtos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500" />
                    <span>{producer.rating}</span>
                  </div>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BuyerProducers;
