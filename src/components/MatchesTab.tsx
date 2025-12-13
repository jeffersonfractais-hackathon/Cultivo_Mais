import { Building2, MapPin, Phone, Sparkles, Clock, ArrowRight } from "lucide-react";

const matches = [
  {
    id: 1,
    name: "Escola Municipal Centro",
    type: "PNAE",
    distance: "12 km",
    matchScore: 95,
    product: "Alface Crespa",
    urgency: "alta",
    reason: "Produto perecível + proximidade + demanda ativa",
    contact: "(64) 99999-1234",
  },
  {
    id: 2,
    name: "ONG Alimenta Jataí",
    type: "ONG",
    distance: "8 km",
    matchScore: 88,
    product: "Alface Crespa",
    urgency: "alta",
    reason: "Alta perecibilidade + impacto social alto",
    contact: "(64) 99999-5678",
  },
  {
    id: 3,
    name: "Banco de Alimentos Regional",
    type: "Banco de Alimentos",
    distance: "25 km",
    matchScore: 72,
    product: "Tomate Cereja",
    urgency: "média",
    reason: "Demanda compatível + capacidade de armazenamento",
    contact: "(64) 99999-9012",
  },
];

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "alta":
      return "bg-destructive text-destructive-foreground";
    case "média":
      return "bg-warning text-warning-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const MatchesTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Vendas Sugeridas</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Recomendações baseadas em IA
        </p>
      </div>

      {/* AI Explanation Banner */}
      <div className="card-elevated p-4 bg-accent/50 border-accent animate-slide-up">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">Como funciona?</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Nossa IA analisa a <strong>perecibilidade</strong> do produto, a <strong>distância</strong> do comprador e o <strong>impacto social</strong> para sugerir as melhores vendas.
            </p>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {matches.map((match, index) => (
          <div 
            key={match.id} 
            className={`card-interactive p-4 animate-slide-up stagger-${index + 1}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{match.name}</h3>
                  <p className="text-sm text-muted-foreground">{match.type}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">{match.matchScore}%</div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getUrgencyColor(match.urgency)}`}>
                  {match.urgency === "alta" ? "Urgente" : "Normal"}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-4 p-3 bg-muted/50 rounded-xl">
              <p className="text-sm text-muted-foreground">Produto sugerido:</p>
              <p className="font-semibold text-foreground">{match.product}</p>
            </div>

            {/* AI Reason */}
            <div className="mt-3 flex gap-2 items-start">
              <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">{match.reason}</p>
            </div>

            {/* Meta Info */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{match.distance}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Responde rápido</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-3">
              <button className="flex-1 btn-primary flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Entrar em Contato
              </button>
              <button className="px-4 py-3 rounded-xl border border-border text-foreground font-semibold transition-colors hover:bg-muted">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesTab;
