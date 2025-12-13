import { Plus, Calendar, Package, Clock, Leaf, Apple, Carrot } from "lucide-react";
import StatusBadge from "./StatusBadge";

const productions = [
  {
    id: 1,
    name: "Alface Crespa",
    quantity: "200 kg",
    harvestDate: "15/01/2025",
    daysLeft: 3,
    perishability: "alta",
    icon: Leaf,
  },
  {
    id: 2,
    name: "Tomate Cereja",
    quantity: "150 kg",
    harvestDate: "20/01/2025",
    daysLeft: 8,
    perishability: "média",
    icon: Apple,
  },
  {
    id: 3,
    name: "Cenoura",
    quantity: "300 kg",
    harvestDate: "01/02/2025",
    daysLeft: 20,
    perishability: "baixa",
    icon: Carrot,
  },
];

const getPerishabilityStatus = (perishability: string) => {
  switch (perishability) {
    case "alta":
      return { status: "invalid" as const, label: "Alta perecibilidade" };
    case "média":
      return { status: "warning" as const, label: "Média perecibilidade" };
    default:
      return { status: "valid" as const, label: "Baixa perecibilidade" };
  }
};

const ProductionTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Minha Produção</h1>
          <p className="text-sm text-muted-foreground mt-1">Gerencie suas colheitas</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-elevated p-3 text-center">
          <p className="text-2xl font-bold text-foreground">3</p>
          <p className="text-xs text-muted-foreground">Ativas</p>
        </div>
        <div className="card-elevated p-3 text-center">
          <p className="text-2xl font-bold text-warning">1</p>
          <p className="text-xs text-muted-foreground">Urgentes</p>
        </div>
        <div className="card-elevated p-3 text-center">
          <p className="text-2xl font-bold text-success">650</p>
          <p className="text-xs text-muted-foreground">kg total</p>
        </div>
      </div>

      {/* Production List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground">Produções Cadastradas</h2>
        
        {productions.map((prod, index) => {
          const Icon = prod.icon;
          const perishStatus = getPerishabilityStatus(prod.perishability);
          const isUrgent = prod.daysLeft <= 5;
          
          return (
            <div 
              key={prod.id} 
              className={`card-interactive p-4 animate-slide-up stagger-${index + 1} ${
                isUrgent ? "border-l-4 border-l-warning" : ""
              }`}
            >
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isUrgent ? "bg-warning/10" : "bg-primary/10"
                }`}>
                  <Icon className={`w-6 h-6 ${isUrgent ? "text-warning" : "text-primary"}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-foreground">{prod.name}</h3>
                    <StatusBadge 
                      status={perishStatus.status} 
                      label={perishStatus.label} 
                      size="sm" 
                    />
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Package className="w-4 h-4" />
                      <span>{prod.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{prod.harvestDate}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${isUrgent ? "text-warning" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-medium ${isUrgent ? "text-warning" : "text-muted-foreground"}`}>
                      {prod.daysLeft} dias para colheita
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Action Button */}
      <button className="floating-action">
        <Plus className="w-6 h-6 text-primary-foreground" />
      </button>
    </div>
  );
};

export default ProductionTab;
