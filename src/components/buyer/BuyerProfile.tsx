/**
 * Perfil do Comprador
 * Dados do estabelecimento e configurações
 */

import { MapPin, Phone, Store, Settings, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const establishmentTypes = {
  school: "Escola",
  ong: "ONG",
  food_bank: "Banco de Alimentos",
  commerce: "Comércio",
};

const BuyerProfile = () => {
  const { user, logout } = useAuth();

  const typeLabel = user?.establishmentType
    ? establishmentTypes[user.establishmentType]
    : "Comércio";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header do perfil */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
          <Store className="w-8 h-8 text-secondary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {user?.establishmentName || user?.name}
          </h1>
          <p className="text-sm text-muted-foreground">{typeLabel}</p>
        </div>
      </div>

      {/* Informações */}
      <div className="card-elevated p-4 space-y-3">
        <h2 className="font-semibold text-foreground">Informações</h2>

        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{user?.location || "Campinas - SP"}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{user?.phone || "(11) 3333-4444"}</span>
        </div>

        {user?.cnpj && (
          <div className="flex items-center gap-3 text-sm">
            <Store className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">CNPJ: {user.cnpj}</span>
          </div>
        )}
      </div>

      {/* Estatísticas */}
      <div className="card-elevated p-4 space-y-3">
        <h2 className="font-semibold text-foreground">Estatísticas</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-foreground">15</p>
            <p className="text-xs text-muted-foreground">Contatos realizados</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-foreground">8</p>
            <p className="text-xs text-muted-foreground">Produtores favoritos</p>
          </div>
        </div>
      </div>

      {/* Configurações */}
      <div className="card-elevated overflow-hidden">
        <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Configurações</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full text-destructive hover:text-destructive"
        onClick={logout}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sair da conta
      </Button>
    </div>
  );
};

export default BuyerProfile;
