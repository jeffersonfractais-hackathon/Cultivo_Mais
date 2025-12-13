/**
 * Navegação Inferior
 * Adaptável para produtor e comprador
 */

import { Home, Sprout, Handshake, HelpCircle, User, Package, Users } from "lucide-react";
import { UserType } from "@/types";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userType: UserType;
}

const producerNav = [
  { id: "home", label: "Início", icon: Home },
  { id: "production", label: "Produção", icon: Sprout },
  { id: "matches", label: "Vendas", icon: Handshake },
  { id: "help", label: "Ajuda", icon: HelpCircle },
  { id: "profile", label: "Perfil", icon: User },
];

const buyerNav = [
  { id: "home", label: "Início", icon: Home },
  { id: "products", label: "Produtos", icon: Package },
  { id: "producers", label: "Produtores", icon: Users },
  { id: "profile", label: "Perfil", icon: User },
];

const BottomNav = ({ activeTab, onTabChange, userType }: BottomNavProps) => {
  const navItems = userType === "producer" ? producerNav : buyerNav;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-pb">
      <div className="flex justify-around items-center px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`nav-item ${isActive ? "nav-item-active" : "nav-item-inactive"}`}
            >
              <Icon 
                className={`w-6 h-6 transition-transform duration-200 ${isActive ? "scale-110" : ""}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-xs font-medium ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
