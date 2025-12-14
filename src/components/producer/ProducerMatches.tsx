/**
 * Matches Inteligentes (IA)
 * Sugere compradores com explicação do motivo
 */

import { Brain, MapPin, Clock, Check, X, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dados mock de matches
const matches = [
  {
    id: "1",
    buyerName: "Escola Municipal Centro",
    buyerType: "Escola (PNAE)",
    products: ["Alface", "Tomate"],
    score: 95,
    distance: 8,
    urgency: "high" as const,
    reason: "Distância curta + produtos perecíveis + demanda ativa",
    phone: "(11) 3333-1111",
  },
  {
    id: "2",
    buyerName: "Banco de Alimentos Campinas",
    buyerType: "Banco de Alimentos",
    products: ["Mandioca", "Tomate"],
    score: 88,
    distance: 15,
    urgency: "medium" as const,
    reason: "Alto impacto social + aceita grandes quantidades",
    phone: "(11) 3333-2222",
  },
  {
    id: "3",
    buyerName: "Mercado São Jorge",
    buyerType: "Comércio Local",
    products: ["Alface"],
    score: 82,
    distance: 12,
    urgency: "low" as const,
    reason: "Comprador frequente + boa avaliação",
    phone: "(11) 3333-3333",
  },
];

const urgencyConfig = {
  high: { label: "Urgente", className: "bg-red-500/10 text-red-600" },
  medium: { label: "Médio", className: "bg-amber-500/10 text-amber-600" },
  low: { label: "Normal", className: "bg-emerald-500/10 text-emerald-600" },
};

const ProducerMatches = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Vendas Sugeridas</h1>
        <p className="text-sm text-muted-foreground">
          Recomendações inteligentes para você
        </p>
      </div>

      {/* Explicação da IA */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">Como funciona?</span>
        </div>
        <p className="text-sm text-muted-foreground">
          A IA analisa <strong>perecibilidade</strong>, <strong>distância</strong> e{" "}
          <strong>impacto social</strong> para sugerir as melhores vendas.
        </p>
      </div>

      {/* Lista de matches */}
      <div className="space-y-4">
        {matches.map((match) => {
          const urgency = urgencyConfig[match.urgency];

          return (
            <div key={match.id} className="card-elevated p-4 space-y-4">
              {/* Header do match */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">
                      {match.buyerName}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${urgency.className}`}>
                      {urgency.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{match.buyerType}</p>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-xl font-bold">{match.score}%</span>
                </div>
              </div>

              {/* Produtos */}
              <div className="flex flex-wrap gap-2">
                {match.products.map((prod) => (
                  <span
                    key={prod}
                    className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                  >
                    {prod}
                  </span>
                ))}
              </div>

              {/* Detalhes */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{match.distance} km</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Responde em 24h</span>
                </div>
              </div>

              {/* Motivo da sugestão */}
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">
                  <Brain className="w-3 h-3 inline mr-1" />
                  <strong>Por que sugerimos:</strong> {match.reason}
                </p>
              </div>

              {/* Ações */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 border-red-500/50 text-red-600 hover:bg-red-500/10">
                  <X className="w-4 h-4 mr-2" />
                  Rejeitar
                </Button>
                <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  <Check className="w-4 h-4 mr-2" />
                  Aceitar
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProducerMatches;
