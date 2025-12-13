import { User, FileText, MapPin, Phone, Mail, ChevronRight, Upload, LogOut, Settings } from "lucide-react";
import StatusBadge from "./StatusBadge";

const documents = [
  { name: "CAF", status: "warning" as const, detail: "Vence em 30 dias" },
  { name: "RG", status: "valid" as const, detail: "Válido" },
  { name: "Comprovante de Residência", status: "valid" as const, detail: "Válido" },
];

const ProfileTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header */}
      <div className="card-elevated p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <User className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-xl font-bold text-foreground mt-4">João Silva</h1>
        <p className="text-sm text-muted-foreground">Agricultor Familiar</p>
        <StatusBadge status="valid" label="Pode Vender" />
      </div>

      {/* Personal Info */}
      <div className="card-elevated p-4 animate-slide-up">
        <h2 className="font-bold text-foreground mb-4">Informações Pessoais</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">CPF</p>
              <p className="font-medium text-foreground">123.456.789-00</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Localização</p>
              <p className="font-medium text-foreground">Jataí, GO • 15km do centro</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Phone className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Telefone</p>
              <p className="font-medium text-foreground">(64) 99999-0000</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Mail className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">E-mail</p>
              <p className="font-medium text-foreground">joao.silva@email.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="card-elevated p-4 animate-slide-up stagger-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-foreground">Meus Documentos</h2>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Upload className="w-4 h-4" />
            Enviar
          </button>
        </div>
        
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">{doc.name}</span>
              </div>
              <StatusBadge status={doc.status} label={doc.detail} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Production Type */}
      <div className="card-elevated p-4 animate-slide-up stagger-2">
        <h2 className="font-bold text-foreground mb-3">Tipo de Produção</h2>
        <div className="flex flex-wrap gap-2">
          {["Hortaliças", "Frutas", "Legumes"].map((type) => (
            <span key={type} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Settings & Logout */}
      <div className="space-y-2 animate-slide-up stagger-3">
        <button className="card-interactive w-full p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Configurações</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <button className="card-interactive w-full p-4 flex items-center justify-between text-destructive">
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair da Conta</span>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;
