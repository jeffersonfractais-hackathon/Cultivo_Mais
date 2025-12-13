/**
 * Perfil do Produtor
 * Dados pessoais, documentos e configurações
 */

import { MapPin, Phone, FileText, Settings, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/StatusBadge";
import { useAuth } from "@/contexts/AuthContext";

const documents = [
  { name: "CAF / DAP", status: "valid" as const, expiry: "12/2025" },
  { name: "Documento Pessoal", status: "valid" as const, expiry: null },
];

const ProducerProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header do perfil */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-primary">
            {user?.name?.charAt(0) || "P"}
          </span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">{user?.name}</h1>
          <p className="text-sm text-muted-foreground">Agricultor Familiar</p>
        </div>
      </div>

      {/* Informações básicas */}
      <div className="card-elevated p-4 space-y-3">
        <h2 className="font-semibold text-foreground">Informações</h2>
        
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">
            {user?.municipality || "Campinas - SP"}
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{user?.phone || "(11) 99999-1234"}</span>
        </div>
      </div>

      {/* Documentos */}
      <div className="card-elevated p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Documentos</h2>
          <button className="text-sm text-primary font-medium">Atualizar</button>
        </div>

        {documents.map((doc, i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">{doc.name}</p>
                {doc.expiry && (
                  <p className="text-xs text-muted-foreground">
                    Validade: {doc.expiry}
                  </p>
                )}
              </div>
            </div>
            <StatusBadge status={doc.status} label="Válido" />
          </div>
        ))}
      </div>

      {/* Tipos de produção */}
      <div className="card-elevated p-4 space-y-3">
        <h2 className="font-semibold text-foreground">Tipos de Produção</h2>
        <div className="flex flex-wrap gap-2">
          {(user?.productionTypes || ["Hortaliças", "Frutas"]).map((type, i) => (
            <span
              key={i}
              className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
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

export default ProducerProfile;
