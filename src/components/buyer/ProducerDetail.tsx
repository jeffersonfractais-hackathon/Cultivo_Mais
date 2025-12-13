/**
 * Detalhe do Produtor
 * Perfil completo com métricas e produções
 */

import { ArrowLeft, MapPin, Phone, Star, CheckCircle2, Clock, MessageCircle, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProducerProfile } from "@/types";

interface ProducerDetailProps {
  producer: ProducerProfile;
  onBack: () => void;
}

const perishabilityConfig = {
  high: { label: "Alta", className: "bg-red-500/10 text-red-600" },
  medium: { label: "Média", className: "bg-amber-500/10 text-amber-600" },
  low: { label: "Baixa", className: "bg-emerald-500/10 text-emerald-600" },
};

const ProducerDetail = ({ producer, onBack }: ProducerDetailProps) => {
  const urgentProducts = producer.productions.filter(
    (p) => p.perishability === "high" && (p.daysUntilHarvest || 0) <= 3
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header com botão voltar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Perfil do Produtor</h1>
      </div>

      {/* Card do produtor */}
      <div className="card-elevated p-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-3xl font-bold text-primary">
            {producer.name.charAt(0)}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 mb-1">
          <h2 className="text-xl font-bold text-foreground">{producer.name}</h2>
          {producer.documentsValid && (
            <CheckCircle2 className="w-5 h-5 text-primary" />
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4">{producer.location}</p>

        {/* Métricas */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
          <div>
            <p className="text-2xl font-bold text-foreground">{producer.distance}</p>
            <p className="text-xs text-muted-foreground">km de distância</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {producer.activeProductions}
            </p>
            <p className="text-xs text-muted-foreground">produtos</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-amber-500" />
              <p className="text-2xl font-bold text-foreground">{producer.rating}</p>
            </div>
            <p className="text-xs text-muted-foreground">avaliação</p>
          </div>
        </div>

        {/* Selo de confiança */}
        {producer.documentsValid && (
          <div className="mt-4 bg-primary/5 rounded-lg p-3 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Documentação verificada
            </span>
          </div>
        )}
      </div>

      {/* Alerta de urgência */}
      {urgentProducts.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
          <p className="text-sm font-medium text-amber-600">
            ⚡ {urgentProducts.length} produto(s) precisam ser vendidos em até 3 dias!
          </p>
        </div>
      )}

      {/* Produções disponíveis */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Produtos Disponíveis</h3>

        {producer.productions.map((prod) => {
          const perishConfig = perishabilityConfig[prod.perishability];
          const isUrgent =
            prod.perishability === "high" && (prod.daysUntilHarvest || 0) <= 3;

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
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isUrgent ? "bg-amber-500/10" : "bg-primary/10"
                    }`}
                  >
                    <Leaf
                      className={`w-5 h-5 ${isUrgent ? "text-amber-600" : "text-primary"}`}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{prod.type}</h4>
                    <p className="text-sm text-muted-foreground">
                      {prod.quantity} {prod.unit}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${perishConfig.className}`}>
                  {perishConfig.label}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>
                  Colheita em <strong>{prod.daysUntilHarvest || "?"} dias</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ações de contato */}
      <div className="flex gap-3 sticky bottom-20 bg-background py-4">
        <Button variant="outline" className="flex-1">
          <Phone className="w-4 h-4 mr-2" />
          Ligar
        </Button>
        <Button className="flex-1">
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default ProducerDetail;
